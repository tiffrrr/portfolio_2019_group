//import { log } from "util";

//執行時啟動
function init() {
   frank_vote_rank();
    vote_button();
    frank_img();
    getRankData();
    animal_item();
    anime();
    water();
    collections_rank();
    modifyAnimation();
    message_xml()
}

//resize時啟動
function reinit() {
    animal_item();
}
//動物寬高變數
var anime_state;

addEventListener("load", init);
addEventListener("resize", reinit);
addEventListener('scroll', modifyAnimation);
addEventListener('scroll', gameAnimation);

//客製動物欄位的動畫
function modifyAnimation(){
    
    if(scrollY>=1300){
        //樹長出來
        setTimeout(function(){document.querySelectorAll('.modify_bg_ab img')[3].classList.add('treeGrow');},0);
        setTimeout(function(){document.querySelectorAll('.modify_bg_ab img')[2].classList.add('treeGrow');},300);
        setTimeout(function(){document.querySelectorAll('.modify_bg_ab img')[1].classList.add('treeGrow');},600);
        setTimeout(function(){document.querySelectorAll('.modify_bg_ab img')[0].classList.add('treeGrow');},900);
        //動物跳起來(有分開4個圖片)
        for(var x=0; x<4; x++){
            document.querySelectorAll('.modify_pic img')[x].classList.add('home_jump');
        }


    }else {
        for(var j=0; j<4; j++){
            document.querySelectorAll('.modify_bg_ab img')[j].classList.remove('treeGrow');
        }
        for(var x=0; x<4; x++){
            document.querySelectorAll('.modify_pic img')[x].classList.remove('home_jump');
        }

    }
}

//生存遊戲欄位的動畫
function gameAnimation(){
    if(scrollY>=2000 && scrollY<=3147) { 
        //駱駝走路
        document.querySelectorAll('.game_bg_ab img')[0].classList.add('camelWalk');
        
        //排行榜滑動
        if(window.innerWidth>=768){
            var scrolled1 = (window.pageYOffset - 2395)*0.4;//排行榜滑動的速度
            document.querySelector('.game_palyrank').style.transform = 'translateX('+scrolled1+'px)';
            if(scrollY>=2665){
                var scrolled2 = (window.pageYOffset - 2671)*0.4;
                if(0.5*scrolled2<=80){//椅子被旋轉 被撞出去
                    document.querySelectorAll('.game_bg_ab img')[1].style.transform = 'rotateZ('+1*scrolled2+'deg)';
                }  
            }
        }

    }else {
        document.querySelectorAll('.game_bg_ab img')[0].classList.remove('camelWalk');


        // document.querySelector('.topwrap').classList.remove('chartSlide');

    }
}


//怪奇遊戲火車動畫

    //scrollMagic
    //啟動ScrollMagic控制器
    var controller = new ScrollMagic.Controller();
    //創建動畫

    //火車旋轉
    var animation_train = TweenMax.to('.game_train', 5, {
    repeat: -1,
    rotation: 360,
    transformOrigin: "left 100%",
    });


    //創建場景

    //火車旋轉
    var train_scene = new ScrollMagic.Scene({
    triggerElement: '.home_game', //觸發點
    reverse:true,   
    // duration :'50%',//距離
    offset :' -100px'//偏移上方距離
    }).setTween(animation_train)
    // .addIndicators()
    .addTo(controller) 


//怪奇排行榜
function frank_vote(){

    if(rank1.readyState==4){
        var vote_rank= JSON.parse(rank1.responseText);
// console.log(vote_rank);

   for (let i = 0; i <1; i++) {
    $id("vote_num1").innerText=vote_rank[i]["vote"];
    $id("aml_bg1").src=vote_rank[i]["amlbg_img"];
    $id("top_animalName1").innerText=vote_rank[i]["work_name"];
    $id("top_memId1").innerText=vote_rank[i]["user_name"];

 }
 for (let i = 1; i <2; i++) {
    $id("vote_num2").innerText=vote_rank[i]["vote"];
    $id("aml_bg2").src=vote_rank[i]["amlbg_img"];
    $id("top_animalName2").innerText=vote_rank[i]["work_name"];
    $id("top_memId2").innerText=vote_rank[i]["user_name"];
  
 }
 
 for (let i = 2; i <3; i++) {
    $id("vote_num3").innerText=vote_rank[i]["vote"];
    $id("aml_bg3").src=vote_rank[i]["amlbg_img"];
    $id("top_animalName3").innerText=vote_rank[i]["work_name"];
    $id("top_memId3").innerText=vote_rank[i]["user_name"];

 }
 
 
}}

