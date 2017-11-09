/*
d�claration de mes variables
 */
var canvas;
var ctx;
var imageSource;
var imageAvantPlan;
var imageMontagne;
var imageArbre;
var imageBackground;

var rendering;
var lastTime;


var avantPlan;
var moyenPlan;
var arrierePlan;
var background;

var perso;

var personnage;
var altitude;

var ballUp;
var ballDown;
var os;
var catBall;


var collision;
var evenenemt;

var timer;
var tempEcoule = 0.0;
var lastFrame = 0;
var score=0;

var start=false;

var enemiesX;
var enemiesY;
var enemiesRandom;
var posX;


var mesBalles = [];
var mesCollision =[];


settings={

    radius: 30,
    posX: window.width,


};


var looser;
var posX;
var posYup;
var posYdown;


var circle1;
var circle2;

var dx;
var dy;
var distance;
var effectrire;
var collisionHelper;
var player1;
var player2;


var circleOsUp;
var circleOsDown;
var circleCat;
var circleEnemie;


var perdu='LOOSER !';
var end;

loading=function()
{

}


window.onload = function( )
{
	/**
	 *
	 * Recuperation des elements HTML
	 * ============================
	 */

	canvas = document.getElementById("monCanevas");
	ctx = canvas.getContext("2d");
	personnage=document.getElementById("perso");
	console.log("La window est load�e;");
	looser= document.getElementById("lost");
	imageArbre = document.getElementById("arbre");
	imageAvantPlan= document.getElementById("avant");
	imageMontagne= document.getElementById("montagne");
	imageBackground= document.getElementById("background");
	os=document.getElementById("os");
	catBall=document.getElementById("catball");

	effectrire=document.querySelector('#effectrire');
	end=document.querySelector('#end');


	background = new AnimationFond(imageBackground,0,0);

	arrierePlan = new AnimationFond(imageMontagne,0.1,0);

	moyenPlan = new AnimationFond(imageArbre,0.4,0);

	avantPlan = new AnimationFond(imageAvantPlan,1.3 ,0);

	evenenemt=	new EvenenementScore();
	collision=new Colision();
	enemiesRandom = new Ball();






	perso =new Jauge(2,personnage,document.body);

	lastTime = Date.now();
	rendering = setInterval( render , 1);



    ctx.fillStyle = "black";
    ctx.fillRect(0,0,canvas.width, canvas.height);


};

function randomRange(min,max)
{
	return ((Math.random()*(max-min))+min);
}


function render()
{

	if (start)
	{

		player1 = document.querySelector('#audioPlayer');

		player1.play();
		//update all objects
		//  delta time � calcul� dans le render
		var newTime = Date.now();
		var delta = newTime - lastTime;
		//On calcule d'abord delta puison met � jour lastTime
		lastTime = newTime;
		background.update(delta);
		arrierePlan.update(delta);
		moyenPlan.update(delta);
		avantPlan.update(delta);
		//enemiesRandom.update(delta);
		perso.update(delta);
		collision.update(delta);
		evenenemt.update(delta);



		for(var i=0; i<mesBalles.length ; ++i)
		{
			mesBalles[i].update(delta);
		}
		for(var i=0; i<mesCollision.length ; ++i)
		{
			mesCollision[i].update();
		}




		tempEcoule += delta/10;
		lastFrame=score;
		ctx.font ="50px Arial";
		timer=('score '+Math.floor(tempEcoule));
		ctx.fillText(timer, 100 , canvas.height-30 );


	}
	else
	{
		//ctx.clearRect(0,0,canvas.width,canvas.height);
      $('.commencer').click(function(){
          start=true;
          $(this).hide();
      })
	}



}



/*
Creation du systheme update
===========================
===========================
 */

/**
 *
 * @param imgSrc
 * @param zIndex
 * @param positionY
 * @constructor
 */

