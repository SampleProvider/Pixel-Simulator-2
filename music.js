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
        bufferPixelSimulator2 = audioContext.createBufferSource();
        bufferPixelSimulator2.buffer = buffer;
        bufferPixelSimulator2.loop = true;
        bufferPixelSimulator2.connect(audioContext.destination);
        if (muted) {
            bufferPixelSimulator2.start();
            bufferPixelSimulator2.stop();
        }
        else {
            bufferPixelSimulator2.start();
        }
    });
}
request.send();
var bufferPixelSimulator2;
// var musicPixelSimulator2 = new Audio("./music/PixelSimulator2.mp3");

var toggleMuted = function() {
    muted = !muted;
    document.getElementById("muteButton").innerHTML = muted ? "UNMUTE" : "MUTE";
    document.getElementById("muteButton").style.background = muted ? "#ff0000" : "#00ff00";
    if (muted) {
        if (bufferPixelSimulator2) {
            bufferPixelSimulator2.stop();
        }
    }
    else {
        if (bufferPixelSimulator2) {
            bufferPixelSimulator2.play();
        }
    }
}