function frank_rank(){
    if(window.ActiveXObject){
        xmlHttp= new ActiveXObject('Microsoft.XMLHTTP');
    }else if(window.XMLHttpRequest) {
        xmlHttp= new XMLHttpRequest();
    }
    return xmlHttp;
}
function frank_vote_rank(){
    rank1=frank_rank();
    rank1.open("GET","php/frank/vote_rank.php",true);
    rank1.onreadystatechange = frank_vote;
    rank1.send(null);
}



function  message_xml(){
    message_item=frank_rank();
    message_item.open("GET","php/home/message.php",true);
    message_item.onreadystatechange =message_php;
    message_item.send(null);
}




function message_php(){
      
    if(message_item.readyState==4  && message_item.status==200){
        let message_arr= JSON.parse(message_item.responseText);
        // console.log( message_arr);
        

  for (let i = 0; i <1; i++){
    //   $("#frank_message_content").append($("#message_wrap").clone(true).attr({id:'message_itme'+i,class:'message_itme frank_message_wrap'}));
//    console.log(1);
   
    $id("msg_animal_bg1").src=message_arr[i]["my_animal_bg_img"];
    $id("msg_animal1").src=message_arr[i]["my_animal_img"];
    $id("msg_id1").innerText=message_arr[i]["user_name"]; 
    $id("msg_date1").innerText=message_arr[i]["msg_date"];
    $id("msg_text1").innerText=message_arr[i]["msg_content"];
    }
    for (let i = 1; i <2; i++){
        //   $("#frank_message_content").append($("#message_wrap").clone(true).attr({id:'message_itme'+i,class:'message_itme frank_message_wrap'}));
    //    console.log(2);
       
        $id("msg_animal_bg2").src=message_arr[i]["my_animal_bg_img"];
        $id("msg_animal2").src=message_arr[i]["my_animal_img"];
        $id("msg_id2").innerText=message_arr[i]["user_name"]; 
        $id("msg_date2").innerText=message_arr[i]["msg_date"];
        $id("msg_text2").innerText=message_arr[i]["msg_content"];
        }
    for (let i = 2; i <3; i++){
        //   $("#frank_message_content").append($("#message_wrap").clone(true).attr({id:'message_itme'+i,class:'message_itme frank_message_wrap'}));
        // console.log(3);
        
        $id("msg_animal_bg3").src=message_arr[i]["my_animal_bg_img"];
        $id("msg_animal3").src=message_arr[i]["my_animal_img"];
        $id("msg_id3").innerText=message_arr[i]["user_name"]; 
        $id("msg_date3").innerText=message_arr[i]["msg_date"];
        $id("msg_text3").innerText=message_arr[i]["msg_content"];
        }
}


}



//投票

function  frank_vote_rank(){
    rank1=frank_rank();
    rank1.open("GET","php/frank/vote_rank.php",true);
    rank1.onreadystatechange = frank_vote;
    rank1.send(null);
}
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
                      for (let i = 0; i < vote_rank_item.length; i++) {
            $id("vote_num"+`${i}`).innerText=vote_rank_item[i]["vote"];
            $id("aml_bg"+`${i}`).src=vote_rank_item[i]["amlbg_img"];
            $id("top_animalName"+`${i}`).innerText=vote_rank_item[i]["work_name"];
            $id("top_memId"+`${i}`).innerText=vote_rank_item[i]["user_name"];
            // $id("vote_num2"+`${i}`).innerText=vote_rank_item[i]["vote"];
            // $id("aml_bg2"+`${i}`).src=vote_rank_item[i]["bg_img"];
            // $id("top_animalName2"+`${i}`).innerText=vote_rank_item[i]["work_name"];
            // $id("top_memId2"+`${i}`).innerText=vote_rank_item[i]["user_name"];
            // $id("vote_num3"+`${i}`).innerText=vote_rank_item[i]["vote"];
            // $id("aml_bg3"+`${i}`).src=vote_rank_item[i]["bg_img"];
            // $id("top_animalName3"+`${i}`).innerText=vote_rank_item[i]["work_name"];
            // $id("top_memId3"+`${i}`).innerText=vote_rank_item[i]["user_name"];
            $("input[name='work_no']")[i].value=vote_rank_item[i]["work_no"];
            $("input[name='work_no3']")[i].value=vote_rank_item[i]["work_no"];
             } 
            }
            vote_in_xml.send(null);  
             }, 200);
        
        
        }};
        

