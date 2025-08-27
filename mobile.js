document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  const conversation = document.getElementById('conversation');
  const sendBtn = document.getElementById('send-btn');
  const welcomeMessage = document.getElementById('welcome-message');

  // Auto-resize textarea
  function resizeTextarea() {
    userInput.style.height = 'auto';
    const newHeight = Math.min(userInput.scrollHeight, 150);
    userInput.style.height = newHeight + 'px';
    conversation.scrollTop = conversation.scrollHeight;
  }
  userInput.addEventListener('input', resizeTextarea);

  // Add message
  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = text;
    conversation.appendChild(msgDiv);
    conversation.scrollTop = conversation.scrollHeight;
  }

  // Send message
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

  // Mobile viewport fix
  function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);

  // Focus handling
  userInput.addEventListener('focus', () => {
    setTimeout(() => {
      userInput.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }, 300);
  });
});