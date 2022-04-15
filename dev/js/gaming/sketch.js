

let unicorn;
let trains = [];
let fallens = [];
let foods = [];
let moneys = [];
let wings = [];
var drops = [];
var stones =[];
let angels=[];
let books= [];
let weapons = [];
let uImg;
let tImg;
let rImg;
let mImg;
let bgImg;
let heartImg;
let flyingTime;
let strongTime;
let stoneLife;
let angel;
var cnv;

let scrollSpeed = 10; 
let x1 = 0;
let x2;
let rate = 0;
let life; 
let test = 999;
let test2 = 999;
let showTime;

let timer=0;
let money=0;
let cusJump;
let environ_adapt;
let adapt_level;
let flyStatus = false;
let strongStatus = false;
let immuneStatus = false;
let fireStatus = false;
let rainStatus = false;
let gamePlaying = true;


// let flytoyou=document.getElementById('flytoyou');
// let dontgrow=document.getElementById('dontgrow');
// let battle=document.getElementById('battle');
// let route1=document.getElementById('route1');




let scene = { //場景資訊
    desert:{
        area:'img/game/遊戲背景-沙漠.png',
        monster:'img/game/蠍子.png',
        monsterSize:50,
        mWidth:50,
        mHeight:50,
        fallen:'img/game/meteor1.png',
        reward:'img/game/meat.png',
    },
    mountain:{
        area:'img/game/scene_mountain.png',
        monster:'img/game/lion.png',
        monsterSize:80,
        mWidth:100,
        mHeight:74,
        fallen:'img/game/meteor1.png',
        reward:'img/game/meat.png',
    },
    forest:{ 
        area:'img/game/scene_forest.png',
        monster:'img/game/lion.png',
        monsterSize:80,
        mWidth:100,
        mHeight:74,
        fallen:'img/game/meteor1.png',
        reward:'img/game/meat.png',
    }
}


function preload() {
    if(sessionStorage['sceneChoice'] == null){
        sessionStorage['sceneChoice'] = 'desert';//使用者若沒選 預定場景為沙漠
    }
    uImg = loadImage(sessionStorage['my_animal_img']+'?'+ new Date().getTime());//抓取最新的客製動物圖片
    tImg = loadImage(scene[sessionStorage['sceneChoice']].monster);
    fImg = loadImage(scene[sessionStorage['sceneChoice']].fallen)
    bgImg = loadImage(scene[sessionStorage['sceneChoice']].area);
    rImg = loadImage(scene[sessionStorage['sceneChoice']].reward);
    wImg = loadImage('img/game/wings.png');
    mImg = loadImage('img/game/coin.png');
    sImg = loadImage('img/game/gaming_stone.png');
    aImg = loadImage('img/game/gaming_maruko.png');
    wpImg = loadImage('img/game/gaming_missle.png');


    bImg = loadImage('img/game/gaming_javascript.png');
    if(sessionStorage['sceneChoice']=='forest'){ //依據選擇的場景決定適用的環境適應能力值
        environ_adapt = sessionStorage['environ_adapt_1']*0.5;
    }else if(sessionStorage['sceneChoice']=='mountain'){
        environ_adapt = sessionStorage['environ_adapt_2']*0.5;
    }else if(sessionStorage['sceneChoice']=='desert'){
        environ_adapt = sessionStorage['environ_adapt_3']*0.5;
    }else {
        environ_adapt = 1;
    }


    mImg = loadImage('./img/game/coin.png');
    heartImg = loadImage('./img/game/heart.png');

    
    flytoyou = new Audio("img/game/flytoyou.mp3");
    dontgrow = new Audio("img/game/S.H.E不想長大.mp3" );
    battle = new Audio("img/game/WildPokemonBattle.mp3");
    route1 = new Audio("img/game/pokemon-Route1.mp3");


}

function setup() {


    flytoyou = new Audio("img/game/flytoyou.mp3");
    dontgrow = new Audio("img/game/S.H.E不想長大.mp3" );
    battle = new Audio("img/game/WildPokemonBattle.mp3");
    route1 = new Audio("img/game/pokemon-Route1.mp3");

    if(windowWidth>=768){ //canvas的RWD
        cnv = createCanvas(1200, 600);
        a=(windowWidth-width)/2;
        b=(windowHeight-height)/2;
        cnv.position(a,b);
    }else {
        cnv = createCanvas(windowWidth, windowHeight-50);
    }

    cnv.style('z-index', 1);
    x2 = width;

    unicorn = new Unicorn(sessionStorage['animal_life'],2); //客製動物 Unicorn(生命值,重力)
    life = unicorn.life;
    cusJump = sessionStorage['animal_jump'] *(-1)*4 + (-20);


    for (var k = 0; k < 500; k++) {
        drops[k] = new Drop();
    }
    
}



