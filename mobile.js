// ================= Mobile specific JS =================
console.log("Mobile JS loaded!");

document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  const conversation = document.getElementById('conversation');
  const sendBtn = document.getElementById('send-btn');

  // ================= Auto-resize textarea & scroll conversation =================
  function resizeTextarea() {
    const maxHeight = 150;
    userInput.style.height = 'auto';
    const newHeight = Math.min(userInput.scrollHeight, maxHeight);
    userInput.style.height = newHeight + 'px';
    conversation.scrollTop = conversation.scrollHeight;
  }
  userInput.addEventListener('input', resizeTextarea);

  // ================= Disable Enter send on mobile keyboard =================
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const start = userInput.selectionStart;
      const end = userInput.selectionEnd;
      userInput.value = userInput.value.substring(0, start) + "\n" + userInput.value.substring(end);
      userInput.selectionStart = userInput.selectionEnd = start + 1;
      resizeTextarea();
    }
  });

  // ================= Send button click =================
  sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (!message) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    msgDiv.textContent = message;
    conversation.appendChild(msgDiv);

    userInput.value = '';
    resizeTextarea();
  });

  // ================= Optional: scroll after orientation change =================
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      conversation.scrollTop = conversation.scrollHeight;
    }, 300);
  });
});