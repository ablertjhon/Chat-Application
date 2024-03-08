// Initialize Firebase with your configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const chatWindow = document.getElementById('chat-window');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-btn');

// Function to send a message
function sendMessage() {
    const message = messageInput.value.trim();
    if (message !== '') {
        const messageData = {
            text: message,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };
        database.ref('messages').push(messageData);
        messageInput.value = '';
    }
}

// Function to display messages
function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    chatWindow.appendChild(messageElement);
}

// Event listener for send button
sendButton.addEventListener('click', sendMessage);

// Event listener for Enter key
messageInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Listen for new messages and display them
database.ref('messages').on('child_added', function (snapshot) {
    const message = snapshot.val();
    displayMessage(message);
});
