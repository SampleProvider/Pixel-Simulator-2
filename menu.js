document.getElementById("menuCanvas").width = window.innerWidth;
document.getElementById("menuCanvas").height = window.innerHeight;
var menuCtx = document.getElementById("menuCanvas").getContext("2d");
menuCtx.imageSmoothingEnabled = false;
menuCtx.webkitImageSmoothingEnabled = false;
menuCtx.fillStyle = "rgb(0, 0, 0)";
menuCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
var menuAnimationStage = 0;
var menuAnimationTime = 0;
var menuPixelTime = 0;

var menuPixelSize = Math.ceil(window.innerHeight / 120) * 6;

var menuCircleSpeed = 40;

var menuPixelCount = 16;
var menuPixels = [];
var index = 0;
for (var i in pixels) {
    if (i == 0 || pixels[i].hidden) {
        continue;
    }
    menuPixels[index] = i;
    index += 1;
}
var menuPixelStartX = 5 / 4;
var menuPixelStartY = 2 / 5;
var menuPixelX = [];
var menuPixelY = [];
for (var i = 0; i < menuPixelCount; i++) {
    menuPixelX[i] = menuPixelStartX;
    menuPixelY[i] = menuPixelStartY;
}
var menuPixelAngle = [];
for (var i = 0; i < menuPixelCount; i++) {
    menuPixelAngle[i] = Math.PI / 2;
}
menuPixelFinalX = 1 / 2;
menuPixelFinalY = 3 / 5;

var menuPixelsLerped = 0;