function keyPressed() {
    if (keyCode === TAB) {
        if(gamePlaying==true){
            noLoop();
            gamePlaying=false;
        }else if(gamePlaying==false){
            loop();
            gamePlaying=true;
        }
    }
}


function keyTyped() { //發射飛彈
    if (key === 'f'  && fireStatus == true) {
        if(strongStatus == true){
            weapons.push(new Weapon(unicorn.x+230, unicorn.y+80));
        }else{
            weapons.push(new Weapon(unicorn.x+50, unicorn.y+40));
        }
    }
}

function musicPlay(songName, playStatus){

    flytoyou.pause();
    dontgrow.pause();
    battle.pause();
    route1.pause();

    //飛起來音樂
    if(songName == 'flytoyou' && playStatus ==  'play'){
        flytoyou.currentTime = 1;
        flytoyou.play();
    }else if(songName == 'flytoyou' && playStatus ==  'pause'){
        flytoyou.pause();
    }

    //長大音樂
    if(songName == 'dontgrow' && playStatus ==  'play'){
        dontgrow.currentTime = 60;
        dontgrow.play();
    }else if(songName == 'dontgrow' && playStatus ==  'pause'){
        dontgrow.pause();
       
    }


    //問答音樂
    if(songName == 'battle' && playStatus ==  'play'){
        battle.play();
    }else if(songName == 'battle' && playStatus ==  'pause'){
        battle.pause();
    }

    //問答音樂
    if(songName == 'route1' && playStatus ==  'play'){
        route1.play();
    }else if(songName == 'route1' && playStatus ==  'pause'){
        route1.pause();
    }
        
}

function windowResized() {
    if(window.innerWidth>=768){
        resizeCanvas(windowWidth, windowHeight*3/5);
    }else {
        resizeCanvas(windowWidth, windowHeight-50);
    }

}

function touchStarted(){
    unicorn.jump(cusJump);
}




