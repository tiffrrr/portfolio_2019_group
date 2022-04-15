window.addEventListener("load", init, false);
window.addEventListener("resize", resize, false);
function init(){
        owlCarousel_img();
      frank_vote_rank();
      activity_button();     
}
function resize(){
   owlCarousel_img();
}
function $id(e){
 return document.getElementById(e);
}


//--------頁面載入控制----------------------

function favorite(){

    let xhr = new XMLHttpRequest();

    let hearts = document.getElementsByClassName('heart');
    
    
    for(let i=0;i<hearts.length;i++){
        
        
        hearts[i].addEventListener('click',function(e){
            /// alert(111);
            xhr.onload = function(){ 
                if(xhr.status==200){
                   console.log(xhr.responseText);
                }else{
                  alert(xhr.status);
                }
              }
            if(sessionStorage['user_name']){
                if(e.target.title == "加入收藏"){
                    option='love';
                            this.src = "img/frank/plike.png";
                            this.title = "取消收藏";
                        //設定好所要連結的程式
                        var url = "php/frank/love.php?user_no="+sessionStorage['user_no']+'&work_no='+this.id.replace('NO_','')+'&option='+option;
                          
                        xhr.open("GET", url, true); 
                        //送出資料           
                        xhr.send(null);
                }else{
                    option='dislove';
                            this.src = "img/frank/wlike.png";
                            this.title = "加入收藏";
                        //設定好所要連結的程式
                        var url = "php/frank/dislove.php?user_no="+sessionStorage['user_no']+'&work_no='+this.id.replace('NO_','')+'&option='+option;
                        //   console.log(url);
                        xhr.open("GET", url, true); 
                        //送出資料           
                        xhr.send(null);
                    }
                // 如果sessionStorage沒有登入，則彈出提示登入的視窗
            }else{
                alert("請先登入會員");
            }
        });
        }
         heart_xml()
    }
function heart_item(e){
    let heart=Array();
    let hearts = document.getElementsByClassName('heart');
    for (let i = 0; i < hearts.length; i++) {
        heart[i]= hearts[i].id.replace('NO_','');


        for (let j = 0; j < e.length; j++) {
         if ( e[j]['work_no']==heart[i]) {
              
                        hearts[i].src = "img/frank/plike.png";
                           hearts[i].title = "取消收藏";
         }}}
         }
function heart_item_exit(){
     let heart=Array();
    let hearts = document.getElementsByClassName('heart');
     for (let i = 0; i < hearts.length; i++) {         
                          hearts[i].src = "img/frank/wlike.png";
                           hearts[i].title = "加入收藏";  
         }}
