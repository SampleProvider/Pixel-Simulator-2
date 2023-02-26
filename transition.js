var inTransition = false;
var transition = function() {
    inTransition = true;
    document.getElementById("transitionContainer").style.visibility = "visible";
    document.getElementById("transitionTop").style.transform = "translateY(0px)";
    document.getElementById("transitionBottom").style.transform = "translateY(0px)";
    if (!muted) {
        volumePixelSimulator2.gain.setValueAtTime(1, audioContext.currentTime);
        volumePixelSimulator2.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.25);
    }
    setTimeout(function() {
        document.getElementById("transitionTop").style.transform = "translateY(-50vh)";
        document.getElementById("transitionBottom").style.transform = "translateY(50vh)";
    }, 850);
    setTimeout(function() {
        document.getElementById("transitionContainer").style.visibility = "hidden";
        inTransition = false;
    }, 1000);
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            if (!muted) {
                volumePixelSimulator2.gain.setValueAtTime(0, audioContext.currentTime);
                volumePixelSimulator2.gain.linearRampToValueAtTime(1, audioContext.currentTime + 0.25);
            }
            resolve();
        }, 500);
    });
};