EvenenementScore = function(event)
{
	this.event=event;

	this.update=function(delta)

	{



			if (Math.floor(tempEcoule)%1000===0 && Math.floor(tempEcoule)>0)

			{
				console.log('event')
					var effectscore =document.querySelector('#effectscore');
					effectscore.loop = false;
					effectscore.play();

			}



	}

};




AnimationFond = function (imgSrc, zIndex,positionY)
{
	this.imgSrc=imgSrc;
	this.zIndex=zIndex;
	this.x = 0;
	this.positionY = positionY;
	this.speedX = -500 / 1000*zIndex; //deplacement par ms
	this.update= function(delta)
	{

		this.x += delta * this.speedX;

		ctx.save();
		ctx.translate(this.x, 0);


		ctx.drawImage(this.imgSrc, 0, this.positionY);
		ctx.drawImage(this.imgSrc, 1200, this.positionY);

		if (this.x<-1200)
		{
			this.x=0;
		}

		ctx.restore();
	}

};



/**
 *
 * @param vitesse
 * @param contain
 * @constructor
 */
Jauge =function (vitesse,img,contain)
{
	this.vitesse=vitesse;
	this.valeur=500//-canvas.height/2;
	this.img=img;
	this.isOn=false;


	this.activeted = function (event)
	{
		this.isOn=true;

	};
	/**
	 *
	 * @param event
	 */
	this.desactived = function(event)
	{
		this.isOn=false;
	};


	contain.addEventListener("mousedown", this.activeted.bind(this));
	contain.addEventListener("mouseup",this.desactived.bind(this));

	this.update= function(delta)
	{
		if(this.isOn)
		{
			this.valeur+=2*vitesse;
			if(this.valeur>canvas.height)
			{
				this.valeur=canvas.height;
			}

		var effectclick =document.querySelector('#effectclick');
		effectclick.loop = false;
		effectclick.play();

		}
		else
		{

			if(this.valeur <=170)
			{
				this.valeur=170;
			}
			this.valeur-=2*vitesse;

		}
		/**
		 * Test pour savoir quand on a perdu
		 */

		if(this.valeur>=canvas.height || this.valeur<=170)
		{
			start=false;
			this.valeur==canvas.height;
			effectrire.play();
		 	effectrire.loop = false;
		}

		altitude=canvas.height -this.valeur;



	};
	var shift = 0;
	var frameWidth = 69;
	var frameHeight = 69;
	var totalFrames = 75;
	var currentFrame = 0;
	function animate() {
		ctx.clearRect(70, altitude, 100, 100);
		//draw each frame + place them in the middle
		ctx.drawImage(img, shift, 0, frameWidth, frameHeight, 70, altitude, 100, 100);
		shift += frameWidth + 1;

		if (currentFrame == totalFrames) {
			shift = 0;
			currentFrame = 0;
		}
		currentFrame++;
		requestAnimationFrame(animate);
	}
	animate()

};
/**
 *Evenenement stromboscope=>
 * @param event
 * @constructor
 */








/**
 * Ecran perdu
 */

PerduScreen =function()
{

	//ctx.clearRect(0,0,canvas.width,canvas.height);
	ctx.save()
	//ctx.clearRect(0,0,canvas.width,canvas.height);

	ctx.fillRect(canvas.width/2-20,canvas.height/2-120,520,300);

	ctx.font ="100px Arial";
			ctx.fillStyle="#95bdcd";

	ctx.fillText(perdu , canvas.width/2 , canvas.height/2 );
	ctx.fillText(timer,canvas.width/2 , 550 );
	player1.pause();
	player1.currentTime = 0;
	delta=0;
  $('.centeredElement').append('<div class="recommencer"><h1>Recommencer?</h1></div>');
  $('.recommencer').click(function(){
    location.reload();

  })

	ctx.restore();

};



