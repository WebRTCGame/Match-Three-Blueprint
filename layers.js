    var Layers = function(layerCount, iWidth, iHeight) {
        this.Lays = [];
        this.names = {};

        for (var i = 0; i < layerCount; i++) {

            //var tempHolder = new imageHolder(iWidth, iHeight);
            this.Lays.push(new imageHolder(iWidth, iHeight));
            //this[i] = function() {
            //    return this.Lays[i]
            //};
            
            //console.log("lays " + i + " is drawn: " + this.Lays[i].drawn + " and has context " + this.Lays[i].context)
            //console.log("lays count: " + this.Lays.length);
        }
        //console.log(this[1]());
    };
    Layers.prototype.add = function(iWidth,iHeight,name){
        this.Lays.push(new imageHolder(iWidth, iHeight));
        name && this.nameLayer(this.length(),name);
        return this.top();
    };
    Layers.prototype.nameLayer = function(layerZ, name) {
        this.names[name] = layerZ;
    };
    Layers.prototype.byName = function(name) {
        return this.names.hasOwnProperty(name) && this.byZ(this.names[name]);
    };
    Layers.prototype.length = function() {
        return this.Lays.length;
    };
    Layers.prototype.base = function() {
        return this.Lays[0];
    };
    Layers.prototype.top = function() {
        return this.Lays[this.length() - 1];
    };
    Layers.prototype.byZ = function(z) {

        return this.Lays[z];

    };

    Layers.prototype.composite = function(icontext) {
        for (var i = 0; i < this.Lays.length; i++) {
            icontext.drawImage(this.Lays[i].canvas, 0, 0);
        }
    };