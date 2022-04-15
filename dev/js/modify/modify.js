
let parts_icon = document.getElementsByClassName("parts_icon");
let picon ;


// 總能力值初始化為長頸鹿的數值，避免沒有選時會為0的情況
let total_eml_forest = 2;       //森林
let total_eml_mountain = 2;     //高山
let total_eml_desert = 2;       //沙漠
let total_health = 4;           //血量
let total_jump = 2;             //跳躍力

// 各別部件的能力值初始化
let head_eml_forest = 3;
let head_eml_desert = 1;
let head_eml_mountain = 1;

let body_eml_forest = 1;
let body_eml_desert = 2;
let body_eml_mountain = 3;

let leg_eml_forest = 2;
let leg_eml_desert = 1;
let leg_eml_mountain = 1;

// 用ajax從php抓回來的jason物件
let partsobj = [];

// 設有幾種部件，後面的隨機會用到
// let part_types = picon.length / 4;
let part_types = 4;


// 換動物部件的canvas建立
let canvas = document.getElementById('aml_canvas');
let context = canvas.getContext('2d');
    if (window.innerWidth < 996){
        canvas.width = "250";
        canvas.height = "250";
    }else{
        canvas.width = "400";
        canvas.height = "400";
    }

// 換背景圖片的canvas寬高動態設定參考值
let bgimg_box = document.getElementsByClassName('bgimg_box')[0];
let geth = document.getElementsByClassName('geth')[0];
let bg_width = parseInt(window.getComputedStyle(bgimg_box).getPropertyValue('width'));
let bg_height = parseInt(window.getComputedStyle(geth).getPropertyValue('height'));
// console.log(bg_width);
// console.log(bg_height);

// 換背景圖片的canvas建立
let bg_canvas = document.getElementById('bg_canvas');
let bgcontext = bg_canvas.getContext('2d');
    bg_canvas.width = bg_width;
    bg_canvas.height = bg_height;

// 動物和背景圖片合併用的canvas建立
let amlbg_canvas = document.getElementById('amlbg_canvas');
let amlbgcontext = amlbg_canvas.getContext('2d');
amlbg_canvas.width = bg_width;
amlbg_canvas.height = bg_height;

// 背景canvas畫圖的滑鼠啟動設定
let draw_start = 0;

// 背景canvas畫圖的編輯啟動設定
let bgcanvas_switch = 0;

// 背景canvas的開關
let draw_switch = document.getElementById('cir_check');

// HSV轉RGB後的值
let hex;

// 畫筆的示範物件
let sample_point = document.getElementsByClassName('sample_point')[0];

// 背景canvas畫筆大小預設
let drawsize = 5;

// 預設的動物聲音
let animal_howl = 'img/voice/dog.mp3';

// 放聲音路徑的陣列
let voice_arr = [];

// 最後選到的頭部名稱
let selected_head = '';

// 各部件的變數，後面隨機會用到
let head_parts;
let body_parts;
let leg_parts;
let tail_parts;





// 下一步動作
function nextstep(){
    // 抓到動物canvas
    canvas = document.getElementById('aml_canvas');
    // 把canvas轉成圖片資料檔
    let url = canvas.toDataURL("image/png");
    // 把圖片資料檔送到背景的動物預覽圖，讓人預覽用
    document.getElementsByClassName('temp_aml_pic')[0].src = url;
    // 把圖片資料檔送到form裡的隱藏input，做等等存檔用
    document.getElementById('aml_data').value = url;
    // 把canvas畫圖的功能關閉
    switch_bgcanvas("OFF");
}


// 繪製動物canvas的圖
function drawcanvas(){

    // 先清掉之前的東西
    context.clearRect(0,0,canvas.width,canvas.height);

    // 設定接下來要進來的圖片大小與canvas相同
    let pic_width = canvas.width;
    let pic_height = canvas.height;

    // 4個部件，所以建立4個圖像物件
    let img1 = new Image();
    let img2 = new Image();
    let img3 = new Image();
    let img4 = new Image();

    // 圖像物件抓到HTML隱藏的img圖檔路徑
    img1.src = document.getElementsByClassName('head_pic')[0].src;
    img2.src = document.getElementsByClassName('body_pic')[0].src;
    img3.src = document.getElementsByClassName('leg_pic')[0].src;
    img4.src = document.getElementsByClassName('tail_pic')[0].src;

    // 四個部件只要有一個更新載入完成，四個就一起重繪一遍
    img1.onload = function(){
        context.drawImage(img4,0,0,pic_width,pic_height);
        context.drawImage(img3,0,0,pic_width,pic_height);
        context.drawImage(img2,0,0,pic_width,pic_height);
        context.drawImage(img1,0,0,pic_width,pic_height);
    };
    img2.onload = function(){
        context.drawImage(img4,0,0,pic_width,pic_height);
        context.drawImage(img3,0,0,pic_width,pic_height);
        context.drawImage(img2,0,0,pic_width,pic_height);
        context.drawImage(img1,0,0,pic_width,pic_height);
    };
    img3.onload = function(){
        context.drawImage(img4,0,0,pic_width,pic_height);
        context.drawImage(img3,0,0,pic_width,pic_height);
        context.drawImage(img2,0,0,pic_width,pic_height);
        context.drawImage(img1,0,0,pic_width,pic_height);
    };
    img4.onload = function(){
        context.drawImage(img4,0,0,pic_width,pic_height);
        context.drawImage(img3,0,0,pic_width,pic_height);
        context.drawImage(img2,0,0,pic_width,pic_height);
        context.drawImage(img1,0,0,pic_width,pic_height);
    };
}

