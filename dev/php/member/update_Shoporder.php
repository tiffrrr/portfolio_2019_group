<?php
$errMsg="";
session_start();
try {
  require_once('../connectg3.php');

  $orders=$pdo->prepare("select * from `product_order` WHERE `product_order`.`user_no` = :user_no AND `product_order`.`order_no` = :order_no");
  $orders->bindValue(':user_no',$_SESSION['user_no']);
  $orders->bindValue(':order_no',$_POST['order_no']);
  $orders->execute();
  $ordersRow = $orders->fetchObject(); 

  if($ordersRow->shipping_status=="2"){
    echo"已取消過";

  }elseif($ordersRow->shipping_status=="1"){
    echo"已出貨，無法取消";
    
  }else{

    $orderItems=$pdo->prepare("UPDATE `product_order` SET `shipping_status` = '2' WHERE `product_order`.`user_no` = :user_no AND `product_order`.`order_no` = :order_no ");
    $orderItems->bindValue(':user_no',$_SESSION['user_no']);
    $orderItems->bindValue(':order_no',$_POST['order_no']);
    $orderItems->execute();
    echo"異動成功";
  }
  
} catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    echo $errMsg;
}

?>