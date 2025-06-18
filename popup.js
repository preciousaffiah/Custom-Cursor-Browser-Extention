document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggleCursor");
  const openOptions = document.getElementById("openOptions");

  // Load state
  chrome.storage.local.get(["enabled"], (data) => {
    toggle.checked = data.enabled || false;
  });

  toggle.addEventListener("change", () => {
    chrome.storage.local.set({ enabled: toggle.checked });
  });

  openOptions.addEventListener("click", () => {
    chrome.runtime.openOptionsPage();
  });
});
