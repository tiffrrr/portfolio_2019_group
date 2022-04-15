<?php
$errMsg="";
session_start();
try {
  require_once('../connectg3.php');


  //找預約日期<目前日期
  $revstime=$pdo->prepare("select * from `resv_order` WHERE `resv_order`.`tour_date` < CURRENT_DATE AND `resv_order`.`booking_no` = :booking_no;");
  $revstime->bindValue(':booking_no',$_POST['booking_no']);
  $revstime->execute();

  if(! $revstime->rowCount()==0){
    echo"日期已過，無法取消";
    exit();
  }

  $revs=$pdo->prepare("select * from `resv_order` WHERE `resv_order`.`member_id` = :member_id AND `resv_order`.`booking_no` = :booking_no;");
  $revs->bindValue(':member_id',$_SESSION['user_no']);
  $revs->bindValue(':booking_no',$_POST['booking_no']);
  $revs->execute();
  $revsRow = $revs->fetchObject();


  if($revsRow->resv_status=="2"){
    echo"已取消過";

  }elseif($revsRow->resv_status=="1"){
    echo"已到場過，無法取消";
    
  }else{
    $resvItems=$pdo->prepare("UPDATE `resv_order` SET `resv_status` = '2' WHERE `resv_order`.`member_id` = :member_id AND `resv_order`.`booking_no` = :booking_no;");
    $resvItems->bindValue(':member_id',$_SESSION['user_no']);
    $resvItems->bindValue(':booking_no',$_POST['booking_no']);
    $resvItems->execute();
    echo"異動成功";
  }
  
} catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    echo $errMsg;
}

?>