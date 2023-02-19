new p5();
window.onerror = document.write;
var setup = function() {
    createCanvas(600, 600);
    resizeCanvas(600, 600);
    canvasScale = Math.min(window.innerWidth / 600, window.innerHeight / 600);
    document.getElementById("defaultCanvas0").style.width = 600 * canvasScale - 20 + "px";
    document.getElementById("defaultCanvas0").style.height = 600 * canvasScale - 20 + "px";
    document.getElementById("defaultCanvas0").oncontextmenu = function(event) {
        event.preventDefault();
    }
    document.getElementById("defaultCanvas0").addEventListener('wheel', function(event) {
        if (event.deltaY > 0) {
            clickSize -= 1;
            clickSize = Math.max(1, clickSize);
        }
        else {
            clickSize += 1;
            clickSize = Math.min(gridSize / 2 + 1, clickSize);
        }
        event.preventDefault();
    });
    var resize = function() {
        if (window.innerWidth - 600 * canvasScale < 300) {
            document.getElementById('sidebar').style.top = Math.min(window.innerWidth, window.innerHeight) + 'px';
            document.body.style.setProperty('--max-sidebar-width', window.innerWidth - 20 + 'px');
            let pickerWidth = (Math.round((window.innerWidth - 20) / 62) - 1) * 62;
            document.getElementById('pixelPicker').style.width = pickerWidth + 'px';
            document.getElementById('pixelDescription').style.width = pickerWidth - 14 + 'px';
        }
        else {
            document.getElementById('sidebar').style.top = '0px';
            document.body.style.setProperty('--max-sidebar-width', window.innerWidth - 600 * canvasScale - 20 + 'px');
            let pickerWidth = (Math.round((window.innerWidth - 600 * canvasScale - 20) / 62) - 1) * 62;
            document.getElementById('pixelPicker').style.width = pickerWidth + 'px';
            document.getElementById('pixelDescription').style.width = pickerWidth - 14 + 'px';
        }
    }
    window.onresize = function() {
        resize();
    };
    resize();
    noCursor();
    noStroke();

    noiseDetail(3, 0.6);
    randomSeed(1);

    background(255, 255, 255);
};

var gameTick = 0;

var frames = [];
var minFPS = null;
var maxFPS = 0;
var averageFPS = 0;

var grid = [];
var nextGrid = [];
var noiseGrid = [];
var gridSize = 100;
var pixelSize = 600 / gridSize;

for (var i = 0; i < gridSize; i++) {
    grid.push([]);
    nextGrid.push([]);
    noiseGrid.push([]);
    for (var j = 0; j < gridSize; j++) {
        grid[i].push(["air", "air"]);
        // if (random() < 0.5) {
        //     grid[i][j][0] = "life";
        // }
        nextGrid[i].push([null, null]);
        noiseGrid[i].push(noise(j / 10, i / 10, 0));
    }
}

var clickSize = 1;
var clickPixel = "air";
var clickNumber = 0;

var running = false;

var isPixel = function(array, pixel, effect) {
    if (pixel != null && array[0] != pixel) {
        return false;
    }
    if (effect != null && array[1] != effect) {
        return false;
    }
    return true;
};

var isTouching = function(x, y, pixel, effect) {
    if (x - 1 != -1) {
        if (isPixel(grid[y][x - 1], pixel, effect)) {
            return true;
        }
    }
    if (x + 1 != gridSize) {
        if (isPixel(grid[y][x + 1], pixel, effect)) {
            return true;
        }
    }
    if (y - 1 != -1) {
        if (isPixel(grid[y - 1][x], pixel, effect)) {
            return true;
        }
    }
    if (y + 1 != gridSize) {
        if (isPixel(grid[y + 1][x], pixel, effect)) {
            return true;
        }
    }
    return false;
};
var getTouching = function(x, y, pixel, effect) {
    var touchingPixels = 0;
    if (x - 1 != -1) {
        if (isPixel(grid[y][x - 1], pixel, effect)) {
            touchingPixels += 1;
        }
    }
    if (x + 1 != gridSize) {
        if (isPixel(grid[y][x + 1], pixel, effect)) {
            touchingPixels += 1;
        }
    }
    if (y - 1 != -1) {
        if (isPixel(grid[y - 1][x], pixel, effect)) {
            touchingPixels += 1;
        }
    }
    if (y + 1 != gridSize) {
        if (isPixel(grid[y + 1][x], pixel, effect)) {
            touchingPixels += 1;
        }
    }
    return touchingPixels;
};
var forEachTouching = function(x, y, pixel, effect, action) {
    if (x - 1 != -1) {
        if (isPixel(grid[y][x - 1], pixel, effect)) {
            action(x - 1, y);
        }
    }
    if (x + 1 != gridSize) {
        if (isPixel(grid[y][x + 1], pixel, effect)) {
            action(x + 1, y);
        }
    }
    if (y - 1 != -1) {
        if (isPixel(grid[y - 1][x], pixel, effect)) {
            action(x, y - 1);
        }
    }
    if (y + 1 != gridSize) {
        if (isPixel(grid[y + 1][x], pixel, effect)) {
            action(x, y + 1);
        }
    }
};
var forAllTouching = function(x, y, action) {
    if (x - 1 != -1) {
        action(x - 1, y);
    }
    if (x + 1 != gridSize) {
        action(x + 1, y);
    }
    if (y - 1 != -1) {
        action(x, y - 1);
    }
    if (y + 1 != gridSize) {
        action(x, y + 1);
    }
};

var isTouchingDiagonal = function(x, y, pixel, effect) {
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            if (x + i >= 0 && x + i < gridSize && y + j >= 0 && y + j < gridSize) {
                if (isPixel(grid[y + j][x + i], pixel, effect)) {
                    return true;
                }
            }
        }
    }
    return false;
};
var getTouchingDiagonal = function(x, y, pixel, effect) {
    var touchingPixels = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            if (x + i >= 0 && x + i < gridSize && y + j >= 0 && y + j < gridSize) {
                if (isPixel(grid[y + j][x + i], pixel, effect)) {
                    touchingPixels += 1;
                }
            }
        }
    }
    return touchingPixels;
};
var getTouchingDiagonalLessDense = function(x, y, density) {
    var touchingPixels = 0;
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            if (x + i >= 0 && x + i < gridSize && y + j >= 0 && y + j < gridSize) {
                if (pixels[grid[y + j][x + i][0]].density < density) {
                    touchingPixels += 1;
                }
            }
            else {
                touchingPixels += 1;
            }
        }
    }
    return touchingPixels;
};
var forEachTouchingDiagonal = function(x, y, pixel, effect, action) {
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            if (x + i >= 0 && x + i < gridSize && y + j >= 0 && y + j < gridSize) {
                if (isPixel(grid[y + j][x + i], pixel, effect)) {
                    action(x + i, y + j);
                }
            }
        }
    }
};
var forAllTouchingDiagonal = function(x, y, action) {
    for (var i = -1; i <= 1; i++) {
        for (var j = -1; j <= 1; j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            if (x + i >= 0 && x + i < gridSize && y + j >= 0 && y + j < gridSize) {
                action(x + i, y + j);
            }
        }
    }
};

