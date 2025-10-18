function n(e,s){return[{role:"system",content:`You are a helpful assistant for Dr. Tumul Raathi's astrology website.
You offer the following services:
- Business Astrology: Guidance for companies and entrepreneurs.
- Personal Astrology: Life advice, relationships, and personal growth.
- Numerology: Insights based on numbers and names.
- Vaastu: Space and energy alignment for homes and offices.
- Signature Analysis: Personality and authenticity insights.

When a user asks about services or their needs, ask clarifying questions and recommend the most relevant service. Suggest add-ons if appropriate.`},...e.map(a=>({role:a.sender==="user"?"user":"assistant",content:a.text})),{role:"user",content:s}]}async function i(e,s){const t=n(e,s),o=await fetch("http://localhost:3001/api/chatbot",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:t})});if(!o.ok)throw new Error("Failed to get response from chatbot API");return(await o.json()).reply}async function l(e){const t=await fetch(`http://localhost:3001/api/available-slots?date=${encodeURIComponent(e)}`);if(!t.ok)throw new Error("Failed to fetch available slots");return(await t.json()).available||[]}export{l as f,i as s};
