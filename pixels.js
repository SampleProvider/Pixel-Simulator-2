// TODO LIST
// collapsables

var canvasScale = Math.min(window.innerWidth / 600, window.innerHeight / 600);
document.getElementById("canvas").style.width = 600 * canvasScale - 20 + "px";
document.getElementById("canvas").style.height = 600 * canvasScale - 20 + "px";
document.getElementById("canvas").width = 600;
document.getElementById("canvas").height = 600;
document.getElementById("effectCanvas").style.width = 600 * canvasScale - 20 + "px";
document.getElementById("effectCanvas").style.height = 600 * canvasScale - 20 + "px";
document.getElementById("effectCanvas").width = 600;
document.getElementById("effectCanvas").height = 600;
document.getElementById("overlayCanvas").style.width = 600 * canvasScale - 20 + "pxd";
document.getElementById("overlayCanvas").style.height = 600 * canvasScale - 20 + "px";
document.getElementById("overlayCanvas").width = 600;
document.getElementById("overlayCanvas").height = 600;
var ctx = document.getElementById("canvas").getContext("2d");
var effectCtx = document.getElementById("effectCanvas").getContext("2d");
var overlayCtx = document.getElementById("overlayCanvas").getContext("2d");

var offscreenCanvas = new OffscreenCanvas(600, 600);
var offscreenCtx = offscreenCanvas.getContext("2d");
var offscreenEffectCanvas = new OffscreenCanvas(600, 600);
var offscreenEffectCtx = offscreenEffectCanvas.getContext("2d");

window.onerror = function(error) {
    promptNotification(`An error has occured. ${error}`);
};

ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fillRect(0, 0, 600, 600);
offscreenCtx.fillStyle = "rgb(255, 255, 255)";
offscreenCtx.fillRect(0, 0, 600, 600);

var gameTick = 0;

var frames = [];
var minFPS = null;
var maxFPS = 0;
var averageFPS = 0;

var grid = [];
var nextGrid = [];
var gridSize = 100;

var clickSize = 1;
var clickPixel = "air";
var clickNumber = 0;

var running = false;
var runSpeed = 1;
var inPrompt = false;

var cursorX = 0;
var cursorY = 0;
var pastCursorX = 0;
var pastCursorY = 0;
var clicking = false;

var cameraX = 0;
var cameraY = 0;
var cameraZoom = 1;
var heldA = false;
var heldD = false;
var heldW = false;
var heldS = false;
var speedX = 0;
var speedY = 0;
var pixelSize = 600 / gridSize * cameraZoom;

var setLerpColor = function() {
    colors.update_push_color();
    colors.update_clone_color();
};

