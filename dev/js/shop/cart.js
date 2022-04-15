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

function  total(){    //總金額
    if( sessionStorage['shopList'] && sessionStorage['shopList'] !=''){
        var cart_total=0;
        var subTotals=document.getElementsByClassName("subTotal_num");
        for (i = 0; i < subTotals.length; i++) {
            cart_total += Number(subTotals[i].innerText.replace("$",""));
        }
        document.getElementsByClassName("total")[0].children[0].innerText=cart_total;
        document.getElementsByClassName("total_money")[0].innerText = cart_total+60;
    }
}





function changeNum(input){   //改變數量
    let num = Number(input.value);
    let id=input.parentNode.parentNode.parentNode.parentNode.id;
        // console.log(id+","+num)
        input.parentNode.parentNode.nextElementSibling.innerHTML='';  //小計清空

        //改session
        $.get('php/cart/cart_session.php',{num:id+","+num});

        //改sessionStorage
        let str=JSON.parse(sessionStorage[id]);
        str.num=num;
        sessionStorage[id]=JSON.stringify(str);

        //改subtotal
        let price=JSON.parse(sessionStorage[id]).prodInfo[3];       

        let subTotal=price*num
        // console.log(price,num,subTotal);
        input.parentNode.parentNode.nextElementSibling.innerHTML=
            `<span class="title_inline">商品小計：</span>
            $<span class="subTotal_num">${subTotal}</span> `

         //改total
         total();
}





function deleteItem(){   //刪除
    
    //清空session
    let id=this.parentNode.parentNode.id;
    // console.log(id);
    $.get('php/cart/cart_session.php',{delete:id});

    //清空sessionStorage
       //shoplist  +   自己的那一列
    sessionStorage['shopList']=sessionStorage['shopList'].replace( id+"," , "" );
    sessionStorage.removeItem(id);
    if(sessionStorage['shopList'].search(",")== -1){
        sessionStorage.removeItem('shopList');
    }

    //刪掉自己那塊html
    this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);

    //改total
    total();

    //改購物車icon
    if(sessionStorage['shopList']){
        document.getElementById("cart_num").innerText=sessionStorage['shopList'].split(',').length-1;
    }else{
        document.getElementById("cart_num").style.display='none';
    }

    //刪到沒東西時，顯示 “您尚未購買”
    if( !sessionStorage['shopList']){
        let wrap=document.querySelector(".cart_list .wrap");
        let checkoutBtn=document.querySelector(".cart_btn .btn_cloudp");
       
        //把total那塊刪掉
        wrap.removeChild(document.querySelector(".total"))
        //顯示您尚未選擇商品
        let div=document.createElement("div");
        div.className='list_row';
        wrap.appendChild(div);
        div.innerHTML=`<p class='empty'>您尚未選擇商品</p>`;
        //把結帳btn拿掉
        document.querySelector(".cart_btn").removeChild(checkoutBtn)
    }
}






window.addEventListener("load", function () {
    let minusNumButtons = document.querySelectorAll('.minus_num');  //減少數量
    let addNumButtons = document.querySelectorAll('.add_num');     //加數量
    let prodNumInputs = document.querySelectorAll('.prod_num'); //商品Input的數量
    let deleteButton = document.querySelectorAll('.delete');  //刪除
    let checkoutBtn=document.querySelector(".cart_btn .btn_cloudp");//結帳btn
   


    for (i = 0; i < minusNumButtons.length; i++) {   //減num
        minusNumButtons[i].onclick = function () {
            this.nextElementSibling.value == 1 ? this.nextElementSibling.value = 1 : this.nextElementSibling.value--;
            changeNum(this.nextElementSibling);
        }
    }

    for (i = 0; i < addNumButtons.length; i++) {   //加num
        addNumButtons[i].onclick = function () {
            this.previousElementSibling.value++;
            changeNum(this.previousElementSibling);
        }
    }
    //數量變動
    for (i = 0; i < prodNumInputs.length; i++) { 
        prodNumInputs[i].onchange =function(){
            changeNum(this);
        } 
    }

    //刪除
    for (i = 0; i < deleteButton.length; i++) {
        deleteButton[i].onclick = deleteItem;
    }

    //算total
    total();

    //結帳
    if(checkoutBtn){
        checkoutBtn.onclick=function(e){
        if(!sessionStorage['user_no']){
            document.getElementById('login_gary').style.display='block';
            e.preventDefault();
        }
    }
    }

})


