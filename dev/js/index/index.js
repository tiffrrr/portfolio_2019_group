tl = new TimelineMax({
    delay: 1,
    repeat: -1,
    repeatDelay: 2
});

var road1 = MorphSVGPlugin.pathDataToBezier("#chemin1", {
    align: "relative",
    offsetX: -50,
    offsetY: -5
});
var road2 = MorphSVGPlugin.pathDataToBezier("#chemin2", {
    align: "relative"
});
var road3 = MorphSVGPlugin.pathDataToBezier("#chemin3", {
    align: "relative"
});
tl
    .staggerFromTo($("#guineapigs > g:not(#yopick)"), .15, {
        rotation: -5
    }, {
        rotation: 5,
        yoyo: true,
        repeat: -1
    }, 0.4, 0)
    .fromTo($("#guineapigs .cls-32"), 0.15, {
        transformOrigin: "top right",
        rotation: -25
    }, {
        rotation: 25,
        yoyo: true,
        repeat: -1
    }, 0)
    .fromTo($("#yopick"), 0.15, {
        rotation: -25
    }, {
        rotation: 25,
        yoyo: true,
        repeat: -1
    }, 0)
    .staggerTo($("#guineapigs > g:not(#yopick) "), 5, {
        bezier: {
            values: road1,
            type: "cubic",
            autoRotate: false
        },
        transformOrigin: "50% 100%",
        ease: Linear.easeNone,
        repeat: -1,
        repeatDelay: 3
    }, 0.8, 0)
    .to($("#yopick"), 3, {
        bezier: {
            values: road1,
            type: "cubic",
            autoRotate: false
        },
        transformOrigin: "50% 100%",
        ease: Linear.easeNone,
        repeat: -1,
        delay: 3,
        repeatDelay: 1
    }, 0.6, 0)
    .fromTo($('#dancing'), 1, {
        transformOrigin: "center center",
        rotation: -5
    }, {
        rotation: 5,
        repeat: -1,
        yoyo: true,
        ease: Circ.easeInOut
    }, 0)
    .fromTo($('#dancing .cls-32'), 1, {
        transformOrigin: "top center",
        rotation: -5
    }, {
        rotation: 25,
        repeat: -1,
        yoyo: true,
        ease: Circ.easeInOut
    }, 0);

function init() {
    reHw();
 
}
var htmlWidth = window.innerWidth;
var htmlHeight = window.innerHeight;

