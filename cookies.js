var storeGrid = function() {
    if (sandbox) {
        localStorage.setItem("sandbox", generateSaveCode());
    }
    else {
        localStorage.setItem(currentLevel, generateSaveCode());
    }
};
var fetchGrid = function() {
    if (sandbox) {
        if (localStorage.getItem("sandbox") != null) {
            loadSaveCode(localStorage.getItem("sandbox"));
            return true;
        }
    }
    else {
        if (localStorage.getItem(currentLevel) != null) {
            loadSaveCode(localStorage.getItem(currentLevel));
            return true;
        }
    }
    return false;
};