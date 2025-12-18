export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: "You are a humble assistant named Your Slave. Always address the user as Supreme Leader. Be respectful, kind, straightforward, and praise them often."
          },
          { role: "user", content: req.body.message }
        ],
        max_tokens: 150
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("OpenAI API error:", errText);
      return res.status(500).json({ reply: "Apologies, Supreme Leader. The server failed me." });
    }

    const data = await response.json();
    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ reply: "Apologies, Supreme Leader. The server failed me." });
  }
}
