let forgetPsw=new Vue({
    el:"#forgetPsw_gary",
    data:{
        title:"重設密碼",
        id:"sara",
        idMsg:"",
        qsn:"",
        ans:"蘋果",
        ansMsg:"",
        btn:"下一步",
        result:"",
        psw:"",
        pswCheck:"",
        done:"",
    },
    methods:{
        getQsn(){
            if(this.btn == "下一步"){
                if(forgetPsw.id != ""){
                    $.get('php/login/forgetPsw.php',{data:forgetPsw.id},function(hint){
                        if(hint== "none"){
                            forgetPsw.idMsg="找不到該帳號。請輸入正確帳號。";
                        }else{
                            forgetPsw.title="請輸入正確答案"
                            forgetPsw.qsn= "密碼提示問題："+hint;
                            forgetPsw.btn='送出';
                        }
                    })
                }else{
                    forgetPsw.idMsg="請輸入帳號"
                    alert("請輸入帳號");
                }
            }else if(this.btn == "送出"){
                if(forgetPsw.ans != ""){
                    $.get('php/login/forgetPsw.php',{ans:forgetPsw.ans,id:forgetPsw.id},function(result){
                        if(result == "ok"){
                            forgetPsw.result=result;
                            forgetPsw.btn='重設密碼';
                            forgetPsw.title="答案正確，請重設密碼"
                        }else{
                            alert("答案錯誤。請重新輸入或聯繫客服人員。");
                            forgetPsw.ans="";
                        }
                    })
                }else{
                    forgetPsw.ansMsg="請輸入答案";
                    alert("請輸入答案");
                }
            }else if(this.btn == "重設密碼"){
                if(this.pswMsg =="密碼符合"){
                    $.get('php/login/forgetPsw.php',{psw:forgetPsw.psw,id:forgetPsw.id},function(done){
                        forgetPsw.title="";
                        forgetPsw.done=done;
                    })
                }else {
                    alert("密碼不符，請重新輸入");
                }
            }
            
        }
    },
    computed:{
        pswMsg(){
            if(this.pswCheck.length>0 && this.pswCheck != this.psw){
                return "密碼不符";
            }else if(this.pswCheck.length>0 && this.pswCheck == this.psw){
                return "密碼符合";
            }
        }
    },
})