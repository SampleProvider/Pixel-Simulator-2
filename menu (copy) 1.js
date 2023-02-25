document.getElementById("menuCanvas").width = window.innerWidth;
document.getElementById("menuCanvas").height = window.innerHeight;
var menuCtx = document.getElementById("menuCanvas").getContext("2d");
menuCtx.fillStyle = "rgb(0, 0, 0)";
menuCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
var menuAnimationStage = 0;
var menuAnimationTime = 0;

var menuPixelSize;
var menuAnimationScale = 1;

var menuCircleSpeed = 40;

var menuPixelCount = 16;
var menuPixels = [];
var index = 0;
for (var i in pixels) {
    if (i == "air" || pixels[i].hidden) {
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
var menuPixelsInPlace = 0;

var menuPixelLerp = function(pixel) {
    var lerpAmount = menuSpedUp ? 0.08 : 0.04;
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
};
var menuPixelCircle = function(pixel) {
    menuPixelX[pixel] = 1 / 2 + Math.cos(menuPixelAngle[pixel]) * menuAnimationScale / 10;
    menuPixelY[pixel] = 1 / 2 + Math.sin(menuPixelAngle[pixel]) * menuAnimationScale / 10;
    if (pixel == 0) {
        menuPixelAngle[pixel] += menuCircleSpeed / menuPixelCount / 180 * Math.PI;
        menuPixelsInPlace += 1;
    }
    else {
        menuPixelAngle[pixel] = menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount;
        menuPixelsInPlace += 1;
        // if (Math.abs(menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount - menuPixelAngle[pixel]) < (0.5 + menuSpedUp ? 800 / menuPixelCount : 400 / menuPixelCount) / 180 * Math.PI) {
        // }
        // else {
        //     var lerpAmount = menuSpedUp ? 0.2 : 0.1;
        //     while (menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount - menuPixelAngle[pixel] > 180) {
        //         menuPixelAngle[pixel] += Math.PI * 2;
        //     }
        //     menuPixelAngle[pixel] = Math.max(menuPixelAngle[pixel] + (menuSpedUp ? 2 / menuPixelCount : 1 / menuPixelCount) / 180 * Math.PI, (1 - lerpAmount) * menuPixelAngle[pixel] + lerpAmount * (menuPixelAngle[0] - pixel * Math.PI * 2 / menuPixelCount));
        // }
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
    noiseGrid[(menuPixelY[i] * window.innerHeight - menuPixelSize / 2) / menuPixelSize] = [];
    animatedNoiseGrid[(menuPixelY[i] * window.innerHeight - menuPixelSize / 2) / menuPixelSize] = [];
    noiseGrid[(menuPixelY[i] * window.innerHeight - menuPixelSize / 2) / menuPixelSize][(menuPixelX[i] * window.innerWidth - menuPixelSize / 2) / menuPixelSize] = 0.5;
    animatedNoiseGrid[(menuPixelY[i] * window.innerHeight - menuPixelSize / 2) / menuPixelSize][(menuPixelX[i] * window.innerWidth - menuPixelSize / 2) / menuPixelSize] = 0.5;
    randomGrid[(menuPixelY[i] * window.innerHeight - menuPixelSize / 2) / menuPixelSize] = [];
    randomGrid[(menuPixelY[i] * window.innerHeight - menuPixelSize / 2) / menuPixelSize][(menuPixelX[i] * window.innerWidth - menuPixelSize / 2) / menuPixelSize] = [0.4, 0.1, 0.1, 0.4, 0.7, 0.7, 0.8, 0.1];
    pixels[menuPixels[i]].drawBackground((menuPixelX[i] * window.innerWidth - menuPixelSize / 2) / menuPixelSize, (menuPixelY[i] * window.innerHeight - menuPixelSize / 2) / menuPixelSize, 1, menuCtx);
    drawPixel(menuPixels[i], (menuPixelX[i] * window.innerWidth - menuPixelSize / 2) / menuPixelSize, (menuPixelY[i] * window.innerHeight - menuPixelSize / 2) / menuPixelSize, menuCtx);
};

var menuTransition = true;
var inLevelSelect = false;

var showGameScreen = function() {
    menuTransition = true;
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
    menuTransition = true;
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
    if (inLevelSelect || menuTransition) {
        return;
    }
    ping();
    sandbox = true;
    document.getElementById("levelDescription").style.display = "none";
    document.getElementById("setInitialButton").style.display = "inline-block";
    document.getElementById("sandboxTools").style.display = "inline";
    clickPixel = "air";
    setPixel();
    createGrid();
    showGameScreen();
};
document.getElementById("levelsButton").onclick = function() {
    if (!menuTransition) {
        ping();
        document.getElementById("levelDescription").style.display = "block";
        document.getElementById("setInitialButton").style.display = "none";
        document.getElementById("sandboxTools").style.display = "none";
        document.getElementById("levelSelect").style.visibility = "visible";
        document.getElementById("levelSelect").style.transform = "translateY(0px)";
        inLevelSelect = true;
    }
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
    sandbox = false;
    if (inLevelSelect) {
        menuAnimationStage = 6;
        document.getElementById("levelSelect").style.transform = "translateY(-85vh)";
        setTimeout(function() {
            document.getElementById("levelSelect").style.visibility = "hidden";
            showGameScreen();
            inLevelSelect = false;
        }, 500);
    }
    else {
        
    }
    currentLevel = level;
    clickPixel = "air";
    setPixel();
    loadSaveCode(levels[level].saveCode);
    loadPixelInventory(levels[level].pixelInventory);
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
            menuAnimationStage += 1;
            menuAnimationTime = 0;
        }
        menuTransition = true;
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
        menuTransition = true;
    }
    else if (menuAnimationStage == 2) {
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll();
        menuTransition = false;
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
        menuTransition = true;
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
            menuTransition = false;
        }
        else {
            menuTransition = true;
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
        menuTransition = true;
    }
    else if (menuAnimationStage == 6) {
        for (var i = 0; i < menuPixelCount; i++) {
            menuPixelCircle(i);
        }
        menuPixelDrawAll();
        menuTransition = true;
    }
    menuAnimationTime += 1;
    if (menuScreen) {
        window.requestAnimationFrame(updateMenu);
    }
};
window.requestAnimationFrame(updateMenu);