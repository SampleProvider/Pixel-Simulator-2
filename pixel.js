// TODO LIST
// lore
// more free levels
// speed up by only drawing necessary
// control c, control x, control v

window.onerror = function(error) {
    promptNotification(`An error has occured. ${error}`);
};

var gameTick = 0;

var frames = [];
var minFPS = null;
var maxFPS = 0;
var averageFPS = 0;

var grid = [];
var nextGrid = [];
var redrawGrid = [];
var placeableGrid = [];
var gridSize = 100;

var overlayPixelCanvas = new OffscreenCanvas(6, 6);
var overlayPixelCtx = overlayPixelCanvas.getContext("2d");
overlayPixelCtx.imageSmoothingEnabled = false;
overlayPixelCtx.webkitImageSmoothingEnabled = false;

var createCanvas = function() {
    document.getElementById("canvas").width = 6 * gridSize / cameraZoom;
    document.getElementById("canvas").height = 6 * gridSize / cameraZoom;
    document.getElementById("effectCanvas").width = 6 * gridSize;
    document.getElementById("effectCanvas").height = 6 * gridSize;
    document.getElementById("placeableCanvas").width = 6 * gridSize;
    document.getElementById("placeableCanvas").height = 6 * gridSize;
    document.getElementById("overlayCanvas").width = 6 * gridSize / cameraZoom;
    document.getElementById("overlayCanvas").height = 6 * gridSize / cameraZoom;
    ctx = document.getElementById("canvas").getContext("2d");
    effectCtx = document.getElementById("effectCanvas").getContext("2d");
    placeableCtx = document.getElementById("placeableCanvas").getContext("2d");
    overlayCtx = document.getElementById("overlayCanvas").getContext("2d");

    offscreenCanvas = new OffscreenCanvas(6 * gridSize, 6 * gridSize);
    offscreenCtx = offscreenCanvas.getContext("2d");
    offscreenEffectCanvas = new OffscreenCanvas(6 * gridSize, 6 * gridSize);
    offscreenEffectCtx = offscreenEffectCanvas.getContext("2d");
    offscreenPlaceableCanvas = new OffscreenCanvas(6 * gridSize, 6 * gridSize);
    offscreenPlaceableCtx = offscreenPlaceableCanvas.getContext("2d");

    ctx.imageSmoothingEnabled = false;
    ctx.webkitImageSmoothingEnabled = false;
    effectCtx.imageSmoothingEnabled = false;
    effectCtx.webkitImageSmoothingEnabled = false;
    placeableCtx.imageSmoothingEnabled = false;
    placeableCtx.webkitImageSmoothingEnabled = false;
    overlayCtx.imageSmoothingEnabled = false;
    overlayCtx.webkitImageSmoothingEnabled = false;
    offscreenCtx.imageSmoothingEnabled = false;
    offscreenCtx.webkitImageSmoothingEnabled = false;
    offscreenEffectCtx.imageSmoothingEnabled = false;
    offscreenEffectCtx.webkitImageSmoothingEnabled = false;
    offscreenPlaceableCtx.imageSmoothingEnabled = false;
    offscreenPlaceableCtx.webkitImageSmoothingEnabled = false;

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, 6 * gridSize, 6 * gridSize);
    offscreenCtx.fillStyle = "rgb(255, 255, 255)";
    offscreenCtx.fillRect(0, 0, 6 * gridSize, 6 * gridSize);

    createOverlayCanvas();
};

var clickSize = 1;
var clickPixel = AIR;

var running = false;
var simulating = false;
var simulateSpeed = 1;
var sandbox = false;
var resetable = false;
var lastGrid = [];
var menuScreen = true;
var menuSpedUp = false;
var optimizedOverlay = localStorage.getItem("optimizedOverlay") == "1";
document.getElementById("optimizedOverlaysButton").style.background = optimizedOverlay ? "#00ff00" : "#ff0000";

var cursorX = 0;
var cursorY = 0;
var pastCursorX = 0;
var pastCursorY = 0;
var leftClicking = false;
var rightClicking = false;

// 0: none
// 1: dragging selection
// 2: selected
// 3: copied, ready to paste
var selectionState = 0;
var selectionX1 = 0;
var selectionY1 = 0;
var selectionX2 = 0;
var selectionY2 = 0;
var copyGrid = [];

var cameraX = 0;
var cameraY = 0;
var rawCameraX = 0;
var rawCameraY = 0;
var cameraZoom = 1;
var heldA = false;
var heldD = false;
var heldW = false;
var heldS = false;
var speedX = 0;
var speedY = 0;

var zoom = function(scale) {
    if (scale == cameraZoom) {
        return;
    }
    rawCameraX = (cameraX * cameraZoom + cursorX) * scale / cameraZoom - cursorX;
    rawCameraY = (cameraY * cameraZoom + cursorY) * scale / cameraZoom - cursorY;
    cameraX = Math.floor(rawCameraX / cameraZoom);
    cameraY = Math.floor(rawCameraY / cameraZoom);
    cameraZoom = scale;
    document.getElementById("canvas").width = 6 * gridSize / cameraZoom;
    document.getElementById("canvas").height = 6 * gridSize / cameraZoom;
    document.getElementById("overlayCanvas").width = 6 * gridSize / cameraZoom;
    document.getElementById("overlayCanvas").height = 6 * gridSize / cameraZoom;
    drawGrid(function() { return true });
    drawPlaceableGrid();
};

var setLerpColor = function() {
    colors.update_push_color();
    colors.update_clone_color();
    colors.update_rgb_color();
};