function owlCarousel_img(){
      var _width = $(window).width(); 
        if(_width < 768){
            $('.frank_top_three').addClass('owl-carousel');
            $(document).ready(function(){  
                $(".owl-carousel").owlCarousel({
                    loop: false,//控制輪播
                    margin: 100,// 與右邊圖片的距離
                    nav: true,// 導航文字
                    dots: true,
                     dotsEach: true,
                    responsive: {
                        0: {
                            items: 1// 一次輪播幾個項目
                        },
                        768: {
                            items: 3// 一次輪播幾個項目
                        },
                        1000: {
                            items: 7// 一次輪播幾個項目 
                        }}})})} 
        else{ 
                $('.frank_top_three').addClass('owl-carousel');
                $('.frank_top_three').removeClass('owl-carousel');
        }}
        function frank_vote(){
            if(rank1.readyState==4){
                var vote_rank= JSON.parse(rank1.responseText);
        
        for (let i = 0; i < vote_rank.length -3; i++) {
             $("#frank_player_more").append($("#frank_player_items").clone(true).attr('id','frank_player_items'+i));
             $(`#frank_player_items${i} .frank_players_title span:eq(1)`).attr('id','aid'+(i+3));
             $(`#frank_player_items${i}  input:eq(0)`).attr('name','work_no');
             $(`#frank_player_items${i} h3 span:eq(0)`).attr('id','id'+(i+3));
             $(`#frank_player_items${i} span span:eq(0)`).attr('id','vote'+(i+3));
             $(`#frank_player_items${i} .frank_player_pic img:eq(0)`).attr('id','bg'+(i+3));
             $(`#frank_player_items${i} .frank_player_pic img:eq(1)`).attr('id','ag'+(i+3));
             $(`#frank_player_items${i} .frank_Collection_btn img:eq(0)`).attr('class','heart');
             let $input=(`<input type="hidden" name="work_no2"></input>`);
             let $input2=(`<input type="hidden" name="work_no3"></input>`)
             $(`#frank_player_items${i} .frank_message_btn .btn_cloudp `).append($input);
             $(`#frank_player_items${i} .frank_player_btn .btn_cloudb`).append($input2); 
             $(`#frank_player_items${i} .life_ability .life`).attr('id','life'+(i+3)); 
             $(`#frank_player_items${i} .jump_ability .jump`).attr('id','jump'+(i+3));
             $(`#frank_player_items${i} .jump_bar .bar_add`).attr('id','add'+(i+3));
             $(`#frank_player_items${i} .jump_bar .meter`).attr('id','meter'+(i+3));
             $(`#frank_player_items${i} .evemt_ability img`).attr('id','evemt_ability'+(i+3));                      
        }
           for (let i = 0; i < vote_rank.length; i++) {
            $id("vote"+`${i}`).innerText=vote_rank[i]["vote"];
            $id("bg"+`${i}`).src=vote_rank[i]["bg_img"];
            $id("ag"+`${i}`).src=vote_rank[i]["cmp_img"];
            $id("aid"+`${i}`).innerText=vote_rank[i]["work_name"];
            $id("id"+`${i}`).innerText=vote_rank[i]["user_name"];
            $("input[name='work_no']")[i].value=vote_rank[i]["work_no"];
            $("input[name='work_no2']")[i].value=vote_rank[i]["work_no"];
            $("input[name='work_no3']")[i].value=vote_rank[i]["work_no"];
            $(`.heart:eq(${i})`).attr('id','NO_'+(vote_rank[i]["work_no"]));
         }       
      
         
         for (let i = 3; i <vote_rank.length; i++){
             
              
            let  total_health = vote_rank[i]["work_life"];
            for (let l=0; l<total_health; l++){
                let hart = document.createElement('img');
                hart.src = 'img/modify/icon_life.png';
                $("#life"+`${i}`).append(hart);
            }

                    var add = $id("add"+`${i}`);
                    let meter = $id("meter"+`${i}`);
                    let number = vote_rank[i]["work_jump"];
                    add.style.width =`${number * 2}0%`;
                    meter.innerText = number + 'm';
                
                    $id("evemt_ability"+`${i}`).src=vote_rank[i]["environ_img"];
        }
           heart_item_exit()
         favorite();
        }}
//----------------------PHP導入控制-----------------------------
//判斷瀏覽器
function frank_rank(){
    if(window.ActiveXObject){
        xmlHttp= new ActiveXObject('Microsoft.XMLHTTP');
    }else if(window.XMLHttpRequest) {
        xmlHttp= new XMLHttpRequest();
    }
    return xmlHttp;
}
//選怪排行
function  frank_vote_rank(){
    rank1=frank_rank();
    rank1.open("GET","php/frank/vote_rank.php",true);
    rank1.onreadystatechange = frank_vote;
    rank1.send(null);
}
//參加選怪
function  join_xml(){
    join_item=frank_rank();
    join_item.open("GET","php/frank/join.php?user_no="+sessionStorage.user_no,true);
    join_item.onreadystatechange = join_php;
    join_item.send(null);  
}
function join_php(){
    if(join_item.readyState==4  && join_item.status==200){
        var join_arr= JSON.parse(join_item.responseText);
        if (join_arr=="error") {
            alert("這隻動物參加過了喔");
        }else{
             alert("參加成功");
        }}}
 //投票       
