$('.hamburguer').click(function(){

    $('nav').fadeToggle(600);
    $('.hamburguer span').toggleClass('showBurger')
    $('nav ul li').each(function(i) {
    var elm=$(this);
    setTimeout(function() {
        elm.toggleClass('show_nav');
    }, i * 100);
});


})


/**
 * Constants
 */
const TWO_PI = Math.PI * 2;

/**
 * Application Class
 */
class Application {
    /**
     * Application constructor
     */
    constructor() {

        this.canvas = document.getElementById("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };

        this.circleContainers = [];

        //Resize listener for the canvas to fill browser window dynamically
        window.addEventListener('resize', () => this.resizeCanvas(), false);
    }

    /**
     * Simple resize function. Reinitializes everything on the canvas while changing the width/height
     */
    resizeCanvas() {
        this.width = this.canvas.width = window.innerWidth;
        this.height = this.canvas.height = window.innerHeight;
        this.center = {
            x: this.width / 2,
            y: this.height / 2
        };

        //Empty the previous container and fill it again with new CircleContainer objects
        this.circleContainers = [];
        this.initializeCircleContainers();
    }

    /**
     * Create a number of CircleContainer objects based on the numberOfContainers variable
     * @return void
     */
    initializeCircleContainers() {
        for (let x = 0; x < this.width + 100; x += 100) {
            for (let y = 0; y < this.height + 100; y += 100) {
                //Initialize a new instance of the CircleContainer class
                let circleContainer = new CircleContainer(this.context, x, y);

                //Let the CircleContainer initialize it's children
                circleContainer.initializeCircles();

                //Add the container to our array of CircleContainer objects
                this.circleContainers.push(circleContainer);
            }
        }
    }

    /**
     * Updates the application and every child of the application
     * @return void
     */
    update() {
        for (let i = 0; i < this.circleContainers.length; i++) {
            this.circleContainers[i].update();
        }
    }

    /**
     * Renders the application and every child of the application
     * @return void
     */
    render() {
        //Clear the entire canvas every render
        this.context.clearRect(0, 0, this.width, this.height);

        //Trigger the render function on every child element
        for (let i = 0; i < this.circleContainers.length; i++) {
            this.circleContainers[i].render();
        }
    }

    /**
     * Update and render the application at least 60 times a second
     * @return void
     */
    loop() {
        this.update();
        this.render();
        window.requestAnimationFrame(() => this.loop());
    }
}

/**
 * CircleContainer Class
 */
class CircleContainer {
    /**
     * CircleContainer constructor
     * @param context - The context from the canvas object of the Application
     * @param x
     * @param y
     */
    constructor(context, x, y) {
        this.context = context;
        this.position = {x, y};

        this.numberOfCircles = 8;
        this.circles = [];

        this.baseRadius = 100;
        this.bounceRadius = 50;
        this.singleSlice = TWO_PI / this.numberOfCircles;
    }

    /**
     * Create a number of Circle objects based on the numberOfCircles variable
     * @return void
     */
    initializeCircles() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles.push(new Circle(this.position.x, this.position.y + Math.random(), this.baseRadius, this.bounceRadius, i * this.singleSlice));
        }
    }

    /**
     * Try to update the application at least 60 times a second
     * @return void
     */
    update() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles[i].update(this.context);
        }
    }

    /**
     * Try to render the application at least 60 times a second
     * @return void
     */
    render() {
        for (let i = 0; i < this.numberOfCircles; i++) {
            this.circles[i].render(this.context);
        }
    }
}

/**
 * Circle Class
 */
class Circle {
    /**
     * Circle constructor
     * @param x - The horizontal position of this circle
     * @param y - The vertical position of this circle
     * @param baseRadius
     * @param bounceRadius
     * @param angleCircle
     */
    constructor(x, y, baseRadius, bounceRadius, angleCircle) {
        this.basePosition = {x, y};
        this.position = {x, y};
        this.speed = 0.01;
        this.baseSize = 10;
        this.size = 10;
        this.angle = (x + y);
        this.baseRadius = baseRadius;
        this.bounceRadius = bounceRadius;
        this.angleCircle = angleCircle;
    }

    /**
     * Update the position of this object
     * @return void
     */
    update() {
        this.position.x = this.basePosition.x + Math.cos(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.position.y = this.basePosition.y + Math.sin(this.angleCircle) * (Math.sin(this.angle + this.angleCircle) * this.bounceRadius + this.baseRadius);
        this.size = Math.cos(this.angle) * 8 + this.baseSize;

        this.angle += this.speed;
    }

    /**
     * Renders this Circle object on the canvas
     * @param context - The context from the canvas object of the Application
     * @return void
     */
    render(context) {
        context.fillStyle = "hsl(167, 100%, "+this.size * 4+"%)";
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.size, 0, TWO_PI);
        context.fill();
    }
}

