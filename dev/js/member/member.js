
// window.addEventListener('load',function(){
// let user_no = sessionStorage.user_no;
// console.log(user_no)
// let xhr = new XMLHttpRequest();
// xhr.open("post", "../../G3/member.php", true);
// xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
// xhr.send(`user_no=${user_no}`);

// })




//alert訊息<<<<請從這邊複製>>>>
function alert(text,title){

  if(!title==""){

  $(" body").append('<div class="msg_alert" id="msg"><div class="msg_alert_container"><div class="msg_title" id="msg_top"><span>'+title+'</span></div><div class="btn_close msg_clear"><span>×</span></div><div class="msg_cont" id="msg_cont">'+text+'</div><div class="msg_alert_close msg_clear"><a href="javascript:;" class="btn_cloud">關閉<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span></a></div></div></div>');
  $(".msg_clear").click(function (){
  $("#msg").remove();
      });
}else{

  $(" body").append('<div class="msg_alert" id="msg"><div class="msg_alert_container"><div class="msg_title" id="msg_top"><span>提示</span></div><div class="btn_close msg_clear"><span>×</span></div><div class="msg_cont" id="msg_cont">'+text+'</div><div class="msg_alert_close msg_clear"><a href="javascript:;" class="btn_cloud">關閉<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span></a></div></div></div>');
  $(".msg_clear").click(function (){
  $("#msg").remove();
   });
}
}

//範例 // alert('<p>已收到訂單取消請求，<br>待客服人員確認中...</p>','提示');
//alert訊息<<<<請複製到這>>>>




function alertcancel(){
var order_cancel = document.getElementsByClassName('order_cancel');
var rev_cancel = document.getElementsByClassName('rev_cancel');

// for(let y=0; y<order_cancel.length; y++){
//   order_cancel[y].addEventListener('click',function(e){
//   alert('<p>已收到訂單取消請求，<br>待客服人員確認中...</p>','提示');
//   // e.preventDefault();
//   });
// };

// for(let z=0; z<rev_cancel.length; z++){
//   rev_cancel[z].addEventListener('click',function(e){
//   alert('提示','<p>已收到預約取消請求，<br>待客服人員確認中...</p>','提示');
//   });
// };

}

window.addEventListener('load',alertcancel,false);

//<!------ ↑alert訊息↑ ----->


// <!------ ↓tab open page↓ ----->

