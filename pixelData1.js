
var pixels = [
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[DIRT];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[DIRT];
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, WATER, null)) {
                changePixel(x, y, MUD, null);
                return;
            }
            if (getTouchingDiagonalLessDense(x, y, pixels[DIRT].density) >= 5) {
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[GRASS];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[GRASS];
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, WATER, null)) {
                changePixel(x, y, MUD, null);
                return;
            }
            if (y == 0 || grid[y - 1][x][0] != AIR) {
                changePixel(x, y, DIRT, null);
                return;
            }
            // if (getTouchingDiagonal(x, y, AIR, null) == 0) {
            //     changePixel(x, y, DIRT, null);
            //     return;
            // }
            forEachTouchingDiagonal(x, y, DIRT, null, function(x1, y1) {
                if (y1 != 0 && grid[y1 - 1][x1][0] == AIR) {
                    changePixel(x1, y1, GRASS, null);
                }
            });
            if (getTouchingDiagonalLessDense(x, y, pixels[GRASS].density) >= 5) {
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[SAND];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[SAND];
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, SAND, null) == 4) {
                return;
            }
            if (getTouchingDiagonal(x, y, LAVA, null) >= 6) {
                changePixel(x, y, QUARTZ, null);
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
    {
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
            if (getTouching(x, y, WATER, null) == 4) {
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[OAK_WOOD][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize / 2, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[OAK_WOOD][0];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[OAK_WOOD][0];
            ctx.fillRect(30, 0, 30, 60);
            ctx.fillStyle = colors[OAK_WOOD][1];
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
    {
        draw: function(x, y, ctx) {

        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[LEAF];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[LEAF];
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (!isTouchingDiagonal(x, y, OAK_WOOD, null) && !isTouchingDiagonal(x, y, SPRUCE_WOOD, null) && getTouchingDiagonal(x, y, LEAF, null) < 2) {
                if (getRandom() < 0.1) {
                    changePixel(x, y, SAPLING, null);
                }
                else {
                    changePixel(x, y, AIR, null);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[OAK_WOOD][1];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors[SAPLING];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize * 2 / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 40, 20, 20);
            ctx.fillRect(40, 40, 20, 20);
            ctx.fillStyle = colors[SAPLING];
            ctx.fillRect(0, 0, 60, 40);
            ctx.fillStyle = colors[OAK_WOOD][1];
            ctx.fillRect(20, 40, 20, 20);
        },
        update: function(x, y) {
            if (fall(x, y, 0)) {
                return;
            }
            if (y != gridSize - 1 && getRandom() < 0.01) {
                if (grid[y + 1][x][0] == DIRT) {
                    var direction = [0, -1];
                    var length = random(8, 14);
                    var stemPixel = OAK_WOOD;
                    var leafPixel = LEAF;
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 21, function(x, y, length) { return true; });
                }
                if (grid[y + 1][x][0] == GRASS) {
                    var direction = [0, -1];
                    var length = random(12, 18);
                    var stemPixel = OAK_WOOD;
                    var leafPixel = LEAF;
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 14, length * 2, function(distance) { return true; });
                }
                if (grid[y + 1][x][0] == SAND) {
                    var direction = [0, -1];
                    var length = random(16, 24);
                    var stemPixel = OAK_WOOD;
                    var leafPixel = LEAF;
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0, 0, 0, length, function(distance) { return getRandom() < 0.5; });
                }
                if (grid[y + 1][x][0] == MUD) {
                    var direction = [0, -1];
                    var length = random(6, 10);
                    var stemPixel = OAK_WOOD;
                    var leafPixel = LEAF;
                    changePixel(x, y, stemPixel, null);
                    generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.15, 1, 7, length * 4, function(distance) { return true; });
                }
                // else if (grid[y + 1][x][0] == DRIED_MUD) {
                //     var direction = [0, -1];
                //     var length = random(4, 8);
                //     var stemPixel = OAK_WOOD;
                //     var leafPixel = LEAF;
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.2, 2, 7, length, function(distance) { return getRandom() < 1 / distance; });
                // }
                // else if (grid[y + 1][x][0] == SNOW) {
                //     var direction = [0, -1];
                //     var length = random(8, 14);
                //     var stemPixel = SPRUCE_WOOD;
                //     var leafPixel = SNOW;
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.05, 2, 21, length, function(distance) { return true; });
                // }
                // else if (grid[y + 1][x][0] == ICE) {
                //     var direction = [0, -1];
                //     var length = random(8, 10);
                //     var stemPixel = SPRUCE_WOOD;
                //     var leafPixel = ICE;
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.25, 0.2, 3, 7, length, function(distance) { return getRandom() < 0.25; });
                // }
                // else if (grid[y + 1][x][0] == SLUSH) {
                //     var direction = [0, -1];
                //     var length = random(6, 10);
                //     var stemPixel = SPRUCE_WOOD;
                //     var leafPixel = SLUSH;
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.05, 2, 14, length * 2, function(distance) { return getRandom() < 0.75; });
                // }
                // else if (grid[y + 1][x][0] == SILT) {
                //     var direction = [0, -1];
                //     var length = random(8, 16);
                //     var stemPixel = OAK_WOOD;
                //     var leafPixel = ASH;
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.05, 2, 14, length, function(distance) { return true; });
                // }
                // else if (grid[y + 1][x][0] == OBSIDIAN) {
                //     var direction = [0, -1];
                //     var length = random(8, 16);
                //     var stemPixel = BASALT;
                //     var leafPixel = STONE;
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.35, 0.05, 2, 14, length / 2, function(distance) { return getRandom() < 5 / distance; });
                // }
                // else if (grid[y + 1][x][0] == QUARTZ) {
                //     var direction = [0, -1];
                //     var length = random(12, 22);
                //     var stemPixel = SPRUCE_WOOD;
                //     var leafPixel = QUARTZ;
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.15, 0.05, 1, 14, length * 9, function(distance) { return getRandom() < 0.5; });
                // }
                // else if (grid[y + 1][x][0] == STEAM) {
                //     var direction = [0, -1];
                //     var length = random(36, 60);
                //     var stemPixel = SPRUCE_WOOD;
                //     var leafPixel = STEAM;
                //     changePixel(x, y, stemPixel, null);
                //     generateTree(x, y, direction, length, stemPixel, leafPixel, 0.5, 1, 3, 1, length * 16, function(distance) { return getRandom() < 0.5; });
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[MUD]);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (!isTouchingDiagonal(x, y, WATER, null) && getRandom() < 0.05 || isTouchingDiagonal(x, y, LAVA, null) || isTouchingDiagonal(x, y, null, FIRE)) {
                changePixel(x, y, DRIED_MUD, null);
                return;
            }
            if (getTouchingDiagonalLessDense(x, y, pixels[MUD].density) >= 4) {
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[DRIED_MUD]);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (isTouchingDiagonal(x, y, WATER, null)) {
                changePixel(x, y, MUD, null);
                return;
            }
            if (getTouchingDiagonalLessDense(x, y, pixels[DRIED_MUD].density) >= 6) {
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
    {
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
            var touchingLava = getTouchingDiagonal(x, y, LAVA, null);
            if (getTouching(x, y, LAVA) == 4) {
                return;
            }
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (grid[y1][x1][0] == WATER) {
                    if (y1 > y) {
                        if (touchingLava >= 5) {
                            changePixel(x1, y1, OBSIDIAN, null);
                        }
                        else if (touchingLava >= 3 && getRandom() < 0.5) {
                            changePixel(x1, y1, BASALT, null);
                        }
                        else {
                            changePixel(x1, y1, STONE, null);
                        }
                        changePixel(x, y, STEAM, null);
                    }
                    else {
                        if (touchingLava >= 5) {
                            changePixel(x, y, OBSIDIAN, null);
                        }
                        else if (touchingLava >= 3 && getRandom() < 0.5) {
                            changePixel(x, y, BASALT, null);
                        }
                        else {
                            changePixel(x, y, STONE, null);
                        }
                        changePixel(x1, y1, STEAM, null);
                    }
                }
                else if (grid[y1][x1][0] == GRASS) {
                    changePixel(x1, y1, DIRT, null);
                }
                if (grid[y1][x1][1] == AIR && grid[y1][x1][0] != LAVA && getRandom() < 0.1) {
                    changePixel(x1, y1, null, FIRE);
                }
                if (pixels[grid[y1][x1][0]].flammable > 0 && getRandom() < 1 / pixels[grid[y1][x1][0]].flammable) {
                    changePixel(x1, y1, AIR, AIR);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colorTintTransparent(colors[FIRE][2], randomGrid[y][x][0] / 2 + 0.3, randomGrid[y][x][0]);
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FIRE][1];
            ctx.fillRect(10, 20, 30, 10);
            ctx.fillRect(10, 30, 40, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 0, 10, 10);
            ctx.fillRect(30, 0, 10, 10);
            ctx.fillRect(20, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillStyle = colors[FIRE][0];
            ctx.fillRect(20, 30, 20, 20);
            ctx.fillRect(20, 20, 10, 10);
        },
        update: function(x, y) {
            if (pixels[grid[y][x][0]].flammable == 0 || grid[y][x][0] == LAVA) {
                if (getRandom() < 0.5 && grid[y][x][0] == WATER) {
                    changePixel(x, y, STEAM, AIR);
                    return;
                }
                else {
                    changePixel(x, y, null, AIR);
                    return;
                }
            }
            if (pixels[grid[y][x][0]].flammable < 0 && getRandom() < -1 / pixels[grid[y][x][0]].flammable) {
                changePixel(x, y, null, AIR);
                return;
            }
            if (getTouchingDiagonal(x, y, AIR, null) == 0 && getRandom() < 0.5) {
                changePixel(x, y, null, AIR);
                return;
            }
            if (getRandom() < 1 / (pixels[grid[y][x][0]].flammable * 10)) {
                if (getRandom() < 0.25) {
                    changePixel(x, y, ASH, null);
                    return;
                }
                else {
                    changePixel(x, y, AIR, null);
                    return;
                }
            }
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (pixels[grid[y1][x1][0]].flammable == 0) {
                    if (getRandom() < 0.05) {
                        changePixel(x, y, null, AIR);
                        if (grid[y1][x1][0] == WATER) {
                            changePixel(x1, y1, STEAM, null);
                        }
                    }
                }
                else if (grid[y1][x1][1] != FIRE && pixels[grid[y1][x1][0]].flammable > 0 && getRandom() < 1 / pixels[grid[y1][x1][0]].flammable) {
                    changePixel(x1, y1, null, FIRE);
                }
            });
            var moveRandom = getRandom();
            if (moveRandom > 0.75) {
                if (y != 0) {
                    if (grid[y - 1][x][1] != FIRE && (pixels[grid[y - 1][x][0]].flammable > 0 || grid[y - 1][x][0] == AIR) && getRandom() < 5 / Math.abs(pixels[grid[y - 1][x][0]].flammable)) {
                        if (move(x, y, [{ x: 0, y: -1 }], 1)) {
                            if (getRandom() < pixels[grid[y][x][0]].flammable > 0 ? 0.75 : 0.25) {
                                nextGrid[y][x][1] = FIRE;
                            }
                        }
                    }
                }
            }
            else if (moveRandom < 0.1) {
                if (y != gridSize - 1) {
                    if (grid[y + 1][x][1] != FIRE && (pixels[grid[y + 1][x][0]].flammable > 0 || grid[y + 1][x][0] == AIR) && getRandom() < 5 / Math.abs(pixels[grid[y + 1][x][0]].flammable)) {
                        move(x, y, [{ x: 0, y: 1 }], 1);
                    }
                }
            }
            // else if (moveRandom < 0.15) {
            //     if (x != 0) {
            //         if (grid[y][x - 1][1] != FIRE && (pixels[grid[y][x - 1][0]].flammable > 0 || grid[y][x - 1][0] == AIR) && getRandom() < 5 / Math.abs(pixels[grid[y][x - 1][0]].flammable)) {
            //             move(x, y, [{ x: -1, y: 0 }], 1);
            //         }
            //     }
            // }
            // else if (moveRandom < 0.2) {
            //     if (x != gridSize - 1) {
            //         if (grid[y][x + 1][1] != FIRE && (pixels[grid[y][x + 1][0]].flammable > 0 || grid[y][x + 1][0] == AIR) && getRandom() < 5 / Math.abs(pixels[grid[y][x + 1][0]].flammable)) {
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STEAM]);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getRandom() < 0.01) {
                changePixel(x, y, WATER, null);
                return;
            }
            var burned = false;
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (grid[y1][x1][1] != FIRE && pixels[grid[y1][x1][0]].flammable > 0 && getRandom() < 1 / pixels[grid[y1][x1][0]].flammable) {
                    burned = true;
                    changePixel(x1, y1, null, FIRE);
                }
            });
            if (burned) {
                changePixel(x, y, WATER, null);
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[QUARTZ]);
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[ASH]);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, ASH, null) == 4) {
                return;
            }
            if (isTouchingDiagonal(x, y, WATER, null)) {
                changePixel(x, y, SILT, null);
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[SILT]);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, SILT, null) == 4) {
                return;
            }
            if ((isTouchingDiagonal(x, y, LAVA, null) || isTouchingDiagonal(x, y, null, FIRE)) && !isTouchingDiagonal(x, y, WATER, null) && getRandom() < 0.1) {
                changePixel(x, y, ASH, null);
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonal(x, y, LAVA, null) >= 2 && !isTouchingDiagonal(x, y, WATER, null)) {
                changePixel(x, y, LAVA, null);
            }
            if (getTouchingDiagonal(x, y, LAVA, null) >= 4 && getTouchingDiagonal(x, y, WATER, null) == 1) {
                changePixel(x, y, LAVA, null);
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[BASALT]);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonal(x, y, LAVA, null) >= 4 && !isTouchingDiagonal(x, y, WATER, null)) {
                changePixel(x, y, LAVA, null);
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[OBSIDIAN]);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouchingDiagonal(x, y, LAVA, null) >= 7 && !isTouchingDiagonal(x, y, WATER, null)) {
                changePixel(x, y, LAVA, null);
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[GUNPOWDER]);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (grid[y][x][1] == FIRE) {
                explode(x, y, 4, FIRE, 0.25, 2);
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[SNOW];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[SNOW];
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, SNOW, null) == 4) {
                return;
            }
            if (isTouchingDiagonal(x, y, LAVA, null) || isTouchingDiagonal(x, y, null, FIRE) || grid[x][y][1] == FIRE) {
                changePixel(x, y, WATER, null);
                return;
            }
            forEachTouchingDiagonal(x, y, WATER, null, function(x1, y1) {
                changePixel(x1, y1, ICE, null);
            });
            forEachTouchingDiagonal(x, y, STEAM, null, function(x1, y1) {
                changePixel(x1, y1, WATER, null);
            });
            forEachTouchingDiagonal(x, y, SILT, null, function(x1, y1) {
                changePixel(x1, y1, SLUSH, null);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[ICE][1];
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[ICE][0];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[ICE][0];
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, ICE, null) == 4) {
                return;
            }
            if (isTouchingDiagonal(x, y, LAVA, null) || isTouchingDiagonal(x, y, null, FIRE) || grid[y][x][1] == FIRE) {
                changePixel(x, y, WATER, null);
                return;
            }
            forEachTouchingDiagonal(x, y, WATER, null, function(x1, y1) {
                changePixel(x1, y1, ICE, null);
            });
            forEachTouchingDiagonal(x, y, STEAM, null, function(x1, y1) {
                changePixel(x1, y1, WATER, null);
            });
            forEachTouchingDiagonal(x, y, SILT, null, function(x1, y1) {
                changePixel(x1, y1, SLUSH, null);
            });
            forAllTouchingDiagonal(x, y, function(x1, y1) {
                if (grid[y1][x1][1] == AIR && grid[y1][x1][0] != ICE && getRandom() < 0.1) {
                    changePixel(x1, y1, null, FROST_FIRE);
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[SLUSH]);
            ctx.fillRect(0, 0, 60, 60);
        },
        update: function(x, y) {
            if (getTouching(x, y, SLUSH, null) == 4) {
                return;
            }
            if ((isTouchingDiagonal(x, y, LAVA, null) || isTouchingDiagonal(x, y, null, FIRE)) && !isTouchingDiagonal(x, y, WATER, null) && !isTouchingDiagonal(x, y, ICE, null) && getRandom() < 0.1) {
                if (getRandom() < 0.5) {
                    changePixel(x, y, WATER, null);
                    return;
                }
                else {
                    changePixel(x, y, ASH, null);
                    return;
                }
            }
            forEachTouchingDiagonal(x, y, WATER, null, function(x1, y1) {
                changePixel(x1, y1, ICE, null);
            });
            forEachTouchingDiagonal(x, y, STEAM, null, function(x1, y1) {
                changePixel(x1, y1, WATER, null);
            });
            forEachTouchingDiagonal(x, y, SILT, null, function(x1, y1) {
                changePixel(x1, y1, SLUSH, null);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colorTintTransparent(colors[FROST_FIRE][2], randomGrid[y][x][0] / 2 + 0.3, randomGrid[y][x][1]);
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_FIRE][1];
            ctx.fillRect(10, 20, 30, 10);
            ctx.fillRect(10, 30, 40, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 0, 10, 10);
            ctx.fillRect(30, 0, 10, 10);
            ctx.fillRect(20, 10, 10, 10);
            ctx.fillRect(40, 10, 10, 10);
            ctx.fillStyle = colors[FROST_FIRE][0];
            ctx.fillRect(20, 30, 20, 20);
            ctx.fillRect(20, 20, 10, 10);
        },
        update: function(x, y) {
            if (grid[y][x][0] == AIR && getRandom() < 0.2) {
                changePixel(x, y, null, AIR);
                return;
            }
            forEachTouchingDiagonal(x, y, WATER, null, function(x1, y1) {
                changePixel(x1, y1, ICE, null);
            });
            forEachTouchingDiagonal(x, y, SILT, null, function(x1, y1) {
                changePixel(x1, y1, SLUSH, null);
            });
            if (!isTouchingDiagonal(ICE)) {
                if (isTouchingDiagonal(x, y, LAVA, null) || grid[y][x][0] == LAVA) {
                    changePixel(x, y, null, AIR);
                    return;
                }
                if (isTouchingDiagonal(x, y, null, FIRE) || grid[y][x][1] == FIRE) {
                    forEachTouchingDiagonal(x, y, null, FIRE, function(x1, y1) {
                        changePixel(x1, y1, null, AIR);
                    });
                    changePixel(x, y, null, AIR);
                    return;
                }
            }
            if (grid[y][x][0] == AIR) {
                var moveRandom = getRandom();
                if (moveRandom > 0.75) {
                    if (y != 0) {
                        if (grid[y - 1][x][1] != FROST_FIRE) {
                            if (move(x, y, [{ x: 0, y: -1 }], 1)) {
                                if (nextGrid[y][x][1] == AIR && getRandom() < 0.5) {
                                    nextGrid[y][x][1] = FROST_FIRE;
                                }
                            }
                        }
                    }
                }
                else if (moveRandom < 0.1) {
                    if (y != gridSize - 1) {
                        if (grid[y + 1][x][1] != FROST_FIRE) {
                            move(x, y, [{ x: 0, y: 1 }], 1);
                        }
                    }
                }
                // else if (moveRandom < 0.15) {
                //     if (x != 0) {
                //         if (grid[y][x - 1][1] != FROST_FIRE) {
                //             move(x, y, [{ x: -1, y: 0 }], 1);
                //         }
                //     }
                // }
                // else if (moveRandom < 0.2) {
                //     if (x != gridSize - 1) {
                //         if (grid[y][x + 1][1] != FROST_FIRE) {
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[SPRUCE_WOOD][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize / 2, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[SPRUCE_WOOD][0];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[SPRUCE_WOOD][0];
            ctx.fillRect(30, 0, 30, 60);
            ctx.fillStyle = colors[SPRUCE_WOOD][1];
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(40, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 10);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 40, 40, 10);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillStyle = colors[CLONE_LERP];
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 10, 40);
            ctx.fillStyle = colors[CLONE];
            ctx.fillRect(50, 10, 10, 40);
            ctx.fillRect(40, 20, 10, 20);
        },
        update: function(x, y) {
            if (x == 0 || x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (grid[y][x + 1][0] != AIR && pixels[grid[y][x - 1][0]].pushable && pixels[grid[y][x - 1][0]].whenPushed <= 0 && push(x, y, "left", gridSize)) {
                setPixel(x - 1, y, grid[y][x + 1][0], grid[y][x + 1][1]);
            }
            else if (pixels[grid[y][x - 1][0]].whenPushed == 1) {
                setPixel(x - 1, y, AIR, AIR);
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
        description: "Clones the pixel on the right. The cloned pixel is pushed on the left.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillStyle = colors[CLONE_LERP];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(40, 10, 10, 40);
            ctx.fillStyle = colors[CLONE];
            ctx.fillRect(0, 10, 10, 40);
            ctx.fillRect(10, 20, 10, 20);
        },
        update: function(x, y) {
            if (x == 0 || x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (grid[y][x - 1][0] != AIR && pixels[grid[y][x + 1][0]].pushable && pixels[grid[y][x + 1][0]].whenPushed <= 0 && push(x, y, "right", gridSize)) {
                setPixel(x + 1, y, grid[y][x - 1][0], grid[y][x - 1][1]);
            }
            else if (pixels[grid[y][x + 1][0]].whenPushed == 1) {
                setPixel(x + 1, y, AIR, AIR);
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
        description: "Clones the pixel on the left. The cloned pixel is pushed on the right.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 6);
            ctx.fillStyle = colors[CLONE_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 5 / 6, pixelSize * 2 / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 10);
            ctx.fillStyle = colors[CLONE];
            ctx.fillRect(10, 50, 40, 10);
            ctx.fillRect(20, 40, 20, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (grid[y + 1][x][0] != AIR && pixels[grid[y - 1][x][0]].pushable && pixels[grid[y - 1][x][0]].whenPushed <= 0 && push(x, y, "up", gridSize)) {
                setPixel(x, y - 1, grid[y + 1][x][0], grid[y + 1][x][1]);
            }
            else if (pixels[grid[y - 1][x][0]].whenPushed == 1) {
                setPixel(x, y - 1, AIR, AIR);
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
        description: "Clones the pixel below it. The cloned pixel is pushed upwards.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize * 2 / 3, pixelSize / 6);
            ctx.fillStyle = colors[CLONE_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize * 2 / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 40, 40, 10);
            ctx.fillStyle = colors[CLONE];
            ctx.fillRect(10, 0, 40, 10);
            ctx.fillRect(20, 10, 20, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (grid[y - 1][x][0] != AIR && pixels[grid[y + 1][x][0]].pushable && pixels[grid[y + 1][x][0]].whenPushed <= 0 && push(x, y, "down", gridSize)) {
                setPixel(x, y + 1, grid[y - 1][x][0], grid[y - 1][x][1]);
            }
            else if (pixels[grid[y + 1][x][0]].whenPushed == 1) {
                setPixel(x, y + 1, AIR, AIR);
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
        description: "Clones the pixel above it. The cloned pixel is pushed downwards.",
        type: "Mechanical Movement",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 2, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(0, 20, 30, 20);
            ctx.fillRect(20, 10, 20, 10);
            ctx.fillRect(20, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            var leftPixel = [grid[y][x - 1][0], grid[y][x - 1][1]];
            if (pixels[leftPixel[0]].whenPushed > 0) {
                setPixel(x, y, AIR, AIR);
                if (pixels[leftPixel[0]].whenPushed == 1) {
                    setPixel(x - 1, y, AIR, AIR);
                }
                return;
            }
            if (pixels[leftPixel[0]].whenPushed == -1) {
                setPixel(x, y, AIR, AIR);
                setPixel(x - 1, y, PENETRATOR_LEFT);
                return;
            }
            if (!pixels[leftPixel[0]].pushable || leftPixel[0] == SLIDER_VERTICAL) {
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 3, pixelSize / 2, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(30, 20, 30, 20);
            ctx.fillRect(20, 10, 20, 10);
            ctx.fillRect(20, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            var rightPixel = [grid[y][x + 1][0], grid[y][x + 1][1]];
            if (pixels[rightPixel[0]].whenPushed > 0) {
                setPixel(x, y, AIR, AIR);
                if (pixels[rightPixel[0]].whenPushed == 1) {
                    setPixel(x + 1, y, AIR, AIR);
                }
                return;
            }
            if (pixels[rightPixel[0]].whenPushed == -1) {
                setPixel(x, y, AIR, AIR);
                setPixel(x + 1, y, PENETRATOR_RIGHT, null);
                return;
            }
            if (!pixels[rightPixel[0]].pushable || rightPixel[0] == SLIDER_VERTICAL) {
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 2);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(20, 0, 20, 30);
            ctx.fillRect(10, 20, 10, 20);
            ctx.fillRect(40, 20, 10, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            var abovePixel = [grid[y - 1][x][0], grid[y - 1][x][1]];
            if (pixels[abovePixel[0]].whenPushed > 0) {
                setPixel(x, y, AIR, AIR);
                if (pixels[abovePixel[0]].whenPushed == 1) {
                    setPixel(x, y - 1, AIR, AIR);
                }
                return;
            }
            if (pixels[abovePixel[0]].whenPushed == -1) {
                setPixel(x, y, AIR, AIR);
                setPixel(x, y - 1, PENETRATOR_UP, null);
                return;
            }
            if (!pixels[abovePixel[0]].pushable || abovePixel[0] == SLIDER_HORIZONTAL) {
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 2, pixelSize / 3, pixelSize / 2);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(20, 30, 20, 30);
            ctx.fillRect(10, 20, 10, 20);
            ctx.fillRect(40, 20, 10, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            var belowPixel = [grid[y + 1][x][0], grid[y + 1][x][1]];
            if (pixels[belowPixel[0]].whenPushed > 0) {
                setPixel(x, y, AIR, AIR);
                if (pixels[belowPixel[0]].whenPushed == 1) {
                    setPixel(x, y + 1, AIR, AIR);
                }
                return;
            }
            if (pixels[belowPixel[0]].whenPushed == -1) {
                setPixel(x, y, AIR, AIR);
                setPixel(x, y + 1, PENETRATOR_DOWN, null);
                return;
            }
            if (!pixels[belowPixel[0]].pushable || belowPixel[0] == SLIDER_HORIZONTAL) {
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 2, pixelSize / 6);
            ctx.fillStyle = colors[CLONE_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 2, pixelSize / 2, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 10, 10, 40);
            ctx.fillRect(0, 20, 30, 10);
            ctx.fillStyle = colors[CLONE];
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(40, 10, 10, 40);
            ctx.fillRect(30, 30, 30, 10);
        },
        update: function(x, y) {
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            forAllTouching(x, y, function(x1, y1) {
                if (grid[y1][x1][0] >= PISTON_LEFT && grid[y1][x1][0] <= PENETRATOR_DOWN) {
                    if (grid[y1][x1][0] % 4 == 1) {
                        setPixel(x1, y1, grid[y1][x1][0] + 2, null);
                    }
                    else if (grid[y1][x1][0] % 4 == 2) {
                        setPixel(x1, y1, grid[y1][x1][0] + 2, null);
                    }
                    else if (grid[y1][x1][0] % 4 == 3) {
                        setPixel(x1, y1, grid[y1][x1][0] - 1, null);
                    }
                    else if (grid[y1][x1][0] % 4 == 0) {
                        setPixel(x1, y1, grid[y1][x1][0] - 3, null);
                    }
                }
                if (grid[y1][x1][0] >= SWAPPER_HORIZONTAL && grid[y1][x1][0] <= SLIDER_VERTICAL) {
                    setPixel(x1, y1, grid[y1][x1][0] + 1, null);
                    if (grid[y1][x1][0] % 2 == 1) {
                        grid[y1][x1][0] -= 2;
                    }
                }
                if (grid[y1][x1][0] == REFLECTOR_HORIZONTAL && grid[y1][x1][0] <= REFLECTOR_VERTICAL) {
                    setPixel(x1, y1, grid[y1][x1][0] + 1, null);
                    if (grid[y1][x1][0] % 2 == 0) {
                        grid[y1][x1][0] -= 2;
                    }
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 2, pixelSize / 2, pixelSize / 6);
            ctx.fillStyle = colors[CLONE_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 3, pixelSize / 2, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 10, 40);
            ctx.fillRect(0, 30, 30, 10);
            ctx.fillStyle = colors[CLONE];
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(40, 10, 10, 40);
            ctx.fillRect(30, 20, 30, 10);
        },
        update: function(x, y) {
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            forAllTouching(x, y, function(x1, y1) {
                if (grid[y1][x1][0] >= PISTON_LEFT && grid[y1][x1][0] <= PENETRATOR_DOWN) {
                    if (grid[y1][x1][0] % 4 == 1) {
                        setPixel(x1, y1, grid[y1][x1][0] + 3, null);
                    }
                    else if (grid[y1][x1][0] % 4 == 2) {
                        setPixel(x1, y1, grid[y1][x1][0] + 1, null);
                    }
                    else if (grid[y1][x1][0] % 4 == 3) {
                        setPixel(x1, y1, grid[y1][x1][0] - 2, null);
                    }
                    else if (grid[y1][x1][0] % 4 == 0) {
                        setPixel(x1, y1, grid[y1][x1][0] - 2, null);
                    }
                }
                if (grid[y1][x1][0] >= SWAPPER_HORIZONTAL && grid[y1][x1][0] <= SLIDER_VERTICAL) {
                    setPixel(x1, y1, grid[y1][x1][0] + 1, null);
                    if (grid[y1][x1][0] % 2 == 1) {
                        grid[y1][x1][0] -= 2;
                    }
                }
                if (grid[y1][x1][0] == REFLECTOR_HORIZONTAL && grid[y1][x1][0] <= REFLECTOR_VERTICAL) {
                    setPixel(x1, y1, grid[y1][x1][0] + 1, null);
                    if (grid[y1][x1][0] % 2 == 0) {
                        grid[y1][x1][0] -= 2;
                    }
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize / 6, pixelSize);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 2, pixelSize / 6);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 2, pixelSize / 6);
            ctx.fillStyle = colors[CLONE_LERP];
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 6, pixelSize);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 2, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize * 2 / 3, pixelSize / 2, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(10, 0, 10, 60);
            ctx.fillRect(0, 10, 30, 10);
            ctx.fillRect(0, 40, 30, 10);
            ctx.fillStyle = colors[CLONE];
            ctx.fillRect(40, 0, 10, 60);
            ctx.fillRect(30, 10, 30, 10);
            ctx.fillRect(30, 40, 30, 10);
        },
        update: function(x, y) {
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            forAllTouching(x, y, function(x1, y1) {
                if (grid[y1][x1][0] >= PISTON_LEFT && grid[y1][x1][0] <= PENETRATOR_DOWN) {
                    if (grid[y1][x1][0] % 4 == 1) {
                        setPixel(x1, y1, grid[y1][x1][0] + 1, null);
                    }
                    else if (grid[y1][x1][0] % 4 == 2) {
                        setPixel(x1, y1, grid[y1][x1][0] - 1, null);
                    }
                    else if (grid[y1][x1][0] % 4 == 3) {
                        setPixel(x1, y1, grid[y1][x1][0] + 1, null);
                    }
                    else if (grid[y1][x1][0] % 4 == 0) {
                        setPixel(x1, y1, grid[y1][x1][0] - 1, null);
                    }
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 5 / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 6, pixelSize / 2);
            ctx.fillStyle = colors[CLONE_LERP];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize * 5 / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 2);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(10, 10, 50, 10);
            ctx.fillRect(40, 0, 10, 30);
            ctx.fillStyle = colors[CLONE];
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
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            var leftPixel = [grid[y][x - 1][0], grid[y][x - 1][1]];
            setPixel(x - 1, y, grid[y][x + 1][0], grid[y][x + 1][1]);
            setPixel(x + 1, y, leftPixel[0], leftPixel[1]);
        },
        updateStage: 2,
        updateDirection: "down",
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 5 / 6);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 2, pixelSize / 6);
            ctx.fillStyle = colors[CLONE_LERP];
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 6, pixelSize * 5 / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 2, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
            ctx.fillRect(10, 10, 10, 50);
            ctx.fillRect(0, 40, 30, 10);
            ctx.fillStyle = colors[CLONE];
            ctx.fillRect(40, 0, 10, 50);
            ctx.fillRect(30, 10, 30, 10);
            // ctx.fillStyle = colors[CLONE];
            // ctx.fillRect(10, 0, 40, 10);
            // ctx.fillRect(20, 10, 20, 10);
            // ctx.fillRect(20, 40, 20, 10);
            // ctx.fillRect(10, 50, 40, 10);
        },
        update: function(x, y) {
            if (y == 0 || y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            var abovePixel = [grid[y - 1][x][0], grid[y - 1][x][1]];
            setPixel(x, y - 1, grid[y + 1][x][0], grid[y + 1][x][1]);
            setPixel(x, y + 1, abovePixel[0], abovePixel[1]);
        },
        updateStage: 2,
        updateDirection: "right",
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[PUSH_LERP];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colorToRGB(colors[STONE]);
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PUSH];
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[REFLECTOR];
            ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 2, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[REFLECTOR];
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[REFLECTOR];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[REFLECTOR];
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(50, 20, 10, 20);
        },
        update: function(x, y) {
            if (grid[y][x][1] == FIRE) {
                // if (isTouchingDiagonal(x, y, null, FIRE) || grid[y][x][1] == FIRE) {
                explode(x, y, 10, FIRE, 1, 0.25);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (pixels[grid[y][x - 1][0]].flammable != 0) {
                grid[y][x - 1][1] = FIRE;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(30, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (pixels[grid[y][x + 1][0]].flammable != 0) {
                grid[y][x + 1][1] = FIRE;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (pixels[grid[y - 1][x][0]].flammable != 0) {
                grid[y - 1][x][1] = FIRE;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 30, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (pixels[grid[y + 1][x][0]].flammable != 0) {
                grid[y + 1][x][1] = FIRE;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(0, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 90 != 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y][x - 1][0] == AIR) {
                grid[y][x - 1][1] = IGNITOR_LASER_BEAM_LEFT;
            }
            else if (gameTick % 9 == 0 && grid[y][x - 1][0] == REFLECTOR_HORIZONTAL && y != 0) {
                grid[y - 1][x - 1][1] = IGNITOR_LASER_BEAM_UP;
            }
            else if (gameTick % 9 == 0 && grid[y][x - 1][0] == REFLECTOR_VERTICAL && y != gridSize - 1) {
                grid[y + 1][x - 1][1] = IGNITOR_LASER_BEAM_DOWN;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(20, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 90 != 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y][x + 1][0] == AIR) {
                grid[y][x + 1][1] = IGNITOR_LASER_BEAM_RIGHT;
            }
            else if (gameTick % 9 == 0 && grid[y][x + 1][0] == REFLECTOR_HORIZONTAL && y != gridSize - 1) {
                grid[y + 1][x + 1][1] = IGNITOR_LASER_BEAM_DOWN;
            }
            else if (gameTick % 9 == 0 && grid[y][x + 1][0] == REFLECTOR_VERTICAL && y != 0) {
                grid[y - 1][x + 1][1] = IGNITOR_LASER_BEAM_UP;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(20, 0, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 90 != 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y - 1][x][0] == AIR) {
                grid[y - 1][x][1] = IGNITOR_LASER_BEAM_UP;
            }
            else if (gameTick % 9 == 0 && grid[y - 1][x][0] == REFLECTOR_HORIZONTAL && x != 0) {
                grid[y - 1][x - 1][1] = IGNITOR_LASER_BEAM_LEFT;
            }
            else if (gameTick % 9 == 0 && grid[y - 1][x][0] == REFLECTOR_VERTICAL && x != gridSize - 1) {
                grid[y - 1][x + 1][1] = IGNITOR_LASER_BEAM_RIGHT;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(20, 20, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 90 != 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y + 1][x][0] == AIR) {
                grid[y + 1][x][1] = IGNITOR_LASER_BEAM_DOWN;
            }
            else if (gameTick % 9 == 0 && grid[y + 1][x][0] == REFLECTOR_HORIZONTAL && x != gridSize - 1) {
                grid[y + 1][x + 1][1] = IGNITOR_LASER_BEAM_RIGHT;
            }
            else if (gameTick % 9 == 0 && grid[y + 1][x][0] == REFLECTOR_VERTICAL && x != 0) {
                grid[y + 1][x - 1][1] = IGNITOR_LASER_BEAM_LEFT;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(0, 20, 40, 20);
            ctx.fillRect(30, 10, 20, 10);
            ctx.fillRect(30, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 360 != 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y][x - 1][0] == AIR) {
                grid[y][x - 1][0] = IGNITOR_MISSILE_LEFT;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(20, 20, 40, 20);
            ctx.fillRect(10, 10, 20, 10);
            ctx.fillRect(10, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 360 != 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y][x + 1][0] == AIR) {
                grid[y][x + 1][0] = IGNITOR_MISSILE_RIGHT;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(20, 0, 20, 40);
            ctx.fillRect(10, 30, 10, 20);
            ctx.fillRect(40, 30, 10, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 360 != 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y - 1][x][0] == AIR) {
                grid[y - 1][x][0] = IGNITOR_MISSILE_UP;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(20, 20, 20, 40);
            ctx.fillRect(10, 10, 10, 20);
            ctx.fillRect(40, 10, 10, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 360 != 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y + 1][x][0] == AIR) {
                grid[y + 1][x][0] = IGNITOR_MISSILE_DOWN;
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, width * pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == 0) {
                explode(x, y, 5, FIRE, 1, 0.5);
                return;
            }
            if (y != 0 && grid[y][x - 1][0] == REFLECTOR_HORIZONTAL) {
                grid[y - 1][x - 1][1] = IGNITOR_LASER_BEAM_UP;
                changePixel(x, y, null, AIR);
                return;
            }
            if (y != gridSize - 1 && grid[y][x - 1][0] == REFLECTOR_VERTICAL) {
                grid[y + 1][x - 1][1] = IGNITOR_LASER_BEAM_DOWN;
                changePixel(x, y, null, AIR);
                return;
            }
            if (grid[y][x][0] != AIR || grid[y][x - 1][0] != AIR || (grid[y][x - 1][1] != AIR && grid[y][x - 1][1] != FIRE && grid[y][x - 1][1] != IGNITOR_LASER_BEAM_LEFT)) {
                explode(x, y, 5, FIRE, 1, 0.5);
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, width * pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                explode(x, y, 5, FIRE, 1, 0.5);
                return;
            }
            if (y != gridSize - 1 && grid[y][x + 1][0] == REFLECTOR_HORIZONTAL) {
                grid[y + 1][x + 1][1] = IGNITOR_LASER_BEAM_DOWN;
                changePixel(x, y, null, AIR);
                return;
            }
            if (y != 0 && grid[y][x + 1][0] == REFLECTOR_VERTICAL) {
                grid[y - 1][x + 1][1] = IGNITOR_LASER_BEAM_UP;
                changePixel(x, y, null, AIR);
                return;
            }
            if (grid[y][x][0] != AIR || grid[y][x + 1][0] != AIR || (grid[y][x + 1][1] != AIR && grid[y][x + 1][1] != FIRE && grid[y][x + 1][1] != IGNITOR_LASER_BEAM_RIGHT)) {
                explode(x, y, 5, FIRE, 1, 0.5);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == 0) {
                explode(x, y, 5, FIRE, 1, 0.5);
                return;
            }
            if (x != 0 && grid[y - 1][x][0] == REFLECTOR_HORIZONTAL) {
                grid[y - 1][x - 1][1] = IGNITOR_LASER_BEAM_LEFT;
                grid[y][x][1] = AIR;
                return;
            }
            if (x != gridSize - 1 && grid[y - 1][x][0] == REFLECTOR_VERTICAL) {
                grid[y - 1][x + 1][1] = IGNITOR_LASER_BEAM_RIGHT;
                grid[y][x][1] = AIR;
                return;
            }
            if (grid[y][x][0] != AIR || grid[y - 1][x][0] != AIR || (grid[y - 1][x][1] != AIR && grid[y - 1][x][1] != FIRE && grid[y - 1][x][1] != IGNITOR_LASER_BEAM_UP)) {
                explode(x, y, 5, FIRE, 1, 0.5);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                explode(x, y, 5, FIRE, 1, 0.5);
                return;
            }
            if (x != gridSize - 1 && grid[y + 1][x][0] == REFLECTOR_HORIZONTAL) {
                grid[y + 1][x + 1][1] = IGNITOR_LASER_BEAM_RIGHT;
                changePixel(x, y, null, AIR);
                return;
            }
            if (x != 0 && grid[y + 1][x][0] == REFLECTOR_VERTICAL) {
                grid[y + 1][x - 1][1] = IGNITOR_LASER_BEAM_LEFT;
                changePixel(x, y, null, AIR);
                return;
            }
            if (grid[y][x][0] != AIR || grid[y + 1][x][0] != AIR || (grid[y + 1][x][1] != AIR && grid[y + 1][x][1] != FIRE && grid[y + 1][x][1] != IGNITOR_LASER_BEAM_DOWN)) {
                explode(x, y, 5, FIRE, 1, 0.5);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(0, 20, 20, 20);
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(40, 20, 10, 20);
            ctx.fillRect(50, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                explode(x, y, 10, FIRE, 5, 0.5);
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (grid[y][x - 1][0] != AIR || (grid[y][x - 1][1] != AIR && grid[y][x - 1][1] != FIRE)) {
                explode(x, y, 10, FIRE, 5, 0.5);
                return;
            }
            move(x, y, [{ x: -1, y: 0 }], 0);
            setPixel(x, y, null, FIRE);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(40, 20, 20, 20);
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(10, 20, 10, 20);
            ctx.fillRect(0, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                explode(x, y, 10, FIRE, 5, 0.5);
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (grid[y][x + 1][0] != AIR || (grid[y][x + 1][1] != AIR && grid[y][x + 1][1] != FIRE)) {
                explode(x, y, 10, FIRE, 5, 0.5);
                return;
            }
            move(x, y, [{ x: 1, y: 0 }], 0);
            setPixel(x, y, null, FIRE);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 5 / 6, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(20, 0, 20, 20);
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(20, 40, 20, 10);
            ctx.fillRect(10, 50, 40, 10);
        },
        update: function(x, y) {
            if (y == 0) {
                explode(x, y, 10, FIRE, 5, 0.5);
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (grid[y - 1][x][0] != AIR || (grid[y - 1][x][1] != AIR && grid[y - 1][x][1] != FIRE)) {
                explode(x, y, 10, FIRE, 5, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: -1 }], 0);
            setPixel(x, y, null, FIRE);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[EXPLOSIVE][0];
            ctx.fillRect(20, 40, 20, 20);
            ctx.fillStyle = colors[EXPLOSIVE][1];
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors[EXPLOSIVE][2];
            ctx.fillRect(20, 10, 20, 10);
            ctx.fillRect(10, 0, 40, 10);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                explode(x, y, 10, FIRE, 5, 0.5);
                return;
            }
            if (grid[y][x][1] == FROST_FIRE && gameTick % 9 != 0) {
                return;
            }
            if (grid[y + 1][x][0] != AIR || (grid[y + 1][x][1] != AIR && grid[y + 1][x][1] != FIRE)) {
                explode(x, y, 10, FIRE, 5, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: 1 }], 0);
            setPixel(x, y, null, FIRE);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(50, 20, 10, 20);
        },
        update: function(x, y) {
            if (grid[y][x][1] == FROST_FIRE) {
                // if (isTouchingDiagonal(x, y, null, FROST_FIRE) || grid[y][x][1] == FROST_FIRE) {
                explode(x, y, 10, FROST_FIRE, 1, 0.25);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(0, 20, 10, 20);
            ctx.fillRect(10, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            grid[y][x - 1][1] = FROST_FIRE;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(50, 20, 10, 20);
            ctx.fillRect(30, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            grid[y][x + 1][1] = FROST_FIRE;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(20, 0, 20, 10);
            ctx.fillRect(10, 10, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            grid[y - 1][x][1] = FROST_FIRE;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 5 / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(20, 50, 20, 10);
            ctx.fillRect(10, 30, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            grid[y + 1][x][1] = FROST_FIRE;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(0, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y][x - 1][0] == AIR) {
                grid[y][x - 1][1] = FROST_IGNITOR_LASER_BEAM_LEFT;
            }
            else if (gameTick % 9 == 0 && grid[y][x - 1][0] == REFLECTOR_HORIZONTAL && y != 0) {
                grid[y - 1][x - 1][1] = FROST_IGNITOR_LASER_BEAM_UP;
            }
            else if (gameTick % 9 == 0 && grid[y][x - 1][0] == REFLECTOR_VERTICAL && y != gridSize - 1) {
                grid[y + 1][x - 1][1] = FROST_IGNITOR_LASER_BEAM_DOWN;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(20, 20, 40, 20);
            ctx.fillRect(20, 10, 20, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y][x + 1][0] == AIR) {
                grid[y][x + 1][1] = FROST_IGNITOR_LASER_BEAM_RIGHT;
            }
            else if (gameTick % 9 == 0 && grid[y][x + 1][0] == REFLECTOR_HORIZONTAL && y != gridSize - 1) {
                grid[y + 1][x + 1][1] = FROST_IGNITOR_LASER_BEAM_DOWN;
            }
            else if (gameTick % 9 == 0 && grid[y][x + 1][0] == REFLECTOR_VERTICAL && y != 0) {
                grid[y - 1][x + 1][1] = FROST_IGNITOR_LASER_BEAM_UP;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(20, 0, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y - 1][x][0] == AIR) {
                grid[y - 1][x][1] = FROST_IGNITOR_LASER_BEAM_UP;
            }
            else if (gameTick % 9 == 0 && grid[y - 1][x][0] == REFLECTOR_HORIZONTAL && x != 0) {
                grid[y - 1][x - 1][1] = FROST_IGNITOR_LASER_BEAM_LEFT;
            }
            else if (gameTick % 9 == 0 && grid[y - 1][x][0] == REFLECTOR_VERTICAL && x != gridSize - 1) {
                grid[y - 1][x + 1][1] = FROST_IGNITOR_LASER_BEAM_RIGHT;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(20, 20, 20, 40);
            ctx.fillRect(10, 20, 40, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (gameTick % 9 == 0 && grid[y + 1][x][0] == AIR) {
                grid[y + 1][x][1] = FROST_IGNITOR_LASER_BEAM_DOWN;
            }
            else if (gameTick % 9 == 0 && grid[y + 1][x][0] == REFLECTOR_HORIZONTAL && x != gridSize - 1) {
                grid[y + 1][x + 1][1] = FROST_IGNITOR_LASER_BEAM_RIGHT;
            }
            else if (gameTick % 9 == 0 && grid[y + 1][x][0] == REFLECTOR_VERTICAL && x != 0) {
                grid[y + 1][x - 1][1] = FROST_IGNITOR_LASER_BEAM_LEFT;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 2, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(0, 20, 40, 20);
            ctx.fillRect(30, 10, 20, 10);
            ctx.fillRect(30, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y][x - 1][0] == AIR) {
                grid[y][x - 1][0] = FROST_IGNITOR_MISSILE_LEFT;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize * 2 / 3, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(20, 20, 40, 20);
            ctx.fillRect(10, 10, 20, 10);
            ctx.fillRect(10, 40, 20, 10);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y][x + 1][0] == AIR) {
                grid[y][x + 1][0] = FROST_IGNITOR_MISSILE_RIGHT;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(20, 0, 20, 40);
            ctx.fillRect(10, 30, 10, 20);
            ctx.fillRect(40, 30, 10, 20);
        },
        update: function(x, y) {
            if (y == 0) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y - 1][x][0] == AIR) {
                grid[y - 1][x][0] = FROST_IGNITOR_MISSILE_UP;
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize * 2 / 3);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(20, 20, 20, 40);
            ctx.fillRect(10, 10, 10, 20);
            ctx.fillRect(40, 10, 10, 20);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                return;
            }
            if (gameTick % 36 == 0 && grid[y + 1][x][0] == AIR) {
                grid[y + 1][x][0] = FROST_IGNITOR_MISSILE_DOWN;
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, width * pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == 0) {
                explode(x, y, 5, FROST_FIRE, 1, 0.5);
                return;
            }
            if (y != 0 && grid[y][x - 1][0] == REFLECTOR_HORIZONTAL) {
                grid[y - 1][x - 1][1] = FROST_IGNITOR_LASER_BEAM_UP;
                changePixel(x, y, null, AIR);
                return;
            }
            if (y != gridSize - 1 && grid[y][x - 1][0] == REFLECTOR_VERTICAL) {
                grid[y + 1][x - 1][1] = FROST_IGNITOR_LASER_BEAM_DOWN;
                changePixel(x, y, null, AIR);
                return;
            }
            if (grid[y][x][0] != AIR || grid[y][x - 1][0] != AIR || (grid[y][x - 1][1] != AIR && grid[y][x - 1][1] != FROST_FIRE && grid[y][x - 1][1] != FROST_IGNITOR_LASER_BEAM_LEFT)) {
                explode(x, y, 5, FROST_FIRE, 1, 0.5);
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, width * pixelSize, pixelSize / 3);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(0, 20, 60, 20);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                explode(x, y, 5, FROST_FIRE, 1, 0.5);
                return;
            }
            if (y != gridSize - 1 && grid[y][x + 1][0] == REFLECTOR_HORIZONTAL) {
                grid[y + 1][x + 1][1] = FROST_IGNITOR_LASER_BEAM_DOWN;
                changePixel(x, y, null, AIR);
                return;
            }
            if (y != 0 && grid[y][x + 1][0] == REFLECTOR_VERTICAL) {
                grid[y - 1][x + 1][1] = FROST_IGNITOR_LASER_BEAM_UP;
                changePixel(x, y, null, AIR);
                return;
            }
            if (grid[y][x][0] != AIR || grid[y][x + 1][0] != AIR || (grid[y][x + 1][1] != AIR && grid[y][x + 1][1] != FROST_FIRE && grid[y][x + 1][1] != FROST_IGNITOR_LASER_BEAM_RIGHT)) {
                explode(x, y, 5, FROST_FIRE, 1, 0.5);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == 0) {
                explode(x, y, 5, FROST_FIRE, 1, 0.5);
                return;
            }
            if (x != 0 && grid[y - 1][x][0] == REFLECTOR_HORIZONTAL) {
                grid[y - 1][x - 1][1] = FROST_IGNITOR_LASER_BEAM_LEFT;
                grid[y][x][1] = AIR;
                return;
            }
            if (x != gridSize - 1 && grid[y - 1][x][0] == REFLECTOR_VERTICAL) {
                grid[y - 1][x + 1][1] = FROST_IGNITOR_LASER_BEAM_RIGHT;
                grid[y][x][1] = AIR;
                return;
            }
            if (grid[y][x][0] != AIR || grid[y - 1][x][0] != AIR || (grid[y - 1][x][1] != AIR && grid[y - 1][x][1] != FROST_FIRE && grid[y - 1][x][1] != FROST_IGNITOR_LASER_BEAM_UP)) {
                explode(x, y, 5, FROST_FIRE, 1, 0.5);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(20, 0, 20, 60);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                explode(x, y, 5, FROST_FIRE, 1, 0.5);
                return;
            }
            if (x != gridSize - 1 && grid[y + 1][x][0] == REFLECTOR_HORIZONTAL) {
                grid[y + 1][x + 1][1] = FROST_IGNITOR_LASER_BEAM_RIGHT;
                changePixel(x, y, null, AIR);
                return;
            }
            if (x != 0 && grid[y + 1][x][0] == REFLECTOR_VERTICAL) {
                grid[y + 1][x - 1][1] = FROST_IGNITOR_LASER_BEAM_LEFT;
                changePixel(x, y, null, AIR);
                return;
            }
            if (grid[y][x][0] != AIR || grid[y + 1][x][0] != AIR || (grid[y + 1][x][1] != AIR && grid[y + 1][x][1] != FROST_FIRE && grid[y + 1][x][1] != FROST_IGNITOR_LASER_BEAM_DOWN)) {
                explode(x, y, 5, FROST_FIRE, 1, 0.5);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize + pixelSize * 5 / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(0, 20, 20, 20);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(40, 20, 10, 20);
            ctx.fillRect(50, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == 0) {
                explode(x, y, 10, FROST_FIRE, 5, 0.5);
                return;
            }
            if (grid[y][x - 1][0] != AIR || (grid[y][x - 1][1] != AIR && grid[y][x - 1][1] != FROST_FIRE)) {
                explode(x, y, 10, FROST_FIRE, 5, 0.5);
                return;
            }
            move(x, y, [{ x: -1, y: 0 }], 0);
            setPixel(x, y, null, FROST_FIRE);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 3);
            ctx.fillRect(x * pixelSize, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize * 2 / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(40, 20, 20, 20);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(10, 20, 10, 20);
            ctx.fillRect(0, 10, 10, 40);
        },
        update: function(x, y) {
            if (x == gridSize - 1) {
                explode(x, y, 10, FROST_FIRE, 5, 0.5);
                return;
            }
            if (grid[y][x + 1][0] != AIR || (grid[y][x + 1][1] != AIR && grid[y][x + 1][1] != FROST_FIRE)) {
                explode(x, y, 10, FROST_FIRE, 5, 0.5);
                return;
            }
            move(x, y, [{ x: 1, y: 0 }], 0);
            setPixel(x, y, null, FROST_FIRE);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 5 / 6, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(20, 0, 20, 20);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(20, 40, 20, 10);
            ctx.fillRect(10, 50, 40, 10);
        },
        update: function(x, y) {
            if (y == 0) {
                explode(x, y, 10, FROST_FIRE, 5, 0.5);
                return;
            }
            if (grid[y - 1][x][0] != AIR || (grid[y - 1][x][1] != AIR && grid[y - 1][x][1] != FROST_FIRE)) {
                explode(x, y, 10, FROST_FIRE, 5, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: -1 }], 0);
            setPixel(x, y, null, FROST_FIRE);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 6, pixelSize / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][0];
            ctx.fillRect(20, 40, 20, 20);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][1];
            ctx.fillRect(20, 20, 20, 20);
            ctx.fillStyle = colors[FROST_EXPLOSIVE][2];
            ctx.fillRect(20, 10, 20, 10);
            ctx.fillRect(10, 0, 40, 10);
        },
        update: function(x, y) {
            if (y == gridSize - 1) {
                explode(x, y, 10, FROST_FIRE, 5, 0.5);
                return;
            }
            if (grid[y + 1][x][0] != AIR || (grid[y + 1][x][1] != AIR && grid[y + 1][x][1] != FROST_FIRE)) {
                explode(x, y, 10, FROST_FIRE, 5, 0.5);
                return;
            }
            move(x, y, [{ x: 0, y: 1 }], 0);
            setPixel(x, y, null, FROST_FIRE);
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[MONSTER][1];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[MONSTER][0];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 3, pixelSize / 6, pixelSize / 6);
            ctx.fillStyle = colors[MONSTER][3];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[MONSTER][2];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[MONSTER][2];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[MONSTER][1];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[MONSTER][0];
            ctx.fillRect(10, 20, 10, 10);
            ctx.fillRect(40, 20, 10, 10);
            ctx.fillStyle = colors[MONSTER][3];
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[MONSTER][1];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[MONSTER][3];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 2, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize * 2 / 3, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[MONSTER][2];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[MONSTER][2];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[MONSTER][1];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[MONSTER][3];
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
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[MONSTER][1];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[MONSTER][3];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 2, pixelSize * 2 / 3, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize * 2 / 3, pixelSize / 6, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[MONSTER][2];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[MONSTER][2];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[MONSTER][1];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[MONSTER][3];
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
        description: "You destroyed its friends. Now it's sad. Can be destroyed with any pixel. All monsters need to be destroyed to finish the level.",
        type: "Level Construction",
        amountColor: "rgb(255, 255, 255)",
        hidden: false,
    },
    {
        draw: function(x, y, ctx) {
            ctx.fillStyle = colors[MONSTER][1];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize * 2 / 3, pixelSize * 2 / 3);
            ctx.fillStyle = colors[MONSTER][3];
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize * 2 / 3, y * pixelSize + pixelSize / 6, pixelSize / 6, pixelSize / 6);
            ctx.fillRect(x * pixelSize + pixelSize / 6, y * pixelSize + pixelSize * 2 / 3, pixelSize / 6, pixelSize / 6);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.fillStyle = colors[MONSTER][2];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[MONSTER][2];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[MONSTER][1];
            ctx.fillRect(10, 10, 40, 40);
            ctx.fillStyle = colors[MONSTER][3];
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
    {
        draw: function(x, y, ctx) {
            // ctx.fillStyle = colors[PLACEABLE];
            // ctx.fillRect(x * pixelSize + pixelSize / 3, y * pixelSize + pixelSize / 3, pixelSize / 3, pixelSize / 3);
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PLACEABLE];
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
    {
        draw: function(x, y, ctx) {
        },
        drawBackground: function(x, y, width, ctx) {
            ctx.clearRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
            ctx.fillStyle = colors[PLACEABLE];
            ctx.fillRect(x * pixelSize, y * pixelSize, width * pixelSize, pixelSize);
        },
        drawPreview: function(ctx) {
            ctx.fillStyle = colors[AIR];
            ctx.fillRect(0, 0, 60, 60);
            ctx.fillStyle = colors[PLACEABLE];
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
];

for (var i in pixels) {
    if (pixels[i].name.includes("(Left)")) {
        pixels[i].updateDirection = "right";
    }
    if (pixels[i].name.includes("(Right)")) {
        pixels[i].updateDirection = "left";
    }
    if (pixels[i].name.includes("(Up)")) {
        pixels[i].updateDirection = "down";
    }
    if (pixels[i].name.includes("(Down)")) {
        pixels[i].updateDirection = "up";
    }
}

var pixelInventory = {};
for (var i = 0; i < pixels.length; i++) {
    pixelInventory[i] = 0;
}