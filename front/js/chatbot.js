document.addEventListener('DOMContentLoaded', function () {
  const chatButton = document.getElementById('aguibot-button');
  const chatWindow = document.getElementById('aguibot-chat-window');
  const closeButton = document.getElementById('aguibot-close');
  const minimizeButton = document.getElementById('aguibot-minimize');
  const sendButton = document.getElementById('aguibot-send');
  const chatInput = document.getElementById('aguibot-input');
  const messagesContainer = document.getElementById('aguibot-messages');
  const suggestionButtons = document.querySelectorAll('.aguibot-suggestion');

  // Tiempo mínimo que se mostrará la animación (en milisegundos)
  const MIN_TYPING_DURATION = 1500; // 1.5 segundos

  // URL de la imagen del avatar - Corregida para usar la carpeta /images/ con el nombre exacto
  const AVATAR_URL = '/images/chatbot_imagen.png';

  // Mensaje de bienvenida que se mostrará al abrir el chat (manteniendo el formato original)
  const WELCOME_MESSAGE = "¡Hola! Soy AguiBOT, tu asistente virtual del ITCA.\n\n¿En qué puedo ayudarte hoy?";
  
  // Variable para controlar si ya se mostró el mensaje de bienvenida
  let welcomeMessageShown = false;

// Función para mostrar el indicador de "escribiendo" con el estilo WhatsApp
function showTypingIndicator() {
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'aguibot-message aguibot-bot-message';
  typingIndicator.innerHTML = `
    <div class="aguibot-bot-avatar">
      <img src="${AVATAR_URL}" alt="AguiBot" width="25" height="25" class="avatar-image">
    </div>
    <div class="aguibot-typing-indicator">
      <span class="aguibot-dot"></span>
      <span class="aguibot-dot"></span>
      <span class="aguibot-dot"></span>
    </div>
  `;

  messagesContainer.appendChild(typingIndicator);
  scrollToBottom();

  return typingIndicator;
}

  // Función modificada para añadir mensaje del bot con estructura consistente
  function addBotMessage(text) {
    const messageElement = document.createElement('div');
    messageElement.className = 'aguibot-message aguibot-bot-message';

    // Convertir saltos de línea en etiquetas <br> para preservar el formato
    const formattedText = text.replace(/\n/g, '<br>');

    // Usar la misma estructura que el typing indicator
    messageElement.innerHTML = `
      <div class="aguibot-bot-avatar">
        <img src="${AVATAR_URL}" alt="AguiBot" width="25" height="25" class="avatar-image">
      </div>
      <div class="aguibot-message-content">
        <p>${formattedText}</p>
      </div>
    `;

    messagesContainer.appendChild(messageElement);
    scrollToBottom();
    
    return messageElement;
  }

  // Función para mostrar el mensaje de bienvenida SIN animación (inmediatamente)
  function showWelcomeMessageInstantly() {
    if (welcomeMessageShown) return;
    
    // Añadir directamente el mensaje de bienvenida sin animación
    addBotMessage(WELCOME_MESSAGE);
    
    // Marcar que ya se mostró el mensaje de bienvenida
    welcomeMessageShown = true;
  }

  // Abrir el chat
  chatButton.addEventListener('click', function (e) {
    e.stopPropagation();
    
    // Mostrar la ventana del chat
    chatWindow.classList.remove('hidden');
    
    // Ocultar el botón cuando el chat está abierto
    chatButton.classList.add('hidden');
    
    // Si no se ha mostrado el mensaje de bienvenida, mostrarlo inmediatamente
    if (!welcomeMessageShown) {
      chatInput.focus();
      showWelcomeMessageInstantly();
    }
  });

  // Cerrar el chat
  closeButton.addEventListener('click', function (e) {
    e.stopPropagation();
    
    // Ocultar la ventana del chat
    chatWindow.classList.add('hidden');
    
    // Mostrar nuevamente el botón
    chatButton.classList.remove('hidden');
  });

  // Minimizar el chat
  minimizeButton.addEventListener('click', function (e) {
    e.stopPropagation();
    
    // Ocultar la ventana del chat
    chatWindow.classList.add('hidden');
    
    // Mostrar nuevamente el botón
    chatButton.classList.remove('hidden');
  });

// Enviar mensaje al backend
async function sendMessage() {
  const message = chatInput.value.trim();
  if (message) {
    addUserMessage(message);  // Mostrar el mensaje del usuario
    console.log('Mensaje enviado:', message);  // Log del mensaje enviado
    chatInput.value = '';  // Limpiar el input

    // Mostrar indicador de escritura antes de la respuesta
    const typingIndicator = showTypingIndicator();
    const startTime = Date.now();

    try {
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pregunta: message })
      });

      const data = await response.json();

      // Calcular cuánto tiempo ha pasado desde que se mostró el indicador
      const elapsedTime = Date.now() - startTime;

      // Si el tiempo transcurrido es menor que el mínimo, esperar la diferencia
      if (elapsedTime < MIN_TYPING_DURATION) {
        await new Promise(resolve => setTimeout(resolve, MIN_TYPING_DURATION - elapsedTime));
      }

      // En lugar de transformar el indicador, lo eliminamos y añadimos un nuevo mensaje
      // Esto evita problemas con la manipulación del DOM que podrían causar errores visuales
      typingIndicator.remove();
      
      // Añadir un nuevo mensaje con la respuesta del bot
      const botResponse = data.respuesta || "Lo siento, hubo un error procesando tu mensaje.";
      addBotMessage(botResponse);

      scrollToBottom();
    } catch (error) {
      // Asegurar tiempo mínimo incluso en caso de error
      const elapsedTime = Date.now() - startTime;
      if (elapsedTime < MIN_TYPING_DURATION) {
        await new Promise(resolve => setTimeout(resolve, MIN_TYPING_DURATION - elapsedTime));
      }

      // En vez de transformar, eliminamos y añadimos un nuevo mensaje de error
      typingIndicator.remove();
      addBotMessage("Ocurrió un error al contactar al servidor. Intenta más tarde.");

      console.error('Error enviando mensaje al servidor:', error);
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
    button.addEventListener('click', async function (e) {
      e.stopPropagation();
      const suggestionText = this.textContent;
      console.log('Sugerencia clickeada:', suggestionText);  // Log de la sugerencia clickeada
      addUserMessage(suggestionText);  // Mostrar lo que el usuario clickeó
      chatInput.value = '';            // Limpiar input

      // Mostrar indicador de escritura para las sugerencias también
      const typingIndicator = showTypingIndicator();
      const startTime = Date.now();

      try {
        const response = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pregunta: suggestionText })
        });

        const data = await response.json();

        // Asegurar que el indicador se muestre por un tiempo mínimo
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < MIN_TYPING_DURATION) {
          await new Promise(resolve => setTimeout(resolve, MIN_TYPING_DURATION - elapsedTime));
        }

        // Primero eliminar el indicador completamente
        typingIndicator.remove();

        // Luego añadir la respuesta con el avatar correcto
        addBotMessage(data.respuesta || "Lo siento, no pude procesar tu sugerencia.");
      } catch (err) {
        // Asegurar tiempo mínimo incluso en caso de error
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime < MIN_TYPING_DURATION) {
          await new Promise(resolve => setTimeout(resolve, MIN_TYPING_DURATION - elapsedTime));
        }

        typingIndicator.remove();
        console.error('Error al contactar al backend:', err);
        addBotMessage("Ocurrió un error al contactar al servidor. Intenta más tarde.");
      }
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

  // Función para desplazarse al fondo del chat
  function scrollToBottom() {
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  // Limpiar cualquier mensaje existente al iniciar (por si había mensajes de prueba en el HTML)
  messagesContainer.innerHTML = '';
});

