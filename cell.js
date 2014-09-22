var animCell = function(x,y,w,h,t){
    this.x = x || 0;
    this.y = y || 0;
    this.width = w || 0;
    this.height = h || 0;
    this.type = t || 'void';
};
animCell.prototype.render = function(){
     
           
            grid.drawGemUnbound(this.type,layers.byZ(4).context,this.x,this.y);
             
            //drawFrame(true,true);
};
        