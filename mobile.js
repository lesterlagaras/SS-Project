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

    // Adjust conversation max-height dynamically
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
    setTimeout(() => { conversation.scrollTop = conversation.scrollHeight; }, 300);
  });

  // ================= Enter key handling for newline / send =================
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault(); // prevent newline
        sendBtn.click();    // trigger send
      }
      // Shift+Enter → automatic newline, default behavior
    }
  });
});