document.getElementById("menuCanvas").width = window.innerWidth;
document.getElementById("menuCanvas").height = window.innerHeight;
var menuCtx = document.getElementById("menuCanvas").getContext("2d");
menuCtx.fillStyle = "rgb(0, 0, 0)";
menuCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
var menuAnimationTime = 0;
var menuAnimationStage = 0;

var menuPixelSize;
var menuAnimationScale = 1;

var menuCircleSpeed = 40;

var menuPixelCount = 16;
var menuPixels = [];
var index = 0;
for (var i in pixels) {
    if (i == "air") {
        continue;
    }
    menuPixels[index] = i;
    index += 1;
}
var menuPixelX = [];
var menuPixelY = [];
var menuPixelAngle = [];
for (var i = 0; i < menuPixelCount; i++) {
    menuPixelAngle[i] = Math.PI / 2;
}
var menuPixelFinalX;
var menuPixelFinalY;
var setMenuPositions = function() {
    menuPixelSize = Math.ceil(window.innerHeight / 20);
    if (menuScreen) {
        pixelSize = menuPixelSize;
    }
    if (menuAnimationTime == 0 && menuAnimationStage == 0) {
        menuPixelX[0] = window.innerWidth + menuPixelSize;
        menuPixelY[0] = window.innerHeight / 2 - menuPixelSize * 2;
    }
    for (var i = menuAnimationStage + 1; i < menuPixelCount; i++) {
        menuPixelX[i] = window.innerWidth + menuPixelSize;
        menuPixelY[i] = window.innerHeight / 2 - menuPixelSize * 2;
    }
    menuPixelFinalX = window.innerWidth / 2;
    menuPixelFinalY = window.innerHeight / 2 + menuPixelSize * 2;
};

var menuPixelsLerped = 0;
var menuPixelsInPlace = 0;

