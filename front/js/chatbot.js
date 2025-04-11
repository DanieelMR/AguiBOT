// Script del chatbot
document.addEventListener('DOMContentLoaded', function() {
  const chatButton = document.getElementById('aguibot-button');
  const chatWindow = document.getElementById('aguibot-chat-window');
  const closeButton = document.getElementById('aguibot-close');
  const minimizeButton = document.getElementById('aguibot-minimize');
  const sendButton = document.getElementById('aguibot-send');
  const chatInput = document.getElementById('aguibot-input');
  const messagesContainer = document.getElementById('aguibot-messages');
  const suggestionButtons = document.querySelectorAll('.aguibot-suggestion');

  // Abrir/cerrar el chat
  chatButton.addEventListener('click', function() {
    chatWindow.classList.toggle('hidden');
    if (!chatWindow.classList.contains('hidden')) {
      chatInput.focus();
    }
  });

  // Cerrar el chat
  closeButton.addEventListener('click', function() {
    chatWindow.classList.add('hidden');
  });

  // Minimizar el chat
  minimizeButton.addEventListener('click', function() {
    chatWindow.classList.add('hidden');
  });

  // Enviar mensaje
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      // Añadir mensaje del usuario
      addUserMessage(message);
      chatInput.value = '';

      // Simular respuesta del bot (aquí conectarías con tu backend)
      setTimeout(function() {
        addBotMessage("Estoy procesando tu consulta sobre: " + message);
      }, 1000);
    }
  }

  sendButton.addEventListener('click', sendMessage);

  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      sendMessage();
    }
  });

  // Manejo de sugerencias
  suggestionButtons.forEach(button => {
    button.addEventListener('click', function() {
      const suggestionText = this.textContent;
      addUserMessage(suggestionText);

      // Simular respuesta a la sugerencia
      setTimeout(function() {
        let response = "";
        if (suggestionText.includes("NIP")) {
          response = "Para recuperar tu NIP, debes acudir a la ventanilla de servicios escolares con una identificación oficial.";
        } else if (suggestionText.includes("inscripción")) {
          response = "El proceso de inscripción consta de 5 pasos: 1) Pago de cuota, 2) Selección de materias, 3) Generación de horario, 4) Validación, 5) Impresión de carga académica.";
        } else if (suggestionText.includes("Fechas")) {
          response = "Las fechas importantes para este semestre son:\n- Inscripciones: 15-19 de agosto\n- Inicio de clases: 22 de agosto\n- Evaluaciones: 10-14 de octubre";
        }
        addBotMessage(response);
      }, 1000);
    });
  });

  // Funciones para añadir mensajes
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

  sendButton.addEventListener('click', function(e) {
    e.preventDefault();  // 🚫 Detiene el comportamiento por defecto del botón (como enviar un form)
    sendMessage();
  });
  
  chatInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      e.preventDefault();  // 🚫 Previene el submit del form al presionar Enter
      sendMessage();
    }
  });

});