const toggle = document.querySelector(".chatbot-toggle");
const box = document.querySelector(".chatbot-box");
const closeBtn = document.querySelector(".chatbot-close");
const sendBtn = document.getElementById("sendBtn");
const chatInput = document.getElementById("chatInput");
const messages = document.querySelector(".chatbot-messages");

toggle.addEventListener("click", () => {
  box.style.display = "flex";
});
closeBtn.addEventListener("click", () => {
  box.style.display = "none";
});
sendBtn.addEventListener("click", sendMessage);
chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;
  // User message
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.textContent = text;
  messages.appendChild(userMsg);

  // Fake bot response
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    botMsg.textContent = "Got it! We'll get back to you soon.";
    messages.appendChild(botMsg);
    messages.scrollTop = messages.scrollHeight;
  }, 500);

  chatInput.value = "";
  messages.scrollTop = messages.scrollHeight;
}
