<?php
$errMsg = '';

try {
    require_once('../connectg3.php');
    
    // 實心 >>>>> 表示要取消收藏

    // 走updata_status 為 0 
  $unloveItems=$pdo->prepare("UPDATE `favorite` SET `favorite_status` = '0' WHERE `favorite`.`user_no` = :user_no AND `favorite`.`work_no` = :work_no;");  
  $unloveItems->bindValue(':user_no',$_REQUEST['user_no']);
  $unloveItems->bindValue(':work_no',$_REQUEST['work_no']);
  $unloveItems->execute();
  echo"狀態改為0";

} catch (PDOException $e) {

    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    echo $errMsg;
}

?>