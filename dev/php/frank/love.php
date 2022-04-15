<?php
$errMsg = '';


try {
	require_once('../connectg3.php');
 // 空心 >>>>> 表示要加入收藏


    // 假如 會員帳號沒有這個work_no 

    $workItems=$pdo->prepare("select * from  `favorite` where  `user_no` = :user_no AND `work_no` = :work_no");  
    $workItems->bindValue(':user_no',$_REQUEST['user_no']);
    $workItems->bindValue(':work_no',$_REQUEST['work_no']);
    $workItems->execute();
    echo"已經有資料";

    if($workItems->rowCount()==0){

    // 就要into
    $loveItems=$pdo->prepare("INSERT INTO `favorite` (`user_no`, `work_no`, `favorite_status` ,`favorite_date`) VALUES (:user_no, :work_no, '1' , NOW())");  
    $loveItems->bindValue(':user_no',$_REQUEST['user_no']);
    $loveItems->bindValue(':work_no',$_REQUEST['work_no']);
    $loveItems->execute();
    echo"<br>異動成功";

    }else{

    // 假如 會員帳號有這個work_no 就要走update {update為1}}

    $onloveItems=$pdo->prepare("UPDATE `favorite` SET `favorite_status` = '1' , `favorite_date` = NOW() WHERE `favorite`.`user_no` = :user_no AND `favorite`.`work_no` = :work_no;");  

    $onloveItems->bindValue(':user_no',$_REQUEST['user_no']);
    $onloveItems->bindValue(':work_no',$_REQUEST['work_no']);
    $onloveItems->execute();

    }

} catch (PDOException $e) {

    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    echo $errMsg;
}

?>