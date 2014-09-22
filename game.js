    var canvas, context, mouse;
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    var fps = 0,
        now, lastUpdate = (new Date) * 1;
    var fpsFilter = 50;
    var grid;
    var gemImage;
    var gemImages = [];
    var mouseGrid;
    var layers;
    var cellsNeedUpdate = true;
    var ac1 = new animCell(0, 0, 10, 10, 'wild');
    var ac2 = new animCell(0, 0, 10, 10, 'wild');


    var init = function() {

        console.log("init");

        layers = new Layers(6, canvas.width, canvas.height);

        mouse = utils.captureMouse(canvas);

        grid = new Grid();

        mouseGrid = grid.coordFromPoint({
            x: mouse.x,
            y: mouse.y
        });

        canvas.addEventListener('mouseup', function() {
            //grid.needsUpdate = true;
            // cellsNeedUpdate = true;
            drawFrame(true, true);
            //game.checkBoardForMatches(grid.cells);

        }, false);

        canvas.addEventListener('mousedown', function() {
            //grid.needsUpdate = true;
            //cellsNeedUpdate = true;

            var sel = mouseGrid;
            if (grid) {
                //for(var i = 0;i<grid.cols;i++){
                //    for(var j = 0;j<grid.rows;j++){
                //        game.findSwaps(grid.cells,grid.cells[i + "," + j]);
                //    }
                //}

                if (grid.selected1) {
                    if (sel.x == grid.selected1.x && sel.y == grid.selected1.y) {
                        grid.selected1 = undefined;
                    }
                    else {
                        var near = (Math.abs(sel.x - grid.selected1.x) + Math.abs(sel.y - grid.selected1.y)) < 2;
                        console.log("near: " + near)
                        if (near) {
                            var cando = game.canSwap(grid.cells, grid.cells[grid.selected1.x + "," + grid.selected1.y], grid.cells[sel.x + "," + sel.y]); //game.canSwapAny(grid.cells, grid.cells[grid.selected1.x+","+grid.selected1.y]);
                            if (cando) {
                                game.swap(grid.cells, grid.cells[sel.x + "," + sel.y], grid.cells[grid.selected1.x + "," + grid.selected1.y]);
                                //var matches = game.checkBoardForMatches(grid.cells);
                                //game.voidCells(grid.cells, matches);
                                //game.fall(grid.cells);
                                // game.processBoard(grid.cells);
                                xprocessBoard();
                                grid.selected1 = undefined;
                                sel = undefined;

                                grid.needsUpdate = true;
                            }
                            grid.needsUpdate = true;
                        }
                        else {
                            grid.selected1 = undefined;
                        }


                    }
                }
                else {
                    grid.selected1 = sel;
                }
                drawFrame(true, true);
            }

        }, false);

        canvas.addEventListener('mousemove', function(evt) {
            if (grid) {
                var gcfp = grid.coordFromPoint({
                    x: mouse.x,
                    y: mouse.y
                });
                if (mouseGrid.x !== gcfp.x || mouseGrid.y !== gcfp.y) {
                    mouseGrid = gcfp;
                    //grid.needsUpdate = true;
                    drawFrame(true, false);
                }
            }
            // ac.x = mouse.x;
            // ac.y = mouse.y;
            // ac.render();


        }, false);

        //game.checkBoardForMatches(grid.cells);
        /*
        for (var x = 0; x < game.rows; x += 1) {
            for (var y = 0; y < game.cols; y += 1) {

                layers.byZ(0).context.drawImage(gemImages[15].canvas, x * grid.cellWidth, y * grid.cellHeight, grid.cellWidth, grid.cellHeight);
            }
        }
        */
        grid.drawBackground();
        drawFrame(true, true);
    };




    var anim = function() {
        animateTheShit(0, 0, 100, 100, 200, 200, 400, 100, 'gold', 'green');
    };

    var animateTheShit = function(ac1xstart, ac1ystart, ac1xend, ac1yend, ac2xstart, ac2ystart, ac2xend, ac2yend, ac1type, ac2type) {
        ac1.x = ac1xstart;
        ac1.y = ac1ystart;
        ac1.type = ac1type;
        ac2.x = ac2xstart;
        ac2.y = ac2ystart;
        console.log(JSON.stringify(ac1));
        console.log(JSON.stringify(ac2));
        function doit() {
            //console.log("b");
            //layers.byZ(4).clear();
            ac1.render();
            ac2.render();
            drawFrame(true, true);
           // sleep(20);
        };
        if (ac1) {
            TweenLite.to(ac1, 1.5, {
                x: ac1xend,
                y: ac1yend,
                onUpdate: doit
            });
            TweenLite.to(ac2, 1.5, {
                x: ac2xend,
                y: ac2yend,
                onUpdate: doit
            });
        }
    };
    window.onload = function() {
        //init();
        processImage();
    };



    function processImage() {
        gemImage = new Image();
        gemImage.loaded = false;
        gemImage.src = 'gems.png';
        gemImage.addEventListener("load", function() {


            var imgW = gemImage.width;
            var imgH = gemImage.height;
            var tilesX = 4;
            var tilesY = 4;
            var stepX = imgW / tilesX;
            var stepY = imgH / tilesY;


            for (var x = 0; x < tilesX; x += 1) {
                for (var y = 0; y < tilesY; y += 1) {

                    var tempHolder = new imageHolder(stepX, stepY);
                    var left = x * stepX;
                    var top = y * stepY;

                    tempHolder.context.drawImage(gemImage, left, top, stepX, stepY, 0, 0, tempHolder.canvas.width, tempHolder.canvas.height);
                    gemImages.push(tempHolder);
                }
            }
            gemImage.loaded = true;
            console.log("gem image loaded");
            init();
        }, false);
    };





    var Grid = function() {
        this.left = 0;
        this.top = 0,
            this.right = canvas.width;
        this.bottom = canvas.height;
        this.doFlip = true;
        this.needsUpdate = true;
        this.cols = 8;
        this.rows = 8;

        this.cells = matrix(this.rows, this.cols, 0); //{};

        this.composite = new imageHolder(canvas.width, canvas.height);




        this.cellWidth = this.right / this.rows;
        this.cellHeight = this.bottom / this.cols;



        this.selected1 = undefined;
        this.selected2 = undefined;


        for (var x = 0; x < this.cells.length; x++) {
            for (var y = 0; y < this.cells[0].length; y++) {
                this.cells[x][y] = getRandomItemUnprepared(listObjects);
            }
        }

    };

    var xprocessBoard = function() {
        if (game && grid) {
            // this.needsUpdate = true;
            // cellsNeedUpdate = true;
            drawFrame(true, true);
            game.processBoard(grid.cells);
            //this.needsUpdate = true;
            // cellsNeedUpdate = true;
            drawFrame(true, true);
        }
    };

    Grid.prototype.coordFromPoint = function(point) {
        return {
            x: ~~(point.x / this.cellWidth),
            y: ~~(point.y / this.cellHeight)
        };
    };
    Grid.prototype.rectFromCoord = function(coord) {
        return {
            left: coord.x * this.cellWidth,
            top: coord.y * this.cellHeight,
            right: coord.x * this.cellWidth + this.cellWidth,
            bottom: coord.y * this.cellHeight + this.cellHeight
        };
    };

    Grid.prototype.getIndexByType = function(gemType) {
        var index = -1;

        switch (gemType) {
            case "green":
                index = 4;
                break;
            case "red":
                index = 8;
                break;
            case "yellow":
                index = 12;
                break;
            case "blue":
                index = 13;
                break;
            case "purple":
                index = 3;
                break;
            case "gold":
                index = 11;
                break;
            case "wild":
                index = 9;
                break;
            case "skull":
                index = 7;
                break;
            case "p5skull":
                index = 5;
                break;
            case "void":

                index = 14;
                break;
            default:
                index = -1;
                break;
        }
        return index;
    };
    Grid.prototype.drawBackground = function() {
        for (var x = 0; x < this.cells.length; x += 1) {
            for (var y = 0; y < this.cells[0].length; y += 1) {

                layers.byZ(0).context.drawImage(gemImages[15].canvas, x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);
            }
        }
    };

    Grid.prototype.drawGem = function(gemType, icontext, x, y) {

        icontext.drawImage(gemImages[this.getIndexByType(gemType)].canvas, x * this.cellWidth, y * this.cellHeight, this.cellWidth, this.cellHeight);

    };
    Grid.prototype.drawGemUnbound = function(gemType, icontext, x, y) {

        icontext.drawImage(gemImages[this.getIndexByType(gemType)].canvas, x, y, this.cellWidth, this.cellHeight);

    };

    Grid.prototype.drawAllGems = function() {
        //if (cellsNeedUpdate) {
        layers.byZ(1).clear();
        for (var x = 0; x < this.rows; x += 1) {
            for (var y = 0; y < this.cols; y += 1) {

                this.drawGem(this.cells[x][y], layers.byZ(1).context, x, y);
            }
        }

        //}
    };
    Grid.prototype.drawCursor = function() {
        layers.byZ(2).clear();
        layers.byZ(2).context.drawImage(gemImages[6].canvas, mouseGrid.x * this.cellWidth, mouseGrid.y * this.cellHeight, this.cellWidth, this.cellHeight);
        if (this.selected1) {
            layers.byZ(2).context.drawImage(gemImages[10].canvas, this.selected1.x * this.cellWidth, this.selected1.y * this.cellHeight, this.cellWidth, this.cellHeight);
        }
    };




    function drawFrame(upall, upboard) {

        if (upall) {

            if (upboard) {
                grid.drawAllGems();

            }
            grid.drawCursor();

            layers.composite(grid.composite.context);

        }
        grid.composite.flip(context);



        //window.requestAnimationFrame(drawFrame, canvas);
    };