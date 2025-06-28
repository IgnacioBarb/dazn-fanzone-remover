const toggleButton = document.getElementById('toggle');
const refreshButton = document.getElementById('refresh');

let estadoOriginal = null; // Guardamos el estado original al abrir el popup

// Cargar estado y actualizar UI
chrome.storage.local.get(['enabled'], ({ enabled }) => {
  estadoOriginal = enabled !== false;
  actualizarUI(estadoOriginal);
});

function actualizarUI(estadoActual) {
  toggleButton.textContent = estadoActual ? 'Deactivate' : 'Activate';
  // Mostrar/ocultar botón refrescar usando la clase 'show'
  if (estadoActual !== estadoOriginal) {
    refreshButton.classList.add('show'); // Add the 'show' class
  } else {
    refreshButton.classList.remove('show'); // Remove the 'show' class
  }
}

// Cambiar estado al hacer click
toggleButton.addEventListener('click', () => {
  chrome.storage.local.get(['enabled'], ({ enabled }) => {
    const nuevoEstado = !enabled;
    chrome.storage.local.set({ enabled: nuevoEstado }, () => {
      actualizarUI(nuevoEstado);
    });
  });
});

// Botón para recargar pestaña activa y ocultarse
refreshButton.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length === 0) return;
    chrome.tabs.reload(tabs[0].id, () => {
      // Ocultar botón después de refrescar
      refreshButton.classList.remove('show'); // Remove the 'show' class
      // Actualizamos el estado original al estado actual porque ya aplicamos el cambio con la recarga
      estadoOriginal = !estadoOriginal;
      // Actualizamos el toggleButton para reflejar el nuevo estado "original"
      toggleButton.textContent = estadoOriginal ? 'Deactivate' : 'Activate';
    });
  });
});