var menuPixelLerp = function(pixel) {
    if (menuPixelX[pixel] - menuPixelFinalX < 1) {
        menuPixelX[pixel] = menuPixelFinalX;
    }
    if (menuPixelY[pixel] - menuPixelFinalY < 1) {
        menuPixelY[pixel] = menuPixelFinalY;
    }
    if (menuPixelX[pixel] == menuPixelFinalX && menuPixelY[pixel] == menuPixelFinalY) {
        menuPixelsLerped += 1;
    }
    var lerpAmount = menuSpedUp ? 0.08 : 0.04;
    menuPixelX[pixel] = (1 - lerpAmount) * menuPixelX[pixel] + lerpAmount * (menuPixelFinalX - menuPixelSize);
    if (menuPixelX[pixel] < menuPixelFinalX) {
        menuPixelX[pixel] = menuPixelFinalX;
    }
    menuPixelY[pixel] = (1 - lerpAmount) * menuPixelY[pixel] + lerpAmount * menuPixelFinalY;
};
var menuPixelCircle = function(pixel) {
    menuPixelX[pixel] = window.innerWidth / 2 + Math.cos(menuPixelAngle[pixel]) * menuPixelSize * 4 * menuAnimationScale;
    menuPixelY[pixel] = window.innerHeight / 2 + Math.sin(menuPixelAngle[pixel]) * menuPixelSize * 2 * menuAnimationScale;
    if (pixel == 0) {
        menuPixelAngle[pixel] += menuCircleSpeed / menuPixelCount / 180 * Math.PI;
        menuPixelsInPlace += 1;
    }
    else {
        if (Math.abs(menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount - menuPixelAngle[pixel]) < (0.5 + menuSpedUp ? 800 / menuPixelCount : 400 / menuPixelCount) / 180 * Math.PI) {
            menuPixelAngle[pixel] = menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount;
            menuPixelsInPlace += 1;
        }
        else {
            var lerpAmount = menuSpedUp ? 0.2 : 0.1;
            while (menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount - menuPixelAngle[pixel] > 180) {
                menuPixelAngle[pixel] += Math.PI * 2;
            }
            menuPixelAngle[pixel] = Math.max(menuPixelAngle[pixel] + (menuSpedUp ? 2 / menuPixelCount : 1 / menuPixelCount) / 180 * Math.PI, (1 - lerpAmount) * menuPixelAngle[pixel] + lerpAmount * (menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount));
        }
    }
};
var menuPixelDrawAll = function() {
    menuPixelSize = Math.ceil(window.innerHeight / 20) * menuAnimationScale;
    pixelSize = menuPixelSize;
    var startIndex = Math.round(((menuPixelAngle[0] * 180 / Math.PI + 90) % 360) / 360 * menuPixelCount);
    for (var i = 0; i <= Math.floor(menuPixelCount / 2); i++) {
        if ((startIndex + i) % menuPixelCount < menuPixelsLerped) {
            menuPixelDraw((startIndex + i) % menuPixelCount);
        }
        if ((startIndex + i) % menuPixelCount != (startIndex - i + menuPixelCount) % menuPixelCount && (startIndex - i + menuPixelCount) % menuPixelCount < menuPixelsLerped) {
            menuPixelDraw((startIndex - i + menuPixelCount) % menuPixelCount);
        }
    }
    menuPixelSize = Math.ceil(window.innerHeight / 20);
};
var menuPixelDraw = function(i) {
    noiseGrid[(menuPixelY[i] - menuPixelSize / 2) / menuPixelSize] = [];
    animatedNoiseGrid[(menuPixelY[i] - menuPixelSize / 2) / menuPixelSize] = [];
    noiseGrid[(menuPixelY[i] - menuPixelSize / 2) / menuPixelSize][(menuPixelX[i] - menuPixelSize / 2) / menuPixelSize] = 0.5;
    animatedNoiseGrid[(menuPixelY[i] - menuPixelSize / 2) / menuPixelSize][(menuPixelX[i] - menuPixelSize / 2) / menuPixelSize] = 0.5;
    randomGrid[(menuPixelY[i] - menuPixelSize / 2) / menuPixelSize] = [];
    randomGrid[(menuPixelY[i] - menuPixelSize / 2) / menuPixelSize][(menuPixelX[i] - menuPixelSize / 2) / menuPixelSize] = [0.4, 0.1, 0.1, 0.4, 0.7, 0.7, 0.8, 0.1];
    // menuCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
    // menuCtx.fillRect(menuPixelX[i] - menuPixelSize / 2 - 1, menuPixelY[i] - menuPixelSize / 2 - 1, menuPixelSize + 2, menuPixelSize + 2);
    // menuCtx.fillRect(menuPixelX[i] - menuPixelSize / 2 - 2, menuPixelY[i] - menuPixelSize / 2 - 2, menuPixelSize + 4, menuPixelSize + 4);
    pixels[menuPixels[i]].drawBackground((menuPixelX[i] - menuPixelSize / 2) / menuPixelSize, (menuPixelY[i] - menuPixelSize / 2) / menuPixelSize, 1, menuCtx);
    drawPixel(menuPixels[i], (menuPixelX[i] - menuPixelSize / 2) / menuPixelSize, (menuPixelY[i] - menuPixelSize / 2) / menuPixelSize, menuCtx);
};

var showGameScreen = function() {
    document.getElementById("menuTitle").style.transform = "translateY(-75px)";
    document.getElementById("levelsButton").style.transform = "translateX(-53vw)";
    document.getElementById("sandboxButton").style.transform = "translateX(53vw)";
    setTimeout(function() {
        document.getElementById("menuTitle").style.visibility = "hidden";
        document.getElementById("levelsButton").style.visibility = "hidden";
        document.getElementById("sandboxButton").style.visibility = "hidden";
    }, 500);
    menuAnimationStage = 3;
    menuAnimationTime = 0;
};
var showMenuScreen = function() {
    menuScreen = true;
    document.getElementById("menuScreen").style.visibility = "visible";
    document.getElementById("menuScreen").style.opacity = 1;
    document.getElementById("winScreen").style.opacity = 0;
    document.getElementById("winScreen").style.pointerEvents = "none";
    menuAnimationStage = -1;
    setTimeout(function() {
        menuAnimationStage = 5;
        menuAnimationTime = 0;
        inPrompt = false;
        window.requestAnimationFrame(updateMenu);
    }, 500);
};

