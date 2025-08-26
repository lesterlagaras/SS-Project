// ================= Mobile specific JS =================
console.log("Mobile JS loaded!");

document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  const conversation = document.getElementById('conversation');
  const inputBar = document.getElementById('input-bar');

  // ================= Set vh for mobile (keyboard adjustment) =================
  function adjustVH() {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);

    // Adjust conversation max-height dynamically
    const inputHeight = inputBar.offsetHeight || 60;
    conversation.style.maxHeight = `calc(var(--vh, 1vh) * 100 - ${inputHeight + 20}px)`;
  }
  adjustVH();
  window.addEventListener('resize', () => {
    adjustVH();
    adjustInputBar(); // Update input bar position on resize
  });

  // ================= Auto-resize textarea & adjust conversation =================
  function resizeTextarea() {
    const maxHeight = 150;
    userInput.style.height = 'auto';
    const newHeight = Math.min(userInput.scrollHeight, maxHeight);
    userInput.style.height = newHeight + 'px';

    // Maintain conversation scroll so input bar not hidden
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

  // ================= Dynamic input bar position for keyboard =================
  function adjustInputBar() {
    const viewportHeight = window.innerHeight;
    const documentHeight = document.documentElement.clientHeight;
    const keyboardHeight = viewportHeight - documentHeight;
    inputBar.style.bottom = `${Math.max(15, keyboardHeight + 15)}px`;
  }
  window.addEventListener('resize', adjustInputBar);
  window.addEventListener('orientationchange', adjustInputBar);

  // ================= Touch scroll fix for conversation =================
  conversation.addEventListener('touchstart', () => {
    const top = conversation.scrollTop;
    const totalScroll = conversation.scrollHeight - conversation.offsetHeight;
    if (top === 0) conversation.scrollTop = 1;
    else if (top === totalScroll) conversation.scrollTop = top - 1;
  });

  // Optional: scroll conversation on orientation change
  window.addEventListener('orientationchange', () => {
    setTimeout(() => { conversation.scrollTop = conversation.scrollHeight; }, 300);
  });
});