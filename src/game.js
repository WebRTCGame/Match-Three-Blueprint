
/**
* The core EndlessRunner blueprint game file.
* 
* This file is only used to initalise (start-up) the main Kiwi Game 
* and add all of the relevant states to that Game.
*
*/

//Initialise the Kiwi Game. 
var gameOptions = {
	width: 420,
	height: 600
}

var game = new Kiwi.Game('content', 'Match3', null, gameOptions);
if (game) {
	console.log("game");
}
else {
	console.log("no game");
}
if (game.states) {
	console.log("game.states");
}
else {
	console.log("no game.states");
}
//Add all the States we are going to use.
if (LoadingState) {
	console.log("LoadingState");
}
else {
	console.log("no LoadingState");
}
if (IntroState) {
	console.log("IntroState");
}
else {
	console.log("no IntroState");
}
if (PlayState) {
	console.log("PlayState");
}
else {
	console.log("no PlayState");
}
game.states.addState(LoadingState);
game.states.addState(IntroState);
game.states.addState(PlayState);

game.states.switchState("LoadingState");