var menuPixelLerp = function(pixel) {
    var lerpAmount = 0.04;
    if (menuSpedUp) {
        for (var i = 0; i < 4; i++) {
            menuPixelX[pixel] = (1 - lerpAmount) * menuPixelX[pixel] + lerpAmount * (menuPixelStartX - (menuPixelStartX - menuPixelFinalX) * 11 / 10);
            menuPixelY[pixel] = (1 - lerpAmount) * menuPixelY[pixel] + lerpAmount * (menuPixelStartY - (menuPixelStartY - menuPixelFinalY) * 11 / 10);
            if (menuPixelX[pixel] < menuPixelFinalX) {
                menuPixelX[pixel] = menuPixelFinalX;
            }
            if (menuPixelY[pixel] > menuPixelFinalY) {
                menuPixelY[pixel] = menuPixelFinalY;
            }
        }
        if (menuPixelX[pixel] == menuPixelFinalX && menuPixelY[pixel] == menuPixelFinalY) {
            menuPixelsLerped += 1;
        }
    }
    else {
        menuPixelX[pixel] = (1 - lerpAmount) * menuPixelX[pixel] + lerpAmount * (menuPixelStartX - (menuPixelStartX - menuPixelFinalX) * 11 / 10);
        menuPixelY[pixel] = (1 - lerpAmount) * menuPixelY[pixel] + lerpAmount * (menuPixelStartY - (menuPixelStartY - menuPixelFinalY) * 11 / 10);
        if (menuPixelX[pixel] < menuPixelFinalX) {
            menuPixelX[pixel] = menuPixelFinalX;
        }
        if (menuPixelY[pixel] > menuPixelFinalY) {
            menuPixelY[pixel] = menuPixelFinalY;
        }
        if (menuPixelX[pixel] == menuPixelFinalX && menuPixelY[pixel] == menuPixelFinalY) {
            menuPixelsLerped += 1;
        }
    }
};
var menuPixelCircle = function(pixel) {
    menuPixelX[pixel] = 1 / 2 + Math.cos(menuPixelAngle[pixel]) / 10;
    menuPixelY[pixel] = 1 / 2 + Math.sin(menuPixelAngle[pixel]) / 10;
    if (pixel == 0) {
        menuPixelAngle[pixel] += menuCircleSpeed / menuPixelCount / 180 * Math.PI;
    }
    else {
        menuPixelAngle[pixel] = menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount;
    }
};
var menuPixelDrawAll = function() {
    menuPixelSize = Math.ceil(window.innerHeight / 120) * 6;
    var startIndex = Math.round(((menuPixelAngle[0] * 180 / Math.PI + 90) % 360) / 360 * menuPixelCount);
    for (var i = 0; i <= Math.floor(menuPixelCount / 2); i++) {
        if ((startIndex + i) % menuPixelCount < menuPixelsLerped) {
            menuPixelDraw((startIndex + i) % menuPixelCount);
        }
        if ((startIndex + i) % menuPixelCount != (startIndex - i + menuPixelCount) % menuPixelCount && (startIndex - i + menuPixelCount) % menuPixelCount < menuPixelsLerped) {
            menuPixelDraw((startIndex - i + menuPixelCount) % menuPixelCount);
        }
    }
};
var menuPixelDraw = function(i) {
    var drawn = false;
    var pixel = menuPixels[i];
    if (pixels[pixel].drawNoise) {
        if (pixels[pixel].animated) {
            menuCtx.fillStyle = colorTint(colors[pixel], 0.375 + sin(menuPixelTime / 2) / 4);
            menuCtx.fillRect(menuPixelX[i] * window.innerWidth - menuPixelSize / 2, menuPixelY[i] * window.innerHeight - menuPixelSize / 2, menuPixelSize, menuPixelSize);
        }
        else {
            menuCtx.fillStyle = colorTint(colors[pixel], 0.375 + sin(menuPixelTime / 4) / 4);
            menuCtx.fillRect(menuPixelX[i] * window.innerWidth - menuPixelSize / 2, menuPixelY[i] * window.innerHeight - menuPixelSize / 2, menuPixelSize, menuPixelSize);
        }
        drawn = true;
    }
    if (pixels[pixel].renderedCanvas) {
        if (pixels[pixel].renderedCanvas.length) {
            menuCtx.drawImage(pixels[pixel].renderedCanvas[menuPixelTime % 60], menuPixelX[i] * window.innerWidth - menuPixelSize / 2, menuPixelY[i] * window.innerHeight - menuPixelSize / 2, menuPixelSize, menuPixelSize);
        }
        else {
            menuCtx.drawImage(pixels[pixel].renderedCanvas, menuPixelX[i] * window.innerWidth - menuPixelSize / 2, menuPixelY[i] * window.innerHeight - menuPixelSize / 2, menuPixelSize, menuPixelSize);
        }
        drawn = true;
    }
    if (pixel == FIRE) {
        menuCtx.fillStyle = colorTint(colors[pixel][2], 0.375 + sin(menuPixelTime / 4) / 4);
        menuCtx.fillRect(menuPixelX[i] * window.innerWidth - menuPixelSize / 2, menuPixelY[i] * window.innerHeight - menuPixelSize / 2, menuPixelSize, menuPixelSize);
        drawn = true;
    }
    if (!drawn) {
        menuCtx.fillStyle = colors[pixel];
        menuCtx.fillRect(menuPixelX[i] * window.innerWidth - menuPixelSize / 2, menuPixelY[i] * window.innerHeight - menuPixelSize / 2, menuPixelSize, menuPixelSize);
    }
    // if (pixels[pixel].drawDetail) {
    //     pixels[pixel].drawDetail(x, y, ctx);
    // }
    // if (pixels[pixel].drawDetail) {
    //     pixels[pixel].drawDetail(x, y, ctx);
    // }
};
renderPixels();

var inLevelSelect = false;

var showGameScreen = async function() {
    await transition();
    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "inline";
    menuScreen = false;
};
var showMenuScreen = async function() {
    await transition();
    document.getElementById("menuScreen").style.display = "inline";
    document.getElementById("gameScreen").style.display = "none";
    hideWinScreen();
    menuScreen = true;
};