document.getElementById("sandboxButton").onclick = function() {
    ping();
    sandbox = true;
    document.getElementById("levelDescription").style.display = "none";
    document.getElementById("sandboxTools").style.display = "inline";
    createGrid();
    showGameScreen();
};
document.getElementById("levelsButton").onclick = function() {
    if (menuAnimationStage == 2) {
        ping();
        document.getElementById("levelDescription").style.display = "block";
        document.getElementById("sandboxTools").style.display = "none";
        document.getElementById("levelSelect").style.visibility = "visible";
        document.getElementById("levelSelect").style.transform = "translateY(0px)";
    }
};
document.getElementById("levelSelectCancelButton").onclick = function() {
    document.getElementById("levelSelect").style.transform = "translateY(-85vh)";
    setTimeout(function() {
        if (document.getElementById("levelSelect").style.transform == "translateY(-85vh)") {
            document.getElementById("levelSelect").style.visibility = "hidden";
        }
    }, 500);
};

var loadLevel = function(level) {
    sandbox = false;
    if (menuScreen) {
        menuAnimationStage = 6;
        document.getElementById("levelSelect").style.transform = "translateY(-85vh)";
        setTimeout(function() {
            document.getElementById("levelSelect").style.visibility = "hidden";
            showGameScreen();
        }, 500);
    }
    currentLevel = level;
    clickPixel = "air";
    setPixel();
    loadSaveCode(levels[level].saveCode);
    loadPixelInventory(levels[level].pixelInventory);
    document.getElementById("levelDescriptionName").innerHTML = levels[level].name;
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
            menuAnimationStage += 1;
            menuAnimationTime = 0;
        }
    }
    else if (menuAnimationStage == 1) {
        menuPixelsInPlace = 0;
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll();
        if (menuPixelsInPlace == menuPixelCount) {
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
    else if (menuAnimationStage == 2) {
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll();
    }
    else if (menuAnimationStage == 3) {
        menuAnimationScale = 1 - menuAnimationTime / 30;
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll();
        if (menuAnimationTime == 30) {
            menuAnimationStage += 1;
            menuAnimationTime = 0;
            menuAnimationScale = 1;
        }
    }
    else if (menuAnimationStage == 4) {
        document.getElementById("menuScreen").style.opacity = 0;
        setTimeout(function() {
            document.getElementById("menuScreen").style.visibility = "hidden";
        }, 500);
        document.getElementById("gameScreen").style.display = "inline";
        if (menuScreen) {
            menuScreen = false;
            resetGrid();
            window.requestAnimationFrame(update);
        }
    }
    else if (menuAnimationStage == 5) {
        menuAnimationScale = menuAnimationTime / 30;
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll();
        if (menuAnimationTime == 30) {
            document.getElementById("menuTitle").style.visibility = "visible";
            document.getElementById("levelsButton").style.visibility = "visible";
            document.getElementById("sandboxButton").style.visibility = "visible";
            document.getElementById("menuTitle").style.transform = "translateY(20vh)";
            document.getElementById("levelsButton").style.transform = "translateX(-10px)";
            document.getElementById("sandboxButton").style.transform = "translateX(10px)";
            menuAnimationStage = 2;
            menuAnimationTime = 0;
            menuAnimationScale = 1;
        }
    }
    else if (menuAnimationStage == 6) {
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll();
    }
    menuAnimationTime += 1;
    if (menuScreen) {
        window.requestAnimationFrame(updateMenu);
    }
};
window.requestAnimationFrame(updateMenu);
// sandbox = true;
// showGameScreen();