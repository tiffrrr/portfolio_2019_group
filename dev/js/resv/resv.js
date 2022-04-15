//alert
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

function sendOrder(){   //送出資料
    let tour_date=$('#show_data_title').text().substr(0,10);
    let booking_date=tour_date.replace(tour_date.substr(8),my_day);
    let number_of_booking=$('#peoplenum_select').val();
    let member_no=sessionStorage.user_no;
    let session_no=$("#time_select option:selected").text().substr(1,1);

    let orderData={
        booking_date,
        tour_date,
        number_of_booking,
        order_status:0,
        member_no,
        session_no,
    }
    orderData=JSON.stringify(orderData);
    console.log(orderData);
    $.get('php/resv/createOrder.php', { data: orderData },function(orderNo){
        alert("您的訂單編號為： "+orderNo,'預約成功');
        $(".msg_clear").click(function (){
            location.reload();
        });
        

    })
}


function checkCode(){
    var codeNum =$('#code').val().toUpperCase();
    if (codeNum == code) {
        sendOrder();  //將預約訂單送回資料庫
    } else {
        alert("驗證碼輸入錯誤");
        createcode();
        $('#code').val('');
    }
}




function submitCheck(e) {
    e.preventDefault();
    //驗證登入
    //驗證三input是否為空
    //驗證碼輸入正確
    if (sessionStorage.user_id) {  //有登入
        if($('#time_select').val()==''){    
            alert('請選擇日期與場次')
        }else if($('#peoplenum_select').val()==''){
            alert('請選擇人數')
        }else if($('#code').val()==''){
            alert('請輸入驗證碼')
        }else{    //有輸入驗證碼
            checkCode()  //呼叫函式驗證驗證碼是否正確
        }

    }else{
         $('#login_gary').css('display','block');   //未登入，開啟登入燈箱
        
    }
}



 $(document).ready(function(){
     $('#submit').click(submitCheck);

 });