var clickMusic = new Audio("./music/click.wav");
clickMusic.volume = 0.5;
var winMusic = new Audio("./music/win.mp3");

var muted = false;

var click = function() {
    // if (muted) {
    //     return;
    // }
    clickMusic.currentTime = 0;
    clickMusic.play();
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
        volumePixelSimulator2 = audioContext.createGain();
        if (!muted) {
            volumePixelSimulator2.gain.setValueAtTime(0, audioContext.currentTime);
            volumePixelSimulator2.gain.linearRampToValueAtTime(1, audioContext.currentTime + 1);
        }
        else {
            volumePixelSimulator2.gain.value = 0;
        }
        sourcePixelSimulator2.connect(volumePixelSimulator2);
        volumePixelSimulator2.connect(audioContext.destination);
        sourcePixelSimulator2.start();
    });
}
request.send();
var sourcePixelSimulator2;
var bufferPixelSimulator2;
var volumePixelSimulator2;
// var musicPixelSimulator2 = new Audio("./music/PixelSimulator2.mp3");

var toggleMuted = function() {
    muted = !muted;
    localStorage.setItem("muted", muted ? 1 : 0);
    document.getElementById("muteButton").innerHTML = muted ? "UNMUTE" : "MUTE";
    document.getElementById("muteButton").style.background = muted ? "#ff0000" : "#00ff00";
    if (muted) {
        if (sourcePixelSimulator2) {
            sourcePixelSimulator2.stop();
        }
    }
    else {
        if (bufferPixelSimulator2) {
            if (sourcePixelSimulator2) {
                sourcePixelSimulator2.stop();
            }
            sourcePixelSimulator2 = audioContext.createBufferSource();
            sourcePixelSimulator2.buffer = bufferPixelSimulator2;
            sourcePixelSimulator2.loop = true
            volumePixelSimulator2 = audioContext.createGain();
            volumePixelSimulator2.gain.setValueAtTime(0, audioContext.currentTime);
            volumePixelSimulator2.gain.linearRampToValueAtTime(1, audioContext.currentTime + 1);
            sourcePixelSimulator2.connect(volumePixelSimulator2);
            volumePixelSimulator2.connect(audioContext.destination);
            sourcePixelSimulator2.start();
        }
    }
}
if (localStorage.getItem("muted") == "1") {
    toggleMuted();
}