var svgX = document.getElementsByTagName("svg")[0].viewBox.baseVal.x;
window.addEventListener("resize", reHw, false);
window.addEventListener("load", init, false);
function reHw() {
    htmlWidth = window.innerWidth;
    htmlHeight = window.innerHeight;

    document.getElementsByTagName("svg")[0].style.weight=htmlWidth;
    document.getElementsByTagName("svg")[0].style.height="";
    document.getElementsByTagName("svg")[0].viewBox.baseVal.x=35;
    document.getElementsByTagName("svg")[0].viewBox.baseVal.width=490;

     if (736>htmlWidth){    
        document.getElementsByTagName("svg")[0].style.height="";
        document.getElementsByTagName("svg")[0].viewBox.baseVal.x =35;
        document.getElementsByTagName("svg")[0].viewBox.baseVal.width=490;        
    }
         if(document.getElementsByTagName("svg")[0].height.animVal.value<htmlHeight){
           document.getElementsByTagName("svg")[0].style.weight="";
           document.getElementsByTagName("svg")[0].style.height=htmlHeight;
             }
     if (htmlWidth < 415) {
        document.getElementsByTagName("svg")[0].style.height="auto ";
        document.getElementsByTagName("svg")[0].viewBox.baseVal.x = 100;
        document.getElementsByTagName("svg")[0].viewBox.baseVal.width = 160;
    }       

  


   let  homeX  =  70/2;
   let  homeY  =  70/2;
   let  backX  =  70/2;
   let  backY  =  70/2;
// console.log(document.getElementsByTagName('body'));
// console.log(htmlWidth );
// console.log(htmlHeight);
// document.getElementsByTagName('text')[0].x.baseVal[0]["value"]=homeX-16;
// document.getElementsByTagName('text')[0].y.baseVal[0]["value"]=homeY+6;
// document.getElementsByTagName('text')[1].x.baseVal[0]["value"]=backX-16;
// document.getElementsByTagName('text')[1].y.baseVal[0]["value"]=backY+6;
    blob1 = createBlob({
        element: document.querySelector("#path1"),
        numPoints: 10,
        centerX:homeX,
        centerY:homeY,
        minRadius: 24,
        maxRadius: 28,
        minDuration: 1,
        maxDuration: 2
    });
    blob2 = createBlob({
        element: document.querySelector("#path2"),
        numPoints: 10,
        centerX:homeX,
        centerY:homeY,
        minRadius: 24,
        maxRadius: 28,
        minDuration: 2,
        maxDuration: 3
    });
    blob3 = createBlob({
        element: document.querySelector("#path3"),
        numPoints: 10,
        centerX:homeX,
        centerY:homeY,
        minRadius: 24,
        maxRadius: 28,
        minDuration: 1.5,
        maxDuration: 2.5
    });
    blob4 = createBlob({
        element: document.querySelector("#path4"),
        numPoints: 10,
        centerX:homeX,
        centerY:homeY,
        minRadius: 20,
        maxRadius: 22,
        minDuration: 1.5,
        maxDuration: 2
    });
    blob5 = createBlob({
        element: document.querySelector("#path5"),
        numPoints: 10,
        centerX: backX,
        centerY: backY,
        minRadius: 24,
        maxRadius: 28,
        minDuration: 1,
        maxDuration: 2
    });
    blob6 = createBlob({
        element: document.querySelector("#path6"),
        numPoints: 10,
        centerX: backX,
        centerY: backY,
        minRadius: 24,
        maxRadius: 28,
        minDuration: 2,
        maxDuration: 3
    });
    blob7 = createBlob({
        element: document.querySelector("#path7"),
        numPoints: 10,
        centerX: backX,
        centerY: backY,
        minRadius: 24,
        maxRadius: 28,
        minDuration: 3,
        maxDuration: 4
    });
    blob8 = createBlob({
        element: document.querySelector("#path8"),
        numPoints:10,
        centerX: backX,
        centerY: backY,
        minRadius: 20,
        maxRadius: 22,
        minDuration: 3,
        maxDuration: 4
    });}
function createBlob(p) {
    var s = [];
    var q = p.element;
    var t = (Math.PI * 2) / p.numPoints;
    var u = random(Math.PI * 2);
    var v = new TimelineMax({
        onUpdate: x
    });
    for (var o = 0; o < p.numPoints; o++) {
        var i = u + o * t;
        var n = random(p.minDuration, p.maxDuration);
        var r = {
            x: p.centerX + Math.cos(i) * p.minRadius,
            y: p.centerY + Math.sin(i) * p.minRadius
        };
        var w = TweenMax.to(r, n, {
            x: p.centerX + Math.cos(i) * p.maxRadius,
            y: p.centerY + Math.sin(i) * p.maxRadius,
            repeat: -1,
            yoyo: true,
            ease: Sine.easeInOut
        });
        v.add(w, -random(n));
        s.push(r)
    }
    p.tl = v;
    p.points = s;

    function x() {
        q.setAttribute("d", cardinal(s, true, 1))
    }
    return p
}

function cardinal(t, s, B) {
    if (t.length < 1) {
        return "M0 0"
    }
    if (B == null) {
        B = 1
    }
    var A = t.length - (s ? 0 : 1);
    var z = "M" + t[0].x + " " + t[0].y + " C";
    for (var u = 0; u < A; u++) {
        var v, w, x, y;
        if (s) {
            v = t[(u - 1 + A) % A];
            w = t[u];
            x = t[(u + 1) % A];
            y = t[(u + 2) % A]
        } else {
            v = u == 0 ? t[0] : t[u - 1];
            w = t[u];
            x = t[u + 1];
            y = u == A - 1 ? x : t[u + 2]
        }
        var i = w.x + (x.x - v.x) / 6 * B;
        var q = w.y + (x.y - v.y) / 6 * B;
        var p = x.x - (y.x - w.x) / 6 * B;
        var r = x.y - (y.y - w.y) / 6 * B;
        z += " " + i + " " + q + " " + p + " " + r + " " + x.x + " " + x.y
    }
    return s ? z + "z" : z
}

function random(e, d) {
    if (d == null) {
        d = e;
        e = 0
    }
    if (e > d) {
        var f = e;
        e = d;
        d = f
    }
    return e + (d - e) * Math.random()
};
