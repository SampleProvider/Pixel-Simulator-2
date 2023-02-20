// TODO LIST
// sliders
// collapsable
// penetrator
// missiles

var canvasScale = Math.min(window.innerWidth / 600, window.innerHeight / 600);
document.getElementById("canvas").style.width = 600 * canvasScale - 20 + "px";
document.getElementById("canvas").style.height = 600 * canvasScale - 20 + "px";
document.getElementById("canvas").width = 600;
document.getElementById("canvas").height = 600;
document.getElementById("overlayCanvas").style.width = 600 * canvasScale - 20 + "px";
document.getElementById("overlayCanvas").style.height = 600 * canvasScale - 20 + "px";
document.getElementById("overlayCanvas").width = 600;
document.getElementById("overlayCanvas").height = 600;
var ctx = document.getElementById("canvas").getContext("2d");
var overlayCtx = document.getElementById("overlayCanvas").getContext("2d");

var offscreenCanvas = new OffscreenCanvas(600, 600);
var offscreenCtx = offscreenCanvas.getContext("2d");
var offscreenEffectCanvas = new OffscreenCanvas(600, 600);
var offscreenEffectCtx = offscreenEffectCanvas.getContext("2d");
var offscreenPlaceableCanvas = new OffscreenCanvas(600, 600);
var offscreenPlaceableCtx = offscreenPlaceableCanvas.getContext("2d");
window.onerror = function(error) {
    promptNotification(`An error has occured. ${error}`);
};

ctx.fillStyle = "rgb(255, 255, 255)";
ctx.fillRect(0, 0, 300, 300);

ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
offscreenCtx.fillStyle = "rgb(255, 255, 255)";
offscreenCtx.fillRect(0, 0, 600, 600);

var gameTick = 0;

var frames = [];
var minFPS = null;
var maxFPS = 0;
var averageFPS = 0;

var grid = [];
var nextGrid = [];
var placeableGrid = [];
var gridSize = 100;
var pixelSize = 600 / gridSize;

var clickSize = 1;
var clickPixel = "air";

var running = false;
var runSpeedRaw = 0.25;
//input varies from 0 to 1, but true speed changes exponentially
var runSpeed = 1;
var runsToExecute = 0;
var sandbox = false;
var resetable = false;
var lastGrid = [];
var menuScreen = true;
var menuSpedUp = false;
var inPrompt = false;

var cursorX = 0;
var cursorY = 0;
var pastCursorX = 0;
var pastCursorY = 0;
var leftClicking = false;
var rightClicking = false;

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
    document.getElementById("canvas").width = 600 / cameraZoom;
    document.getElementById("canvas").height = 600 / cameraZoom;
    // offscreenCtx = offscreenCanvas.getContext("2d");
    // offscreenEffectCanvas = new OffscreenCanvas(600 * cameraZoom, 600 * cameraZoom);
    // offscreenCanvas = new OffscreenCanvas(600 * cameraZoom, 600 * cameraZoom);
    // offscreenCtx = offscreenCanvas.getContext("2d");
    // offscreenEffectCanvas = new OffscreenCanvas(600 * cameraZoom, 600 * cameraZoom);
    // offscreenEffectCtx = offscreenEffectCanvas.getContext("2d");
    // offscreenPlaceableCanvas = new OffscreenCanvas(600 * cameraZoom, 600 * cameraZoom);
    // offscreenPlaceableCtx = offscreenPlaceableCanvas.getContext("2d");
    // pixelSize = 600 / gridSize * cameraZoom;
    drawGrid(function() { return true });
    drawPlaceableGrid();
};

var setLerpColor = function() {
    colors.update_push_color();
    colors.update_clone_color();
};