function  vote_xml(e){    
    vote_item=frank_rank();
    vote_item.open("GET","php/frank/vote.php?user_no="+sessionStorage.user_no+"&work_no="+e,true);
    vote_item.onreadystatechange = vote_php;
    vote_item.send(null);
}
function vote_php(){
    if(vote_item.readyState==4  && vote_item.status==200){
        let vote_arr= JSON.parse(vote_item.responseText);
        if ( vote_arr==0) {
                alert( "沒有票能投");
              
        }else{
                alert( "還剩"+ vote_arr+"張票能投");
               
        }
            
          setTimeout(() => {
    vote_in_xml=frank_rank();
    vote_in_xml.open("GET","php/frank/vote_rank.php",true);
    // vote_in_xml.onreadystatechange =vote_into;
    vote_in_xml.onload =vote_into;
    function vote_into() {
        vote_rank_item= JSON.parse(vote_in_xml.responseText);
              for (let i = 0; i < vote_rank_item.length ; i++) {
    $id("vote"+`${i}`).innerText=vote_rank_item[i]["vote"];
    $id("bg"+`${i}`).src=vote_rank_item[i]["bg_img"];
    $id("ag"+`${i}`).src=vote_rank_item[i]["cmp_img"];
    $id("aid"+`${i}`).innerText=vote_rank_item[i]["work_name"];
    $id("id"+`${i}`).innerText=vote_rank_item[i]["user_name"];
    $("input[name='work_no']")[i].value=vote_rank_item[i]["work_no"];
    $("input[name='work_no2']")[i].value=vote_rank_item[i]["work_no"];
    $("input[name='work_no3']")[i].value=vote_rank_item[i]["work_no"];
    $(`.heart:eq(${i})`).attr('id','NO_'+(vote_rank_item[i]["work_no"]));
    console.log(vote_rank_item.length);
    
     } 
     console.log(200);
     
         heart_item_exit()
      favorite();
    }
    vote_in_xml.send(null);  
     }, 200);


}}

//留言
function  message_xml(e){
    message_item=frank_rank();
    message_item.open("GET","php/frank/message.php?work_no="+e,true);
    message_item.onreadystatechange = message_php;
    message_item.send(null);
}
function message_php(){
    if(message_item.readyState==4  && message_item.status==200){
        let message_arr= JSON.parse(message_item.responseText);
        message_btn(message_arr); 
}}

//我的罪案
function heart_xml(){
    if (sessionStorage['user_no']) {
    let e=sessionStorage['user_no'];
    heart=frank_rank();
    heart.open("GET","php/frank/hearts.php?user="+e,true);
    heart.onreadystatechange = heart_php;
    heart.send(null);
}}
function heart_php(){
    if(heart.readyState==4  && heart.status==200){
        let heart_arr= JSON.parse(heart.responseText);
     heart_item(heart_arr);
}}    

function  report_xml(u,m,r){
    report_item=frank_rank();
    report_item.open("GET","php/frank/report.php?user_no="+u+"&msg_no="+m+"&report_reason="+r,true);
    report_item.onreadystatechange = report_php;
    report_item.send(null);
}
function report_php(){
    if(report_item.readyState==4  && report_item.status==200){
        let report_arr= JSON.parse(report_item.responseText);
      console.log(report_arr);
       
}}

//--------------------按鈕類--------------------------
function activity_button(){
    //參加選怪
$("#activity_join").click(function() {
join();
});
//留言板
$('.frank_message_btn .btn_cloudp').click(function() {
       let e =$(this).find("input")[0].value;
      $('.message_wrap_input input:eq(0)').val(e).attr({name:'work_no',id:'msg_btn_no'})
        message_xml(e)
 });
 //關留言板
$('.frank_closs_btn').click(function(){
        $('.frank_message').hide();
        $('.message_itme').remove();
        $(`#input_text`)[0].value="";
});
//投票
  $('.frank_vote_btn .btn_cloudb').click(function(){
          if (!sessionStorage['user_no']) {
       
         $id('login_gary').style.display = 'block';
         return ;
    } 
     let e= $(this).find("input")[0].value;
     vote_xml(e);
});

$('.frank_expand_arrow').click(function(){
        $(this).parent().next().animate({bottom:'0px'},1);
$('.frank_expand_button').click(function(){
        $(this).parent().animate({bottom:'-900px'},1);
    })
});
//留言按鈕
$('#msg_btn').click(function(){
   msg_value(); 
})
//檢舉
$('.frank_message_btn .btn_cloudb ').click(function(){
     if (!sessionStorage['user_no']) {
         $id('login_gary').style.display = 'block';
         return ;
    } 
       let m= $(this).find("input").val();
       let u =sessionStorage['user_no'];
    //    let r = prompt("為什麼你檢舉他了呢", "");
       alert(`<p>為什麼你檢舉他了呢?</p><input type="text" id="report_msg" value="" style="width:80%;"><br><a href="javascript:;" class="btn_cloudb report_true">確認<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span></a>`);
     let r;
        document.getElementsByClassName('report_true')[0].addEventListener('click',send_report);
        

        function send_report(){
            r= document.getElementById("report_msg").value;
            console.log(r);
            // 假如r不等於空字串再送出資料庫 else alert 請再次輸入
            if (r != "") {
                $("#hmsg").hide();
                report_xml(u,m,r);
                alert(`我們確實收到你的檢舉了`);
               

            }
        }
    //    console.log(report_msg_value);

//        report_re();
//        function report_re(){
//             if (r != null) {
//         if (r =="") {
//             alert(`請再次輸入檢舉內容`);
//             r = prompt("為什麼你檢舉他了呢", "");
//             console.log(133);
//              report_re()
//         }else{
//          alert(`我們確實收到你的檢舉了`);
//          report_xml(u,m,r)
//         }
//   }
// }
});
//登入按鈕
$('#login_btn').click(function(){
       setTimeout(() => {
              if (sessionStorage['user_name']) {
            heart_xml();
     }
     }, 100);  
})
//登出按鈕
$('#login_text').click(function(){
      heart_item_exit();
})}

