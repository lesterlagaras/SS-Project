// ================= Mobile specific JS =================
console.log("Mobile JS loaded!");

document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  const conversation = document.getElementById('conversation');
  const inputBar = document.getElementById('input-bar');
  const sendBtn = document.getElementById('send-btn');

  // ================= Set vh for mobile (keyboard adjustment) =================
  function adjustVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    const inputHeight = inputBar.offsetHeight || 60;
    conversation.style.maxHeight = `calc(var(--vh, 1vh) * 100 - ${inputHeight + 20}px)`;
  }
  adjustVH();
  window.addEventListener('resize', adjustVH);

  // ================= Auto-resize textarea & adjust conversation =================
  function resizeTextarea() {
    const maxHeight = 150;
    userInput.style.height = 'auto';
    const newHeight = Math.min(userInput.scrollHeight, maxHeight);
    userInput.style.height = newHeight + 'px';

    // Scroll conversation to bottom
    conversation.scrollTop = conversation.scrollHeight;
  }
  userInput.addEventListener('input', resizeTextarea);

  // ================= Auto-scroll on focus (keyboard open) =================
  userInput.addEventListener('focus', () => {
    setTimeout(() => {
      inputBar.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
      conversation.scrollTop = conversation.scrollHeight;
    }, 300);
  });

  // ================= Touch scroll fix for conversation =================
  conversation.addEventListener('touchstart', () => {
    const top = conversation.scrollTop;
    const totalScroll = conversation.scrollHeight - conversation.offsetHeight;
    if (top === 0) conversation.scrollTop = 1;
    else if (top === totalScroll) conversation.scrollTop = top - 1;
  });

  // ================= Scroll conversation after orientation change =================
  window.addEventListener('orientationchange', () => {
    setTimeout(() => {
      conversation.scrollTop = conversation.scrollHeight;
    }, 300);
  });

  // ================= Disable Enter send on mobile keyboard =================
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // prevent sending
      const start = userInput.selectionStart;
      const end = userInput.selectionEnd;
      userInput.value = userInput.value.substring(0, start) + "\n" + userInput.value.substring(end);
      userInput.selectionStart = userInput.selectionEnd = start + 1;
      resizeTextarea(); // adjust height after new line
    }
  });

  // ================= Send button click =================
  sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Append message to conversation
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message';
    msgDiv.textContent = message;
    conversation.appendChild(msgDiv);

    // Clear input and adjust
    userInput.value = '';
    resizeTextarea();
    conversation.scrollTop = conversation.scrollHeight;
  });
});