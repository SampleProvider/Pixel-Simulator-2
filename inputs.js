
var canvasScale = Math.min(window.innerWidth / 600, window.innerHeight / 600);

var resize = function() {
    canvasScale = Math.min(window.innerWidth / 600, window.innerHeight / 600);
    document.getElementById("menuCanvas").width = window.innerWidth;
    document.getElementById("menuCanvas").height = window.innerHeight;
    document.getElementById("canvas").style.width = 600 * canvasScale - 20 + "px";
    document.getElementById("canvas").style.height = 600 * canvasScale - 20 + "px";
    document.getElementById("overlayCanvas").style.width = 600 * canvasScale - 20 + "px";
    document.getElementById("overlayCanvas").style.height = 600 * canvasScale - 20 + "px";
    if (window.innerWidth - 600 * canvasScale < 300) {
        document.getElementById("sidebar").style.top = Math.min(window.innerWidth, window.innerHeight) + "px";
        document.body.style.setProperty("--max-sidebar-width", window.innerWidth - 20 + "px");
        var pickerWidth = (Math.round((window.innerWidth - 20) / 62) - 1) * 62;
        pickerWidth = Math.round(window.innerWidth - 20);
        document.getElementById("pixelPicker").style.width = pickerWidth + "px";
        document.getElementById("pixelDescription").style.width = pickerWidth + "px";
        document.getElementById("levelDescription").style.width = pickerWidth + "px";
        document.getElementById("pixelTable").style.width = (pickerWidth + 10) + "px";
    }
    else {
        document.getElementById("sidebar").style.top = "0px";
        document.body.style.setProperty("--max-sidebar-width", window.innerWidth - 600 * canvasScale - 20 + "px");
        var pickerWidth = (Math.round((window.innerWidth - 600 * canvasScale - 20) / 62) - 1) * 62;
        pickerWidth = Math.round(window.innerWidth - 600 * canvasScale - 20);
        document.getElementById("pixelPicker").style.width = pickerWidth + "px";
        document.getElementById("pixelDescription").style.width = pickerWidth + "px";
        document.getElementById("levelDescription").style.width = pickerWidth + "px";
        document.getElementById("pixelTable").style.width = (pickerWidth + 10) + "px";
    }
}
window.onresize = function() {
    resize();
};
resize();

document.onkeydown = function(event) {
    if (audioContext.state == "suspended") {
        audioContext.resume();
    }
    if (inTransition) {
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
            menuAnimationTime = Math.floor(menuAnimationTime / 4);
            menuCircleSpeed *= 4;
        }
        menuSpedUp = true;
    }
};
document.onkeyup = function(event) {
    if (inTransition) {
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
    if (inTransition) {
        return;
    }
    cursorX = (event.clientX - 10) / (600 * canvasScale - 20) * 600;
    cursorY = (event.clientY - 10) / (600 * canvasScale - 20) * 600;
};
document.onmousedown = function(event) {
    if (audioContext.state == "suspended") {
        audioContext.resume();
    }
    if (event.button == 1) {
        event.preventDefault();
    }
    if (inTransition) {
        return;
    }
    if (event.button == 0) {
        leftClicking = true;
    }
    else if (event.button == 2) {
        rightClicking = true;
    }
    else if (event.button == 1 && !menuScreen) {
        if (cursorX >= 0 && cursorX <= 600 && cursorY >= 0 && cursorY <= 600) {
            var pixel = grid[Math.floor((cameraY * cameraZoom + cursorY) / pixelSize / cameraZoom)][Math.floor((cameraX * cameraZoom + cursorX) / pixelSize / cameraZoom)][0];
            if (!sandbox && pixelInventory[pixel] <= 0) {
                return;
            }
            if (pixels[pixel].hidden) {
                return;
            }
            clickPixel = pixel;
            setClickPixel();
        }
    }
};
document.onmouseup = function(event) {
    if (inTransition) {
        return;
    }
    if (event.button == 0) {
        leftClicking = false;
    }
    else if (event.button == 2) {
        rightClicking = false;
    }
};

document.oncontextmenu = function(event) {
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