var drawGrid = function(criteria) {
    var pixel = null;
    var pixelX = 0;
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (criteria(j, i, 0)) {
                if (pixel == null) {
                    pixel = grid[i][j][0];
                    pixelX = j;
                }
                if (pixel != grid[i][j][0]) {
                    pixels[pixel].drawBackground(pixelX, i, j - pixelX, offscreenCtx);
                    for (var k = pixelX; k < j; k++) {
                        pixels[pixel].draw(k, i, offscreenCtx);
                    }
                    pixel = grid[i][j][0];
                    pixelX = j;
                }
                nextGrid[i][j][0] = null;
            }
            else if (pixel != null) {
                pixels[pixel].drawBackground(pixelX, i, j - pixelX, offscreenCtx);
                for (var k = pixelX; k < j; k++) {
                    pixels[pixel].draw(k, i, offscreenCtx);
                }
                pixel = null;
            }
        }
        if (pixel != null) {
            pixels[pixel].drawBackground(pixelX, i, gridSize - pixelX, offscreenCtx);
            for (var k = pixelX; k < gridSize; k++) {
                pixels[pixel].draw(k, i, offscreenCtx);
            }
        }
        pixel = null;
        pixelX = 0;
    }
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (criteria(j, i, 1)) {
                if (pixel == null) {
                    pixel = grid[i][j][1];
                    pixelX = j;
                }
                if (pixel != grid[i][j][1]) {
                    if (pixel != "air") {
                        pixels[pixel].drawBackground(pixelX, i, j - pixelX, offscreenEffectCtx);
                        for (var k = pixelX; k < j; k++) {
                            pixels[pixel].draw(k, i, offscreenEffectCtx);
                        }
                    }
                    else {
                        offscreenEffectCtx.clearRect(pixelX * pixelSize, i * pixelSize, (j - pixelX) * pixelSize, pixelSize);
                    }
                    pixel = grid[i][j][1];
                    pixelX = j;
                }
                nextGrid[i][j][1] = null;
            }
            else if (pixel != null) {
                if (pixel != "air") {
                    pixels[pixel].drawBackground(pixelX, i, j - pixelX, offscreenEffectCtx);
                    for (var k = pixelX; k < j; k++) {
                        pixels[pixel].draw(k, i, offscreenEffectCtx);
                    }
                }
                else {
                    offscreenEffectCtx.clearRect(pixelX * pixelSize, i * pixelSize, (j - pixelX) * pixelSize, pixelSize);
                }
                pixel = null;
            }
        }
        if (pixel != null) {
            if (pixel != "air") {
                pixels[pixel].drawBackground(pixelX, i, gridSize - pixelX, offscreenEffectCtx);
                for (var k = pixelX; k < j; k++) {
                    pixels[pixel].draw(k, i, offscreenEffectCtx);
                }
            }
            else {
                offscreenEffectCtx.clearRect(pixelX * pixelSize, i * pixelSize, (gridSize - pixelX) * pixelSize, pixelSize);
            }
        }
        pixel = null;
        pixelX = 0;
    }
};
var createGrid = function() {
    grid = [];
    nextGrid = [];
    for (var i = 0; i < gridSize; i++) {
        grid.push([]);
        nextGrid.push([]);
        for (var j = 0; j < gridSize; j++) {
            grid[i].push(["air", "air"]);
            nextGrid[i].push([null, null]);
        }
    }
};
var resetGrid = function() {
    gameTick = 0;
    setNoiseGrid();
    setLerpColor();
    drawGrid(function() { return true });
    running = false;
    document.getElementById("runButton").innerHTML = "RUN";
    document.getElementById("runButton").style.background = "#00ff00";
    // pixelSize = 600 / gridSize;
};
createGrid();
resetGrid();
var updateGrid = function() {
    setLerpColor();
    if (gameTick % 2 == 0) {
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                if (pixels[grid[j][i][1]].updateStage == 0) {
                    pixels[grid[j][i][1]].update(i, j);
                }
                if (pixels[grid[j][i][0]].updateStage == 0) {
                    pixels[grid[j][i][0]].update(i, j);
                }
            }
        }
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                if (pixels[grid[j][i][0]].updateStage == 1) {
                    pixels[grid[j][i][0]].update(i, j);
                }
            }
        }
    }
    else {
        for (var i = gridSize - 1; i >= 0; i--) {
            for (var j = 0; j < gridSize; j++) {
                if (pixels[grid[j][i][1]].updateStage == 0) {
                    pixels[grid[j][i][1]].update(i, j);
                }
                if (pixels[grid[j][i][0]].updateStage == 0) {
                    pixels[grid[j][i][0]].update(i, j);
                }
            }
        }
        for (var i = gridSize - 1; i >= 0; i--) {
            for (var j = 0; j < gridSize; j++) {
                if (pixels[grid[j][i][0]].updateStage == 1) {
                    pixels[grid[j][i][0]].update(i, j);
                }
            }
        }
    }

    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (nextGrid[i][j][0] != null) {
                grid[i][j][0] = nextGrid[i][j][0];
            }
            if (nextGrid[i][j][1] != null) {
                grid[i][j][1] = nextGrid[i][j][1];
            }
        }
    }

    drawGrid(function(x, y, layer) { return (nextGrid[y][x][layer] != null) || pixels[grid[y][x][layer]].animated; });
    // drawGrid(function(x, y, layer) { return (nextGrid[y][x][layer] != null && nextGrid[y][x][layer] != grid[y][x][layer]) || pixels[grid[y][x][layer]].animated; });
    
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (nextGrid[i][j][0] != null || nextGrid[i][j][1] != null) {
                nextGrid[i][j] = [null, null];
            }
        }
    }
    gameTick++;
};

