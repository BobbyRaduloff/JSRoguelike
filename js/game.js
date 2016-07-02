var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

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

var cherryReady = false;
var cherryImage = new Image();
cherryImage.onload = function(){
	cherryReady = true;
}
cherryImage.src = "images/cherries.png";

var numberOfCherries = 4;
var cherries = [true, true, true, true];

var hero = {
	speed: 256,
	maxHealth: 100,
	health: 100,
	size: 32
};

var monster = {
	speed: 156,
	size: 32
};

var cherry = {
	size: 32
}

var keysDown = {};

addEventListener("keydown", function(e){
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e){
	delete keysDown[e.keyCode];
}, false);

var collide = function(x1, y1, x2, y2, size){
	return ((x1 <= (x2 + size)) && (x2 <= (x1 + size)) && (y1 <= (y2 + size)) && (y2 <= (y1 + size)));
};


var reset = function(){
	hero.x = canvas.width / 2 - hero.size / 2;
	hero.y = canvas.height / 2 - hero.size / 2;
	monster.x = 150;
	monster.y = 150;
	hero.health = hero.maxHealth;
	for(i = 0; i < 4; i++)
		cherries[i] = true;
};

var update = function(modifier){
	if(38 in keysDown) //UP
		if(hero.y > 32)
			hero.y -= hero.speed * modifier;
	if(40 in keysDown) //DOWN
		if(hero.y < 416)
			hero.y += hero.speed * modifier;
	if(37 in keysDown) //LEFT
		if(hero.x > 32)
			hero.x -= hero.speed * modifier;
	if(39 in keysDown) //RIGHT
		if(hero.x < 448)
			hero.x += hero.speed * modifier;

	if(monster.x > hero.x)
		monster.x -= monster.speed * modifier;
	else if(monster.x < hero.x)
		monster.x += monster.speed * modifier;

	if(monster.y > hero.y)
		monster.y -= monster.speed * modifier;
	else if(monster.y < hero.y)
		monster.y += monster.speed * modifier;

	
	if(collide(monster.x, monster.y, hero.x, hero.y, hero.size))
		hero.health -= parseInt(100 * modifier);
	if(cherries[0] && collide(hero.x, hero.y, 32, 32, cherry.size))
		cherries[0] = false;
	if(cherries[1] && collide(hero.x, hero.y, 448, 32, cherry.size))
		cherries[1] = false;
	if(cherries[2] && collide(hero.x, hero.y, 32, 416, cherry.size))
		cherry[2] = false;
	if(cherries[3] && collide(hero.x, hero.y, 448, 414, cherry.size))
		cherry[3] = false;

};

var render = function(){
	if(bgReady)
		ctx.drawImage(bgImage, 0, 0);
	if(monsterReady)
		ctx.drawImage(monsterImage, monster.x, monster.y);
	if(cherryReady){
			if(cherries[0])
				ctx.drawImage(cherryImage, 32, 32);
			if(cherries[1])
				ctx.drawImage(cherryImage, 448, 32);
			if(cherries[2])
				ctx.drawImage(cherryImage, 32, 416);
			if(cherries[3])
				ctx.drawImage(cherryImage, 448, 414)
	}
	if(heroReady)
		ctx.drawImage(heroImage, hero.x, hero.y);
	ctx.fillStyle = "rgb(215, 0, 0)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("       Health: " + hero.health, 32, 32);
};

var main = function(){
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	
	if(hero.health <= 0)
		reset();
	
	var noExistingCherries = false;
	for(i = 0; i < 4; i++)
		if(cherries[i])
			noExistingCherries = true;
	if(!noExistingCherries)
		reset();

	render();

	then = now;
	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();