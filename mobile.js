const form = document.getElementById('chat-form'); // new: wrap textarea sa form
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

// Prevent default form submit
form.addEventListener('submit', function(e) {
    e.preventDefault(); // important: pigilan ang auto-send sa mobile
    sendMessage();       // tawagin ang sendMessage function kapag pindot Send button
});

// Handle Enter & Shift+Enter manually
textarea.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault(); // pigilan ang auto-send
        // Enter sa mobile: puwede rin mag-send dito kung gusto mo
        // Sa current setup, Enter lang mag-i-insert ng newline
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + "\n" + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
    } else if (e.key === 'Enter' && e.shiftKey) {
        // Shift+Enter → newline
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        textarea.value = textarea.value.substring(0, start) + "\n" + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        e.preventDefault();
    }
});

// Send button click
document.getElementById('send-btn').addEventListener('click', sendMessage);

// Send message function
function sendMessage() {
    const msg = textarea.value.trim();
    if (!msg) return;
    addMessage(msg, 'user');
    textarea.value = '';

    // Optional: bot reply
    setTimeout(() => {
        addMessage("This is a bot reply.", 'bot');
    }, 500);
}