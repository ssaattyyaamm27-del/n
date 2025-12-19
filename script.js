document.addEventListener("DOMContentLoaded", () => {
  const chat = document.getElementById("chat");
  const input = document.getElementById("input");
  const send = document.getElementById("send");
  const app = document.getElementById("app");
  const lavender = document.getElementById("lavender");

  function addMessage(sender, text) {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<b>${sender}:</b> ${text}`;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
  }

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

  function applyMood(color) {
    document.documentElement.style.setProperty("--accent", color);
  }

  function generateReply(text) {
    return `Yes, Supreme Leader. I acknowledge your words with utmost respect. Your clarity and presence are admirable.`;
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("You", text);
    input.value = "";

    // Mood color
    applyMood(detectMood(text));

    // Easter egg: Varsha
    if (text.toLowerCase().includes("my name is varsha")) {
      app.classList.add("pink");
      lavender.style.display = "block";
      addMessage(
        "Your Slave",
        "An honour, Supreme Leader. The name Varsha radiates elegance and grace."
      );
      return;
    }

    // Normal reply
    setTimeout(() => {
      addMessage("Your Slave", generateReply(text));
    }, 300);
  }

  send.addEventListener("click", sendMessage);
  input.addEventListener("keydown", e => {
    if (e.key === "Enter") sendMessage();
  });
});