function open_page(e, className) {
  var i, tabcontents, tablinks;
  tabcontents = document.getElementsByClassName("tabcontent");

  for (i = 0; i < tabcontents.length; i++) {
    tabcontents[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("tablink_color");
  }

  document.getElementById(className).style.display = "block";
  e.currentTarget.classList.add("tablink_color");
  //  console.log(e.target);
}


let tablinks = document.getElementsByClassName("tablink");

tablinks[0].addEventListener('click', function () { open_page(event, 'member_basic') });
tablinks[1].addEventListener('click', function () { open_page(event, 'member_order') });
tablinks[2].addEventListener('click', function () { open_page(event, 'member_receive') });
tablinks[3].addEventListener('click', function () { open_page(event, 'member_love') });


window.addEventListener('load',
  function () {
    document.getElementById("default_open").click();
    document.getElementById("default_open").classList.add("tablink_color");
  }
);

// <!------ ↑tab open page↑ ----->


// <!------ ↓上傳大頭貼↓ ----->

function fileChange(){

  let readFile = new FileReader();
  let file = document.getElementById('upFile').files[0];
  readFile.readAsDataURL(file);
  readFile.addEventListener('load',function(){
    let upfilePic = document.getElementById('upfile_pic');
    upfilePic.src= this.result;
  })

}

window.addEventListener('load',function(){
  document.getElementById('upFile').onchange = fileChange;
})

// <!------ ↑上傳大頭貼↑ ----->

//<!------ ↓修改/儲存會員基本資料↓ ----->

//按了修改按鈕要開啟儲存 並且讓input可以修改
function updateBasic(){
  document.getElementById('btn_edit').style.display='none';
  document.getElementById('updated_it').style.margin='auto';
  document.getElementById('updated_it').style.display='block';
  // document.getElementById('upFile').disabled=false; //讓選擇檔案可以按
  document.getElementById('upFile').style.display='block'; 
  document.getElementById('upFile').style.margin='auto';
  
  let redonlyOpen = document.querySelectorAll("input[readonly='readonly']");
  for (let i = 0; i < redonlyOpen.length; i++) {
    redonlyOpen[i].readOnly = false;//打開可以修改的功能
  }


}

//按了儲存按鈕要開啟修改 並且讓input關閉修改
function stockpileBasic(){
  document.getElementById('btn_edit').style.display='block';
  document.getElementById('btn_edit').style.margin='auto';
  document.getElementById('updated_it').style.display='none';

  let redonlyOpen = document.querySelectorAll("input[readonly='readonly']");

  for (let i = 0; i < redonlyOpen.length; i++) {
    redonlyOpen[i].readOnly = true;//關閉可以修改的功能
  }

  // if(document.getElementsByClassName('user_name')==""){
  //   alert("請填寫姓名");
  // }

}

window.addEventListener('load',
  function(){
    document.getElementById('btn_edit').onclick = updateBasic;
    document.getElementById('updated_it').onclick = stockpileBasic;
    // document.getElementById('upFile').disabled=true; //讓選擇檔案不能按
    document.getElementById('upFile').style.display='none'; 
  }
);

// <!------ ↑修改/儲存會員基本資料↑ ----->

// //
// function rr(){
//   console.log("請填寫姓名");
//   if(document.getElemenstByName('user_name')==""){
//     alert("請填寫姓名");
//     console.log("請填寫姓名");
//   }

// }

// window.addEventListener('load',
//   function(){
//     document.getElementById('updated_it').onclick = rr;
//   }
// );


//

// <!------ ↓訂單明細收合↓----->
var orderbtns=document.getElementsByClassName('js_order_show');
var orderDetails = document.getElementsByClassName('myorder_item_detail');
  
function showDetail(e){
  var itemDetails=e.target.parentNode.parentNode.parentNode.nextElementSibling;
  // console.log(itemDetails.classList);

    if(itemDetails.style.display=='block'){
      itemDetails.style.display = 'none';
    e.target.innerHTML=`訂單詳細<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span>`;
    itemDetails.classList.remove('show_detail');
    }else{
      itemDetails.style.display = 'block';
    e.target.innerHTML=`收合<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span>`;
    itemDetails.classList.add('show_detail');
  }

}

function initOrder(){
    for (var i=0 ;i<orderbtns.length ; i++){
        orderDetails[i].style.display = 'none';
      orderbtns[i].addEventListener('click',showDetail);
    }
}
window.addEventListener('load',initOrder,false);
// <!------ ↑訂單明細收合↑ ----->



// <!------ ↓取消訂單提示訊息↓ ----->

var order_cancelbtns= document.getElementsByClassName('order_cancel');//取消訂單

var order_alertwrap =document.getElementsByClassName('order_alertwrap');//alertwrap

var order_clearbtns=document.getElementsByClassName('order_btn_close');//叉叉

function show_order_cancel_alert(e){
  e.target.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.style.display="block";
}

function close_order_cancel_alert(e){
  e.target.parentNode.parentNode.style.display ='none';
}

function initcancelOdrer(){

  for(var i=0;i<order_cancelbtns.length;i++){
    //按了取消訂單要有動作
    order_cancelbtns[i].addEventListener('click',show_order_cancel_alert);
    //先將wrap都隱藏
    order_alertwrap[i].style.display = 'none';
    //點了X要關閉
    order_clearbtns[i].addEventListener('click',close_order_cancel_alert);
  }

  $(".order_alert_close").on('click',function (){
    $(".order_alertwrap").hide();
     });
  
}
window.addEventListener('load',initcancelOdrer,false);
// <!------ ↑取消訂單提示訊息↑ ----->



// <!------ ↓取消訂單要改資料庫資料↓ ----->


function setorder(){
  var order_true = document.getElementsByClassName('order_true');
  var shop_status = document.getElementsByClassName('shop_status');

  for(let i=0;i<order_true.length;i++){
    order_true[i].addEventListener('click',function(e){

      $(".order_alertwrap").hide();

      var xhr = new XMLHttpRequest();

      xhr.onload = function(){ 
        if(xhr.status==200){
          console.log(xhr.responseText);
          if(xhr.responseText.indexOf("已取消過")!=-1){
            alert("您已取消過!");
      
          }else if(xhr.responseText.indexOf("已出貨，無法取消")!=-1){
            alert("已出貨，無法取消!");

          }else{
            alert('已取消!');
            document.getElementsByClassName('shop_status')[i].innerText="已取消";
          }

        }else{
          alert(xhr.status);
        }
    
      }
      // e.preventDefault();

    //設定好所要連結的程式
      var url = "php/member/update_Shoporder.php";
      xhr.open("Post", url, true); 
      xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

    //送出資料
      var data_info = "order_no=" + parseInt(this.id.replace('order_cancel_',''));
      xhr.send(data_info);

    });
  }

}
window.addEventListener('load',setorder,false);
// <!------ ↑取消訂單要改資料庫資料↑ ----->


// <!------ ↓預約qrcode收合↓ ----->

var qrshowbtns= document.getElementsByClassName('js_qr_show');
var qrcodeWraps=document.getElementsByClassName('qrcode_wrap');
var qrclosebtns= document.getElementsByClassName('btn_close');

function closeQrcode(e){
  e.target.parentNode.parentNode.style.display="none";
}

function showQrcode(e){
  e.target.parentNode.parentNode.parentNode.nextElementSibling.style.display="block";
}

function initQrcode(){
//點了按鈕 要秀出qrcode / 並且先將wrap都先隱藏

  for(var i=0;i<qrshowbtns.length;i++){
    //按鈕按了要有動作
    qrshowbtns[i].addEventListener('click',showQrcode);
    //先將wrap都隱藏
    qrcodeWraps[i].style.display = 'none';
    //點了X要關閉
    qrclosebtns[i].addEventListener('click',closeQrcode);
  }

}
window.addEventListener('load',initQrcode,false);

// <!------ ↑預約qrcode收合↑ ----->

// <!------ ↓取消預約提示訊息↓ ----->

var rev_cancelbtns= document.getElementsByClassName('rev_cancel');//取消預約

var rev_alertwrap =document.getElementsByClassName('rev_alertwrap');//alertwrap

var rev_clearbtns=document.getElementsByClassName('rev_btn_close');//叉叉


function show_rev_cancel_alert(e){
  e.target.parentNode.parentNode.parentNode.nextElementSibling.nextElementSibling.style.display="block";
}

function close_rev_cancel_alert(e){
  e.target.parentNode.parentNode.style.display ='none';
}



function initcancelRev(){

  for(var i=0;i<rev_cancelbtns.length;i++){
    //按鈕按了要有動作
    rev_cancelbtns[i].addEventListener('click',show_rev_cancel_alert);
    //先將wrap都隱藏
    rev_alertwrap[i].style.display = 'none';
    //點了X要關閉
    rev_clearbtns[i].addEventListener('click',close_rev_cancel_alert);
  }

  $(".rev_alert_close").on('click',function (){
    $(".rev_alertwrap").hide();
     });
}

window.addEventListener('load',initcancelRev,false);
// <!------ ↑取消預約提示訊息↑ ----->


// <!------ ↓取消預約要改資料庫資料↓ ----->

function setrev(){
  var rev_true = document.getElementsByClassName('rev_true');

  for(let i=0;i<rev_true.length;i++){
    rev_true[i].addEventListener('click',function(){

      $(".rev_alertwrap").hide();

      var xhr = new XMLHttpRequest();

      xhr.onload = function(){ 
        if(xhr.status==200){
          console.log(xhr.responseText);
          if(xhr.responseText.indexOf("日期已過，無法取消")!=-1){
            alert("日期已過，無法取消!");
          }else if(xhr.responseText.indexOf("已取消過")!=-1){
            alert("您已取消過!");
      
          }else if(xhr.responseText.indexOf("已到場過，無法取消")!=-1){
            alert("已到場過，無法取消!");

          }else{
            alert("已取消!");
            document.getElementsByClassName('resv_status')[i].innerText="已取消";
          }

        }else{
          alert(xhr.status);
        }
    
      }
      // e.preventDefault();

    //設定好所要連結的程式
      var url = "php/member/update_Revorder.php";
      xhr.open("Post", url, true); 
      xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

    //送出資料
      var data_info = "booking_no=" + parseInt(this.id.replace('rev_cancel_',''));
      console.log(parseInt(this.id.replace('rev_cancel_','')));//1.2......
      xhr.send(data_info);

    });
  }

}
window.addEventListener('load',setrev,false);
// <!------ ↑取消預約要改資料庫資料↑ ----->



// function getOrder(){
//   let user_no=sessionStorage.user_no;
//   // console.log(user_no);
//   let xhr = new XMLHttpRequest();

//   xhr.onload = function () {
//     if (xhr.status == 200) {
//         if (xhr.responseText.indexOf("noOrder") != -1) {
//             alert("沒有訂單");
//       } else { //有訂單
//           let userData=JSON.parse(xhr.responseText)[0];
//           console.log(userData);
//           document.getElementById('orderNo').innerText=userData.order_no;
          
//       }

//     } else {
//         alert(xhr.statusText);
//     }
// }


//   xhr.open("post", "php/getOrder.php", true);
//   xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
//   xhr.send(`user_no=${user_no}`);


// }
// window.addEventListener('load',getOrder);



// <!------ ↓更新我的動物的狀態↓ ----->

    // 更新生命力
function updatehealth(){
  let total_health = sessionStorage.animal_life;

    let health_box = document.querySelector(".life_ability .pic");
    // console.log(health_box);
    health_box.innerHTML = '';
    for (let i=1; i<=total_health; i++){
        let hart = document.createElement('img');
        hart.src = 'img/modify/icon_life.png';
        health_box.appendChild(hart);
    }
}

window.addEventListener('load',updatehealth);

      // 更新跳躍力
function updatejump(){
  let total_jump = sessionStorage['animal_jump'];

  let jump = document.getElementsByClassName('bar_add')[0];
  let jump_value = document.getElementsByClassName('meter')[0];

  if (total_jump == 'null'){
    jump_value.innerText = 'm';
  }else{
    jump.style.width = `${total_jump*2}0%`;
    // console.log(total_jump);
    jump_value.innerText = total_jump + 'm';
  }
}

window.addEventListener('load',updatejump);

      // 更新環境適應力
function updatechart(){
  let total_eml_forest = sessionStorage.environ_adapt_1;
  let total_eml_mountain = sessionStorage.environ_adapt_2;
  let total_eml_desert = sessionStorage.environ_adapt_3;

  myRadarChart.data.datasets[0].data = [total_eml_forest,total_eml_mountain,total_eml_desert];
  myRadarChart.update();
}

window.addEventListener('load',updatechart);

// <!------ ↑更新我的動物的狀態↑ ----->



// <!------ ↓取消收藏要消失div以及改資料庫資料↓ ----->

function setLove(){

  var xhr = new XMLHttpRequest();
  var close_love = document.getElementsByClassName('close_love');
  var my_love = document.getElementsByClassName('my_love')[0];

  for(let i=0;i<close_love.length;i++){
    close_love[i].addEventListener('click',function(e){
      e.preventDefault();

      xhr.onload = function(){ 
        if(xhr.status==200){

          //如果資料庫修改成功 在remove掉div
          my_love.removeChild(e.target.parentNode.parentNode);
          // console.log(e.target.parentNode.parentNode);
          // console.log(xhr.responseText);

        }else{
          alert(xhr.status);
        }

      }
    console.log(111);


    //設定好所要連結的程式
      var url = "php/member/update_Workno.php";
      xhr.open("Post", url, true); 
      xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");

    //送出資料
      var data_info = `work_no=${this.id.replace('work_close_','')}`;
      // console.log(parseInt(this.id.replace('work_close_','')));//1.2......
      xhr.send(data_info);
      // console.log('datainfo:'+data_info);

    });
  }
}
window.addEventListener('load',setLove,false);
// <!------ ↑取消收藏要消失div以及改資料庫資料↑ ----->