function vote_button(){

$('.top_btn .btn_cloud').click(function(){
    if (!sessionStorage['user_no']) {
    
    $id('login_gary').style.display = 'block';
    return ;
} 
let e= $(this).find("input")[0].value;
vote_xml(e);
});
}

//點動物跳轉頁面

function frank_img(){
       $('#top_one,#top_two,#top_three').click(function(){
            window.location.href ="frank.html"});
    };
        
    
    

//生存遊戲抓取排行榜
function getRankData(){
    var xhr = new XMLHttpRequest();
    xhr.onload=function (){
        if( xhr.status == 200 ){ 
            userDataDesc = JSON.parse(xhr.responseText);
            // alert(userDataDesc[0].my_animal_img);
            // console.log(userDataDesc);
            //塞入前三名照片跟資料
            for(let j=0; j<3; j++){
                document.querySelectorAll('.top_animal_img')[j].src = userDataDesc[j].my_animal_img;
                document.querySelectorAll('.top_score')[j].innerText = userDataDesc[j].game_record + '秒';
                document.querySelectorAll('.top_animal_name')[j].innerText = userDataDesc[j].my_animal_name;
            }
        }else{
            alert( xhr.status );
        }
    }
    var url = "php/game/getRankingData.php";
    xhr.open("Get", url, true);  //readyState : 1
    xhr.send( null );
}
//判斷瀏覽器
function collections_rank(){
    if(window.ActiveXObject){
        xmlHttp_rank= new ActiveXObject('Microsoft.XMLHTTP');
    }else if(window.XMLHttpRequest) {
        xmlHttp_rank= new XMLHttpRequest();
    }
    collections_rank_refresh(xmlHttp_rank);
}
function  collections_rank_refresh(xmlHttp_rank){
    xmlHttp_rank.open("GET","php/home/collections.php",true);
    // xmlHttp_rank.onreadystatechange = collections;
    xmlHttp_rank.send(null);
}
// function collections(){
   
    
//     if(xmlHttp_rank.readyState==4){
//     var data= JSON.parse(xmlHttp_rank.responseText);
//     var rank1 =data[0];
//     var rank2 =data[1];
//     var rank3 =data[2];
//     console.log(rank1.bg_img);
    
//     document.getElementById('rank_1_bg').src=rank1.bg_img;
//     document.getElementById('rank_1_img').src=rank1.cmp_img;
//     document.getElementById('rank_2_bg').src=rank2.bg_img;
//     document.getElementById('rank_2_img').src=rank2.cmp_img;
//     document.getElementById('rank_3_bg').src=rank3.bg_img;
//     document.getElementById('rank_3_img').src=rank3.cmp_img;
//     }
// }
//設定動物寬高
function animal_item() {
    anime_state = (calss("home_header_pic")[0].attributes.class.ownerElement.clientWidth);
    if (window.innerWidth <= 767) {
        calss("home_animal_01")[0].style.height = anime_state / 100 * 15 + "px";
        calss("home_animal_01")[0].style.width = anime_state / 100 * 15 + "px";

        calss("home_animal_02")[0].style.height = anime_state / 100 * 15 + "px";
        calss("home_animal_02")[0].style.width = anime_state / 100 * 15 + "px";

        calss("home_animal_03")[0].style.height = anime_state / 100 * 15 + "px";
        calss("home_animal_03")[0].style.width = anime_state / 100 * 15 + "px";

        calss("home_animal_04")[0].style.height = 0+ "px";
        calss("home_animal_04")[0].style.width = 0 +"px";


        calss("home_animal_05")[0].style.height = anime_state / 100 * 15 + "px";
        calss("home_animal_05")[0].style.width = anime_state / 100 * 15 + "px";
    }
    if (window.innerWidth > 767) {
        calss("home_animal_01")[0].style.height = anime_state / 100 * 20 + "px";
        calss("home_animal_01")[0].style.width = anime_state / 100 * 20 + "px";

        calss("home_animal_02")[0].style.height = anime_state / 100 * 20 + "px";
        calss("home_animal_02")[0].style.width = anime_state / 100 * 20 + "px";

        calss("home_animal_03")[0].style.height = anime_state / 100 * 18 + "px";
        calss("home_animal_03")[0].style.width = anime_state / 100 * 18 + "px";

        calss("home_animal_04")[0].style.height = 0 + "px";
        calss("home_animal_04")[0].style.width = 0 + "px";


        calss("home_animal_05")[0].style.height = anime_state / 100 * 20 + "px";
        calss("home_animal_05")[0].style.width = anime_state / 100 * 20 + "px";
    }
     //找出所有動物 並在js跑完時出現
        let x = document.querySelectorAll(".home_animal");
        for (let i = 0; i < x.length; i++) {
         x[i].style.display = "block";
           }

}