var updateOverlay = function() {
    overlayCtx.clearRect(0, 0, 600, 600);
    overlayCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
    overlayCtx.strokeStyle = "rgb(0, 0, 0)";
    overlayCtx.fillRect(Math.floor(cursorX / pixelSize - clickSize + 1) * pixelSize, Math.floor(cursorY / pixelSize - clickSize + 1) * pixelSize, (clickSize * 2 - 1) * pixelSize, (clickSize * 2 - 1) * pixelSize);
    overlayCtx.strokeRect(Math.floor(cursorX / pixelSize - clickSize + 1) * pixelSize, Math.floor(cursorY / pixelSize - clickSize + 1) * pixelSize, (clickSize * 2 - 1) * pixelSize, (clickSize * 2 - 1) * pixelSize);
};

var clickLine = function(startX, startY, endX, endY) {
    var x = startX;
    var y = startY;
    var angle = Math.atan2(endY - startY, endX - startX);
    var distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    var layer = pixels[clickPixel].effect ? 1 : 0;
    var context = pixels[clickPixel].effect ? offscreenEffectCtx : offscreenCtx;
    var clickGrid = [];
    for (var i = 0; i < clickSize * 2 - 1; i++) {
        clickGrid.push([]);
        for (var j = 0; j < clickSize * 2 - 1; j++) {
            clickGrid[i].push(false);
        }
    }
    for (var i = 0; i <= distance; i++) {
        var gridX = Math.floor(x);
        var gridY = Math.floor(y);
        for (var j = Math.max(gridX - clickSize + 1, 0); j < Math.min(gridX + clickSize, gridSize); j++) {
            for (var k = Math.max(gridY - clickSize + 1, 0); k < Math.min(gridY + clickSize, gridSize); k++) {
                clickGrid[k - gridY + clickSize - 1][j - gridX + clickSize - 1] = true;
            }
        }
        var pixel = false;
        var pixelX = 0;
        for (var j = Math.max(0, -gridY + clickSize - 1); j < Math.min(clickSize * 2 - 1, gridSize - gridY + clickSize - 1); j++) {
            for (var k = Math.max(0, -gridX + clickSize - 1); k < clickSize * 2 - 1; k++) {
                if (gridX - clickSize + 1 + k >= gridSize) {
                    if (pixel == true) {
                        pixels[clickPixel].drawBackground(gridX - clickSize + 1 + pixelX, gridY - clickSize + 1 + j, k - pixelX, context);
                        for (var l = pixelX; l < k; l++) {
                            pixels[clickPixel].draw(gridX - clickSize + 1 + l, gridY - clickSize + 1 + j, context);
                        }
                        pixel = false;
                    }
                    break;
                }
                if (clickGrid[j][k] && grid[gridY - clickSize + 1 + j][gridX - clickSize + 1 + k][layer] != clickPixel) {
                    if (pixel == false) {
                        pixel = true;
                        pixelX = k;
                    }
                    grid[gridY - clickSize + 1 + j][gridX - clickSize + 1 + k][layer] = clickPixel;
                    clickGrid[j][k] = false;
                }
                else if (pixel == true) {
                    pixels[clickPixel].drawBackground(gridX - clickSize + 1 + pixelX, gridY - clickSize + 1 + j, k - pixelX, context);
                    for (var l = pixelX; l < k; l++) {
                        pixels[clickPixel].draw(gridX - clickSize + 1 + l, gridY - clickSize + 1 + j, context);
                    }
                    pixel = false;
                }
            }
            if (pixel == true) {
                pixels[clickPixel].drawBackground(gridX - clickSize + 1 + pixelX, gridY - clickSize + 1 + j, clickSize * 2 - 1 - pixelX, context);
                for (var k = pixelX; k < clickSize * 2 - 1; k++) {
                    pixels[clickPixel].draw(gridX - clickSize + 1 + k, gridY - clickSize + 1 + j, context);
                }
            }
            pixel = false;
            pixelX = 0;
        }
        x += Math.cos(angle);
        y += Math.sin(angle);
    }
};
var updateClick = function() {
    if (clicking && cursorX >= 0 && cursorX <= 600 && cursorY >= 0 && cursorY <= 600) {
        clickLine(Math.floor((cameraX + cursorX) / pixelSize), Math.floor((cameraY + cursorY) / pixelSize), Math.floor((cameraX + pastCursorX) / pixelSize), Math.floor((cameraY + pastCursorY) / pixelSize));
    }
    pastCursorX = cursorX;
    pastCursorY = cursorY;
};
var updateClickPixel = function() {
    if (inPrompt) {
        return;
    }
    for (var i in pixels) {
        if (pixels[i].key == clickNumber) {
            clickPixel = i;
            setPixel();
            clickNumber = 0;
        }
    }
    if (clickNumber >= 100) {
        clickNumber = 0;
    }
};

