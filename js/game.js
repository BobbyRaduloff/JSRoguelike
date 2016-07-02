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

var randomInt = function(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

var numberOfCherries = randomInt(2, 6);
var cherries = new Array(10);
for(i = 0; i < numberOfCherries; i++)
	cherries[i] = true;
var cherriesX = new Array(numberOfCherries);
var cherriesY = new Array(numberOfCherries);

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

var randomizeCherry = function(){
	for(i = 0; i < numberOfCherries; i++){
		cherriesX[i] = randomInt(32, 416);
		cherriesY[i] = randomInt(32, 384);
	}

};

var reset = function(){
	hero.x = canvas.width / 2 - hero.size / 2;
	hero.y = canvas.height / 2 - hero.size / 2;
	monster.x = randomInt(32, 416);
	monster.y = randomInt(32, 384);
	hero.health = hero.maxHealth;
	for(i = 0; i < numberOfCherries; i++)
		cherries[i] = true;
	numberOfCherries = randomInt(2, 6);
	randomizeCherry();
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

	for(i = 0; i < numberOfCherries; i++)
		if(collide(hero.x, hero.y, cherriesX[i], cherriesY[i], cherry.size))
			cherries[i] = false;

	var outOfCherries = true;
	for(i = 0; i < numberOfCherries; i++)
		if(cherries[i])
			outOfCherries = false;
	if(outOfCherries)
		reset();
};

var render = function(){
	if(bgReady)
		ctx.drawImage(bgImage, 0, 0);
	if(monsterReady)
		ctx.drawImage(monsterImage, monster.x, monster.y);
	if(cherryReady){
		for(i = 0; i < numberOfCherries; i++)
			if(cherries[i])
				ctx.drawImage(cherryImage, cherriesX[i], cherriesY[i]);
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

	render();

	then = now;
	requestAnimationFrame(main);
};

var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

var then = Date.now();
reset();
main();