// 繪製背景canvas的圖
function drawbg_canvas(){

    // 先清掉之前的東西
    bgcontext.clearRect(0,0,bg_canvas.width,bg_canvas.height);
    
    // 設定接下來要進來的圖片大小與canvas相同
    let pic_width = bg_canvas.width;
    let pic_height = bg_canvas.height;

    // 建立1個圖像物件
    let img1 = new Image();

    // 圖像物件抓到HTML隱藏的img圖檔路徑
    img1.src = document.getElementsByClassName('bg_pic')[0].src;
    
    // 圖像讀取完成後，把它畫到canvas上
    img1.onload = function(){
        bgcontext.drawImage(img1,0,0,pic_width,pic_height);
    };
}

//alert訊息
// function alert(title,text){
//     $(" body").append('<div class="msg_alert" id="msg"><div class="msg_alert_container"><div class="msg_title" id="msg_top"><span>'+title+'</span></div><div class="btn_close msg_clear"><span>×</span></div><div class="msg_cont" id="msg_cont">'+text+'</div><div class="msg_alert_close msg_clear"><a href="javascript:;" class="btn_cloud">關閉<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span></a></div></div></div>');
//     $(".msg_clear").click(function (){
//     $("#msg").remove();
    
//     });
// }


// function alert(text,title){

//     if(!title==""){
  
//     $(" body").append('<div class="msg_alert" id="msg"><div class="msg_alert_container"><div class="msg_title" id="msg_top"><span>'+title+'</span></div><div class="btn_close msg_clear"><span>×</span></div><div class="msg_cont" id="msg_cont">'+text+'</div><div class="msg_alert_close msg_clear"><a href="javascript:;" class="btn_cloud">關閉<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span></a></div></div></div>');
//     $(".msg_clear").click(function (){
//     $("#msg").remove();
//         });
//   }else{
  
//     $(" body").append('<div class="msg_alert" id="msg"><div class="msg_alert_container"><div class="msg_title" id="msg_top"><span>提示</span></div><div class="btn_close msg_clear"><span>×</span></div><div class="msg_cont" id="msg_cont">'+text+'</div><div class="msg_alert_close msg_clear"><a href="javascript:;" class="btn_cloud">關閉<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span></a></div></div></div>');
//     $(".msg_clear").click(function (){
//     $("#msg").remove();
//      });
//   }
  
//   }


// 確認完成按下去後
function dopic(){

    // 為了避免有人忘了按下一步，所以這邊再次執行一遍
    // 因為要按了下一步後，才會把動物圖存起來
    nextstep();
    
    // 先判斷sessionStorage有沒有會員登入資料，有才往下做轉圖檔工作
    if (sessionStorage['user_name']){

        let input_amlname = document.getElementById('input_amlname');
        // 判斷是否有輸入動物名字
        // 如果動物名稱裡不是空的，代表已經有輸入名字了，可繼續做下去
        if (input_amlname.value != ''){

            // 之前做好動物時，動物圖片資訊已先傳到form1的暫存input裡了
            // 所以這裡只要處理背景圖就好
            let bg_url = bg_canvas.toDataURL("image/png");
            // document.getElementById('testimg').src = bg_url;
            document.getElementById('bg_data').value = bg_url;
            document.getElementsByClassName('tempbg_pic')[0].src = bg_url;

            // 把動物聲音的路徑放進form1的input，與sessionStorage裡
            
            if (voice_arr[selected_head] == undefined){
                document.getElementById('voice_data').value = animal_howl;
                sessionStorage['animal_howl'] = animal_howl;
            }else{
                document.getElementById('voice_data').value = voice_arr[selected_head];
                sessionStorage['animal_howl'] = voice_arr[selected_head];
            }

            // 把動物環境的canvas做成img圖檔存起來
            let chart_canvas =document.getElementsByClassName('chart_canvas')[0];
            let chart_url = chart_canvas.toDataURL("image/png");
            document.getElementById('chart_data').value = chart_url;

            // 呼叫做動物與背景合併的第三圖函式，在這函式做完才做傳到php的picsend();
            combine_amlbg();

            // 如果沒有輸入動物名字，則彈出輸入動物名字的提示視窗
        }else {
            // document.getElementsByClassName('need_name')[0].classList.add('show');
            alert("<p>請幫動物取個名字</p>","提示");
        }
    // 如果sessionStorage沒有登入，則彈出提示登入的視窗
    }else{
        // document.getElementsByClassName('remind_login')[0].classList.add('show');
        alert(`<p>請先登入後<br>才能把您的動物儲存下來</p>
        <a href="javascript:;" class="btn_cloudb login_js">
            登入<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span>
        </a>`,"提示");

        $(".login_js").click(function (){
            $("#hmsg").remove();
            openlogin();
            });
        };
}





