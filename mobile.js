const textarea = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const conversation = document.getElementById('conversation');

// Function to add message
function addMessage(msg, sender = 'user') {
    const div = document.createElement('div');
    div.className = sender;
    div.textContent = msg;
    conversation.appendChild(div);
    conversation.scrollTop = conversation.scrollHeight;
}

// Handle Enter & Shift+Enter
textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // Prevent send on Enter
        sendMessage();
    } else if (e.key === 'Enter' && e.shiftKey) {
        // Insert newline
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + "\n" + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        e.preventDefault();
    }
});

// Send button click
sendBtn.addEventListener('click', sendMessage);

// Send message function
function sendMessage() {
    const msg = textarea.value.trim();
    if (msg === '') return;
    addMessage(msg, 'user');
    textarea.value = '';

    // Optional: simulate bot reply
    setTimeout(() => {
        addMessage("This is a bot reply.", 'bot');
    }, 500);
}