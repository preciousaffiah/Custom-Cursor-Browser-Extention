document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("cursorFile");
  const uploadBtn = document.getElementById("uploadBtn");
  const fileNameDisplay = document.getElementById("fileName");

  // Display file name when file is selected
  fileInput.addEventListener("change", () => {
    const file = fileInput.files[0];
    if (file) {
      // Check file format
      if (file.type !== "image/png") {
        alert("Please select a PNG image file only.");
        fileInput.value = ""; // Reset file input
        fileNameDisplay.textContent = "";
        return;
      }

      // Display file name
      fileNameDisplay.textContent = file.name;

      // Check image dimensions
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.onload = function () {
        if (img.width > 70 || img.height > 70) {
          alert("Image width and height must not be more than 70px.");
          fileInput.value = ""; // Reset file input
          fileNameDisplay.textContent = "";
        }
        URL.revokeObjectURL(objectUrl);
      };
      img.src = objectUrl;
    } else {
      fileNameDisplay.textContent = "";
    }
  });

  uploadBtn.addEventListener("click", () => {
    const file = fileInput.files[0];
    if (!file) return alert("Please select an image file.");

    const reader = new FileReader();
    reader.onload = function (e) {
      const dataUrl = e.target.result;

      // Save base64 image URL
      chrome.storage.local.set({ cursor: dataUrl }, () => {
        alert("Cursor changeg! Now refresh your browser.");
      });
    };
    reader.readAsDataURL(file);
  });
});
