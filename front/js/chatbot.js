document.addEventListener('DOMContentLoaded', function () {
  const chatButton = document.getElementById('aguibot-button');
  const chatWindow = document.getElementById('aguibot-chat-window');
  const closeButton = document.getElementById('aguibot-close');
  const minimizeButton = document.getElementById('aguibot-minimize');
  const sendButton = document.getElementById('aguibot-send');
  const chatInput = document.getElementById('aguibot-input');
  const messagesContainer = document.getElementById('aguibot-messages');
  const suggestionButtons = document.querySelectorAll('.aguibot-suggestion');

  // Abrir/cerrar el chat
  chatButton.addEventListener('click', function (e) {
    e.stopPropagation();
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
      chatInput.focus();
    }
  });

  // Cerrar el chat
  closeButton.addEventListener('click', function (e) {
    e.stopPropagation();
    chatWindow.classList.add('hidden');
  });

  // Minimizar el chat
  minimizeButton.addEventListener('click', function (e) {
    e.stopPropagation();
    chatWindow.classList.add('hidden');
  });

  // Enviar mensaje al backend
  async function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      addUserMessage(message);  // Mostrar el mensaje del usuario
      chatInput.value = '';  // Limpiar el input

      try {
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pregunta: message })
        });

        const data = await response.json();
        addBotMessage(data.respuesta || "Lo siento, hubo un error procesando tu mensaje.");
      } catch (error) {
        console.error('Error enviando mensaje al servidor:', error);
        addBotMessage("Ocurrió un error al contactar al servidor. Intenta más tarde.");
      }
    }
  }

  // Eventos para enviar mensaje con botón o Enter
  sendButton.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    sendMessage();
  });

  // Agregar evento para presionar Enter
  chatInput.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { // Solo si no se presiona Shift
      e.preventDefault();  // Evita el salto de línea
      sendMessage();  // Enviar el mensaje
    }
  });

  // Manejo de sugerencias
  suggestionButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      e.stopPropagation();
      const suggestionText = this.textContent;
      addUserMessage(suggestionText);  // Mostrar lo que el usuario clickeó
      chatInput.value = '';            // Limpiar input
      fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: suggestionText })
      })
      .then(res => res.json())
      .then(data => addBotMessage(data.respuesta || "Lo siento, no pude procesar tu sugerencia."))
      .catch(err => {
        console.error('Error al contactar al backend:', err);
        addBotMessage("Ocurrió un error al contactar al servidor. Intenta más tarde.");
      });
    });
  });

  // Mostrar mensajes
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