var getMinimalSpace = function(x, y, distance) {
    if (y + 1 == gridSize) {
        return [0, 0];
    }
    var pixel = grid[y][x][0];
    var leftSpaceStopped = false;
    var rightSpaceStopped = false;
    for (var i = 1; i <= distance; i++) {
        var leftSpace = false;
        var rightSpace = false;
        if (x - i == -1) {
            leftSpaceStopped = true;
        }
        if (!leftSpaceStopped) {
            if ((grid[y + 1][x - i + 1][0] == pixel || pixels[grid[y][x - i][0]].density < pixels[pixel].density) && pixels[grid[y + 1][x - i][0]].density < pixels[pixel].density) {
                leftSpace = true;
            }
            if (pixels[grid[y][x - i][0]].density >= pixels[pixel].density) {
                leftSpaceStopped = true;
            }
        }
        if (x + i == gridSize) {
            rightSpaceStopped = true;
        }
        if (!rightSpaceStopped) {
            if ((grid[y + 1][x + i - 1][0] == pixel || pixels[grid[y][x + i][0]].density < pixels[pixel].density) && pixels[grid[y + 1][x + i][0]].density < pixels[pixel].density) {
                rightSpace = true;
            }
            if (pixels[grid[y][x + i][0]].density >= pixels[pixel].density) {
                rightSpaceStopped = true;
            }
        }
        if (leftSpace || rightSpace) {
            return [leftSpace ? i : 0, rightSpace ? i : 0];
        }
        if (leftSpaceStopped && rightSpaceStopped) {
            return [0, 0];
        }
    }
    return [0, 0];
};
var getMinimalAir = function(x, y, distance) {
    var pixel = grid[y][x][0];
    for (var i = 1; i <= distance; i++) {
        var leftAir = false;
        var rightAir = false;
        if (x - i == -1) {
            leftAir = true;
        }
        else {
            if (grid[y][x - i][0] != "air" && grid[y][x - i][0] != pixel) {
                leftAir = true;
            }
        }
        if (x + i == gridSize) {
            rightAir = true;
        }
        else {
            if (grid[y][x + i][0] != "air" && grid[y][x + i][0] != pixel) {
                rightAir = true;
            }
        }
        if (leftAir || rightAir) {
            return [leftAir ? i : 0, rightAir ? i : 0];
        }
    }
    return [0, 0];
};

var colorTint = function(r1, g1, b1, r2, g2, b2, t) {
    return [
        r1 * (1 - t) + r2 * t,
        g1 * (1 - t) + g2 * t,
        b1 * (1 - t) + b2 * t,
    ];
};
var colorLerp = function(r1, g1, b1, r2, g2, b2, p) {
    return [
        (r1 * (Math.sin(gameTick * 2 * Math.PI / p) + 1) / 2) + (r2 * (Math.sin((gameTick * 2 + p) * Math.PI / p) + 1) / 2),
        (g1 * (Math.sin(gameTick * 2 * Math.PI / p) + 1) / 2) + (g2 * (Math.sin((gameTick * 2 + p) * Math.PI / p) + 1) / 2),
        (b1 * (Math.sin(gameTick * 2 * Math.PI / p) + 1) / 2) + (b2 * (Math.sin((gameTick * 2 + p) * Math.PI / p) + 1) / 2),
    ];
};

var generateTree = function(x, y, direction, length, stemPixel, leafPixel, turnChance, branchChance, branchAngle, branchCooldownLimit) {
    var woodX = x;
    var woodY = y;
    var branchCooldown = branchCooldownLimit;
    for (var i = 0; i < length; i++) {
        var bestDirection = [0, 0];
        var randomDirection = random();
        var targetDirection = [direction[0], direction[1]];
        if (targetDirection[0] == 0) {
            if (randomDirection <= turnChance) {
                targetDirection[0] += 1;
            }
            else if (randomDirection <= turnChance * 2) {
                targetDirection[0] -= 1;
            }
        }
        else if (targetDirection[1] >= 0) {
            if (randomDirection <= turnChance * 2) {
                targetDirection[1] -= 1;
            }
        }
        else {
            if (randomDirection <= turnChance * 2) {
                targetDirection[0] = 0;
            }
        }
        forEachTouchingDiagonal(woodX, woodY, "air", null, function(x1, y1) {
            if (nextGrid[y1][x1][0] != null) {
                return;
            }
            branchCooldown -= 1;
            if (branchCooldown <= 0 && abs(targetDirection[0] - x1 + woodX) + abs(targetDirection[1] - y1 + woodY) <= branchAngle && random() < branchChance) {
                generateTree(woodX, woodY, [x1 - woodX, y1 - woodY], ceil(length / 4), stemPixel, leafPixel, turnChance, 0, 0, 0);
                branchCooldown = branchCooldownLimit;
                return;
            }
            if (bestDirection[0] == targetDirection[0] && bestDirection[1] == targetDirection[1]) {
                return;
            }
            if (bestDirection[0] == 0 && bestDirection[1] == 0) {
                bestDirection = [x1 - woodX, y1 - woodY];
            }
            else if (abs(targetDirection[0] - x1 + woodX) + abs(targetDirection[1] - y1 + woodY) < abs(targetDirection[0] - bestDirection[0]) + abs(targetDirection[1] - bestDirection[1])) {
                bestDirection = [x1 - woodX, y1 - woodY];
            }
            else if (abs(targetDirection[0] - x1 + woodX) + abs(targetDirection[1] - y1 + woodY) == abs(targetDirection[0] - bestDirection[0]) + abs(targetDirection[1] - bestDirection[1])) {
                if (random() < 0.5) {
                    bestDirection = [x1 - woodX, y1 - woodY];
                }
            }
        });
        if (bestDirection[0] != 0 || bestDirection[1] != 0) {
            woodX += bestDirection[0];
            woodY += bestDirection[1];
            changePixel(woodX, woodY, stemPixel, null);
        }
        else {
            break;
        }
    }
    var size = 1;
    if (length >= 10) {
        size = 13;
    }
    else if (length >= 4) {
        size = 5;
    }
    for (var i = -ceil(sqrt(size)); i <= ceil(sqrt(size)); i++) {
        for (var j = -ceil(sqrt(size)); j <= ceil(sqrt(size)); j++) {
            if (pow(i, 2) + pow(j, 2) <= size) {
                if (woodX + i >= 0 && woodX + i < gridSize && woodY + j >= 0 && woodY + j < gridSize) {
                    if (grid[woodY + j][woodX + i][0] == "air") {
                        changePixel(woodX + i, woodY + j, leafPixel, null);
                    }
                }
            }
        }
    }
};

