<?php
session_start();
try{
require_once('../connectg3.php');
if(isset($_POST['data'])){   //新增一筆資料到資料庫
    $data=json_decode($_POST['data']);
        //{"id":"aaa","psw":"09871","name":"aaa","ans":"qqq","hint_no":"1"}
    // print_r($data);

    $sql="INSERT INTO `user` (`user_no`, `user_id`, `user_psw`, `user_name`, `hint_answer`,  `hint_no`, `user_status`,`my_animal_img`,`my_animal_bg_img`,`my_animalbg_img`) VALUES (null,:id,:psw,:name,:ans,:hint_no,1,'img/member/user0_aml.png','img/member/user0_bg.png','img/member/user0_amlbg.png')";

    
    $user=$pdo->prepare($sql);
    
    foreach ($data as $i => $n) {
        $user->bindValue(":{$i}",$n);
    }
    $user->execute();
    

    $user_no = $pdo->lastInsertId();

    $_SESSION['user_no']=$user_no;
   

    $login=$pdo->query("select * from user where user_no = $user_no");
    $loginRow=$login->fetch(PDO::FETCH_ASSOC);
    
    echo json_encode($loginRow);   //回傳新註冊的那列會員資料（登入用）


}else if(isset($_GET['id'])){   //比對id是否重複
    $findId=$pdo->prepare("select * from user where user_id=:user_id");
    $findId->bindValue(":user_id",$_GET['id']);
    $findId->execute();
    if($findId->rowCount()==0){
        echo "1";
    }else{
        echo "0";
    }
}else{   //抓提示語，顯示到頁面
    $qsn=$pdo->query("select * from prompts");
    $qsnRow=$qsn->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($qsnRow);
}



}catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>

