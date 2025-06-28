function actualizarIcono(enabled) {
  const path = enabled
    ? {
        "16": "icons/icon-color-16.png",
        "48": "icons/icon-color-48.png",
        "128": "icons/icon-color-128.png"
      }
    : {
        "16": "icons/icon-gray-16.png",
        "48": "icons/icon-gray-48.png",
        "128": "icons/icon-gray-128.png"
      };
  chrome.action.setIcon({ path });
}

// Al iniciar el service worker, carga el estado y actualiza icono
chrome.storage.local.get(['enabled'], ({ enabled }) => {
  actualizarIcono(enabled !== false);
});

// Escucha cambios en el almacenamiento para actualizar el icono
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'local' && changes.enabled) {
    actualizarIcono(changes.enabled.newValue !== false);
  }
});
