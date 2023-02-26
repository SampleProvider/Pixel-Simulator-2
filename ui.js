var showPrompt = function() {
    inTransition = true;
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
    inTransition = false;
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
    document.getElementById("simulateButton").disabled = !running;
    document.getElementById("simulateButton").innerHTML = simulating ? "STOP SIMULATING" : "SIMULATE";
    document.getElementById("simulateButton").style.background = simulating ? "#ff0000" : "#00ff00";
    document.getElementById("resetButton").disabled = !resetable;
    document.getElementById("setInitialButton").disabled = !resetable;
};

document.getElementById("runButton").onclick = function() {
    click();
    running = !running;
    if (!running) {
        simulating = false;
    }
    updateButtons();
};
document.getElementById("stepButton").onclick = function() {
    click();
    updateGrid();
    drawCanvas();
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
            click();
            simulateSpeed = newSimulateSpeed;
        }
    }
};
document.getElementById("resetButton").onclick = async function() {
    if (resetable) {
        if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
            click();
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
document.getElementById("setInitialButton").onclick = async function() {
    if (await promptQuestion("Are you sure? This will delete your current initial state.")) {
        click();
        resetable = false;
        lastGrid = JSON.parse(JSON.stringify(grid));
        updateButtons();
    }
};

document.getElementById("downloadSaveCodeButton").onclick = async function() {
    var name = await promptText("Pick a file name:");
    if (name == false) {
        return;
    }
    click();
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
                click();
                await transition();
                var saveCode = atob(event.target.result);
                loadSaveCode(saveCode);
                resetGrid();
                saveCodes[input.files[0].name.substring(0, input.files[0].name.length - 6)] = saveCode;
            }
        };
        reader.readAsText(input.files[0]);
    };
};
document.getElementById("parseSaveCodeButton").onclick = function() {
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
                click();
                await transition();
                var saveCode = atob(event.target.result);
                parseSaveCode(saveCode);
                resetGrid();
                saveCodes[input.files[0].name.substring(0, input.files[0].name.length - 6)] = saveCode;
            }
        };
        reader.readAsText(input.files[0]);
    };
};
document.getElementById("copySaveCodeButton").onclick = function() {
    navigator.clipboard.writeText(generateSaveCode());
    promptNotification("Copied save code!");
    click();
};
document.getElementById("loadCopiedSaveCodeButton").onclick = async function() {
    var saveCode = await navigator.clipboard.readText();
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        click();
        await transition();
        loadSaveCode(saveCode);
        resetGrid();
    }
};
document.getElementById("parseCopiedSaveCodeButton").onclick = async function() {
    var saveCode = await navigator.clipboard.readText();
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        click();
        await transition();
        parseSaveCode(saveCode);
        resetGrid();
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
    inTransition = true;
    await new Promise(p => setTimeout(p, 500));
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        click();
        await transition();
        loadSaveCode(saveCodes[saveCodeName]);
        resetGrid();
    }
};
document.getElementById("changeGridSizeButton").onclick = async function() {
    var newGridSize = await promptNumber("Enter the new grid size:");
    if (newGridSize == false) {
        return;
    }
    inTransition = true;
    await new Promise(p => setTimeout(p, 500));
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        click();
        await transition();
        gridSize = newGridSize;
        createGrid();
        resetGrid();
    }
};
document.getElementById("screenshotGridButton").onclick = async function() {
    var name = await promptText("Pick a file name:");
    if (name == false) {
        return;
    }
    click();
    var link = document.createElement("a");
    link.download = name + ".png";
    drawCanvas();
    document.getElementById("canvas").toBlob(function(file) {
        var href = URL.createObjectURL(file);
        link.href = href;
        link.target = "_blank";
        link.click();
        URL.revokeObjectURL(link);
    });
    // var file = await ctx.toBlob();
    // var file = new Blob([btoa(saveCode)], { type: "text/plain" });
    // var href = URL.createObjectURL(file);
};
document.getElementById("muteButton").onclick = function() {
    toggleMuted();
};
document.getElementById("optimizedOverlaysButton").onclick = function() {
    optimizedOverlay = !optimizedOverlay;
    localStorage.setItem("optimizedOverlay", optimizedOverlay ? 1 : 0);
    document.getElementById("optimizedOverlaysButton").style.background = optimizedOverlay ? "#00ff00" : "#ff0000";
};
document.getElementById("restartButton").onclick = async function() {
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        click();
        loadLevel(currentLevel);
    }
};
document.getElementById("resetGridButton").onclick = async function() {
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        click();
        await transition();
        createGrid();
        resetGrid();
    }
};
document.getElementById("menuButton").onclick = async function() {
    if (await promptQuestion("Are you sure? This will delete your current simulation.")) {
        click();
        hideWinScreen();
        showMenuScreen();
    }
};
document.getElementById("winResetGrid").onclick = async function() {
    if (resetable) {
        click();
        await transition();
        for (var i = 0; i < gridSize; i++) {
            for (var j = 0; j < gridSize; j++) {
                grid[i][j] = lastGrid[i][j];
                nextGrid[i][j] = [null, null];
            }
        }
        hideWinScreen();
        resetGrid();
    }
};
document.getElementById("winNextLevel").onclick = async function() {
    click();
    var newLevel = currentLevel.substring(0, 2) + (parseInt(currentLevel.substring(2), 10) + 1);
    hideWinScreen();
    loadLevel(newLevel);
};