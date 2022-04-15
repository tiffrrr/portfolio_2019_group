var form = new Vue({
    data: {
        id:"",
        idError:false,
        idMsg:"",

        psw: '',

        pswConfirm:'',
        pswError:false,

        qsn:"",
        qsns:[],
        // [ { "hint_no": "1", "hint_question": "你喜歡的水果為何？" }, { "hint_no": "2", "hint_question": "你是什麼星座" }, { "hint_no": "3", "hint_question": "你多高" } ]
        hint:'',


    },
    computed: {
        
        pswConfirmErrMsg() {
            if (this.pswConfirm != this.psw &&  this.pswConfirm.length>0) {
                this.pswError = true;
                return '與密碼不符';
            } 
            else {
                this.pswError = false;

            }
        },
    },
    mounted(){
        fetch('php/login/register.php').then(qsns => qsns.json()).then(qsns => {this.qsns = qsns;});
    },
    methods:{
        idErrMsg(){  //判斷帳號是否存在
            $.get('php/login/register.php',{id:form.id},function(same){
                if(Number(same) ==1){
                    form.idMsg= "帳號通過";
                    form.idError = false;
                    // console.log(form.idMsg,form.idError)
                }else {
                    form.idError = true;
                    form.idMsg= "帳號已存在，請重新輸入";
                    // console.log(form.idMsg,form.idError)
                }
            })
        },
        submit(e){
        //驗證資料是否都合法
            let err=0;
            for(i in this.$data){
                if (this.$data[i] === "" || this.$data[i] === true){
                    err++;
                }
            }
            if(err !=0){
                alert("請輸入完整的正確資料")
                
            }else{
                let data={
                    "id":this.id,
                    "psw":this.psw,
                    "name":this.id,
                    "ans":this.hint,
                    "hint_no":this.qsn.charAt(0),
                }
                data=JSON.stringify(data);
            // console.log(JSON.stringify(data));
            //{"id":"aaa","psw":"09871","name":"aaa","ans":"qqq","hint_no":"1"}
            //送出
                let xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (xhr.status == 200) {//登入成功
                        //寫入session storage
                        let userData = JSON.parse(xhr.responseText);
                        for (i in userData) {
                            sessionStorage.setItem(i, userData[i]);
                        }
                        sessionStorage.setItem('user_psw', "it's a secret~");
                        $id("show_user_name").innerText = "您好，" + userData.user_name;
                        $id("login_text").innerText = "登出";
                        $id("login_gary").style.display = "none";
                        //讓會員中心可以進入
                        document.getElementsByClassName('member_icon')[0].onclick = null;
                        cancelForm('registered_gary');
                        
                    } else {
                        alert(xhr.statusText);
                    }
                }
                xhr.open("post", "php/login/register.php", true);
                xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
                xhr.send(`data=${data}`);
                alert("註冊成功");
            }
        }
    }
});
form.$mount("#registered_gary");