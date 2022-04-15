var controller = new ScrollMagic.Controller();
var rank_balloon = TweenMax.to('.home_rank .balloon', 5,
{
    bezier: {
        type: "cubic",
        curviness: 4,
        values: [{
            x: 100,
            y: 100,
        }, {
            x: 400,
            y: 300,
        }, {
            x: 0,
            y: 600
        }, {
            x: 100,
            y: 800,
        }, {
            x: 100,
            y: 1000,
        }],
    }
});

var rank_appear = TweenMax.fromTo('.home_rank .wrap', 2, {
    y: 30, opacity: 0
},
    { y: 0, opacity: 1 }

);
//創建場景
var rank_balloon = new ScrollMagic.Scene({
    triggerElement: '.home_rank .container',
    reverse: true,
    offset: "-250px"
}).setTween(rank_balloon)
    // .addIndicators()
    .addTo(controller)


var rank_appear = new ScrollMagic.Scene({
    triggerElement: '.home_rank .container',
}).setTween(rank_appear)
    // .addIndicators()
    .addTo(controller)



    

//data  ===========================

