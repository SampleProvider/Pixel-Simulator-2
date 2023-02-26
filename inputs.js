
var canvasScale = Math.min(window.innerWidth / 600, window.innerHeight / 600);

var resize = function() {
    canvasScale = Math.min(window.innerWidth / 600, window.innerHeight / 600);
    document.getElementById("menuCanvas").width = window.innerWidth;
    document.getElementById("menuCanvas").height = window.innerHeight;
    menuCtx.imageSmoothingEnabled = false;
    menuCtx.webkitImageSmoothingEnabled = false;
    document.getElementById("canvas").style.width = 600 * canvasScale - 20 + "px";
    document.getElementById("canvas").style.height = 600 * canvasScale - 20 + "px";
    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    document.getElementById("effectCanvas").style.width = 600 * canvasScale - 20 + "px";
    document.getElementById("effectCanvas").style.height = 600 * canvasScale - 20 + "px";
    document.getElementById("placeableCanvas").style.width = 600 * canvasScale - 20 + "px";
    document.getElementById("placeableCanvas").style.height = 600 * canvasScale - 20 + "px";
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
    if (event.altKey) {
        event.preventDefault();
    }
    if (inTransition) {
        return;
    }
    if (event.key == "ArrowUp") {
        var oldClickSize = clickSize;
        clickSize += 1;
        clickSize = Math.min(gridSize / 2 + 1, clickSize);
        if (clickSize != oldClickSize) {
            createOverlayCanvas();
            updateOverlay();
        }
    }
    if (event.key == "ArrowDown") {
        var oldClickSize = clickSize;
        clickSize -= 1;
        clickSize = Math.max(1, clickSize);
        if (clickSize != oldClickSize) {
            createOverlayCanvas();
            updateOverlay();
        }
    }
    if (event.key.toLowerCase() == "a") {
        heldA = true;
    }
    if (event.key.toLowerCase() == "d") {
        heldD = true;
    }
    if (event.key.toLowerCase() == "w") {
        heldW = true;
    }
    if (event.key.toLowerCase() == "s") {
        heldS = true;
    }
    if (event.key == "c" && event.ctrlKey) {
        if (selectionState == 2) {
            copyGrid = [];
            var xIndex = 0;
            var yIndex = 0;
            for (var y = selectionY1; y < selectionY2; y++) {
                copyGrid[yIndex] = [];
                for (var x = selectionX1; x < selectionX2; x++) {
                    copyGrid[yIndex][xIndex] = [grid[y][x][0], grid[y][x][1]];
                    xIndex++;
                }
                yIndex++;
                xIndex = 0;
            }
        }
        event.preventDefault();
    }
    if (event.key.toLowerCase() == "x" && event.ctrlKey) {
        if (selectionState == 2) {
            selectionState = 3;
            copyGrid = [];
            var xIndex = 0;
            var yIndex = 0;
            for (var y = selectionY1; y < selectionY2; y++) {
                copyGrid[yIndex] = [];
                for (var x = selectionX1; x < selectionX2; x++) {
                    copyGrid[yIndex][xIndex] = [grid[y][x][0], grid[y][x][1]];
                    if (!sandbox) {
                        if (grid[y][x][0] != AIR) {
                            if (pixelInventory[grid[y][x][0]] < 0) {
                                pixelInventory[grid[y][x][0]] = 0;
                            }
                            pixelInventory[grid[y][x][0]] += 1;
                        }
                        if (grid[y][x][1] != AIR) {
                            if (pixelInventory[grid[y][x][1]] < 0) {
                                pixelInventory[grid[y][x][1]] = 0;
                            }
                            pixelInventory[grid[y][x][1]] += 1;
                        }
                    }
                    grid[y][x] = [AIR, AIR];
                    xIndex++;
                }
                yIndex++;
                xIndex = 0;
                offscreenCtx.fillStyle = colors.AIR;
                offscreenCtx.fillRect(selectionX1 * 6, selectionY1 * 6, (selectionX2 - selectionX1) * 6, (selectionY2 - selectionY1) * 6);
                offscreenEffectCtx.clearRect(selectionX1 * 6, selectionY1 * 6, (selectionX2 - selectionX1) * 6, (selectionY2 - selectionY1) * 6);
                drawCanvas();
            }
            storeGrid();
            createOverlayCanvas();
            updateOverlay();
        }
        event.preventDefault();
    }
    if (event.key.toLowerCase() == "v" && event.ctrlKey) {
        if (selectionState == 2) {
            selectionState = 3;
            createOverlayCanvas();
            updateOverlay();
        }
        event.preventDefault();
    }
    if (event.key.toLowerCase() == "e") {
        if (selectionState == 3) {
            var rotatedCopyGrid = [];
            for (var i = 0; i < copyGrid.length; i++) {
                for (var j = 0; j < copyGrid[0].length; j++) {
                    if (i == 0) {
                        rotatedCopyGrid[j] = [];
                    }
                    rotatedCopyGrid[j][i] = [copyGrid[copyGrid.length - i - 1][j][0], copyGrid[copyGrid.length - i - 1][j][1]];
                }
            }
            copyGrid = rotatedCopyGrid;
            createOverlayCanvas();
            updateOverlay();
        }
        event.preventDefault();
    }
    if (event.key.toLowerCase() == "q") {
        if (selectionState == 3) {
            var rotatedCopyGrid = [];
            for (var i = 0; i < copyGrid.length; i++) {
                for (var j = 0; j < copyGrid[0].length; j++) {
                    if (i == 0) {
                        rotatedCopyGrid[j] = [];
                    }
                    rotatedCopyGrid[j][i] = [copyGrid[i][copyGrid[0].length - j - 1][0], copyGrid[i][copyGrid[0].length - j - 1][1]];
                }
            }
            copyGrid = rotatedCopyGrid;
            createOverlayCanvas();
            updateOverlay();
        }
        event.preventDefault();
    }
    if (event.key.toLowerCase() == "f") {
        if (selectionState == 3) {
            var rotatedCopyGrid = [];
            for (var i = 0; i < copyGrid.length; i++) {
                rotatedCopyGrid[i] = [];
                for (var j = 0; j < copyGrid[0].length; j++) {
                    rotatedCopyGrid[i][j] = [copyGrid[i][copyGrid[0].length - j - 1][0], copyGrid[i][copyGrid[0].length - j - 1][1]];
                }
            }
            copyGrid = rotatedCopyGrid;
            createOverlayCanvas();
            updateOverlay();
        }
        event.preventDefault();
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
    cursorX = (event.clientX - 10) / (600 * canvasScale - 20) * 6 * gridSize;
    cursorY = (event.clientY - 10) / (600 * canvasScale - 20) * 6 * gridSize;
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
    if (cursorX >= 0 && cursorX <= 600 && cursorY >= 0 && cursorY <= 600) {
        if (event.button == 0) {
            if (event.altKey || event.shiftKey) {
                if (selectionState != 1) {
                    selectionState = 1;
                    selectionX1 = Math.floor((cameraX * cameraZoom + cursorX) / (6 * cameraZoom));
                    selectionY1 = Math.floor((cameraY * cameraZoom + cursorY) / (6 * cameraZoom));
                }
                return;
            }
            if (selectionState == 1 || selectionState == 2) {
                selectionState = 0;
                clickSize = 1;
                createOverlayCanvas();
                updateOverlay();
            }
            leftClicking = true;
        }
        else if (event.button == 2) {
            if (selectionState != 0) {
                selectionState = 0;
                clickSize = 1;
                createOverlayCanvas();
                updateOverlay();
                return;
            }
            rightClicking = true;
        }
        else if (event.button == 1 && !menuScreen) {
            var pixel = grid[Math.floor((cameraY * cameraZoom + cursorY) / 6 / cameraZoom)][Math.floor((cameraX * cameraZoom + cursorX) / 6 / cameraZoom)][0];
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
        if (cursorX >= 0 && cursorX <= 600 && cursorY >= 0 && cursorY <= 600) {
            if (selectionState == 1) {
                selectionState = 2;
                selectionX2 = Math.floor((cameraX * cameraZoom + cursorX) / (6 * cameraZoom));
                selectionY2 = Math.floor((cameraY * cameraZoom + cursorY) / (6 * cameraZoom));
                if (selectionX2 < selectionX1) {
                    var temporary = selectionX1;
                    selectionX1 = selectionX2;
                    selectionX2 = temporary;
                }
                if (selectionY2 < selectionY1) {
                    var temporary = selectionY1;
                    selectionY1 = selectionY2;
                    selectionY2 = temporary;
                }
                if (selectionX1 == selectionX2 || selectionY1 == selectionY2) {
                    selectionState = 0;
                }
                return;
            }
        }
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
            var oldClickSize = clickSize;
            clickSize -= 1;
            clickSize = Math.max(1, clickSize);
            if (clickSize != oldClickSize) {
                createOverlayCanvas();
                updateOverlay();
            }
        }
    }
    else {
        if (event.ctrlKey) {
            zoom(Math.min(cameraZoom * 2, 4));
        }
        else {
            var oldClickSize = clickSize;
            clickSize += 1;
            clickSize = Math.min(gridSize / 2 + 1, clickSize);
            if (clickSize != oldClickSize) {
                createOverlayCanvas();
                updateOverlay();
            }
        }
    }
    event.preventDefault();
});
// document.getElementById("canvas").onmouseout = function() {
//     leftClicking = false;
//     rightClicking = false;
// };
document.addEventListener("visibilitychange", function() {
    heldW = false;
    heldA = false;
    heldS = false;
    heldD = false;
    leftClicking = false;
    rightClicking = false;
});