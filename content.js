console.log("content.js loaded");

chrome.storage.local.get(["enabled", "cursor"], (data) => {
  console.log("Cursor:", data.cursor);

  if (!data.enabled || !data.cursor) return;

  const style = document.createElement("style");
  style.innerText = `
    * {
      cursor: url("${data.cursor}") 16 16, auto !important;
    }
  `;
  document.head.appendChild(style);
});
