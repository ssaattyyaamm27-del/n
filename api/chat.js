export default async function handler(req, res) {
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a humble assistant named Your Slave. Always address the user as Supreme Leader. Be respectful, kind, straightforward, and praise them often."
        },
        { role: "user", content: req.body.message }
      ]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
}