Enemies=function()
{

	this.x = canvas.width;
	this.life = 0;
	this.maxLife = 1000;
	this.speed=-0.4 ;

	mesBalles.push( this );

	this.y = randomRange(5,200);


	this.update= function(delta)
	{

		this.x += delta*this.speed	;
		this.draw();
		enemiesX=this.x;
		enemiesY=this.y;


		circle1 = {radius: 50, x: 120, y: Math.floor(altitude)+50};
		circle2 = {radius: 30, x: Math.floor(			this.x) , y: Math.floor(this.y)};
		circle3 = {radius: 30, x: Math.floor(			this.x) , y: Math.floor(this.y)+450};
		circle4 = {radius: 30, x: posX, y:Math.floor(posYup)};

		 dx1 = circle1.x - circle2.x;
		 dy1 = circle1.y - circle2.y;

		 dx2 = circle1.x - circle3.x;
		 dy2 = circle1.y - circle3.y;

		 dx3 = circle1.x - circle4.x;
		 dy3 = circle1.y - circle4.y;

		 distance1 = Math.sqrt(dx1 * dx1 + dy1 * dy1);
		 distance2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
		 distance3 = Math.sqrt(dx3 * dx3 + dy3 * dy3);



			if (Math.floor(distance1) < circle1.radius + circle2.radius
				||
				Math.floor(distance2) < circle1.radius + circle3.radius
				||
				Math.floor(distance3) < circle1.radius + circle4.radius)
			{
			// collision d�tect�e !
				console.log('colision')
				start=false;
        new PerduScreen();
				effectrire.play();
				effectrire.loop = false;

			}


	}

	this.draw=function()
	{
		ctx.save();

		ctx.drawImage(os,this.x-30,this.y-30);

		ctx.drawImage(os,this.x-30,this.y+420);

		ctx.restore();

	}
}


setInterval(function() {
		mesBalles.push(new Enemies());
	}, 300);


/**
 * collision
 */


Colision = function()
{


	// console.log(circle2.y);
	//console.log(Math.floor(distance))

	this.update=function()
		{


		}

}

CollisionHelper =function()
{
	this.isActive=false;
	this.active = function (event)
	{
		this.isActive=true;
		console.log('active');



	}

	this.desactive = function(event)
	{
		this.isActive=false;
		console.log('nohelp')


	}

	this.update=function(delta)
		{

				for(var i=0; i<mesBalles.length ; ++i)
				{

					ctx.save();
					ctx.beginPath();
							circleCat=ctx.arc(120, Math.floor(altitude)+50, 50, 0, 2 * Math.PI, false);
							ctx.fillStyle = 'rgba(255,0,0,0.4)';
							ctx.fill();
							ctx.beginPath();
							circleOsUp=ctx.arc(Math.floor(mesBalles[i].x),  Math.floor(mesBalles[i].y), 30, 0, 2 * Math.PI, false);
							ctx.fillStyle = 'rgba(0,0,255,0.4';
							ctx.fill();
							circleOsDown=ctx.arc(Math.floor(mesBalles[i].x),  Math.floor(mesBalles[i].y)+470, 30, 0, 2 * Math.PI, false);
							ctx.fillStyle = 'rgba(0,0,255,0.4';
							ctx.fill();
							ctx.beginPath();
							circleEnemie=ctx.arc(Math.floor(posX)+35, Math.floor(posYup)+15, 30, 0, 2 * Math.PI, false);
							ctx.fillStyle = 'rgba(0,255,0,0.4';
							ctx.fill();
							ctx.restore();

				}




		}

	window.addEventListener("keydown", this.active.bind(this));
	window.addEventListener("keyup", this.desactive.bind(this));




}

Ball=function()
{

	this.x = canvas.width;
	posX=this.x;
	this.speed=-1 ;
	this.y = randomRange(200,500);
	posYup=this.y;


	this.update= function(delta)
	{

		posX += delta*this.speed;

		ctx.save();
		ctx.beginPath();
		ctx.drawImage(catBall,posX,posYup);
		ctx.restore();


	}


}
