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

var menuPixelCount = 4;
var menuPixels = [];
var index = 0;
for (var i in pixels) {
    if (i == "air") {
        continue;
    }
    menuPixels[index] = i;
    index += 1;
}
menuPixelCount = 16;
// menuAnimationStage = menuPixelCount + 3;
// var menuPixels = ["dirt", "grass", "sand", "water", "lava", "stone", "basalt", "obsidian"];
var menuPixelX = [];
var menuPixelY = [];
var menuPixelAngle = [];
for (var i = 0; i < menuPixelCount; i++) {
    menuPixelAngle[i] = Math.PI / 2
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

var menuCirclesInPlace = 0;
var menuTitleHeight = -50;

var menuPixelLerp = function(pixel) {
    if (menuPixelX[pixel] - menuPixelFinalX < menuPixelSize) {
        // menuPixelX[pixel] -= Math.min(menuPixelSize / 30, menuPixelX[pixel] - menuPixelFinalX);
        if (menuPixelX[pixel] - menuPixelFinalX < 1) {
            menuPixelX[pixel] = menuPixelFinalX;
        }
    }
    // else {
    // }
    if (menuPixelY[pixel] - menuPixelFinalY < menuPixelSize) {
        // menuPixelY[pixel] -= Math.min(menuPixelSize / 30, menuPixelY[pixel] - menuPixelFinalY);
        if (menuPixelY[pixel] - menuPixelFinalY < 1) {
            menuPixelY[pixel] = menuPixelFinalY;
        }
    }
    if (menuPixelX[pixel] == menuPixelFinalX && menuPixelY[pixel] == menuPixelFinalY) {
        menuAnimationStage += 1;
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
        menuCirclesInPlace += 1;
    }
    else {
        if (Math.abs(menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount - menuPixelAngle[pixel]) < (0.5 + menuSpedUp ? 800 / menuPixelCount : 400 / menuPixelCount) / 180 * Math.PI) {
            menuPixelAngle[pixel] = menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount;
            menuCirclesInPlace += 1;
        }
        else {
            var lerpAmount = menuSpedUp ? 0.2 : 0.1;
            while (menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount - menuPixelAngle[pixel] > 180) {
                menuPixelAngle[pixel] += Math.PI * 2;
            }
            // menuPixelAngle[pixel] += 1.5 / 180 * Math.PI
            menuPixelAngle[pixel] = Math.max(menuPixelAngle[pixel] + (menuSpedUp ? 2 / menuPixelCount : 1 / menuPixelCount) / 180 * Math.PI, (1 - lerpAmount) * menuPixelAngle[pixel] + lerpAmount * (menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount));
        }
    }
};
var menuPixelDrawAll = function(width) {
    menuPixelSize = Math.ceil(window.innerHeight / 20) * menuAnimationScale;
    pixelSize = menuPixelSize;
    var startIndex = Math.round(((menuPixelAngle[0] * 180 / Math.PI + 90) % 360) / 360 * menuPixelCount);
    for (var i = 0; i <= Math.floor(menuPixelCount / 2); i++) {
        if ((startIndex + i) % menuPixelCount < menuAnimationStage) {
            if (i >= menuPixelCount / 4 && width != -1) {
                menuPixelDrawLine((startIndex + i) % menuPixelCount);
            }
            menuPixelDraw((startIndex + i) % menuPixelCount);
            if (i < menuPixelCount / 4 && width != -1) {
                menuPixelDrawLine((startIndex + i) % menuPixelCount);
            }
        }
        if ((startIndex + i) % menuPixelCount != (startIndex - i + menuPixelCount) % menuPixelCount && (startIndex - i + menuPixelCount) % menuPixelCount < menuAnimationStage) {
            if (i >= menuPixelCount / 4 && width != -1) {
                menuPixelDrawLine((startIndex - i + menuPixelCount) % menuPixelCount);
            }
            menuPixelDraw((startIndex - i + menuPixelCount) % menuPixelCount);
            if (i < menuPixelCount / 4 && width != -1) {
                menuPixelDrawLine((startIndex - i + menuPixelCount) % menuPixelCount);
            }
        }
    }
    if (width > 0) {
        menuCtx.lineWidth = Math.ceil(width * menuPixelSize / 5);
        menuCtx.beginPath();
        menuCtx.moveTo(window.innerWidth / 2, window.innerHeight / 2);
        menuCtx.lineTo(window.innerWidth / 2, 0);
        menuCtx.stroke();
        menuCtx.closePath();
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
var menuPixelDrawLine = function(i, width) {
    menuCtx.strokeStyle = "rgb(255, 255, 255)";
    menuCtx.lineWidth = Math.floor(menuPixelSize / 5);
    menuCtx.beginPath();
    menuCtx.moveTo(menuPixelX[i], menuPixelY[i]);
    menuCtx.lineTo(window.innerWidth / 2, window.innerHeight / 2);
    menuCtx.stroke();
    menuCtx.closePath();
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
    menuAnimationStage = menuPixelCount + 5;
    menuAnimationTime = 0;
};
var showMenuScreen = function() {
    menuScreen = true;
    document.getElementById("menuScreen").style.visibility = "visible";
    document.getElementById("menuScreen").style.opacity = 1;
    document.getElementById("winScreen").style.opacity = 0;
    document.getElementById("winScreen").style.pointerEvents = "none";
    menuAnimationStage = menuPixelCount + 7;
    setTimeout(function() {
        menuAnimationStage = menuPixelCount + 8;
        menuAnimationTime = 0;
        inPrompt = false;
        window.requestAnimationFrame(updateMenu);
    }, 500);
};

document.getElementById("sandboxButton").onclick = function() {
    sandbox = true;
    document.getElementById("levelDescription").style.display = "none";
    document.getElementById("sandboxTools").style.display = "inline";
    createGrid();
    showGameScreen();
};
document.getElementById("levelsButton").onclick = function() {
    if (menuAnimationStage == menuPixelCount + 4) {
        document.getElementById("levelDescription").style.display = "block";
        document.getElementById("sandboxTools").style.display = "none";
        document.getElementById("levelSelect").style.visibility = "visible";
        document.getElementById("levelSelect").style.transform = "translateY(0px)";
    }
    // showGameScreen();
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
        menuAnimationStage = menuPixelCount + 9;
        document.getElementById("levelSelect").style.transform = "translateY(-85vh)";
        setTimeout(function() {
            document.getElementById("levelSelect").style.visibility = "hidden";
            showGameScreen();
        }, 500);
    }
    currentLevel = level;
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
            if (i < menuCirclesInPlace) {
                menuPixelCircle(i);
            }
            // else if (menuAnimationTime >= i * 360 / (menuSpedUp ? 8 : 4)) {
            //     menuPixelLerp(i);
            // }
        }
        menuPixelDrawAll(-1);
        for (var i = menuCirclesInPlace; i < menuPixelCount; i++) {
            if (menuAnimationTime >= i * 360 / menuCircleSpeed) {
                menuPixelLerp(i);
                menuPixelDraw(i);
            }
        }
    }
    else if (menuAnimationStage == 1) {
        menuCirclesInPlace = 0;
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll(-1);
        if (menuCirclesInPlace == menuPixelCount) {
            document.getElementById("menuTitle").style.visibility = "visible";
            document.getElementById("levelsButton").style.visibility = "visible";
            document.getElementById("sandboxButton").style.visibility = "visible";
            document.getElementById("menuTitle").style.transform = "translateY(20vh)";
            document.getElementById("levelsButton").style.transform = "translateX(-10px)";
            document.getElementById("sandboxButton").style.transform = "translateX(10px)";
            menuAnimationStage += 4;
            menuAnimationTime = 0;
            menuCircleSpeed = 10;
        }
    }
    else if (menuAnimationStage == menuPixelCount + 1) {
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll(0);
        if (menuAnimationTime > (menuSpedUp ? 30 : 60)) {
            menuAnimationStage += 1;
            menuAnimationTime = 0;
        }
    }
    else if (menuAnimationStage == menuPixelCount + 2) {
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll(menuAnimationTime / (menuSpedUp ? 30 : 60));
        // menuPixelDrawLines(menuAnimationTime / (menuSpedUp ? 30 : 60));
        if (menuAnimationTime > (menuSpedUp ? 60 : 120)) {
            menuAnimationStage += 1;
            menuAnimationTime = 0;
        }
    }
    else if (menuAnimationStage == menuPixelCount + 3) {
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll(0);
        // menuPixelDrawLines(0);
        if (menuAnimationTime < 60) {
            menuCtx.fillStyle = `rgba(255, 255, 255, ${1 - menuAnimationTime / 60})`;
            menuCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
        }
        else {
            document.getElementById("menuTitle").style.visibility = "visible";
            document.getElementById("levelsButton").style.visibility = "visible";
            document.getElementById("sandboxButton").style.visibility = "visible";
            document.getElementById("menuTitle").style.transform = "translateY(20vh)";
            document.getElementById("levelsButton").style.transform = "translateX(-10px)";
            document.getElementById("sandboxButton").style.transform = "translateX(10px)";
            menuAnimationStage += 1;
            menuAnimationTime = 0;
        }
    }
    else if (menuAnimationStage == menuPixelCount + 4) {
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll(0);
        // menuPixelDrawLines(0);
    }
    else if (menuAnimationStage == menuPixelCount + 5) {
        menuAnimationScale = 1 - menuAnimationTime / 30;
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll(0);
        if (menuAnimationTime == 30) {
            menuAnimationStage += 1;
            menuAnimationTime = 0;
            menuAnimationScale = 1;
        }
    }
    else if (menuAnimationStage == menuPixelCount + 6) {
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
    else if (menuAnimationStage == menuPixelCount + 8) {
        menuAnimationScale = menuAnimationTime / 30;
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll(0);
        if (menuAnimationTime == 30) {
            document.getElementById("menuTitle").style.visibility = "visible";
            document.getElementById("levelsButton").style.visibility = "visible";
            document.getElementById("sandboxButton").style.visibility = "visible";
            document.getElementById("menuTitle").style.transform = "translateY(20vh)";
            document.getElementById("levelsButton").style.transform = "translateX(-10px)";
            document.getElementById("sandboxButton").style.transform = "translateX(10px)";
            menuAnimationStage = menuPixelCount + 4;
            menuAnimationTime = 0;
            menuAnimationScale = 1;
        }
    }
    else if (menuAnimationStage == menuPixelCount + 9) {
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll(0);
    }
    menuAnimationTime += 1;
    if (menuScreen) {
        window.requestAnimationFrame(updateMenu);
    }
};
window.requestAnimationFrame(updateMenu);
// sandbox = true;
// showGameScreen();