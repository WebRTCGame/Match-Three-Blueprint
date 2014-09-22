    var imageHolder = function(w, h) {

        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');

        this.canvas.width = w;
        this.canvas.height = h;
        this.drawn = false;
        this.needsUpdate = true;
        this.dirty = false;
    };
    imageHolder.prototype.clear = function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    };
    imageHolder.prototype.flip = function(icontext) {
        icontext.drawImage(this.canvas, 0, 0);
    };