var drawPixel = function(pixel, x, y, ctx) {
    if (pixels[pixel].drawNoise) {
        if (pixels[pixel].animated) {
            ctx.fillStyle = colorTint(colors[pixel], animatedNoiseGrid[y][x]);
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
        else {
            ctx.fillStyle = colorTint(colors[pixel], noiseGrid[y][x]);
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        }
    }
    pixels[pixel].draw(x, y, ctx);
}
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
                        drawPixel(pixel, k, i, offscreenCtx);
                    }
                    pixel = grid[i][j][0];
                    pixelX = j;
                }
                nextGrid[i][j][0] = null;
            }
            else if (pixel != null) {
                pixels[pixel].drawBackground(pixelX, i, j - pixelX, offscreenCtx);
                for (var k = pixelX; k < j; k++) {
                    drawPixel(pixel, k, i, offscreenCtx);
                }
                pixel = null;
            }
        }
        if (pixel != null) {
            pixels[pixel].drawBackground(pixelX, i, gridSize - pixelX, offscreenCtx);
            for (var k = pixelX; k < gridSize; k++) {
                drawPixel(pixel, k, i, offscreenCtx);
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
                            drawPixel(pixel, k, i, offscreenEffectCtx);
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
                        drawPixel(pixel, k, i, offscreenEffectCtx);
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
                    drawPixel(pixel, k, i, offscreenEffectCtx);
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
var drawPlaceableGrid = function() {
    offscreenPlaceableCtx.clearRect(0, 0, 600 * cameraZoom, 600 * cameraZoom);
    var pixel = null;
    var pixelX = 0;
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (pixel == null) {
                pixel = placeableGrid[i][j];
                pixelX = j;
            }
            if (pixel != placeableGrid[i][j]) {
                if (pixel) {
                    pixels["placeable"].drawBackground(pixelX, i, j - pixelX, offscreenPlaceableCtx);
                    for (var k = pixelX; k < j; k++) {
                        drawPixel("placeable", k, i, offscreenPlaceableCtx);
                    }
                }
                pixel = placeableGrid[i][j];
                pixelX = j;
            }
        }
        if (pixel) {
            pixels["placeable"].drawBackground(pixelX, i, gridSize - pixelX, offscreenPlaceableCtx);
            for (var k = pixelX; k < gridSize; k++) {
                drawPixel("placeable", k, i, offscreenPlaceableCtx);
            }
        }
        pixel = null;
        pixelX = 0;
    }
}
var createGrid = function() {
    grid = [];
    nextGrid = [];
    placeableGrid = [];
    for (var i = 0; i < gridSize; i++) {
        grid[i] = [];
        nextGrid[i] = [];
        placeableGrid[i] = [];
        for (var j = 0; j < gridSize; j++) {
            grid[i][j] = ["air", "air"];
            nextGrid[i][j] = [null, null];
            placeableGrid[i][j] = false;
        }
    }
};
var resetGrid = function() {
    gameTick = 0;
    resetRandom();
    pixelSize = 600 / gridSize;

    // offscreenCanvas = new OffscreenCanvas(600 * cameraZoom, 600 * cameraZoom);
    // offscreenCtx = offscreenCanvas.getContext("2d");
    // offscreenEffectCanvas = new OffscreenCanvas(600 * cameraZoom, 600 * cameraZoom);
    // offscreenEffectCtx = offscreenEffectCanvas.getContext("2d");
    // offscreenPlaceableCanvas = new OffscreenCanvas(600 * cameraZoom, 600 * cameraZoom);
    // offscreenPlaceableCtx = offscreenPlaceableCanvas.getContext("2d");
    setNoiseGrid();
    setLerpColor();
    drawGrid(function() { return true });
    drawPlaceableGrid();
    running = false;
    resetable = false;
    updateButtons();
    updateDisabled();
};
var updateGrid = function() {
    if (resetable == false) {
        resetable = true;
        lastGrid = JSON.parse(JSON.stringify(grid));
        updateButtons();
    }

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
            for (var j = gridSize - 1; j >= 0; j--) {
                if (pixels[grid[j][i][1]].updateStage == 0) {
                    pixels[grid[j][i][1]].update(i, j);
                }
                if (pixels[grid[j][i][0]].updateStage == 0) {
                    pixels[grid[j][i][0]].update(i, j);
                }
            }
        }
        for (var i = gridSize - 1; i >= 0; i--) {
            for (var j = gridSize - 1; j >= 0; j--) {
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

    if (runSpeed < 3) {
        updateNoiseGrid();
        drawGrid(function(x, y, layer) { return (nextGrid[y][x][layer] != null) || pixels[grid[y][x][layer]].animated; });
    }
    else if (gameTick % Math.round(runSpeed * 13) == 0) {
        updateNoiseGrid();
        drawGrid(function() { return true });
    }
    // drawGrid(function(x, y, layer) { return (nextGrid[y][x][layer] != null && nextGrid[y][x][layer] != grid[y][x][layer]) || pixels[grid[y][x][layer]].animated; });

    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (nextGrid[i][j][0] != null || nextGrid[i][j][1] != null) {
                nextGrid[i][j] = [null, null];
            }
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
            inPrompt = true;
            document.getElementById("winScreen").style.opacity = 1;
            document.getElementById("winScreen").style.pointerEvents = "all";
            if (runSpeed > 3) {
                updateNoiseGrid();
                drawGrid(function() { return true });
            }
            ctx.drawImage(offscreenCanvas, cameraX, cameraY, 600, 600, 0, 0, 600, 600);
            ctx.drawImage(offscreenEffectCanvas, cameraX, cameraY, 600, 600, 0, 0, 600, 600);
            ctx.drawImage(offscreenPlaceableCanvas, cameraX, cameraY, 600, 600, 0, 0, 600, 600);
            winMusic.currentTime = 0;
            winMusic.play();
        }
    }

    gameTick++;
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
        var pixelX = Math.max(gridX - clickSize + 1, 0);
        for (var j = Math.max(gridY - clickSize + 1, 0); j <= Math.min(gridY + clickSize - 1, gridSize - 1); j++) {
            for (var k = Math.max(gridX - clickSize + 1, 0); k <= Math.min(gridX + clickSize - 1, gridSize - 1); k++) {
                if (clickPixel == "air") {
                    if ((sandbox == true || placeableGrid[j][k]) && (grid[j][k][0] != clickPixel || grid[j][k][1] != clickPixel)) {
                        if (pixel == false) {
                            pixel = true;
                            pixelX = k;
                        }
                        if (sandbox == false) {
                            if (grid[j][k][0] != clickPixel) {
                                pixelInventory[grid[j][k][0]] += 1;
                            }
                            if (grid[j][k][1] != clickPixel) {
                                pixelInventory[grid[j][k][1]] += 1;
                            }
                        }
                        grid[j][k][0] = clickPixel;
                        grid[j][k][1] = clickPixel;
                    }
                    else if (pixel == true) {
                        pixels[clickPixel].drawBackground(pixelX, j, k - pixelX, context);
                        for (var l = pixelX; l < k; l++) {
                            drawPixel(clickPixel, l, j, context);
                        }
                        offscreenEffectCtx.clearRect(pixelX * pixelSize, j * pixelSize, (k - pixelX) * pixelSize, pixelSize);
                        pixel = false;
                    }
                }
                else if (clickPixel == "placeable") {
                    if (placeableGrid[j][k] == false) {
                        if (pixel == false) {
                            pixel = true;
                            pixelX = k;
                        }
                        placeableGrid[j][k] = true;
                    }
                    else if (pixel == true) {
                        pixels[clickPixel].drawBackground(pixelX, j, k - pixelX, offscreenPlaceableCtx);
                        for (var l = pixelX; l < k; l++) {
                            drawPixel(clickPixel, l, j, offscreenPlaceableCtx);
                        }
                        pixel = false;
                    }
                }
                else if (clickPixel == "not_placeable") {
                    if (placeableGrid[j][k] == true) {
                        if (pixel == false) {
                            pixel = true;
                            pixelX = k;
                        }
                        placeableGrid[j][k] = false;
                    }
                    else if (pixel == true) {
                        pixels[clickPixel].drawBackground(pixelX, j, k - pixelX, offscreenPlaceableCtx);
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
                        if (grid[j][k][layer] != "air") {
                            pixelInventory[grid[j][k][layer]] += 1;
                        }
                        grid[j][k][layer] = clickPixel;
                    }
                    else if (pixel == true) {
                        pixels[clickPixel].drawBackground(pixelX, j, k - pixelX, context);
                        for (var l = pixelX; l < k; l++) {
                            drawPixel(clickPixel, l, j, context);
                        }
                        pixel = false;
                    }
                }
            }
            if (pixel == true) {
                if (clickPixel == "placeable") {
                    pixels[clickPixel].drawBackground(pixelX, j, Math.min(gridX + clickSize, gridSize) - pixelX, offscreenPlaceableCtx);
                    for (var k = pixelX; k < Math.min(gridX + clickSize, gridSize); k++) {
                        drawPixel(clickPixel, k, j, offscreenPlaceableCtx);
                    }
                }
                else if (clickPixel == "not_placeable") {
                    pixels[clickPixel].drawBackground(pixelX, j, Math.min(gridX + clickSize, gridSize) - pixelX, offscreenPlaceableCtx);
                }
                else {
                    pixels[clickPixel].drawBackground(pixelX, j, Math.min(gridX + clickSize, gridSize) - pixelX, context);
                    for (var k = pixelX; k < Math.min(gridX + clickSize, gridSize); k++) {
                        drawPixel(clickPixel, k, j, context);
                    }
                    if (clickPixel == "air") {
                        offscreenEffectCtx.clearRect(pixelX * pixelSize, j * pixelSize, (Math.min(gridX + clickSize, gridSize) - pixelX) * pixelSize, pixelSize);
                    }
                }
                pixel = false;
            }
            pixelX = Math.max(gridX - clickSize + 1, 0);
        }
        x += Math.cos(angle);
        y += Math.sin(angle);
    }
    updateDisabled();
    setDescription(clickPixel);
};
var updateClick = function() {
    if (cursorX >= 0 && cursorX <= 600 && cursorY >= 0 && cursorY <= 600) {
        if (sandbox == false && resetable == true) {
            return;
        }
        if (leftClicking) {
            if (sandbox == false && clickPixel != "air" && pixelInventory[clickPixel] == 0) {
                return;
            }
            clickLine(Math.floor((cameraX * cameraZoom + cursorX) / (pixelSize * cameraZoom)), Math.floor((cameraY * cameraZoom + cursorY) / (pixelSize * cameraZoom)), Math.floor((cameraX * cameraZoom + pastCursorX) / (pixelSize * cameraZoom)), Math.floor((cameraY * cameraZoom + pastCursorY) / (pixelSize * cameraZoom)));
        }
        else if (rightClicking) {
            var pixel = clickPixel;
            clickPixel = "air";
            clickLine(Math.floor((cameraX * cameraZoom + cursorX) / (pixelSize * cameraZoom)), Math.floor((cameraY * cameraZoom + cursorY) / (pixelSize * cameraZoom)), Math.floor((cameraX * cameraZoom + pastCursorX) / (pixelSize * cameraZoom)), Math.floor((cameraY * cameraZoom + pastCursorY) / (pixelSize * cameraZoom)));
            clickPixel = pixel;
        }
    }
};
var updateOverlay = function() {
    overlayCtx.clearRect(0, 0, 600, 600);
    if ((sandbox == false && clickPixel != "air" && pixelInventory[clickPixel] == 0) || rightClicking) {
        overlayCtx.fillStyle = "rgba(255, 0, 0, 0.5)";
    }
    else {
        overlayCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
    }
    overlayCtx.strokeStyle = "rgb(0, 0, 0)";
    overlayCtx.fillRect(Math.floor(Math.floor((cameraX * cameraZoom + cursorX) / (pixelSize * cameraZoom)) - clickSize + 1) * (pixelSize * cameraZoom) - cameraX * cameraZoom, Math.floor(Math.floor((cameraY * cameraZoom + cursorY) / (pixelSize * cameraZoom)) - clickSize + 1) * (pixelSize * cameraZoom) - cameraY * cameraZoom, (clickSize * 2 - 1) * (pixelSize * cameraZoom), (clickSize * 2 - 1) * (pixelSize * cameraZoom));
    overlayCtx.strokeRect(Math.floor(Math.floor((cameraX * cameraZoom + cursorX) / (pixelSize * cameraZoom)) - clickSize + 1) * (pixelSize * cameraZoom) - cameraX * cameraZoom, Math.floor(Math.floor((cameraY * cameraZoom + cursorY) / (pixelSize * cameraZoom)) - clickSize + 1) * (pixelSize * cameraZoom) - cameraY * cameraZoom, (clickSize * 2 - 1) * (pixelSize * cameraZoom), (clickSize * 2 - 1) * (pixelSize * cameraZoom));
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
    if (!inPrompt) {
        try {
            updateClick();
            pastCursorX = cursorX;
            pastCursorY = cursorY;
            if (document.getElementById("runSpeedSlider").value != runSpeedRaw) {
                runSpeedRaw = parseFloat(document.getElementById("runSpeedSlider").value);
            }
            runSpeed = (runSpeedRaw + 0.75) ** 7;
            if (runSpeed > 0.5) {
                document.getElementById('runSpeedDisplay').innerHTML = "Running at x" + (Math.round(runSpeed * 10) / 10).toString();
            } 
            else {
                document.getElementById('runSpeedDisplay').innerHTML = "Running at x" + (Math.round(runSpeed * 100) / 100).toString();
            }
            if (running) {
                runsToExecute += runSpeed;
                while (runsToExecute > 0) {
                    updateGrid();
                    updateFPS();
                    runsToExecute--;
                    if (inPrompt) {
                        break;
                    }
                }
            }
            else {
                updateFPS();
            }
            updateOverlay();
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
            if (rawCameraX >= 600 * (cameraZoom - 1)) {
                rawCameraX = 600 * (cameraZoom - 1);
                speedX = 0;
            }
            if (rawCameraY <= 0) {
                rawCameraY = 0;
                speedY = 0;
            }
            if (rawCameraY >= 600 * (cameraZoom - 1)) {
                rawCameraY = 600 * (cameraZoom - 1);
                speedY = 0;
            }
            cameraX = Math.floor(rawCameraX / cameraZoom);
            cameraY = Math.floor(rawCameraY / cameraZoom);
            ctx.drawImage(offscreenCanvas, cameraX, cameraY, 600 / cameraZoom, 600 / cameraZoom, 0, 0, 600 / cameraZoom, 600 / cameraZoom);
            ctx.drawImage(offscreenEffectCanvas, cameraX, cameraY, 600 / cameraZoom, 600 / cameraZoom, 0, 0, 600 / cameraZoom, 600 / cameraZoom);
            ctx.drawImage(offscreenPlaceableCanvas, cameraX, cameraY, 600 / cameraZoom, 600 / cameraZoom, 0, 0, 600 / cameraZoom, 600 / cameraZoom);
        }
        catch (error) {
            promptNotification(`An error has occured. ${error.stack}`);
        }
    }

    document.getElementById("fpsDisplay").innerHTML = `FPS: ${frames.length}; max: ${maxFPS}; min: ${minFPS}; avg: ${round(averageFPS * 100) / 100};`;
    if (!menuScreen) {
        window.requestAnimationFrame(update);
    }
};