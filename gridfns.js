var game = {
    left: 0,
    top: 0,
    right: canvas.width,
    top: canvas.height,
    rows: 8,
    cols: 8,
    cloneBoard: function(cells) {
        return cells.slice(0);//JSON.parse(JSON.stringify(cells));
    },
    randomCell: function(cells) {
        return cells[getRandomInt(0, this.cols - 1)][getRandomInt(0, this.rows - 1)];
    },
    swap: function(cells, x1, y1, x2, y2) {
       console.log("a");
        var c1 = grid.rectFromCoord(x1,y1);
        var c2 = grid.rectFromCoord(x2,y2);
        animateTheShit(c1.x, c1.y, c2.x, c2.y, c2.x, c2.y, c1.x, c1.y, cells[x1][y1], cells[x2][y2]);
        var temp1 = cells[x1][y1];
        var temp2 = cells[x2][y2];
        cells[x1][y1] = temp2;
        cells[x2][y2] = temp1;
        console.log("c");
        return true;
        //grid.drawGem()
        /*
        var animate = function(){
            for (var i = 0;i<10;i++){
            console.log(i);
            layers.byZ(4).clear();
            var gemtype = cells[x1][y1];
            var context = layers.byZ(4).context;
            var xpos = i*2;
            grid.drawGemUnbound(gemtype,context,xpos,y1);
             //grid.drawGemUnbound(gemtype, layers.byZ(4).context, i*2, y1);
        drawFrame(true,true);
        }
        
        };
        
        window.setTimeout(animate, 100);
         //grid.drawGemUnbound(this.cells[x1][y1], layers.byZ(4).context, x1, y1);
         */
        //drawFrame(true,true);
    },
    cellsByType: function(cells, gemType) {
        var retArray = [];
        for (var x = 0; x < cells.length; x++) {
            for (var y = 0; y < cells[0].length; y++) {
                if (cells[x][y] == gemType) {
                    retArray.push({
                        x: x,
                        y: y
                    });
                }
            }
        }
        return retArray;
        
    },
    fall: function(cells, icount) {

        var count = icount || 0;
        count++;
        //console.log("fall count: " + count);
        if (count > 300) {
            return;
        }
        var arr = game.cellsByType(cells, 'void');
        //console.log(arr);

        if (arr.length === 0) {
            //console.log("no voids");
            return;
        }
        else {
            //console.log("there be voids");
        }

        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                if (arr[i].y == 0) {
                    cells[arr[i].x][arr[i].y] = getRandomItemUnprepared(listObjects); 
                }
            }
        }

        arr = game.cellsByType(cells, 'void');

        if (arr.length == 0) {

            return;
        }

        if (arr.length > 0) {
            for (var i = 0; i < arr.length; i++) {
                var x1 = arr[i].x;
                var y1 = arr[i].y;
               var a = game.swap(cells, x1, y1, x1, y1 - 1);
               while(!a)(sleep(1))
            }

        }
        arr = game.cellsByType(cells, 'void');
        if (arr.length === 0 || count > 300) {

            return;
        }
        else {
            game.fall(cells, count);
        }


        return;
    },
    checkSingleCellForMatches: function(cells, x, y) {
        var allArray = [];
        if (cells[x][y] !== 'void') {
            //check left
            var leftArray = [];
            var rightArray = [];
            var upArray = [];
            var downArray = [];

            //check left
            if (x > 0) {
                for (var xl = x; xl > -1; xl--) {
                    if (cells[x][y] !== cells[xl][y]) {
                        break;
                    }
                    else {
                        leftArray.push({
                            x: xl,
                            y: y
                        });
                    }
                }
            }
            //check right
            if (x < 7) {
                for (var xr = x; xr < 8; xr++) {
                    if (cells[x][y] !== cells[xr][y]) {
                        break;
                    }
                    else {
                        rightArray.push({
                            x: xr,
                            y: y
                        });
                    }
                }
            }
            //check up
            if (y > 0) {
                for (var yu = y; yu > -1; yu--) {
                    if (cells[x][y] !== cells[x][yu]) {
                        break;
                    }
                    else {
                        upArray.push({
                            x: x,
                            y: yu
                        });
                    }
                }
            }
            //check down
            if (y < 7) {
                for (var yd = y; yd < 8; yd++) {
                    if (cells[x][y] !== cells[x][yd]) {
                        break;
                    }
                    else {
                        downArray.push({
                            x: x,
                            y: yd
                        });
                    }
                }
            }
            if (leftArray.length > 2) {
                allArray = allArray.concat(leftArray);
            }

            if (rightArray.length > 2) {
                allArray = allArray.concat(rightArray);
            }

            if (upArray.length > 2) {
                allArray = allArray.concat(upArray);
            }

            if (downArray.length > 2) {
                allArray = allArray.concat(downArray);
            }
        }
        return allArray;
    },
    checkBoardForMatches: function(cells) {

        var totArray = [];
        for (var x = 0; x < 8; x++) {
            for (var y = 0; y < 8; y++) {
                totArray = totArray.concat(game.checkSingleCellForMatches(cells, x, y));
            }
        }
        return totArray;

    },
    voidCells: function(cells, cellArray) {
        for (var i = 0; i < cellArray.length; i++) {
            cells[cellArray[i].x][cellArray[i].y] = 'void';
        }
    },
    canSwap: function(cells, c1, c2) {
        console.log("canSwap");
        if (!c1 || !c2) {
            return false;
        }
        console.log("c1: " + JSON.stringify(c1));
        console.log("c2: " + JSON.stringify(c2));
        var cBoard = game.cloneBoard(cells);
        var c1t = c1.type;
        var c2t = c2.type;
        cBoard[c1.x + "," + c1.y].type = c2t;
        cBoard[c2.x + "," + c2.y].type = c1t;

        var matches = this.checkBoardForMatches(cBoard);
        return matches.length > 2;
    },
    canSwapUp: function(cells, cell) {

        return game.canSwap(cells, cell, game.upOf(cells, cell));
    },
    canSwapDown: function(cells, cell) {

        return game.canSwap(cells, cell, game.bottomOf(cells, cell));
    },
    canSwapLeft: function(cells, cell) {

        return game.canSwap(cells, cell, game.leftOf(cells, cell));
    },
    canSwapRight: function(cells, cell) {

        return game.canSwap(cells, cell, game.rightOf(cells, cell));
    },
    canSwapAny: function(cells, cell) {
        console.log("can swap any: " + JSON.stringify(cell));
        cell = cells[cell.x + "," + cell.y];
        var a1 = game.canSwap(cells, cell, cells[cell.x + "," + (cell.y - 1)]);
        console.log("a1: " + a1);
        if (a1) {
            return a1;
        };
        var a2 = game.canSwap(cells, cell, cells[cell.x + "," + (cell.y + 1)]);

        console.log("a2: " + a2);
        if (a2) {
            return a2;
        };
        var a3 = game.canSwap(cells, cell, cells[(cell.x - 1) + "," + cell.y]);
        console.log("a3: " + a3);
        if (a3) {
            return a3;
        };
        var a4 = game.canSwap(cells, cell, cells[(cell.x + 1) + "," + cell.y]);
        console.log("a4: " + a4);
        if (a4) {
            return a4;
        };
        return a1 || a2 || a3 || a4; //(game.canSwapUp(cells, cells[cell.x + "," + cell.y]) || game.canSwapDown(cells, cells[cell.x + "," + cell.y]) || game.canSwapLeft(cells, cells[cell.x + "," + cell.y]) || game.canSwapRight(cells, cells[cell.x + "," + cell.y]))
    },
    findSwaps: function(cells, cell) {
        cells[cell.x + "," + cell.y].canSwapUp = game.canSwap(cells, cell, cells[cell.x + "," + (cell.y + 1)]);
        cells[cell.x + "," + cell.y].canSwapDown = game.canSwap(cells, cell, cells[cell.x + "," + (cell.y + 1)]);
        cells[cell.x + "," + cell.y].canSwapLeft = game.canSwap(cells, cell, cells[(cell.x - 1) + "," + cell.y]);
        cells[cell.x + "," + cell.y].canSwapRight = game.canSwap(cells, cell, cells[(cell.x + 1) + "," + cell.y]);
    },
    processBoard: function(cells) {
        var i = 100;
        var matches = [];
        do {
            matches = this.checkBoardForMatches(cells);
            if (matches.length > 2) {
                this.voidCells(cells, matches);
                this.fall(cells);
            }
            console.log("process i: " + i);
            i--;
        } while (matches.length > 2 && i > 0)
    }
};