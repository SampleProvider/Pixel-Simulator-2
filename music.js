var pingMusic = new Audio("./music/ping.mp3");
var winMusic = new Audio("./music/win.mp3");

var ping = function() {
    pingMusic.currentTime = 0;
    pingMusic.play();
};