function calss(e) {
    return document.getElementsByClassName(e);
}
var test = 30;

function anime() {
    //掉落速度函數
     CustomEase.create("custom", "M0,0,C0.14,0,0.334,0.415,0.364,0.538,0.405,0.705,0.562,0.963,0.57,1,0.578,0.985,0.595,0.968,0.636,0.906,0.684,0.83,0.765,0.868,0.782,0.89,0.784,0.892,0.867,0.998,0.868,1,0.882,0.978,0.918,0.95,0.932,0.95,0.968,0.96,1,1,1,1")
    //動物控制器
    var home_animal_1 = new TimelineMax({
        repeat: -1,
    });
    var home_animal_2 = new TimelineMax({
        repeat: -1,
    });
    var home_animal_3 = new TimelineMax({
   repeat:-1,
      
    });
    var home_animal_5 = new TimelineMax({
        repeat:-1,
    });
    home_animal_1.to(".home_animal_01", 0, {//開始花費0秒立即實行
        x: 0,                  //x位置歸零
        yPercent: -380,        //Y位置往上300%
        //scaleX:-1
        rotation:0,            //角度歸零

    }, ).to('.home_animal_01', 2, {//開始花費2秒實行
        x: 0,         
        yPercent: 0, //y位置歸零
        // delay: 1,
        ease:"custom",//掉落速度函數
    }, )
    .to('.home_animal_01',.6 , { //開始0.6秒後花費0.6秒實行
        rotation:360,  //旋轉一圈
        transformOrigin: "50% 50%", //設定動畫圓心
    },.6)

    .fromTo('.home_animal_01', .1, {  //接續上面動畫花費0.1秒反覆實行
      
        transformOrigin: "50% 80%",
    }
    ,{  ease: Power0.easeNone,//速度函數
        yoyoease:Power0.easeNone,   //速度函數
        rotation:370, //360-370反覆執行
        yoyo: true,
        repeat: 18,//執行18次
        delay:1,
    },1.)
    .to('.home_animal_01', 3, { 
        xPercent: 150, //往右150%
        yPercent: -10,//往上10%
        scale: .4, //變小60%  變成原本大小的40%
    },2)
    .to('.home_animal_01', .1, { 
        autoAlpha:0,  //消失
    },4 )
//-------------------------------------------------------------------

home_animal_2.to(".home_animal_02", 0, {
    x: 0,
    yPercent: -380,
    //scaleX:-1
    rotation:0,
}, ).to('.home_animal_02', 3, {
    x: 0,
    yPercent: 0,
     ease: Bounce.easeOut,
},1.2 )
.to('.home_animal_02',1, { 
    rotation:360,
    transformOrigin: "50% 50%",
},2.4)
.to('.home_animal_02',.2, { 
    rotation:354,
},4.2)
.fromTo('.home_animal_02', .1, { 
    transformOrigin: "50% 60%",
}
,{  ease: Power0.easeNone,
    yoyoease:Power0.easeNone,   
    yoyo: true,
    rotation:366    ,
    repeat: 12,
   
},4.2)
.to('.home_animal_02', 3, { 
    xPercent: 130,
    yPercent: 10,
    scale: .5, 
},4.2)
.to('.home_animal_02', .3, { 
    autoAlpha:0,
}, )

//*************************************************************** */
//anomal3的延遲變數

let aS=0.8;
home_animal_3.to(".home_animal_03", 0, {
    x: 0,
    yPercent: -380,
    //scaleX:-1
    rotation:0,
}, ).to('.home_animal_03', 2, {
    x: 0,
    yPercent: 0,
    // delay: 1,
    ease:"custom",
},aS )
.to('.home_animal_03',.6 , { 
    rotation:360,
    transformOrigin: "50% 50%",
},aS+.6)

.fromTo('.home_animal_03', .3, { 
    transformOrigin: "50% 80%",
}
,{  ease: Power0.easeNone,
    yoyoease:Power0.easeNone,   
    rotation:380,
    yoyo: true,
    repeat: 3,
    delay:1,
},aS+1.)
.to('.home_animal_03', 3, { 
    xPercent: 70,
    yPercent: 0,
    scale: .4, 
},aS+2)
.to('.home_animal_03', .1, { 
    autoAlpha:0,
},aS+4 )

//******************************************************** */


home_animal_5.to(".home_animal_05", 0, {
    x: 0,
    yPercent: -380,
    scaleX:-1,
    rotation:0,
    rotation:0,
}, ).to('.home_animal_05', 2, {
    x: 0,
    yPercent: 0,
    // delay: 1,
     ease: Bounce.easeOut,
},0.6 )
.to('.home_animal_05',.8, { 
    rotation:-740,
},1.3)
.to('.home_animal_05',2,{
    yPercent: -38,
    xPercent: -60,
    scaleX:- 0.5,
    scaleY:0.5,
})
.to('.home_animal_05',5,{
    scaleX:- 0.3,
    scaleY:0.3,
    xPercent: -180,
})
.fromTo('.home_animal_05', .3, { 
    
    rotation:5,
}
,{  ease: Power0.easeNone,
    yoyoease:Power0.easeNone,   
    rotation:-5,
    yoyo: true,
    repeat: 25,
    transformOrigin: "50% 80%",
},2)

}