var drawPixel = function(pixel, x, y, ctx) {
    if (pixels[pixel].drawNoise) {
        if (pixels[pixel].animated) {
            updateNoiseGrid(x, y);
            ctx.fillStyle = colorTint(colors[pixel], animatedNoiseGrid[y][x]);
            ctx.fillRect(x * 6, y * 6, 6, 6);
        }
        else {
            ctx.fillStyle = colorTint(colors[pixel], noiseGrid[y][x]);
            ctx.fillRect(x * 6, y * 6, 6, 6);
        }
    }
    if (pixels[pixel].renderedCanvas) {
        if (pixels[pixel].renderedCanvas.length) {
            ctx.drawImage(pixels[pixel].renderedCanvas[gameTick % 60], x * 6, y * 6, 6, 6);
        }
        else {
            ctx.drawImage(pixels[pixel].renderedCanvas, x * 6, y * 6, 6, 6);
        }
    }
    if (pixels[pixel].drawDetail) {
        pixels[pixel].drawDetail(x, y, ctx);
    }
}
var drawCanvas = function() {
    ctx.drawImage(offscreenCanvas, cameraX, cameraY, 6 * gridSize / cameraZoom, 6 * gridSize / cameraZoom, 0, 0, 6 * gridSize / cameraZoom, 6 * gridSize / cameraZoom);
    ctx.drawImage(offscreenEffectCanvas, cameraX, cameraY, 6 * gridSize / cameraZoom, 6 * gridSize / cameraZoom, 0, 0, 6 * gridSize / cameraZoom, 6 * gridSize / cameraZoom);
    ctx.drawImage(offscreenPlaceableCanvas, cameraX, cameraY, 6 * gridSize / cameraZoom, 6 * gridSize / cameraZoom, 0, 0, 6 * gridSize / cameraZoom, 6 * gridSize / cameraZoom);
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
                    if (pixels[pixel].draw) {
                        pixels[pixel].draw(pixelX, i, j - pixelX, offscreenCtx);
                    }
                    for (var k = pixelX; k < j; k++) {
                        drawPixel(pixel, k, i, offscreenCtx);
                    }
                    pixel = grid[i][j][0];
                    pixelX = j;
                }
            }
            else if (pixel != null) {
                if (pixels[pixel].draw) {
                    pixels[pixel].draw(pixelX, i, j - pixelX, offscreenCtx);
                }
                for (var k = pixelX; k < j; k++) {
                    drawPixel(pixel, k, i, offscreenCtx);
                }
                pixel = null;
            }
        }
        if (pixel != null) {
            if (pixels[pixel].draw) {
                pixels[pixel].draw(pixelX, i, gridSize - pixelX, offscreenCtx);
            }
            for (var k = pixelX; k < gridSize; k++) {
                drawPixel(pixel, k, i, offscreenCtx);
            }
            pixel = null;
        }
    }
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (criteria(j, i, 1)) {
                if (pixel == null) {
                    pixel = grid[i][j][1];
                    pixelX = j;
                }
                if (pixel != grid[i][j][1]) {
                    if (pixel != AIR) {
                        if (pixels[pixel].draw) {
                            pixels[pixel].draw(pixelX, i, j - pixelX, offscreenEffectCtx);
                        }
                        for (var k = pixelX; k < j; k++) {
                            drawPixel(pixel, k, i, offscreenEffectCtx);
                        }
                    }
                    else {
                        offscreenEffectCtx.clearRect(pixelX * 6, i * 6, (j - pixelX) * 6, 6);
                    }
                    pixel = grid[i][j][1];
                    pixelX = j;
                }
            }
            else if (pixel != null) {
                if (pixel != AIR) {
                    if (pixels[pixel].draw) {
                        pixels[pixel].draw(pixelX, i, j - pixelX, offscreenEffectCtx);
                    }
                    for (var k = pixelX; k < j; k++) {
                        drawPixel(pixel, k, i, offscreenEffectCtx);
                    }
                }
                else {
                    offscreenEffectCtx.clearRect(pixelX * 6, i * 6, (j - pixelX) * 6, 6);
                }
                pixel = null;
            }
        }
        if (pixel != null) {
            if (pixel != AIR) {
                if (pixels[pixel].draw) {
                    pixels[pixel].draw(pixelX, i, gridSize - pixelX, offscreenEffectCtx);
                }
                for (var k = pixelX; k < j; k++) {
                    drawPixel(pixel, k, i, offscreenEffectCtx);
                }
            }
            else {
                offscreenEffectCtx.clearRect(pixelX * 6, i * 6, (gridSize - pixelX) * 6, 6);
            }
            pixel = null;
        }
    }
};
var drawPlaceableGrid = function() {
    offscreenPlaceableCtx.clearRect(0, 0, 6 * gridSize, 6 * gridSize);
    var pixel = null;
    var pixelX = 0;
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (pixel == null) {
                pixel = placeableGrid[i][j];
                pixelX = j;
            }
            if (pixel != placeableGrid[i][j]) {
                if (!pixel) {
                    pixels[NOT_PLACEABLE].draw(pixelX, i, j - pixelX, offscreenPlaceableCtx);
                    for (var k = pixelX; k < j; k++) {
                        drawPixel(NOT_PLACEABLE, k, i, offscreenPlaceableCtx);
                    }
                }
                pixel = placeableGrid[i][j];
                pixelX = j;
            }
        }
        if (!pixel) {
            pixels[NOT_PLACEABLE].draw(pixelX, i, gridSize - pixelX, offscreenPlaceableCtx);
            for (var k = pixelX; k < gridSize; k++) {
                drawPixel(NOT_PLACEABLE, k, i, offscreenPlaceableCtx);
            }
            pixel = null;
        }
    }
}
var createGrid = function() {
    grid = [];
    nextGrid = [];
    redrawGrid = [];
    placeableGrid = [];
    for (var i = 0; i < gridSize; i++) {
        grid[i] = [];
        nextGrid[i] = [];
        redrawGrid[i] = [];
        placeableGrid[i] = [];
        for (var j = 0; j < gridSize; j++) {
            grid[i][j] = [AIR, AIR];
            nextGrid[i][j] = [null, null];
            redrawGrid[i][j] = [false, false];
            placeableGrid[i][j] = true;
        }
    }
    setNoiseGrid();
    createCanvas();
};
var resetGrid = function() {
    gameTick = 0;
    document.getElementById("tickDisplay").innerHTML = `Tick: ${gameTick}`;
    resetRandom();
    setLerpColor();
    drawGrid(function() { return true });
    drawPlaceableGrid();
    drawCanvas();
    running = false;
    simulating = false;
    resetable = false;
    updateButtons();
    updateDisabled();
};
var renderPixels = function() {
    for (var i = 0; i < pixels.length; i++) {
        if (pixels[i].render) {
            if (pixels[i].renderedCanvas == null) {
                pixels[i].renderedCanvas = new OffscreenCanvas(6, 6);
                var context = pixels[i].renderedCanvas.getContext("2d");
                context.imageSmoothingEnabled = false;
                context.webkitImageSmoothingEnabled = false;
                pixels[i].render(context);
            }
            else if (pixels[i].renderedCanvas.length == 0) {
                for (var j = 0; j < 60; j++) {
                    gameTick = j;
                    setLerpColor();
                    pixels[i].renderedCanvas[j] = new OffscreenCanvas(6, 6);
                    pixels[i].render(pixels[i].renderedCanvas[j].getContext("2d"));
                }
            }
        }
    }
};
var setRedrawGrid = function() {
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (nextGrid[i][j][0] != null) {
                if (grid[i][j][0] != nextGrid[i][j][0]) {
                    grid[i][j][0] = nextGrid[i][j][0];
                    redrawGrid[i][j][0] = true;
                }
                nextGrid[i][j][0] = null;
            }
            if (nextGrid[i][j][1] != null) {
                if (grid[i][j][1] != nextGrid[i][j][1]) {
                    grid[i][j][1] = nextGrid[i][j][1];
                    redrawGrid[i][j][1] = true;
                }
                nextGrid[i][j][1] = null;
            }
        }
    }
};
var updateGrid = function() {
    if (resetable == false) {
        resetable = true;
        lastGrid = JSON.parse(JSON.stringify(grid));
        updateButtons();
    }

    setLerpColor();

    // update stage
    // 0: gravity pixels
    // 1: mechanical movement
    // 2: rotators, swappers
    if (gameTick % 2 == 0) {
        for (var i = gridSize - 1; i >= 0; i--) {
            var tiles = [];
            for (var j = 0; j < gridSize; j++) {
                tiles[j] = [null, null];
                if (pixels[grid[i][j][0]].updateStage == 0 && pixels[grid[i][j][0]].updateDirection == "up") {
                    tiles[j][0] = grid[i][j][0];
                }
                if (pixels[grid[i][j][1]].updateStage == 0 && pixels[grid[i][j][1]].updateDirection == "up") {
                    tiles[j][1] = grid[i][j][1];
                }
            }
            for (var j = 0; j < gridSize; j++) {
                if (tiles[j][1] == grid[i][j][1]) {
                    pixels[tiles[j][1]].update(j, i);
                }
                if (tiles[j][0] == grid[i][j][0]) {
                    pixels[tiles[j][0]].update(j, i);
                }
            }
        }
        setRedrawGrid();
        for (var updateStage = 1; updateStage <= 2; updateStage++) {
            for (var i = gridSize - 1; i >= 0; i--) {
                for (var j = 0; j < gridSize; j++) {
                    if (pixels[grid[j][i][1]].updateStage == updateStage && pixels[grid[j][i][1]].updateDirection == "left") {
                        pixels[grid[j][i][1]].update(i, j);
                    }
                    if (pixels[grid[j][i][0]].updateStage == updateStage && pixels[grid[j][i][0]].updateDirection == "left") {
                        pixels[grid[j][i][0]].update(i, j);
                    }
                }
            }
            for (var i = 0; i < gridSize; i++) {
                for (var j = 0; j < gridSize; j++) {
                    if (pixels[grid[j][i][1]].updateStage == updateStage && pixels[grid[j][i][1]].updateDirection == "right") {
                        pixels[grid[j][i][1]].update(i, j);
                    }
                    if (pixels[grid[j][i][0]].updateStage == updateStage && pixels[grid[j][i][0]].updateDirection == "right") {
                        pixels[grid[j][i][0]].update(i, j);
                    }
                }
            }
            for (var i = gridSize - 1; i >= 0; i--) {
                for (var j = 0; j < gridSize; j++) {
                    if (pixels[grid[i][j][1]].updateStage == updateStage && pixels[grid[i][j][1]].updateDirection == "up") {
                        pixels[grid[i][j][1]].update(j, i);
                    }
                    if (pixels[grid[i][j][0]].updateStage == updateStage && pixels[grid[i][j][0]].updateDirection == "up") {
                        pixels[grid[i][j][0]].update(j, i);
                    }
                }
            }
            for (var i = 0; i < gridSize; i++) {
                for (var j = 0; j < gridSize; j++) {
                    if (pixels[grid[i][j][1]].updateStage == updateStage && pixels[grid[i][j][1]].updateDirection == "down") {
                        pixels[grid[i][j][1]].update(j, i);
                    }
                    if (pixels[grid[i][j][0]].updateStage == updateStage && pixels[grid[i][j][0]].updateDirection == "down") {
                        pixels[grid[i][j][0]].update(j, i);
                    }
                }
            }
            setRedrawGrid();
        }
    }
    else {
        for (var i = gridSize - 1; i >= 0; i--) {
            var tiles = [];
            for (var j = gridSize - 1; j >= 0; j--) {
                tiles[j] = [null, null];
                if (pixels[grid[i][j][0]].updateStage == 0 && pixels[grid[i][j][0]].updateDirection == "up") {
                    tiles[j][0] = grid[i][j][0];
                }
                if (pixels[grid[i][j][1]].updateStage == 0 && pixels[grid[i][j][1]].updateDirection == "up") {
                    tiles[j][1] = grid[i][j][1];
                }
            }
            for (var j = gridSize - 1; j >= 0; j--) {
                if (tiles[j][1] == grid[i][j][1]) {
                    pixels[tiles[j][1]].update(j, i);
                }
                if (tiles[j][0] == grid[i][j][0]) {
                    pixels[tiles[j][0]].update(j, i);
                }
            }
        }
        setRedrawGrid();
        for (var updateStage = 1; updateStage <= 2; updateStage++) {
            for (var i = gridSize - 1; i >= 0; i--) {
                for (var j = gridSize - 1; j >= 0; j--) {
                    if (pixels[grid[j][i][0]].updateStage == updateStage && pixels[grid[j][i][0]].updateDirection == "left") {
                        pixels[grid[j][i][0]].update(i, j);
                    }
                    if (pixels[grid[j][i][1]].updateStage == updateStage && pixels[grid[j][i][1]].updateDirection == "left") {
                        pixels[grid[j][i][1]].update(i, j);
                    }
                }
            }
            for (var i = 0; i < gridSize; i++) {
                for (var j = gridSize - 1; j >= 0; j--) {
                    if (pixels[grid[j][i][0]].updateStage == updateStage && pixels[grid[j][i][0]].updateDirection == "right") {
                        pixels[grid[j][i][0]].update(i, j);
                    }
                    if (pixels[grid[j][i][1]].updateStage == updateStage && pixels[grid[j][i][1]].updateDirection == "right") {
                        pixels[grid[j][i][1]].update(i, j);
                    }
                }
            }
            for (var i = gridSize - 1; i >= 0; i--) {
                for (var j = gridSize - 1; j >= 0; j--) {
                    if (pixels[grid[i][j][0]].updateStage == updateStage && pixels[grid[i][j][0]].updateDirection == "up") {
                        pixels[grid[i][j][0]].update(j, i);
                    }
                    if (pixels[grid[i][j][1]].updateStage == updateStage && pixels[grid[i][j][1]].updateDirection == "up") {
                        pixels[grid[i][j][1]].update(j, i);
                    }
                }
            }
            for (var i = 0; i < gridSize; i++) {
                for (var j = gridSize - 1; j >= 0; j--) {
                    if (pixels[grid[i][j][0]].updateStage == updateStage && pixels[grid[i][j][0]].updateDirection == "down") {
                        pixels[grid[i][j][0]].update(j, i);
                    }
                    if (pixels[grid[i][j][1]].updateStage == updateStage && pixels[grid[i][j][1]].updateDirection == "down") {
                        pixels[grid[i][j][1]].update(j, i);
                    }
                }
            }
            setRedrawGrid();
        }
    }

    if (!simulating) {
        // drawGrid(function(x, y, layer) { return (nextGrid[y][x][layer] != null && nextGrid[y][x][layer] != grid[y][x][layer]) || pixels[grid[y][x][layer]].animated; });
        // drawGrid(function() { return true });
        // drawGrid(function(x, y, layer) { return (nextGrid[y][x][layer] != null) || pixels[grid[y][x][layer]].animated; });
        drawGrid(function(x, y, layer) { return (redrawGrid[y][x][layer]) || pixels[grid[y][x][layer]].animated; });
        // drawGrid(function(x, y, layer) { return (startGrid[y][x][layer] != grid[y][x][layer])});
        // drawGrid(function() { return true });
    }
    else if (gameTick % 100 == 0) {
        drawGrid(function() { return true });
    }
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            redrawGrid[i][j] = [false, false];
        }
    }

    if (!sandbox && !menuScreen) {
        var monsterAlive = false;
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                if (pixels[grid[i][j][0]].monster) {
                    monsterAlive = true;
                    break;
                }
            }
            if (monsterAlive) {
                break;
            }
        }

        if (!monsterAlive) {
            showWinScreen();
        }
    }

    gameTick++;
    document.getElementById("tickDisplay").innerHTML = `Tick: ${gameTick}`;
};

