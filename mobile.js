document.addEventListener('DOMContentLoaded', () => {
  const userInput = document.getElementById('user-input');
  const conversation = document.getElementById('conversation');
  const sendBtn = document.getElementById('send-btn');

  // Auto-resize textarea
  function resizeTextarea() {
    const maxHeight = 150;
    userInput.style.height = 'auto';
    const newHeight = Math.min(userInput.scrollHeight, maxHeight);
    userInput.style.height = newHeight + 'px';
  }

  userInput.addEventListener('input', resizeTextarea);

  // Enter key = new line (not send)
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

  // Send button
  sendBtn.addEventListener('click', () => {
    const message = userInput.value.trim();
    if (!message) return;

    // Append user message
    const msgDiv = document.createElement('div');
    msgDiv.className = 'message user';
    msgDiv.textContent = message;
    conversation.appendChild(msgDiv);

    // Auto scroll
    conversation.scrollTop = conversation.scrollHeight;

    // Clear input
    userInput.value = '';
    resizeTextarea();

    // Simulate AI reply (for testing)
    setTimeout(() => {
      const aiDiv = document.createElement('div');
      aiDiv.className = 'message ai';
      aiDiv.textContent = "AI reply to: " + message;
      conversation.appendChild(aiDiv);
      conversation.scrollTop = conversation.scrollHeight;
    }, 500);
  });
});