function draw() {
    //阻擋空白鍵跟左右鍵的預設行為
    window.onkeydown = function (event) {
        if (event.keyCode === 32||event.keyCode===37||event.keyCode===39) {
            event.preventDefault();
        }
    };

    //背景移動
    rate++;
    image(bgImg, x1, 0, width, height);
    image(bgImg, x2, 0, width, height);

    x1 -= scrollSpeed;
    x2 -= scrollSpeed;

    if (x1 < -width) {
        x1 = width;
    }
    if (x2 < -width) {
        x2 = width;
    }
    //秀出生命值

    for(var i=0; i<life; i++){
        image(heartImg, 50 + 50*i, 48, 40, 36.8);
    }
    
    //秀出環境適應力在右上角
    
    if(environ_adapt<3){
        adapt_level = '低 - 有生命危險';
    }else if (environ_adapt==3){
        adapt_level = '中等 - 平淡的度過';
    }else if(environ_adapt >3){
        adapt_level = '高 - 躺著過關';
    }
    textSize(16);
    fill(33);
    text('環境適應力：'+ adapt_level, 3/5*width, 100);
    textFont('微軟正黑體');

    //秀出時間.金錢在右上角
    if(frameCount%60==0){
        timer++;
    }
    textSize(24);
    fill(33);
    text('$: '+money + '  生存時間： '+timer, 3/5*width, 80);
    textFont('微軟正黑體');
    // fill(0, 102, 153);

    //隨機生成障礙物
    setTimeout(function(){
        if (random(1) < (0.04/environ_adapt)) { 
            trains.push(new Train(scene[sessionStorage['sceneChoice']].monsterSize));
        }
    },1000);



    if(timer<=35 && timer>=28){
        textSize(24);
        fill(33, 99, 100);
        if(window.innerWidth >=768){
            text("系統提示:有流星~快許願(*￣▽￣)/‧☆*~~~~~~~", 1/3*width, 1/3*height);
        }else{
            text("系統提示:有流星~快許願(*￣▽￣)/‧☆*~~~~~~~", 1/7*width, 1/2*height);
        }
        textFont('微軟正黑體');
    }
    if(timer>=30){ //30秒後開始掉隕石
        setTimeout(function(){if (random(1) < (0.06/environ_adapt)) { // 掉隕石
            fallens.push(new Fallen(scene[sessionStorage['sceneChoice']].monsterSize));
        }
        },1000)

    }

console.log(drops.length);

    
    if(timer>=40 && rainStatus==false){
        //40秒後開始下雨
        for (var r = 0; r < drops.length; r++) {
            drops[r].fall();
            drops[r].show();
            
            if(drops[r].y >= height){

                drops.splice(drops[r],1);
                console.log('刪除雨水');
            }
          }
    }

    //隨機生成肉
    if (random(1) < 0.005*environ_adapt) {
        foods.push(new Food());
    }
    //隨機生成金錢
    if(random(1)<0.008*environ_adapt){
        moneys.push(new Money());
    }
    //隨機生成翅膀
    if(random(1)<0.0005*environ_adapt){
        wings.push(new Wing());
    }
    //隨機生成寶石
    if(random(1)<0.0005*environ_adapt){
        stones.push(new Stone());
    }



    //隨機生成小丸子
    
    if(random(1)<0.1 && angels.length == 0 && timer>=10 && window.innerWidth>=768){
        angels.push(new Angel());

        // rainStatus = true;
    }
//    console.log(angels[0]);


    if(angels[0] && angels[0].x>0 && angels[0].x< width){
        textSize(24);
        fill(33, 99, 100);
         if(window.innerWidth >=768){
            text("系統提示:董董老師到此一遊", 1/3*width, 1.5/3*height);
         }else{
            text("系統提示:董董老師到此一遊", 1/7*width, 1/2*height);
         }
        textFont('微軟正黑體');
    }
    //小丸子的行為
    for (let a of angels) {
        a.show();
        a.move();
    }

    // 隨機生成JS圖
    if(random(1)<0.008 && angels.length==1 && books.length==0 && fireStatus==false &&angels[0].direction == 'left'){
        books.push(new Book(angels[0].x,angels[0].y));
    }

    if(books.length>0){
      for (let b of books) { //掉下JS圖
         b.move();
         b.show();
        if ( unicorn.hits(b) ) { //吃到JS圖後的行為
            showTime = timer;
            books.splice(b,1);
            fireStatus = true;

        }
      }
    }




    for(let w of wings){

        w.move();
        w.show();
        if ( unicorn.hits(w) ) { //吃到翅膀後的行為
            flyingTime = timer;
            wings.splice(w,1);
            flyStatus = true;
        }
        
    }




    //動物的行為
    unicorn.show();
    unicorn.move();

    //操作動物的行為

    if(keyIsDown(LEFT_ARROW)){
        unicorn.x -= 15;
    }
    if(keyIsDown(RIGHT_ARROW)){
        unicorn.x += 10;
    }
    if(keyIsDown(32)){
        unicorn.jump(cusJump);
    }


    if(weapons.length>=1){
        for(let p of weapons){ // 飛彈的行為
            p.move();
            p.show();
            for (let t of trains) {
                if (p.hits(t)) {//飛彈撞到怪 怪就消失
                    trains.splice(t,1);
                    setTimeout(function(){weapons.splice(p,1);},200);
                }
            }
            for (let f of fallens){
                if (p.hits(f)){//飛彈撞到隕石 隕石消失
                    fallens.splice(f,1);
                    setTimeout(function(){weapons.splice(p,1);},200);
                };
            }
            if(p.x>width){//離開螢幕的飛彈就清除掉
                weapons.splice(p,1);
            }
        }
    }

 



    // 碰到障礙物之後的行為
    for (let t of trains) {
        t.move();
        t.show(scene[sessionStorage['sceneChoice']].mWidth,scene[sessionStorage['sceneChoice']].mHeight);

        if (unicorn.hits(t)) { //客製動物撞到障礙物後
            if(strongStatus == true){
                setTimeout(function(){
                    trains.splice(t,1);
                },1000);
            }
            if (trains.indexOf(t)!= test && strongStatus==false){//避免重複扣掉生命
                life--;
                test = trains.indexOf(t);
            }
            if (life == 0) { //死掉後
                trains.splice(i-5,15);
                fireStatus = false;
                setTimeout(function(){
                    noLoop();
                },0.1);

                updateScoreMoney();
                questionPage.style.display='block';
                reward_money.innerHTML = `得到獎金：${money}`;
                score_time.innerHTML = `生存時間：${timer}秒`;
            }
        }
    }

    for (let f of fallens) { //掉下隕石
        f.move();
        f.show();
        if (unicorn.hits(f)) {

            if(strongStatus == true){
                setTimeout(function(){
                    fallens.splice(f,1);
                },1000);
            }

            if (fallens.indexOf(f) != test2 && strongStatus==false){//避免重複扣掉生命
                life--;
                test2 = fallens.indexOf(f);
            }

            if (life == 0) { //死掉後
                fireStatus = false;
                fallens.splice(i-5,15);
                setTimeout(function(){
                    noLoop();
                },0.1);



                updateScoreMoney();
                questionPage.style.display='block';
                reward_money.innerHTML = `得到獎金：${money}`;
                score_time.innerHTML = `生存時間：${timer}秒`;

            }
        }
    }

    //碰到肉之後的行為
    for(let f of foods){
        // console.log('碰到肉');
        f.move();
        f.show();

        if ( unicorn.hits(f) ) {
            foods.splice(f,1);
            if(life<5){
                life++;
            }
        }
    }
    //碰到硬幣之後的行為
    for(let m of moneys){
        m.move();
        m.show();
        if ( unicorn.hits(m) ) {
            moneys.splice(m,1);
                money+=1;
        }
    }
    //碰到翅膀之後的行為
    for(let w of wings){
        // musicPlay('flytoyou', 'play');
        w.move();
        w.show();
        if ( unicorn.hits(w) ) { //吃到翅膀後的行為
            flyingTime = timer;
            wings.splice(w,1);
            flyStatus = true;
        }
        
    }
    if ( timer >= parseInt(flyingTime)+10 || life == 0){
        flyStatus = false;
        // musicPlay('flytoyou', 'pause');

        // musicPlay('battle', 'play');


    }

    if(timer>=parseInt(flyingTime) && timer< (flyingTime+10) ){
        // musicPlay('flytoyou', 'play');
        if(window.innerWidth>=768){
            textSize(20);
            fill(255,69,0);
            text(`飛行狀態: ${10+flyingTime - timer}秒`, 3/5*width, 1/5*height+10);
        }else{
            textSize(14);
            fill(255,69,0);
            text(`飛行狀態: ${10+flyingTime - timer}秒`, 50, 1/5*height+40);
        }

        textFont('微軟正黑體');
    }



    //石頭的行為
    for(let s of stones){

        s.move();
        s.show();

        if ( unicorn.hits(s) ) { //吃到石頭後的行為
            // musicPlay('dontgrow','play');
            strongTime = timer;
            stones.splice(s,1);
            strongStatus = true;
            if(innerWidth>=768){
                unicorn.r = 400;
                unicorn.y = height-350;
            }else{
                unicorn.r = 250;
                unicorn.y = height+100;
            }

        }
    }
    // if(strongStatus == true){
    //     life = stoneLife;
    // }
    if ( timer >= parseInt(strongTime)+10 ){
        strongStatus = false;
        unicorn.r = 150;
    }

    if(timer>=parseInt(strongTime) && timer< (strongTime+10) ){
        if(window.innerWidth>=768){//桌機版的字
            textSize(20);
            fill(255,69,0);
            text(`無敵狀態: ${10+strongTime - timer}秒`, 3/5*width, 1/5*height+30);
        }else {//手機版的字
            textSize(14);
            fill(255,69,0);
            text(`無敵狀態: ${10+strongTime - timer}秒`, 50, 1/5*height+60);
        }

        textFont('微軟正黑體');
    }

        //顯示暫停遊戲鍵的說明
        if(window.innerWidth>=768){
            textSize(20);
            fill(33);
            text('按TAB鍵暫停遊戲', 50 , height-20);
            textFont('微軟正黑體');

            textSize(20);
            fill(33);
            text('左右鍵移動/空白鍵跳躍', 800, height-20);
            textFont('微軟正黑體');
        }
    if(fireStatus==true){
            textSize(20);
            fill(156,163,0);
            text('獲得老師JS密笈=>按F鍵可以發射怪奇糖果球', width*0.3 , height-20);
            textFont('微軟正黑體');
    }

}