var clickLine = function(startX, startY, endX, endY) {
    var x = startX;
    var y = startY;
    var angle = Math.atan2(endY - startY, endX - startX);
    var distance = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
    var layer = pixels[clickPixel].effect ? 1 : 0;
    var context = pixels[clickPixel].effect ? offscreenEffectCtx : offscreenCtx;
    for (var i = 0; i <= distance; i++) {
        var gridX = Math.floor(x);
        var gridY = Math.floor(y);
        var pixel = false;
        var pixelX = 0;
        for (var j = Math.max(gridY - clickSize + 1, 0); j <= Math.min(gridY + clickSize - 1, gridSize - 1); j++) {
            for (var k = Math.max(gridX - clickSize + 1, 0); k <= Math.min(gridX + clickSize - 1, gridSize - 1); k++) {
                if (clickPixel == AIR) {
                    if ((sandbox == true || placeableGrid[j][k]) && (grid[j][k][0] != clickPixel || grid[j][k][1] != clickPixel)) {
                        if (pixel == false) {
                            pixel = true;
                            pixelX = k;
                        }
                        if (sandbox == false) {
                            if (grid[j][k][0] != clickPixel) {
                                if (pixelInventory[grid[j][k][0]] < 0) {
                                    pixelInventory[grid[j][k][0]] = 0;
                                }
                                pixelInventory[grid[j][k][0]] += 1;
                            }
                            if (grid[j][k][1] != clickPixel) {
                                if (pixelInventory[grid[j][k][1]] < 0) {
                                    pixelInventory[grid[j][k][1]] = 0;
                                }
                                pixelInventory[grid[j][k][1]] += 1;
                            }
                        }
                        grid[j][k][0] = clickPixel;
                        grid[j][k][1] = clickPixel;
                    }
                    else if (pixel == true) {
                        if (pixels[clickPixel].draw) {
                            pixels[clickPixel].draw(pixelX, j, k - pixelX, context);
                        }
                        for (var l = pixelX; l < k; l++) {
                            drawPixel(clickPixel, l, j, context);
                        }
                        offscreenEffectCtx.clearRect(pixelX * 6, j * 6, (k - pixelX) * 6, 6);
                        pixel = false;
                    }
                }
                else if (clickPixel == PLACEABLE) {
                    if (placeableGrid[j][k] == false) {
                        if (pixel == false) {
                            pixel = true;
                            pixelX = k;
                        }
                        placeableGrid[j][k] = true;
                    }
                    else if (pixel == true) {
                        pixels[clickPixel].draw(pixelX, j, k - pixelX, offscreenPlaceableCtx);
                        // for (var l = pixelX; l < k; l++) {
                        //     drawPixel(clickPixel, l, j, offscreenPlaceableCtx);
                        // }
                        pixel = false;
                    }
                }
                else if (clickPixel == NOT_PLACEABLE) {
                    if (placeableGrid[j][k] == true) {
                        if (pixel == false) {
                            pixel = true;
                            pixelX = k;
                        }
                        placeableGrid[j][k] = false;
                    }
                    else if (pixel == true) {
                        pixels[clickPixel].draw(pixelX, j, k - pixelX, offscreenPlaceableCtx);
                        for (var l = pixelX; l < k; l++) {
                            drawPixel(clickPixel, l, j, offscreenPlaceableCtx);
                        }
                        pixel = false;
                    }
                }
                else {
                    if ((sandbox == true || (placeableGrid[j][k] && pixelInventory[clickPixel] > 0)) && grid[j][k][layer] != clickPixel) {
                        if (pixel == false) {
                            pixel = true;
                            pixelX = k;
                        }
                        if (sandbox == false) {
                            pixelInventory[clickPixel] -= 1;
                        }
                        if (grid[j][k][layer] != AIR) {
                            if (pixelInventory[grid[j][k][layer]] < 0) {
                                pixelInventory[grid[j][k][layer]] = 0;
                            }
                            pixelInventory[grid[j][k][layer]] += 1;
                        }
                        grid[j][k][layer] = clickPixel;
                    }
                    else if (pixel == true) {
                        if (pixels[clickPixel].draw) {
                            pixels[clickPixel].draw(pixelX, j, k - pixelX, context);
                        }
                        for (var l = pixelX; l < k; l++) {
                            drawPixel(clickPixel, l, j, context);
                        }
                        pixel = false;
                    }
                }
            }
            if (pixel == true) {
                if (clickPixel == PLACEABLE) {
                    pixels[clickPixel].draw(pixelX, j, Math.min(gridX + clickSize, gridSize) - pixelX, offscreenPlaceableCtx);
                    for (var k = pixelX; k < Math.min(gridX + clickSize, gridSize); k++) {
                        drawPixel(clickPixel, k, j, offscreenPlaceableCtx);
                    }
                }
                else if (clickPixel == NOT_PLACEABLE) {
                    pixels[clickPixel].draw(pixelX, j, Math.min(gridX + clickSize, gridSize) - pixelX, offscreenPlaceableCtx);
                    for (var k = pixelX; k < Math.min(gridX + clickSize, gridSize); k++) {
                        drawPixel(clickPixel, k, j, offscreenPlaceableCtx);
                    }
                }
                else {
                    if (pixels[clickPixel].draw) {
                        pixels[clickPixel].draw(pixelX, j, Math.min(gridX + clickSize, gridSize) - pixelX, context);
                    }
                    for (var k = pixelX; k < Math.min(gridX + clickSize, gridSize); k++) {
                        drawPixel(clickPixel, k, j, context);
                    }
                    if (clickPixel == AIR) {
                        offscreenEffectCtx.clearRect(pixelX * 6, j * 6, (Math.min(gridX + clickSize, gridSize) - pixelX) * 6, 6);
                    }
                }
                pixel = false;
            }
        }
        x += Math.cos(angle);
        y += Math.sin(angle);
    }
    storeGrid();
};
var updateClick = function() {
    if (cursorX >= 0 && cursorX <= 600 && cursorY >= 0 && cursorY <= 600) {
        if (sandbox == false && resetable == true) {
            return;
        }
        if (selectionState == 1) {
            return;
        }
        if (selectionState == 3) {
            if (leftClicking) {
                var pixel0 = null;
                var pixel0X = 0;
                var pixel1 = null;
                var pixel1X = 0;
                var newPixels = {};
                for (var y = Math.max(0, -Math.floor((cameraY + cursorY / cameraZoom - copyGrid.length * 3) / 6)); y < Math.min(copyGrid.length, gridSize - Math.floor((cameraY + cursorY / cameraZoom - copyGrid.length * 3) / 6)); y++) {
                    var gridY = Math.floor((cameraY + cursorY / cameraZoom - copyGrid.length * 3) / 6) + y;
                    for (var x = Math.max(0, -Math.floor((cameraX + cursorX / cameraZoom - copyGrid[0].length * 3) / 6)); x < Math.min(copyGrid[0].length, gridSize - Math.floor((cameraX + cursorX / cameraZoom - copyGrid[0].length * 3) / 6)); x++) {
                        var gridX = Math.floor((cameraX + cursorX / cameraZoom - copyGrid[0].length * 3) / 6) + x;
                        var changed0 = false;
                        var changed1 = false;
                        if (!sandbox) {
                            if (placeableGrid[gridY][gridX] == false) {
                                if (pixel0 != null) {
                                    if (pixels[pixel0].draw) {
                                        pixels[pixel0].draw(pixel0X, gridY, gridX - pixel0X, offscreenCtx);
                                    }
                                    for (var i = pixel0X; i < gridX; i++) {
                                        drawPixel(pixel0, i, gridY, offscreenCtx);
                                    }
                                    pixel0 = null;
                                }
                                if (pixel1 != null) {
                                    if (pixel1 != AIR) {
                                        if (pixels[pixel1].draw) {
                                            pixels[pixel1].draw(pixel1X, gridY, gridX - pixel1X, offscreenEffectCtx);
                                        }
                                        for (var i = pixel1X; i < gridX; i++) {
                                            drawPixel(pixel1, i, gridY, offscreenEffectCtx);
                                        }
                                    }
                                    else {
                                        offscreenEffectCtx.clearRect(pixel1X * 6, gridY * 6, (gridX - pixel1X) * 6, 6);
                                    }
                                    pixel1 = null;
                                }
                                continue;
                            }
                            if (pixelInventory[copyGrid[y][x][0]] > 0 || copyGrid[y][x][0] == AIR) {
                                if (grid[gridY][gridX][0] != AIR) {
                                    if (pixelInventory[grid[gridY][gridX][0]] < 0) {
                                        pixelInventory[grid[gridY][gridX][0]] = 0;
                                        newPixels[grid[gridY][gridX][0]] = true;
                                    }
                                    pixelInventory[grid[gridY][gridX][0]] += 1;
                                }
                                if (copyGrid[y][x][0] != AIR) {
                                    pixelInventory[copyGrid[y][x][0]] -= 1;
                                }
                                if (grid[gridY][gridX][0] != copyGrid[y][x][0]) {
                                    grid[gridY][gridX][0] = copyGrid[y][x][0];
                                    changed0 = true;
                                }
                            }
                            if (pixelInventory[copyGrid[y][x][1]] > 0 || copyGrid[y][x][1] == AIR) {
                                if (grid[gridY][gridX][1] != AIR) {
                                    if (pixelInventory[grid[gridY][gridX][1]] < 0) {
                                        pixelInventory[grid[gridY][gridX][1]] = 0;
                                        newPixels[grid[gridY][gridX][1]] = true;
                                    }
                                    pixelInventory[grid[gridY][gridX][1]] += 1;
                                }
                                if (copyGrid[y][x][1] != AIR) {
                                    pixelInventory[copyGrid[y][x][1]] -= 1;
                                }
                                if (grid[gridY][gridX][1] != copyGrid[y][x][1]) {
                                    grid[gridY][gridX][1] = copyGrid[y][x][1];
                                    changed1 = true;
                                }
                            }
                        }
                        else {
                            if (grid[gridY][gridX][0] != copyGrid[y][x][0]) {
                                grid[gridY][gridX][0] = copyGrid[y][x][0];
                                changed0 = true;
                            }
                            if (grid[gridY][gridX][1] != copyGrid[y][x][1]) {
                                grid[gridY][gridX][1] = copyGrid[y][x][1];
                                changed1 = true;
                            }
                        }
                        if (changed0) {
                            if (pixel0 == null) {
                                pixel0 = grid[gridY][gridX][0];
                                pixel0X = gridX;
                            }
                            if (pixel0 != grid[gridY][gridX][0]) {
                                if (pixels[pixel0].draw) {
                                    pixels[pixel0].draw(pixel0X, gridY, gridX - pixel0X, offscreenCtx);
                                }
                                for (var i = pixel0X; i < gridX; i++) {
                                    drawPixel(pixel0, i, gridY, offscreenCtx);
                                }
                                pixel0 = grid[gridY][gridX][0];
                                pixel0X = gridX;
                            }
                        }
                        else if (pixel0 != null) {
                            if (pixels[pixel0].draw) {
                                pixels[pixel0].draw(pixel0X, gridY, gridX - pixel0X, offscreenCtx);
                            }
                            for (var i = pixel0X; i < gridX; i++) {
                                drawPixel(pixel0, i, gridY, offscreenCtx);
                            }
                            pixel0 = null;
                        }
                        if (changed1) {
                            if (pixel1 == null) {
                                pixel1 = grid[gridY][gridX][1];
                                pixel1X = gridX;
                            }
                            if (pixel1 != grid[gridY][gridX][1]) {
                                if (pixel1 != AIR) {
                                    if (pixels[pixel1].draw) {
                                        pixels[pixel1].draw(pixel1X, gridY, gridX - pixel1X, offscreenEffectCtx);
                                    }
                                    for (var i = pixel1X; i < gridX; i++) {
                                        drawPixel(pixel1, i, gridY, offscreenEffectCtx);
                                    }
                                }
                                else {
                                    offscreenEffectCtx.clearRect(pixel1X * 6, gridY * 6, (gridX - pixel1X) * 6, 6);
                                }
                                pixel1 = grid[gridY][gridX][1];
                                pixel1X = gridX;
                            }
                        }
                        else if (pixel1 != null) {
                            if (pixel1 != AIR) {
                                if (pixels[pixel1].draw) {
                                    pixels[pixel1].draw(pixel1X, gridY, gridX - pixel1X, offscreenEffectCtx);
                                }
                                for (var i = pixel1X; i < gridX; i++) {
                                    drawPixel(pixel1, i, gridY, offscreenEffectCtx);
                                }
                            }
                            else {
                                offscreenEffectCtx.clearRect(pixel1X * 6, gridY * 6, (gridX - pixel1X) * 6, 6);
                            }
                            pixel1 = null;
                        }
                    }
                    if (pixel0 != null) {
                        var gridX = Math.floor((cameraX * cameraZoom + cursorX + copyGrid[0].length * 3 * cameraZoom) / (6 * cameraZoom));
                        if (pixels[pixel0].draw) {
                            pixels[pixel0].draw(pixel0X, gridY, gridX - pixel0X, offscreenCtx);
                        }
                        for (var i = pixel0X; i < gridX; i++) {
                            drawPixel(pixel0, i, gridY, offscreenCtx);
                        }
                        pixel0 = null;
                    }
                    pixel0X = 0;
                    if (pixel1 != null) {
                        var gridX = Math.floor((cameraX * cameraZoom + cursorX + copyGrid[0].length * 3 * cameraZoom) / (6 * cameraZoom));
                        if (pixel1 != AIR) {
                            if (pixels[pixel1].draw) {
                                pixels[pixel1].draw(pixel1X, gridY, gridX - pixel1X, offscreenEffectCtx);
                            }
                            for (var i = pixel1X; i < gridX; i++) {
                                drawPixel(pixel1, i, gridY, offscreenEffectCtx);
                            }
                        }
                        else {
                            offscreenEffectCtx.clearRect(pixel1X * 6, gridY * 6, (gridX - pixel1X) * 6, 6);
                        }
                        pixel1 = null;
                    }
                    pixel1X = 0;
                }
                for (var i in newPixels) {
                    if (pixelInventory[i] == 0) {
                        pixelInventory[i] = -1;
                    }
                }
                updateDisabled();
                setClickDescription(clickPixel);
                storeGrid();
                drawCanvas();
            }
            return;
        }
        if (leftClicking) {
            if (sandbox == false && clickPixel != AIR && pixelInventory[clickPixel] == 0) {
                return;
            }
            clickLine(Math.floor((cameraX * cameraZoom + cursorX) / (6 * cameraZoom)), Math.floor((cameraY * cameraZoom + cursorY) / (6 * cameraZoom)), Math.floor((cameraX * cameraZoom + pastCursorX) / (6 * cameraZoom)), Math.floor((cameraY * cameraZoom + pastCursorY) / (6 * cameraZoom)));
        }
        else if (rightClicking) {
            var pixel = clickPixel;
            clickPixel = AIR;
            clickLine(Math.floor((cameraX * cameraZoom + cursorX) / (6 * cameraZoom)), Math.floor((cameraY * cameraZoom + cursorY) / (6 * cameraZoom)), Math.floor((cameraX * cameraZoom + pastCursorX) / (6 * cameraZoom)), Math.floor((cameraY * cameraZoom + pastCursorY) / (6 * cameraZoom)));
            clickPixel = pixel;
        }
        updateDisabled();
        setClickDescription(clickPixel);
    }
};
var createOverlayCanvas = function() {
    if (selectionState == 3) {
        overlayPixelCanvas = new OffscreenCanvas(copyGrid[0].length * 6, copyGrid.length * 6);
    }
    else {
        overlayPixelCanvas = new OffscreenCanvas((clickSize * 2 - 1) * 6, (clickSize * 2 - 1) * 6);
    }
    overlayPixelCtx = overlayPixelCanvas.getContext("2d");
    overlayPixelCtx.imageSmoothingEnabled = false;
    overlayPixelCtx.webkitImageSmoothingEnabled = false;
};
createCanvas();
var drawOverlay = function() {
    if (selectionState == 3) {
        var pixel0 = null;
        var pixel0X = 0;
        for (var y = Math.max(0, -Math.floor((cameraY + cursorY / cameraZoom - copyGrid.length * 3) / 6)); y < Math.min(copyGrid.length, gridSize - Math.floor((cameraY + cursorY / cameraZoom - copyGrid.length * 3) / 6)); y++) {
            for (var x = Math.max(0, -Math.floor((cameraX + cursorX / cameraZoom - copyGrid[0].length * 3) / 6)); x < Math.min(copyGrid[0].length, gridSize - Math.floor((cameraX + cursorX / cameraZoom - copyGrid[0].length * 3) / 6)); x++) {
                if (pixel0 == null) {
                    pixel0 = copyGrid[y][x][0];
                    pixel0X = x;
                }
                if (pixel0 != copyGrid[y][x][0]) {
                    if (pixels[pixel0].draw) {
                        pixels[pixel0].draw(pixel0X, y, x - pixel0X, overlayPixelCtx);
                    }
                    for (var i = pixel0X; i < x; i++) {
                        drawPixel(pixel0, i, y, overlayPixelCtx);
                    }
                    pixel0 = copyGrid[y][x][0];
                    pixel0X = x;
                }
            }
            if (pixel0 != null) {
                var x = Math.min(copyGrid[0].length, gridSize - Math.floor((cameraX + cursorX / cameraZoom - copyGrid.length * 3) / 6));
                if (pixels[pixel0].draw) {
                    pixels[pixel0].draw(pixel0X, y, x - pixel0X, overlayPixelCtx);
                }
                for (var i = pixel0X; i < x; i++) {
                    drawPixel(pixel0, i, y, overlayPixelCtx);
                }
                pixel0 = null;
            }
        }
        var pixel1 = null;
        var pixel1X = 0;
        for (var y = Math.max(0, -Math.floor((cameraY + cursorY / cameraZoom - copyGrid.length * 3) / 6)); y < Math.min(copyGrid.length, gridSize - Math.floor((cameraY + cursorY / cameraZoom - copyGrid.length * 3) / 6)); y++) {
            for (var x = Math.max(0, -Math.floor((cameraX + cursorX / cameraZoom - copyGrid.length * 3) / 6)); x < Math.min(copyGrid[0].length, gridSize - Math.floor((cameraX + cursorX / cameraZoom - copyGrid.length * 3) / 6)); x++) {
                if (pixel1 == null) {
                    pixel1 = copyGrid[y][x][1];
                    pixel1X = x;
                }
                if (pixel1 != copyGrid[y][x][1]) {
                    if (pixel1 != AIR) {
                        // if (pixels[pixel1].draw) {
                        //     pixels[pixel1].draw(pixel1X, y, x - pixel1X, overlayPixelCtx);
                        // }
                        for (var i = pixel1X; i < x; i++) {
                            drawPixel(pixel1, i, y, overlayPixelCtx);
                        }
                    }
                    pixel1 = copyGrid[y][x][1];
                    pixel1X = x;
                }
            }
            if (pixel1 != null) {
                if (pixel1 != AIR) {
                    var x = Math.min(copyGrid[0].length, gridSize - Math.floor((cameraX + cursorX / cameraZoom - copyGrid.length * 3) / 6));
                    // if (pixels[pixel1].draw) {
                    //     pixels[pixel1].draw(pixel1X, y, x - pixel1X, overlayPixelCtx);
                    // }
                    for (var i = pixel1X; i < x; i++) {
                        drawPixel(pixel1, i, y, overlayPixelCtx);
                    }
                }
                pixel1 = null;
            }
        }
        return;
    }
    var startX = Math.floor((cameraX * cameraZoom + cursorX) / (6 * cameraZoom)) - clickSize + 1;
    var x1 = Math.max(Math.floor((cameraX * cameraZoom + cursorX) / (6 * cameraZoom)) - clickSize + 1, 0);
    var x2 = Math.min(Math.floor((cameraX * cameraZoom + cursorX) / (6 * cameraZoom)) + clickSize - 1, gridSize - 1);
    var startY = Math.floor((cameraY * cameraZoom + cursorY) / (6 * cameraZoom)) - clickSize + 1;
    var y1 = Math.max(Math.floor((cameraY * cameraZoom + cursorY) / (6 * cameraZoom)) - clickSize + 1, 0);
    var y2 = Math.min(Math.floor((cameraY * cameraZoom + cursorY) / (6 * cameraZoom)) + clickSize - 1, gridSize - 1);
    if (clickPixel == AIR) {
        overlayPixelCtx.clearRect(x1 - startX, y1 - startY, (x2 - x1 + 1) * 6, (y2 - y1 + 1) * 6);
        return;
    }
    if (pixels[clickPixel].draw) {
        for (var i = y1; i <= y2; i++) {
            pixels[clickPixel].draw(x1 - startX, i - startY, x2 - x1 + 1, overlayPixelCtx);
        }
    }

    for (var i = y1; i <= y2; i++) {
        for (var j = x1; j <= x2; j++) {
            drawPixel(clickPixel, j - startX, i - startY, overlayPixelCtx);
        }
    }
};
var updateOverlay = function() {
    overlayCtx.clearRect(0, 0, 6 * gridSize / cameraZoom, 6 * gridSize / cameraZoom);
    var x = Math.floor(Math.floor((cameraX + cursorX / cameraZoom) / 6) - clickSize + 1) * 6 - cameraX;
    var y = Math.floor(Math.floor((cameraY + cursorY / cameraZoom) / 6) - clickSize + 1) * 6 - cameraY;
    var width = (clickSize * 2 - 1) * 6;
    var height = (clickSize * 2 - 1) * 6;
    overlayCtx.lineWidth = 1;
    if (selectionState == 1) {
        overlayCtx.strokeStyle = "rgb(0, 0, 0)";
        overlayCtx.beginPath();
        overlayCtx.setLineDash([6 / 3, 6 / 3]);
        overlayCtx.moveTo(selectionX1 * 6 - cameraX, selectionY1 * 6 - cameraY);
        overlayCtx.lineTo(Math.floor((cameraX + cursorX / cameraZoom) / 6) * 6 - cameraX, selectionY1 * 6 - cameraY);
        overlayCtx.lineTo(Math.floor((cameraX + cursorX / cameraZoom) / 6) * 6 - cameraX, Math.floor((cameraY + cursorY / cameraZoom) / 6) * 6 - cameraY);
        overlayCtx.lineTo(selectionX1 * 6 - cameraX, Math.floor((cameraY + cursorY / cameraZoom) / 6) * 6 - cameraY);
        overlayCtx.lineTo(selectionX1 * 6 - cameraX, selectionY1 * 6 - cameraY);
        overlayCtx.stroke();
        return;
    }
    else if (selectionState == 2) {
        overlayCtx.strokeStyle = "rgb(0, 0, 0)";
        overlayCtx.beginPath();
        overlayCtx.setLineDash([6 / 3, 6 / 3]);
        overlayCtx.moveTo(selectionX1 * 6 - cameraX, selectionY1 * 6 - cameraY);
        overlayCtx.lineTo(selectionX2 * 6 - cameraX, selectionY1 * 6 - cameraY);
        overlayCtx.lineTo(selectionX2 * 6 - cameraX, selectionY2 * 6 - cameraY);
        overlayCtx.lineTo(selectionX1 * 6 - cameraX, selectionY2 * 6 - cameraY);
        overlayCtx.lineTo(selectionX1 * 6 - cameraX, selectionY1 * 6 - cameraY);
        overlayCtx.stroke();
    }
    else if (selectionState == 3) {
        var x1 = Math.floor((cameraX + cursorX / cameraZoom - copyGrid[0].length * 3) / 6) * 6 - cameraX;
        var x2 = Math.floor((cameraX + cursorX / cameraZoom + copyGrid[0].length * 3) / 6) * 6 - cameraX;
        var y1 = Math.floor((cameraY + cursorY / cameraZoom - copyGrid.length * 3) / 6) * 6 - cameraY;
        var y2 = Math.floor((cameraY + cursorY / cameraZoom + copyGrid.length * 3) / 6) * 6 - cameraY;
        drawOverlay();
        overlayCtx.drawImage(overlayPixelCanvas, x1, y1, x2 - x1, y2 - y1);
        overlayCtx.strokeStyle = "rgb(0, 0, 0)";
        overlayCtx.beginPath();
        overlayCtx.setLineDash([6 / 3, 6 / 3]);
        overlayCtx.moveTo(x1, y1);
        overlayCtx.lineTo(x2, y1);
        overlayCtx.lineTo(x2, y2);
        overlayCtx.lineTo(x1, y2);
        overlayCtx.lineTo(x1, y1);
        overlayCtx.stroke();
        return;
    }
    if ((sandbox == false && clickPixel != AIR && pixelInventory[clickPixel] == 0) || rightClicking) {
        overlayCtx.fillStyle = "rgb(255, 0, 0)";
        overlayCtx.fillRect(x, y, width, height);
    }
    else if (!optimizedOverlay) {
        drawOverlay();
        overlayCtx.drawImage(overlayPixelCanvas, x, y, width, height);
    }
    overlayCtx.strokeStyle = "rgb(0, 0, 0)";
    overlayCtx.setLineDash([]);
    overlayCtx.strokeRect(x, y, width, height);
};
var updateFPS = function() {
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

    averageFPS = (frames.length + averageFPS * 3) / 4;
};

