document.addEventListener("DOMContentLoaded", () => {
    const icon = document.getElementById('chatbot-icon');
    const box = document.getElementById('chatbox');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    const sendButton = document.getElementById('send-button');
  
    // Mostrar el mensaje inicial
    agregarMensaje('AGUIBOT', '💬 Hola, soy AGUIBOT, ¿en qué puedo ayudarte hoy?');
  
    // Mostrar/Ocultar el chat al hacer clic en el ícono
    icon.addEventListener('click', () => {
      box.classList.toggle('hidden');
    });
  
    // Función para enviar mensaje
    async function enviarMensaje() {
      if (input.value.trim() !== '') {
        const pregunta = input.value;
        input.value = ''; // Limpiar el input después de enviarlo
        agregarMensaje('Tú', pregunta);
  
        const res = await fetch('/api/chatbot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pregunta })
        });
  
        const data = await res.json();
        agregarMensaje('AGUIBOT', data.respuesta);
      }
    }
  
    // Enviar mensaje cuando se presiona Enter
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        enviarMensaje();
      }
    });
  
    // Enviar mensaje cuando se hace clic en el botón de enviar
    sendButton.addEventListener('click', (e) => {
      e.preventDefault(); // Evita el comportamiento por defecto (enviar formulario)
      enviarMensaje();
    });
  
    // Función para agregar mensajes al chat
    function agregarMensaje(remitente, texto) {
      const msg = document.createElement('div');
      msg.textContent = `${remitente}: ${texto}`;
      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    }
  });
  