var changePixel = function(x, y, pixel, effect) {
    if (pixel != null && effect != null) {
        var changed = false;
        if (nextGrid[y][x][0] == null) {
            nextGrid[y][x][0] = pixel;
            changed = true;
        }
        if (nextGrid[y][x][1] == null) {
            nextGrid[y][x][1] = effect;
            changed = true;
        }
        if (changed) {
            return true;
        }
    }
    else if (pixel != null) {
        if (nextGrid[y][x][0] == null) {
            nextGrid[y][x][0] = pixel;
            return true;
        }
    }
    else if (effect != null) {
        if (nextGrid[y][x][1] == null) {
            nextGrid[y][x][1] = effect;
            return true;
        }
    }
    return false;
};
var move = function(x, y, positions) {
    if (nextGrid[y][x][0] != null) {
        return;
    }
    if (grid[y][x][1] == "frost_fire") {
        return;
    }
    var moveablePositions = [];
    for (var i in positions) {
        if (x + positions[i].x >= 0 && x + positions[i].x < gridSize && y + positions[i].y >= 0 && y + positions[i].y < gridSize) {
            if (nextGrid[y + positions[i].y][x + positions[i].x][0] == null) {
                moveablePositions.push(positions[i]);
            }
        }
    }
    if (moveablePositions.length > 0) {
        var move = moveablePositions[Math.floor(random() * moveablePositions.length)];
        nextGrid[y + move.y][x + move.x][0] = grid[y][x][0];
        if (grid[y][x][1] != "air") {
            nextGrid[y + move.y][x + move.x][1] = grid[y][x][1];
        }
        nextGrid[y][x][0] = grid[y + move.y][x + move.x][0];
        if (grid[y + move.y][x + move.x][0] != "air") {
            nextGrid[y][x][1] = grid[y + move.y][x + move.x][1];
        }
    }
    return false;
};
var fall = function(x, y) {
    if (y + 1 == gridSize) {
        return false;
    }
    if (pixels[grid[y + 1][x][0]].density < pixels[grid[y][x][0]].density) {
        return move(x, y, [{ x: 0, y: 1 }]);
    }
    return false;
};
var flow = function(x, y, distance) {
    if (fall(x, y)) {
        return true;
    }
    var positions = [];
    var minimalSpace = getMinimalSpace(x, y, distance);
    if (minimalSpace[0] == 1) {
        positions.push({ x: -1, y: 1 });
    }
    if (minimalSpace[1] == 1) {
        positions.push({ x: 1, y: 1 });
    }
    if (positions.length == 0) {
        var pixel = grid[y][x][0];
        if (minimalSpace[0] != 0) {
            positions.push({ x: -1, y: 0 });
        }
        if (minimalSpace[1] != 0) {
            positions.push({ x: 1, y: 0 });
        }
        if (positions.length == 0) {
            if (x != 0 && x != gridSize - 1 && y != 0) {
                if (pixels[grid[y - 1][x][0]].density >= pixels[pixel].density) {
                    var minimalAir = getMinimalAir(x, y, gridSize);
                    // if (pixels[grid[y][x - 1][0]].density < pixels[pixel].density && minimalAir[0] != 0) {
                    if (pixels[grid[y][x - 1][0]].density < pixels[pixel].density && pixels[grid[y - 1][x - 1][0]].density > pixels[pixel].density && minimalAir[0] != 0) {
                        positions.push({ x: -1, y: 0 });
                    }
                    // if (pixels[grid[y][x + 1][0]].density < pixels[pixel].density && minimalAir[1] != 0) {
                    if (pixels[grid[y][x + 1][0]].density < pixels[pixel].density && pixels[grid[y - 1][x + 1][0]].density > pixels[pixel].density && minimalAir[1] != 0) {
                        positions.push({ x: 1, y: 0 });
                    }
                    // if (positions.length == 0) {
                    //     if (pixels[grid[y][x - 1][0]].density < pixels[pixel].density && grid[y][x + 1][0] == pixel) {
                    //         positions.push({ x: -1, y: 0 });
                    //     }
                    //     if (pixels[grid[y][x + 1][0]].density < pixels[pixel].density && grid[y][x - 1][0] == pixel) {
                    //     // if (pixels[grid[y][x + 1][0]].density < pixels[pixel].density && pixels[grid[y - 1][x + 1][0]].density > pixels[pixel].density && minimalAir[1] != 0) {
                    //         positions.push({ x: 1, y: 0 });
                    //     }
                    // }
                }
            }
        }
    }
    return move(x, y, positions);
};
var push = function(x, y, direction, distance) {
    if (direction == "left") {
        for (var i = 1; i <= distance; i++) {
            if (x - i == -1) {
                return false;
            }
            if (nextGrid[y][x - i][0] != null) {
                return false;
            }
            if (!pixels[grid[y][x - i][0]].pushable) {
                return false;
            }
            if (grid[y][x - i][0] == "air" && i > 1) {
                for (var j = 2; j <= i; j++) {
                    nextGrid[y][x - j][0] = grid[y][x - j + 1][0];
                    if (grid[y][x - j + 1][1] != "air") {
                        nextGrid[y][x - j][1] = grid[y][x - j + 1][1];
                    }
                }
                return true;
            }
        }
        return false;
    }
    else if (direction == "right") {
        for (var i = 1; i <= distance; i++) {
            if (x + i == gridSize) {
                return false;
            }
            if (nextGrid[y][x + i][0] != null) {
                return false;
            }
            if (!pixels[grid[y][x + i][0]].pushable) {
                return false;
            }
            if (grid[y][x + i] == "air" && i > 1) {
                for (var j = 2; j <= i; j++) {
                    nextGrid[y][x + j][0] = grid[y][x + j - 1][0];
                    if (grid[y][x + j - 1][1] != "air") {
                        nextGrid[y][x + j][1] = grid[y][x + j - 1][1];
                    }
                }
                return true;
            }
        }
        return false;
    }
    else if (direction == "up") {
        for (var i = 1; i <= distance; i++) {
            if (y - i == -1) {
                return false;
            }
            if (nextGrid[y - i][x][0] != null) {
                return false;
            }
            if (!pixels[grid[y - i][x][0]].pushable) {
                return false;
            }
            if (grid[y - i][x] == "air" && i > 1) {
                for (var j = 2; j <= i; j++) {
                    nextGrid[y - j][x][0] = grid[y - j + 1][x][0];
                    if (grid[y - j + 1][x][1] != "air") {
                        nextGrid[y][x - j][1] = grid[y][x - j + 1][1];
                    }
                }
                return true;
            }
        }
        return false;
    }
    else if (direction == "down") {
        for (var i = 1; i <= distance; i++) {
            if (y + i == gridSize) {
                return false;
            }
            if (nextGrid[y + i][x][0] != null) {
                return false;
            }
            if (!pixels[grid[y + i][x][0]].pushable) {
                return false;
            }
            if (grid[y + i][x][0] == "air" && i > 1) {
                for (var j = 2; j <= i; j++) {
                    nextGrid[y + j][x][0] = grid[y + j - 1][x][0];
                    if (grid[y + j - 1][x][1] != "air") {
                        nextGrid[y + j][x][1] = grid[y + j - 1][x][1];
                    }
                }
                return true;
            }
        }
        return false;
    }
};

