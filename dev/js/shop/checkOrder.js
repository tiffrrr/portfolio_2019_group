window.addEventListener("load",function(){
    var form_vue = new Vue({
        data: {
            name: '',
    
            phone: '',
            phoneError: false,
    
            addr:'',
    
            card1: '',
            card2: '',
            card3: '',
            card4: '',
            cardError: false,
    
            code: '',
            codeError: false,
    
            month: '',
            monthError: false,
    
            year: '',
            yearError: false,
    
        },
        computed: {
            phoneErrMsg() {
                let isText =  /^[0][9][0-9]{8}$/;
                if (!isText.test(this.phone) && this.phone.length > 0) {
                    this.phoneError = true;
                    return '請輸入09開頭的10位數字';
                }
                else {
                    this.phoneError = false;
                }
            },
            cardErrMsg() {
                let isText = /^\d{4}$/;
                if (!isText.test(this.card1) && this.card1.length > 0) {
                    this.cardError = true;
                    return '請輸入4位數字';
                } else if (!isText.test(this.card2) && this.card2.length > 0) {
                    this.cardError = true;
                    return '請輸入4位數字';
                } else if (!isText.test(this.card3) && this.card3.length > 0) {
                    this.cardError = true;
                    return '請輸入4位數字';
                } else if (!isText.test(this.card4) && this.card4.length > 0) {
                    this.cardError = true;
                    return '請輸入4位數字';
                }
                else {
                    this.cardError = false;
    
                }
            },
            codeErrMsg() {
                let isText = /^\d{3}$/;
                if (!isText.test(this.code) && this.code.length > 0) {
                    this.codeError = true;
                    return '請輸入3位數字';
                }
                else {
                    this.codeError = false;
                }
            },
            dateErrMsg() {
                let monthText = /[\D]/;
                let yearText = /^[2][0][0-9]{2}/;
                if (((this.month<1 || this.month*1>12) || monthText.test(this.month))  && this.month.length > 0) {
                    this.monthError = true;
                    return '請輸入：1-12';
                    // return this.month;
                } else if (!yearText.test(this.year) && this.year.length > 0) {
                    this.yearError = true;
                    return '請輸入:20XX';
                }
                else {
                    this.monthError = false;
                    this.yearError = false;
                }
            },
        },
        components:{
            'name':{props:['inname'], template:'<p>姓名：{{inname}}</p>' },
            'phone':{props:['inphone'], template:'<p>行動電話：{{inphone}}</p>' },
            'addr':{props:['inaddr'], template:'<p>地址：{{inaddr}}</p>' },
        },
        methods:{
            confirm(e){
                e.preventDefault();
                let a=0;
                for(i in this.$data){
                    if (this.$data[i] === "" || this.$data[i] === true){
                        a++;
                    }
                }
                if(a != 0){
                    alert("請輸入完整正確資訊。");
                }else{
                    // console.log("done")
                    document.querySelector(".checkOrder .order_confirm").style.display = "block";   //購物車頁的送出
                }
            },
            submit(e){
                e.preventDefault();
            
                var data={
                    "credit":this.card1+"-"+this.card2+"-"+this.card3+"-"+this.card4,
                    "name":this.name,
                    "phone":this.phone,
                    "addr":this.addr,
                    "total":document.querySelector(".total_money").innerText
                }
    
                data=JSON.stringify(data);
                // {"credit":"1111-1111-1111-1111","name":"aaa","phone":"0987654321","addr":"aaa","total":"2560"}
    
                let money=document.getElementById("enter_discount").value;
    
                $.post('php/cart/prod_order.php',{data:data,money:money},(order_no)=>{
                    //清session storage
                    let shopListArr=sessionStorage['shopList'].split(",");
                    shopListArr.pop();
                
                    shopListArr.forEach(n=>{
                        delete sessionStorage[n];
                    })
                    delete sessionStorage['shopList']
    
                    document.querySelector(".checkOrder .order_confirm").style.display = "none";
                    document.querySelector(".order_info").style.display = "block";
                    document.querySelector(".order_no").innerText=`訂單編號：${order_no}`;
                });
    
    
            }
        }
    });
    form_vue.$mount("#app");
    
})












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
   
    let cart_total=0;
    let subTotals=document.getElementsByClassName("subTotal");
    for (let i = 0; i < subTotals.length; i++) {
        cart_total += Number(subTotals[i].innerText.replace("$",""));
    }
    document.querySelector(".total").children[0].innerText=`商品金額：$${cart_total}`;

    let discount=Number(document.getElementById("enter_discount").value);
    document.getElementsByClassName("total_money")[0].innerText = cart_total+60-discount;
}








window.addEventListener("load", function () {
     //顯示明細
    let list_row=$('.list_row').clone();
    let shopListArr=sessionStorage['shopList'].split(",");
    shopListArr.pop();
    //  console.log(shopListArr)
    shopListArr.forEach((n,i) => {
        list_row.find(".shop_animal_bg").prop("src",$.parseJSON(sessionStorage[n]).img);
        list_row.find(".prod_plain").prop("src",$.parseJSON(sessionStorage[n]).prodInfo[2]);
        list_row.find(".price").html(`<span class="title_inline">商品單價：</span>$${$.parseJSON(sessionStorage[n]).prodInfo[3]}`);
        list_row.find(".number").text($.parseJSON(sessionStorage[n]).num);
        list_row.find(".price").text($.parseJSON(sessionStorage[n]).prodInfo[3]);
        list_row.find(".subTotal").text($.parseJSON(sessionStorage[n]).num * $.parseJSON(sessionStorage[n]).prodInfo[3]);
        list_row.clone().insertBefore(".discount");
    });

        $(".list_row:eq(0)").remove();
    

      //total
    total();

    //購物車頁的送出訂單
    let confirm = document.querySelector(".cart_btn .confirm");

    //確認資料視窗的確認送出
    let submitButton = document.querySelector(".order_confirm .submit");
    //確認資料視窗的重新填寫
    let writeAgain = document.querySelector(".order_confirm .writeAgain");
    //整個確認資料視窗
    let confirmWindow = document.querySelector(".checkOrder .order_confirm");

    //訂單成立視窗的關閉
    let closeButton = document.querySelector(".order_info .close");


    writeAgain.onclick = function () {   //重新填寫btn
        confirmWindow.style.display = "none";
    };



    closeButton.onclick = function () {   //訂單成立視窗的關閉
        document.querySelector(".order_info").style.display = "none";
        window.location.href="shop.php";
    }

    //輸入折扣金幣
    //輸入金幣的input
    let discountInput = document.getElementById("enter_discount");

    //顯示金幣
    if (sessionStorage['game_money'].length > 1) {
        document.querySelector(".discount_info p span").innerText =sessionStorage['game_money'];
    }

    
    discountInput.max = Number(sessionStorage['game_money']);

    discountInput.onchange = function () {
        if (Number(discountInput.value) > Number(sessionStorage['game_money'])) {
            discountInput.value = '';
            alert("您目前持有金幣不足");
        }
        total()
        //重顯示剩餘金幣
        document.querySelector(".discount_info p span").innerText = Number(sessionStorage['game_money'])-Number(discountInput.value);
        document.getElementById("show_discount").innerText=discountInput.value
    }


})

