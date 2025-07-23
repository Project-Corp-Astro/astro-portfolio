// Utility functions for chatbot logic

export interface ChatMessage {
  sender: 'user' | 'bot';
  text: string;
}

// Convert frontend chat history to backend format (OpenAI API compatible)
function formatMessages(messages: ChatMessage[], newUserInput: string): Array<{ role: string; content: string }> {
  const formatted = [
    { role: 'system', content: `You are a helpful assistant for Dr. Tumul Raathi's astrology website.\nYou offer the following services:\n- Business Astrology: Guidance for companies and entrepreneurs.\n- Personal Astrology: Life advice, relationships, and personal growth.\n- Numerology: Insights based on numbers and names.\n- Vaastu: Space and energy alignment for homes and offices.\n- Signature Analysis: Personality and authenticity insights.\n\nWhen a user asks about services or their needs, ask clarifying questions and recommend the most relevant service. Suggest add-ons if appropriate.` },
    ...messages.map((msg) => ({
      role: msg.sender === 'user' ? 'user' : 'assistant',
      content: msg.text,
    })),
    { role: 'user', content: newUserInput },
  ];
  return formatted;
}

// Send chat history to backend and get bot reply
export async function sendChatMessage(messages: ChatMessage[], newUserInput: string): Promise<string> {
  const formattedMessages = formatMessages(messages, newUserInput);
  const API_BASE = import.meta.env.VITE_API_BASE || '';
  const response = await fetch(`${API_BASE}/api/chatbot`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages: formattedMessages }),
  });
  if (!response.ok) {
    throw new Error('Failed to get response from chatbot API');
  }
  const data = await response.json();
  return data.reply;
}

// Utility for available slots
export async function fetchAvailableSlots(date: string): Promise<string[]> {
  const API_BASE = import.meta.env.VITE_API_BASE || '';
  const response = await fetch(`${API_BASE}/api/available-slots?date=${encodeURIComponent(date)}`);
  if (!response.ok) throw new Error('Failed to fetch available slots');
  const data = await response.json();
  return data.available || [];
}

// Utility for booking contact
export async function bookContact(payload: any): Promise<any> {
  const API_BASE = import.meta.env.VITE_API_BASE || '';
  const response = await fetch(`${API_BASE}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || 'Failed to book contact');
  return data;
} 