// 背景與動物的圖片結合
function combine_amlbg(){
    // 建立一個新的canvas

    // 先清掉之前的東西
    amlbgcontext.clearRect(0,0,amlbg_canvas.width,amlbg_canvas.height);
    
    // 設定接下來要進來的圖片大小與canvas相同
    let pic_width = amlbg_canvas.width;
    let pic_height = amlbg_canvas.height;
    aml_y = amlbg_canvas.height - (amlbg_canvas.height *3 /4);

    // 建立2個圖像物件，1是背景圖，2是動物圖
    let img1 = new Image();
    let img2 = new Image();

    // 圖像物件抓到HTML隱藏的img圖檔路徑
    img1.src = document.getElementsByClassName('tempbg_pic')[0].src;
    img2.src = document.getElementById('aml_data').value;

    // 圖像讀取完成後，把它畫到canvas上

    img1.onload = function(){
        amlbgcontext.drawImage(img1,0,0,pic_width,pic_height);
        amlbgcontext.drawImage(img2,0,aml_y,pic_width,pic_width);

        let amlbg_url = amlbg_canvas.toDataURL("image/png");
        // document.getElementById('testimg2').src = amlbg_url;
        document.getElementById('amlbg_data').value = amlbg_url;

        // 透過ajax發送資料到php的函式
        picsend();
    };
}



// 發送圖片資料到後台做圖片儲存動作
function picsend(){

    // 把輸入欄位的動物名稱與session的會員編號抓進form的input裡
    document.getElementById('myanimal_name').value = document.getElementById('input_amlname').value;
    document.getElementById('user_no').value = sessionStorage['user_no'];
    
    // 把動物適應力與生命跳躍力數據抓進form的input裡
    document.getElementById('environ_adapt_1').value = total_eml_forest;
    document.getElementById('environ_adapt_2').value = total_eml_mountain;
    document.getElementById('environ_adapt_3').value = total_eml_desert;
    document.getElementById('animal_life').value = total_health;
    document.getElementById('animal_jump').value = total_jump;

    // 建立一個Ajax物件，把form1的資料打包準備傳送給php
    let formData = new FormData(document.getElementById("form1"));
    let xhr = new XMLHttpRequest();
    xhr.onload = function(){
        if( xhr.status == 200){
            if(xhr.responseText == "error"){
            alert("Error");
            }else{
            console.log(xhr.responseText);
            saveok(xhr.responseText);
            }
        }else{
            alert(xhr.status);
        }
    }
    xhr.open('POST', 'php/modify/saveimg.php', true);
    xhr.send(formData);
}





// 圖片上傳成功後的動作
function saveok(text){
    // alert('<p>動物儲存成功</p>','提示');

    alert(`<p>動物儲存成功</p>
    <a href="game.html" class="btn_cloudb torank">
        進行遊戲<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span>
    </a>
    <a href="frank.html" class="btn_cloudb ">
        參加選怪<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span>
    </a>
    `,"提示");

    // 更新sessionStorage的動物生存參數
    sessionStorage['environ_adapt_1'] = total_eml_forest;
    sessionStorage['environ_adapt_2'] = total_eml_mountain;
    sessionStorage['environ_adapt_3'] = total_eml_desert;
    sessionStorage['animal_life'] = total_health;
    sessionStorage['animal_jump'] = total_jump;

    // 更新sessionStorage的動物相關圖片路徑
    let member_no = sessionStorage['user_no'];
    sessionStorage['my_animal_img'] = `img/customize/user${member_no}_aml.png`;
    sessionStorage['my_animal_bg_img'] = `img/customize/user${member_no}_bg.png`;
    sessionStorage['my_animalbg_img'] = `img/customize/user${member_no}_amlbg.png`;
    // 更新sessionStorage的動物參選資格
    sessionStorage['attend'] = 0;
}

// 上傳背景圖的設定
function read_bgimg(e){

    let fileAccepts = ["bmp", "png", "gif", "jpg"];
    let fileInfo = getFileInfo(e.target.value);
    // console.log(e.target.value);

    // 先判斷選到的檔案副檔名是否符合設定
    if( fileAccepts.indexOf(fileInfo.ext.toLowerCase()) == -1){
        alert("檔案格式不對");
        e.target.value = "";
    }else{
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(){
            // 上面程式把inputfile的圖檔讀取完後，放到暫存的背景img裡
            document.getElementsByClassName('bg_pic')[0].src = reader.result;
            // 呼叫畫背景canvas函式，把暫存的背景img畫到canvas裡
            drawbg_canvas();
            // console.log(reader.result);
        }
    }
}

// 把檔名和副檔名切開的函式
function getFileInfo(fileStr){

    //回傳一個陣列，索引0放的是主檔名, 索引1放的是副檔名
	let dotPos = fileStr.lastIndexOf(".");
	let fileName = fileStr.substring(0, dotPos);
	let fileExt = fileStr.substr( dotPos+1);

	let file = { 
		name : fileName,
		ext : fileExt
	};
	return file;
}