document.getElementById("sandboxButton").onclick = async function() {
    if (inLevelSelect || menuAnimationStage == 0) {
        return;
    }
    click();
    await showGameScreen();
    sandbox = true;
    var levelTools = document.getElementsByClassName("levelTool");
    for (var i = 0; i < levelTools.length; i++) {
        levelTools[i].style.display = "none";
    }
    var sandboxTools = document.getElementsByClassName("sandboxTool");
    for (var i = 0; i < sandboxTools.length; i++) {
        sandboxTools[i].style.display = "inline-block";
    }
    clickPixel = 0;
    setClickPixel();
    gridSize = 100;
    createGrid();
    fetchGrid();
    resetGrid();
};
document.getElementById("levelsButton").onclick = function() {
    if (menuAnimationStage == 0) {
        return;
    }
    click();
    document.getElementById("levelSelect").style.visibility = "visible";
    document.getElementById("levelSelect").style.transform = "translateY(0px)";
    inLevelSelect = true;
};
document.getElementById("levelSelectCancelButton").onclick = function() {
    document.getElementById("levelSelect").style.transform = "translateY(-85vh)";
    setTimeout(function() {
        if (document.getElementById("levelSelect").style.transform == "translateY(-85vh)") {
            document.getElementById("levelSelect").style.visibility = "hidden";
        }
        inLevelSelect = false;
    }, 500);
};

var loadLevel = async function(level) {
    if (inLevelSelect) {
        var levelTools = document.getElementsByClassName("levelTool");
        for (var i = 0; i < levelTools.length; i++) {
            levelTools[i].style.display = "inline-block";
        }
        var sandboxTools = document.getElementsByClassName("sandboxTool");
        for (var i = 0; i < sandboxTools.length; i++) {
            sandboxTools[i].style.display = "none";
        }
        document.getElementById("levelSelect").style.transform = "translateY(-85vh)";
        await showGameScreen();
        document.getElementById("levelSelect").style.visibility = "hidden";
        inLevelSelect = false;
    }
    else {
        await transition();
    }
    currentLevel = level;
    clickPixel = 0;
    setClickPixel();
    sandbox = true;
    loadSaveCode(levels[level].saveCode);
    sandbox = false;
    loadPixelInventory(levels[level].pixelInventory);
    fetchGrid();
    resetGrid();
    document.getElementById("levelDescriptionName").innerHTML = level + ": " + levels[level].name;
    document.getElementById("levelDescriptionText").innerHTML = levels[level].description;
    document.getElementById("sidebar").scrollTop = 0;
};

var updateMenu = function() {
    menuCtx.fillStyle = "rgb(0, 0, 0)";
    menuCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    if (menuAnimationStage == 0) {
        for (var i = 0; i < menuPixelCount; i++) {
            if (i < menuPixelsLerped) {
                menuPixelCircle(i);
            }
        }
        menuPixelDrawAll();
        for (var i = menuPixelsLerped; i < menuPixelCount; i++) {
            if (menuAnimationTime >= i * 360 / menuCircleSpeed) {
                menuPixelLerp(i);
                menuPixelDraw(i);
            }
        }
        if (menuPixelsLerped == menuPixelCount) {
            document.getElementById("menuTitle").style.visibility = "visible";
            document.getElementById("levelsButton").style.visibility = "visible";
            document.getElementById("sandboxButton").style.visibility = "visible";
            document.getElementById("menuTitle").style.transform = "translateY(20vh)";
            document.getElementById("levelsButton").style.transform = "translateX(-10px)";
            document.getElementById("sandboxButton").style.transform = "translateX(10px)";
            menuAnimationStage += 1;
            menuAnimationTime = 0;
            menuCircleSpeed /= 4;
        }
    }
    else if (menuAnimationStage == 1) {
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll();
    }
    menuAnimationTime += 1;
    menuPixelTime += Math.PI / 60;
};
window.requestAnimationFrame(update);