var pixels = {
    "air": {
        draw: function(x, y) {
            fill(255, 255, 255);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {

        },
        updateStage: -1,
        animated: false,
        density: 0,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 1,
        name: "Air",
        description: "It's air. What did you expect?",
        key: -10,
    },
    "dirt": {
        draw: function(x, y) {
            fill(125, 75, 0);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 75, 0)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouching(x, y, "water", null)) {
                if (changePixel(x, y, "mud", null)) {
                    return;
                }
            }
            if (getTouchingDiagonalLessDense(x, y, pixels.dirt.density) >= 5) {
                fall(x, y);
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 15,
        blast_resistance: 1,
        name: "Dirt",
        description: "Pretty dirty.",
        key: 11,
    },
    "grass": {
        draw: function(x, y) {
            fill(25, 175, 75);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(25, 175, 75)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonalLessDense(x, y, pixels.grass.density) >= 5) {
                fall(x, y);
            }
            if (getTouchingDiagonal(x, y, "air", null) == 0) {
                changePixel(x, y, "dirt", null);
                return;
            }
            forEachTouchingDiagonal(x, y, "dirt", null, function(x1, y1) {
                if (getTouching(x1, y1, "air", null) > 0) {
                    changePixel(x1, y1, "grass", null);
                }
            });
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 15,
        blast_resistance: 1,
        name: "Grass",
        description: "This grass is pretty OP. It can grow on cliffs and on the bottom of floating islands.",
        key: 12,
    },
    "sand": {
        draw: function(x, y) {
            fill(255, 225, 125);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 225, 125)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, "sand", null) == 4) {
                return;
            }
            if (getTouchingDiagonal(x, y, "lava", null) >= 6) {
                if (changePixel(x, y, "quartz", null)) {
                    return;
                }
            }
            flow(x, y, 1);
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 1,
        name: "Sand",
        description: "A fine, light-yellow powder. It likes to make pyramids.",
        key: 13,
    },
    "water": {
        draw: function(x, y) {
            fill(colorTint(125, 225, 255, 25, 75, 175, noiseGrid[y][x]));
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            // fill(25, 75, 175, noiseGrid[y][x] * 255);
            // rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 225, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(25, 75, 175, 0.5)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, "water", null) == 4) {
                return;
            }
            flow(x, y, gridSize);
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: false,
        liquid: true,
        pushable: true,
        flammable: 0,
        blast_resistance: 3,
        name: "Water",
        description: "Flows everywhere. Not very realistic.",
        key: 14,
    },
    "lava": {
        draw: function(x, y) {
            fill(colorTint(255, 25, 0, 225, 255, 25, noiseGrid[y][x]));
            // fill(255, 25, 0);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            // fill(225, 255, 25, noiseGrid[y][x] * 255);
            // rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 25, 0)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(225, 255, 25, 0.5)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            var touchingLava = getTouchingDiagonal(x, y, "lava", null);
            if (getTouching(x, y, "lava") == 4) {
                return;
            }
            forAllTouching(x, y, function(x1, y1) {
                if (grid[y1][x1][0] == "water") {
                    if (y1 > y) {
                        if (touchingLava >= 5) {
                            changePixel(x1, y1, "obsidian", null);
                        }
                        else if (touchingLava >= 3 && random() < 0.5) {
                            changePixel(x1, y1, "basalt", null);
                        }
                        else {
                            changePixel(x1, y1, "stone", null);
                        }
                        changePixel(x, y, "air", null);
                    }
                    else {
                        if (touchingLava >= 5) {
                            changePixel(x, y, "obsidian", null);
                        }
                        else if (touchingLava >= 3 && random() < 0.5) {
                            changePixel(x, y, "basalt", null);
                        }
                        else {
                            changePixel(x, y, "stone", null);
                        }
                        changePixel(x1, y1, "air", null);
                    }
                }
                else if (grid[y1][x1][0] == "grass") {
                    changePixel(x1, y1, "dirt", null);
                }
                if (grid[y1][x1][1] == "air" && grid[y1][x1][0] != "lava" && random() < 0.1) {
                    changePixel(x1, y1, null, "fire");
                }
            });
            if (random() < 0.25) {
                flow(x, y, gridSize);
            }
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: false,
        liquid: true,
        pushable: true,
        flammable: -10,
        blast_resistance: 3,
        name: "Lava",
        description: "Extremely hot and melts rocks. Burns flammable pixels. Flows everywhere but slowly. Water can cool it into rocks.",
        key: 21,
    },
    "fire": {
        draw: function(x, y) {
            fill(255, 175, 25, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 175, 125, 100);
            for (var i = 0; i < 4; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 175, 25)";
            ctx.fillRect(10, 20, 30, 10);
            ctx.fillRect(10, 30, 40, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 0, 10, 10);
            ctx.fillRect(30, 0, 10, 10);
            ctx.fillRect(20, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillStyle = "rgb(255, 225, 25)";
            ctx.fillRect(20, 30, 20, 20);
            ctx.fillRect(20, 20, 10, 10);
        },
        update: function(x, y) {
            if (pixels[grid[y][x][0]].flammable == 0 || grid[y][x][0] == "lava") {
                if (changePixel(x, y, null, "air")) {
                    return;
                }
            }
            if (pixels[grid[y][x][0]].flammable < 0 && random() < -1 / pixels[grid[y][x][0]].flammable) {
                if (changePixel(x, y, null, "air")) {
                    return;
                }
            }
            if (random() < 1 / (pixels[grid[y][x][0]].flammable * 5)) {
                if (random() < 0.25) {
                    changePixel(x, y, "ash", null);
                }
                else {
                    changePixel(x, y, "air", null);
                }
            }
            var touchingWater = 0;
            forAllTouching(x, y, function(x1, y1) {
                if (pixels[grid[y1][x1][0]].flammable == 0) {
                    touchingWater += 1;
                }
                else if (grid[y1][x1][1] != "fire" && random() < 1 / pixels[grid[y1][x1][0]].flammable) {
                    // var canChange = true;
                    // forAllTouching(x1, y1, function(x2, y2) {
                    //     if (pixels[grid[y2][x2][0]].flammable == 0) {
                    //         canChange = false;
                    //     }
                    // });
                    // if (canChange) {
                    changePixel(x1, y1, null, "fire");
                    // }
                }
            });
            if (random() < touchingWater / 10) {
                changePixel(x, y, null, "air");
            }
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: true,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 1,
        name: "Fire",
        description: "Super hot! Burns flammable pixels.",
        key: 22,
    },
    "quartz": {
        draw: function(x, y) {
            fill(240, 240, 255);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(235, 235, 245);
            for (var i = 0; i < 2; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(240, 240, 255)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {

        },
        updateStage: 0,
        animated: false,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Quartz",
        description: "A perfect, smooth, white crystal.",
        key: 26,
    },
    "ash": {
        draw: function(x, y) {
            fill(175, 175, 175);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(125, 125, 125);
            for (var i = 0; i < 2; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(175, 175, 175)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouching(x, y, "water", null)) {
                if (changePixel(x, y, "silt", null)) {
                    return;
                }
            }
            flow(x, y, 2);
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 25,
        blast_resistance: 1,
        name: "Ash",
        description: "A semi-liquid black dust. Can sustain fires.",
        key: 27,
    },
    "silt": {
        draw: function(x, y) {
            fill(150, 150, 150);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(100, 100, 100);
            for (var i = 0; i < 2; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(150, 150, 150)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if ((isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire")) && !isTouchingDiagonal(x, y, "water", null) && random() < 0.1) {
                if (changePixel(x, y, "ash", null)) {
                    return;
                }
            }
            flow(x, y, 2);
        },
        updateStage: 0,
        animated: false,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -1,
        blast_resistance: 1,
        name: "Silt",
        description: "A compact mixture of water and ash. It's has a rough gravel texture.",
        key: 28,
    },
    "stone": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(75, 75, 75);
            for (var i = 0; i < 1; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonal(x, y, "lava", null) >= 2 && !isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "lava", null);
            }
            if (getTouchingDiagonal(x, y, "lava", null) >= 4 && getTouchingDiagonal(x, y, "water", null) == 1) {
                changePixel(x, y, "lava", null);
            }
        },
        updateStage: 0,
        animated: false,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 5,
        name: "Stone",
        description: "Very sturdy and dense. Lava can melt it easily.",
        key: 23,
    },
    "basalt": {
        draw: function(x, y) {
            fill(75, 75, 75);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(50, 50, 50);
            for (var i = 0; i < 1; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(75, 75, 75)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonal(x, y, "lava", null) >= 4 && !isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "lava", null);
            }
        },
        updateStage: 0,
        animated: false,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Basalt",
        description: "A hard, volcanic, rock. Very blast resistant. BUH-salt.",
        key: 24,
    },
    "obsidian": {
        draw: function(x, y) {
            fill(25, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(25, 0, 50);
            for (var i = 0; i < 2; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(25, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonal(x, y, "lava", null) >= 7 && !isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "lava", null);
            }
        },
        updateStage: 0,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 25,
        name: "Obsidian",
        description: "A smooth, very blast resistant rock. Hard to move.",
        key: 25,
    },
    "wood": {
        draw: function(x, y) {
            fill(150, 100, 75);
            rect(x * pixelSize, y * pixelSize, pixelSize / 2, pixelSize);
            fill(175, 125, 75);
            rect(x * pixelSize + pixelSize / 2, y * pixelSize, pixelSize / 2, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(150, 100, 75)";
            ctx.fillRect(0, 0, 30, 60);
            ctx.fillStyle = "rgb(175, 125, 75)";
            ctx.fillRect(30, 0, 30, 60);
        },
        update: function(x, y) {

        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 10,
        blast_resistance: 3,
        name: "Wood",
        description: "A thick, rough, oak log.",
        key: 31,
    },
    "leaf": {
        draw: function(x, y) {
            fill(125, 225, 75);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 225, 75)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (!isTouching(x, y, "wood", null) && getTouching(x, y, "leaf", null) < 2) {
                if (random() < 0.1) {
                    changePixel(x, y, "sapling", null);
                }
                else {
                    changePixel(x, y, "air", null);
                }
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 5,
        blast_resistance: 1,
        name: "Leaf",
        description: "A nice, springy leaf. Drops saplings when it decays.",
        key: 32,
    },
    "sapling": {
        draw: function(x, y) {
            fill(255, 255, 255);
            rect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
            fill(75, 255, 150);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize * 2 / 3);
            fill(150, 100, 75);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 40, 20, 20);
            ctx.fillRect(40, 40, 20, 20);
            ctx.fillStyle = "rgb(75, 255, 150)";
            ctx.fillRect(0, 0, 60, 40);
            ctx.fillStyle = "rgb(150, 100, 75)";
            ctx.fillRect(20, 40, 20, 20);
        },
        update: function(x, y) {
            if (fall(x, y)) {
                return;
            }
            if (y != gridSize - 1 && random() < 0.01) {
                if (grid[y + 1][x][0] == "dirt") {
                    var direction = [0, -1];
                    var length = random(8, 14);
                    var stemPixel = "wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 21);
                }
                else if (grid[y + 1][x][0] == "grass") {
                    var direction = [0, -1];
                    var length = random(12, 18);
                    var stemPixel = "wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 14);
                }
                else if (grid[y + 1][x][0] == "sand") {
                    var direction = [0, -1];
                    var length = random(16, 24);
                    var stemPixel = "wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0, 0, 0);
                }
                else if (grid[y + 1][x][0] == "mud") {
                    var direction = [0, -1];
                    var length = random(6, 10);
                    var stemPixel = "wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.15, 1, 7);
                }
                else if (grid[y + 1][x][0] == "dried_mud") {
                    var direction = [0, -1];
                    var length = random(4, 8);
                    var stemPixel = "wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.2, 2, 7);
                }
                else if (grid[y + 1][x][0] == "snow") {
                    var direction = [0, -1];
                    var length = random(8, 14);
                    var stemPixel = "wood";
                    var leafPixel = "snow";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.05, 2, 21);
                }
                else if (grid[y + 1][x][0] == "ice") {
                    var direction = [0, -1];
                    var length = random(8, 10);
                    var stemPixel = "wood";
                    var leafPixel = "ice";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.2, 3, 7);
                }
                else if (grid[y + 1][x][0] == "silt") {
                    var direction = [0, -1];
                    var length = random(8, 16);
                    var stemPixel = "wood";
                    var leafPixel = "ash";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.05, 2, 14);
                }
                else if (grid[y + 1][x][0] == "obsidian") {
                    var direction = [0, -1];
                    var length = random(8, 16);
                    var stemPixel = "basalt";
                    var leafPixel = "stone";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.05, 2, 14);
                }
                else if (grid[y + 1][x][0] == "quartz") {
                    var direction = [0, -1];
                    var length = random(12, 22);
                    var stemPixel = "wood";
                    var leafPixel = "quartz";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 14);
                }
                else if (grid[y + 1][x][0] == "rgb_pixel") {
                    var direction = [0, -1];
                    var length = random(28, 34);
                    var stemPixel = "rgb_pixel";
                    var leafPixel = "rgb_pixel";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.15, 1, 14);
                }
                else if (grid[y + 1][x][0] == "life") {
                    var direction = [0, -1];
                    var length = random(28, 34);
                    var stemPixel = "wood";
                    var leafPixel = "life";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.15, 1, 14);
                }
                else if (grid[y + 1][x][0] == "death") {
                    var direction = [0, -1];
                    var length = random(28, 34);
                    var stemPixel = "wood";
                    var leafPixel = "death";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.15, 1, 14);
                }
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 15,
        blast_resistance: 1,
        name: "Sapling",
        description: "Plant it and see what grows!",
        key: 33,
    },
    "mud": {
        draw: function(x, y) {
            fill(75, 50, 0);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(75, 50, 0)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (!isTouching(x, y, "water", null) && random() < 0.05 || isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire")) {
                if (changePixel(x, y, "dried_mud", null)) {
                    return;
                }
            }
            if (getTouchingDiagonalLessDense(x, y, pixels.dirt.density) >= 4) {
                flow(x, y, 4);
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 20,
        blast_resistance: 3,
        name: "Mud",
        description: "It's like dirt, but wet and slightly liquid.",
        key: 34,
    },
    "dried_mud": {
        draw: function(x, y) {
            fill(100, 75, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 75, 25)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouching(x, y, "water", null)) {
                if (changePixel(x, y, "mud", null)) {
                    return;
                }
            }
            if (getTouchingDiagonalLessDense(x, y, pixels.dirt.density) >= 6) {
                fall(x, y);
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 5,
        blast_resistance: 3,
        name: "Dried Mud",
        description: "Extremely flammable.",
        key: 35,
    },
    "snow": {
        draw: function(x, y) {
            fill(235, 235, 255);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(235, 235, 255)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire") || grid[x][y][1] == "fire") {
                if (changePixel(x, y, "water", null)) {
                    return;
                }
            }
            forEachTouching(x, y, "water", null, function(x1, y1) {
                changePixel(x1, y1, "ice", null);
            });
            if (getTouchingDiagonalLessDense(x, y, pixels.dirt.density) >= 5) {
                fall(x, y);
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 1,
        name: "Snow",
        description: "Cold! Will freeze water.",
        key: 41,
    },
    "ice": {
        draw: function(x, y) {
            fill(150, 150, 255);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(125, 125, 255);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 3, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            rect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(150, 150, 255)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire") || grid[y][x][1] == "fire") {
                if (changePixel(x, y, "water", null)) {
                    return;
                }
            }
            forAllTouching(x, y, function(x1, y1) {
                if (grid[y1][x1][1] == "air" && grid[y1][x1][0] != "ice" && random() < 0.1) {
                    changePixel(x1, y1, null, "frost_fire");
                }
            });
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 3,
        name: "Ice",
        description: "Freezing! Can melt.",
        key: 42,
    },
    "frost_fire": {
        draw: function(x, y) {
            fill(125, 125, 255, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(200, 200, 255, 100);
            for (var i = 0; i < 4; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(125, 125, 255)";
            ctx.fillRect(10, 20, 30, 10);
            ctx.fillRect(10, 30, 40, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 0, 10, 10);
            ctx.fillRect(30, 0, 10, 10);
            ctx.fillRect(20, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillStyle = "rgb(200, 200, 255)";
            ctx.fillRect(20, 30, 20, 20);
            ctx.fillRect(20, 20, 10, 10);
        },
        update: function(x, y) {
            if (grid[y][x][0] == "air" && random() < 0.1) {
                if (changePixel(x, y, null, "air")) {
                    return;
                }
            }
            forEachTouching(x, y, "water", null, function(x1, y1) {
                changePixel(x1, y1, "ice", null);
            });
            if (isTouchingDiagonal(x, y, "lava", null)) {
                if (changePixel(x, y, null, "air")) {
                    return;
                }
            }
            if (isTouchingDiagonal(x, y, null, "fire") || grid[y][x][1] == "fire") {
                forEachTouchingDiagonal(x, y, null, "fire", function(x1, y1) {
                    changePixel(x1, y1, null, "air");
                });
                changePixel(x, y, null, "air");
            }
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: true,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 1,
        name: "Frost Fire",
        description: "Super cold! Freezes pixels and prevents them from moving.",
        key: 43,
    },
    "cloner_left": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            fill(colorLerp(0, 255, 150, 0, 150, 255, 60))
            rect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 10, 40);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(50, 10, 10, 40);
            ctx.fillRect(40, 20, 10, 20);
        },
        update: function(x, y) {
            if (x == 0 || x == gridSize - 1) {
                return;
            }
            if (grid[y][x + 1][0] != "air" && pixels[grid[y][x - 1][0]].pushable) {
                push(x, y, "left", gridSize);
                if (grid[y][x + 1][1] != "air") {
                    changePixel(x - 1, y, grid[y][x + 1][grid[y][x + 1][1]], null);
                }
                else {
                    changePixel(x - 1, y, grid[y][x + 1][0], null);
                }
            }
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Cloner (Left)",
        description: "Clones the pixel on the right. The cloned pixel is pushed on the left.",
        key: 51,
    },
    "cloner_right": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            fill(colorLerp(0, 255, 150, 0, 150, 255, 60))
            rect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(40, 10, 10, 40);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(0, 10, 10, 40);
            ctx.fillRect(10, 20, 10, 20);
        },
        update: function(x, y) {
            if (x == 0 || x == gridSize - 1) {
                return;
            }
            if (grid[y][x - 1][0] != "air" && pixels[grid[y][x + 1][0]].pushable) {
                push(x, y, "right", gridSize);
                if (grid[y][x - 1][1] != "air") {
                    changePixel(x + 1, y, grid[y][x - 1][grid[y][x - 1][1]], null);
                }
                else {
                    changePixel(x + 1, y, grid[y][x - 1][0], null);
                }
            }
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Cloner (Right)",
        description: "Clones the pixel on the left. The cloned pixel is pushed on the right.",
        key: 52,
    },
    "cloner_up": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 6);
            fill(colorLerp(0, 255, 150, 0, 150, 255, 60))
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 5 / 6, pixelSize * 2 / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 10);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(10, 50, 40, 10);
            ctx.fillRect(20, 40, 20, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y + 1][x][0] != "air" && pixels[grid[y - 1][x][0]].pushable) {
                push(x, y, "up", gridSize);
                if (grid[y + 1][x][1] != "air") {
                    changePixel(x, y - 1, grid[y + 1][x][grid[y + 1][x][1]], null);
                }
                else {
                    changePixel(x, y - 1, grid[y + 1][x][0], null);
                }
            }
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Cloner (Up)",
        description: "Clones the pixel underneath it. The cloned pixel is pushed on top.",
        key: 53,
    },
    "cloner_down": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize * 2 / 3, pixelSize / 6);
            fill(colorLerp(0, 255, 150, 0, 150, 255, 60))
            rect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize * 2 / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 40, 40, 10);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(10, 0, 40, 10);
            ctx.fillRect(20, 10, 20, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y - 1][x][0] != "air" && pixels[grid[y + 1][x][0]].pushable) {
                push(x, y, "down", gridSize);
                if (grid[y - 1][x][1] != "air") {
                    changePixel(x, y + 1, grid[y - 1][x][grid[y - 1][x][1]], null);
                }
                else {
                    changePixel(x, y + 1, grid[y - 1][x][0], null);
                }
            }
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Cloner (Down)",
        description: "Clones the pixel above it. The cloned pixel is pushed downwards.",
        key: 54,
    },
    "rgb_pixel": {
        draw: function(x, y) {
            fill(colorLerp(255, 125, 0, 0, 125, 255, 60));
            rect(x * pixelSize, y * pixelSize, pixelSize / 2, pixelSize / 2);
            fill(colorLerp(0, 255, 125, 255, 0, 125, 60));
            rect(x * pixelSize + pixelSize / 2, y * pixelSize, pixelSize / 2, pixelSize / 2);
            fill(colorLerp(255, 0, 125, 0, 255, 125, 60));
            rect(x * pixelSize, y * pixelSize + pixelSize / 2, pixelSize / 2, pixelSize / 2);
            fill(colorLerp(255, 255, 125, 255, 125, 125, 60));
            rect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 2, pixelSize / 2, pixelSize / 2);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(25, 25, 255)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {

        },
        updateStage: 0,
        animated: true,
        density: Infinity,
        effect: false,
        liquid: true,
        pushable: false,
        flammable: 0.1,
        blast_resistance: Infinity,
        name: "RGB Pixel",
        description: "Buh moment.",
        key: 55,
    },
    "corruption": {
        draw: function(x, y) {
            fill(255, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(0, 0, 0);
            rect(x * pixelSize + random(0, pixelSize / 2), y * pixelSize + random(0, pixelSize / 2), random(0, pixelSize / 2), random(0, pixelSize / 2));
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (fall(x, y)) {
                return;
            }
            if (getTouchingDiagonal(x, y, "corruption", null) == 8) {
                return;
            }
            forAllTouching(x, y, function(x1, y1) {
                if (random() < 1 / pixels[grid[y1][x1][0]].blast_resistance && grid[y1][x1][0] != "air") {
                    changePixel(x1, y1, "corruption", null);
                }
            });
            flow(x, y, gridSize);
            if (y == gridSize - 1) {
                grid[y][x][0] = "corruption2";
                move(x, y, [{ x: 0, y: -gridSize + 1 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 0.2,
        blast_resistance: 1,
        name: "Corruption",
        description: "Please do not place this down. It will corrupt the game.",
        key: 61,
    },
    "corruption2": {
        draw: function(x, y) {
            fill(255, 255, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(0, 0, 0);
            rect(x * pixelSize + random(0, pixelSize / 2), y * pixelSize + random(0, pixelSize / 2), random(0, pixelSize / 2), random(0, pixelSize / 2));
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 25)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (fall(x, y)) {
                return;
            }
            if (getTouchingDiagonal(x, y, "corruption2", null) == 8) {
                return;
            }
            forAllTouching(x, y, function(x1, y1) {
                if (random() < 1 / pixels[grid[y1][x1][0]].blast_resistance && grid[y1][x1][0] != "air") {
                    changePixel(x1, y1, "corruption2", null);
                }
            });
            flow(x, y);
            if (grid[x][y][0] != "corruption2") {
                changePixel(y, x, "corruption2");
            }
            if (y == gridSize - 1) {
                move(x, y, [{ x: (x - gameTick * gameTick) % gridSize, y: -gridSize + 1 }]);
                move(x, y, [{ x: (x - gameTick * gameTick + 2) % gridSize, y: -gridSize + 1 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 0.2,
        blast_resistance: 1,
        name: "Corruption 2",
        description: "It's like Corruption but crazier.",
        key: 62,
    },
    "life": {
        draw: function(x, y) {
            fill(25, 255, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(25, 255, 25)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            var touchingPixels = getTouchingDiagonal(x, y, "air", null);
            if (touchingPixels >= 7 || touchingPixels <= 4) {
                changePixel(x, y, "air", null);
            }
            forEachTouchingDiagonal(x, y, "air", null, function(x1, y1) {
                if (getTouchingDiagonal(x1, y1, "life") == 3) {
                    changePixel(x1, y1, "life", null);
                }
            });
        },
        updateStage: 0,
        animated: true,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 5,
        blast_resistance: 5,
        name: "Life",
        description: "Simulate life in Pixel Simulator.",
        key: 63,
    },
    "death": {
        draw: function(x, y) {
            fill(25, 50, 50);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(25, 50, 50)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (random() < 0.1) {
                changePixel(x, y, "air", null);
            }
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (random() < 0.1) {
                    changePixel(x1, y1, "death", null);
                }
            });
        },
        updateStage: 0,
        animated: true,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 5,
        blast_resistance: 5,
        name: "Death",
        description: "Unsimulate life in Pixel Simulator.",
        key: 64,
    },
    /*
    "spixel_left": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 0, 150);
            rect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            fill(0, 255, 150);
            rect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(0, 10, 10, 40);
            ctx.fillRect(10, 20, 10, 20);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(50, 10, 10, 40);
            ctx.fillRect(40, 20, 10, 20);
        },
        update: function(x, y) {
            if (x == 0 || x == gridSize - 1) {
                return;
            }
            if (grid[y][x + 1] != "air" && pixels[grid[y][x - 1]].pushable) {
                push(x, y, "left", gridSize);
                changePixel(x - 1, y, grid[y][x + 1]);
            }
        },
        updateStage: 0,
        density: 4,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 1,
        name: "S.P.I.X.E.L. (Left)",
        description: "Sample Providing Infinite Xray Emitting L.A.S.E.R.<br>LASER stands for \"Lol Are Super Entities Rowing (Boats)\".",
        key: 91,
    },
    "spixel_right": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 0, 150);
            rect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            fill(0, 255, 150);
            rect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(50, 10, 10, 40);
            ctx.fillRect(40, 20, 10, 20);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(0, 10, 10, 40);
            ctx.fillRect(10, 20, 10, 20);
        },
        update: function(x, y) {
            if (x == 0 || x == gridSize - 1) {
                return;
            }
            if (grid[y][x - 1] != "air" && pixels[grid[y][x + 1]].pushable) {
                push(x, y, "right", gridSize);
                changePixel(x + 1, y, grid[y][x - 1]);
            }
        },
        updateStage: 0,
        density: 4,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 1,
        name: "S.P.I.X.E.L. (Right)",
        description: "Sample Providing Infinite Xray Emitting L.A.S.E.R.<br>LASER stands for \"Lol Are Super Entities Rowing (Boats)\".",
        key: 92,
    },
    "spixel_up": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 0, 150);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize * 2 / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            fill(0, 255, 150);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 5 / 6, pixelSize * 2 / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(10, 0, 40, 10);
            ctx.fillRect(20, 10, 20, 10);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(10, 50, 40, 10);
            ctx.fillRect(20, 40, 20, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y + 1][x] != "air" && pixels[grid[y - 1][x]].pushable) {
                push(x, y, "up", gridSize);
                changePixel(x, y - 1, grid[y + 1][x]);
            }
        },
        updateStage: 0,
        density: 4,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 1,
        name: "S.P.I.X.E.L. (Up)",
        description: "Sample Providing Infinite Xray Emitting L.A.S.E.R.<br>LASER stands for \"Lol Are Super Entities Rowing (Boats)\".",
        key: 93,
    },
    "spixel_down": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 0, 150);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 5 / 6, pixelSize * 2 / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
            fill(0, 255, 150);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize * 2 / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(10, 50, 40, 10);
            ctx.fillRect(20, 40, 20, 10);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(10, 0, 40, 10);
            ctx.fillRect(20, 10, 20, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y - 1][x] != "air" && pixels[grid[y + 1][x]].pushable) {
                push(x, y, "down", gridSize);
                changePixel(x, y + 1, grid[y - 1][x]);
            }
        },
        updateStage: 0,
        density: 4,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 1,
        name: "S.P.I.X.E.L. (Down)",
        description: "Sample Providing Infinite Xray Emitting L.A.S.E.R.<br>LASER stands for \"Lol Are Super Entities Rowing (Boats)\".",
        key: 94,
    },
    */
};

var updateGrid = function() {
    if (gameTick % 2 == 0) {
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                // if (pixels[grid[j][i][1]].updateStage == 0) {
                    pixels[grid[j][i][1]].update(i, j);
                // }
                // if (pixels[grid[j][i][0]].updateStage == 0) {
                    pixels[grid[j][i][0]].update(i, j);
                // }
            }
        }
        // for (var i = 0; i < gridSize; i++) {
        //     for (var j = 0; j < gridSize; j++) {
        //         if (pixels[grid[j][i]].updateStage == 1) {
        //             pixels[grid[j][i]].update(i, j);
        //         }
        //     }
        // }
    }
    else {
        for (var i = gridSize - 1; i > 0; i--) {
            for (var j = 0; j < gridSize; j++) {
                // if (pixels[grid[j][i][1]].updateStage == 0) {
                    pixels[grid[j][i][1]].update(i, j);
                // }
                // if (pixels[grid[j][i][0]].updateStage == 0) {
                    pixels[grid[j][i][0]].update(i, j);
                // }
            }
        }
        // for (var i = gridSize - 1; i > 0; i--) {
        //     for (var j = 0; j < gridSize; j++) {
        //         if (pixels[grid[j][i]].updateStage == 1) {
        //             pixels[grid[j][i]].update(i, j);
        //         }
        //     }
        // }
    }

    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            if (nextGrid[j][i][0] != null) {
                grid[j][i][0] = nextGrid[j][i][0];
            }
            if (nextGrid[j][i][1] != null) {
                grid[j][i][1] = nextGrid[j][i][1];
            }
            if (nextGrid[j][i][0] != null || nextGrid[j][i][1] != null || pixels[grid[j][i][0]].animated || pixels[grid[j][i][1]].animated) {
                pixels[grid[j][i][0]].draw(i, j);
                if (grid[j][i][1] != "air") {
                    pixels[grid[j][i][1]].draw(i, j);
                }
                nextGrid[j][i] = [null, null];
            }
        }
    }
};

var clickLine = function(startX, startY, endX, endY) {
    var x = startX;
    var y = startY;
    var angle = atan2(endY - startY, endX - startX);
    var distance = sqrt(pow(endX - startX, 2) + pow(endY - startY, 2));
    for (var i = 0; i <= distance; i++) {
        var gridX = floor(x);
        var gridY = floor(y);
        for (var j = gridX - clickSize + 1; j <= gridX + clickSize - 1; j++) {
            if (j >= 0 && j <= gridSize - 1) {
                for (var k = gridY - clickSize + 1; k <= gridY + clickSize - 1; k++) {
                    if (k >= 0 && k <= gridSize - 1) {
                        if (clickPixel == "air") {
                            if (grid[k][j][0] != clickPixel || grid[k][j][1] != clickPixel) {
                                grid[k][j][0] = clickPixel;
                                grid[k][j][1] = clickPixel;
                                pixels[grid[k][j][0]].draw(j, k);
                            }
                        }
                        else {
                            var layer = pixels[clickPixel].effect ? 1 : 0;
                            if (grid[k][j][layer] != clickPixel) {
                                grid[k][j][layer] = clickPixel;
                                pixels[grid[k][j][0]].draw(j, k);
                                if (grid[k][j][1] != "air") {
                                    pixels[grid[k][j][1]].draw(j, k);
                                }
                            }
                        }
                    }
                }
            }
        }
        x += cos(angle);
        y += sin(angle);
    }
};
var updateClick = function() {
    if (mouseIsPressed && mouseX >= 0 && mouseX <= 600 && mouseY >= 0 && mouseY <= 600) {
        clickLine(floor(mouseX / pixelSize), floor(mouseY / pixelSize), floor(pmouseX / pixelSize), floor(pmouseY / pixelSize));
    }
};
var updateClickPixel = function() {
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
}
document.onkeyup = function(event) {
    if (event.key == "0") {
        clickPixel = "air";
        setPixel();
        clickNumber = 0;
    }
    if (event.key.charCodeAt(0) >= 49 && event.key.charCodeAt(0) <= 57) {
        clickNumber = clickNumber * 10 + (event.key.charCodeAt(0) - 48);
        updateClickPixel();
    }
}

var update = function() {
    updateClick();
    if (running) {
        updateGrid();
    }
    updateOverlay(mouseX, mouseY);

    frames.push(millis());
    while (frames[0] + 1000 < millis()) {
        frames.shift(1);
        if (minFPS == null) {
            minFPS = frames.length;
        }
    }

    if (frames.length > maxFPS) {
        maxFPS = frames.length;
    }
    if (minFPS != null && frames.length < minFPS) {
        minFPS = frames.length;
    }

    averageFPS = (frames.length + averageFPS * 3) / 4

    document.getElementById("fpsDisplay").innerHTML = `FPS: ${frames.length}; max: ${maxFPS}; min: ${minFPS}; avg: ${averageFPS};`;

    gameTick++;
    window.requestAnimationFrame(update);
};
window.requestAnimationFrame(update);
// setInterval(update, 0);