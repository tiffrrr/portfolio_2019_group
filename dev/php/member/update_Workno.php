<?php
$errMsg="";
try {
    session_start();
    require_once('../connectg3.php');
  $workItems=$pdo->prepare("UPDATE `favorite` SET `favorite_status` = '0' WHERE `favorite`.`user_no` = :user_no AND `favorite`.`work_no` = :work_no;");
  $workItems->bindValue(':user_no',$_SESSION['user_no']);
  $workItems->bindValue(':work_no',$_POST['work_no']);
  $workItems->execute();
  echo"異動成功";

} catch (PDOException $e) {

    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    echo $errMsg;
}

?>