document.onkeydown = function(event) {
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
};
document.onkeyup = function(event) {
    if (inPrompt) {
        return;
    }
    if (event.key == "0") {
        clickPixel = "air";
        setPixel();
        clickNumber = 0;
    }
    if (event.key.charCodeAt(0) >= 49 && event.key.charCodeAt(0) <= 57) {
        clickNumber = clickNumber * 10 + (event.key.charCodeAt(0) - 48);
        updateClickPixel();
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
};

document.onmousemove = function(event) {
    if (inPrompt) {
        return;
    }
    pastCursorX = cursorX;
    pastCursorY = cursorY;
    cursorX = (event.clientX - 10) / (600 * canvasScale - 20) * 600;
    cursorY = (event.clientY - 10) / (600 * canvasScale - 20) * 600;
};
document.onmousedown = function() {
    if (inPrompt) {
        return;
    }
    clicking = true;
};
document.onmouseup = function() {
    if (inPrompt) {
        return;
    }
    clicking = false;
};

document.getElementById("canvas").oncontextmenu = function(event) {
    event.preventDefault();
}
document.getElementById("canvas").addEventListener("wheel", function(event) {
    if (event.deltaY > 0) {
        // cameraZoom += 1;
        // clickSize -= 1;
        // clickSize = Math.max(1, clickSize);
    }
    else {
        // cameraZoom -= 1;
        // clickSize += 1;
        // clickSize = Math.min(gridSize / 2 + 1, clickSize);
    }
    // pixelSize = 600 / gridSize / cameraZoom;
    event.preventDefault();
});

var update = function() {
    if (!inPrompt) {
        try {
            updateClick();
            if (running) {
                updateGrid();
            }
            updateOverlay();
            speedX *= 0.5;
            speedY *= 0.5;
            speedX += heldA ? -3 : 0;
            speedX += heldD ? 3 : 0;
            speedY += heldW ? -3 : 0;
            speedY += heldS ? 3 : 0;
            cameraX += speedX;
            cameraY += speedY;
            if (cameraX <= 0) {
                cameraX = 0;
                speedX = 0;
            }
            if (cameraX >= 1200 - 1200 / cameraZoom) {
                cameraX = 1200 - 1200 / cameraZoom;
                speedX = 0;
            }
            if (cameraY <= 0) {
                cameraY = 0;
                speedY = 0;
            }
            if (cameraY >= 1200 - 1200 / cameraZoom) {
                cameraY = 1200 - 1200 / cameraZoom;
                speedY = 0;
            }
            // document.getElementById("fpsDisplay").innerHTML = cameraX + " " + cameraY;
            ctx.drawImage(offscreenCanvas, Math.floor(cameraX), Math.floor(cameraY), 600, 600, 0, 0, 600, 600);
            effectCtx.clearRect(0, 0, 600, 600);
            effectCtx.drawImage(offscreenEffectCanvas, Math.floor(cameraX), Math.floor(cameraY), 600, 600, 0, 0, 600, 600);
        }
        catch (error) {
            promptNotification(`An error has occured. ${error.stack}`);
        }
    }

    frames.push(millis());
    while (frames[0] + 1000 < millis()) {
        frames.shift(1);
        if (minFPS == null) {
            minFPS = frames.length;
        }
        if (minFPS != null && frames.length < minFPS) {
            minFPS = frames.length;
        }
    }

    if (frames.length > maxFPS) {
        maxFPS = frames.length;
    }
    if (gameTick % 100 == 0) {
        minFPS = frames.length;
        maxFPS = frames.length;
    }

    averageFPS = (frames.length + averageFPS * 3) / 4

    document.getElementById("fpsDisplay").innerHTML = `FPS: ${frames.length}; max: ${maxFPS}; min: ${minFPS}; avg: ${round(averageFPS * 100) / 100};`;
    if (runSpeed < 4) {
        window.requestAnimationFrame(update);
    }
};
window.requestAnimationFrame(update);