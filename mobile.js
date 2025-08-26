document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  const conversation = document.getElementById('conversation');
  const sendBtn = document.getElementById('send-btn');

  // ===== Helper: Scroll to bottom =====
  function scrollToBottom() {
    conversation.scrollTop = conversation.scrollHeight;
  }

  // ===== Auto-resize textarea =====
  function resizeTextarea() {
    const maxHeight = 150;
    userInput.style.height = 'auto';
    const newHeight = Math.min(userInput.scrollHeight, maxHeight);
    userInput.style.height = newHeight + 'px';
  }

  userInput.addEventListener('input', resizeTextarea);

  // ===== Enter key = newline, not send =====
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const start = userInput.selectionStart;
      const end = userInput.selectionEnd;
      userInput.value =
        userInput.value.substring(0, start) + "\n" + userInput.value.substring(end);
      userInput.selectionStart = userInput.selectionEnd = start + 1;
      resizeTextarea();
    }
  });

  // ===== Send button =====
  sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Append user message
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user';
    msgDiv.textContent = message;
    conversation.appendChild(msgDiv);

    // Auto scroll
    scrollToBottom();

    // Clear input
    userInput.value = '';
    resizeTextarea();

    // Simulate AI reply (for testing)
    setTimeout(() => {
      const aiDiv = document.createElement('div');
      aiDiv.className = 'message ai';
      aiDiv.textContent = "AI reply to: " + message;
      conversation.appendChild(aiDiv);
      scrollToBottom();
    }, 500);
  });

  // ===== Fix mobile viewport height (keyboard issue) =====
  function setViewportHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  setViewportHeight();
  window.addEventListener('resize', setViewportHeight);
  window.addEventListener('orientationchange', setViewportHeight);

  // ===== Auto-scroll kapag nag-focus sa input =====
  userInput.addEventListener('focus', () => {
    setTimeout(scrollToBottom, 300); // small delay para lumabas muna keyboard
  });
});