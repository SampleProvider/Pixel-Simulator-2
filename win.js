// document.getElementById("winCanvas").width = window.innerWidth;
// document.getElementById("winCanvas").height = window.innerHeight;
// var winCtx = document.getElementById("winCanvas").getContext("2d");
// winCtx.fillStyle = "rgb(0, 0, 0)";
// winCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
// var winParticles = [];
// var winFireworks = [];
// var winOpacity = 0;
// var winTime = 0;
var showWinScreen = function() {
    inTransition = true;
    var newLevel = currentLevel.substring(0, 2) + (parseInt(currentLevel.substring(2), 10) + 1);
    if (levels[newLevel] != null) {
        document.getElementById("winNextLevel").style.display = "inline-block";
    }
    else {
        document.getElementById("winNextLevel").style.display = "none";
    }
    document.getElementById("winScreen").style.opacity = 1;
    document.getElementById("winScreen").style.pointerEvents = "all";
    if (simulating) {
        updateNoiseGrid();
        drawGrid(function() { return true });
    }
    ctx.drawImage(offscreenCanvas, cameraX, cameraY, 600, 600, 0, 0, 600, 600);
    ctx.drawImage(offscreenEffectCanvas, cameraX, cameraY, 600, 600, 0, 0, 600, 600);
    ctx.drawImage(offscreenPlaceableCanvas, cameraX, cameraY, 600, 600, 0, 0, 600, 600);
    winMusic.currentTime = 0;
    winMusic.play();
    // winOpacity = 1;
    // updateWin();
};
var hideWinScreen = function() {
    inTransition = false;
    document.getElementById("winScreen").style.opacity = 0;
    document.getElementById("winScreen").style.pointerEvents = "none";
}
// var updateWin = function() {
//     if (winTime % 50 == 0) {
//         // for (var i = 0; i < 10; i++) {
//         var color = Math.floor(getRandom() * 150);
//         var r = 0;
//         var g = 0;
//         var b = 0;
//         if (color < 50) {
//             r = 250 - color * 5;
//             g = color * 5;
//         }
//         else if (color < 100) {
//             g = 250 - (color - 50) * 5;
//             b = (color - 50) * 5;
//         }
//         else {
//             b = 250 - (color - 100) * 5;
//             r = (color - 100) * 5;
//         }
//         // winFireworks.push({x: getRandom(), y: 1, speedX: (getRandom() - 0.5) / 100, speedY: -getRandom() / 100 - 0.05, rotation: getRandom() * 2 * Math.PI, speedRotation: getRandom(), r: r, g: g, b: b});
//         winFireworks.push({ x: getRandom(), y: 1, targetY: getRandom() * 0.75 + 0.1, trail: [], r: r, g: g, b: b });
//         // }
//     }
//     winCtx.fillStyle = "rgba(255, 255, 255, 0.3)";
//     winCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
//     winCtx.fillStyle = `rgba(255, 255, 255, ${winOpacity})`;
//     for (var i = 0; i < winFireworks.length; i++) {
//         winCtx.fillStyle = `rgba(${winFireworks[i].r}, ${winFireworks[i].g}, ${winFireworks[i].b}, ${winOpacity})`;
//         if (winFireworks[i].y > winFireworks[i].targetY) {
//             winFireworks[i].trail.push(winFireworks[i].y);
//         }
//         for (var j in winFireworks[i].trail) {
//             if (j == 20) {
//                 winFireworks[i].trail.shift(1);
//                 break;
//             }
//             winCtx.beginPath();
//             winCtx.arc(winFireworks[i].x * window.innerWidth, winFireworks[i].trail[j] * window.innerHeight, (j) / 2000 * window.innerWidth, 0, 2 * Math.PI);
//             winCtx.fill();
//             // winCtx.fillRect(winParticles[i].x * window.innerWidth - window.innerHeight / 40, winParticles[i].y * window.innerHeight - window.innerHeight / 40, window.innerHeight / 20, window.innerHeight / 20);
//         }
//         if (winFireworks[i].y <= winFireworks[i].targetY) {
//             if (winFireworks[i].targetY != 1) {
//                 for (var j = 0; j < 10; j++) {
//                     // winFireworks.push({x: getRandom(), y: 1, speedX: (getRandom() - 0.5) / 100, speedY: -getRandom() / 100 - 0.05, rotation: getRandom() * 2 * Math.PI, speedRotation: getRandom(), r: r, g: g, b: b});
//                     winParticles.push({ x: winFireworks[i].x, y: winFireworks[i].y, speedX: (getRandom() - 0.5) / 100, speedY: -getRandom() / 100 - 0.01, radius: 1 / 100, trail: [], r: winFireworks[i].r, g: winFireworks[i].g, b: winFireworks[i].b });
//                 }
//             }
//             winFireworks[i].targetY = 1;
//             winFireworks[i].trail.shift(1);
//             if (winFireworks[i].trail.length == 0) {
//                 winFireworks.splice(i, 1);
//                 i -= 1;
//                 continue;
//             }
//         }
//         else {
//             winFireworks[i].y -= 0.02;
//         }
//     }
//     for (var i = 0; i < winParticles.length; i++) {
//         if (winParticles[i].y > 1.025) {
//             winParticles.splice(i, 1);
//             i -= 1;
//             continue;
//         }
//         winParticles[i].trail.push([winParticles[i].x, winParticles[i].y]);
//         for (var j in winParticles[i].trail) {
//             if (j == 20) {
//                 winParticles[i].trail.shift(1);
//                 break;
//             }
//             winCtx.fillStyle = `rgba(${winParticles[i].r}, ${winParticles[i].g}, ${winParticles[i].b}, ${j / 20})`;
//             winCtx.beginPath();
//             winCtx.arc(winParticles[i].trail[j].x * window.innerWidth, winParticles[i].trail[j].y * window.innerHeight, (winParticles[i].radius * j / 20) * window.innerWidth, 0, 2 * Math.PI);
//             winCtx.fill();
//         }
//         // winCtx.fillRect(winParticles[i].x * window.innerWidth - window.innerHeight / 40, winParticles[i].y * window.innerHeight - window.innerHeight / 40, window.innerHeight / 20, window.innerHeight / 20);
//         winParticles[i].radius -= 1 / 10000;
//         winParticles[i].speedY += 0.001;
//         winParticles[i].x += winParticles[i].speedX;
//         winParticles[i].y += winParticles[i].speedY;
//     }
//     winTime += 1;
//     // winOpacity -= 0.005;
//     if (winOpacity > 0) {
//         window.requestAnimationFrame(updateWin);
//     }
// };