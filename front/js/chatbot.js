// chatbot.js
document.addEventListener('DOMContentLoaded', () => {
  const chatButton = document.getElementById('aguibot-button');
  const chatWindow = document.getElementById('aguibot-chat-window');
  const closeButton = document.getElementById('aguibot-close');
  const minimizeButton = document.getElementById('aguibot-minimize');
  const sendButton = document.getElementById('aguibot-send');
  const chatInput = document.getElementById('aguibot-input');
  const messagesContainer = document.getElementById('aguibot-messages');
  const suggestionButtons = document.querySelectorAll('.aguibot-suggestion');

  // Función general para enviar preguntas al backend
  async function enviarPregunta(pregunta) {
    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta })
      });

      const data = await response.json();
      addBotMessage(data.respuesta || "Lo siento, hubo un error procesando tu mensaje.");
    } catch (error) {
      console.error('Error enviando mensaje al servidor:', error);
      addBotMessage("Ocurrió un error al contactar al servidor. Intenta más tarde.");
    }
  }

  // Función para mandar el mensaje del input
  async function handleSendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addUserMessage(message);
      chatInput.value = '';
      await enviarPregunta(message);
    }
  }

  // Abrir/Cerrar/Minimizar
  chatButton.addEventListener('click', (e) => {
    e.stopPropagation();
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
      chatInput.focus();
    }
  });

  closeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    chatWindow.classList.add('hidden');
  });

  minimizeButton.addEventListener('click', (e) => {
    e.stopPropagation();
    chatWindow.classList.add('hidden');
  });

  // Eventos para enviar mensaje
  sendButton.addEventListener('click', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    await handleSendMessage();
  });

  chatInput.addEventListener('keypress', async (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      await handleSendMessage();
    }
  });

  // Sugerencias predefinidas
  suggestionButtons.forEach(button => {
    button.addEventListener('click', async (e) => {
      e.stopPropagation();
      const suggestionText = button.textContent;
      addUserMessage(suggestionText);
      await enviarPregunta(suggestionText);
    });
  });

  // Funciones para mostrar mensajes
  function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'aguibot-message aguibot-user-message';
    messageDiv.innerHTML = `
      <div class="aguibot-message-content">
        <p>${text}</p>
      </div>
    `;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
  }

  function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'aguibot-message aguibot-bot-message';
    messageDiv.innerHTML = `
      <div class="aguibot-bot-avatar">
        <i class="fas fa-robot" style="color: #0056b3; font-size: 16px;"></i>
      </div>
      <div class="aguibot-message-content">
        <p>${text.replace(/\n/g, '<br>')}</p>
      </div>
    `;
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
  }

  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
});
