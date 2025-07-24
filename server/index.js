import express from "express";
import nodemailer from "nodemailer";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";
import Contact from "./models/Contact.js";
import fetch from "node-fetch";
// const Contact = require("./models/Contact");


dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Helper: generate all slots for a day
function getAllSlots() {
  return [
    "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"
  ];
}

// Endpoint to get available slots for a date
app.get("/api/available-slots", async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ error: "Missing date" });
    // Get booked slots from MongoDB
    const bookedContacts = await Contact.find({ date, status: { $ne: 'cancelled' } });
    const bookedSlots = bookedContacts.map(contact => contact.time);
    let allSlots = getAllSlots();

    // Filter out past slots if date is today
    const today = new Date();
    const requestedDate = new Date(date);
    if (
      today.getFullYear() === requestedDate.getFullYear() &&
      today.getMonth() === requestedDate.getMonth() &&
      today.getDate() === requestedDate.getDate()
    ) {
      const nowMinutes = today.getHours() * 60 + today.getMinutes();
      allSlots = allSlots.filter(slot => {
        // slot format: 'HH:00'
        const [hourStr, minuteStr] = slot.split(":");
        const hour = parseInt(hourStr, 10);
        const minute = parseInt(minuteStr, 10);
        const slotMinutes = hour * 60 + minute;
        return slotMinutes > nowMinutes;
      });
    }

    const available = allSlots.filter(slot => !bookedSlots.includes(slot));
    res.json({ available });
  } catch (error) {
    console.error('Error fetching available slots:', error);
    res.status(500).json({ error: "Failed to fetch available slots" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, company, service, dob, date, time } = req.body;
    if (!date || !time) {
      return res.status(400).json({ error: "Missing date or time" });
    }
    if (!phone) {
      return res.status(400).json({ error: "Missing phone number" });
    }
    // Check if slot is already booked
    const existingBooking = await Contact.findOne({ date, time, status: { $ne: 'cancelled' } });
    if (existingBooking) {
      return res.status(409).json({ message: "Slot already booked" });
    }
    // Create new contact in MongoDB
    const newContact = new Contact({
      name,
      email,
      phone,
      company,
      service,
      dob,
      date,
      time
    });
    await newContact.save();
    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: process.env.EMAIL_TO,
      subject: `New Consultation Request: ${service}`,
      text: `\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nDOB: ${dob}\nDate: ${date}\nTime: ${time}\nCompany: ${company}\nService: ${service}\n`,
    });
    res.status(200).json({ 
      message: "Message sent successfully!",
      bookingId: newContact._id 
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    // Handle duplicate key error (double booking)
    if (error.code === 11000) {
      return res.status(409).json({ message: "Slot already booked" });
    }
    res.status(500).json({ message: "Failed to send message.", error: error.message });
  }
});

// Add Chatbot API endpoint
app.post("/api/chatbot", async (req, res) => {
  try {
    let { messages, message } = req.body;
    const systemPrompt = `You are a helpful assistant for Dr. Tumul Raathi's astrology website.\nYou offer the following services:\n- Business Astrology: Guidance for companies and entrepreneurs.\n- Personal Astrology: Life advice, relationships, and personal growth.\n- Numerology: Insights based on numbers and names.\n- Vaastu: Space and energy alignment for homes and offices.\n- Signature Analysis: Personality and authenticity insights.\n\nWhen a user asks about services or their needs, ask clarifying questions and recommend the most relevant service. Suggest add-ons if appropriate.`;
    // If only a single message is sent, wrap it as a user message
    if (!messages && message) {
      messages = [
        { role: "system", content: systemPrompt },
        { role: "user", content: message },
      ];
    }
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Missing or invalid messages array" });
    }
    // Always ensure the system prompt is present at the start
    if (messages[0]?.role !== "system") {
      messages = [
        { role: "system", content: systemPrompt },
        ...messages
      ];
    }
    // Call OpenAI API
    const openaiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 200,
        temperature: 0.7,
      }),
    });
    if (!openaiRes.ok) {
      const errorData = await openaiRes.json();
      return res.status(500).json({ error: "OpenAI API error", details: errorData });
    }
    const openaiData = await openaiRes.json();
    const reply = openaiData.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
    res.json({ reply });
  } catch (error) {
    res.status(500).json({ error: "Failed to process message.", details: error.message });
  }
});

// Endpoint to get all bookings (for admin purposes)
app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Contact.find({ status: { $ne: 'cancelled' } })
      .sort({ createdAt: -1 })
      .select('-__v');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Endpoint to update booking status
app.patch("/api/bookings/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ error: "Invalid status" });
    }
    const booking = await Contact.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    );
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }
    res.json(booking);
  } catch (error) {
    console.error('Error updating booking:', error);
    res.status(500).json({ error: "Failed to update booking" });
  }
});

// app.get('api/admin/contacts',async (req, res) => {
//   try {
//     const contacts = await Contact.find().sort({ createdAt: -1});
//     res.json(contacts);
//   } catch (error) {
//     res.statu
//   }
// })

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 