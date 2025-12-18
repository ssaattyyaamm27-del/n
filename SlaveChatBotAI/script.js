const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

// Default theme
let themeColor = "#ffffff";

function appendMessage(text, sender) {
    const msgDiv = document.createElement("div");
    msgDiv.classList.add("message", sender === "user" ? "user-msg" : "bot-msg");
    msgDiv.innerText = text;
    chatBox.appendChild(msgDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function detectMood(message) {
    const happyWords = ["happy","joy","love","excited","fun"];
    const angryWords = ["angry","mad","furious","hate","annoyed"];
    const sadWords = ["sad","depressed","afraid","scared","lonely"];
    const msgLower = message.toLowerCase();
    if(happyWords.some(w=>msgLower.includes(w))) return "happy";
    if(angryWords.some(w=>msgLower.includes(w))) return "angry";
    if(sadWords.some(w=>msgLower.includes(w))) return "sad";
    return "neutral";
}

function updateThemeColor(mood) {
    switch(mood){
        case "happy": themeColor = "green"; break;
        case "angry": themeColor = "red"; break;
        case "sad": themeColor = "blue"; break;
        default: themeColor = "#ffffff"; break;
    }
    document.getElementById("sendBtn").style.backgroundColor = themeColor;
}

// Call OpenAI API for intelligent responses
async function getBotResponse(message) {
    const systemPrompt = `
You are a humble AI chatbot named Slave.
Always address the user as 'Supreme Leader'.
Be respectful, kind, praising, helpful, natural, and straightforward.
Respond in English.
Do not be sarcastic.
`;
    const payload = {
        model: "gpt-4.1-mini",
        messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
        ],
        max_tokens: 150
    };

    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${OPENAI_API_KEY}`
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        return data.choices[0].message.content.trim();
    } catch (err) {
        console.error(err);
        return "Apologies, Supreme Leader. I am unable to respond right now.";
    }
}

async function handleUserMessage() {
    const message = userInput.value.trim();
    if(message==="") return;

    appendMessage(message, "user");
    const mood = detectMood(message);
    updateThemeColor(mood);

    appendMessage("Slave is thinking...", "bot");
    const botReply = await getBotResponse(message);

    // Remove "thinking..." placeholder
    const lastBotMsg = chatBox.querySelector(".bot-msg:last-child");
    if(lastBotMsg) lastBotMsg.remove();

    appendMessage(botReply, "bot");
    userInput.value = "";
}

// Event listeners
sendBtn.addEventListener("click", handleUserMessage);
userInput.addEventListener("keypress", e => { if(e.key==="Enter") handleUserMessage(); });
