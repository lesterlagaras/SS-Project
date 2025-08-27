const form = document.getElementById('chat-form');
const textarea = document.getElementById('user-input');
const conversation = document.getElementById('conversation');

// Function to add message
function addMessage(msg, sender = 'user') {
    const div = document.createElement('div');
    div.className = sender;
    div.textContent = msg;
    conversation.appendChild(div);
    conversation.scrollTop = conversation.scrollHeight;
}

// Prevent default form submit (important sa mobile)
form.addEventListener('submit', e => {
    e.preventDefault(); // pigilan ang auto-send
    sendMessage();       // Send button lang ang magse-send
});

// Always insert newline on Enter (mobile & desktop)
textarea.addEventListener('keydown', e => {
    if(e.key === 'Enter') {
        e.preventDefault(); // pigilan ang auto-send
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + "\n" + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
    }
});

// Send button click
document.getElementById('send-btn').addEventListener('click', sendMessage);

// Send message function
function sendMessage() {
    const msg = textarea.value.trim();
    if(!msg) return;

    addMessage(msg, 'user');
    textarea.value = '';

    // Optional: bot reply
    setTimeout(() => {
        addMessage("This is a bot reply.", 'bot');
    }, 500);
}