document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  const conversation = document.getElementById('conversation');
  const sendBtn = document.getElementById('send-btn');
  const welcomeMessage = document.getElementById('welcome-message');

  // ================= Auto-resize textarea =================
  function resizeTextarea() {
    userInput.style.height = 'auto';
    const newHeight = Math.min(userInput.scrollHeight, 150);
    userInput.style.height = newHeight + 'px';
    conversation.scrollTop = conversation.scrollHeight;
  }
  userInput.addEventListener('input', () => {
    userInput.value = userInput.value.toUpperCase(); // Always uppercase
    resizeTextarea();
  });

  // ================= Send message =================
  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = text;
    conversation.appendChild(msgDiv);
    conversation.scrollTop = conversation.scrollHeight;
  }

  function sendMessage() {
    const text = userInput.value.trim();
    if (!text) return;

    if (welcomeMessage.style.display !== 'none') {
      welcomeMessage.style.display = 'none';
      conversation.style.display = 'flex';
    }

    addMessage(text, 'user');
    userInput.value = '';
    resizeTextarea();

    setTimeout(() => {
      addMessage("AI reply to: " + text, 'ai');
    }, 500);
  }

  sendBtn.addEventListener('click', sendMessage);

  // ================= Enter = newline =================
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent sending
      const start = userInput.selectionStart;
      const end = userInput.selectionEnd;
      userInput.value = userInput.value.substring(0, start) + "\n" + userInput.value.substring(end);
      userInput.selectionStart = userInput.selectionEnd = start + 1;
      resizeTextarea();
    }
  });

  // ================= Mobile viewport fix =================
  function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);

  // ================= Focus handling =================
  userInput.addEventListener('focus', () => {
    setTimeout(() => {
      userInput.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 300);
  });
});