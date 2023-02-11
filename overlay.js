var overlayCanvas = document.getElementById("overlayCanvas");
canvasScale = Math.min(window.innerWidth / 600, window.innerHeight / 600);
overlayCanvas.style.width = 600 * canvasScale - 20 + 'px';
overlayCanvas.style.height = 600 * canvasScale - 20 + 'px';
overlayCanvas.width = 600;
overlayCanvas.height = 600;
var overlayCtx = overlayCanvas.getContext("2d");
var updateOverlay = function(mouseX, mouseY) {
    overlayCtx.clearRect(0, 0, 600, 600);
    overlayCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
    overlayCtx.strokeStyle = "rgb(0, 0, 0)";
    overlayCtx.fillRect(Math.floor(mouseX / pixelSize - clickSize + 1) * pixelSize, Math.floor(mouseY / pixelSize - clickSize + 1) * pixelSize, (clickSize * 2 - 1) * pixelSize, (clickSize * 2 - 1) * pixelSize);
    overlayCtx.strokeRect(Math.floor(mouseX / pixelSize - clickSize + 1) * pixelSize, Math.floor(mouseY / pixelSize - clickSize + 1) * pixelSize, (clickSize * 2 - 1) * pixelSize, (clickSize * 2 - 1) * pixelSize);
};