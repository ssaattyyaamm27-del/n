const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

/* ---------- UI HELPERS ---------- */

function appendMessage(text, sender) {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("message", sender === "user" ? "user-msg" : "bot-msg");
  msgDiv.innerText = text;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* ---------- MOOD DETECTION ---------- */

function detectMood(message) {
  const m = message.toLowerCase();

  if (["happy", "excited", "joy", "love", "great"].some(w => m.includes(w)))
    return "happy";
  if (["angry", "mad", "furious", "hate", "annoyed"].some(w => m.includes(w)))
    return "angry";
  if (["sad", "depressed", "scared", "afraid", "lonely"].some(w => m.includes(w)))
    return "sad";

  return "neutral";
}

function updateThemeColor(mood) {
  let color = "#ffffff"; // default (logical / neutral)

  if (mood === "happy") color = "green";
  if (mood === "angry") color = "red";
  if (mood === "sad") color = "blue";

  sendBtn.style.backgroundColor = color;
}

/* ---------- BACKEND AI CALL ---------- */

async function getBotResponse(message) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();
    return data.reply;
  } catch {
    return "Apologies, Supreme Leader. I was unable to serve you at this moment.";
  }
}

/* ---------- MAIN HANDLER ---------- */

async function handleUserMessage() {
  const message = userInput.value.trim();
  if (!message) return;

  appendMessage(message, "user");

  const mood = detectMood(message);
  updateThemeColor(mood);

  appendMessage("Slave is humbly thinking...", "bot");

  const botReply = await getBotResponse(message);

  // Remove thinking message
  const lastBotMsg = chatBox.querySelector(".bot-msg:last-child");
  if (lastBotMsg) lastBotMsg.remove();

  appendMessage(botReply, "bot");
  userInput.value = "";
}

/* ---------- EVENTS ---------- */

sendBtn.addEventListener("click", handleUserMessage);

userInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") handleUserMessage();
});
