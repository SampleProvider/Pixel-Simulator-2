new p5();

pixels = {
    "air": {
        draw: function(x, y) {
            fill(255, 255, 255);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {

        },
        updateStage: -1,
        animated: false,
        density: 0,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 1,
        name: "Air",
        description: "It's air. What did you expect?",
        key: -10,
    },
    "dirt": {
        draw: function(x, y) {
            fill(125, 75, 0);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 75, 0)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "water", null)) {
                if (changePixel(x, y, "mud", null)) {
                    return;
                }
            }
            if (getTouchingDiagonalLessDense(x, y, pixels.dirt.density) >= 5) {
                fall(x, y);
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 15,
        blast_resistance: 1,
        name: "Dirt",
        description: "Pretty dirty.",
        key: 11,
    },
    "grass": {
        draw: function(x, y) {
            fill(25, 175, 75);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(25, 175, 75)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonalLessDense(x, y, pixels.grass.density) >= 5) {
                fall(x, y);
            }
            if (getTouchingDiagonal(x, y, "air", null) == 0) {
                changePixel(x, y, "dirt", null);
                return;
            }
            forEachTouchingDiagonal(x, y, "dirt", null, function(x1, y1) {
                if (getTouchingDiagonal(x1, y1, "air", null) > 0) {
                    changePixel(x1, y1, "grass", null);
                }
            });
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 15,
        blast_resistance: 1,
        name: "Grass",
        description: "This grass is pretty OP. It can grow on cliffs and on the bottom of floating islands.",
        key: 12,
    },
    "sand": {
        draw: function(x, y) {
            fill(255, 225, 125);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 225, 125)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, "sand", null) == 4) {
                return;
            }
            if (getTouchingDiagonal(x, y, "lava", null) >= 6) {
                if (changePixel(x, y, "quartz", null)) {
                    return;
                }
            }
            flow(x, y, 1);
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 1,
        name: "Sand",
        description: "A fine, light-yellow powder. It likes to make pyramids.",
        key: 13,
    },
    "water": {
        draw: function(x, y) {
            fill(colorTint(125, 225, 255, 25, 75, 175, noiseGrid[y][x]));
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            // fill(25, 75, 175, noiseGrid[y][x] * 255);
            // rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 225, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(25, 75, 175, 0.5)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, "water", null) == 4) {
                return;
            }
            flow(x, y, gridSize);
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: false,
        liquid: true,
        pushable: true,
        flammable: 0,
        blast_resistance: 3,
        name: "Water",
        description: "Flows everywhere. Not very realistic.",
        key: 14,
    },
    "wood": {
        draw: function(x, y) {
            fill(150, 100, 75);
            rect(x * pixelSize, y * pixelSize, pixelSize / 2, pixelSize);
            fill(175, 125, 75);
            rect(x * pixelSize + pixelSize / 2, y * pixelSize, pixelSize / 2, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(150, 100, 75)";
            ctx.fillRect(0, 0, 30, 60);
            ctx.fillStyle = "rgb(175, 125, 75)";
            ctx.fillRect(30, 0, 30, 60);
        },
        update: function(x, y) {

        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 10,
        blast_resistance: 3,
        name: "Wood",
        description: "A thick, rough, oak log.",
        key: 15,
    },
    "leaf": {
        draw: function(x, y) {
            fill(125, 225, 75);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 225, 75)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (!isTouchingDiagonal(x, y, "wood", null) && getTouchingDiagonal(x, y, "leaf", null) < 2) {
                if (random() < 0.1) {
                    changePixel(x, y, "sapling", null);
                }
                else {
                    changePixel(x, y, "air", null);
                }
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 5,
        blast_resistance: 1,
        name: "Leaf",
        description: "A nice, springy leaf. Drops saplings when it decays.",
        key: 16,
    },
    "sapling": {
        draw: function(x, y) {
            fill(255, 255, 255);
            rect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
            fill(75, 255, 150);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize * 2 / 3);
            fill(150, 100, 75);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 40, 20, 20);
            ctx.fillRect(40, 40, 20, 20);
            ctx.fillStyle = "rgb(75, 255, 150)";
            ctx.fillRect(0, 0, 60, 40);
            ctx.fillStyle = "rgb(150, 100, 75)";
            ctx.fillRect(20, 40, 20, 20);
        },
        update: function(x, y) {
            if (fall(x, y)) {
                return;
            }
            if (y != gridSize - 1 && random() < 0.01) {
                if (grid[y + 1][x][0] == "dirt") {
                    var direction = [0, -1];
                    var length = random(8, 14);
                    var stemPixel = "wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 21);
                }
                else if (grid[y + 1][x][0] == "grass") {
                    var direction = [0, -1];
                    var length = random(12, 18);
                    var stemPixel = "wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 14);
                }
                else if (grid[y + 1][x][0] == "sand") {
                    var direction = [0, -1];
                    var length = random(16, 24);
                    var stemPixel = "wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0, 0, 0);
                }
                else if (grid[y + 1][x][0] == "mud") {
                    var direction = [0, -1];
                    var length = random(6, 10);
                    var stemPixel = "wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.15, 1, 7);
                }
                else if (grid[y + 1][x][0] == "dried_mud") {
                    var direction = [0, -1];
                    var length = random(4, 8);
                    var stemPixel = "wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.2, 2, 7);
                }
                else if (grid[y + 1][x][0] == "snow") {
                    var direction = [0, -1];
                    var length = random(8, 14);
                    var stemPixel = "wood";
                    var leafPixel = "snow";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.05, 2, 21);
                }
                else if (grid[y + 1][x][0] == "ice") {
                    var direction = [0, -1];
                    var length = random(8, 10);
                    var stemPixel = "wood";
                    var leafPixel = "ice";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.2, 3, 7);
                }
                else if (grid[y + 1][x][0] == "silt") {
                    var direction = [0, -1];
                    var length = random(8, 16);
                    var stemPixel = "wood";
                    var leafPixel = "ash";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.05, 2, 14);
                }
                else if (grid[y + 1][x][0] == "obsidian") {
                    var direction = [0, -1];
                    var length = random(8, 16);
                    var stemPixel = "basalt";
                    var leafPixel = "stone";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.05, 2, 14);
                }
                else if (grid[y + 1][x][0] == "quartz") {
                    var direction = [0, -1];
                    var length = random(12, 22);
                    var stemPixel = "wood";
                    var leafPixel = "quartz";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 14);
                }
                else if (grid[y + 1][x][0] == "rgb_pixel") {
                    var direction = [0, -1];
                    var length = random(28, 34);
                    var stemPixel = "rgb_pixel";
                    var leafPixel = "rgb_pixel";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.15, 1, 14);
                }
                else if (grid[y + 1][x][0] == "life") {
                    var direction = [0, -1];
                    var length = random(28, 34);
                    var stemPixel = "wood";
                    var leafPixel = "life";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.15, 1, 14);
                }
                else if (grid[y + 1][x][0] == "death") {
                    var direction = [0, -1];
                    var length = random(28, 34);
                    var stemPixel = "wood";
                    var leafPixel = "death";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.15, 1, 14);
                }
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 15,
        blast_resistance: 1,
        name: "Sapling",
        description: "Plant it and see what grows!",
        key: 17,
    },
    "mud": {
        draw: function(x, y) {
            fill(75, 50, 0);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(75, 50, 0)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (!isTouchingDiagonal(x, y, "water", null) && random() < 0.05 || isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire")) {
                if (changePixel(x, y, "dried_mud", null)) {
                    return;
                }
            }
            if (getTouchingDiagonalLessDense(x, y, pixels.dirt.density) >= 4) {
                flow(x, y, 4);
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 20,
        blast_resistance: 3,
        name: "Mud",
        description: "It's like dirt, but wet and slightly liquid.",
        key: 18,
    },
    "dried_mud": {
        draw: function(x, y) {
            fill(100, 75, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 75, 25)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "water", null)) {
                if (changePixel(x, y, "mud", null)) {
                    return;
                }
            }
            if (getTouchingDiagonalLessDense(x, y, pixels.dirt.density) >= 6) {
                fall(x, y);
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 5,
        blast_resistance: 3,
        name: "Dried Mud",
        description: "Extremely flammable.",
        key: 19,
    },
    "lava": {
        draw: function(x, y) {
            fill(colorTint(255, 25, 0, 225, 255, 25, noiseGrid[y][x]));
            // fill(255, 25, 0);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            // fill(225, 255, 25, noiseGrid[y][x] * 255);
            // rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 25, 0)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(225, 255, 25, 0.5)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            var touchingLava = getTouchingDiagonal(x, y, "lava", null);
            if (getTouching(x, y, "lava") == 4) {
                return;
            }
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (grid[y1][x1][0] == "water") {
                    if (y1 > y) {
                        if (touchingLava >= 5) {
                            changePixel(x1, y1, "obsidian", null);
                        }
                        else if (touchingLava >= 3 && random() < 0.5) {
                            changePixel(x1, y1, "basalt", null);
                        }
                        else {
                            changePixel(x1, y1, "stone", null);
                        }
                        changePixel(x, y, "air", null);
                    }
                    else {
                        if (touchingLava >= 5) {
                            changePixel(x, y, "obsidian", null);
                        }
                        else if (touchingLava >= 3 && random() < 0.5) {
                            changePixel(x, y, "basalt", null);
                        }
                        else {
                            changePixel(x, y, "stone", null);
                        }
                        changePixel(x1, y1, "air", null);
                    }
                }
                else if (grid[y1][x1][0] == "grass") {
                    changePixel(x1, y1, "dirt", null);
                }
                if (grid[y1][x1][1] == "air" && grid[y1][x1][0] != "lava" && random() < 0.1) {
                    changePixel(x1, y1, null, "fire");
                }
            });
            if (random() < 0.25) {
                flow(x, y, gridSize);
            }
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: false,
        liquid: true,
        pushable: true,
        flammable: -10,
        blast_resistance: 3,
        name: "Lava",
        description: "Extremely hot and melts rocks. Burns flammable pixels. Flows everywhere but slowly. Water can cool it into rocks.",
        key: 21,
    },
    "fire": {
        draw: function(x, y) {
            fill(255, 175, 25, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 175, 125, 100);
            for (var i = 0; i < 4; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 175, 25)";
            ctx.fillRect(10, 20, 30, 10);
            ctx.fillRect(10, 30, 40, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 0, 10, 10);
            ctx.fillRect(30, 0, 10, 10);
            ctx.fillRect(20, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillStyle = "rgb(255, 225, 25)";
            ctx.fillRect(20, 30, 20, 20);
            ctx.fillRect(20, 20, 10, 10);
        },
        update: function(x, y) {
            if (pixels[grid[y][x][0]].flammable == 0 || grid[y][x][0] == "lava") {
                if (changePixel(x, y, null, "air")) {
                    return;
                }
            }
            if (pixels[grid[y][x][0]].flammable < 0 && random() < -1 / pixels[grid[y][x][0]].flammable) {
                if (changePixel(x, y, null, "air")) {
                    return;
                }
            }
            if (random() < 1 / (pixels[grid[y][x][0]].flammable * 5)) {
                if (random() < 0.25) {
                    changePixel(x, y, "ash", null);
                }
                else {
                    changePixel(x, y, "air", null);
                }
            }
            var touchingWater = 0;
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (pixels[grid[y1][x1][0]].flammable == 0) {
                    touchingWater += 1;
                }
                else if (grid[y1][x1][1] != "fire" && random() < 1 / pixels[grid[y1][x1][0]].flammable) {
                    // var canChange = true;
                    // forAllTouchingDiagonal(x1, y1, function(x2, y2) {
                    //     if (pixels[grid[y2][x2][0]].flammable == 0) {
                    //         canChange = false;
                    //     }
                    // });
                    // if (canChange) {
                    changePixel(x1, y1, null, "fire");
                    // }
                }
            });
            if (random() < touchingWater / 10) {
                changePixel(x, y, null, "air");
            }
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: true,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 1,
        name: "Fire",
        description: "Super hot! Burns flammable pixels.",
        key: 22,
    },
    "quartz": {
        draw: function(x, y) {
            fill(240, 240, 255);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(235, 235, 245);
            for (var i = 0; i < 2; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(240, 240, 255)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {

        },
        updateStage: 0,
        animated: false,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Quartz",
        description: "A perfect, smooth, white crystal.",
        key: 26,
    },
    "ash": {
        draw: function(x, y) {
            fill(175, 175, 175);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(125, 125, 125);
            for (var i = 0; i < 2; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(175, 175, 175)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "water", null)) {
                if (changePixel(x, y, "silt", null)) {
                    return;
                }
            }
            flow(x, y, 2);
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 25,
        blast_resistance: 1,
        name: "Ash",
        description: "A semi-liquid black dust. Can sustain fires.",
        key: 27,
    },
    "silt": {
        draw: function(x, y) {
            fill(150, 150, 150);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(100, 100, 100);
            for (var i = 0; i < 2; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(150, 150, 150)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if ((isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire")) && !isTouchingDiagonal(x, y, "water", null) && random() < 0.1) {
                if (changePixel(x, y, "ash", null)) {
                    return;
                }
            }
            flow(x, y, 2);
        },
        updateStage: 0,
        animated: false,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -1,
        blast_resistance: 1,
        name: "Silt",
        description: "A compact mixture of water and ash. It's has a rough gravel texture.",
        key: 28,
    },
    "stone": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(75, 75, 75);
            for (var i = 0; i < 1; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonal(x, y, "lava", null) >= 2 && !isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "lava", null);
            }
            if (getTouchingDiagonal(x, y, "lava", null) >= 4 && getTouchingDiagonal(x, y, "water", null) == 1) {
                changePixel(x, y, "lava", null);
            }
        },
        updateStage: 0,
        animated: false,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 5,
        name: "Stone",
        description: "Very sturdy and dense. Lava can melt it easily.",
        key: 23,
    },
    "basalt": {
        draw: function(x, y) {
            fill(75, 75, 75);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(50, 50, 50);
            for (var i = 0; i < 1; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(75, 75, 75)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonal(x, y, "lava", null) >= 4 && !isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "lava", null);
            }
        },
        updateStage: 0,
        animated: false,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Basalt",
        description: "A hard, volcanic, rock. Very blast resistant. BUH-salt.",
        key: 24,
    },
    "obsidian": {
        draw: function(x, y) {
            fill(25, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(25, 0, 50);
            for (var i = 0; i < 2; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(25, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonal(x, y, "lava", null) >= 7 && !isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "lava", null);
            }
        },
        updateStage: 0,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 25,
        name: "Obsidian",
        description: "A smooth, very blast resistant rock. Hard to move.",
        key: 25,
    },
    "snow": {
        draw: function(x, y) {
            fill(235, 235, 255);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(235, 235, 255)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire") || grid[x][y][1] == "fire") {
                if (changePixel(x, y, "water", null)) {
                    return;
                }
            }
            forEachTouchingDiagonal(x, y, "water", null, function(x1, y1) {
                changePixel(x1, y1, "ice", null);
            });
            if (getTouchingDiagonalLessDense(x, y, pixels.dirt.density) >= 5) {
                fall(x, y);
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 1,
        name: "Snow",
        description: "Cold! Will freeze water.",
        key: 41,
    },
    "ice": {
        draw: function(x, y) {
            fill(150, 150, 255);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(125, 125, 255);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 3, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            rect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(150, 150, 255)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire") || grid[y][x][1] == "fire") {
                if (changePixel(x, y, "water", null)) {
                    return;
                }
            }
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (grid[y1][x1][1] == "air" && grid[y1][x1][0] != "ice" && random() < 0.1) {
                    changePixel(x1, y1, null, "frost_fire");
                }
            });
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 3,
        name: "Ice",
        description: "Freezing! Can melt.",
        key: 42,
    },
    "frost_fire": {
        draw: function(x, y) {
            fill(125, 125, 255, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(100, 100, 255, 100);
            for (var i = 0; i < 4; i++) {
                rect(x * pixelSize + Math.floor(random() * 3) * pixelSize / 3, y * pixelSize + Math.floor(random() * 3) * pixelSize / 3, pixelSize / 3, pixelSize / 3);
            }
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(125, 125, 255)";
            ctx.fillRect(10, 20, 30, 10);
            ctx.fillRect(10, 30, 40, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 0, 10, 10);
            ctx.fillRect(30, 0, 10, 10);
            ctx.fillRect(20, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillStyle = "rgb(200, 200, 255)";
            ctx.fillRect(20, 30, 20, 20);
            ctx.fillRect(20, 20, 10, 10);
        },
        update: function(x, y) {
            if (grid[y][x][0] == "air" && random() < 0.1) {
                if (changePixel(x, y, null, "air")) {
                    return;
                }
            }
            forEachTouchingDiagonal(x, y, "water", null, function(x1, y1) {
                changePixel(x1, y1, "ice", null);
            });
            if (isTouchingDiagonal(x, y, "lava", null)) {
                if (changePixel(x, y, null, "air")) {
                    return;
                }
            }
            if (isTouchingDiagonal(x, y, null, "fire") || grid[y][x][1] == "fire") {
                forEachTouchingDiagonal(x, y, null, "fire", function(x1, y1) {
                    changePixel(x1, y1, null, "air");
                });
                changePixel(x, y, null, "air");
            }
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: true,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 1,
        name: "Frost Fire",
        description: "Super cold! Freezes pixels and makes them function 10 times slower!",
        key: 43,
    },
    "cloner_left": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            fill(colorLerp(0, 255, 150, 0, 150, 255, 60))
            rect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 10, 40);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(50, 10, 10, 40);
            ctx.fillRect(40, 20, 10, 20);
        },
        update: function(x, y) {
            if (x == 0 || x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            if (grid[y][x + 1][0] != "air" && pixels[grid[y][x - 1][0]].pushable && push(x, y, "left", gridSize, false)) {
                if (grid[y][x + 1][1] != "air") {
                    changePixel(x - 1, y, grid[y][x + 1][grid[y][x + 1][1]], null);
                }
                else {
                    changePixel(x - 1, y, grid[y][x + 1][0], null);
                }
            }
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Cloner (Left)",
        description: "Clones the pixel on the right. The cloned pixel is pushed on the left.",
        key: 51,
    },
    "cloner_right": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            fill(colorLerp(0, 255, 150, 0, 150, 255, 60))
            rect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(40, 10, 10, 40);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(0, 10, 10, 40);
            ctx.fillRect(10, 20, 10, 20);
        },
        update: function(x, y) {
            if (x == 0 || x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            if (grid[y][x - 1][0] != "air" && pixels[grid[y][x + 1][0]].pushable && push(x, y, "right", gridSize, false)) {
                if (grid[y][x - 1][1] != "air") {
                    changePixel(x + 1, y, grid[y][x - 1][grid[y][x - 1][1]], null);
                }
                else {
                    changePixel(x + 1, y, grid[y][x - 1][0], null);
                }
            }
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Cloner (Right)",
        description: "Clones the pixel on the left. The cloned pixel is pushed on the right.",
        key: 52,
    },
    "cloner_up": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 6);
            fill(colorLerp(0, 255, 150, 0, 150, 255, 60))
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 5 / 6, pixelSize * 2 / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 10);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(10, 50, 40, 10);
            ctx.fillRect(20, 40, 20, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            if (grid[y + 1][x][0] != "air" && pixels[grid[y - 1][x][0]].pushable && push(x, y, "up", gridSize, false)) {
                if (grid[y + 1][x][1] != "air") {
                    changePixel(x, y - 1, grid[y + 1][x][grid[y + 1][x][1]], null);
                }
                else {
                    changePixel(x, y - 1, grid[y + 1][x][0], null);
                }
            }
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Cloner (Up)",
        description: "Clones the pixel underneath it. The cloned pixel is pushed upwards.",
        key: 53,
    },
    "cloner_down": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize * 2 / 3, pixelSize / 6);
            fill(colorLerp(0, 255, 150, 0, 150, 255, 60))
            rect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize * 2 / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 40, 40, 10);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(10, 0, 40, 10);
            ctx.fillRect(20, 10, 20, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            if (grid[y - 1][x][0] != "air" && pixels[grid[y + 1][x][0]].pushable && push(x, y, "down", gridSize, false)) {
                if (grid[y - 1][x][1] != "air") {
                    changePixel(x, y + 1, grid[y - 1][x][grid[y - 1][x][1]], null);
                }
                else {
                    changePixel(x, y + 1, grid[y - 1][x][0], null);
                }
            }
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Cloner (Down)",
        description: "Clones the pixel above it. The cloned pixel is pushed downwards.",
        key: 54,
    },
    "piston_left": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            push(x + 1, y, "left", gridSize, true);
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Piston (Left)",
        description: "Pushes pixels to the left.",
        key: 55,
    },
    "piston_right": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(40, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            push(x - 1, y, "right", gridSize, true);
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Piston (Right)",
        description: "Pushes pixels to the right.",
        key: 52,
    },
    "piston_up": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 10);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            push(x, y + 1, "up", gridSize, true);
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Piston (Up)",
        description: "Pushes pixels upwards.",
        key: 53,
    },
    "piston_down": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 40, 40, 10);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            push(x, y - 1, "down", gridSize, true);
        },
        updateStage: 0,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Piston (Down)",
        description: "Pushes pixels downwards.",
        key: 54,
    },
    "rotator_clockwise": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 2, pixelSize / 6);
            fill(colorLerp(0, 255, 150, 0, 150, 255, 60))
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 2, pixelSize / 2, pixelSize / 6);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 10, 10, 40);
            ctx.fillRect(0, 20, 30, 10);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(40, 10, 10, 40);
            ctx.fillRect(30, 30, 30, 10);
        },
        update: function(x, y) {
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            forAllTouching(x, y, function(x1, y1) {
                if (nextGrid[y1][x1][0] != null) {
                    if (nextGrid[y1][x1][0].includes("_left")) {
                        nextGrid[y1][x1][0] = nextGrid[y1][x1][0].replace("_left", "_down");
                        return;
                    }
                    else if (nextGrid[y1][x1][0].includes("_down")) {
                        nextGrid[y1][x1][0] = nextGrid[y1][x1][0].replace("_down", "_right");
                        return;
                    }
                    else if (nextGrid[y1][x1][0].includes("_right")) {
                        nextGrid[y1][x1][0] = nextGrid[y1][x1][0].replace("_right", "_up");
                        return;
                    }
                    else if (nextGrid[y1][x1][0].includes("_up")) {
                        nextGrid[y1][x1][0] = nextGrid[y1][x1][0].replace("_up", "_left");
                        return;
                    }
                }
                if (grid[y1][x1][0].includes("_left")) {
                    nextGrid[y1][x1][0] = grid[y1][x1][0].replace("_left", "_down");
                }
                else if (grid[y1][x1][0].includes("_down")) {
                    nextGrid[y1][x1][0] = grid[y1][x1][0].replace("_down", "_right");
                }
                else if (grid[y1][x1][0].includes("_right")) {
                    nextGrid[y1][x1][0] = grid[y1][x1][0].replace("_right", "_up");
                }
                else if (grid[y1][x1][0].includes("_up")) {
                    nextGrid[y1][x1][0] = grid[y1][x1][0].replace("_up", "_left");
                }
            });
        },
        updateStage: 1,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Rotator (Clockwise)",
        description: "Rotates pixels 90 degrees clockwise.",
        key: 58,
    },
    "rotator_counter_clockwise": {
        draw: function(x, y) {
            fill(100, 100, 100);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(colorLerp(255, 0, 150, 150, 0, 255, 60))
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize, y * pixelSize + pixelSize / 2, pixelSize / 2, pixelSize / 6);
            fill(colorLerp(0, 255, 150, 0, 150, 255, 60))
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 3, pixelSize / 2, pixelSize / 6);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(100, 100, 100)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 0, 150)";
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 10, 40);
            ctx.fillRect(0, 30, 30, 10);
            ctx.fillStyle = "rgb(0, 255, 150)";
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(40, 10, 10, 40);
            ctx.fillRect(30, 20, 30, 10);
        },
        update: function(x, y) {
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            forAllTouching(x, y, function(x1, y1) {
                if (nextGrid[y1][x1][0] != null) {
                    if (nextGrid[y1][x1][0].includes("_left")) {
                        nextGrid[y1][x1][0] = nextGrid[y1][x1][0].replace("_left", "_up");
                        return;
                    }
                    else if (nextGrid[y1][x1][0].includes("_up")) {
                        nextGrid[y1][x1][0] = nextGrid[y1][x1][0].replace("_up", "_right");
                        return;
                    }
                    else if (nextGrid[y1][x1][0].includes("_right")) {
                        nextGrid[y1][x1][0] = nextGrid[y1][x1][0].replace("_right", "_down");
                        return;
                    }
                    else if (nextGrid[y1][x1][0].includes("_down")) {
                        nextGrid[y1][x1][0] = nextGrid[y1][x1][0].replace("_down", "_left");
                        return;
                    }
                }
                if (grid[y1][x1][0].includes("_left")) {
                    nextGrid[y1][x1][0] = grid[y1][x1][0].replace("_left", "_up");
                }
                else if (grid[y1][x1][0].includes("_up")) {
                    nextGrid[y1][x1][0] = grid[y1][x1][0].replace("_up", "_right");
                }
                else if (grid[y1][x1][0].includes("_right")) {
                    nextGrid[y1][x1][0] = grid[y1][x1][0].replace("_right", "_down");
                }
                else if (grid[y1][x1][0].includes("_down")) {
                    nextGrid[y1][x1][0] = grid[y1][x1][0].replace("_down", "_left");
                }
            });
        },
        updateStage: 1,
        animated: true,
        density: 4,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Rotator (Counter Clockwise)",
        description: "Rotates pixels 90 degrees counter clockwise.",
        key: 59,
    },
    "explosives": {
        draw: function(x, y) {
            fill(175, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 25, 25);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(125, 25, 25);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(175, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(125, 25, 25)";
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(50, 20, 10, 20);
        },
        update: function(x, y) {
            if (grid[y][x][1] == "fire") {
                // if (isTouchingDiagonal(x, y, null, "fire") || grid[y][x][1] == "fire") {
                explode(x, y, 10, "fire");
            }
            else {
                fall(x, y);
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 10,
        blast_resistance: 3,
        name: "Explosives",
        description: "Explodes when lit on fire.",
        key: 61,
    },
    "ignitor_left": {
        draw: function(x, y) {
            fill(175, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 25, 25);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(125, 25, 25);
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(175, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(125, 25, 25)";
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            changePixel(x - 1, y, null, "fire");
        },
        updateStage: 0,
        animated: true,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor (Left)",
        description: "Lights the pixel to the left of it on fire.",
        key: 62,
    },
    "ignitor_right": {
        draw: function(x, y) {
            fill(175, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 25, 25);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(125, 25, 25);
            rect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(175, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(125, 25, 25)";
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(30, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            changePixel(x + 1, y, null, "fire");
        },
        updateStage: 0,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor (Right)",
        description: "Lights the pixel to the right of it on fire.",
        key: 63,
    },
    "ignitor_up": {
        draw: function(x, y) {
            fill(175, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 25, 25);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(125, 25, 25);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(175, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(125, 25, 25)";
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            changePixel(x, y - 1, null, "fire");
        },
        updateStage: 0,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor (Up)",
        description: "Lights the pixel above it on fire.",
        key: 64,
    },
    "ignitor_down": {
        draw: function(x, y) {
            fill(175, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 25, 25);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(125, 25, 25);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(175, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(125, 25, 25)";
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 30, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            changePixel(x, y + 1, null, "fire");
        },
        updateStage: 0,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor (Down)",
        description: "Lights the pixel underneath it on fire.",
        key: 65,
    },
    "ignitor_laser_left": {
        draw: function(x, y) {
            fill(175, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 25, 25);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(125, 25, 25);
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(175, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(125, 25, 25)";
            ctx.fillRect(0, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 100 != 0) {
                return;
            }
            if (gameTick % 10 == 0) {
                changePixel(x - 1, y, null, "ignitor_laser_beam_left");
            }
        },
        updateStage: 1,
        animated: true,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor Laser (Left)",
        description: "Shoots a fire laser to the left of it.",
        key: 66,
    },
    "ignitor_laser_right": {
        draw: function(x, y) {
            fill(175, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 25, 25);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(125, 25, 25);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(175, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(125, 25, 25)";
            ctx.fillRect(20, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 100 != 0) {
                return;
            }
            if (gameTick % 10 == 0) {
                changePixel(x + 1, y, null, "ignitor_laser_beam_right");
            }
        },
        updateStage: 1,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor Laser (Right)",
        description: "Shoots a fire laser to the right of it.",
        key: 67,
    },
    "ignitor_laser_up": {
        draw: function(x, y) {
            fill(175, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 25, 25);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(125, 25, 25);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(175, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(125, 25, 25)";
            ctx.fillRect(20, 0, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 100 != 0) {
                return;
            }
            if (gameTick % 10 == 0) {
                changePixel(x, y - 1, null, "ignitor_laser_beam_up");
            }
        },
        updateStage: 1,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor Laser (Up)",
        description: "Shoots a fire laser above it.",
        key: 68,
    },
    "ignitor_laser_down": {
        draw: function(x, y) {
            fill(175, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(255, 25, 25);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(125, 25, 25);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(175, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(125, 25, 25)";
            ctx.fillRect(20, 20, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 100 != 0) {
                return;
            }
            if (gameTick % 10 == 0) {
                changePixel(x, y + 1, null, "ignitor_laser_beam_down");
            }
        },
        updateStage: 1,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor Laser (Down)",
        description: "Shoots a fire laser underneath it.",
        key: 69,
    },
    "ignitor_laser_beam_left": {
        draw: function(x, y) {
            fill(255, 25, 25);
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == 0) {
                explode(x, y, 5, "fire");
                return;
            }
            var exploded = false;
            forAllTouching(x, y, function(x1, y1) {
                if (!exploded && (((grid[y1][x1][0] != "air" || (grid[y1][x1][1] != "air" && grid[y1][x1][1] != "fire")) && x1 - x == -1 && y1 == y) || (grid[y1][x1][0] != "air" && !grid[y1][x1][0].includes("ignitor") || grid[y1][x1][0].includes("frost_ignitor")))) {
                    explode(x, y, 5, "fire");
                    exploded = true;
                }
            });
            if (!exploded) {
                move(x, y, [{ x: -1, y: 0 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor Laser Beam (Left)",
        description: "Explodes on impact.",
        key: -1,
    },
    "ignitor_laser_beam_right": {
        draw: function(x, y) {
            fill(255, 25, 25);
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                explode(x, y, 5, "fire");
                return;
            }
            var exploded = false;
            forAllTouching(x, y, function(x1, y1) {
                if (!exploded && (((grid[y1][x1][0] != "air" || (grid[y1][x1][1] != "air" && grid[y1][x1][1] != "fire")) && x1 - x == 1 && y1 == y) || (grid[y1][x1][0] != "air" && !grid[y1][x1][0].includes("ignitor") || grid[y1][x1][0].includes("frost_ignitor")))) {
                    explode(x, y, 5, "fire");
                    exploded = true;
                }
            });
            if (!exploded) {
                move(x, y, [{ x: 1, y: 0 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor Laser Beam (Right)",
        description: "Explodes on impact.",
        key: -1,
    },
    "ignitor_laser_beam_up": {
        draw: function(x, y) {
            fill(255, 25, 25);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == 0) {
                explode(x, y, 5, "fire");
                return;
            }
            var exploded = false;
            forAllTouching(x, y, function(x1, y1) {
                if (!exploded && (((grid[y1][x1][0] != "air" || (grid[y1][x1][1] != "air" && grid[y1][x1][1] != "fire")) && x1 == x && y1 - y == -1) || (grid[y1][x1][0] != "air" && !grid[y1][x1][0].includes("ignitor") || grid[y1][x1][0].includes("frost_ignitor")))) {
                    explode(x, y, 5, "fire");
                    exploded = true;
                }
            });
            if (!exploded) {
                move(x, y, [{ x: 0, y: -1 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor Laser Beam (Up)",
        description: "Explodes on impact.",
        key: -1,
    },
    "ignitor_laser_beam_down": {
        draw: function(x, y) {
            fill(255, 25, 25);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                explode(x, y, 5, "fire");
                return;
            }
            var exploded = false;
            forAllTouching(x, y, function(x1, y1) {
                if (!exploded && (((grid[y1][x1][0] != "air" || (grid[y1][x1][1] != "air" && grid[y1][x1][1] != "fire")) && x1 == x && y1 - y == 1) || (grid[y1][x1][0] != "air" && !grid[y1][x1][0].includes("ignitor") || grid[y1][x1][0].includes("frost_ignitor")))) {
                    explode(x, y, 5, "fire");
                    exploded = true;
                }
            });
            if (!exploded) {
                move(x, y, [{ x: 0, y: 1 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 10,
        name: "Ignitor Laser Beam (Down)",
        description: "Explodes on impact.",
        key: -1,
    },
    "frost_explosives": {
        draw: function(x, y) {
            fill(125, 125, 175);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(175, 175, 255);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(75, 75, 125);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 125, 175)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(75, 75, 125)";
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(50, 20, 10, 20);
        },
        update: function(x, y) {
            if (grid[y][x][1] == "fire") {
                // if (isTouchingDiagonal(x, y, null, "fire") || grid[y][x][1] == "fire") {
                explode(x, y, 10, "frost_fire");
            }
            else {
                fall(x, y);
            }
        },
        updateStage: 0,
        animated: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 10,
        blast_resistance: 3,
        name: "Frost Explosives",
        description: "Explodes when lit on fire.",
        key: 71,
    },
    "frost_ignitor_left": {
        draw: function(x, y) {
            fill(125, 125, 175);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(175, 175, 255);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(75, 75, 125);
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 125, 175)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(75, 75, 125)";
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            changePixel(x - 1, y, null, "frost_fire");
        },
        updateStage: 0,
        animated: true,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor (Left)",
        description: "Lights the pixel to the left of it on frost fire.",
        key: 72,
    },
    "frost_ignitor_right": {
        draw: function(x, y) {
            fill(125, 125, 175);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(175, 175, 255);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(75, 75, 125);
            rect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 125, 175)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(75, 75, 125)";
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(30, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            changePixel(x + 1, y, null, "frost_fire");
        },
        updateStage: 0,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor (Right)",
        description: "Lights the pixel to the right of it on frost fire.",
        key: 73,
    },
    "frost_ignitor_up": {
        draw: function(x, y) {
            fill(125, 125, 175);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(175, 175, 255);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(75, 75, 125);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 125, 175)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(75, 75, 125)";
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            changePixel(x, y - 1, null, "frost_fire");
        },
        updateStage: 0,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor (Up)",
        description: "Lights the pixel above it on frost fire.",
        key: 74,
    },
    "frost_ignitor_down": {
        draw: function(x, y) {
            fill(125, 125, 175);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(175, 175, 255);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(75, 75, 125);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 125, 175)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(75, 75, 125)";
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 30, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 10 != 0) {
                return;
            }
            changePixel(x, y + 1, null, "frost_fire");
        },
        updateStage: 0,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor (Down)",
        description: "Lights the pixel underneath it on frost fire.",
        key: 75,
    },
    "frost_ignitor_laser_left": {
        draw: function(x, y) {
            fill(125, 125, 175);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(175, 175, 255);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(75, 75, 125);
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 125, 175)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(75, 75, 125)";
            ctx.fillRect(0, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 100 != 0) {
                return;
            }
            if (gameTick % 10 == 0) {
                changePixel(x - 1, y, null, "frost_ignitor_laser_beam_left");
            }
        },
        updateStage: 1,
        animated: true,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor Laser (Left)",
        description: "Shoots a frost fire laser to the left of it.",
        key: 76,
    },
    "frost_ignitor_laser_right": {
        draw: function(x, y) {
            fill(125, 125, 175);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(175, 175, 255);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(75, 75, 125);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 125, 175)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(75, 75, 125)";
            ctx.fillRect(20, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 100 != 0) {
                return;
            }
            if (gameTick % 10 == 0) {
                changePixel(x + 1, y, null, "frost_ignitor_laser_beam_right");
            }
        },
        updateStage: 1,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor Laser (Right)",
        description: "Shoots a frost fire laser to the right of it.",
        key: 77,
    },
    "frost_ignitor_laser_up": {
        draw: function(x, y) {
            fill(125, 125, 175);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(175, 175, 255);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(75, 75, 125);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 125, 175)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(75, 75, 125)";
            ctx.fillRect(20, 0, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 100 != 0) {
                return;
            }
            if (gameTick % 10 == 0) {
                changePixel(x, y - 1, null, "frost_ignitor_laser_beam_up");
            }
        },
        updateStage: 1,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor Laser (Up)",
        description: "Shoots a frost fire laser above it.",
        key: 78,
    },
    "frost_ignitor_laser_down": {
        draw: function(x, y) {
            fill(125, 125, 175);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(175, 175, 255);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            fill(75, 75, 125);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize * 2 / 3);
            rect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 125, 175)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = "rgb(75, 75, 125)";
            ctx.fillRect(20, 20, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 100 != 0) {
                return;
            }
            if (gameTick % 10 == 0) {
                changePixel(x, y + 1, null, "frost_ignitor_laser_beam_down");
            }
        },
        updateStage: 1,
        animated: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor Laser (Down)",
        description: "Shoots a frost fire laser underneath it.",
        key: 79,
    },
    "frost_ignitor_laser_beam_left": {
        draw: function(x, y) {
            fill(175, 175, 255);
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == 0) {
                explode(x, y, 5, "frost_fire");
                return;
            }
            var exploded = false;
            forAllTouching(x, y, function(x1, y1) {
                if (!exploded && (((grid[y1][x1][0] != "air" || (grid[y1][x1][1] != "air" && grid[y1][x1][1] != "frost_fire")) && x1 - x == -1 && y1 == y) || (grid[y1][x1][0] != "air" && !grid[y1][x1][0].includes("frost_ignitor")))) {
                    explode(x, y, 5, "frost_fire");
                    exploded = true;
                }
            });
            if (!exploded) {
                move(x, y, [{ x: -1, y: 0 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor Laser Beam (Left)",
        description: "Explodes on impact.",
        key: -1,
    },
    "frost_ignitor_laser_beam_right": {
        draw: function(x, y) {
            fill(175, 175, 255);
            rect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                explode(x, y, 5, "frost_fire");
                return;
            }
            var exploded = false;
            forAllTouching(x, y, function(x1, y1) {
                if (!exploded && (((grid[y1][x1][0] != "air" || (grid[y1][x1][1] != "air" && grid[y1][x1][1] != "frost_fire")) && x1 - x == 1 && y1 == y) || (grid[y1][x1][0] != "air" && !grid[y1][x1][0].includes("frost_ignitor")))) {
                    explode(x, y, 5, "frost_fire");
                    exploded = true;
                }
            });
            if (!exploded) {
                move(x, y, [{ x: 1, y: 0 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor Laser Beam (Right)",
        description: "Explodes on impact.",
        key: -1,
    },
    "frost_ignitor_laser_beam_up": {
        draw: function(x, y) {
            fill(175, 175, 255);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == 0) {
                explode(x, y, 5, "frost_fire");
                return;
            }
            var exploded = false;
            forAllTouching(x, y, function(x1, y1) {
                if (!exploded && (((grid[y1][x1][0] != "air" || (grid[y1][x1][1] != "air" && grid[y1][x1][1] != "frost_fire")) && x1 == x && y1 - y == -1) || (grid[y1][x1][0] != "air" && !grid[y1][x1][0].includes("frost_ignitor")))) {
                    explode(x, y, 5, "frost_fire");
                    exploded = true;
                }
            });
            if (!exploded) {
                move(x, y, [{ x: 0, y: -1 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor Laser Beam (Up)",
        description: "Explodes on impact.",
        key: -1,
    },
    "frost_ignitor_laser_beam_down": {
        draw: function(x, y) {
            fill(175, 175, 255);
            rect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgb(175, 175, 255)";
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                explode(x, y, 5, "frost_fire");
                return;
            }
            var exploded = false;
            forAllTouching(x, y, function(x1, y1) {
                if (!exploded && (((grid[y1][x1][0] != "air" || (grid[y1][x1][1] != "air" && grid[y1][x1][1] != "frost_fire")) && x1 == x && y1 - y == 1) || (grid[y1][x1][0] != "air" && !grid[y1][x1][0].includes("frost_ignitor")))) {
                    explode(x, y, 5, "frost_fire");
                    exploded = true;
                }
            });
            if (!exploded) {
                move(x, y, [{ x: 0, y: 1 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: false,
        flammable: -10,
        blast_resistance: 10,
        name: "Frost Ignitor Laser Beam (Down)",
        description: "Explodes on impact.",
        key: -1,
    },
    "corruption": {
        draw: function(x, y) {
            fill(255, 25, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(0, 0, 0);
            rect(x * pixelSize + random(0, pixelSize / 2), y * pixelSize + random(0, pixelSize / 2), random(0, pixelSize / 2), random(0, pixelSize / 2));
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 25, 25)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (fall(x, y)) {
                return;
            }
            if (getTouchingDiagonal(x, y, "corruption", null) == 8) {
                return;
            }
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (grid[y1][x1][0] != "air" && grid[y1][x1][0] != "corruption" && random() < 1 / pixels[grid[y1][x1][0]].blast_resistance) {
                    changePixel(x1, y1, "corruption", null);
                }
            });
            flow(x, y, gridSize);
            if (y == gridSize - 1) {
                grid[y][x][0] = "corruption2";
                move(x, y, [{ x: 0, y: -gridSize + 1 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 0.2,
        blast_resistance: 1,
        name: "Corruption",
        description: "Please do not place this down. It will corrupt the game.",
        key: 81,
    },
    "corruption2": {
        draw: function(x, y) {
            fill(255, 255, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(0, 0, 0);
            rect(x * pixelSize + random(0, pixelSize / 2), y * pixelSize + random(0, pixelSize / 2), random(0, pixelSize / 2), random(0, pixelSize / 2));
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(255, 255, 25)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (fall(x, y)) {
                return;
            }
            if (getTouchingDiagonal(x, y, "corruption2", null) == 8) {
                return;
            }
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (grid[y1][x1][0] != "air" && grid[y1][x1][0] != "corruption2" && random() < 1 / pixels[grid[y1][x1][0]].blast_resistance) {
                    changePixel(x1, y1, "corruption2", null);
                }
            });
            flow(x, y);
            if (grid[x][y][0] != "corruption2" && random() < 0.05) {
                changePixel(y, x, "corruption2");
            }
            if (y == gridSize - 1) {
                move(x, y, [{ x: (x - gameTick * gameTick) % gridSize, y: -gridSize + 1 }]);
                move(x, y, [{ x: (x - gameTick * gameTick + 2) % gridSize, y: -gridSize + 1 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 0.2,
        blast_resistance: 1,
        name: "Corruption 2",
        description: "It's like Corruption but crazier.",
        key: 82,
    },
    "corruption3": {
        draw: function(x, y) {
            fill(25, 255, 255);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
            fill(0, 0, 0);
            rect(x * pixelSize + random(0, pixelSize / 2), y * pixelSize + random(0, pixelSize / 2), random(0, pixelSize / 2), random(0, pixelSize / 2));
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(25, 255, 255)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (fall(x, gridSize - y - 1)) {
                return;
            }
            if (getTouchingDiagonal(x, y, "corruption3", null) == 8) {
                explode(x, y, 15, "frost_fire");
                explode(x, y, 2, "corruption3");
                return;
            }
            forEachTouchingDiagonal(x, y, "air", null, function(x1, y1) {
                if (random() < 0.005) {
                    changePixel(x1, y1, "corruption3", null);
                }
            });
            if (flow(x, y, gridSize)) {
                nextGrid[y][x][0] = "corruption3";
            }
            if (y == gridSize - 1) {
                move(x, y, [{ x: round(random(0, 10) - 5), y: -gridSize + 1 }]);
            }
        },
        updateStage: 0,
        animated: false,
        density: 1,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 20,
        blast_resistance: 20,
        name: "Corruption 3",
        description: "It's like Corruption 2 but crazier.",
        key: 83,
    },
    "rgb_pixel": {
        draw: function(x, y) {
            fill(colorLerp(255, 125, 0, 0, 125, 255, 60));
            rect(x * pixelSize, y * pixelSize, pixelSize / 2, pixelSize / 2);
            fill(colorLerp(0, 255, 125, 255, 0, 125, 60));
            rect(x * pixelSize + pixelSize / 2, y * pixelSize, pixelSize / 2, pixelSize / 2);
            fill(colorLerp(255, 0, 125, 0, 255, 125, 60));
            rect(x * pixelSize, y * pixelSize + pixelSize / 2, pixelSize / 2, pixelSize / 2);
            fill(colorLerp(255, 255, 125, 255, 125, 125, 60));
            rect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 2, pixelSize / 2, pixelSize / 2);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(25, 25, 255)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {

        },
        updateStage: 0,
        animated: true,
        density: Infinity,
        effect: false,
        liquid: true,
        pushable: false,
        flammable: 0.1,
        blast_resistance: Infinity,
        name: "RGB Pixel",
        description: "Buh moment.",
        key: 84,
    },
    "life": {
        draw: function(x, y) {
            fill(25, 255, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(25, 255, 25)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            var touchingPixels = getTouchingDiagonal(x, y, "air", null);
            if (touchingPixels >= 7 || touchingPixels <= 4 && grid[y][x][1] != "frost_fire") {
                changePixel(x, y, "air", null);
            }
            forEachTouchingDiagonal(x, y, "air", null, function(x1, y1) {
                if (getTouchingDiagonal(x1, y1, "life", null) == 3) {
                    changePixel(x1, y1, "life", null);
                }
            });
        },
        updateStage: 0,
        animated: true,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 5,
        blast_resistance: 5,
        name: "Life",
        description: "Simulate life in Pixel Simulator.",
        key: 85,
    },
    "life_2": {
        draw: function(x, y) {
            fill(125, 255, 25);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 255, 25)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            var touchingPixels = getTouchingDiagonal(x, y, "air", null);
            if (touchingPixels >= 7 || touchingPixels <= 4 && grid[y][x][1] != "frost_fire") {
                if (random() < 0.05) {
                    return;
                }
                changePixel(x, y, "air", null);
            }
            forEachTouchingDiagonal(x, y, "air", null, function(x1, y1) {
                if (getTouchingDiagonal(x1, y1, "life_2", null) == 3) {
                    changePixel(x1, y1, "life_2", null);
                }
            });
        },
        updateStage: 0,
        animated: true,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 5,
        blast_resistance: 5,
        name: "Life 2",
        description: "Simulate life in Pixel Simulator. This varient has a 5% chance to survive, even if it has less than 2 or more than 3 neighbors.",
        key: 86,
    },
    "death": {
        draw: function(x, y) {
            fill(25, 50, 50);
            rect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(25, 50, 50)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (random() < 0.1) {
                changePixel(x, y, "air", null);
            }
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (random() < 0.1) {
                    changePixel(x1, y1, "death", null);
                }
            });
        },
        updateStage: 0,
        animated: true,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        flammable: 5,
        blast_resistance: 5,
        name: "Death",
        description: "Unsimulate life in Pixel Simulator.",
        key: 87,
    },
};