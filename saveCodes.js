var saveCodes = {};

var loadSaveCode = function(saveCode) {
    try {
        var x = 0;
        var y = 0;
        var incrementPosition = function() {
            x += 1;
            if (x == gridSize) {
                x = 0;
                y += 1;
            }
            if (y == gridSize) {
                layer += 1;
                x = 0;
                y = 0;
            }
        };
        var index = 0;
        var pixel = -1;
        var placeableState = false;
        if (!sandbox) {
            var level = false;
        }
        var layer = 0;
        for (var i = 0; i < saveCode.length; i++) {
            if (saveCode[i] == ":") {
                if (pixel == -1 && layer != 2) {
                    pixel = eval(saveCode.substring(index, i));
                    if (!sandbox && placeableGrid[y][x] && (pixel == AIR || pixelInventory[pixel] > 0)) {
                        grid[y][x][layer] = pixel;
                        pixelInventory[pixel] -= 1;
                    }
                    else if (sandbox) {
                        grid[y][x][layer] = pixel;
                    }
                    incrementPosition();
                    pixel = -1;
                    index = i + 1;
                }
                else {
                    for (var j = 0; j < parseInt(saveCode.substring(index, i), 36); j++) {
                        if (layer == 2) {
                            placeableGrid[y][x] = placeableState;
                        }
                        else {
                            if (!sandbox && placeableGrid[y][x] && (pixel == AIR || pixelInventory[pixel] > 0)) {
                                grid[y][x][layer] = pixel;
                                pixelInventory[pixel] -= 1;
                            }
                            else if (sandbox) {
                                grid[y][x][layer] = pixel;
                            }
                        }
                        incrementPosition();
                    }
                    if (layer == 2) {
                        placeableState = !placeableState;
                    }
                    pixel = -1;
                    index = i + 1;
                }
            }
            if (saveCode[i] == "-") {
                pixel = eval(saveCode.substring(index, i));
                index = i + 1;
            }
            if (saveCode[i] == ";") {
                if (!sandbox) {
                    if (level) {
                        index = i + 1;
                        continue;
                    }
                    if (saveCode.substring(0, i) != currentLevel) {
                        return;
                    }
                    level = true;
                    loadLevel(saveCode.substring(0, i));
                    index = i + 1;
                    continue;
                }
                if (layer == 2) {
                    placeableState = saveCode.substring(index, i) == "1";
                    index = i + 1;
                    continue;
                }
                if (isNaN(saveCode.substring(index, i))) {
                    index = i + 1;
                    continue;
                }
                gridSize = parseInt(saveCode.substring(index, i), 10);
                createGrid();
                pixel = -1;
                index = i + 1;
            }
            if (!sandbox && layer == 2) {
                break;
            }
        }
        resetGrid();
    }
    catch (error) {
        gridSize = 100;
        createGrid();
        resetGrid();
        promptNotification(`An error has occured while loading the save code. ${error.stack}`);
    }
};
var parseSaveCode = function(saveCode) {
    try {
        var x = 0;
        var y = 0;
        var incrementPosition = function() {
            x += 1;
            if (x == gridSize) {
                x = 0;
                y += 1;
            }
            if (y == gridSize) {
                layer += 1;
                x = 0;
                y = 0;
            }
        };
        var index = 0;
        var string = "";
        var placeableState = false;
        var layer = 0;
        for (var i = 0; i < saveCode.length; i++) {
            if (saveCode[i] == ":") {
                if (string == "" && layer != 2) {
                    string = saveCode.substring(index, i);
                    grid[y][x][layer] = eval(string.toUpperCase());
                    incrementPosition();
                    string = "";
                    index = i + 1;
                }
                else {
                    for (var j = 0; j < parseInt(saveCode.substring(index, i), 10); j++) {
                        if (layer == 2) {
                            placeableGrid[y][x] = placeableState;
                        }
                        else {
                            grid[y][x][layer] = eval(string.toUpperCase());
                        }
                        incrementPosition();
                    }
                    if (layer == 2) {
                        placeableState = !placeableState;
                    }
                    string = "";
                    index = i + 1;
                }
            }
            if (saveCode[i] == "-") {
                string = saveCode.substring(index, i);
                index = i + 1;
            }
            if (saveCode[i] == ";") {
                if (layer == 2) {
                    placeableState = saveCode.substring(index, i) == "1";
                    index = i + 1;
                    continue;
                }
                if (isNaN(saveCode.substring(index, i))) {
                    index = i + 1;
                    continue;
                }
                gridSize = parseInt(saveCode.substring(index, i), 10);
                createGrid();
                string = "";
                index = i + 1;
            }
        }
        resetGrid();
    }
    catch (error) {
        gridSize = 100;
        createGrid();
        resetGrid();
        promptNotification(`An error has occured while parsing the save code. ${error.stack}`);
    }
};
var getPixelName = function(pixel) {
    return pixels[pixel].name.toUpperCase().replaceAll("(", "").replaceAll(")", "").replaceAll(" ", "_")
};
var generateGrid = function(layer) {
    var saveCode = "";
    var pixel = -1;
    var number = 0;
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (grid[i][j][layer] != pixel) {
                if (pixel != -1 && number != 0) {
                    if (number == 1) {
                        saveCode += getPixelName(pixel) + ":";
                    }
                    else {
                        saveCode += getPixelName(pixel) + "-" + number.toString(36) + ":";
                    }
                }
                pixel = grid[i][j][layer];
                number = 0;
            }
            number++;
        }
    }
    if (pixel != -1 && number != 0) {
        if (number == 1) {
            saveCode += getPixelName(pixel) + ":";
        }
        else {
            saveCode += getPixelName(pixel) + "-" + number.toString(36) + ":";
        }
    }
    return saveCode;
}
var generatePlaceableGrid = function() {
    var saveCode = "";
    var pixel = placeableGrid[0][0];
    var number = 0;
    saveCode += (placeableGrid[0][0] ? 1 : 0) + ";";
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (placeableGrid[i][j] != pixel) {
                if (number != 0) {
                    saveCode += number.toString(36) + ":";
                }
                pixel = placeableGrid[i][j];
                number = 0;
            }
            number++;
        }
    }
    if (number != 0) {
        saveCode += number.toString(36) + ":";
    }
    return saveCode;
}
var generateSaveCode = function() {
    var saveCode = "";
    var pixel = -1;
    var number = 0;
    if (!sandbox) {
        saveCode += currentLevel + ";";
    }
    saveCode += gridSize + ";";
    saveCode += generateGrid(0);
    saveCode += generateGrid(1);
    saveCode += generatePlaceableGrid();
    return saveCode;
};
var loadPixelInventory = function(newPixelInventory) {
    for (var i = 0; i < pixels.length; i++) {
        if (i == PLACEABLE || i == NOT_PLACEABLE) {
            pixelInventory[i] = (newPixelInventory[i] ? newPixelInventory[i] : -1);
            continue;
        }
        pixelInventory[i] = (newPixelInventory[i] ? newPixelInventory[i] : 0) + (newPixelInventory.all ? newPixelInventory.all : 0);
        if (i == AIR) {
            pixelInventory[i] = 0;
        }
        else if (pixelInventory[i] == 0) {
            pixelInventory[i] = -1;
        }
    }
    updateDisabled();
};