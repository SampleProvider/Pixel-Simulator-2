var inTransition = false;
var transition = function() {
    inTransition = true;
    document.getElementById("transitionContainer").style.visibility = "visible";
    document.getElementById("transitionTop").style.transform = "translateY(0px)";
    document.getElementById("transitionBottom").style.transform = "translateY(0px)";
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
            resolve();
        }, 500);
    });
};