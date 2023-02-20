var resize = function() {
    document.getElementById("menuCanvas").width = window.innerWidth;
    document.getElementById("menuCanvas").height = window.innerHeight;
    setMenuPositions();
    if (window.innerWidth - 600 * canvasScale < 300) {
        document.getElementById("sidebar").style.top = Math.min(window.innerWidth, window.innerHeight) + "px";
        document.body.style.setProperty("--max-sidebar-width", window.innerWidth - 20 + "px");
        var pickerWidth = (Math.round((window.innerWidth - 20) / 62) - 1) * 62;
        document.getElementById("pixelPicker").style.width = pickerWidth + "px";
        document.getElementById("pixelDescription").style.width = pickerWidth - 14 + "px";
        document.getElementById("levelDescription").style.width = pickerWidth - 14 + "px";
        document.getElementById("pixelTable").style.width = pickerWidth - 14 + "px";
    }
    else {
        document.getElementById("sidebar").style.top = "0px";
        document.body.style.setProperty("--max-sidebar-width", window.innerWidth - 600 * canvasScale - 20 + "px");
        var pickerWidth = (Math.round((window.innerWidth - 600 * canvasScale - 20) / 62) - 1) * 62;
        document.getElementById("pixelPicker").style.width = pickerWidth + "px";
        document.getElementById("pixelDescription").style.width = pickerWidth - 14 + "px";
        document.getElementById("levelDescription").style.width = pickerWidth - 14 + "px";
        document.getElementById("pixelTable").style.width = pickerWidth - 14 + "px";
    }
}
window.onresize = function() {
    resize();
};
resize();

document.onkeydown = function(event) {
    if (inPrompt) {
        return;
    }
    if (event.key == "ArrowUp") {
        clickSize += 1;
        clickSize = Math.min(gridSize / 2 + 1, clickSize);
    }
    if (event.key == "ArrowDown") {
        clickSize -= 1;
        clickSize = Math.max(1, clickSize);
    }
    if (event.key == "a") {
        heldA = true;
    }
    if (event.key == "d") {
        heldD = true;
    }
    if (event.key == "w") {
        heldW = true;
    }
    if (event.key == "s") {
        heldS = true;
    }
    if (event.key == " ") {
        if (menuSpedUp == false) {
            menuAnimationTime = Math.floor(menuAnimationTime / 2);
            menuCircleSpeed *= 2;
        }
        menuSpedUp = true;
    }
};
document.onkeyup = function(event) {
    if (inPrompt) {
        return;
    }
    if (event.key == "a") {
        heldA = false;
    }
    if (event.key == "d") {
        heldD = false;
    }
    if (event.key == "w") {
        heldW = false;
    }
    if (event.key == "s") {
        heldS = false;
    }
    if (event.key == "]" && !menuScreen) {
        zoom(Math.min(cameraZoom * 2, 4096));
    }
    if (event.key == "[" && !menuScreen) {
        zoom(Math.max(cameraZoom / 2, 1));
    }
};

document.onmousemove = function(event) {
    if (inPrompt) {
        return;
    }
    cursorX = (event.clientX - 10) / (600 * canvasScale - 20) * 600;
    cursorY = (event.clientY - 10) / (600 * canvasScale - 20) * 600;
};
document.onmousedown = function(event) {
    if (event.button == 1) {
        event.preventDefault();
    }
    if (inPrompt) {
        return;
    }
    if (event.button == 0) {
        leftClicking = true;
    }
    else if (event.button == 2) {
        rightClicking = true;
    }
    else if (event.button == 1 && !menuScreen) {
        if (Math.floor((cameraX * cameraZoom + cursorX) / pixelSize) >= 0 && Math.floor((cameraX * cameraZoom + cursorX) / pixelSize) < gridSize && Math.floor((cameraY * cameraZoom + cursorY) / pixelSize) >= 0 && Math.floor((cameraY * cameraZoom + cursorY) / pixelSize) < gridSize) {
            clickPixel = grid[Math.floor((cameraY * cameraZoom + cursorY) / pixelSize)][Math.floor((cameraX * cameraZoom + cursorX) / pixelSize)][0];
            setPixel();
        }
    }
};
document.onmouseup = function(event) {
    if (inPrompt) {
        return;
    }
    if (event.button == 0) {
        leftClicking = false;
    }
    else if (event.button == 2) {
        rightClicking = false;
    }
};

document.getElementById("canvas").oncontextmenu = function(event) {
    event.preventDefault();
}
document.getElementById("canvas").addEventListener("wheel", function(event) {
    if (menuScreen) {
        return;
    }
    if (event.deltaY > 0) {
        if (event.ctrlKey) {
            zoom(Math.max(cameraZoom / 2, 1));
        }
        else {
            clickSize -= 1;
            clickSize = Math.max(1, clickSize);
        }
    }
    else {
        if (event.ctrlKey) {
            zoom(Math.min(cameraZoom * 2, 4));
        }
        else {
            clickSize += 1;
            clickSize = Math.min(gridSize / 2 + 1, clickSize);
        }
    }
    event.preventDefault();
});