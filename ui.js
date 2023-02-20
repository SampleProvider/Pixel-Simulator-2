var showPrompt = function() {
    inPrompt = true;
    document.getElementById("promptContainer").style.opacity = "1";
    document.getElementById("promptContainer").style.pointerEvents = "all";
    document.getElementById("prompt").style.transform = "translateY(-50%)";
    document.getElementById("promptSelect").style.display = "none";
    document.getElementById("promptInput").style.display = "none";
    document.getElementById("promptError").innerHTML = "";
    document.getElementById("promptOk").style.display = "none";
    document.getElementById("promptYes").style.display = "none";
    document.getElementById("promptYes").disabled = false;
    document.getElementById("promptYes").innerHTML = "YES";
    document.getElementById("promptNo").style.display = "none";
    document.getElementById("promptNo").innerHTML = "NO";
};
var hidePrompt = function() {
    document.getElementById("promptContainer").style.opacity = "";
    document.getElementById("promptContainer").style.pointerEvents = "";
    document.getElementById("prompt").style.transform = "";
    inPrompt = false;
};
hidePrompt();

var promptNotification = function(notification) {
    showPrompt();
    document.getElementById("promptOk").style.display = "inline";
    document.getElementById("promptText").innerHTML = notification;
    return new Promise(function(resolve, reject) {
        document.getElementById("promptOk").onclick = function() {
            hidePrompt();
            resolve(true);
        };
    });
};
var promptQuestion = function(question) {
    showPrompt();
    document.getElementById("promptYes").style.display = "inline";
    document.getElementById("promptNo").style.display = "inline";
    document.getElementById("promptText").innerHTML = question;
    return new Promise(function(resolve, reject) {
        document.getElementById("promptYes").onclick = function() {
            hidePrompt();
            resolve(true);
        };
        document.getElementById("promptNo").onclick = function() {
            hidePrompt();
            resolve(false);
        };
    });
};
var promptText = function(question) {
    showPrompt();
    document.getElementById("promptInput").style.display = "inline-block";
    document.getElementById("promptInput").type = "text";
    document.getElementById("promptInput").value = "";
    document.getElementById("promptYes").style.display = "inline";
    document.getElementById("promptYes").disabled = true;
    document.getElementById("promptYes").innerHTML = "OK";
    document.getElementById("promptNo").style.display = "inline";
    document.getElementById("promptNo").innerHTML = "CANCEL";
    document.getElementById("promptText").innerHTML = question;
    document.getElementById("promptInput").oninput = function() {
        if (document.getElementById("promptInput").value.length > 0) {
            document.getElementById("promptYes").disabled = false;
        }
        else {
            document.getElementById("promptYes").disabled = true;
        }
    }
    return new Promise(function(resolve, reject) {
        document.getElementById("promptYes").onclick = function() {
            hidePrompt();
            resolve(document.getElementById("promptInput").value);
        };
        document.getElementById("promptNo").onclick = function() {
            hidePrompt();
            resolve(false);
        };
    });
};
var promptNumber = function(question) {
    showPrompt();
    document.getElementById("promptInput").style.display = "inline-block";
    document.getElementById("promptInput").type = "number";
    document.getElementById("promptInput").value = "";
    document.getElementById("promptYes").style.display = "inline";
    document.getElementById("promptYes").disabled = true;
    document.getElementById("promptYes").innerHTML = "OK";
    document.getElementById("promptNo").style.display = "inline";
    document.getElementById("promptNo").innerHTML = "CANCEL";
    document.getElementById("promptText").innerHTML = question;
    document.getElementById("promptInput").oninput = function() {
        if (document.getElementById("promptInput").value.length > 0) {
            document.getElementById("promptYes").disabled = false;
        }
        else {
            document.getElementById("promptYes").disabled = true;
        }
    }
    return new Promise(function(resolve, reject) {
        document.getElementById("promptYes").onclick = function() {
            hidePrompt();
            resolve(parseInt(document.getElementById("promptInput").value, 10));
        };
        document.getElementById("promptNo").onclick = function() {
            hidePrompt();
            resolve(false);
        };
    });
};
var promptSaveCode = function(question) {
    showPrompt();
    document.getElementById("promptYes").style.display = "inline";
    document.getElementById("promptYes").innerHTML = "OK";
    document.getElementById("promptNo").style.display = "inline";
    document.getElementById("promptNo").innerHTML = "CANCEL";
    document.getElementById("promptSelect").style.display = "inline-block";
    document.getElementById("promptSelect").innerHTML = "";
    for (var i in saveCodes) {
        var option = document.createElement("option");
        option.value = i;
        option.innerText = i;
        document.getElementById("promptSelect").appendChild(option);
        // document.getElementById("promptSelect").innerHTML += `<option value="${i}">${i}</option>`;
    }
    document.getElementById("promptText").innerHTML = question;
    return new Promise(function(resolve, reject) {
        document.getElementById("promptYes").onclick = function() {
            hidePrompt();
            resolve(document.getElementById("promptSelect").value);
        };
        document.getElementById("promptNo").onclick = function() {
            hidePrompt();
            resolve(false);
        };
    });
};

var updateButtons = function() {
    document.getElementById("runButton").innerHTML = running ? "PAUSE" : "RUN";
    document.getElementById("runButton").style.background = running ? "#ff0000" : "#00ff00";
    document.getElementById("simulateButton").disabled = running ? false : true;
    document.getElementById("simulateButton").innerHTML = simulating ? "STOP SIMULATING" : "SIMULATE";
    document.getElementById("simulateButton").style.background = simulating ? "#ff0000" : "#00ff00";
    document.getElementById("resetButton").disabled = resetable ? false : true;
};

