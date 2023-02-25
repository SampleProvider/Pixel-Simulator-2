new p5();

var noiseGrid = [];
var randomGrid = [];
var animatedNoiseGrid = [];

// setup = function() {
noiseDetail(3, 0.6);
var setNoiseGrid = function() {
    noiseGrid = [];
    animatedNoiseGrid = [];
    randomGrid = [];
    for (var i = 0; i < gridSize; i++) {
        noiseGrid[i] = [];
        animatedNoiseGrid[i] = [];
        randomGrid[i] = [];
        for (var j = 0; j < gridSize; j++) {
            noiseGrid[i][j] = noise(j / 2, i / 2, 0);
            animatedNoiseGrid[i][j] = noise(j / 4, i / 4, gameTick / 10);
            randomGrid[i][j] = [getRandom(), getRandom(), getRandom(), getRandom(), getRandom(), getRandom(), getRandom(), getRandom()];
        }
    }
};
var updateNoiseGrid = function(x, y) {
    // for (var i = 0; i < gridSize; i++) {
    //     for (var j = 0; j < gridSize; j++) {
    animatedNoiseGrid[y][x] = noise(x / 4, y / 4, gameTick / 10);
    //     }
    // }
};
randomSeed(1);
var getRandom = function() {
    return random();
};
var resetRandom = function() {
    randomSeed(1);
};
// };