// 點圖片清單會做更換動物圖片的函式
function changeParts(e){

    // 從點到的圖片網址裡去抓出部件種類出來
    let urlstr = e.target.src;
    let type_x = urlstr.lastIndexOf('/');
    let type_y = urlstr.indexOf('_');
    let type_name = urlstr.substring(type_x +1 ,type_y);
    // console.log(type_name);

    // 從點到的圖片網址裡去抓出動物名稱出來
    let animal_y = urlstr.lastIndexOf('.');
    let animal_name = urlstr.substring(type_y +1 ,animal_y);
    // console.log(animal_name);

    // 用if去判斷不同部位選擇要更換相應的圖片
    if (type_name == 'head'){
        document.getElementsByClassName('head_pic')[0].src = `img/modify/p_head_${animal_name}.png`;
        // 抓到選擇的頭部三種環境適應力
        head_eml_forest = e.target.nextElementSibling.dataset.pointa;
        head_eml_mountain = e.target.nextElementSibling.dataset.pointb;
        head_eml_desert = e.target.nextElementSibling.dataset.pointc;
        // console.log(head_eml_forest + ',' + head_eml_mountain + ',' + head_eml_desert);

        // 依動物名稱再加上字串組合去抓到該動物的audio ID後，再撥放聲音
        let voice_target = "voice_" + animal_name;
        document.getElementById(voice_target).play();

        // 把動物名稱更新到外面的全域變數，後面要送資料去後台會用到
        selected_head = animal_name;

    }else if (type_name == 'body'){
        document.getElementsByClassName('body_pic')[0].src = `img/modify/p_body_${animal_name}.png`;
        // 抓到選擇的身體三種環境適應力
        body_eml_forest = e.target.nextElementSibling.dataset.pointa;
        body_eml_mountain = e.target.nextElementSibling.dataset.pointb;
        body_eml_desert = e.target.nextElementSibling.dataset.pointc;
        // console.log(body_eml_forest + ',' + body_eml_mountain + ',' + body_eml_desert);

        // 以及生命力
        total_health = e.target.nextElementSibling.dataset.health;
        updatehealth();     //呼叫更新生命力的function

    }else if (type_name == 'leg'){
        document.getElementsByClassName('leg_pic')[0].src = `img/modify/p_leg_${animal_name}.png`;
        // 抓到選擇的腳部三種環境適應力
        leg_eml_forest = e.target.nextElementSibling.dataset.pointa;
        leg_eml_mountain = e.target.nextElementSibling.dataset.pointb;
        leg_eml_desert = e.target.nextElementSibling.dataset.pointc;
        // console.log(leg_eml_forest + ',' + leg_eml_mountain + ',' + leg_eml_desert);

        // 以及跳躍力
        total_jump = e.target.nextElementSibling.dataset.jump;
        updatejump();       //呼叫更新跳躍力的function

    }else if (type_name == 'tail'){
        document.getElementsByClassName('tail_pic')[0].src = `img/modify/p_tail_${animal_name}.png`;
    }else if (type_name == 'bg'){
        document.getElementsByClassName('bg_pic')[0].src = `img/modify/bg_${animal_name}.png`;
        //呼叫函式，把選到的背景繪製到背景的canvas上
        drawbg_canvas();    
        // document.getElementsByClassName('temp_aml_pic')[0].classList.remove('hide');
    }

    // 算適應力的總和
    total_eml_forest = parseInt(head_eml_forest) + parseInt(body_eml_forest) + parseInt(leg_eml_forest);
    total_eml_mountain = parseInt(head_eml_mountain) + parseInt(body_eml_mountain) + parseInt(leg_eml_mountain);
    total_eml_desert = parseInt(head_eml_desert) + parseInt(body_eml_desert) + parseInt(leg_eml_desert);
    
    //呼叫更新雷達圖的function
    updatechart();      
    //呼叫函式，把選到的動物圖片繪製到動物的canvas上
    drawcanvas();       
}


// // 別的頁面要用的請複製這裡，資料由sessionStorage抓了，不用自己在手動輸入
// // 更新雷達圖資料
// function updatechart(){
//     let total_eml_forest = sessionStorage['environ_adapt_1'];
//     let total_eml_mountain = sessionStorage['environ_adapt_2'];
//     let total_eml_desert = sessionStorage['environ_adapt_3'];
//     myRadarChart.data.datasets[0].data = [total_eml_forest , total_eml_mountain , total_eml_desert];
//     myRadarChart.update();
// }

// // 更新生命力
// function updatehealth(){
//     let total_health = sessionStorage['animal_life'];
//     let health_box = document.querySelector(".life_ability .pic");
//     // console.log(health_box);
//     health_box.innerHTML = '';
//     for (let i=1; i<=total_health; i++){
//         let hart = document.createElement('img');
//         hart.src = 'img/modify/icon_life.png';
//         health_box.appendChild(hart);
//     }
// }

// // 更新跳躍力
// function updatejump(){
//     let total_jump = sessionStorage['animal_jump'];
//     let jump = document.getElementsByClassName('bar_add')[0];
//     let jump_value = document.getElementsByClassName('meter')[0];
//     jump.style.width = `${total_jump *2}0%`;
//     jump_value.innerText = total_jump + 'm';
// }


// 更新雷達圖資料
function updatechart(){
    myRadarChart.data.datasets[0].data = [total_eml_forest,total_eml_mountain,total_eml_desert];
    myRadarChart.update();
    // console.log(total_eml_forest + ',' + total_eml_mountain + ',' + total_eml_desert);
}

// 更新生命力
function updatehealth(){
    let health_box = document.querySelector(".life_ability .pic");
    // console.log(health_box);
    health_box.innerHTML = '';
    for (let i=1; i<=total_health; i++){
        let hart = document.createElement('img');
        hart.src = 'img/modify/icon_life.png';
        health_box.appendChild(hart);
    }
}

// 更新跳躍力
function updatejump(){
    let jump = document.getElementsByClassName('bar_add')[0];
    let jump_value = document.getElementsByClassName('meter')[0];
    jump.style.width = `${total_jump *2}0%`;
    jump_value.innerText = total_jump + 'm';
}

