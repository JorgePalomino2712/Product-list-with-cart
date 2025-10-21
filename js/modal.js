/* quiero generar un modal para mostrar los detalles de un producto seleccionado. El modal debe poder abrirse y cerrarse mediante botones específicos. Aquí tienes un ejemplo de cómo podrías implementar esto en JavaScript: */
// Obtener elementos del DOM
const modal = document.getElementById('productModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modalContent = document.getElementById('modalContent');

// Función para abrir el modal
function openModal() {
  modal.classList.remove('hidden');
}

// Función para cerrar el modal
function closeModal() {
  modal.classList.add('hidden');
}

// Event listeners
openModalBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
