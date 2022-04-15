<?php
try{
require_once('../connectg3.php');
$data= json_decode($_GET['data']);
$sql='insert into resv_order values ( null,';
foreach ($data as $key => $value) {
    $sql=$sql."'{$value}' ,";
}
$sql=$sql."'0')";
// $sql=str_replace(",)",")",$sql);
$pdo->exec($sql);
echo $pdo->lastInsertId();


}catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>