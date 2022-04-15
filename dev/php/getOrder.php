<?php

try{
    require_once('connectg3.php');

$sql='select * from product_order where user_no = :user_no';
$order=$pdo->prepare($sql);
$order->bindValue(':user_no',$_POST['user_no']);
$order->execute();
if($order->rowCount() == 0){
    echo 'noOrder';
}else{
    $orderRow=$order->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($orderRow);
};


}catch(PDOException $e){
    // echo $e->getMessage();
    echo "sysError";

}
?>