// 隨機的函式
function rand(min,max){
    var x=0;
    x = Math.floor(Math.random()*(max-min+1)+min);
    return x;
}

// 隨機選擇圖片的函式
function random_part(){

    head_parts = document.getElementsByClassName('head_parts');
    body_parts = document.getElementsByClassName('body_parts');
    leg_parts = document.getElementsByClassName('leg_parts');
    tail_parts = document.getElementsByClassName('tail_parts');

    for (let i=1; i<=6; i++){
        setTimeout(function(){
            // 各部位隨機的範圍
            let rand_head = rand(0 , head_parts.length -1);
            let rand_body = rand(0 , body_parts.length -1);
            let rand_leg = rand(0, leg_parts.length -1);
            let rand_tail = rand(0, tail_parts.length -1);

            // 四個圖片物件拿到隨機的位址後，各別做click動作
            // 因為改用canvas作畫，同時點太多次click觸發時，canvas會來不及清掉上一次的
            // 會造成舊的圖殘留在上面，所以才把每次click後要延遲50ms再點下一個click
            setTimeout(function(){
                head_parts[rand_head].click();
                setTimeout(function(){
                    body_parts[rand_body].click();
                    setTimeout(function(){
                        leg_parts[rand_leg].click();
                        setTimeout(function(){
                            tail_parts[rand_tail].click();
                        },50);
                    },50)
                },50);
            },50);

        }, i*i*35);
    }
}


// 透過Ajax從PHP抓到資料庫的部件資料
function getpartlist(){
    
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

    //送出資料是null，代表直接執行，沒有要傳資料過去
    xhr.send( null );
}

