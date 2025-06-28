// Se ejecuta automáticamente cada vez que carga la página en DAZN
chrome.storage.local.get(['enabled'], (result) => {
  const enabled = result.enabled !== false; // si no existe, se considera true
  if (enabled) {
    ocultarAside();
  }
});

function ocultarAside() {
  const observer = new MutationObserver(() => {
    const aside = document.querySelector('aside[class*="main__player-aside"]');
    if (aside) {
      aside.style.display = "none";
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}
