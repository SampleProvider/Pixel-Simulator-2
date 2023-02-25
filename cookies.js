var storeGrid = function() {
    if (sandbox) {
        document.cookie = `sandbox=${generateSaveCode().replaceAll(";", "~")}`;
    }
    else {
        document.cookie = `${currentLevel}=${generateSaveCode().replaceAll(";", "~")}}`;
    }
};
var fetchGrid = function() {
    var cookie = document.cookie.split(";");
    for (var i = 0; i < cookie.length; i++) {
        var c = cookie[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (sandbox) {
            if (c.indexOf("sandbox=") == 0) {
                loadSaveCode(c.substring(8, c.length).replaceAll("~", ";"));
                return true;
            }
        }
        else {
            if (c.indexOf(`${currentLevel}=`) == 0) {
                loadSaveCode(c.substring(`${currentLevel}=`.length, c.length).replaceAll("~", ";"));
                // var data = c.substring(`${currentLevel}=`.length, c.length).split("|");
                // loadSaveCode(data[0].replaceAll("~", ";"));
                // loadPixelInventory(JSON.parse(data[1]));
                return true;
            }
        }
    }
    return false;
};