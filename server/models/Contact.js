import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  service: {
    type: String,
    required: true,
    trim: true
  },
  dob: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'pending'
  },
  astroId: {
    type: String,
    unique: true,
    sparse: true
  },
  // Payment fields
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentAmount: {
    type: Number,
    default: 0
  },
  paymentUrl: {
    type: String
  },
  paymentId: {
    type: String
  },
  // Lead qualification fields
  businessType: {
    type: String,
    trim: true
  },
  preferredLanguage: {
    type: String,
    trim: true
  },
  clientType: {
    type: String,
    enum: ['new', 'returning'],
    default: 'new'
  },
  hadSession: {
    type: String,
    enum: ['yes', 'no'],
    default: 'no'
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Compound index for date and time to prevent double bookings (except cancelled)
contactSchema.index({ date: 1, time: 1 }, { unique: true, partialFilterExpression: { status: { $ne: 'cancelled' } } });

export default mongoose.model('Contact', contactSchema); 