var update = function() {
    if (menuScreen) {
        updateMenu();
        window.requestAnimationFrame(update);
        return;
    }
    if (!inTransition) {
        try {
            updateClick();
            pastCursorX = cursorX;
            pastCursorY = cursorY;
            if (running) {
                if (simulating) {
                    for (var i = 0; i < simulateSpeed; i++) {
                        updateGrid();
                        updateFPS();
                        if (inTransition) {
                            break;
                        }
                    }
                }
                else {
                    updateGrid();
                    updateFPS();
                }
            }
            else {
                updateFPS();
            }
            speedX *= 0.5;
            speedY *= 0.5;
            speedX += heldA ? -cameraZoom : 0;
            speedX += heldD ? cameraZoom : 0;
            speedY += heldW ? -cameraZoom : 0;
            speedY += heldS ? cameraZoom : 0;
            rawCameraX += speedX * 2;
            rawCameraY += speedY * 2;
            if (rawCameraX <= 0) {
                rawCameraX = 0;
                speedX = 0;
            }
            if (rawCameraX >= 6 * gridSize * (cameraZoom - 1)) {
                rawCameraX = 6 * gridSize * (cameraZoom - 1);
                speedX = 0;
            }
            if (rawCameraY <= 0) {
                rawCameraY = 0;
                speedY = 0;
            }
            if (rawCameraY >= 6 * gridSize * (cameraZoom - 1)) {
                rawCameraY = 6 * gridSize * (cameraZoom - 1);
                speedY = 0;
            }
            cameraX = Math.floor(rawCameraX / cameraZoom);
            cameraY = Math.floor(rawCameraY / cameraZoom);
            updateOverlay();
            drawCanvas();
        }
        catch (error) {
            promptNotification(`An error has occured. ${error.stack}`);
            running = false;
            simulating = false;
            updateButtons();
            leftClicking = false;
            rightClicking = false;
        }
    }

    document.getElementById("fpsDisplay").innerHTML = `FPS: ${frames.length}; max: ${maxFPS}; min: ${minFPS}; avg: ${round(averageFPS * 100) / 100};`;
    window.requestAnimationFrame(update);
};