/**
 * Onload function is executed whenever the page is done loading, initializes the application
 */
window.onload = function () {
    //Create a new instance of the application

};





 var slicePosition = $('.profil_pic').offset();
 var slicePosition2 = $('.about__title').offset();
 var slicePosition3 = $('.project').offset();


 var slicePosition2 = $('.project').offset();

 var thirdPosition = $('.about').offset();
 var portfolioPosition = $('.portfolio').offset();




$(window).scroll(function(){

          if($(window).scrollTop() > slicePosition.top-400){
            $('.profil_pic').addClass('showImage');
            $('.about__title').addClass('show__title');

            }
          if($(window).scrollTop() > slicePosition3.top-450){
            $('.project li').each(function(i){
                var row = $(this);
                 setTimeout(function() {
                 row.addClass('showProject');
               }, 200*i);
                })

          }



});


	$('nav ul li a ').click(function(e) {
		e.preventDefault();
var url = $(this).attr("href")
console.log(url);
$('nav').fadeToggle(600);
$('.hamburguer span').toggleClass('showBurger')
$('nav ul li').each(function(i) {
var elm=$(this);
setTimeout(function() {
    elm.toggleClass('show_nav');
}, i * 100);
});
$('html, body').animate({
 scrollTop: $(url).offset().top
}, 800);

});


$('.project li a').click(function(e){
  e.preventDefault();
  var url = $(this).attr("href");
  $.ajax({
       url: url,
       type: 'GET',
       dataType: 'html',
       success: function(data){
         $('body').append('<div class="transitor"></div>');
         $('.transitor').addClass('transitor__begin');
         setTimeout(function () {

           $('.transitor').addClass('transitor__ended');

         }, 800);
       }
})

})
$( document ).ready(function() {

$('#wave_full').addClass('anime_waveFull');


var tmax_opts = {
delay: 0,
repeat: 0,
repeatDelay: 0.5,
yoyo: false
};

var tmax_tl           = new TimelineMax(tmax_opts),
  polylion_shapes   = $('svg.polylion > g polygon'),
  polylion_stagger  = 0.00475,
  polylion_duration = 1.8;

var polylion_staggerFrom = {
scale: 0,
opacity: 0,
transformOrigin: 'center center',
};

var polylion_staggerTo = {
opacity: 1,
scale: 1,
ease: Elastic.easeInOut
};




tmax_tl.staggerFromTo(polylion_shapes, polylion_duration, polylion_staggerFrom, polylion_staggerTo, polylion_stagger, 0);

var polylion_shapes= $('svg.polylion > g polygon');

$('svg.polylion').click(function(){


  var tmax_opts = {
  delay: 0,
  repeat: 0,
  repeatDelay: 0,
  yoyo: false
  };

  var tmax_tl           = new TimelineMax(tmax_opts),
    polylion_shapes   = $('svg.polylion > g polygon'),
    polylion_stagger  = 0.00475,
    polylion_duration = 1.1;

  var polylion_staggerFrom = {
  scale: 1,
  opacity: 1,
  transformOrigin: 'center center',
  };

  var polylion_staggerTo = {
  opacity: 0,
  scale: 0,
  ease: Elastic.easeInOut
  };

  tmax_tl.staggerFromTo(polylion_shapes, polylion_duration, polylion_staggerFrom, polylion_staggerTo, polylion_stagger, 0);

  setTimeout(function () {
    $('body').css('background-color','#00ffc9');

    setTimeout(function () {
      $('body').children().remove();

      $('body').append('<div class="loader"></div>')
      setTimeout(function () {
        $('.loader').hide();
        $.ajax({
       url: "/experience/",
       success: function (data) {

           $("body").append(data);

       }
   });

      }, 3500);

    }, 600);


/*

$('body').append('<div class="progress"></div>')
$('body').css('background-color','hsl(195, 100%, 7%)');
$('body').append('<video width="100%" loop autoplay><source src="ocean.mp4" type="video/mp4"></video>');
$('body').append('<div class="sound"><p>Piano:</p><div class="button 1"><img src="img/btn1.png"></div></div>')
$('body').append('<div class="sound"><p>Drum:</p><div class=" button 2"><img src="img/btn2.png"></div></div>')
$('body').append('<div class="sound"><p>Bass:</p><div class=" button 3"><img src="img/btn3.png"></div></div>')
$('body').append('<div class="sound"><p>Harpe:</p><div class=" button 4"><img src="img/btn3.png"></div></div>')

$('body').append('<div class="logo_small"><img src="img/small_whale.png"></div>');

$('.1').click(function(){
      array.push(sax);
      console.log(array)
      $(this).addClass('active');

      $('.1').addClass('waiting');
    //  callToSoundCloud();

    })
    $('.2').click(function(){
      $(this).addClass('active');
      array.push(audio);
      console.log(array)
      $('.2').addClass('waiting');

      if ($(this).hasClass('active'))
      {
      }

    //  callToSoundCloud();


    });
    $('.3').click(function(){
      array.push(kick);
      console.log(array)
      $(this).addClass('active');

      $('.3').addClass('waiting');
      //callToSoundCloud();


    })
    $('.4').click(function(){
          array.push(harpe);
          console.log(array)
          $(this).addClass('active');

          $('.4').addClass('waiting');
        //  callToSoundCloud();



        })


*/




    $(window).scrollTop(0);
    $('.container_2').fadeOut();
    $('#section1').fadeOut()
    $('.wave').addClass('animate');
    $('body').addClass('fullBody');
    var audio = new Audio('sound/clap.mp3');
    var sax = new Audio('sound/piano.mp3');
    var kick = new Audio('sound/bass.mp3');
    var harpe = new Audio('sound/harpe.mp3');




    var array=[];

callToSoundCloud()
      function callToSoundCloud (){

            setInterval(function () {
              for (var i = 0; i < array.length; i++) {
                array[i].pause(); // Stop playing
                array[i].currentTime = 0
                array[i].play();
                $('.progress').addClass('launch');
                $('.button').removeClass('waiting');
                $('.active').addClass('reading');
                  $('.button .active').each(function() {
                  $(this).find('*').addClass('reading');
                  console.log('lol')
                });

              }
            }, 8350);



    }

  }, 1100);



});



  /*  setInterval(function () {
          audio.play();
          audio.loop=true;
    },	522);*/






})







