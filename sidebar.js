var pixelPicker = document.getElementById("pixelPicker");
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 60;
canvas.height = 60;
for (let id in pixels) {
    if (pixels[id].key != -1) {
        let box = document.createElement("div");
        box.id = `picker-${id}`;
        box.classList.add("pickerPixel");
        box.onclick = function() {
            clickPixel = id;
            setPixel();
        };
        box.onmouseover = function() {
            setDescription(id);
        };
        box.onmouseout = function() {
            setDescription(clickPixel);
        };
        var img = new Image(60, 60);
        pixels[id].drawPreview(ctx);
        img.src = canvas.toDataURL("image/png");
        box.appendChild(img);
        pixelPicker.appendChild(box);
    }
}

var setDescription = function(id) {
    document.getElementById("pixelDescriptionName").innerHTML = pixels[id].name;
    document.getElementById("pixelDescriptionText").innerHTML = pixels[id].description;
    document.getElementById("pixelDescriptionStatistics").innerHTML = `Density: ${pixels[id].density}<br>Liquid: ${pixels[id].liquid}<br>Pushable: ${pixels[id].pushable}<br>Flammable: ${pixels[id].flammable}<br>Blast Resistance: ${pixels[id].blast_resistance}`;
}
var setPixel = function() {
    pixelPicker.children.forEach(div => div.classList.remove("pickerPixelSelected"));
    document.getElementById(`picker-${clickPixel}`).classList.add("pickerPixelSelected");
    setDescription(clickPixel);
}
document.getElementById(`picker-${clickPixel}`).classList.add("pickerPixelSelected");
setPixel();

document.getElementById("runButton").onclick = function() {
    running = !running;
    document.getElementById("runButton").innerHTML = running ? "PAUSE" : "RUN";
    document.getElementById("runButton").style.background = running ? "#ff0000" : "#00ff00";
};
document.getElementById("stepButton").onclick = function() {
    updateGrid();
};