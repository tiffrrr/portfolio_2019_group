<?php
session_start();
// null,user_no,credit_no,order_date,sum,shippingstatus,paymentstatus,receivername,receiverphone,addr
// insert into product_order values(null,1,12345678,curdate(),500,1,1,'sara','0987654321','中央大學1號');



try{
    
$data=json_decode($_POST['data']);
// // {"credit":"1111-1111-1111-1111","name":"aaa","phone":"0987654321","addr":"aaa","total":"2560"}

require_once('../connectg3.php');
$sql='insert into product_order values ( null,:user_no,:credit,curdate(),:total,0,1,:name,:phone,:addr)';
$order=$pdo->prepare($sql);
$order->bindValue(":user_no",$_SESSION['user_no']);
foreach ($data as $i => $n) {
    $order->bindValue(":{$i}",$n);
}
$order->execute();

$order_no = $pdo->lastInsertId();
echo $order_no;
//-----------------------------insert into order item table
// insert into order_item values(null,1,1,2,1000,'img/home/animal3.png');
//null order_no prod_no num subtotal img   
foreach ($_SESSION['cart'] as $i => $n) {  //n=物件
    $sql='insert into order_item values ( null,:order_no,:prod_no,:num,:subtotal,:img)';
    $item=$pdo->prepare($sql);
    $item->bindValue(":order_no",$order_no);
    $item->bindValue(":prod_no", $n->prodInfo[0]);
    $item->bindValue(":num", $n->num);
    $item->bindValue(":subtotal", (int)$n->num * (int)$n->prodInfo[3]);
    $item->bindValue(":img", $n->img);
    $item->execute();
}

//-------減少game_money
$money=$pdo->prepare('UPDATE `user` SET `game_money` = `game_money` - :game_money WHERE `user`.`user_no` = :user_no; ');
$money->bindValue(":game_money",(int)$_POST['money']);
$money->bindValue(":user_no",$_SESSION['user_no']);
$money->execute();


//--清session
unset($_SESSION['cart']);



}catch(PDOException $e){
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>