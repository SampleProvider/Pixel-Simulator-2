var pixels = {
    "air": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {

        },
        updateStage: -1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -5,
        blastResistance: 1,
        monster: false,
        name: "Air",
        description: "It's air. What did you expect?",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "dirt": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.dirt;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.dirt;
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "mud", null);
                return;
            }
            if (getTouchingDiagonalLessDense(x, y, pixels.dirt.density) >= 5) {
                fall(x, y, 0);
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 15,
        blastResistance: 1,
        monster: false,
        name: "Dirt",
        description: "Pretty dirty.",
        type: "A Pixel World",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "grass": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.grass;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.grass;
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "mud", null);
                return;
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
            if (getTouchingDiagonalLessDense(x, y, pixels.grass.density) >= 5) {
                fall(x, y, 0);
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 15,
        blastResistance: 1,
        monster: false,
        name: "Grass",
        description: "This grass is pretty OP. It can grow on cliffs and on the bottom of floating islands.",
        type: "A Pixel World",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "sand": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.sand;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.sand;
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, "sand", null) == 4) {
                return;
            }
            if (getTouchingDiagonal(x, y, "lava", null) >= 6) {
                changePixel(x, y, "quartz", null);
                return;
            }
            flow(x, y, 1, 0);
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Sand",
        description: "A fine, light-yellow powder. It likes to make pyramids.",
        type: "A Pixel World",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "water": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = "rgb(125, 225, 255)";
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = "rgba(25, 75, 175, 0.5)";
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, "water", null) == 4) {
                return;
            }
            flow(x, y, gridSize, 0);
        },
        updateStage: 0,
        updateDirection: "up",
        animated: true,
        drawNoise: true,
        density: 1,
        effect: false,
        liquid: true,
        pushable: true,
        whenPushed: 0,
        flammable: 0,
        blastResistance: 3,
        monster: false,
        name: "Water",
        description: "Flows everywhere. Not very realistic.",
        type: "A Pixel World",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "oak_wood": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.oak_wood_dark;
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize / 2, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.oak_wood_light;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.oak_wood_light;
            ctx.fillRect(30, 0, 30, 60);
            ctx.fillStyle = colors.oak_wood_dark;
            ctx.fillRect(0, 0, 30, 60);
        },
        update: function(x, y) {

        },
        updateStage: -1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 10,
        blastResistance: 3,
        monster: false,
        name: "Oak Wood",
        description: "A thick, rough, oak log.",
        type: "A Pixel World",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "leaf": {
        draw: function(x, y, ctx) {

        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.leaf;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.leaf;
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (!isTouchingDiagonal(x, y, "oak_wood", null) && !isTouchingDiagonal(x, y, "spruce_wood", null) && getTouchingDiagonal(x, y, "leaf", null) < 2) {
                if (getRandom() < 0.1) {
                    changePixel(x, y, "sapling", null);
                }
                else {
                    changePixel(x, y, "air", null);
                }
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 5,
        blastResistance: 1,
        monster: false,
        name: "Leaf",
        description: "A nice, springy leaf. Drops saplings when it decays.",
        type: "A Pixel World",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "sapling": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.oak_wood_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors.sapling;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 40, 20, 20);
            ctx.fillRect(40, 40, 20, 20);
            ctx.fillStyle = colors.sapling;
            ctx.fillRect(0, 0, 60, 40);
            ctx.fillStyle = colors.oak_wood_dark;
            ctx.fillRect(20, 40, 20, 20);
        },
        update: function(x, y) {
            if (fall(x, y, 0)) {
                return;
            }
            if (y != gridSize - 1 && getRandom() < 0.01) {
                if (grid[y + 1][x][0] == "dirt") {
                    var direction = [0, -1];
                    var length = random(8, 14);
                    var stemPixel = "oak_wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 21, function(x, y, length) { return true; });
                }
                if (grid[y + 1][x][0] == "grass") {
                    var direction = [0, -1];
                    var length = random(12, 18);
                    var stemPixel = "oak_wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 14, length * 2, function(distance) { return true; });
                }
                if (grid[y + 1][x][0] == "sand") {
                    var direction = [0, -1];
                    var length = random(16, 24);
                    var stemPixel = "oak_wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0, 0, 0, length, function(distance) { return getRandom() < 0.5; });
                }
                if (grid[y + 1][x][0] == "mud") {
                    var direction = [0, -1];
                    var length = random(6, 10);
                    var stemPixel = "oak_wood";
                    var leafPixel = "leaf";
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.15, 1, 7, length * 4, function(distance) { return true; });
                }
                // else if (grid[y + 1][x][0] == "dried_mud") {
                //     var direction = [0, -1];
                //     var length = random(4, 8);
                //     var stemPixel = "oak_wood";
                //     var leafPixel = "leaf";
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.2, 2, 7, length, function(distance) { return getRandom() < 1 / distance; });
                // }
                // else if (grid[y + 1][x][0] == "snow") {
                //     var direction = [0, -1];
                //     var length = random(8, 14);
                //     var stemPixel = "spruce_wood";
                //     var leafPixel = "snow";
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.05, 2, 21, length, function(distance) { return true; });
                // }
                // else if (grid[y + 1][x][0] == "ice") {
                //     var direction = [0, -1];
                //     var length = random(8, 10);
                //     var stemPixel = "spruce_wood";
                //     var leafPixel = "ice";
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.2, 3, 7, length, function(distance) { return getRandom() < 0.25; });
                // }
                // else if (grid[y + 1][x][0] == "slush") {
                //     var direction = [0, -1];
                //     var length = random(6, 10);
                //     var stemPixel = "spruce_wood";
                //     var leafPixel = "slush";
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.05, 2, 14, length * 2, function(distance) { return getRandom() < 0.75; });
                // }
                // else if (grid[y + 1][x][0] == "silt") {
                //     var direction = [0, -1];
                //     var length = random(8, 16);
                //     var stemPixel = "oak_wood";
                //     var leafPixel = "ash";
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.05, 2, 14, length, function(distance) { return true; });
                // }
                // else if (grid[y + 1][x][0] == "obsidian") {
                //     var direction = [0, -1];
                //     var length = random(8, 16);
                //     var stemPixel = "basalt";
                //     var leafPixel = "stone";
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.05, 2, 14, length / 2, function(distance) { return getRandom() < 5 / distance; });
                // }
                // else if (grid[y + 1][x][0] == "quartz") {
                //     var direction = [0, -1];
                //     var length = random(12, 22);
                //     var stemPixel = "spruce_wood";
                //     var leafPixel = "quartz";
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 14, length * 9, function(distance) { return getRandom() < 0.5; });
                // }
                // else if (grid[y + 1][x][0] == "steam") {
                //     var direction = [0, -1];
                //     var length = random(36, 60);
                //     var stemPixel = "spruce_wood";
                //     var leafPixel = "steam";
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.5, 1, 3, 1, length * 16, function(distance) { return getRandom() < 0.5; });
                // }
                // else if (grid[y + 1][x][0] == "explosives") {
                //     explode(x, y, 50, "fire", 25, 25);
                // }
                // else if (grid[y + 1][x][0] == "frost_explosives") {
                //     explode(x, y, 50, "frost_fire", 25, 25);
                // }
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 15,
        blastResistance: 1,
        monster: false,
        name: "Sapling",
        description: "Plant it and see what grows!",
        type: "A Pixel World",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "mud": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.mud);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (!isTouchingDiagonal(x, y, "water", null) && getRandom() < 0.05 || isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire")) {
                changePixel(x, y, "dried_mud", null);
                return;
            }
            if (getTouchingDiagonalLessDense(x, y, pixels.dirt.density) >= 4) {
                flow(x, y, 4, 0);
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: true,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 25,
        blastResistance: 3,
        monster: false,
        name: "Mud",
        description: "It's like dirt, but wet and slightly liquid.",
        type: "A Pixel World",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "dried_mud": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.dried_mud);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "mud", null);
                return;
            }
            if (getTouchingDiagonalLessDense(x, y, pixels.dirt.density) >= 6) {
                fall(x, y, 0);
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: true,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 5,
        blastResistance: 3,
        monster: false,
        name: "Dried Mud",
        description: "Extremely flammable.",
        type: "A Pixel World",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "lava": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
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
                        else if (touchingLava >= 3 && getRandom() < 0.5) {
                            changePixel(x1, y1, "basalt", null);
                        }
                        else {
                            changePixel(x1, y1, "stone", null);
                        }
                        changePixel(x, y, "steam", null);
                    }
                    else {
                        if (touchingLava >= 5) {
                            changePixel(x, y, "obsidian", null);
                        }
                        else if (touchingLava >= 3 && getRandom() < 0.5) {
                            changePixel(x, y, "basalt", null);
                        }
                        else {
                            changePixel(x, y, "stone", null);
                        }
                        changePixel(x1, y1, "steam", null);
                    }
                }
                else if (grid[y1][x1][0] == "grass") {
                    changePixel(x1, y1, "dirt", null);
                }
                if (grid[y1][x1][1] == "air" && grid[y1][x1][0] != "lava" && getRandom() < 0.1) {
                    changePixel(x1, y1, null, "fire");
                }
            });
            if (getRandom() < 0.25) {
                flow(x, y, gridSize, 0);
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: true,
        drawNoise: true,
        density: 1,
        effect: false,
        liquid: true,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 3,
        monster: false,
        name: "Lava",
        description: "Extremely hot and melts rocks. Burns flammable pixels. Flows everywhere but slowly. Water can cool it into rocks.",
        type: "Pixel Volcano",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "fire": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colorTintTransparent(colors.fire_transparent, randomGrid[y][x][0] / 2 + 0.3, randomGrid[y][x][0]);
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.fire_dark;
            ctx.fillRect(10, 20, 30, 10);
            ctx.fillRect(10, 30, 40, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 0, 10, 10);
            ctx.fillRect(30, 0, 10, 10);
            ctx.fillRect(20, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillStyle = colors.fire_light;
            ctx.fillRect(20, 30, 20, 20);
            ctx.fillRect(20, 20, 10, 10);
        },
        update: function(x, y) {
            if (pixels[grid[y][x][0]].flammable == 0 || grid[y][x][0] == "lava") {
                if (getRandom() < 0.5 && grid[y][x][0] == "water") {
                    changePixel(x, y, "steam", "air");
                    return;
                }
                else {
                    changePixel(x, y, null, "air");
                    return;
                }
            }
            if (pixels[grid[y][x][0]].flammable < 0 && getRandom() < -1 / pixels[grid[y][x][0]].flammable) {
                changePixel(x, y, null, "air");
                return;
            }
            if (getTouchingDiagonal(x, y, "air", null) == 0 && getRandom() < 0.5) {
                changePixel(x, y, null, "air");
                return;
            }
            if (getRandom() < 1 / (pixels[grid[y][x][0]].flammable * 10)) {
                if (getRandom() < 0.25) {
                    changePixel(x, y, "ash", null);
                    return;
                }
                else {
                    changePixel(x, y, "air", null);
                    return;
                }
            }
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (pixels[grid[y1][x1][0]].flammable == 0) {
                    if (getRandom() < 0.05) {
                        changePixel(x, y, null, "air");
                        if (grid[y1][x1][0] == "water") {
                            changePixel(x1, y1, "steam", null);
                        }
                    }
                }
                else if (grid[y1][x1][1] != "fire" && pixels[grid[y1][x1][0]].flammable > 0 && getRandom() < 1 / pixels[grid[y1][x1][0]].flammable) {
                    changePixel(x1, y1, null, "fire");
                }
            });
            var moveRandom = getRandom();
            if (moveRandom > 0.5) {
                if (y != 0) {
                    if (grid[y - 1][x][1] != "fire" && (pixels[grid[y - 1][x][0]].flammable > 0 || grid[y - 1][x][0] == "air") && getRandom() < 5 / Math.abs(pixels[grid[y - 1][x][0]].flammable)) {
                        if (move(x, y, [{ x: 0, y: -1 }], 1)) {
                            if (getRandom() < pixels[grid[y][x][0]].flammable > 0 ? 0.75 : 0.25) {
                                nextGrid[y][x][1] = "fire";
                            }
                        }
                    }
                }
            }
            else if (moveRandom < 0.1) {
                if (y != gridSize - 1) {
                    if (grid[y + 1][x][1] != "fire" && (pixels[grid[y + 1][x][0]].flammable > 0 || grid[y + 1][x][0] == "air") && getRandom() < 5 / Math.abs(pixels[grid[y + 1][x][0]].flammable)) {
                        move(x, y, [{ x: 0, y: 1 }], 1);
                    }
                }
            }
            // else if (moveRandom < 0.15) {
            //     if (x != 0) {
            //         if (grid[y][x - 1][1] != "fire" && (pixels[grid[y][x - 1][0]].flammable > 0 || grid[y][x - 1][0] == "air") && getRandom() < 5 / Math.abs(pixels[grid[y][x - 1][0]].flammable)) {
            //             move(x, y, [{ x: -1, y: 0 }], 1);
            //         }
            //     }
            // }
            // else if (moveRandom < 0.2) {
            //     if (x != gridSize - 1) {
            //         if (grid[y][x + 1][1] != "fire" && (pixels[grid[y][x + 1][0]].flammable > 0 || grid[y][x + 1][0] == "air") && getRandom() < 5 / Math.abs(pixels[grid[y][x + 1][0]].flammable)) {
            //             move(x, y, [{ x: 1, y: 0 }], 1);
            //         }
            //     }
            // }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: 1,
        effect: true,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Fire",
        description: "Super hot! Burns flammable pixels.",
        type: "Pixel Volcano",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "steam": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.steam);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getRandom() < 0.01) {
                changePixel(x, y, "water", null);
                return;
            }
            var burned = false;
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (grid[y1][x1][1] != "fire" && pixels[grid[y1][x1][0]].flammable > 0 && getRandom() < 1 / pixels[grid[y1][x1][0]].flammable) {
                    burned = true;
                    changePixel(x1, y1, null, "fire");
                }
            });
            if (burned) {
                changePixel(x, y, "water", null);
                return;
            }
            ascend(x, y, gridSize, 0);
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: true,
        density: 0,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Steam",
        description: "Hot water steam.",
        type: "Pixel Volcano",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "quartz": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.quartz);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {

        },
        updateStage: -1,
        updateDirection: null,
        animated: false,
        drawNoise: true,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 10,
        monster: false,
        name: "Quartz",
        description: "A perfectly smooth quartz crystal.",
        type: "Pixel Volcano",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "ash": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.ash);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "silt", null);
                return;
            }
            flow(x, y, 2, 0);
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: true,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 50,
        blastResistance: 1,
        monster: false,
        name: "Ash",
        description: "A semi-liquid black dust. Can sustain fires.",
        type: "Pixel Volcano",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "silt": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.silt);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if ((isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire")) && !isTouchingDiagonal(x, y, "water", null) && getRandom() < 0.1) {
                changePixel(x, y, "ash", null);
                return;
            }
            flow(x, y, 2, 0);
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: true,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -1,
        blastResistance: 1,
        monster: false,
        name: "Silt",
        description: "A compact mixture of water and ash. It's has a rough gravel texture.",
        type: "Pixel Volcano",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "stone": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
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
        updateDirection: "up",
        animated: false,
        drawNoise: true,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Stone",
        description: "Very sturdy and dense. Lava can melt it easily.",
        type: "Pixel Volcano",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "basalt": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.basalt);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonal(x, y, "lava", null) >= 4 && !isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "lava", null);
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: true,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 15,
        monster: false,
        name: "Basalt",
        description: "A hard, volcanic, rock. Very blast resistant. BUH-salt.",
        type: "Pixel Volcano",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "obsidian": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.obsidian);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonal(x, y, "lava", null) >= 7 && !isTouchingDiagonal(x, y, "water", null)) {
                changePixel(x, y, "lava", null);
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: true,
        density: 4,
        effect: false,
        liquid: false,
        pushable: false,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 25,
        monster: false,
        name: "Obsidian",
        description: "A smooth, very blast resistant rock. Hard to move.",
        type: "Pixel Volcano",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "gunpowder": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.gunpowder);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (grid[y][x][1] == "fire") {
                explode(x, y, 4, "fire", 0.25, 2);
            }
            else {
                flow(x, y, 1, 0);
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: true,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 10,
        blastResistance: 1,
        monster: false,
        name: "Gunpowder",
        description: "Explodes when lit on fire. Not very powerful, but spreads lots of fire.",
        type: "Pixel Volcano",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "snow": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.snow;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.snow;
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire") || grid[x][y][1] == "fire") {
                changePixel(x, y, "water", null);
                return;
            }
            forEachTouchingDiagonal(x, y, "water", null, function(x1, y1) {
                changePixel(x1, y1, "ice", null);
            });
            forEachTouchingDiagonal(x, y, "steam", null, function(x1, y1) {
                changePixel(x1, y1, "water", null);
            });
            forEachTouchingDiagonal(x, y, "silt", null, function(x1, y1) {
                changePixel(x1, y1, "slush", null);
            });
            fall(x, y, 0);
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Snow",
        description: "Cold! Will freeze water.",
        type: "Frozen Tundra",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "ice": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.ice_dark;
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.ice_light;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.ice_light;
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire") || grid[y][x][1] == "fire") {
                changePixel(x, y, "water", null);
                return;
            }
            forEachTouchingDiagonal(x, y, "water", null, function(x1, y1) {
                changePixel(x1, y1, "ice", null);
            });
            forEachTouchingDiagonal(x, y, "steam", null, function(x1, y1) {
                changePixel(x1, y1, "water", null);
            });
            forEachTouchingDiagonal(x, y, "silt", null, function(x1, y1) {
                changePixel(x1, y1, "slush", null);
            });
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (grid[y1][x1][1] == "air" && grid[y1][x1][0] != "ice" && getRandom() < 0.1) {
                    changePixel(x1, y1, null, "frost_fire");
                }
            });
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 3,
        monster: false,
        name: "Ice",
        description: "Freezing! Can melt.",
        type: "Frozen Tundra",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "slush": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.slush);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if ((isTouchingDiagonal(x, y, "lava", null) || isTouchingDiagonal(x, y, null, "fire")) && !isTouchingDiagonal(x, y, "water", null) && !isTouchingDiagonal(x, y, "ice", null) && getRandom() < 0.1) {
                if (getRandom() < 0.5) {
                    changePixel(x, y, "water", null);
                    return;
                }
                else {
                    changePixel(x, y, "ash", null);
                    return;
                }
            }
            forEachTouchingDiagonal(x, y, "water", null, function(x1, y1) {
                changePixel(x1, y1, "ice", null);
            });
            forEachTouchingDiagonal(x, y, "steam", null, function(x1, y1) {
                changePixel(x1, y1, "water", null);
            });
            forEachTouchingDiagonal(x, y, "silt", null, function(x1, y1) {
                changePixel(x1, y1, "slush", null);
            });
            if (getRandom() < 0.5) {
                flow(x, y, 1, 0);
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: true,
        density: 3,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -1,
        blastResistance: 1,
        monster: false,
        name: "Slush",
        description: "Frozen silt. ",
        type: "Frozen Tundra",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "frost_fire": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colorTintTransparent(colors.frost_fire_transparent, randomGrid[y][x][0] / 2 + 0.3, randomGrid[y][x][1]);
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_fire_dark;
            ctx.fillRect(10, 20, 30, 10);
            ctx.fillRect(10, 30, 40, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 0, 10, 10);
            ctx.fillRect(30, 0, 10, 10);
            ctx.fillRect(20, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillStyle = colors.frost_fire_light;
            ctx.fillRect(20, 30, 20, 20);
            ctx.fillRect(20, 20, 10, 10);
        },
        update: function(x, y) {
            if (grid[y][x][0] == "air" && getRandom() < 0.2) {
                changePixel(x, y, null, "air");
                return;
            }
            forEachTouchingDiagonal(x, y, "water", null, function(x1, y1) {
                changePixel(x1, y1, "ice", null);
            });
            forEachTouchingDiagonal(x, y, "silt", null, function(x1, y1) {
                changePixel(x1, y1, "slush", null);
            });
            if (!isTouchingDiagonal("ice")) {
                if (isTouchingDiagonal(x, y, "lava", null) || grid[y][x][0] == "lava") {
                    changePixel(x, y, null, "air");
                    return;
                }
                if (isTouchingDiagonal(x, y, null, "fire") || grid[y][x][1] == "fire") {
                    forEachTouchingDiagonal(x, y, null, "fire", function(x1, y1) {
                        changePixel(x1, y1, null, "air");
                    });
                    changePixel(x, y, null, "air");
                    return;
                }
            }
            if (grid[y][x][0] == "air") {
                var moveRandom = getRandom();
                if (moveRandom > 0.5) {
                    if (y != 0) {
                        if (grid[y - 1][x][1] != "frost_fire") {
                            if (move(x, y, [{ x: 0, y: -1 }], 1)) {
                                if (nextGrid[y][x][1] == "air" && getRandom() < 0.5) {
                                    nextGrid[y][x][1] = "frost_fire";
                                }
                            }
                        }
                    }
                }
                else if (moveRandom < 0.1) {
                    if (y != gridSize - 1) {
                        if (grid[y + 1][x][1] != "frost_fire") {
                            move(x, y, [{ x: 0, y: 1 }], 1);
                        }
                    }
                }
                // else if (moveRandom < 0.15) {
                //     if (x != 0) {
                //         if (grid[y][x - 1][1] != "frost_fire") {
                //             move(x, y, [{ x: -1, y: 0 }], 1);
                //         }
                //     }
                // }
                // else if (moveRandom < 0.2) {
                //     if (x != gridSize - 1) {
                //         if (grid[y][x + 1][1] != "frost_fire") {
                //             move(x, y, [{ x: 1, y: 0 }], 1);
                //         }
                //     }
                // }
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: 1,
        effect: true,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Frost Fire",
        description: "Super cold! Freezes pixels and makes them function 9 times slower!",
        type: "Frozen Tundra",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "spruce_wood": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.spruce_wood_dark;
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize / 2, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.spruce_wood_light;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.spruce_wood_light;
            ctx.fillRect(30, 0, 30, 60);
            ctx.fillStyle = colors.spruce_wood_dark;
            ctx.fillRect(0, 0, 30, 60);
        },
        update: function(x, y) {

        },
        updateStage: -1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 10,
        blastResistance: 5,
        monster: false,
        name: "Spruce Wood",
        description: "A hard piece of spruce wood.",
        type: "Frozen Tundra",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "piston_left": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            push(x + 1, y, "left", gridSize);
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Piston (Left)",
        description: "Pushes pixels to the left.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "piston_right": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(40, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            push(x - 1, y, "right", gridSize);
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Piston (Right)",
        description: "Pushes pixels to the right.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "piston_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 10);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            push(x, y + 1, "up", gridSize);
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Piston (Up)",
        description: "Pushes pixels upwards.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "piston_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 40, 40, 10);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            push(x, y - 1, "down", gridSize);
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Piston (Down)",
        description: "Pushes pixels downwards.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "cloner_left": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillStyle = colors.clone_lerp;
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 10, 40);
            ctx.fillStyle = colors.clone;
            ctx.fillRect(50, 10, 10, 40);
            ctx.fillRect(40, 20, 10, 20);
        },
        update: function(x, y) {
            if (x == 0 || x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (grid[y][x + 1][0] != "air" && pixels[grid[y][x - 1][0]].pushable && pixels[grid[y][x + 1][0]].pushable && push(x, y, "left", gridSize)) {
                setPixel(x - 1, y, grid[y][x + 1][0], grid[y][x + 1][1]);
            }
            else if (pixels[grid[y][x - 1][0]].whenPushed == 1) {
                setPixel(x - 1, y, "air", "air");
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Cloner (Left)",
        description: "Clones the pixel on the right. The cloned pixel is pushed on the left. Cannot clone unpushable pixels.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "cloner_right": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillStyle = colors.clone_lerp;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(40, 10, 10, 40);
            ctx.fillStyle = colors.clone;
            ctx.fillRect(0, 10, 10, 40);
            ctx.fillRect(10, 20, 10, 20);
        },
        update: function(x, y) {
            if (x == 0 || x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (grid[y][x - 1][0] != "air" && pixels[grid[y][x - 1][0]].pushable && pixels[grid[y][x + 1][0]].pushable && push(x, y, "right", gridSize)) {
                setPixel(x + 1, y, grid[y][x - 1][0], grid[y][x - 1][1]);
            }
            else if (pixels[grid[y][x + 1][0]].whenPushed == 1) {
                setPixel(x + 1, y, "air", "air");
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Cloner (Right)",
        description: "Clones the pixel on the left. The cloned pixel is pushed on the right. Cannot clone unpushable pixels.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "cloner_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 6);
            ctx.fillStyle = colors.clone_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 5 / 6, pixelSize * 2 / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 10);
            ctx.fillStyle = colors.clone;
            ctx.fillRect(10, 50, 40, 10);
            ctx.fillRect(20, 40, 20, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (grid[y + 1][x][0] != "air" && pixels[grid[y - 1][x][0]].pushable && pixels[grid[y + 1][x][0]].pushable && push(x, y, "up", gridSize)) {
                setPixel(x, y - 1, grid[y + 1][x][0], grid[y + 1][x][1]);
            }
            else if (pixels[grid[y - 1][x][0]].whenPushed == 1) {
                setPixel(x, y - 1, "air", "air");
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Cloner (Up)",
        description: "Clones the pixel below it. The cloned pixel is pushed upwards. Cannot clone unpushable pixels.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "cloner_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize * 2 / 3, pixelSize / 6);
            ctx.fillStyle = colors.clone_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize * 2 / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 40, 40, 10);
            ctx.fillStyle = colors.clone;
            ctx.fillRect(10, 0, 40, 10);
            ctx.fillRect(20, 10, 20, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (grid[y - 1][x][0] != "air" && pixels[grid[y - 1][x][0]].pushable && pixels[grid[y + 1][x][0]].pushable && push(x, y, "down", gridSize)) {
                setPixel(x, y + 1, grid[y - 1][x][0], grid[y - 1][x][1]);
            }
            else if (pixels[grid[y + 1][x][0]].whenPushed == 1) {
                setPixel(x, y + 1, "air", "air");
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Cloner (Down)",
        description: "Clones the pixel above it. The cloned pixel is pushed downwards. Cannot clone unpushable pixels.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "penetrator_left": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 2, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(0, 20, 30, 20);
            ctx.fillRect(20, 10, 20, 10);
            ctx.fillRect(20, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            var leftPixel = [grid[y][x - 1][0], grid[y][x - 1][1]];
            if (pixels[leftPixel[0]].whenPushed > 0) {
                setPixel(x, y, "air", "air");
                if (pixels[leftPixel[0]].whenPushed == 1) {
                    setPixel(x - 1, y, "air", "air");
                }
                return;
            }
            if (pixels[leftPixel[0]].whenPushed == -1) {
                setPixel(x, y, "air", "air");
                setPixel(x - 1, y, "penetrator_left");
                return;
            }
            if (!pixels[leftPixel[0]].pushable || leftPixel[0] == "slider_vertical") {
                return;
            }
            setPixel(x - 1, y, grid[y][x][0], grid[y][x][1]);
            setPixel(x, y, leftPixel[0], leftPixel[1]);
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Penetrator (Left)",
        description: "Swaps the pixel to the left of it with itself. Piston + Swapper.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "penetrator_right": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 3, pixelSize / 2, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(30, 20, 30, 20);
            ctx.fillRect(20, 10, 20, 10);
            ctx.fillRect(20, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            var rightPixel = [grid[y][x + 1][0], grid[y][x + 1][1]];
            if (pixels[rightPixel[0]].whenPushed > 0) {
                setPixel(x, y, "air", "air");
                if (pixels[rightPixel[0]].whenPushed == 1) {
                    setPixel(x + 1, y, "air", "air");
                }
                return;
            }
            if (pixels[rightPixel[0]].whenPushed == -1) {
                setPixel(x, y, "air", "air");
                setPixel(x + 1, y, "penetrator_right", null);
                return;
            }
            if (!pixels[rightPixel[0]].pushable || rightPixel[0] == "slider_vertical") {
                return;
            }
            setPixel(x + 1, y, grid[y][x][0], grid[y][x][1]);
            setPixel(x, y, rightPixel[0], rightPixel[1]);
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Penetrator (Right)",
        description: "Swaps the pixel to the right of it with itself. Piston + Swapper.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "penetrator_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 2);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(20, 0, 20, 30);
            ctx.fillRect(10, 20, 10, 20);
            ctx.fillRect(40, 20, 10, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            var abovePixel = [grid[y - 1][x][0], grid[y - 1][x][1]];
            if (pixels[abovePixel[0]].whenPushed > 0) {
                setPixel(x, y, "air", "air");
                if (pixels[abovePixel[0]].whenPushed == 1) {
                    setPixel(x, y - 1, "air", "air");
                }
                return;
            }
            if (pixels[abovePixel[0]].whenPushed == -1) {
                setPixel(x, y, "air", "air");
                setPixel(x, y - 1, "penetrator_up", null);
                return;
            }
            if (!pixels[abovePixel[0]].pushable || abovePixel[0] == "slider_horizontal") {
                return;
            }
            setPixel(x, y - 1, grid[y][x][0], grid[y][x][1]);
            setPixel(x, y, abovePixel[0], abovePixel[1]);
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Penetrator (Up)",
        description: "Swaps the pixel above it with itself. Piston + Swapper.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "penetrator_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 2, pixelSize / 3, pixelSize / 2);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(20, 30, 20, 30);
            ctx.fillRect(10, 20, 10, 20);
            ctx.fillRect(40, 20, 10, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            var belowPixel = [grid[y + 1][x][0], grid[y + 1][x][1]];
            if (pixels[belowPixel[0]].whenPushed > 0) {
                setPixel(x, y, "air", "air");
                if (pixels[belowPixel[0]].whenPushed == 1) {
                    setPixel(x, y + 1, "air", "air");
                }
                return;
            }
            if (pixels[belowPixel[0]].whenPushed == -1) {
                setPixel(x, y, "air", "air");
                setPixel(x, y + 1, "penetrator_down", null);
                return;
            }
            if (!pixels[belowPixel[0]].pushable || belowPixel[0] == "slider_horizontal") {
                return;
            }
            setPixel(x, y + 1, grid[y][x][0], grid[y][x][1]);
            setPixel(x, y, belowPixel[0], belowPixel[1]);
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Penetrator (Down)",
        description: "Swaps the pixel below it with itself. Piston + Swapper.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "rotator_clockwise": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 2, pixelSize / 6);
            ctx.fillStyle = colors.clone_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 2, pixelSize / 2, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 10, 10, 40);
            ctx.fillRect(0, 20, 30, 10);
            ctx.fillStyle = colors.clone;
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(40, 10, 10, 40);
            ctx.fillRect(30, 30, 30, 10);
        },
        update: function(x, y) {
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            forAllTouching(x, y, function(x1, y1) {
                if (grid[y1][x1][0].includes("_left")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_left", "_up"), null);
                }
                else if (grid[y1][x1][0].includes("_up")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_up", "_right"), null);
                }
                else if (grid[y1][x1][0].includes("_right")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_right", "_down"), null);
                }
                else if (grid[y1][x1][0].includes("_down")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_down", "_left"), null);
                }
                else if (grid[y1][x1][0].includes("_horizontal")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_horizontal", "_vertical"), null);
                }
                else if (grid[y1][x1][0].includes("_vertical")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_vertical", "_horizontal"), null);
                }
            });
        },
        updateStage: 2,
        updateDirection: "up",
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Rotator (Clockwise)",
        description: "Rotates pixels 90 degrees clockwise.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "rotator_counter_clockwise": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 2, pixelSize / 2, pixelSize / 6);
            ctx.fillStyle = colors.clone_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 3, pixelSize / 2, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 10, 40);
            ctx.fillRect(0, 30, 30, 10);
            ctx.fillStyle = colors.clone;
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(40, 10, 10, 40);
            ctx.fillRect(30, 20, 30, 10);
        },
        update: function(x, y) {
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            forAllTouching(x, y, function(x1, y1) {
                if (grid[y1][x1][0].includes("_left")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_left", "_down"), null);
                }
                else if (grid[y1][x1][0].includes("_down")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_down", "_right"), null);
                }
                else if (grid[y1][x1][0].includes("_right")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_right", "_up"), null);
                }
                else if (grid[y1][x1][0].includes("_up")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_up", "_left"), null);
                }
                else if (grid[y1][x1][0].includes("_horizontal")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_horizontal", "_vertical"), null);
                }
                else if (grid[y1][x1][0].includes("_vertical")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_vertical", "_horizontal"), null);
                }
            });
        },
        updateStage: 2,
        updateDirection: "up",
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Rotator (Counter Clockwise)",
        description: "Rotates pixels 90 degrees counter clockwise.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "alternator": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize / 6, pixelSize);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 2, pixelSize / 6);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 2, pixelSize / 6);
            ctx.fillStyle = colors.clone_lerp;
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 6, pixelSize);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 2, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize * 2 / 3, pixelSize / 2, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(10, 0, 10, 60);
            ctx.fillRect(0, 10, 30, 10);
            ctx.fillRect(0, 40, 30, 10);
            ctx.fillStyle = colors.clone;
            ctx.fillRect(40, 0, 10, 60);
            ctx.fillRect(30, 10, 30, 10);
            ctx.fillRect(30, 40, 30, 10);
        },
        update: function(x, y) {
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            forAllTouching(x, y, function(x1, y1) {
                if (grid[y1][x1][0].includes("_left")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_left", "_right"), null);
                }
                else if (grid[y1][x1][0].includes("_right")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_right", "_left"), null);
                }
                else if (grid[y1][x1][0].includes("_up")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_up", "_down"), null);
                }
                else if (grid[y1][x1][0].includes("_down")) {
                    setPixel(x1, y1, grid[y1][x1][0].replace("_down", "_up"), null);
                }
            });
        },
        updateStage: 2,
        updateDirection: "up",
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Alternator",
        description: "Rotates pixels 180 degrees.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "deleter": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            // ctx.fillRect(20, 0, 20, 10);
            // ctx.fillRect(0, 10, 60, 10);
            // ctx.fillRect(10, 20, 10, 30);
            // ctx.fillRect(40, 20, 10, 30);
            // ctx.fillRect(10, 50, 40, 10);
            // ctx.fillRect(0, 0, 10, 10);
            ctx.fillRect(10, 10, 10, 10);
            // ctx.fillRect(50, 0, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            // ctx.fillRect(0, 50, 10, 10);
            ctx.fillRect(10, 40, 10, 10);
            // ctx.fillRect(50, 50, 10, 10);
            ctx.fillRect(40, 40, 10, 10);
            ctx.fillRect(20, 20, 20, 20);
        },
        update: function(x, y) {
        },
        updateStage: -1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 0,
        liquid: false,
        pushable: true,
        whenPushed: 2,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Deleter",
        description: "Deletes pixels.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "swapper_horizontal": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 5 / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 6, pixelSize / 2);
            ctx.fillStyle = colors.clone_lerp;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize * 5 / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 2);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(10, 10, 50, 10);
            ctx.fillRect(40, 0, 10, 30);
            ctx.fillStyle = colors.clone;
            ctx.fillRect(0, 40, 50, 10);
            ctx.fillRect(10, 30, 10, 30);
            // ctx.fillRect(0, 10, 10, 40);
            // ctx.fillRect(10, 20, 10, 20);
            // ctx.fillRect(40, 20, 10, 20);
            // ctx.fillRect(50, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == 0 || x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            var leftPixel = [grid[y][x - 1][0], grid[y][x - 1][1]];
            setPixel(x - 1, y, grid[y][x + 1][0], grid[y][x + 1][1]);
            setPixel(x + 1, y, leftPixel[0], leftPixel[1]);
        },
        updateStage: 2,
        updateDirection: "up",
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Swapper (Horizontal)",
        description: "Swaps the pixels on its left and right.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "swapper_vertical": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 5 / 6);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 2, pixelSize / 6);
            ctx.fillStyle = colors.clone_lerp;
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 6, pixelSize * 5 / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 2, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(10, 10, 10, 50);
            ctx.fillRect(0, 40, 30, 10);
            ctx.fillStyle = colors.clone;
            ctx.fillRect(40, 0, 10, 50);
            ctx.fillRect(30, 10, 30, 10);
            // ctx.fillStyle = colors.clone;
            // ctx.fillRect(10, 0, 40, 10);
            // ctx.fillRect(20, 10, 20, 10);
            // ctx.fillRect(20, 40, 20, 10);
            // ctx.fillRect(10, 50, 40, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            var abovePixel = [grid[y - 1][x][0], grid[y - 1][x][1]];
            setPixel(x, y - 1, grid[y + 1][x][0], grid[y + 1][x][1]);
            setPixel(x, y + 1, abovePixel[0], abovePixel[1]);
        },
        updateStage: 1,
        updateDirection: "left",
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Swapper (Vertical)",
        description: "Swaps the pixels above it and below it.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "slider_horizontal": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {

        },
        updateStage: -1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 10,
        blastResistance: 5,
        monster: false,
        name: "Slider (Horizontal)",
        description: "Can only be pushed horizontally.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "slider_vertical": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {

        },
        updateStage: -1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 10,
        blastResistance: 5,
        monster: false,
        name: "Slider (Vertical)",
        description: "Can only be pushed vertically.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "collapsable": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.push_lerp;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors.stone);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.push;
            ctx.fillRect(0, 20, 60, 20);
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {

        },
        updateStage: -1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 2,
        liquid: false,
        pushable: true,
        whenPushed: -1,
        flammable: 10,
        blastResistance: 1,
        monster: false,
        name: "Collapsable",
        description: "Collapses when pushed.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "reflector_horizontal": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.reflector;
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 2, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.reflector;
            ctx.fillRect(0, 0, 20, 20);
            ctx.fillRect(10, 10, 20, 20);
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillRect(30, 30, 20, 20);
            ctx.fillRect(40, 40, 20, 20);
        },
        update: function(x, y) {

        },
        updateStage: -1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Reflector (Horizontal)",
        description: "Can reflect lasers.",
        type: "Mechanical Movement",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "reflector_vertical": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.reflector;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.reflector;
            ctx.fillRect(0, 40, 20, 20);
            ctx.fillRect(10, 30, 20, 20);
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillRect(30, 10, 20, 20);
            ctx.fillRect(40, 0, 20, 20);
        },
        update: function(x, y) {

        },
        updateStage: -1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Reflector (Vertical)",
        description: "Can reflect lasers.",
        type: "Mechanical Movement",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "explosives": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(50, 20, 10, 20);
        },
        update: function(x, y) {
            if (grid[y][x][1] == "fire") {
                // if (isTouchingDiagonal(x, y, null, "fire") || grid[y][x][1] == "fire") {
                explode(x, y, 10, "fire", 1, 0.25);
            }
            else {
                fall(x, y, 0);
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 10,
        blastResistance: 3,
        monster: false,
        name: "Explosives",
        description: "Explodes when lit on fire.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_left": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (pixels[grid[y][x - 1][0]].flammable != 0) {
                grid[y][x - 1][1] = "fire";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor (Left)",
        description: "Lights the pixel to the left of it on fire.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_right": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(30, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (pixels[grid[y][x + 1][0]].flammable != 0) {
                grid[y][x + 1][1] = "fire";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor (Right)",
        description: "Lights the pixel to the right of it on fire.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (pixels[grid[y - 1][x][0]].flammable != 0) {
                grid[y - 1][x][1] = "fire";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor (Up)",
        description: "Lights the pixel above it on fire.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 30, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (pixels[grid[y + 1][x][0]].flammable != 0) {
                grid[y + 1][x][1] = "fire";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor (Down)",
        description: "Lights the pixel below it on fire.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_laser_left": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(0, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 90 != 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y][x - 1][0] == "air") {
                grid[y][x - 1][1] = "ignitor_laser_beam_left";
            }
            else if (gameTick % 9 == 0 && grid[y][x - 1][0] == "reflector_horizontal" && y != 0) {
                grid[y - 1][x - 1][1] = "ignitor_laser_beam_up";
            }
            else if (gameTick % 9 == 0 && grid[y][x - 1][0] == "reflector_vertical" && y != gridSize - 1) {
                grid[y + 1][x - 1][1] = "ignitor_laser_beam_down";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor Laser (Left)",
        description: "Shoots a fire laser to the left of it.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_laser_right": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(20, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 90 != 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y][x + 1][0] == "air") {
                grid[y][x + 1][1] = "ignitor_laser_beam_right";
            }
            else if (gameTick % 9 == 0 && grid[y][x + 1][0] == "reflector_horizontal" && y != gridSize - 1) {
                grid[y + 1][x + 1][1] = "ignitor_laser_beam_down";
            }
            else if (gameTick % 9 == 0 && grid[y][x + 1][0] == "reflector_vertical" && y != 0) {
                grid[y - 1][x + 1][1] = "ignitor_laser_beam_up";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor Laser (Right)",
        description: "Shoots a fire laser to the right of it.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_laser_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(20, 0, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 90 != 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y - 1][x][0] == "air") {
                grid[y - 1][x][1] = "ignitor_laser_beam_up";
            }
            else if (gameTick % 9 == 0 && grid[y - 1][x][0] == "reflector_horizontal" && x != 0) {
                grid[y - 1][x - 1][1] = "ignitor_laser_beam_left";
            }
            else if (gameTick % 9 == 0 && grid[y - 1][x][0] == "reflector_vertical" && x != gridSize - 1) {
                grid[y - 1][x + 1][1] = "ignitor_laser_beam_right";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor Laser (Up)",
        description: "Shoots a fire laser above it.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_laser_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(20, 20, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 90 != 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y + 1][x][0] == "air") {
                grid[y + 1][x][1] = "ignitor_laser_beam_down";
            }
            else if (gameTick % 9 == 0 && grid[y + 1][x][0] == "reflector_horizontal" && x != gridSize - 1) {
                grid[y + 1][x + 1][1] = "ignitor_laser_beam_right";
            }
            else if (gameTick % 9 == 0 && grid[y + 1][x][0] == "reflector_vertical" && x != 0) {
                grid[y + 1][x - 1][1] = "ignitor_laser_beam_left";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor Laser (Down)",
        description: "Shoots a fire laser below it.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_launcher_left": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(0, 20, 40, 20);
            ctx.fillRect(30, 10, 20, 10);
            ctx.fillRect(30, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 360 != 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y][x - 1][0] == "air") {
                grid[y][x - 1][0] = "ignitor_missile_left";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor Launcher (Left)",
        description: "Shoots a fire missile to the left of it.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_launcher_right": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(20, 20, 40, 20);
            ctx.fillRect(10, 10, 20, 10);
            ctx.fillRect(10, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 360 != 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y][x + 1][0] == "air") {
                grid[y][x + 1][0] = "ignitor_missile_right";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor Launcher (Right)",
        description: "Shoots a fire missile to the right of it.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_launcher_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(20, 0, 20, 40);
            ctx.fillRect(10, 30, 10, 20);
            ctx.fillRect(40, 30, 10, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 360 != 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y - 1][x][0] == "air") {
                grid[y - 1][x][0] = "ignitor_missile_up";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor Launcher (Up)",
        description: "Shoots a fire missile above it.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_launcher_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(20, 20, 20, 40);
            ctx.fillRect(10, 10, 10, 20);
            ctx.fillRect(40, 10, 10, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 360 != 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y + 1][x][0] == "air") {
                grid[y + 1][x][0] = "ignitor_missile_down";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Ignitor Launcher (Down)",
        description: "Shoots a fire missile below it.",
        type: "Fiery Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "ignitor_laser_beam_left": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, width * pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == 0) {
                explode(x, y, 5, "fire", 1, 0.5);
                return;
            }
            if (y != 0 && grid[y][x - 1][0] == "reflector_horizontal") {
                grid[y - 1][x - 1][1] = "ignitor_laser_beam_up";
                changePixel(x, y, null, "air");
                return;
            }
            if (y != gridSize - 1 && grid[y][x - 1][0] == "reflector_vertical") {
                grid[y + 1][x - 1][1] = "ignitor_laser_beam_down";
                changePixel(x, y, null, "air");
                return;
            }
            if (grid[y][x][0] != "air" || grid[y][x - 1][0] != "air" || (grid[y][x - 1][1] != "air" && grid[y][x - 1][1] != "fire" && grid[y][x - 1][1] != "ignitor_laser_beam_left")) {
                explode(x, y, 5, "fire", 1, 0.5);
                return;
            }
            move(x, y, [{ x: -1, y: 0 }], 1);
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Ignitor Laser Beam (Left)",
        description: "Explodes on impact.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "ignitor_laser_beam_right": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, width * pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                explode(x, y, 5, "fire", 1, 0.5);
                return;
            }
            if (y != gridSize - 1 && grid[y][x + 1][0] == "reflector_horizontal") {
                grid[y + 1][x + 1][1] = "ignitor_laser_beam_down";
                changePixel(x, y, null, "air");
                return;
            }
            if (y != 0 && grid[y][x + 1][0] == "reflector_vertical") {
                grid[y - 1][x + 1][1] = "ignitor_laser_beam_up";
                changePixel(x, y, null, "air");
                return;
            }
            if (grid[y][x][0] != "air" || grid[y][x + 1][0] != "air" || (grid[y][x + 1][1] != "air" && grid[y][x + 1][1] != "fire" && grid[y][x + 1][1] != "ignitor_laser_beam_right")) {
                explode(x, y, 5, "fire", 1, 0.5);
                return;
            }
            move(x, y, [{ x: 1, y: 0 }], 1);
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Ignitor Laser Beam (Right)",
        description: "Explodes on impact.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "ignitor_laser_beam_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == 0) {
                explode(x, y, 5, "fire", 1, 0.5);
                return;
            }
            if (x != 0 && grid[y - 1][x][0] == "reflector_horizontal") {
                grid[y - 1][x - 1][1] = "ignitor_laser_beam_left";
                grid[y][x][1] = "air";
                return;
            }
            if (x != gridSize - 1 && grid[y - 1][x][0] == "reflector_vertical") {
                grid[y - 1][x + 1][1] = "ignitor_laser_beam_right";
                grid[y][x][1] = "air";
                return;
            }
            if (grid[y][x][0] != "air" || grid[y - 1][x][0] != "air" || (grid[y - 1][x][1] != "air" && grid[y - 1][x][1] != "fire" && grid[y - 1][x][1] != "ignitor_laser_beam_up")) {
                explode(x, y, 5, "fire", 1, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: -1 }], 1);
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Ignitor Laser Beam (Up)",
        description: "Explodes on impact.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "ignitor_laser_beam_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                explode(x, y, 5, "fire", 1, 0.5);
                return;
            }
            if (x != gridSize - 1 && grid[y + 1][x][0] == "reflector_horizontal") {
                grid[y + 1][x + 1][1] = "ignitor_laser_beam_right";
                changePixel(x, y, null, "air");
                return;
            }
            if (x != 0 && grid[y + 1][x][0] == "reflector_vertical") {
                grid[y + 1][x - 1][1] = "ignitor_laser_beam_left";
                changePixel(x, y, null, "air");
                return;
            }
            if (grid[y][x][0] != "air" || grid[y + 1][x][0] != "air" || (grid[y + 1][x][1] != "air" && grid[y + 1][x][1] != "fire" && grid[y + 1][x][1] != "ignitor_laser_beam_down")) {
                explode(x, y, 5, "fire", 1, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: 1 }], 1);
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Ignitor Laser Beam (Down)",
        description: "Explodes on impact.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "ignitor_missile_left": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(0, 20, 20, 20);
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(40, 20, 10, 20);
            ctx.fillRect(50, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                explode(x, y, 10, "fire", 5, 0.5);
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (grid[y][x - 1][0] != "air" || (grid[y][x - 1][1] != "air" && grid[y][x - 1][1] != "fire")) {
                explode(x, y, 10, "fire", 5, 0.5);
                return;
            }
            move(x, y, [{ x: -1, y: 0 }], 0);
            setPixel(x, y, null, "fire");
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Ignitor Missile (Left)",
        description: "Explodes on impact.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "ignitor_missile_right": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(40, 20, 20, 20);
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(10, 20, 10, 20);
            ctx.fillRect(0, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                explode(x, y, 10, "fire", 5, 0.5);
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (grid[y][x + 1][0] != "air" || (grid[y][x + 1][1] != "air" && grid[y][x + 1][1] != "fire")) {
                explode(x, y, 10, "fire", 5, 0.5);
                return;
            }
            move(x, y, [{ x: 1, y: 0 }], 0);
            setPixel(x, y, null, "fire");
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Ignitor Missile (Right)",
        description: "Explodes on impact.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "ignitor_missile_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 5 / 6, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(20, 0, 20, 20);
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(20, 40, 20, 10);
            ctx.fillRect(10, 50, 40, 10);
        },
        update: function(x, y) {
            if (y == 0) {
                explode(x, y, 10, "fire", 5, 0.5);
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (grid[y - 1][x][0] != "air" || (grid[y - 1][x][1] != "air" && grid[y - 1][x][1] != "fire")) {
                explode(x, y, 10, "fire", 5, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: -1 }], 0);
            setPixel(x, y, null, "fire");
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Ignitor Missile (Up)",
        description: "Explodes on impact.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "ignitor_missile_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.explosive_light;
            ctx.fillRect(20, 40, 20, 20);
            ctx.fillStyle = colors.explosive_medium;
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors.explosive_dark;
            ctx.fillRect(20, 10, 20, 10);
            ctx.fillRect(10, 0, 40, 10);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                explode(x, y, 10, "fire", 5, 0.5);
                return;
            }
            if (grid[y][x][1] == "frost_fire" && gameTick % 9 != 0) {
                return;
            }
            if (grid[y + 1][x][0] != "air" || (grid[y + 1][x][1] != "air" && grid[y + 1][x][1] != "fire")) {
                explode(x, y, 10, "fire", 5, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: 1 }], 0);
            setPixel(x, y, null, "fire");
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Ignitor Missile (Down)",
        description: "Explodes on impact.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "frost_explosives": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(50, 20, 10, 20);
        },
        update: function(x, y) {
            if (grid[y][x][1] == "frost_fire") {
                // if (isTouchingDiagonal(x, y, null, "frost_fire") || grid[y][x][1] == "frost_fire") {
                explode(x, y, 10, "frost_fire", 1, 0.25);
            }
            else {
                fall(x, y, 0);
            }
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: 2,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 10,
        blastResistance: 3,
        monster: false,
        name: "Explosives",
        description: "Explodes when lit on frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_left": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            grid[y][x - 1][1] = "frost_fire";
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor (Left)",
        description: "Lights the pixel to the left of it on frost fire. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_right": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(30, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            grid[y][x + 1][1] = "frost_fire";
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor (Right)",
        description: "Lights the pixel to the right of it on frost fire. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            grid[y - 1][x][1] = "frost_fire";
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor (Up)",
        description: "Lights the pixel above it on frost fire. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 30, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            grid[y + 1][x][1] = "frost_fire";
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor (Down)",
        description: "Lights the pixel below it on frost fire. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_laser_left": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(0, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y][x - 1][0] == "air") {
                grid[y][x - 1][1] = "frost_ignitor_laser_beam_left";
            }
            else if (gameTick % 9 == 0 && grid[y][x - 1][0] == "reflector_horizontal" && y != 0) {
                grid[y - 1][x - 1][1] = "frost_ignitor_laser_beam_up";
            }
            else if (gameTick % 9 == 0 && grid[y][x - 1][0] == "reflector_vertical" && y != gridSize - 1) {
                grid[y + 1][x - 1][1] = "frost_ignitor_laser_beam_down";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor Laser (Left)",
        description: "Shoots a frost fire laser to the left of it. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_laser_right": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(20, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y][x + 1][0] == "air") {
                grid[y][x + 1][1] = "frost_ignitor_laser_beam_right";
            }
            else if (gameTick % 9 == 0 && grid[y][x + 1][0] == "reflector_horizontal" && y != gridSize - 1) {
                grid[y + 1][x + 1][1] = "frost_ignitor_laser_beam_down";
            }
            else if (gameTick % 9 == 0 && grid[y][x + 1][0] == "reflector_vertical" && y != 0) {
                grid[y - 1][x + 1][1] = "frost_ignitor_laser_beam_up";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor Laser (Right)",
        description: "Shoots a frost fire laser to the right of it. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_laser_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(20, 0, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y - 1][x][0] == "air") {
                grid[y - 1][x][1] = "frost_ignitor_laser_beam_up";
            }
            else if (gameTick % 9 == 0 && grid[y - 1][x][0] == "reflector_horizontal" && x != 0) {
                grid[y - 1][x - 1][1] = "frost_ignitor_laser_beam_left";
            }
            else if (gameTick % 9 == 0 && grid[y - 1][x][0] == "reflector_vertical" && x != gridSize - 1) {
                grid[y - 1][x + 1][1] = "frost_ignitor_laser_beam_right";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor Laser (Up)",
        description: "Shoots a frost fire laser above it. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_laser_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(20, 20, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y + 1][x][0] == "air") {
                grid[y + 1][x][1] = "frost_ignitor_laser_beam_down";
            }
            else if (gameTick % 9 == 0 && grid[y + 1][x][0] == "reflector_horizontal" && x != gridSize - 1) {
                grid[y + 1][x + 1][1] = "frost_ignitor_laser_beam_right";
            }
            else if (gameTick % 9 == 0 && grid[y + 1][x][0] == "reflector_vertical" && x != 0) {
                grid[y + 1][x - 1][1] = "frost_ignitor_laser_beam_left";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor Laser (Down)",
        description: "Shoots a frost fire laser below it. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_launcher_left": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(0, 20, 40, 20);
            ctx.fillRect(30, 10, 20, 10);
            ctx.fillRect(30, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y][x - 1][0] == "air") {
                grid[y][x - 1][0] = "frost_ignitor_missile_left";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: true,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor Launcher (Left)",
        description: "Shoots a frost fire missile to the left of it. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_launcher_right": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(20, 20, 40, 20);
            ctx.fillRect(10, 10, 20, 10);
            ctx.fillRect(10, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y][x + 1][0] == "air") {
                grid[y][x + 1][0] = "frost_ignitor_missile_right";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor Launcher (Right)",
        description: "Shoots a frost fire missile to the right of it. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_launcher_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(20, 0, 20, 40);
            ctx.fillRect(10, 30, 10, 20);
            ctx.fillRect(40, 30, 10, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y - 1][x][0] == "air") {
                grid[y - 1][x][0] = "frost_ignitor_missile_up";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor Launcher (Up)",
        description: "Shoots a frost fire missile above it. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_launcher_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(20, 20, 20, 40);
            ctx.fillRect(10, 10, 10, 20);
            ctx.fillRect(40, 10, 10, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y + 1][x][0] == "air") {
                grid[y + 1][x][0] = "frost_ignitor_missile_down";
            }
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 5,
        monster: false,
        name: "Frost Ignitor Launcher (Down)",
        description: "Shoots a frost fire missile below it. Immune to frost fire.",
        type: "Frozen Destruction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "frost_ignitor_laser_beam_left": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, width * pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == 0) {
                explode(x, y, 5, "frost_fire", 1, 0.5);
                return;
            }
            if (y != 0 && grid[y][x - 1][0] == "reflector_horizontal") {
                grid[y - 1][x - 1][1] = "frost_ignitor_laser_beam_up";
                changePixel(x, y, null, "air");
                return;
            }
            if (y != gridSize - 1 && grid[y][x - 1][0] == "reflector_vertical") {
                grid[y + 1][x - 1][1] = "frost_ignitor_laser_beam_down";
                changePixel(x, y, null, "air");
                return;
            }
            if (grid[y][x][0] != "air" || grid[y][x - 1][0] != "air" || (grid[y][x - 1][1] != "air" && grid[y][x - 1][1] != "frost_fire" && grid[y][x - 1][1] != "frost_ignitor_laser_beam_left")) {
                explode(x, y, 5, "frost_fire", 1, 0.5);
                return;
            }
            move(x, y, [{ x: -1, y: 0 }], 1);
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Frost Ignitor Laser Beam (Left)",
        description: "Explodes on impact. Immune to frost fire.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "frost_ignitor_laser_beam_right": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, width * pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                explode(x, y, 5, "frost_fire", 1, 0.5);
                return;
            }
            if (y != gridSize - 1 && grid[y][x + 1][0] == "reflector_horizontal") {
                grid[y + 1][x + 1][1] = "frost_ignitor_laser_beam_down";
                changePixel(x, y, null, "air");
                return;
            }
            if (y != 0 && grid[y][x + 1][0] == "reflector_vertical") {
                grid[y - 1][x + 1][1] = "frost_ignitor_laser_beam_up";
                changePixel(x, y, null, "air");
                return;
            }
            if (grid[y][x][0] != "air" || grid[y][x + 1][0] != "air" || (grid[y][x + 1][1] != "air" && grid[y][x + 1][1] != "frost_fire" && grid[y][x + 1][1] != "frost_ignitor_laser_beam_right")) {
                explode(x, y, 5, "frost_fire", 1, 0.5);
                return;
            }
            move(x, y, [{ x: 1, y: 0 }], 1);
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Frost Ignitor Laser Beam (Right)",
        description: "Explodes on impact. Immune to frost fire.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "frost_ignitor_laser_beam_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == 0) {
                explode(x, y, 5, "frost_fire", 1, 0.5);
                return;
            }
            if (x != 0 && grid[y - 1][x][0] == "reflector_horizontal") {
                grid[y - 1][x - 1][1] = "frost_ignitor_laser_beam_left";
                grid[y][x][1] = "air";
                return;
            }
            if (x != gridSize - 1 && grid[y - 1][x][0] == "reflector_vertical") {
                grid[y - 1][x + 1][1] = "frost_ignitor_laser_beam_right";
                grid[y][x][1] = "air";
                return;
            }
            if (grid[y][x][0] != "air" || grid[y - 1][x][0] != "air" || (grid[y - 1][x][1] != "air" && grid[y - 1][x][1] != "frost_fire" && grid[y - 1][x][1] != "frost_ignitor_laser_beam_up")) {
                explode(x, y, 5, "frost_fire", 1, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: -1 }], 1);
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Frost Ignitor Laser Beam (Up)",
        description: "Explodes on impact. Immune to frost fire.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "frost_ignitor_laser_beam_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                explode(x, y, 5, "frost_fire", 1, 0.5);
                return;
            }
            if (x != gridSize - 1 && grid[y + 1][x][0] == "reflector_horizontal") {
                grid[y + 1][x + 1][1] = "frost_ignitor_laser_beam_right";
                changePixel(x, y, null, "air");
                return;
            }
            if (x != 0 && grid[y + 1][x][0] == "reflector_vertical") {
                grid[y + 1][x - 1][1] = "frost_ignitor_laser_beam_left";
                changePixel(x, y, null, "air");
                return;
            }
            if (grid[y][x][0] != "air" || grid[y + 1][x][0] != "air" || (grid[y + 1][x][1] != "air" && grid[y + 1][x][1] != "frost_fire" && grid[y + 1][x][1] != "frost_ignitor_laser_beam_down")) {
                explode(x, y, 5, "frost_fire", 1, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: 1 }], 1);
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        effect: true,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Frost Ignitor Laser Beam (Down)",
        description: "Explodes on impact. Immune to frost fire.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "frost_ignitor_missile_left": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(0, 20, 20, 20);
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(40, 20, 10, 20);
            ctx.fillRect(50, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                explode(x, y, 10, "frost_fire", 5, 0.5);
                return;
            }
            if (grid[y][x - 1][0] != "air" || (grid[y][x - 1][1] != "air" && grid[y][x - 1][1] != "frost_fire")) {
                explode(x, y, 10, "frost_fire", 5, 0.5);
                return;
            }
            move(x, y, [{ x: -1, y: 0 }], 0);
            setPixel(x, y, null, "frost_fire");
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Frost Ignitor Missile (Left)",
        description: "Explodes on impact. Immune to frost fire.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "frost_ignitor_missile_right": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(40, 20, 20, 20);
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(10, 20, 10, 20);
            ctx.fillRect(0, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                explode(x, y, 10, "frost_fire", 5, 0.5);
                return;
            }
            if (grid[y][x + 1][0] != "air" || (grid[y][x + 1][1] != "air" && grid[y][x + 1][1] != "frost_fire")) {
                explode(x, y, 10, "frost_fire", 5, 0.5);
                return;
            }
            move(x, y, [{ x: 1, y: 0 }], 0);
            setPixel(x, y, null, "frost_fire");
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Frost Ignitor Missile (Right)",
        description: "Explodes on impact. Immune to frost fire.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "frost_ignitor_missile_up": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 5 / 6, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(20, 0, 20, 20);
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(20, 40, 20, 10);
            ctx.fillRect(10, 50, 40, 10);
        },
        update: function(x, y) {
            if (y == 0) {
                explode(x, y, 10, "frost_fire", 5, 0.5);
                return;
            }
            if (grid[y - 1][x][0] != "air" || (grid[y - 1][x][1] != "air" && grid[y - 1][x][1] != "frost_fire")) {
                explode(x, y, 10, "frost_fire", 5, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: -1 }], 0);
            setPixel(x, y, null, "frost_fire");
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Frost Ignitor Missile (Up)",
        description: "Explodes on impact. Immune to frost fire.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "frost_ignitor_missile_down": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.frost_explosive_light;
            ctx.fillRect(20, 40, 20, 20);
            ctx.fillStyle = colors.frost_explosive_medium;
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors.frost_explosive_dark;
            ctx.fillRect(20, 10, 20, 10);
            ctx.fillRect(10, 0, 40, 10);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                explode(x, y, 10, "frost_fire", 5, 0.5);
                return;
            }
            if (grid[y + 1][x][0] != "air" || (grid[y + 1][x][1] != "air" && grid[y + 1][x][1] != "frost_fire")) {
                explode(x, y, 10, "frost_fire", 5, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: 1 }], 0);
            setPixel(x, y, null, "frost_fire");
        },
        updateStage: 1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 4,
        effect: false,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: -10,
        blastResistance: 1,
        monster: false,
        name: "Frost Ignitor Missile (Down)",
        description: "Explodes on impact. Immune to frost fire.",
        amountColor: "rgb(0, 0, 0)",
        hidden: true,
    },
    "monster": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.monster_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.monster_white;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 6);
            ctx.fillStyle = colors.monster_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.monster_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.monster_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.monster_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.monster_white;
            ctx.fillRect(10, 20, 10, 10);
            ctx.fillRect(40, 20, 10, 10);
            ctx.fillStyle = colors.monster_dark;
            ctx.fillRect(10, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillRect(20, 40, 20, 10);
            // ctx.fillRect(20, 30, 20, 20);
        },
        update: function(x, y) {
        },
        updateStage: -1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        liquid: false,
        pushable: true,
        whenPushed: 1,
        flammable: 10,
        blastResistance: 1,
        monster: true,
        name: "Monster",
        description: "Can be destroyed with any pixel. All monsters need to be destroyed to finish the level.",
        type: "Level Construction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "happy_monster": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.monster_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.monster_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.monster_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.monster_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.monster_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.monster_dark;
            ctx.fillRect(10, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillRect(10, 30, 10, 10);
            ctx.fillRect(40, 30, 10, 10);
            ctx.fillRect(10, 40, 40, 10);
            // ctx.fillRect(20, 30, 20, 20);
        },
        update: function(x, y) {
        },
        updateStage: -1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        liquid: false,
        pushable: true,
        whenPushed: 1,
        flammable: 10,
        blastResistance: 1,
        monster: true,
        name: "Happy Monster",
        description: "It's happy! Can be destroyed with any pixel. But why would you? All monsters need to be destroyed to finish the level.",
        type: "Level Construction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "sad_monster": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.monster_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.monster_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize * 2 / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 6, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.monster_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.monster_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.monster_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.monster_dark;
            ctx.fillRect(10, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillRect(10, 30, 40, 10);
            ctx.fillRect(10, 40, 10, 10);
            ctx.fillRect(40, 40, 10, 10);
            // ctx.fillRect(20, 30, 20, 20);
        },
        update: function(x, y) {
        },
        updateStage: -1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 0,
        liquid: false,
        pushable: true,
        whenPushed: 1,
        flammable: 10,
        blastResistance: 1,
        monster: true,
        name: "Sad Monster",
        description: "You destroyed it's friends. Now it's sad. Can be destroyed with any pixel. All monsters need to be destroyed to finish the level.",
        type: "Level Construction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "tough_monster": {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors.monster_light;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors.monster_dark;
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 6, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors.monster_medium;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.monster_medium;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.monster_light;
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors.monster_dark;
            ctx.fillRect(10, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillRect(10, 40, 40, 10);
            // ctx.fillRect(20, 30, 20, 20);
        },
        update: function(x, y) {
        },
        updateStage: -1,
        updateDirection: null,
        animated: false,
        drawNoise: false,
        density: 2,
        liquid: false,
        pushable: true,
        whenPushed: 0,
        flammable: 10,
        blastResistance: 1,
        monster: true,
        name: "Tough Monster",
        description: "Resistant to most pixels. Can only be destroyed with fire or explosives. All monsters need to be destroyed to finish the level.",
        type: "Level Construction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    "placeable": {
        draw: function(x, y, ctx) {
            // ctx.fillStyle = colors.placeable;
            // ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.placeable;
            ctx.fillRect(0, 0, 20, 10);
            ctx.fillRect(0, 10, 10, 10);
            ctx.fillRect(40, 0, 20, 10);
            ctx.fillRect(50, 10, 10, 10);
            ctx.fillRect(0, 50, 20, 10);
            ctx.fillRect(0, 40, 10, 10);
            ctx.fillRect(40, 50, 20, 10);
            ctx.fillRect(50, 40, 10, 10);
        },
        update: function(x, y) {
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: Infinity,
        effect: false,
        liquid: false,
        pushable: false,
        whenPushed: 0,
        flammable: -10,
        blastResistance: Infinity,
        monster: false,
        name: "Placeable",
        description: "Allows placing on these tiles in levels.",
        type: "Level Construction",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
    "not_placeable": {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors.placeable;
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors.air;
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors.placeable;
            ctx.fillRect(0, 0, 10, 10);
            ctx.fillRect(10, 10, 10, 10);
            ctx.fillRect(50, 0, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillRect(0, 50, 10, 10);
            ctx.fillRect(10, 40, 10, 10);
            ctx.fillRect(50, 50, 10, 10);
            ctx.fillRect(40, 40, 10, 10);
            ctx.fillRect(20, 20, 20, 20);
        },
        update: function(x, y) {
        },
        updateStage: 0,
        updateDirection: "up",
        animated: false,
        drawNoise: false,
        density: Infinity,
        effect: false,
        liquid: false,
        pushable: false,
        whenPushed: 0,
        flammable: -10,
        blastResistance: Infinity,
        monster: false,
        name: "Not Placeable",
        description: "Prevents placing on these tiles in levels.",
        type: "Level Construction",
        amountColor: "rgb(0, 0, 0)",
        hidden: false,
    },
};

for (var i in pixels) {
    if (i.includes("_left")) {
        pixels[i].updateDirection = "right";
    }
    if (i.includes("_right")) {
        pixels[i].updateDirection = "left";
    }
    if (i.includes("_up")) {
        pixels[i].updateDirection = "down";
    }
    if (i.includes("_down")) {
        pixels[i].updateDirection = "up";
    }
}

var pixelInventory = {};
for (var i in pixels) {
    pixelInventory[i] = 0;
}

var index = 0;
var numberedPixels = [];
for (var i in pixels) {
    numberedPixels[index] = pixels[i];
    pixels[i].index = index;
    index += 1;
}