//-------------------按鈕函式------------------
 function join(){
    // 先判斷sessionStorage有沒有會員登入資料，有才往下做轉圖檔工作
    if (sessionStorage['user_name']){
        if (sessionStorage['attend']=="null") {
            alert("你還沒有製作動物喔")
        }else {  
                join_xml();
        }
    }else{
   //尚未登入
               $id('login_gary').style.display = 'block';
    }}

function message_btn(e){
      message_arr=e;
      $('.frank_message_btn').addClass(function(){
          $('.frank_message').slideDown(50);
      })
      
      
    for (let i = 0; i < message_arr.length; i++) {
    $("#frank_message_content").append($("#message_wrap").clone(true).attr({id:'message_itme'+i,class:'message_itme frank_message_wrap'}));
    $(`#message_itme${i}   figure:eq(0)`).css("background-image",`url(${message_arr[i]['my_animalbg_img']})`);
    $(`#message_itme${i}  .frank_megsage_memname p:eq(0)`).text(message_arr[i]['user_name']);
    $(`#message_itme${i}  .frank_megsage_memname p:eq(1)`).text(message_arr[i]['msg_date']);
    $(`#message_itme${i}  .frank_message_box p:eq(0)`).text(message_arr[i]['msg_content']);
    let $input=(`<input type="hidden" name="msg_no"></input>`)
    $(`#message_itme${i}  .frank_message_btn span:eq(0)`).attr('id','message_btn'+(i)).append($input);
    $(`#message_itme${i}   input`)[0].value=message_arr[i]['msg_no']
}}

function msg_value() {
        if (!sessionStorage['user_no']) {
       
         $id('login_gary').style.display = 'block';
         return ;
    } 
    if ($(`#input_text`).val()==0)
    {  alert("請輸入文字");
        return ;
    }

   // console.log( sessionStorage['user_no']);
   
  msg_xml=frank_rank();
   msg_xml.onreadystatechange=
   function()
    {if (msg_xml.readyState==4 && msg_xml.status==200)
        {
          console.log(msg_xml.responseText);
        }
    }
  // console.log( sessionStorage['user_no']);
         let msg_arr= $(`.message_wrap_input`).serializeArray();
         msg_xml.open("GET","php/frank/msg.php?work_no="+msg_arr[0]["value"]+"&msg="+msg_arr[1]["value"]+"&user="+sessionStorage['user_no'],true);
          msg_xml.send();
     $('.message_itme').remove();
     setTimeout(() => {
         msg_revalue()
     }, 100);}
function msg_revalue(){
     let e =$(`#msg_btn_no`).val();
    message_xml(e);
}





