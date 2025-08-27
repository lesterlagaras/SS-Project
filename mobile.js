document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  const conversation = document.getElementById('conversation');
  const sendBtn = document.getElementById('send-btn');

  // Auto-resize
  function resizeTextarea() {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 150) + 'px';
  }
  userInput.addEventListener('input', resizeTextarea);

  // Force Enter = newline sa lahat ng mobile
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const start = userInput.selectionStart;
      const end = userInput.selectionEnd;
      userInput.value =
        userInput.value.substring(0, start) + "\n" + userInput.value.substring(end);
      userInput.selectionStart = userInput.selectionEnd = start + 1;
      resizeTextarea();
    }
  });

  // Prevent mobile keyboards na mag-send kapag Enter
  userInput.addEventListener('beforeinput', (e) => {
    if (e.inputType === 'insertParagraph') {
      e.preventDefault();
      const start = userInput.selectionStart;
      const end = userInput.selectionEnd;
      userInput.value =
        userInput.value.substring(0, start) + "\n" + userInput.value.substring(end);
      userInput.selectionStart = userInput.selectionEnd = start + 1;
      resizeTextarea();
    }
  });

  // Send button
  sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (!message) return;

    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user';
    msgDiv.textContent = message;
    conversation.appendChild(msgDiv);

    conversation.scrollTop = conversation.scrollHeight;
    userInput.value = '';
    resizeTextarea();

    setTimeout(() => {
      const aiDiv = document.createElement('div');
      aiDiv.className = 'message ai';
      aiDiv.textContent = "AI reply to: " + message;
      conversation.appendChild(aiDiv);
      conversation.scrollTop = conversation.scrollHeight;
    }, 500);
  });

  // Mobile-friendly Enter hints
  userInput.setAttribute('enterkeyhint', 'enter');
  userInput.setAttribute('inputmode', 'text');

  // Prevent form submission kung nasa form
  userInput.form?.addEventListener('submit', (e) => e.preventDefault());
});

// Mobile viewport fix
function setViewportHeight() {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}
setViewportHeight();
window.addEventListener('resize', setViewportHeight);
window.addEventListener('orientationchange', setViewportHeight);