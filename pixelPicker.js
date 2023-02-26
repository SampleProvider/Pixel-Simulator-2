var pixelPicker = document.getElementById("pixelPicker");
var canvas = document.createElement("canvas");
var pixelPickerCtx = canvas.getContext("2d");
canvas.width = 60;
canvas.height = 60;
var lastLabel = null;
for (let id in pixels) {
    if (!pixels[id].hidden) {
        if (pixels[id].type != lastLabel) {
            var div = document.createElement("div");
            div.id = `pickerLabel-${pixels[id].type}`;
            div.classList.add("pickerLabel");
            div.innerHTML = pixels[id].type;
            div.style.fontWeight = "bold";
            div.style.color = "black";
            div.style.marginTop = "4px";
            div.style.marginBottom = "-2px";
            pixelPicker.appendChild(div);
        }
        let box = document.createElement("div");
        box.id = `picker-${id}`;
        box.classList.add("pickerPixel");
        box.onclick = function() {
            if (box.disabled) {
                return;
            }
            click();
            clickPixel = parseInt(id, 10);
            setClickPixel();
        };
        box.onmouseover = function() {
            if (box.disabled) {
                return;
            }
            setClickDescription(id);
        };
        box.onmouseout = function() {
            setClickDescription(clickPixel);
        };
        var amount = document.createElement("div");
        amount.id = `pickerAmount-${id}`;
        amount.classList.add("pickerAmount");
        amount.style.color = pixels[id].amountColor;
        var img = new Image(60, 60);
        img.draggable = false;
        pixels[id].drawPreview(pixelPickerCtx);
        img.src = canvas.toDataURL("image/png");
        box.appendChild(img);
        box.appendChild(amount);
        pixelPicker.appendChild(box);
    }
}

var setClickDescription = function(id) {
    if (id == AIR || sandbox == true) {
        document.getElementById("pixelDescriptionName").innerHTML = pixels[id].name;
    }
    else {
        document.getElementById("pixelDescriptionName").innerHTML = pixels[id].name + " x" + pixelInventory[id];
    }
    document.getElementById("pixelDescriptionText").innerHTML = pixels[id].description;
    document.getElementById("pixelDescriptionStatistics").innerHTML = `Density: ${pixels[id].density}<br>Liquid: ${pixels[id].liquid}<br>Pushable: ${pixels[id].pushable}<br>Flammable: ${pixels[id].flammable}<br>Blast Resistance: ${pixels[id].blastResistance}`;
};
var setClickPixel = function() {
    pixelPicker.children.forEach(div => div.classList.remove("pickerPixelSelected"));
    document.getElementById(`picker-${clickPixel}`).classList.add("pickerPixelSelected");
    createOverlayCanvas();
    updateOverlay();
    setClickDescription(clickPixel);
};
setClickPixel();
var updateDisabled = function() {
    pixelPicker.children.forEach(div => div.style.display = "none");
    for (var i in pixels) {
        if (pixels[i].hidden) {
            continue;
        }
        if (i == AIR) {
            document.getElementById(`picker-${i}`).style.display = "inline-block";
            continue;
        }
        // .classList.add("pickerPixelDisabled");
        if (!sandbox && pixelInventory[i] == -1) {
            continue;
        }
        else if (!sandbox && pixelInventory[i] == 0) {
            document.getElementById(`picker-${i}`).classList.add("pickerPixelDisabled");
            document.getElementById(`picker-${i}`).disabled = true;
        }
        else {
            document.getElementById(`picker-${i}`).classList.remove("pickerPixelDisabled");
            document.getElementById(`picker-${i}`).disabled = false;
        }
        document.getElementById(`picker-${i}`).style.display = "inline-block";
        if (pixels[i].type) {
            document.getElementById(`pickerLabel-${pixels[i].type}`).style.display = "block";
        }
        if (!sandbox) {
            document.getElementById(`pickerAmount-${i}`).innerHTML = pixelInventory[i];
        }
        else {
            document.getElementById(`pickerAmount-${i}`).innerHTML = "";
        }
        // document.getElementById(`picker-${i}`).classList = (pixelInventory[i] == 0);
        // document.getElementById(`picker-${i}`).disabled = true;
    }
}