

var itemTypeHowBy = {
    self:0,
    opponent:1,
    any:2
};

var itemTypeHow = {
    castable:0,
    beginningOfGame:1,
    beginningOfTurn:2,
    endOfTurn:3,
    endOfGame:4,
    winGame:5,
    loseGame:6,
    maxManaReached:7,
    zeroManaReached:8,
    spellCast:9,
    manaGained:12,
    manaLost:13,
    hpLost:14,
    hpGained:15,
    spellRejected:16,
    
};
var itemTypeIniator = {
    match:0,
    maxGreenGem:1,
    maxRedGem:2,
    maxYellowGem:3,
    maxBlueGem:4,
    zeroGreenGem:5,
    zeroRedGem:6,
    zeroYellowGem:7,
    zeroBlueGem:8
};
var itemTypeIniatorEffects = {
    geenGem:0,
    redGem:1,
    yellowGem:2,
    blueGem:3,
    maxGreenGem:4,
    maxRedGem:5,
    maxYellowGem:6,
    maxBlueGem:7,
    
};
var itemEffector = {
    self:0,
    opponent:1,
    board:2
};

var Material = function(){
    this.type = "";
    this.baseCost = {g:0,r:0,y:0,b:0};
    this.shopCost = 100;
};