// App.js
var appKD = appKD || {};

(function ($) {

    var self,
        BREAKPOINT = {
            "MOBILE": 320,
            "TABLET": 767,
            "DESKTOP": 1349
        },
        $window = $(window),
        $document = $(document),
        windowDimensions = {
            width: $window.width(),
            height: $window.height(),
        },
        $windowW = window.innerWidth,
        $windowH = window.innerHeight;

        window.appKD = window.appKD || {};
        window.$ = jQuery;
    

    appKD = {
        init: function () {
            self = this;
            welcomeOverlay.init();
            gridTop.init(windowDimensions.width, windowDimensions.height);
            self.onResize();
        },
        onResize: function (callback) {
            window.addEventListener("resize", function() {
                $windowW = window.innerWidth;
                $windowH = window.innerHeight;
                windowDimensions = {
                    width: $window.width(),
                    height: $window.height(),
                };
                gridTop.init(windowDimensions.width, windowDimensions.height);
                callback && callback($windowW, $windowH);
                

            }, false);
        },
        orientationChange: function () {
            window.addEventListener("orientationchange", function() {
                $windowW = $window.width();
                $windowH = $window.height();
            }, false);
        },
    };

    var welcomeOverlay ={
        init: function(){
            setTimeout(this.welcomeStart, 250);
            setTimeout(this.welcomeButton, 3700);
            this.welcomeHide();
        },
        welcomeStart: function() {
            $('#welcome').addClass('fin');
        },
        welcomeButton: function(){
            $('#welcome a').fadeIn('slow');
        },
        welcomeHide: function(){
            $('#welcome a').on('click',function(){
                $('.overlay--full').fadeOut();
                backgroundBubbles.init();
            });
        },
        
    };

    var responsiveGrid = {
        init: function(ww, wh){
            var gW = 0.8*ww;
            var gH = 0.8*wh;
            var wW = ww;
            var wH = wh;
            this.SetGrid(this.SetOrientation(wW, wH), gW, gH, wW, wH); 
        },
        SetOrientation: function(wW, wH){
            /* 0 - orintation vartical
               1 - orintation horizontal */
            var orientation;
            if(wW > wH){
                orientation = 1;
            }else if ((wW <= wH)){
                orientation = 0;
            }
            return orientation;
        },
        SetGrid: function(orientation, gW, gH, wW, wH){
           var o = orientation;
           if(o == 0){
               $('.grid--one').css({'height':(10*gW)/13, 'width':gW});
           }else if( o == 1){
               $('.grid--one').css({'height':gH, 'width':1.3*gH});
           }
           $('.grid--one').css({'margin-top':(wH - $('.grid--one').height())/2});
        }
    };

    var gridTop = {

        init: function(ww,wh){
            var wW = ww;
            var wH = wh;
            this.setTop(wW,wH);
        },

        setTop: function(wW,wH){
            var grid = $('.grid--one');
            var gridH = grid.height();
            var top = (wH-gridH)/2;
            if (top >= 0){
                grid.css('margin-top', top);
            }else{
                grid.css('margin-top', '50px');
            }
        }
    }

    var backgroundBubbles = {
        init: function(){
            this.CreateBubble();
        },
        Animate: function(a){
            $(a).animate({
                bottom: document.body.offsetHeight + 'px',
                left: '+=' + ((Math.random() * 100) - 50) + 'px'
            }, Math.random() * 10000 + 500, 'linear', function() {
                a.style.bottom = '0px';
                backgroundBubbles.Animate(a)
            });
        },
        CreateBubble: function(){
            for (var i = 0; i < 40; i++) {
                var d = document.createElement('div');
                var colors = ['bg-blue3','bg-purple','bg-pink2'];
                var randomColor = Math.floor(Math.random() * colors.length);
                d.className = 'bubble '+ colors[randomColor];
                var a = Math.random() * 50 + 30 + 'px';
                d.style.width = a;
                d.style.height = a;
                d.style.bottom = Math.random() * 800 + 'px';
                d.style.left = Math.random() * document.body.offsetWidth + 'px';
                document.getElementById("bubbles-wrapper").appendChild(d);
                backgroundBubbles.Animate(d);
            }
        }
    }
    

    $(window).load(function() {
		// Animate loader off screen
		$(".loader").fadeOut("slow");;
	});

    $.fn.exists = function(){ return this.length>0; };

    $(function() {
        appKD.init();
    });
})(jQuery);
