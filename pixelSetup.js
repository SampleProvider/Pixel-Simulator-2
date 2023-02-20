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
    for (var i = Math.max(-1, -x); i <= Math.min(1, gridSize - x - 1); i++) {
        for (var j = Math.max(-1, -y); j <= Math.min(1, gridSize - y - 1); j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            if (y + j < 0 || y + j >= gridSize) {
                continue;
            }
            if (isPixel(grid[y + j][x + i], pixel, effect)) {
                return true;
            }
        }
    }
    return false;
};
var getTouchingDiagonal = function(x, y, pixel, effect) {
    var touchingPixels = 0;
    for (var i = Math.max(-1, -x); i <= Math.min(1, gridSize - x - 1); i++) {
        for (var j = Math.max(-1, -y); j <= Math.min(1, gridSize - y - 1); j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            if (isPixel(grid[y + j][x + i], pixel, effect)) {
                touchingPixels += 1;
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
    for (var i = Math.max(-1, -x); i <= Math.min(1, gridSize - x - 1); i++) {
        for (var j = Math.max(-1, -y); j <= Math.min(1, gridSize - y - 1); j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            if (isPixel(grid[y + j][x + i], pixel, effect)) {
                action(x + i, y + j);
            }
        }
    }
};
var forAllTouchingDiagonal = function(x, y, action) {
    for (var i = Math.max(-1, -x); i <= Math.min(1, gridSize - x - 1); i++) {
        for (var j = Math.max(-1, -y); j <= Math.min(1, gridSize - y - 1); j++) {
            if (i == 0 && j == 0) {
                continue;
            }
            action(x + i, y + j);
        }
    }
};

var getMinimalFlowSpace = function(x, y, distance, layer) {
    if (y + 1 == gridSize) {
        return [0, 0];
    }
    var pixel = grid[y][x][layer];
    var leftSpaceStopped = false;
    var rightSpaceStopped = false;
    for (var i = 1; i <= distance; i++) {
        var leftSpace = false;
        var rightSpace = false;
        if (x - i == -1) {
            leftSpaceStopped = true;
        }
        if (!leftSpaceStopped) {
            if ((grid[y + 1][x - i + 1][layer] == pixel || pixels[grid[y][x - i][layer]].density < pixels[pixel].density) && pixels[grid[y + 1][x - i][layer]].density < pixels[pixel].density && grid[y][x - i][layer] != pixel) {
                leftSpace = true;
            }
            if (pixels[grid[y][x - i][layer]].density >= pixels[pixel].density) {
                leftSpaceStopped = true;
            }
        }
        if (x + i == gridSize) {
            rightSpaceStopped = true;
        }
        if (!rightSpaceStopped) {
            if ((grid[y + 1][x + i - 1][layer] == pixel || pixels[grid[y][x + i][layer]].density < pixels[pixel].density) && pixels[grid[y + 1][x + i][layer]].density < pixels[pixel].density && grid[y][x + i][layer] != pixel) {
                rightSpace = true;
            }
            if (pixels[grid[y][x + i][layer]].density >= pixels[pixel].density) {
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
var getMinimalAscendSpace = function(x, y, distance, layer) {
    if (y == 0) {
        return [0, 0];
    }
    var pixel = grid[y][x][layer];
    var leftSpaceStopped = false;
    var rightSpaceStopped = false;
    for (var i = 1; i <= distance; i++) {
        var leftSpace = false;
        var rightSpace = false;
        if (x - i == -1) {
            leftSpaceStopped = true;
        }
        if (!leftSpaceStopped) {
            if ((grid[y - 1][x - i + 1][layer] == pixel || grid[y][x - i][layer] == "air") && grid[y - 1][x - i][layer] == "air" && grid[y][x - i][layer] != pixel) {
                leftSpace = true;
            }
            if (grid[y][x - i][layer] != "air") {
                leftSpaceStopped = true;
            }
        }
        if (x + i == gridSize) {
            rightSpaceStopped = true;
        }
        if (!rightSpaceStopped) {
            if ((grid[y - 1][x + i - 1][layer] == pixel || grid[y][x + i][layer] == "air") && grid[y - 1][x + i][layer] == "air" && grid[y][x + i][layer] != pixel) {
                rightSpace = true;
            }
            if (grid[y][x + i][layer] != "air") {
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
var getMinimalAir = function(x, y, distance, layer) {
    var pixel = grid[y][x][layer];
    for (var i = 1; i <= distance; i++) {
        var leftAir = false;
        var rightAir = false;
        if (x - i == -1) {
            leftAir = true;
        }
        else {
            if (grid[y][x - i][layer] != "air" && grid[y][x - i][layer] != pixel) {
                leftAir = true;
            }
        }
        if (x + i == gridSize) {
            rightAir = true;
        }
        else {
            if (grid[y][x + i][layer] != "air" && grid[y][x + i][layer] != pixel) {
                rightAir = true;
            }
        }
        if (leftAir || rightAir) {
            return [leftAir ? i : 0, rightAir ? i : 0];
        }
    }
    return [0, 0];
};


var colorToRGB = function(array) {
    return `rgb(${array[0]}, ${array[1]}, ${array[2]})`;
}
var colorTint = function(array, t) {
    return `rgb(${array[0] * (1 - t) + array[3] * t}, ${array[1] * (1 - t) + array[4] * t}, ${array[2] * (1 - t) + array[5] * t})`;
};
var colorTintTransparent = function(array, a, t) {
    return `rgba(${array[0] * (1 - t) + array[3] * t}, ${array[1] * (1 - t) + array[4] * t}, ${array[2] * (1 - t) + array[5] * t}, ${a})`;
};
var colorLerp = function(array, p) {
    return `rgb(${(array[0] * (Math.sin(gameTick * 2 * Math.PI / p) + 1) / 2) + (array[3] * (Math.sin((gameTick * 2 + p) * Math.PI / p) + 1) / 2)}, ${(array[1] * (Math.sin(gameTick * 2 * Math.PI / p) + 1) / 2) + (array[4] * (Math.sin((gameTick * 2 + p) * Math.PI / p) + 1) / 2)}, ${(array[2] * (Math.sin(gameTick * 2 * Math.PI / p) + 1) / 2) + (array[5] * (Math.sin((gameTick * 2 + p) * Math.PI / p) + 1) / 2)})`;
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
    for (var i = Math.max(-ceil(sqrt(size)), -woodX); i <= Math.min(ceil(sqrt(size)), gridSize - woodX - 1); i++) {
        for (var j = Math.max(-ceil(sqrt(size)), -woodY); j <= Math.min(ceil(sqrt(size)), gridSize - woodY - 1); j++) {
            if (pow(i, 2) + pow(j, 2) <= size) {
                if (grid[woodY + j][woodX + i][0] == "air") {
                    changePixel(woodX + i, woodY + j, leafPixel, null);
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
var move = function(x, y, positions, layer) {
    if (nextGrid[y][x][layer] != null) {
        return false;
    }
    if (layer == 0 && grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
        return false;
    }
    var moveablePositions = [];
    for (var i in positions) {
        if (x + positions[i].x >= 0 && x + positions[i].x < gridSize && y + positions[i].y >= 0 && y + positions[i].y < gridSize) {
            if (nextGrid[y + positions[i].y][x + positions[i].x][layer] == null) {
                moveablePositions.push(positions[i]);
            }
        }
    }
    if (moveablePositions.length > 0) {
        var move = moveablePositions[Math.floor(random() * moveablePositions.length)];
        if (pixels[grid[y + move.y][x + move.x][0]].deletePushed > 0) {
            if (layer == 0) {
                nextGrid[y][x] = ["air", "air"];
            }
            else {
                nextGrid[y][x][1] = "air";
            }
            if (pixels[grid[y + move.y][x + move.x][0]].deletePushed == 1) {
                nextGrid[y + move.y][x + move.x] = ["air", "air"];
            }
            return true;
        }
        if (layer == 0) {
            nextGrid[y + move.y][x + move.x][0] = grid[y][x][0];
            nextGrid[y][x][0] = grid[y + move.y][x + move.x][0];
        }
        if (grid[y][x][1] != "air") {
            nextGrid[y + move.y][x + move.x][1] = grid[y][x][1];
            nextGrid[y][x][1] = grid[y + move.y][x + move.x][1];
        }
        // if (grid[y + move.y][x + move.x][0] != "air") {
        // }
        return true;
    }
    return false;
};
var fall = function(x, y, layer) {
    if (y + 1 == gridSize) {
        return false;
    }
    if (pixels[grid[y + 1][x][layer]].density < pixels[grid[y][x][layer]].density) {
        return move(x, y, [{ x: 0, y: 1 }], layer);
    }
    return false;
};
var flow = function(x, y, distance, layer) {
    if (fall(x, y, layer)) {
        return true;
    }
    var positions = [];
    var minimalSpace = getMinimalFlowSpace(x, y, distance, layer);
    if (minimalSpace[0] == 1) {
        positions.push({ x: -1, y: 1 });
    }
    if (minimalSpace[1] == 1) {
        positions.push({ x: 1, y: 1 });
    }
    if (positions.length == 0) {
        if (minimalSpace[0] != 0) {
            positions.push({ x: -1, y: 0 });
        }
        if (minimalSpace[1] != 0) {
            positions.push({ x: 1, y: 0 });
        }
        if (positions.length == 0) {
            var pixel = grid[y][x][layer];
            if (x != 0 && x != gridSize - 1 && y != 0) {
                if (pixels[grid[y - 1][x][layer]].density >= pixels[pixel].density) {
                    var minimalAir = getMinimalAir(x, y, distance, layer);
                    // if (pixels[grid[y][x - 1][layer]].density < pixels[pixel].density && minimalAir[layer] != 0) {
                    if (pixels[grid[y][x - 1][layer]].density < pixels[pixel].density && pixels[grid[y - 1][x - 1][layer]].density > pixels[pixel].density && minimalAir[layer] != 0) {
                        positions.push({ x: -1, y: 0 });
                    }
                    // if (pixels[grid[y][x + 1][layer]].density < pixels[pixel].density && minimalAir[1] != 0) {
                    if (pixels[grid[y][x + 1][layer]].density < pixels[pixel].density && pixels[grid[y - 1][x + 1][layer]].density > pixels[pixel].density && minimalAir[1] != 0) {
                        positions.push({ x: 1, y: 0 });
                    }
                    // if (positions.length == 0) {
                    //     if (pixels[grid[y][x - 1][layer]].density < pixels[pixel].density && grid[y][x + 1][layer] == pixel) {
                    //         positions.push({ x: -1, y: 0 });
                    //     }
                    //     if (pixels[grid[y][x + 1][layer]].density < pixels[pixel].density && grid[y][x - 1][layer] == pixel) {
                    //     // if (pixels[grid[y][x + 1][layer]].density < pixels[pixel].density && pixels[grid[y - 1][x + 1][layer]].density > pixels[pixel].density && minimalAir[1] != 0) {
                    //         positions.push({ x: 1, y: 0 });
                    //     }
                    // }
                }
            }
        }
    }
    return move(x, y, positions, layer);
};
var rise = function(x, y, layer) {
    if (y == 0) {
        return false;
    }
    if (grid[y - 1][x][layer] == "air") {
        return move(x, y, [{ x: 0, y: -1 }], layer);
    }
    return false;
};
var ascend = function(x, y, distance, layer) {
    if (getRandom() < 0.5 && rise(x, y, layer)) {
        return true;
    }
    if (getRandom() < 0.3) {
        return false;
    }
    var positions = [];
    var minimalSpace = getMinimalAscendSpace(x, y, distance, layer);
    if (minimalSpace[0] == 1) {
        positions.push({ x: -1, y: -1 });
    }
    if (minimalSpace[1] == 1) {
        positions.push({ x: 1, y: -1 });
    }
    if (positions.length == 0) {
        if (minimalSpace[0] != 0) {
            positions.push({ x: -1, y: 0 });
        }
        if (minimalSpace[1] != 0) {
            positions.push({ x: 1, y: 0 });
        }
        if (positions.length == 0) {
            var pixel = grid[y][x][layer];
            if (x != 0 && x != gridSize - 1 && y != 0) {
                if (pixels[grid[y - 1][x][layer]].density >= pixels[pixel].density) {
                    var minimalAir = getMinimalAir(x, y, distance, layer);
                    // if (pixels[grid[y][x - 1][layer]].density < pixels[pixel].density && minimalAir[layer] != 0) {
                    if (pixels[grid[y][x - 1][layer]].density < pixels[pixel].density && pixels[grid[y - 1][x - 1][layer]].density > pixels[pixel].density && minimalAir[layer] != 0) {
                        positions.push({ x: -1, y: 0 });
                    }
                    // if (pixels[grid[y][x + 1][layer]].density < pixels[pixel].density && minimalAir[1] != 0) {
                    if (pixels[grid[y][x + 1][layer]].density < pixels[pixel].density && pixels[grid[y - 1][x + 1][layer]].density > pixels[pixel].density && minimalAir[1] != 0) {
                        positions.push({ x: 1, y: 0 });
                    }
                    // if (positions.length == 0) {
                    //     if (pixels[grid[y][x - 1][layer]].density < pixels[pixel].density && grid[y][x + 1][layer] == pixel) {
                    //         positions.push({ x: -1, y: 0 });
                    //     }
                    //     if (pixels[grid[y][x + 1][layer]].density < pixels[pixel].density && grid[y][x - 1][layer] == pixel) {
                    //     // if (pixels[grid[y][x + 1][layer]].density < pixels[pixel].density && pixels[grid[y - 1][x + 1][layer]].density > pixels[pixel].density && minimalAir[1] != 0) {
                    //         positions.push({ x: 1, y: 0 });
                    //     }
                    // }
                }
            }
        }
    }
    return move(x, y, positions, layer);
};
var push = function(x, y, direction, distance, updateFirstPixel) {
    if (direction == "left") {
        for (var i = 1; i <= distance; i++) {
            if (x - i == -1) {
                return false;
            }
            if (nextGrid[y][x - i][0] != null) {
                return false;
            }
            if (pixels[grid[y][x - i][0]].deletePushed > 0) {
                for (var j = 2; j < i; j++) {
                    nextGrid[y][x - j][0] = grid[y][x - j + 1][0];
                    if (grid[y][x - j + 1][1] != "air") {
                        nextGrid[y][x - j][1] = grid[y][x - j + 1][1];
                    }
                }
                if (updateFirstPixel) {
                    nextGrid[y][x - 1] = ["air", "air"];
                }
                if (pixels[grid[y][x - i][0]].deletePushed == 1) {
                    nextGrid[y][x - i] = ["air", "air"]
                }
                return true;
            }
            if (!(updateFirstPixel && i == 1) && pixels[grid[y][x - i][0]].pushDirection == "left") {
                return false;
            }
            if (grid[y][x - i][0] == "slider_vertical") {
                return false;
            }
            if (!pixels[grid[y][x - i][0]].pushable) {
                return false;
            }
            if (grid[y][x - i][0] == "air") {
                for (var j = 2; j <= i; j++) {
                    nextGrid[y][x - j][0] = grid[y][x - j + 1][0];
                    if (grid[y][x - j + 1][1] != "air") {
                        nextGrid[y][x - j][1] = grid[y][x - j + 1][1];
                    }
                }
                if (updateFirstPixel) {
                    nextGrid[y][x - 1] = ["air", "air"];
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
            if (pixels[grid[y][x + i][0]].deletePushed > 0) {
                for (var j = 2; j < i; j++) {
                    nextGrid[y][x + j][0] = grid[y][x + j - 1][0];
                    if (grid[y][x + j - 1][1] != "air") {
                        nextGrid[y][x + j][1] = grid[y][x + j - 1][1];
                    }
                }
                if (updateFirstPixel) {
                    nextGrid[y][x + 1] = ["air", "air"];
                }
                if (pixels[grid[y][x + i][0]].deletePushed == 1) {
                    nextGrid[y][x + i] = ["air", "air"]
                }
                return true;
            }
            if (!(updateFirstPixel && i == 1) && pixels[grid[y][x + i][0]].pushDirection == "right") {
                return false;
            }
            if (grid[y][x + i][0] == "slider_vertical") {
                return false;
            }
            if (!pixels[grid[y][x + i][0]].pushable) {
                return false;
            }
            if (grid[y][x + i][0] == "air") {
                for (var j = 2; j <= i; j++) {
                    nextGrid[y][x + j][0] = grid[y][x + j - 1][0];
                    if (grid[y][x + j - 1][1] != "air") {
                        nextGrid[y][x + j][1] = grid[y][x + j - 1][1];
                    }
                }
                if (updateFirstPixel) {
                    nextGrid[y][x + 1] = ["air", "air"];
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
            if (pixels[grid[y - i][x][0]].deletePushed > 0) {
                for (var j = 2; j < i; j++) {
                    nextGrid[y - j][x][0] = grid[y - j + 1][x][0];
                    if (grid[y - j + 1][x][1] != "air") {
                        nextGrid[y - j][x][1] = grid[y - j + 1][x][1];
                    }
                }
                if (updateFirstPixel) {
                    nextGrid[y - 1][x] = ["air", "air"];
                }
                if (pixels[grid[y - i][x][0]].deletePushed == 1) {
                    nextGrid[y - i][x] = ["air", "air"]
                }
                return true;
            }
            if (!(updateFirstPixel && i == 1) && pixels[grid[y - i][x][0]].pushDirection == "up") {
                return false;
            }
            if (grid[y - i][x][0] == "slider_horizontal") {
                return false;
            }
            if (!pixels[grid[y - i][x][0]].pushable) {
                return false;
            }
            if (grid[y - i][x][0] == "air") {
                for (var j = 2; j <= i; j++) {
                    nextGrid[y - j][x][0] = grid[y - j + 1][x][0];
                    if (grid[y - j + 1][x][1] != "air") {
                        nextGrid[y - j][x][1] = grid[y - j + 1][x][1];
                    }
                }
                if (updateFirstPixel) {
                    nextGrid[y - 1][x] = ["air", "air"];
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
            if (pixels[grid[y + i][x][0]].deletePushed > 0) {
                for (var j = 2; j < i; j++) {
                    nextGrid[y + j][x][0] = grid[y + j - 1][x][0];
                    if (grid[y + j - 1][x][1] != "air") {
                        nextGrid[y + j][x][1] = grid[y + j - 1][x][1];
                    }
                }
                if (updateFirstPixel) {
                    nextGrid[y + 1][x] = ["air", "air"];
                }
                if (pixels[grid[y + i][x][0]].deletePushed == 1) {
                    nextGrid[y + i][x] = ["air", "air"]
                }
                return true;
            }
            if (!(updateFirstPixel && i == 1) && pixels[grid[y + i][x][0]].pushDirection == "down") {
                return false;
            }
            if (grid[y + i][x][0] == "slider_horizontal") {
                return false;
            }
            if (!pixels[grid[y + i][x][0]].pushable) {
                return false;
            }
            if (grid[y + i][x][0] == "air") {
                for (var j = 2; j <= i; j++) {
                    nextGrid[y + j][x][0] = grid[y + j - 1][x][0];
                    if (grid[y + j - 1][x][1] != "air") {
                        nextGrid[y + j][x][1] = grid[y + j - 1][x][1];
                    }
                }
                if (updateFirstPixel) {
                    nextGrid[y + 1][x] = ["air", "air"];
                }
                return true;
            }
        }
        return false;
    }
};
var laser = function(x, y, direction, distance, pixel, power) {
    if (direction == "left") {
        for (var i = 1; i <= distance; i++) {
            if (x - i == -1) {
                return i;
            }
            if (grid[y][x - i][0] != "air" || nextGrid[y][x - i][0] != null) {
                var hitPixel = grid[y][x - 1][0];
                if (nextGrid[y][x - i][0] != null) {
                    hitPixel = nextGrid[y][x - i][0];
                }
                if (random() < power / pixels[hitPixel].blastResistance / i) {
                    nextGrid[y][x - i][0] = "air";
                }
                nextGrid[y][x - i][1] = pixel;
                return i;
            }
            else {
                if (nextGrid[y][x - i][1] == null) {
                    nextGrid[y][x - i][1] = "laser";
                }
            }
        }
        return distance;
    }
    else if (direction == "right") {
        for (var i = 1; i <= distance; i++) {
            if (x + i == gridSize) {
                return false;
            }
            if (grid[y][x + i][0] != "air" || nextGrid[y][x + i][0] != null || (grid[y][x + i][1] != "air" && grid[y][x + i][1] != pixel) || nextGrid[y][x + i][1] != null) {
                return false;
            }
            if (grid[y][x + i][1] == "air") {
                for (var j = 2; j <= i; j++) {
                    nextGrid[y][x + j][1] = grid[y][x + j - 1][1];
                }
                if (updateFirstPixel) {
                    nextGrid[y][x + 1] = ["air", "air"];
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
            if (grid[y - i][x][0] != "air" || nextGrid[y - i][x][0] != null || (grid[y - i][x][1] != "air" && grid[y - i][x][1] != pixel) || nextGrid[y - i][x][1] != null) {
                return false;
            }
            if (grid[y - i][x][1] == "air") {
                for (var j = 2; j <= i; j++) {
                    nextGrid[y - j][x][1] = grid[y - j + 1][x][1];
                }
                if (updateFirstPixel) {
                    nextGrid[y - 1][x] = ["air", "air"];
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
            if (grid[y + i][x][0] != "air" || nextGrid[y + i][x][0] != null || (grid[y + i][x][1] != "air" && grid[y + i][x][1] != pixel) || nextGrid[y + i][x][1] != null) {
                return false;
            }
            if (grid[y + i][x][1] == "air") {
                for (var j = 2; j <= i; j++) {
                    nextGrid[y + j][x][1] = grid[y + j - 1][x][1];
                }
                if (updateFirstPixel) {
                    nextGrid[y + 1][x] = ["air", "air"];
                }
                return true;
            }
        }
        return false;
    }
};
var explode = function(x, y, radius, explosionPixel, destroyChance, effectChance) {
    var pixel = grid[y][x][0];
    for (var i = Math.max(-radius, -x); i <= Math.min(radius, gridSize - x - 1); i++) {
        for (var j = Math.max(-radius, -y); j <= Math.min(radius, gridSize - y - 1); j++) {
            if (i == 0 && j == 0) {
                nextGrid[y][x] = ["air", "air"];
                continue;
            }
            var distance = pow(i, 2) + pow(j, 2);
            if (distance <= pow(radius, 2) + 1) {
                if (grid[y + j][x + i] != pixel && random() < destroyChance * radius / distance / pixels[grid[y + j][x + i][0]].blastResistance) {
                    nextGrid[y + j][x + i][0] = "air";
                }
                if (distance <= 2 || random() < effectChance * radius / distance) {
                    if (pixels[explosionPixel].effect) {
                        nextGrid[y + j][x + i][1] = explosionPixel;
                    }
                    else {
                        nextGrid[y + j][x + i][0] = explosionPixel;
                    }
                }
            }
        }
    }
}