function water() {
    //瀑布寬度控制器
    var hd_water_water = new TimelineMax({
        repeat: -1,
        yoyo: true,
      //  paused: true,
    });
    //瀑布水流控制
    var hd_water_item_11 = new TimelineMax({
        repeat: -1,
        //paused: true,
    });
    var hd_water_item_12 = new TimelineMax({
        repeat: -1,
        //paused: true,
    });
    var hd_water_item_13 = new TimelineMax({
        repeat: -1,
        //paused: true,
    });
    var hd_water_item_21 = new TimelineMax({
        repeat: -1,
       
    });
    var hd_water_item_22 = new TimelineMax({
        repeat: -1,
       
    });
    var hd_water_item_31 = new TimelineMax({
        repeat: -1,
       
    });
    var hd_water_item_32 = new TimelineMax({
        repeat: -1,
       
    });
    //瀑布圓形水花
    var hd_water_round= new TimelineMax({
        repeat: -1,
        yoyo:true,
      //  paused: true,
    })
    var hd_water_round_01= new TimelineMax({
        repeat: -1,
        yoyo:true,
      //  paused: true,
    })

    var hd_water_round_02= new TimelineMax({
        repeat: -1,
        yoyo:true,
      //  paused: true,
    })
    var hd_water_round_03= new TimelineMax({
        repeat: -1,
        yoyo:true,
      //  paused: true,
    })

    hd_water_water.to("#hd_water_water", .6, {
      
        scaleX: 1.02,

        //scaleX:-1
    }, )
//水流

 let wx=0.9;
    hd_water_item_11
    .to(".hd_water_item011", 0, {
        autoAlpha:.3,
        scaleX: .8,
         xPercent: function(index, target) {
            return (index) * 650 // 100, 200, 300
          },
   }, 0)
    .staggerTo(".hd_water_item011",wx, {
         yPercent: 1000,
         autoAlpha:1,
        ease: Power0.easeNone,
         stagger:.5,
      //  yoyo:true,
    }, 0)

    hd_water_item_12
    .to(".hd_water_item012", 0, {
        autoAlpha:.3,
        scaleX: .8,
         xPercent: function(index, target) {
            return (index ) * 650  +975// 100, 200, 300
          },
   }, 0)
    .staggerTo(".hd_water_item012",wx+0.2, {
         yPercent: 1000,
         autoAlpha:1,
        ease: Power0.easeNone,
         stagger:.8,
      //  yoyo:true,
    },)
    hd_water_item_13
    .to(".hd_water_item013", 0, {
        autoAlpha:.3,
        scaleX: .6,
         xPercent: function(index, target) {
            return (index ) * 650  +325// 100, 200, 300
          },
   }, 0)
    .staggerTo(".hd_water_item013",wx, {
         yPercent: 1000,
         autoAlpha:1,
        ease: Power0.easeNone,
         stagger:.1,
      //  yoyo:true,
    }, 1.5)

    hd_water_item_21
    .to(".hd_water_item021", 0, {
        autoAlpha:1,
       // scaleX: .8,
         xPercent: function(index, target) {
            return (index ) * 400 // 100, 200, 300
          },
   }, )
    .staggerTo(".hd_water_item021",wx-0.1, {
         yPercent: 1400,
         autoAlpha:1,
        ease: Power0.easeNone,
         stagger:.2,
      //  yoyo:true,
    }, 1)
    hd_water_item_22
    .to(".hd_water_item022", 0, {
        autoAlpha:1,
       // scaleX: .8,
         xPercent: function(index, target) {
            return (index) * 100 // 100, 200, 300
          },
   }, )
    .staggerTo(".hd_water_item022",wx+.1, {
         yPercent: 1400,
         autoAlpha:1,
        ease: Power0.easeNone,
         stagger:.2,
      //  yoyo:true,
    }, )
    hd_water_item_31
    .to(".hd_water_item031", 0, {
        autoAlpha:1,
       // scaleX: .8,
         xPercent: function(index, target) {
            return (index) * 500 -300// 100, 200, 300
          },
   }, )
    .staggerTo(".hd_water_item031",.6, {
         yPercent: 450,
         autoAlpha:1,
        ease: Power0.easeNone,
         stagger:.7,
      //  yoyo:true,
    }, )

    hd_water_item_32
    .to(".hd_water_item032", 0, {
        autoAlpha:1,
       // scaleX: .8,
         xPercent: function(index, target) {
            return (index) * 500 -300// 100, 200, 300
          },
   }, )
    .staggerTo(".hd_water_item032",.6, {
         yPercent: 450,
         autoAlpha:1,
        ease: Power0.easeNone,
         stagger:-.4,
      //  yoyo:true,
    },.3 )

    hd_water_round
    .to(".hd_water_round",0,{
        xPercent: function(index, target) {
            return (index ) * 60 // 100, 200, 300
          },
      },0)
      hd_water_round_01
      .to(".hd_water_round11",.8,{
        scale:1.05,
      },)
      hd_water_round_02
      .to(".hd_water_round12",.6,{
        scale:1.08,
      },.3)
      hd_water_round_03
      .to(".hd_water_round13",.7,{
        scale:1.06,
        
      },.3)
}

