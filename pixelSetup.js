var AIR = 0;
var DIRT = 1;
var GRASS = 2;
var SAND = 3;
var WATER = 4;
var OAK_WOOD = 5;
var LEAF = 6;
var SAPLING = 7;
var MUD = 8;
var DRIED_MUD = 9;
var LAVA = 10;
var FIRE = 11;
var STEAM = 12;
var QUARTZ = 13;
var ASH = 14;
var SILT = 15;
var STONE = 16;
var BASALT = 17;
var OBSIDIAN = 18;
var GUNPOWDER = 19;
var SNOW = 20;
var ICE = 21;
var SLUSH = 22;
var FROST_FIRE = 23;
var SPRUCE_WOOD = 24;
var PISTON_LEFT = 25;
var PISTON_RIGHT = 26;
var PISTON_UP = 27;
var PISTON_DOWN = 28;
var CLONER_LEFT = 29;
var CLONER_RIGHT = 30;
var CLONER_UP = 31;
var CLONER_DOWN = 32;
var PENETRATOR_LEFT = 33;
var PENETRATOR_RIGHT = 34;
var PENETRATOR_UP = 35;
var PENETRATOR_DOWN = 36;
var ROTATOR_CLOCKWISE = 37;
var ROTATOR_COUNTER_CLOCKWISE = 38;
var ALTERNATOR = 39;
var DELETER = 40;
var SWAPPER_HORIZONTAL = 41;
var SWAPPER_VERTICAL = 42;
var SLIDER_HORIZONTAL = 43;
var SLIDER_VERTICAL = 44;
var COLLAPSABLE = 45;
var REFLECTOR_HORIZONTAL = 46;
var REFLECTOR_VERTICAL = 47;
var EXPLOSIVES = 48;
var IGNITOR_LEFT = 49;
var IGNITOR_RIGHT = 50;
var IGNITOR_UP = 51;
var IGNITOR_DOWN = 52;
var IGNITOR_LASER_LEFT = 53;
var IGNITOR_LASER_RIGHT = 54;
var IGNITOR_LASER_UP = 55;
var IGNITOR_LASER_DOWN = 56;
var IGNITOR_LAUNCHER_LEFT = 57;
var IGNITOR_LAUNCHER_RIGHT = 58;
var IGNITOR_LAUNCHER_UP = 59;
var IGNITOR_LAUNCHER_DOWN = 60;
var IGNITOR_LASER_BEAM_LEFT = 61;
var IGNITOR_LASER_BEAM_RIGHT = 62;
var IGNITOR_LASER_BEAM_UP = 63;
var IGNITOR_LASER_BEAM_DOWN = 64;
var IGNITOR_MISSILE_LEFT = 65;
var IGNITOR_MISSILE_RIGHT = 66;
var IGNITOR_MISSILE_UP = 67;
var IGNITOR_MISSILE_DOWN = 68;
var FROST_EXPLOSIVES = 69;
var FROST_IGNITOR_LEFT = 70;
var FROST_IGNITOR_RIGHT = 71;
var FROST_IGNITOR_UP = 72;
var FROST_IGNITOR_DOWN = 73;
var FROST_IGNITOR_LASER_LEFT = 74;
var FROST_IGNITOR_LASER_RIGHT = 75;
var FROST_IGNITOR_LASER_UP = 76;
var FROST_IGNITOR_LASER_DOWN = 77;
var FROST_IGNITOR_LAUNCHER_LEFT = 78;
var FROST_IGNITOR_LAUNCHER_RIGHT = 79;
var FROST_IGNITOR_LAUNCHER_UP = 80;
var FROST_IGNITOR_LAUNCHER_DOWN = 81;
var FROST_IGNITOR_LASER_BEAM_LEFT = 82;
var FROST_IGNITOR_LASER_BEAM_RIGHT = 83;
var FROST_IGNITOR_LASER_BEAM_UP = 84;
var FROST_IGNITOR_LASER_BEAM_DOWN = 85;
var FROST_IGNITOR_MISSILE_LEFT = 86;
var FROST_IGNITOR_MISSILE_RIGHT = 87;
var FROST_IGNITOR_MISSILE_UP = 88;
var FROST_IGNITOR_MISSILE_DOWN = 89;
var MONSTER = 90;
var HAPPY_MONSTER = 91;
var SAD_MONSTER = 92;
var TOUGH_MONSTER = 93;
var SCARED_MONSTER = 94;
var PLACEABLE = 95;
var NOT_PLACEABLE = 96;
var RGB_PIXEL = 97;

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
            if ((grid[y - 1][x - i + 1][layer] == pixel || grid[y][x - i][layer] == AIR) && grid[y - 1][x - i][layer] == AIR && grid[y][x - i][layer] != pixel) {
                leftSpace = true;
            }
            if (grid[y][x - i][layer] != AIR) {
                leftSpaceStopped = true;
            }
        }
        if (x + i == gridSize) {
            rightSpaceStopped = true;
        }
        if (!rightSpaceStopped) {
            if ((grid[y - 1][x + i - 1][layer] == pixel || grid[y][x + i][layer] == AIR) && grid[y - 1][x + i][layer] == AIR && grid[y][x + i][layer] != pixel) {
                rightSpace = true;
            }
            if (grid[y][x + i][layer] != AIR) {
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
            if (grid[y][x - i][layer] != AIR && grid[y][x - i][layer] != pixel) {
                leftAir = true;
            }
        }
        if (x + i == gridSize) {
            rightAir = true;
        }
        else {
            if (grid[y][x + i][layer] != AIR && grid[y][x + i][layer] != pixel) {
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

var generateTree = function(x, y, direction, length, stemPixel, leafPixel, turnChance, branchChance, branchAngle, branchCooldownLimit, leafDistance, leafFunction) {
    var woodX = x;
    var woodY = y;
    var branchCooldown = branchCooldownLimit;
    for (var i = 0; i < length; i++) {
        var bestDirection = [0, 0];
        var randomDirection = getRandom();
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
        forEachTouchingDiagonal(woodX, woodY, AIR, null, function(x1, y1) {
            if (nextGrid[y1][x1][0] != null) {
                return;
            }
            branchCooldown -= 1;
            if (branchCooldown <= 0 && abs(targetDirection[0] - x1 + woodX) + abs(targetDirection[1] - y1 + woodY) <= branchAngle && getRandom() < branchChance) {
                generateTree(woodX, woodY, [x1 - woodX, y1 - woodY], ceil(length / 4), stemPixel, leafPixel, turnChance, 0, 0, 0, ceil(leafDistance / 4), leafFunction);
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
                if (getRandom() < 0.5) {
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
    for (var i = Math.max(-ceil(sqrt(leafDistance)), -woodX); i <= Math.min(ceil(sqrt(leafDistance)), gridSize - woodX - 1); i++) {
        for (var j = Math.max(-ceil(sqrt(leafDistance)), -woodY); j <= Math.min(ceil(sqrt(leafDistance)), gridSize - woodY - 1); j++) {
            var distance = pow(i, 2) + pow(j, 2);
            if (distance <= leafDistance && leafFunction(distance)) {
                if (grid[woodY + j][woodX + i][0] == AIR) {
                    changePixel(woodX + i, woodY + j, leafPixel, null);
                }
            }
        }
    }
};

var setPixel = function(x, y, pixel, effect) {
    if (pixel != null) {
        grid[y][x][0] = pixel;
        redrawGrid[y][x][0] = true;
    }
    if (effect != null) {
        grid[y][x][1] = effect;
        redrawGrid[y][x][1] = true;
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
    var moveablePositions = [];
    for (var i in positions) {
        if (x + positions[i].x >= 0 && x + positions[i].x < gridSize && y + positions[i].y >= 0 && y + positions[i].y < gridSize) {
            if (nextGrid[y + positions[i].y][x + positions[i].x][layer] == null) {
                moveablePositions.push(positions[i]);
            }
        }
    }
    if (moveablePositions.length > 0) {
        var move = moveablePositions[Math.floor(getRandom() * moveablePositions.length)];
        if (pixels[grid[y + move.y][x + move.x][0]].whenPushed > 0) {
            if (layer == 0) {
                nextGrid[y][x] = [AIR, AIR];
            }
            else {
                nextGrid[y][x][1] = AIR;
            }
            if (pixels[grid[y + move.y][x + move.x][0]].whenPushed == 1) {
                nextGrid[y + move.y][x + move.x] = [AIR, AIR];
            }
            return true;
        }
        if (layer == 0) {
            nextGrid[y + move.y][x + move.x][0] = grid[y][x][0];
            nextGrid[y][x][0] = grid[y + move.y][x + move.x][0];
        }
        if (grid[y][x][1] != AIR) {
            nextGrid[y + move.y][x + move.x][1] = grid[y][x][1];
            nextGrid[y][x][1] = grid[y + move.y][x + move.x][1];
        }
        return true;
    }
    return false;
};
var fall = function(x, y, layer) {
    if (nextGrid[y][x][layer] != null) {
        return false;
    }
    if (layer == 0 && grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
        return false;
    }
    if (y + 1 == gridSize) {
        return false;
    }
    if (pixels[grid[y + 1][x][layer]].density < pixels[grid[y][x][layer]].density) {
        return move(x, y, [{ x: 0, y: 1 }], layer);
    }
    return false;
};
var flow = function(x, y, distance, layer) {
    if (nextGrid[y][x][layer] != null) {
        return false;
    }
    if (layer == 0 && grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
        return false;
    }
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
                }
            }
        }
    }
    return move(x, y, positions, layer);
};
var rise = function(x, y, layer) {
    if (nextGrid[y][x][layer] != null) {
        return false;
    }
    if (layer == 0 && grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
        return false;
    }
    if (y == 0) {
        return false;
    }
    if (pixels[grid[y - 1][x][layer]].density <= 0) {
        return move(x, y, [{ x: 0, y: -1 }], layer);
    }
    return false;
};
var ascend = function(x, y, distance, layer) {
    if (nextGrid[y][x][layer] != null) {
        return false;
    }
    if (layer == 0 && grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
        return false;
    }
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
                }
            }
        }
    }
    return move(x, y, positions, layer);
};

var push = function(x, y, direction, distance) {
    if (direction == "left") {
        var collapsableIndex = 0;
        for (var i = 1; i <= distance; i++) {
            if (x - i == -1) {
                break;
            }
            if (pixels[grid[y][x - i][0]].whenPushed > 0) {
                for (var j = i - 1; j >= 2; j--) {
                    setPixel(x - j, y, grid[y][x - j + 1][0], grid[y][x - j + 1][1]);
                }
                setPixel(x - 1, y, AIR, AIR);
                if (pixels[grid[y][x - i][0]].whenPushed == 1) {
                    setPixel(x - i, y, AIR, AIR);
                }
                return true;
            }
            if (pixels[grid[y][x - i][0]].whenPushed == -1) {
                collapsableIndex = i;
                continue;
            }
            if (!pixels[grid[y][x - i][0]].pushable || grid[y][x - i][0] == SLIDER_VERTICAL) {
                break;
            }
            if (grid[y][x - i][0] == AIR) {
                for (var j = i; j >= 2; j--) {
                    setPixel(x - j, y, grid[y][x - j + 1][0], grid[y][x - j + 1][1]);
                }
                setPixel(x - 1, y, AIR, AIR);
                return true;
            }
        }
        if (collapsableIndex != 0) {
            for (var j = collapsableIndex; j >= 2; j--) {
                setPixel(x - j, y, grid[y][x - j + 1][0], grid[y][x - j + 1][1]);
            }
            setPixel(x - 1, y, AIR, AIR);
            return true;
        }
        return false;
    }
    else if (direction == "right") {
        var collapsableIndex = 0;
        for (var i = 1; i <= distance; i++) {
            if (x + i == gridSize) {
                break;
            }
            if (pixels[grid[y][x + i][0]].whenPushed > 0) {
                for (var j = i - 1; j >= 2; j--) {
                    setPixel(x + j, y, grid[y][x + j - 1][0], grid[y][x + j - 1][1]);
                }
                setPixel(x + 1, y, AIR, AIR);
                if (pixels[grid[y][x + i][0]].whenPushed == 1) {
                    setPixel(x + i, y, AIR, AIR);
                }
                return true;
            }
            if (pixels[grid[y][x + i][0]].whenPushed == -1) {
                collapsableIndex = i;
                continue;
            }
            if (!pixels[grid[y][x + i][0]].pushable || grid[y][x + i][0] == SLIDER_VERTICAL) {
                break;
            }
            if (grid[y][x + i][0] == AIR) {
                for (var j = i; j >= 2; j--) {
                    setPixel(x + j, y, grid[y][x + j - 1][0], grid[y][x + j - 1][1]);
                }
                setPixel(x + 1, y, AIR, AIR);
                return true;
            }
        }
        if (collapsableIndex != 0) {
            for (var j = collapsableIndex; j >= 2; j--) {
                setPixel(x + j, y, grid[y][x + j - 1][0], grid[y][x + j - 1][1]);
            }
            setPixel(x + 1, y, AIR, AIR);
            return true;
        }
        return false;
    }
    else if (direction == "up") {
        var collapsableIndex = 0;
        for (var i = 1; i <= distance; i++) {
            if (y - i == -1) {
                break;
            }
            if (pixels[grid[y - i][x][0]].whenPushed > 0) {
                for (var j = i - 1; j >= 2; j--) {
                    setPixel(x, y - j, grid[y - j + 1][x][0], grid[y - j + 1][x][1]);
                }
                setPixel(x, y - 1, AIR, AIR);
                if (pixels[grid[y - i][x][0]].whenPushed == 1) {
                    setPixel(x, y - i, AIR, AIR);
                }
                return true;
            }
            if (pixels[grid[y - i][x][0]].whenPushed == -1) {
                collapsableIndex = i;
                continue;
            }
            if (!pixels[grid[y - i][x][0]].pushable || grid[y - i][x][0] == SLIDER_HORIZONTAL) {
                break;
            }
            if (grid[y - i][x][0] == AIR) {
                for (var j = i; j >= 2; j--) {
                    setPixel(x, y - j, grid[y - j + 1][x][0], grid[y - j + 1][x][1]);
                }
                setPixel(x, y - 1, AIR, AIR);
                return true;
            }
        }
        if (collapsableIndex != 0) {
            for (var j = collapsableIndex; j >= 2; j--) {
                setPixel(x, y - j, grid[y - j + 1][x][0], grid[y - j + 1][x][1]);
            }
            setPixel(x, y - 1, AIR, AIR);
            return true;
        }
        return false;
    }
    else if (direction == "down") {
        var collapsableIndex = 0;
        for (var i = 1; i <= distance; i++) {
            if (y + i == gridSize) {
                break;
            }
            if (pixels[grid[y + i][x][0]].whenPushed > 0) {
                for (var j = i - 1; j >= 2; j--) {
                    setPixel(x, y + j, grid[y + j - 1][x][0], grid[y + j - 1][x][1]);
                }
                setPixel(x, y + 1, AIR, AIR);
                if (pixels[grid[y + i][x][0]].whenPushed == 1) {
                    setPixel(x, y + i, AIR, AIR);
                }
                return true;
            }
            if (pixels[grid[y + i][x][0]].whenPushed == -1) {
                collapsableIndex = i;
                continue;
            }
            if (!pixels[grid[y + i][x][0]].pushable || grid[y + i][x][0] == SLIDER_HORIZONTAL) {
                break;
            }
            if (grid[y + i][x][0] == AIR) {
                for (var j = i; j >= 2; j--) {
                    setPixel(x, y + j, grid[y + j - 1][x][0], grid[y + j - 1][x][1]);
                }
                setPixel(x, y + 1, AIR, AIR);
                return true;
            }
        }
        if (collapsableIndex != 0) {
            for (var j = collapsableIndex; j >= 2; j--) {
                setPixel(x, y + j, grid[y + j - 1][x][0], grid[y + j - 1][x][1]);
            }
            setPixel(x, y + 1, AIR, AIR);
            return true;
        }
        return false;
    }
};
var explode = function(x, y, radius, explosionPixel, destroyChance, effectChance) {
    for (var i = Math.max(-radius, -x); i <= Math.min(radius, gridSize - x - 1); i++) {
        for (var j = Math.max(-radius, -y); j <= Math.min(radius, gridSize - y - 1); j++) {
            if (i == 0 && j == 0) {
                setPixel(x, y, AIR, AIR);
                continue;
            }
            var distance = pow(i, 2) + pow(j, 2);
            if (distance <= pow(radius, 2) + 1) {
                if (getRandom() < destroyChance * radius / distance / pixels[grid[y + j][x + i][0]].blastResistance) {
                    setPixel(x + i, y + j, AIR, AIR);
                }
                if (distance <= 2 || getRandom() < effectChance * radius / distance) {
                    if (pixels[explosionPixel].effect) {
                        setPixel(x + i, y + j, null, explosionPixel);
                    }
                    else {
                        setPixel(x + i, y + j, explosionPixel, null);
                    }
                }
            }
        }
    }
}