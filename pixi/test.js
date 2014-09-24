                               // first tile picked up by the player
                              var firstTile = null;
                               // second tile picked up by the player
                              var secondTile = null;
                               // can the player pick up a tile?
                              var canPick = true;
                               // create an new instance of a pixi stage with a grey background
                              var stage = new PIXI.Stage(0x888888);
                               // create a renderer instance width=640 height=480
                              var renderer = PIXI.autoDetectRenderer(800, 800);
                               // add the renderer view element to the DOM

                               // importing a texture atlas created with texturepacker
                              var tileAtlas = ["images.json"];
                               //var tileAtlasNM = ["imagesNM.json"];
                               // create a new loader
                              var loader = new PIXI.AssetLoader(tileAtlas);
                               //var loaderNM = new PIXI.AssetLoader(tileAtlasNM);
                               // create an empty container
                              var gameContainer = new PIXI.DisplayObjectContainer();
                              var bgContainer = new PIXI.DisplayObjectContainer();
                              var lookupTable = matrix(8, 8, 0); //{};
                               // add the container to the stage
                              var init = function() {
                                  document.body.appendChild(renderer.view);
                                  stage.addChild(bgContainer);
                                  stage.addChild(gameContainer);
                                  // use callback
                                  loader.onComplete = onTilesLoaded
                                      //begin load

                                  loader.load();

                              };

                              function changeGemType(pixiSprite, gemType) {
                                  if (pixiSprite.gemType == gemType) {
                                      return
                                  };
                                  setTimeout(function() {
                                      new TWEEN.Tween(pixiSprite)
                                          .to({
                                              width: "+100",
                                              height: "+100",
                                              x: "-50",
                                              y: "-50",
                                              alpha: 0.0
                                          }, 600)
                                          .easing(TWEEN.Easing.Linear.None)
                                          .onComplete(function() {
                                              //gameContainer.removeChild(this);
                                          })
                                          .start();

                                  }, 1000);
                                  var frameIndex = getIndexByType(gemType);
                                  //var tile = PIXI.Sprite.fromFrame(frameIndex);
                                  pixiSprite.setTexture(PIXI.Texture.fromFrame(frameIndex));
                                  pixiSprite.frameIndex = frameIndex;

                                  pixiSprite.gemType = gemType;
                              };


                              function onTilesLoaded() {
                                  //loaderNM.load();
                                  // loaderNM.onComplete = onTilesNMLoaded;
                                  // function onTilesNMLoaded(){
                                  //     console.log("tilesnmloaded");
                                  //     console.log(PIXI.TextureCache);
                                  // };
                                  // choose 24 random tile images
                                  var chosenTiles = new Array();
                                  //console.log(PIXI.TextureCache);
                                  //console.log(stage.width);
                                  //console.log(renderer.width);

                                  for (var i = 0; i < PIXI.TextureCache.length; i++) {
                                      console.log(PIXI.TextureCache[i]);
                                  }
                                  while (chosenTiles.length < 48) {
                                      var candidate = Math.floor(Math.random() * 44);
                                      if (chosenTiles.indexOf(candidate) == -1) {
                                          chosenTiles.push(candidate, candidate)
                                      }
                                  }
                                  // shuffle the chosen tiles
                                  for (i = 0; i < 96; i++) {
                                      var from = Math.floor(Math.random() * 48);
                                      var to = Math.floor(Math.random() * 48);
                                      var tmp = chosenTiles[from];
                                      chosenTiles[from] = chosenTiles[to];
                                      chosenTiles[to] = tmp;
                                  }
                                  // place down tiles
                                  //var tilingSprite = new PIXI.TilingSprite(PIXI.Texture.fromFrame(0), 800,800);

                                  //stage.addChild(tilingSprite);
                                  var rw = renderer.width / 8;
                                  var rh = renderer.height / 8;
                                  var tilesx = 8;
                                  var tilesy = 8;

                                  for (i = 0; i < tilesx; i++) {
                                      for (j = 0; j < tilesy; j++) {
                                          // new sprite
                                          //console.log(Math.round(Math.random()*15,0));
                                          var bgTile = PIXI.Sprite.fromFrame(15);
                                          bgTile.buttonMode = false;
                                          bgTile.interactive = false;
                                          bgTile.position.x = i * rw; //Math.random() * 600;
                                          bgTile.position.y = j * rh;
                                          bgTile.width = rw;
                                          bgTile.height = rh;
                                          bgContainer.addChild(bgTile);

                                          var gemType = getRandomItemUnprepared(listObjects);
                                          var frameIndex = getIndexByType(gemType);
                                          var tile = PIXI.Sprite.fromFrame(frameIndex);
                                          tile.frameIndex = frameIndex;
                                          //console.log("fi: " + tile.frameIndex);
                                          //console.log(tile.frameIndex + 15);
                                          //tile.nmFilter = new PIXI.NormalMapFilter(PIXI.Texture.fromFrame(tile.frameIndex + 15));

                                          //var sprite = PIXI.Sprite.fromImage("gems2.png");//(pondFloorTexture);

                                          //tile.filters = [tile.nmFilter];
                                          tile.gemType = gemType;
                                          // buttonmode+interactive = acts like a button
                                          tile.buttonMode = true;
                                          tile.interactive = true;
                                          // is the tile selected?
                                          tile.isSelected = false;
                                          // set a tile value
                                          tile.theVal = chosenTiles[i * 6 + j];
                                          // place the tile
                                          tile.position.x = i * rw; //Math.random() * 600;
                                          tile.position.y = j * rh; //-Math.random() * 100 - 100;
                                          tile.row = j;
                                          tile.col = i;
                                          // tile.rotation = Math.random() * 2 * 3.14;
                                          // tile.scale.x =1*(tilesx / 10);
                                          //tile.scale.y = 1*(tilesy / 10);
                                          tile.width = rw;
                                          tile.height = rh;
                                          // paint tile black
                                          // tile.tint = 0x000000;
                                          // set it a bit transparent (it will look grey)
                                          // tile.alpha = 0.5;
                                          /*
                                           new TWEEN.Tween(tile)
                                               .to({
                                                   x: 2 + i * 80,
                                                   y: 2 + j * 80,
                                                   rotation: 0
                                               }, 2400 + Math.random() * 1200)
                                               .easing(TWEEN.Easing.Elastic.Out)
                                               .start();
                                               */
                                          // add the tile
                                          gameContainer.addChild(tile);
                                          tile.mouseup = tile.touchend = function(data) {};
                                          tile.mouseover = function(data) {
                                              this.alpha = 0.5;
                                          };
                                          tile.mouseout = function(data) {
                                              this.alpha = 1;
                                          };
                                          tile.click = tile.tap = function(data) {};

                                          // mouse-touch listener
                                          tile.mousedown = tile.touchstart = function(data) {
                                              console.log(this.col + " | " + this.row);
                                              console.log("right: " + checkRight(this.col, this.row));
                                              console.log("left: " + checkLeft(this.col, this.row));
                                              console.log("up: " + checkUp(this.col, this.row));
                                              console.log("down: " + checkDown(this.col, this.row));
                                              // can I pick a tile?
                                              if (canPick) {
                                                  // is the tile already selected?
                                                  if (!this.isSelected) {
                                                      new TWEEN.Tween(this)
                                                          .to({
                                                              width: 0.0,
                                                              x: "+50"
                                                          }, 300)
                                                          .easing(TWEEN.Easing.Linear.None).onComplete(function() {
                                                              this.tint = 0xffffff;
                                                          })
                                                          .chain(new TWEEN.Tween(this)
                                                              .to({
                                                                  alpha: 1.0,
                                                                  width: 100,
                                                                  x: "-50"
                                                              }, 300)
                                                              .easing(TWEEN.Easing.Linear.None))
                                                          .start();
                                                      // set the tile to selected
                                                      this.isSelected = true;
                                                      // show the tile
                                                      //this.tint = 0xffffff;
                                                      //this.alpha = 1;
                                                      // is it the first tile we uncover?
                                                      if (firstTile == null) {
                                                          firstTile = this
                                                      }
                                                      // this is the second tile
                                                      else {
                                                          secondTile = this
                                                              // can't pick anymore
                                                          canPick = false;
                                                          // did we pick the same tiles?
                                                          if (firstTile.theVal == secondTile.theVal) {
                                                              // wait a second then remove the tiles and make the player able to pick again
                                                              setTimeout(function() {
                                                                  new TWEEN.Tween(firstTile)
                                                                      .to({
                                                                          width: "+100",
                                                                          height: "+100",
                                                                          x: "-50",
                                                                          y: "-50",
                                                                          alpha: 0.0
                                                                      }, 600)
                                                                      .easing(TWEEN.Easing.Linear.None)
                                                                      .onComplete(function() {
                                                                          gameContainer.removeChild(this);
                                                                      })
                                                                      .start();
                                                                  new TWEEN.Tween(secondTile)
                                                                      .to({
                                                                          width: "+100",
                                                                          height: "+100",
                                                                          x: "-50",
                                                                          y: "-50",
                                                                          alpha: 0.0
                                                                      }, 600)
                                                                      .easing(TWEEN.Easing.Linear.None).onComplete(function() {
                                                                          gameContainer.removeChild(this);
                                                                          canPick = true;
                                                                      })
                                                                      .start();
                                                                  firstTile = null;
                                                                  secondTile = null;
                                                              }, 1000);
                                                          }
                                                          // we picked different tiles
                                                          else {
                                                              // wait a second then cover the tiles and make the player able to pick again
                                                              setTimeout(function() {
                                                                  firstTile.isSelected = false
                                                                  secondTile.isSelected = false
                                                                  new TWEEN.Tween(firstTile)
                                                                      .to({
                                                                          alpha: 0.5,
                                                                          width: 0.0,
                                                                          x: "+32"
                                                                      }, 150)
                                                                      .easing(TWEEN.Easing.Linear.None).onComplete(function() {
                                                                          this.tint = 0x000000;
                                                                      })
                                                                      .chain(new TWEEN.Tween(firstTile)
                                                                          .to({
                                                                              width: 64,
                                                                              x: "-32"
                                                                          }, 150)
                                                                          .easing(TWEEN.Easing.Linear.None))
                                                                      .start();
                                                                  new TWEEN.Tween(secondTile)
                                                                      .to({
                                                                          alpha: 0.5,
                                                                          width: 0.0,
                                                                          x: "+32"
                                                                      }, 150)
                                                                      .easing(TWEEN.Easing.Linear.None)
                                                                      .onComplete(function() {
                                                                          this.tint = 0x000000;
                                                                          canPick = true;
                                                                      })
                                                                      .chain(new TWEEN.Tween(secondTile)
                                                                          .to({
                                                                              width: 64,
                                                                              x: "-32"
                                                                          }, 150)
                                                                          .easing(TWEEN.Easing.Linear.None))
                                                                      .start();
                                                                  firstTile = null;
                                                                  secondTile = null;
                                                              }, 1000);
                                                          }
                                                      }
                                                  }
                                              }
                                          }
                                      }
                                  }
                                  for (var i = 0;i<gameContainer.children.length;i++){
                                      var x = gameContainer.children[i].col;
                                      var y = gameContainer.children[i].row;
                                      lookupTable[x][y] = i;
                                  }
                                  console.log(gameContainer.children[lookupTable[1][2]].gemType)
                                  console.log(G(1,2).gemType);
                                  //for (var i = 0; i < gameContainer.children.length; i++) {
                                  //console.log(gameContainer.children[i]);
                                  //}
                                  console.log(G(2, 4));
                                  changeGemType(CR(0, 0), 'green');

                                  /*
                                                                for (var x = 0; x < 8; x++) {
                                                                    for (var y = 0; y < 8; y++) {
                                                                        for (var x2 = 0; x2 < 8; x2++) {
                                                                            for (var y2 = 0; y2 < 8; y2++) {
                                                                                //console.log(gemsEqual(x, y, x2, y2));
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                                */
                                  requestAnimFrame(animate);
                              }
                              function gemTypeMatch(x1,y1,x2,y2){
                                  return G(x1,y1).gemType == G(x2,y2).gemType;
                              }
                              function G(x,y){
                                  return gameContainer.children[lookupTable[x][y]];
                              };
                              var tick = 0;

                              function animate() {
                                  /*
                                  tick += 0.1;

                                  var mouse = stage.interactionManager.mouse;

                                  if (mouse.global.x < 0) mouse.global.x = 0;
                                  else if (mouse.global.x > renderer.width) mouse.global.x = renderer.width;

                                  if (mouse.global.y < 0) mouse.global.y = 0;
                                  else if (mouse.global.y > renderer.height) mouse.global.y = renderer.height;
                                  //console.log(mouse.global.x + " | " + mouse.global.y);


                                  for (var i = 0; i < gameContainer.children.length; i++) {
                                      //console.log(gameContainer.children[i]);
                                      gameContainer.children[i].filters[0].uniforms.LightPos.value[0] = mouse.global.x / 8;
                                      gameContainer.children[i].filters[0].uniforms.LightPos.value[1] = mouse.global.y / 8;
                                  }
                                  */
                                  requestAnimFrame(animate);
                                  TWEEN.update();
                                  renderer.render(stage);
                              }

                              var listObjects = {
                                  "green": 0.15,
                                  "red": 0.15,
                                  "yellow": 0.15,
                                  "blue": 0.15,
                                  "purple": 0.15,
                                  "gold": 0.15,
                                  "wild": 0.01,
                                  "skull": 0.08,
                                  "p5skull": 0.01

                              };

                              var keyValues = function(obj) {
                                  for (var keys = Object.keys(obj), length = keys.length, values = Array(length), i = 0; i < length; i++) {
                                      values[i] = obj[keys[i]];
                                  }
                                  return values;
                              };
                              var getRandomItemUnprepared = function(obj) {

                                  var list = Object.keys(obj);
                                  var weight = keyValues(obj);
                                  var total = weight.reduce(function(a, b) {
                                      return a + b;
                                  });
                                  var random_num = Math.random() * total;
                                  var weight_sum = 0;

                                  for (var i = 0; i < list.length; i++) {
                                      weight_sum += weight[i];
                                      weight_sum = +weight_sum.toFixed(2);

                                      if (random_num <= weight_sum) {
                                          return list[i];
                                      }
                                  }
                              };
                              var getIndexByType = function(gemType) {
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

                              if (!Array.prototype.find) {
                                  Array.prototype.find = function(predicate) {
                                      if (this == null) {
                                          throw new TypeError('Array.prototype.find called on null or undefined');
                                      }
                                      if (typeof predicate !== 'function') {
                                          throw new TypeError('predicate must be a function');
                                      }
                                      var list = Object(this);
                                      var length = list.length >>> 0;
                                      var thisArg = arguments[1];
                                      var value;

                                      for (var i = 0; i < length; i++) {
                                          value = list[i];
                                          if (predicate.call(thisArg, value, i, list)) {
                                              return value;
                                          }
                                      }
                                      return undefined;
                                  };
                              }


                              function CR(col, row) {

                                  function isColRow(element, index, array) {
                                      return element.hasOwnProperty("col") && element.col == col && element.row == row
                                  }
                                  return gameContainer.children.find(isColRow);
                              };

                              function gemsEqual(x1, y1, x2, y2) {
                                  return CR(x1, y1).gemType == CR(x2, y2).gemType;
                              };

                              function checkRight(x1, y1) {
                                  var matched = [];
                                  if (x1 < 7) {
                                      var gemT = G(x1,y1).gemType;//CR(x1, y1);
                                      for (var x = x1 + 1; x < 8; x++) {
                                          if (gemT == G(x, y1).gemType) {
                                              matched.push({
                                                  x: x,
                                                  y: y1
                                              })
                                          }
                                          else {
                                              break;
                                          }
                                      }
                                      if (matched.length > 0) {
                                          matched.push({
                                              x: x1,
                                              y: y1
                                          });
                                      }
                                  }
                                  return matched;
                              };

                              function checkLeft(x1, y1) {
                                  var matched = [];
                                  if (x1 > 0) {
                                      var gemT = G(x1, y1).gemType;
                                      for (var x = x1 - 1; x > -1; x--) {
                                          if (gemT == G(x, y1).gemType) {
                                              matched.push({
                                                  x: x,
                                                  y: y1
                                              })
                                          }
                                          else {
                                              break;
                                          }
                                      }
                                      if (matched.length > 0) {
                                          matched.push({
                                              x: x1,
                                              y: y1
                                          });
                                      }
                                  }
                                  return matched;
                              }

                              function checkUp(x1, y1) {
                                  var matched = [];
                                  if (y1 > 0) {
                                      var gemT = G(x1, y1).gemType;
                                      for (var y = y1 - 1; y > -1; y--) {
                                          if (gemT == G(x1, y).gemType) {
                                              matched.push({
                                                  x: x1,
                                                  y: y
                                              })
                                          }
                                          else {
                                              break;
                                          }
                                      }
                                      if (matched.length > 0) {
                                          matched.push({
                                              x: x1,
                                              y: y1
                                          });
                                      }
                                  }
                                  return matched;
                              }

                              function checkDown(x1, y1) {
                                  var matched = [];
                                  if (y1 < 7) {
                                      var gemT = G(x1, y1).gemType;
                                      for (var y = y1 + 1; y < 8; y++) {
                                          if (gemT == G(x1, y).gemType) {
                                              matched.push({
                                                  x: x1,
                                                  y: y
                                              })
                                          }
                                          else {
                                              break;
                                          }
                                      }
                                      if (matched.length > 0) {
                                          matched.push({
                                              x: x1,
                                              y: y1
                                          });
                                      }
                                  }
                                  return matched;
                              }
                              

                              function matrix(rows, cols, defaultValue) {

                                  var arr = [];

                                  // Creates all lines:
                                  for (var i = 0; i < rows; i++) {

                                      // Creates an empty line
                                      arr.push([]);

                                      // Adds cols to the empty line:
                                      arr[i].push(new Array(cols));

                                      for (var j = 0; j < cols; j++) {
                                          // Initializes:
                                          arr[i][j] = defaultValue;
                                      }
                                  }

                                  return arr;
                              }

                              if (!Array.prototype.fill) {
                                  Array.prototype.fill = function(value) {

                                      // Steps 1-2.
                                      if (this == null) {
                                          throw new TypeError("this is null or not defined");
                                      }

                                      var O = Object(this);

                                      // Steps 3-5.
                                      var len = O.length >>> 0;

                                      // Steps 6-7.
                                      var start = arguments[1];
                                      var relativeStart = start >> 0;

                                      // Step 8.
                                      var k = relativeStart < 0 ?
                                          Math.max(len + relativeStart, 0) :
                                          Math.min(relativeStart, len);

                                      // Steps 9-10.
                                      var end = arguments[2];
                                      var relativeEnd = end === undefined ?
                                          len : end >> 0;

                                      // Step 11.
                                      var final = relativeEnd < 0 ?
                                          Math.max(len + relativeEnd, 0) :
                                          Math.min(relativeEnd, len);

                                      // Step 12.
                                      while (k < final) {
                                          O[k] = value;
                                          k++;
                                      }

                                      // Step 13.
                                      return O;
                                  };
                              }