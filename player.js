var Player = function(playerJson){
    this.id = 0;
    this.name = "";
    this.gold = 0;
    this.base = 3;
    this.stats = {
        red:0,
        green:0,
        blue:0,
        yellow:0,
        battle:0,
        cunning:0,
        morale:0,
        exp:0,
    }
    
    this.init(playerJson);
    
};
Player.prototype.init = function(playerJson){
    if(playerJson){
        var json = JSON.parse(playerJson);
        this.id = json.id;
        this.name = json.name;
        this.gold = json.gold;
        this.stats.red = json.stats.red;
        this.stats.green = json.stats.green;
        this.stats.blue = json.stats.blue;
        this.stats.yellow = json.stats.yellow;
        this.stats.battle = json.stats.battle;
        this.stats.cunning = json.stats.cunning;
        this.stats.morale = json.stats.morale;
        this.stats.exp = json.stats.exp;
    }
};
Player.prototype.computeValues = function(){
    
};

var GameStat = function(type, level){
    
};

function computeStartingMana(level){
    return Math.round(level/10+1);
};
function computeMatch3amount(level,base){
    return Math.round(level/20+base);
};
function computeMatchamount(level,base,quantitityMatched){
    var quant = quantitityMatched -2;
    return Math.round((level/20+base)*(quant));
};
function computeResistance(level){
    return Math.round(level/50);
};
function computeMaxMana(level){
    return Math.round(level/2.1+1);
};
function computeChanceExtraTurn(level){
    return Math.round(level/7);
};
function computeChanceWildCard(level){
    return Math.round(level/15);
};
function computeCostToUpgrade(level){
    return Math.round(level/60+1);
};