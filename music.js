var pingMusic = new Audio("./music/ping.mp3");
var winMusic = new Audio("./music/win.mp3");

var muted = false;

var ping = function() {
    if (muted) {
        return;
    }
    pingMusic.currentTime = 0;
    pingMusic.play();
};

var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioContext = new AudioContext();

var request = new XMLHttpRequest();
request.open("GET", "./music/PixelSimulator2.mp3", true);
request.responseType = "arraybuffer";
request.onload = function() {
    audioContext.decodeAudioData(request.response, function(buffer) {
        sourcePixelSimulator2 = audioContext.createBufferSource();
        sourcePixelSimulator2.buffer = buffer;
        bufferPixelSimulator2 = buffer;
        sourcePixelSimulator2.loop = true;
        sourcePixelSimulator2.connect(audioContext.destination);
        if (!muted) {
            sourcePixelSimulator2.start();
        }
    });
}
request.send();
var sourcePixelSimulator2;
var bufferPixelSimulator2
// var musicPixelSimulator2 = new Audio("./music/PixelSimulator2.mp3");

var toggleMuted = function() {
    muted = !muted;
    document.cookie = `muted=${muted ? 1 : 0}`;
    document.getElementById("muteButton").innerHTML = muted ? "UNMUTE" : "MUTE";
    document.getElementById("muteButton").style.background = muted ? "#ff0000" : "#00ff00";
    if (muted) {
        if (sourcePixelSimulator2) {
            sourcePixelSimulator2.stop();
        }
    }
    else {
        if (bufferPixelSimulator2) {
            sourcePixelSimulator2 = audioContext.createBufferSource();
            sourcePixelSimulator2.buffer = bufferPixelSimulator2;
            sourcePixelSimulator2.loop = true;
            sourcePixelSimulator2.connect(audioContext.destination);
            sourcePixelSimulator2.start();
        }
    }
}
var cookie = document.cookie.split(";");
for (var i = 0; i < cookie.length; i++) {
    var c = cookie[i];
    while (c.charAt(0) == ' ') {
        c = c.substring(1);
    }
    if (c.indexOf("muted=") == 0) {
        if (c.substring(6, c.length) == "1") {
            toggleMuted();
        }
    }
}