anime({
  targets: [document.getElementById("wave_full")],
  d: "M886.702432,50.6148196 C749.207204,68.2447576 659.835306,-8.15164554 595.212549,69.7139191 C530.589792,147.579484 434.343133,226.914196 376.595137,226.9142 C318.847141,226.914203 228.100291,174.024382 185.476771,218.099231 C142.85325,262.174079 21.8574502,337.101309 58.981161,410.559387 C96.1048719,484.017465 126.353832,575.105471 233.6001,539.845599 C340.846368,504.585726 443.967799,350.323766 530.589804,350.323769 C617.211809,350.323772 687.33434,310.656402 735.457681,254.828268 C783.581023,199.000135 888.077384,191.654324 888.077384,191.654324",
  duration: 800,
  loop: false,
  direction: "alternate",
  easing: "easeInOutSine"
});
setTimeout(function () {
  anime({
    targets: [document.getElementById("wave_full")],
    d: "M891.702432,46.6148196 C754.207204,64.2447576 663.622758,-31.2507447 599.000001,46.6148199 C534.377244,124.480385 460.747995,201.999997 402.999999,202 C345.252004,202.000003 212.62352,157.925152 169.999999,202 C127.376479,246.074848 8.87628928,341.541936 46.0000001,415.000015 C83.123711,488.458093 133.753731,583.259887 240.999999,548.000015 C348.246268,512.740142 438.377994,375.000011 524.999999,375.000015 C611.622004,375.000018 692.87666,297.828133 741.000001,242 C789.123343,186.171866 893.077384,187.654324 893.077384,187.654324",
    duration: 4000,
    loop: true,
    direction: "alternate",
    easing: "linear"
  });
  anime({
    targets: [document.getElementById("wave_border")],
    d: "M893,36 C893,36 878,34 846,34 C814,34 792.99997,33.0000002 753.99997,18.0000002 C714.99997,3.00000018 628,-15.9999986 588,28 C548,71.9999986 494,157.000001 429,174 C364,190.999999 336,175 263,153.999999 C190,132.999997 118.000001,189 80.0000009,252.999999 C42.0000009,316.999997 29.0000004,321 12.0000004,343.999999 C-4.99999957,366.999997 -4,426.000001 27,444 C58,461.999999 59,492.999971 80,527 C101,561.000029 130,602.999971 193,590 C256,577.000029 340.000001,526 372.000001,490.999999 C404.000001,455.999997 444,423.000001 487,407 C530,390.999999 590,390.000001 653,368 C716,345.999999 754.99997,269 770.99997,252.999999 C786.99997,236.999997 839,218.000001 895,218",
    duration: 4000,
    loop: true,
    direction: "alternate",
    easing: "linear"
  });
}, 800);



window.ondblclick = handleDoubleClick;

function handleDoubleClick(event) {
  var isInFullScreen = (document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen);
  if(!isInFullScreen) {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen();
    } else if (canvas.mozRequestFullScreen) {
      canvas.mozRequestFullScreen();
    } else if (canvas.webkitRequestFullscreen) {
      canvas.webkitRequestFullscreen();
    }
  } else {
    if(document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
}