document.getElementById("runButton").onclick = function() {
    ping();
    running = !running;
    if (!running) {
        simulating = false;
    }
    updateButtons();
};
document.getElementById("stepButton").onclick = function() {
    ping();
    updateGrid();
    ctx.drawImage(offscreenCanvas, cameraX, cameraY, 600, 600, 0, 0, 600, 600);
    ctx.drawImage(offscreenEffectCanvas, cameraX, cameraY, 600, 600, 0, 0, 600, 600);
    ctx.drawImage(offscreenPlaceableCanvas, cameraX, cameraY, 600, 600, 0, 0, 600, 600);
};
document.getElementById("simulateButton").onclick = async function() {
    simulating = !simulating;
    updateButtons();
    if (simulating) {
        var newSimulateSpeed = await promptNumber("Enter the simulating speed factor:");
        if (newSimulateSpeed == false) {
            simulating = false;
            updateButtons();
        }
        else {
            ping();
            simulateSpeed = newSimulateSpeed;
        }
    }
};
document.getElementById("resetButton").onclick = async function() {
    if (resetable) {
        if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
            ping();
            for (var i = 0; i < gridSize; i++) {
                for (var j = 0; j < gridSize; j++) {
                    grid[i][j] = lastGrid[i][j];
                    nextGrid[i][j] = [null, null];
                }
            }
            resetGrid();
        }
    }
};

document.getElementById("downloadSaveCodeButton").onclick = async function() {
    var name = await promptText("Pick a file name:");
    if (name == false) {
        return;
    }
    ping();
    var link = document.createElement("a");
    link.download = name + ".pixel";
    var saveCode = generateSaveCode();
    saveCodes[name] = saveCode;
    var file = new Blob([btoa(saveCode)], { type: "text/plain" });
    var href = URL.createObjectURL(file);
    link.href = href;
    link.target = "_blank";
    link.click();
    URL.revokeObjectURL(link);
};
document.getElementById("winScreenDownloadSaveCode").onclick = async function() {
    ping();
    var link = document.createElement("a");
    link.download = currentLevel + ".pixel";
    for (var i = 0; i < gridSize; i++) {
        for (var j = 0; j < gridSize; j++) {
            grid[i][j] = lastGrid[i][j];
            nextGrid[i][j] = [null, null];
        }
    }
    var saveCode = generateSaveCode();
    saveCodes[name] = saveCode;
    var file = new Blob([btoa(saveCode)], { type: "text/plain" });
    var href = URL.createObjectURL(file);
    link.href = href;
    link.target = "_blank";
    link.click();
    URL.revokeObjectURL(link);
};
document.getElementById("uploadSaveCodeButton").onclick = function() {
    var input = document.createElement("input");
    input.type = "file";
    input.accept = ".pixel";
    input.click();
    input.oninput = function() {
        if (input.files.length == 0) {
            return;
        }
        var reader = new FileReader();
        reader.onload = async function(event) {
            if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
                ping();
                var saveCode = atob(event.target.result);
                if (sandbox) {
                    loadSaveCode(saveCode);
                }
                else {
                    loadLevelSaveCode(saveCode);
                }
                saveCodes[input.files[0].name.substring(0, input.files[0].name.length - 6)] = saveCode;
            }
        };
        reader.readAsText(input.files[0]);
    };
};
document.getElementById("copySaveCodeButton").onclick = function() {
    navigator.clipboard.writeText(generateSaveCode());
    promptNotification("Copied save code!");
    ping();
};
document.getElementById("loadCopiedSaveCodeButton").onclick = async function() {
    var saveCode = await navigator.clipboard.readText();
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        ping();
        if (sandbox) {
            loadSaveCode(saveCode);
        }
        else {
            loadLevelSaveCode(saveCode);
        }
    }
};
document.getElementById("loadStoredSaveCodeButton").onclick = async function() {
    if (Object.keys(saveCodes).length == 0) {
        promptNotification("You don't have any loaded save codes.");
        return;
    }
    var saveCodeName = await promptSaveCode("Select a save code:");
    if (saveCodeName == false) {
        return;
    }
    inPrompt = true;
    await new Promise(p => setTimeout(p, 500));
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        loadSaveCode(saveCodes[saveCodeName]);
        ping();
    }
};
document.getElementById("changeGridSizeButton").onclick = async function() {
    var newGridSize = await promptNumber("Enter the new grid size:");
    if (newGridSize == false) {
        return;
    }
    inPrompt = true;
    await new Promise(p => setTimeout(p, 500));
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        ping();
        gridSize = newGridSize;
        createGrid();
        resetGrid();
    }
};
document.getElementById("resetGridButton").onclick = async function() {
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        ping();
        if (sandbox) {
            createGrid();
            resetGrid();
        }
        else {
            loadLevel(currentLevel);
        }
    }
};
document.getElementById("backToMenuButton").onclick = async function() {
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        ping();
        showMenuScreen();
    }
};
document.getElementById("winResetGrid").onclick = async function() {
    if (resetable) {
        ping();
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                grid[i][j] = lastGrid[i][j];
                nextGrid[i][j] = [null, null];
            }
        }
        document.getElementById("winScreen").style.opacity = 0;
        document.getElementById("winScreen").style.pointerEvents = "none";
        inPrompt = false;
        resetGrid();
    }
};