// 透過Ajax從PHP抓到資料庫的部件資料
function getpartlist_home(){
    
    //產生XMLHttpRequest物件
    var xhr = new XMLHttpRequest(); //readyState : 0

    //註冊callback function
    xhr.onload = function(){
        // console.log( xhr.readyState);
        if (xhr.status == 200){
            // console.log(xhr.responseText);
            partsobj = JSON.parse(xhr.responseText);
            // console.log(partsobj);
            // 抓到jason物件資料後，直接丟進建立html的函式裡
            buildlist(partsobj);
            
        }else{
            alert(xhr.status);
        };
    };

    //設定好所要連結的程式
    var url = "php/modify/getparts.php";
    xhr.open("Get", url, true);

    //送出資料
    xhr.send( null );
}

function buildlist (jsonobj){

    let head_arr = jsonobj.head;
    let head_div = document.getElementsByClassName("modify_opt")[0];
    // console.log(head_arr);
    

//建立頭部HTML架構 
for (let i=0; i<4; i++){

    let div = document.createElement('div');
    div.classList = 'opt_item';

    let img = document.createElement('img');
    img.src = head_arr[i].head_img;
    img.classList = 'picon';
    // console.log(img.src);

    let p = document.createElement('p');
    p.innerHTML = head_arr[i].head_ch_name;

    div.appendChild(img);
    div.appendChild(p);
    head_div.appendChild(div);

    // 抓到選單的圖片，全部建立click聆聽功能
    let picon = document.getElementsByClassName('picon');
    for(let i=0; i<picon.length; i++){
        picon[i].addEventListener('click',changeParts_home);
    };

}


function changeParts_home(e){

    // 從點到的圖片網址裡去抓出部件種類出來
    let urlstr = e.target.src;
    let type_x = urlstr.lastIndexOf('/');
    // console.log(type_x);
    let type_y = urlstr.indexOf('_');
    let type_name = urlstr.substring(type_x +1 ,type_y);
    // console.log(type_name);

    // // 從點到的圖片網址裡去抓出動物名稱出來
    let animal_y = urlstr.lastIndexOf('.');
    let animal_name = urlstr.substring(type_y +1 ,animal_y);
    // console.log(animal_name);

    // // 用if去判斷不同部位選擇要更換相應的圖片
    if (type_name == 'head'){
        document.getElementsByClassName('head_pic')[0].src = `img/modify/p_head_${animal_name}.png`;
    }
    

}


}
window.addEventListener("load",getpartlist_home,false);