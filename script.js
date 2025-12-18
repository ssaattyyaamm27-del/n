document.addEventListener("DOMContentLoaded", function() {
  const chat = document.getElementById("chat");
  const input = document.getElementById("input");
  const send = document.getElementById("send");
  const app = document.getElementById("app");
  const lavender = document.getElementById("lavender");

  // Mood detection
  function detectMood(text) {
    const t = text.toLowerCase();
    if (t.includes("angry") || t.includes("hate") || t.includes("frustrated"))
      return "red";
    if (t.includes("sad") || t.includes("depressed") || t.includes("scared"))
      return "blue";
    if (t.includes("happy") || t.includes("great") || t.includes("love"))
      return "green";
    return "white";
  }

  // Apply mood color
  function applyMood(color) {
    document.documentElement.style.setProperty("--accent", color);
  }

  // Add message to chat
  function addMessage(sender, text) {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<b>${sender}:</b> ${text}`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

  // Send message
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("You", text);
    input.value = "";

    // Easter egg: Varsha
    if (text.toLowerCase().includes("my name is varsha")) {
      app.classList.add("pink");
      lavender.style.display = "block";
    }

    applyMood(detectMood(text));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text })
      });

      const data = await res.json();
      addMessage("Your Slave", data.reply);
    } catch {
      addMessage(
        "Your Slave",
        "Apologies, Supreme Leader. I failed to respond."
      );
    }
  }

  // Event listeners
  send.addEventListener("click", sendMessage);
  input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") sendMessage();
  });
});
