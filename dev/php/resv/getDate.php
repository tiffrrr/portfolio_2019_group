<?php
try{
require_once('../connectg3.php');
$date=$pdo->query('select date_unavailable from unavailable_date');
$dateAry=[];
while($dateRow=$date->fetch(PDO::FETCH_NUM)){
$dateAry[] = $dateRow[0];
};
echo json_encode($dateAry);
// print_r ($dateAry);



}catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>