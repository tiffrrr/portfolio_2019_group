<?php
try{
  require_once("connectg3.php");
  $sql = "update product_order SET shipping_status=:shipping_status, payment_status=:payment_status WHERE order_no=:order_no";
  $product_order = $pdo->prepare($sql);
  $product_order->bindValue(":shipping_status", $_REQUEST["shipping_status"]);
  $product_order->bindValue(":payment_status", $_REQUEST["payment_status"]);
  $product_order->bindValue(":order_no", $_REQUEST["order_no"]);
  $product_order->execute(); 

  
    echo "修改成功";
    header('Location:productOrder.php');
  	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>