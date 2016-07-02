var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
document.body.appendChild(canvas);

var bgReady = false;
var bgImage = new Image();
bgImage.onload = function(){
	bgReady = true;
};
bgImage.src = "images/background.png";

var heroReady = false;
var heroImage = new Image();
heroImage.onload = function(){
	heroReady = true;
};
heroImage.src = "images/hero.png";

var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function(){
	monsterReady = true;
};
monsterImage.src = "images/monster.png";

var hero = {
	speed: 256
};

var monster = {
	speed: 156
};

var keysDown = {};

addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

var reset = function(){
	hero.x = canvas.width / 2 - heroImage.width / 2;
	hero.y = canvas.height / 2 - heroImage.height / 2;

	monster.x = 150;
	monster.y = 150;
};

var update = function(modifier){
	if(38 in keysDown)
		hero.y -= hero.speed * modifier;
	if(40 in keysDown)
		hero.y += hero.speed * modifier;
	if(37 in keysDown)
		hero.x -= hero.speed * modifier;
	if(39 in keysDown)
		hero.x += hero.speed * modifier;

	if(monster.x > hero.x)
		monster.x -= monster.speed * modifier;
	else if(monster.x < hero.x)
		monster.x += monster.speed * modifier;
	else if(monster.x == hero.x){}

	if(monster.y > hero.y)
		monster.y -= monster.speed * modifier;
	else if(monster.y < hero.y)
		monster.y += monster.speed * modifier;
	else if(monster.y == hero.y){}
};

var render = function(){
	if(bgReady)
		ctx.drawImage(bgImage, 0, 0);
	if(monsterReady)
		ctx.drawImage(monsterImage, monster.x, monster.y);
	if(heroReady)
		ctx.drawImage(heroImage, hero.x, hero.y);
};

var main = function(){
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();