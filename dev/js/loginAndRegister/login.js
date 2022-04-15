function $id(id) {
    return document.getElementById(id);
};
var userData;

//進網頁or刷新時，聯結php，去sessionStorage撈資料，判斷使用者是否已登入
function getLoginInfo() {
    fetch("php/login/loginInfo.php").then(loginInfo=>loginInfo.text()).then(loginInfo=>{
        if (loginInfo != "not login"){   //已登入
            $id("show_user_name").innerText = "您好，" + sessionStorage.user_name;
            $id("login_text").innerText = "登出";
        }else{
            $id("login_text").innerText = "登入/註冊";    //尚未登入
            document.getElementsByClassName('member_icon')[0].onclick = function () {
                alert("請登入會員");
                return false;
            }
        }
    })
    // if (sessionStorage.user_id) {  
    //     $id("show_user_name").innerText = "您好，" + sessionStorage.user_name;
    //     $id("login_text").innerText = "登出";
    // } else {
    //     $id("login_text").innerText = "登入/註冊";    //尚未登入
    //     document.getElementsByClassName('member_icon')[0].onclick = function () {
    //         alert("請登入會員");
    //         return false;
    //     }
    // }
}


//跳出登入視窗功能 + 登出功能  
function showLoginForm() {
    if ($id('login_text').innerText == '登入/註冊') {  //按下去，跳出視窗
        //註冊或忘記密碼打開的時候，login不能開
        if($id('forgetPsw_gary').style.display == 'block' || $id('registered_gary').style.display == 'block'){
            $id('login_gary').style.display = 'none'
        
        }else{
            $id('login_gary').style.display = 'block'

        }
        
    } else if ($id('login_text').innerText == '登出') {   //按下去，要登出
        fetch("php/login/login.php").then(user=>user.json()).then(userData=>{
            // console.log(userData)
            for (i in userData[0]) {
                sessionStorage.removeItem(i);
            }
    })

        //clear session
        logOut();
        

        $id('login_text').innerHTML = "登入/註冊";
        $id("show_user_name").innerHTML = "&nbsp;";
        $id("user_id").value = "";
        $id("user_psw").value = "";
        //如果是在會員中心頁面登出，要跳回首頁
        if (window.location.href.indexOf("member.php") !=-1 || window.location.href.indexOf("checkOrder.html")!=-1) {
            window.location.href = "home.html"
        }
        // }else if(window.location.href == "http://localhost/G3/checkOrder.html"){
        //     window.location.href = "http://localhost/G3/cart.php"
        // }
        //未登入，無法進入會員中心
        document.getElementsByClassName('member_icon')[0].onclick = function () {
            alert("請登入會員");
            return false;
        }
    }
    return false;
}
//清session
function logOut(){
    var xhr = new XMLHttpRequest();
    xhr.open("Get", "php/login/logout.php",true);
    xhr.send( null );
}

//登入功能
function sendForm() {
    let user_id = $id('user_id').value;
    let user_psw = $id('user_psw').value;
    //如果沒打字，不給登入
    if (user_id == '' || user_psw == '') {
        alert('帳號及密碼不可為空');
        //如果都打字了，才去判斷
    } else {
        let xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (xhr.status == 200) {
                if (xhr.responseText.indexOf("sysError") != -1) {
                    alert("系統異常,請通知系統維護人員");
                } else if (xhr.responseText.indexOf("loginError") != -1) {
                    alert("帳密錯誤");
                } else { //登入成功
                    //寫入session storage
                    let userData = JSON.parse(xhr.responseText)[0];
                    for (i in userData) {
                        sessionStorage.setItem(i, userData[i]);
                    }
                    sessionStorage.setItem('user_psw', "it's a secret~");
                    $id("show_user_name").innerText = "您好，" + userData.user_name;
                    $id("login_text").innerText = "登出";
                    $id("login_gary").style.display = "none";
                    //讓會員中心可以進入
                    document.getElementsByClassName('member_icon')[0].onclick = null;
                }
            } else {
                alert(xhr.statusText);
            }
        }
        xhr.open("post", "php/login/login.php", true);
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(`user_id=${user_id}&user_psw=${user_psw}`);
    }
}

//關閉視窗  清input+
function cancelForm(window) {
    // alert()
    clearInput('login_gary');
    clearInput('registered_gary');
    clearInput('forgetPsw_gary');
    $id(window).style.display = 'none';

}

// //清空input
function clearInput(window){
    let input=document.querySelectorAll(`#${window} input`)
    input.forEach((n,i)=>{
        n.value="";
    })
}



window.addEventListener('load', function () {
    //---------檢查使用者是否已登入, 並取回登入資訊
    getLoginInfo();

    // 登入/註冊 按鍵   /跳出登入視窗功能 + 登出功能 

        $id("login_text").onclick = showLoginForm;

   
    
    // 送出登入資料
    $id("login_btn").addEventListener("click",sendForm);
    
    
   
    //打開註冊視窗
    $id("registered").onclick =  function(e){  
        e.preventDefault();
        $id('login_gary').style.display = 'none';
        $id('registered_gary').style.display = 'block';   
    }
     //打開忘記密碼視窗
     $id("forgetPsw").onclick=function(e){  
         e.preventDefault();
        $id('login_gary').style.display = 'none';
        $id('forgetPsw_gary').style.display = 'block';   
        forgetPsw.title="重設密碼";
        forgetPsw.id="";
        forgetPsw.idMsg="";
        forgetPsw.qsn="";
        forgetPsw.ans="";
        forgetPsw.ansMsg="";
        forgetPsw.btn="下一步";
        forgetPsw.result="";
        forgetPsw.psw="";
        forgetPsw.pswCheck="";
        forgetPsw.done="";
    }
    //返回登入btn 打開登入視窗
    document.querySelectorAll(".backLogin").forEach(n=>{
        n.onclick=function(e){   
            e.preventDefault();
            $id('registered_gary').style.display = 'none';
            $id('login_gary').style.display = 'block';
            $id('forgetPsw_gary').style.display = 'none';
        }
    })
    
    //叉叉關閉登入視窗
    $id("login_del").onclick = ()=>cancelForm("login_gary");
    //叉叉關閉註冊視窗
    $id("registered_del").onclick = ()=>cancelForm("registered_gary");  
    //叉叉關閉忘記密碼視窗
    $id("forgetPsw_del").onclick = ()=>cancelForm("forgetPsw_gary");  
    
})