$(document).ready(function(){
    var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

    NUM_CONFETTI = 30;

    COLORS = [[244,164,96]];

    PI_2 = 1 * Math.PI;

    canvas = document.getElementById("world");

    context = canvas.getContext("2d");

    window.w = 0;

    window.h = 0;

    resizeWindow = function() {
    window.w = canvas.width = window.innerWidth;
    return window.h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeWindow, false);

    window.onload = function() {
    return setTimeout(resizeWindow, 0);
    };

    range = function(a, b) {
    return (b - a) * Math.random() + a;
    };

    drawCircle = function(x, y, r, style) {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    return context.fill();
    };

    xpos = 1;

    document.onmousemove = function(e) {
    return xpos = e.pageX / w;
    };

    window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 1000 / 60);
    };
    })();

    Confetti = class Confetti {
    constructor() {
    this.style = COLORS[~~range(0)];
        this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
        this.r = ~~range(2, 4);
        this.r2 = 2 * this.r;
        this.replace();
    }

    replace() {
        this.opacity = 1;
        this.dop = 0.01 * range(1, 0.1);
        this.x = range(-this.r2, w - this.r2);
        this.y = range(-20, h - this.r2);
        this.xmax = w - this.r;
        this.ymax = h - this.r;
        this.vx = range(0, 2) + 8 * xpos - 5;
        return this.vy = 0.7 * this.r + range(-1, 1);
    }

    draw() {
        var ref;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;
        if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
        }
        if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
        }
        if (!((0 < (ref = this.x) && ref < this.xmax))) {
        this.x = (this.x + this.xmax) % this.xmax;
        }
        return drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
    }

    };

    confetti = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 1, ref = NUM_CONFETTI; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
        results.push(new Confetti);
    }
    return results;
    })();

    window.step = function() {
    var c, j, len, results;
    requestAnimationFrame(step);
    context.clearRect(1, 1, w, h);
    results = [];
    for (j = 0, len = confetti.length; j < len; j++) {
        c = confetti[j];
        results.push(c.draw());
    }
    return results;
    };

    step();

})




//沙塵


$(document).ready(function(){
    var COLORS, Confetti, NUM_CONFETTI, PI_2, canvas, confetti, context, drawCircle, i, range, resizeWindow, xpos;

    NUM_CONFETTI = 30;

    COLORS = [[244,164,96]];

    PI_2 = 1.5 * Math.PI;

    canvas = document.getElementById("world");

    context = canvas.getContext("2d");

    window.w = 0;

    window.h = 0;

    resizeWindow = function() {
    window.w = canvas.width = window.innerWidth;
    return window.h = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeWindow, false);

    window.onload = function() {
    return setTimeout(resizeWindow, 0);
    };

    range = function(a, b) {
    return (b - a) * Math.random() + a;
    };

    drawCircle = function(x, y, r, style) {
    context.beginPath();
    context.arc(x, y, r, 0, PI_2, false);
    context.fillStyle = style;
    return context.fill();
    };

    xpos = 1;

    document.onmousemove = function(e) {
    return xpos = e.pageX / w;
    };

    window.requestAnimationFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
        return window.setTimeout(callback, 99999 / 10);
    };
    })();

    Confetti = class Confetti {
    constructor() {
    this.style = COLORS[~~range(0)];
        this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
        this.r = ~~range(2, 4);
        this.r2 = 2 * this.r;
        this.replace();
    }

    replace() {
        this.opacity = 1;
        this.dop = 0.01 * range(1, 0.1);
        this.x = range(-this.r2, w - this.r2);
        this.y = range(-20, h - this.r2);
        this.xmax = w - this.r;
        this.ymax = h - this.r;
        this.vx = range(0, 2) + 8 * xpos - 5;
        return this.vy = 0.7 * this.r + range(-1, 1);
    }

    draw() {
        var ref;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;
        if (this.opacity > 1) {
        this.opacity = 1;
        this.dop *= -1;
        }
        if (this.opacity < 0 || this.y > this.ymax) {
        this.replace();
        }
        if (!((0 < (ref = this.x) && ref < this.xmax))) {
        this.x = (this.x + this.xmax) % this.xmax;
        }
        return drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
    }

    };

    confetti = (function() {
    var j, ref, results;
    results = [];
    for (i = j = 1, ref = NUM_CONFETTI; (1 <= ref ? j <= ref : j >= ref); i = 1 <= ref ? ++j : --j) {
        results.push(new Confetti);
    }
    return results;
    })();

    window.step = function() {
    var c, j, len, results;
    requestAnimationFrame(step);
    context.clearRect(1, 1, w, h);
    results = [];
    for (j = 0, len = confetti.length; j < len; j++) {
        c = confetti[j];
        results.push(c.draw());
    }
    return results;
    };

    step();

})