// 拿到jason資料後建立HTML架構
function buildlist (jsonobj){

    // 把jsonobj裡面各物件抓出來
    let head_arr = jsonobj.head;
    let body_arr = jsonobj.body;
    let leg_arr = jsonobj.leg;
    let tail_arr = jsonobj.tail;
    let bg_arr = jsonobj.bg;
    // console.log(body_arr);

    // 把HTML等等要放東西進去的容器抓出來
    let head_ul = document.querySelector('.part_button.head_button .part_wrap');
    let body_ul = document.querySelector('.part_button.body_button .part_wrap');
    let leg_ul = document.querySelector('.part_button.leg_button .part_wrap');
    let tail_ul = document.querySelector('.part_button.tail_button .part_wrap');
    let bg_ul = document.querySelector('.part_button.bg_button .part_wrap');    
    // console.log(body_ul);


    // 建立尾巴HTML架構
    for (let i=0; i<tail_arr.length; i++){

        let page_num = i % 4;
        let page = Math.floor(i/4);

        if (page_num == 0){
            let wrapper = document.getElementsByClassName('tail_list')[0];
            let div = document.createElement('div');
            let li = document.createElement('li');
            let img = document.createElement('img');
            let p = document.createElement('p');
            
            div.classList = 'swiper-slide' + ' slide_' + page;
            img.src = tail_arr[i].tail_img;
            img.classList = 'picon tail_parts';
            img.alt = '資料庫圖片遺失';
            p.innerHTML = tail_arr[i].tail_ch_name;
    
            li.appendChild(img);
            li.appendChild(p);
            div.appendChild(li);
            wrapper.appendChild(div);
        }else {
            let slide_tar = '.tail_button .slide_' + page;
            let slide = document.querySelector(slide_tar);
            let li = document.createElement('li');
            let img = document.createElement('img');
            let p = document.createElement('p');
            img.src = tail_arr[i].tail_img;
            img.classList = 'picon tail_parts';
            img.alt = '資料庫圖片遺失';
            p.innerHTML = tail_arr[i].tail_ch_name;
    
            li.appendChild(img);
            li.appendChild(p);
            slide.appendChild(li);
        }
    }


    //建立頭部HTML架構 
    for (let i=0; i<head_arr.length; i++){

        let page_num = i % 4;
        let page = Math.floor(i/4);

        if (page_num == 0){
            let wrapper = document.getElementsByClassName('head_list')[0];
            let div = document.createElement('div');
            let li = document.createElement('li');
            let img = document.createElement('img');
            let input = document.createElement('input');
            let p = document.createElement('p');
    
            div.classList = 'swiper-slide' + ' slide_' + page;
            img.src = head_arr[i].head_img;
            img.classList = 'picon head_parts';
            img.alt = '資料庫圖片遺失';
            input.dataset.pointa = head_arr[i].head_environment1;
            input.dataset.pointb = head_arr[i].head_environment2;
            input.dataset.pointc = head_arr[i].head_environment3;
            input.style.display = 'none';
            p.innerHTML = head_arr[i].head_ch_name;
    
            li.appendChild(img);
            li.appendChild(input);
            li.appendChild(p);
            div.appendChild(li);
            wrapper.appendChild(div);
        }else {
            let slide_tar = '.head_button .slide_' + page;
            let slide = document.querySelector(slide_tar);
            let li = document.createElement('li');
            let img = document.createElement('img');
            let input = document.createElement('input');
            let p = document.createElement('p');
    
            img.src = head_arr[i].head_img;
            img.classList = 'picon head_parts';
            img.alt = '資料庫圖片遺失';
            input.dataset.pointa = head_arr[i].head_environment1;
            input.dataset.pointb = head_arr[i].head_environment2;
            input.dataset.pointc = head_arr[i].head_environment3;
            input.style.display = 'none';
            p.innerHTML = head_arr[i].head_ch_name;
    
            li.appendChild(img);
            li.appendChild(input);
            li.appendChild(p);
            slide.appendChild(li);
        }
    }

    //建立身體HTML架構 
    for (let i=0; i<body_arr.length; i++){

        let page_num = i % 4;
        let page = Math.floor(i/4);

        if (page_num == 0){
            let wrapper = document.getElementsByClassName('body_list')[0];
            let div = document.createElement('div');
            let li = document.createElement('li');
            let img = document.createElement('img');
            let input = document.createElement('input');
            let p = document.createElement('p');
    
            div.classList = 'swiper-slide' + ' slide_' + page;
            img.src = body_arr[i].body_img;
            img.classList = 'picon body_parts';
            img.alt = '資料庫圖片遺失';
            input.dataset.pointa = body_arr[i].body_environment1;
            input.dataset.pointb = body_arr[i].body_environment2;
            input.dataset.pointc = body_arr[i].body_environment3;
            input.dataset.health = body_arr[i].body_health;
            input.style.display = 'none';
            p.innerHTML = body_arr[i].body_ch_name;
    
            li.appendChild(img);
            li.appendChild(input);
            li.appendChild(p);
            div.appendChild(li);
            wrapper.appendChild(div);
        }else {
            let slide_tar = '.body_button .slide_' + page;
            let slide = document.querySelector(slide_tar);
            let li = document.createElement('li');
            let img = document.createElement('img');
            let input = document.createElement('input');
            let p = document.createElement('p');
    
            img.src = body_arr[i].body_img;
            img.classList = 'picon body_parts';
            img.alt = '資料庫圖片遺失';
            input.dataset.pointa = body_arr[i].body_environment1;
            input.dataset.pointb = body_arr[i].body_environment2;
            input.dataset.pointc = body_arr[i].body_environment3;
            input.dataset.health = body_arr[i].body_health;
            input.style.display = 'none';
            p.innerHTML = body_arr[i].body_ch_name;
    
            li.appendChild(img);
            li.appendChild(input);
            li.appendChild(p);
            slide.appendChild(li);
        }
    }

    //建立腳部HTML架構 
    for (let i=0; i<leg_arr.length; i++){

        let page_num = i % 4;
        let page = Math.floor(i/4);

        if (page_num == 0){
            let wrapper = document.getElementsByClassName('leg_list')[0];
            let div = document.createElement('div');
            let li = document.createElement('li');
            let img = document.createElement('img');
            let input = document.createElement('input');
            let p = document.createElement('p');
    
            div.classList = 'swiper-slide' + ' slide_' + page;
            img.src = leg_arr[i].leg_img;
            img.classList = 'picon leg_parts';
            img.alt = '資料庫圖片遺失';
            input.dataset.pointa = leg_arr[i].leg_environment1;
            input.dataset.pointb = leg_arr[i].leg_environment2;
            input.dataset.pointc = leg_arr[i].leg_environment3;
            input.dataset.jump = leg_arr[i].leg_jump;
            input.style.display = 'none';
            p.innerHTML = leg_arr[i].leg_ch_name;
    
            li.appendChild(img);
            li.appendChild(input);
            li.appendChild(p);
            div.appendChild(li);
            wrapper.appendChild(div);
        }else {
            let slide_tar = '.leg_button .slide_' + page;
            let slide = document.querySelector(slide_tar);
            let li = document.createElement('li');
            let img = document.createElement('img');
            let input = document.createElement('input');
            let p = document.createElement('p');
    
            img.src = leg_arr[i].leg_img;
            img.classList = 'picon leg_parts';
            img.alt = '資料庫圖片遺失';
            input.dataset.pointa = leg_arr[i].leg_environment1;
            input.dataset.pointb = leg_arr[i].leg_environment2;
            input.dataset.pointc = leg_arr[i].leg_environment3;
            input.dataset.jump = leg_arr[i].leg_jump;
            input.style.display = 'none';
            p.innerHTML = leg_arr[i].leg_ch_name;
    
            li.appendChild(img);
            li.appendChild(input);
            li.appendChild(p);
            slide.appendChild(li);
        }
    }

    // 建立背景圖HTML架構
    for (let i=0; i<bg_arr.length; i++){
        let li = document.createElement('li');
        let div = document.createElement('div');
        let img = document.createElement('img');
        let p = document.createElement('p');
        div.classList = 'img_box';
        img.src = bg_arr[i].bg_img;
        img.classList = 'picon';
        img.alt = '資料庫圖片遺失';
        p.innerHTML = bg_arr[i].bg_ch_name;

        div.appendChild(img);
        li.appendChild(div);
        li.appendChild(p);
        bg_ul.appendChild(li);
    }

    
    //建立聲音HTML架構 
    let voice_box = document.getElementById('voice_box');
    for (let i=0; i<head_arr.length; i++){
        let audio_tag = document.createElement('audio');
        let source_tag = document.createElement('source');

        audio_tag.id = "voice_" + head_arr[i].head_name;
        source_tag.src = head_arr[i].head_howl;
        source_tag.type = "audio/mpeg";

        audio_tag.appendChild(source_tag);
        voice_box.appendChild(audio_tag);

        voice_arr[head_arr[i].head_name] = head_arr[i].head_howl;
    }


    // 抓到選單的圖片，全部建立click聆聽功能
    picon = document.getElementsByClassName('picon');
    for(let i=0; i<picon.length; i++){
        picon[i].addEventListener('click',changeParts);
    };

    // 使用swiper:建立頭部的slider與設定
    // 因為我的階層很多層，所以貓頭鷹套件的話效率速度會慢很多，
    // 再加上貓頭鷹要吃jQuery，且設定相容性較差，故不使用，
    // 而另一套slick，則因為要吃舊版的jQuery，無法相容現在jQuery3，也不能使用
    // 故選擇了swiper，他是使用javascript語法，相容性與效率快上很多
    let mySwiper1 = new Swiper ('.swiper1', {
        loop: false,
        pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            disabledClass: 	'swiper-button-disabled'
        },
    })
    // 使用swiper:建立身體的slider與設定
    // 同一個頁面上要有複數個slider，則要建立相對應的套件物件，且container的class名稱要分開
    let mySwiper2 = new Swiper ('.swiper2', {
        loop: false,
        pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
    // 使用swiper:建立腳部的slider與設定
    let mySwiper3 = new Swiper ('.swiper3', {
        loop: false,
        pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
    // 使用swiper:建立尾巴的slider與設定
    let mySwiper4 = new Swiper ('.swiper4', {
        loop: false,
        pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    })
};

// 畫筆的瀏覽/編輯模式設定
function switch_bgcanvas(onoff){
    
    let title = document.querySelector(".aml_off .title");
    let stitle = document.querySelector(".pen_box .stitle");
    let pic = document.getElementsByClassName('temp_aml_pic')[0];
    let pen_icon = document.getElementsByClassName('pen_icon')[0];
    
    // 按鈕點下去後，再判斷現在的check如果是否為true
    // 是true代表啟動編輯模式，flase代表預覽模式，畫筆不會啟動
    // 畫筆預設為false
    if (draw_switch.checked == true){
        title.innerHTML = "編輯模式";
        bgcanvas_switch = 1;
        stitle.innerHTML = "手動畫圖 ON";
        pic.classList.add("hide");
        bg_canvas.classList.add("ON");
        pen_icon.src = "img/modify/pen_edit.png";
    }else{
        title.innerHTML = "瀏覽模式";
        bgcanvas_switch = 0;
        stitle.innerHTML = "手動畫圖 OFF";
        pic.style.display = "";
        pic.classList.remove("hide");
        bg_canvas.classList.remove("ON");
        pen_icon.src = "img/modify/pen_cancel.png";
    }

    // 如果呼叫這個function且有送ON或OFF值進來
    // ON代表切換為編輯模式，OFF代表切換為瀏覽模式
    if (onoff == "ON"){
        title.innerHTML = "編輯模式";
        bgcanvas_switch = 1;
        stitle.innerHTML = "手動畫圖 ON";
        pic.classList.add("hide");
        bg_canvas.classList.add("ON");
        pen_icon.src = "img/modify/pen_edit.png";
        draw_switch.checked = true;
    }else if (onoff == "OFF"){
        title.innerHTML = "瀏覽模式";
        bgcanvas_switch = 0;
        stitle.innerHTML = "手動畫圖 OFF";
        pic.style.display = "";
        pic.classList.remove("hide");
        bg_canvas.classList.remove("ON");
        pen_icon.src = "img/modify/pen_cancel.png";
        draw_switch.checked = false;
    }
}

function mouseDown(e){
    if (bgcanvas_switch == 1){
        this.draw=true;
        bgcontext.strokeStyle=`#${hex}`;
        bgcontext.lineWidth=drawsize;
        bgcontext.lineCap='round';
    
        var o=this;
        this.offsetX=this.offsetLeft;
        this.offsetY=this.offsetTop;
    
        while(o.offsetParent){
            o=o.offsetParent;
            this.offsetX+=o.offsetLeft;
            this.offsetY+=o.offsetTop;
        }
    
        bgcontext.beginPath();
        bgcontext.moveTo(e.pageX-this.offsetX,e.pageY-this.offsetY);
    }
}

// 滑鼠移動，線跟著畫到座標位置
function mouseMove(e){
    if (this.draw){
        bgcontext.lineTo(e.pageX-this.offsetX,e.pageY-this.offsetY);
        bgcontext.stroke();
    }
}
// 滑鼠左鍵放開時，關閉畫圖功能
function mouseUp(e){
    this.draw=false;
}
// 手機touch按下去時
function touchStart(e){
    if(bgcanvas_switch == 1){
        this.draw=true;
        bgcontext=this.getContext("2d");
        this.touch=e.targetTouches[0];
        bgcontext.strokeStyle=`#${hex}`;
        bgcontext.lineWidth=drawsize;
        bgcontext.lineCap='round';
    
        var o=this;
        this.offsetX=this.offsetLeft;
        this.offsetY=this.offsetTop;
    
        while(o.offsetParent){
            o=o.offsetParent;
            this.offsetX+=o.offsetLeft;
            this.offsetY+=o.offsetTop;
        }
        bgcontext.beginPath();
        bgcontext.moveTo(this.touch.pageX-this.offsetX,this.touch.pageY-this.offsetY);
        e.preventDefault();
    
    }
}
// 手機touch滑動
function touchMove(e){
    this.touch=e.targetTouches[0];
    if (this.draw){
        bgcontext.lineTo(this.touch.pageX-this.offsetX,this.touch.pageY-this.offsetY);
        bgcontext.stroke();
    }
    e.preventDefault();
}
// 手機touch放開
function touchEnd(e){
    this.draw=false;
    e.preventDefault();
}
function cleardraw(){
    bgcontext.clearRect(0,0,bg_canvas.width,bg_canvas.height);
}


// 色相角度轉成RGB的公式計算，會return一個rgb值或取hex來使用
function HSV2RGB(in_h,in_s,in_v){

    let h = in_h;
    let s = in_s;
    let v = in_v;

    if( in_v == undefined ){
        h = this.value;
        s = 75;
        v = 100;
    } 

    h = parseFloat(h);
    s = parseFloat(s);
    v = parseFloat(v);
    if( h<0 ) h=0;
    if( s<0 ) s=0;
    if( v<0 ) v=0;
    if( h>=360 ) h=359;
    if( s>100 ) s=100;
    if( v>100 ) v=100;
    s/=100.0;
    v/=100.0;
    C = v*s;
    hh = h/60.0;
    X = C*(1.0-Math.abs((hh%2)-1.0));
    r = g = b = 0;
    if( hh>=0 && hh<1 )
    {
        r = C;
        g = X;
    }
    else if( hh>=1 && hh<2 )
    {
        r = X;
        g = C;
    }
    else if( hh>=2 && hh<3 )
    {
        g = C;
        b = X;
    }
    else if( hh>=3 && hh<4 )
    {
        g = X;
        b = C;
    }
    else if( hh>=4 && hh<5 )
    {
        r = X;
        b = C;
    }
    else
    {
        r = C;
        b = X;
    }
    m = v-C;
    r += m;
    g += m;
    b += m;
    r *= 255.0;
    g *= 255.0;
    b *= 255.0;
    r = Math.round(r);
    g = Math.round(g);
    b = Math.round(b);
    hex = r*65536+g*256+b;
    hex = hex.toString(16,6);
    len = hex.length;
    if( len<6 )
        for(i=0; i<6-len; i++)
            hex = '0'+hex;

    // console.log(hex);
    // document.calcform.hex.value = hex.toUpperCase();
    // document.calcform.r.value = r;
    // document.calcform.g.value = g;
    // document.calcform.b.value = b;
    // document.calcform.color.style.backgroundColor='#'+hex;

    sample_point.style.backgroundColor = `#${hex}`;
}

// 點了黑色塊，設定畫筆顏色為黑色
function pen_black(){
    HSV2RGB(0,0,0);
}
// 點了白色塊，設定畫筆顏色為白色
function pen_white(){
    HSV2RGB(0,0,100);
}
// 設定畫筆大小
function pensize(e){
    // console.log(this.value);
    sample_point.style.width = this.value*2 + "px";
    sample_point.style.height = this.value*2 + "px";
    drawsize = this.value;
}

// 開啟登入視窗
function openlogin(){
    document.getElementById('login_gary').style.display = 'block';
}

// 選到的部件選單頁籤改變顏色
function change_partli(e){
    let part_button = document.getElementsByClassName('part_button');
    for (let i=0; i<=3; i++){
        part_button[i].classList.remove('now_page');
    }
    e.target.parentNode.classList.add('now_page')
}
// 選到的背景選單頁籤改變顏色
function change_bgli(e){
    let part_button = document.getElementsByClassName('part_button');
    for (let i=4; i<=5; i++){
        part_button[i].classList.remove('now_page');
    }
    e.target.parentNode.classList.add('now_page')
}


function $id(id){
    return document.getElementById(id);
}


function init(){

    // 呼叫透過Ajax從PHP抓到資料庫的部件資料
    getpartlist();

    // 剛載進頁面時，先做一次canvas繪製預設的圖片
    drawcanvas();

    // 上傳圖片的file事件
    document.getElementById('up_bg_file').addEventListener('change',read_bgimg);

    // 背景canvas畫圖的觸發事件
    bg_canvas.addEventListener('mousedown',mouseDown);
    bg_canvas.addEventListener('touchstart',touchStart);
    bg_canvas.addEventListener('mousemove',mouseMove);
    bg_canvas.addEventListener('touchmove',touchMove);
    bg_canvas.addEventListener('mouseup',mouseUp);
    bg_canvas.addEventListener('touchend',touchEnd);
    document.getElementsByClassName('icon_eraser')[0].addEventListener('click',cleardraw);

    // 顏色條的change觸發事件，把變動的色相轉成RGB值
    document.getElementsByClassName('createColorBar')[0].addEventListener('change',HSV2RGB);
    document.getElementsByClassName('pen_black')[0].addEventListener('click',pen_black);
    document.getElementsByClassName('pen_white')[0].addEventListener('click',pen_white);

    // 畫筆大小調整條的事件觸發
    document.getElementById('drawsize').addEventListener('change',pensize);

    // 手畫畫圖canvas的開關事件觸發
    document.getElementById('cir_check').addEventListener('click',switch_bgcanvas);

    // 下一步按鈕的事件觸發
    document.getElementById('next_btn').addEventListener('click',nextstep);

    // 動物部件換頁標籤的變色
    $id('btn_head').addEventListener('change',change_partli)
    $id('btn_body').addEventListener('change',change_partli)
    $id('btn_leg').addEventListener('change',change_partli)
    $id('btn_parts').addEventListener('change',change_partli)
    $id('bglist').addEventListener('change',change_bgli)
    $id('mdbg').addEventListener('change',change_bgli)

}

window.addEventListener("load",init,false);

