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





function choosePic(){
if(sessionStorage.my_animalbg_img){  //如果登入了  撈session
    document.querySelectorAll(".choose_pic .shop_animal_bg")[0].src=sessionStorage.my_animalbg_img;
   
}else{   //如果沒登入，給預設圖片
document.querySelectorAll(".choose_pic .shop_animal_bg")[0].src='img/member/user0_amlbg.png';
}
};






function changePic(e){    //點了會換圖
let p=document.querySelectorAll('.choose_pic_wrap p');
for(let i=0;i<p.length;i++){
    p[i].className="";
}
this.children[1].classList.add("check");
let bg=this.children[0].children[0].src;

document.querySelectorAll('.choose_product .prod_img').forEach((element,i) => {
    element.children[1].children[0].src=bg;
    // element.children[1].children[1].src=animal;
});
};








window.addEventListener("load",function(){
let detailButtons=document.querySelectorAll('.view_detail');  //查看詳情
let addCartButtons=document.querySelectorAll('.add_cart');//加入購物車
let prodDetail=document.querySelector('.prod_detail');//視窗
let backButton=document.querySelector('.back_button');//視窗裡的叉叉
let bgButtons=document.getElementsByName("bgpic");//切換背景圖
let minusNumButtons=document.querySelectorAll('.minus_num');  //減少數量
let addNumButtons=document.querySelectorAll('.add_num');     //加數量
let prodNumInputs=document.querySelectorAll('.prod_num'); //商品Input的數量
let changePicBtn=document.querySelectorAll('.choose_pic_wrap .item')  //動物圖片
let prodImg=document.querySelectorAll('.prod_img')  //商品圖片



for(i=0;i<minusNumButtons.length;i++){   //減num
    minusNumButtons[i].onclick=function(){
        this.nextElementSibling.value==1?this.nextElementSibling.value=1:this.nextElementSibling.value--;
        
    }
}

for(i=0;i<addNumButtons.length;i++){   //加num
    addNumButtons[i].onclick=function(){
        this.previousElementSibling.value++;
    }
}

bgButtons[0].onclick=function(){   //要背景圖
    for(i=0;i<document.querySelectorAll(".shop_animal_bg").length;i++){
        let src=document.querySelectorAll(".shop_animal_bg")[i].src;
        if(src.search("customize") != -1||src.search("member") != -1){//是客製的或預設的
            src=src.replace("aml","amlbg"),
            document.querySelectorAll(".shop_animal_bg")[i].src=src;
        
        }else{   
            src=src.replace("_","_amlbg_"),
            document.querySelectorAll(".shop_animal_bg")[i].src=src;
        } 
    }
}

bgButtons[1].onclick=function(){   //不要背景圖
    for(i=0;i<document.querySelectorAll(".shop_animal_bg").length;i++){
        let src=document.querySelectorAll(".shop_animal_bg")[i].src;
        if(src.search("customize") != -1 ||src.search("member") != -1){//是客製的或預設的
            src=src.replace("bg",""),
            document.querySelectorAll(".shop_animal_bg")[i].src=src;
        }else{  
            src=src.replace("amlbg_",""),
            document.querySelectorAll(".shop_animal_bg")[i].src=src;
        }

    };
}
backButton.onclick=function(){   //關閉視窗
    prodDetail.style.display='none';
};

for(i=0;i<detailButtons.length;i++){   //點btn查看詳情
    detailButtons[i].onclick=function(){
        console.log(this.parentNode.parentNode.children[2].children[1].children[0])
        prodDetail.style.display='block';
        document.querySelector('.prod_detail .prod_plain').src=this.parentNode.parentNode.children[2].children[0].src;
        document.querySelector('.prod_detail .shop_animal_bg').src=this.parentNode.parentNode.children[2].children[1].children[0].src;
        document.getElementById('detail_pic_chosen').className=this.parentNode.parentNode.children[2].children[1].className;
        document.querySelector('.prod_detail .prod_text p').innerText=this.nextElementSibling.nextElementSibling.nextElementSibling.value;        
    }
}




for(i=0;i<addCartButtons.length;i++){  //加入購物車
    addCartButtons[i].onclick=function(){
        let prodName=JSON.parse(this.nextElementSibling.value)[0]    //cup/hat/pillow...
        let data={};
        data.prodInfo=JSON.parse(this.nextElementSibling.value);  //name +商品本人圖片+單價
        data.num=this.parentNode.previousElementSibling.children[1].value   //數量
        data.img=this.parentNode.parentNode.children[2].children[1].children[0].src  

        let imgName=data.img.substring(data.img.lastIndexOf("/")+1,data.img.lastIndexOf("."));   //圖片檔名
        let sessionName=prodName+"|"+imgName;  //cup|work_amlbg_5

        data.name=sessionName;
        // console.log(sessionName)
        data=JSON.stringify(data);
        // console.log(data);
        // {"prodInfo":["1","馬克杯","img/shop/cup.png","500"],"num":"1","Img":"http://localhost/G3/img/collections/work_amlbg_5.png","name":"cup|work_amlbg_5"}
        
        $.get('php/cart/cart_session.php',{data:data});
        if(sessionStorage['shopList'] == null){
            sessionStorage['shopList'] =""; 
        }
        if(sessionStorage[sessionName]){   //買過了  num+1
            let dataNew;
            dataNew=JSON.parse(sessionStorage[sessionName]);
            dataNew.num=Number(dataNew.num)+1;
            dataNew=JSON.stringify(dataNew);
            sessionStorage.setItem(sessionName,dataNew);  
            alert("此商品已在購物車！");
        }else{    //沒買過這個商品
            sessionStorage['shopList']+=sessionName+",";
            sessionStorage.setItem(sessionName,data);
            alert("成功加入購物車！");

        }
        

        document.getElementById("cart_num").style.display='block';
        document.getElementById("cart_num").innerText=sessionStorage['shopList'].split(',').length-1;
        
    }
}

for(i=0;i<changePicBtn.length;i++){   //點按圖片會換 
    changePicBtn[i].onclick=changePic;          
    // console.log(changePicBtn[i]) 
}

choosePic();   //loading進那四張動物圖片

}); 

