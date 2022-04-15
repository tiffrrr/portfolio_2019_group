//alert
function alert(text,title){
    if(!title==""){
        $(" body").append('<div class="hmsg_alert" id="hmsg"><div class="hmsg_alert_container"><div class="hmsg_title" id="hmsg_top"><span>'+title+'</span></div><div class="hmsg_cont" id="hmsg_cont">'+text+'</div><div class="hmsg_alert_close hmsg_clear"><a href="javascript:;" class="btn_cloud">關閉<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span></a></div></div></div>');
        $(".hmsg_clear").click(function (){
            $("#hmsg").remove();
        });
    }else{
        $(" body").append('<div class="hmsg_alert" id="hmsg"><div class="hmsg_alert_container"><div class="hmsg_title" id="hmsg_top"><span>提示</span></div><div class="hmsg_cont" id="hmsg_cont">'+text+'</div><div class="hmsg_alert_close hmsg_clear"><a href="javascript:;" class="btn_cloud">關閉<span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span><span class="btn_cloudeffect"></span></a></div></div></div>');
        $(".hmsg_clear").click(function (){
            $("#hmsg").remove();
        });
    }
}