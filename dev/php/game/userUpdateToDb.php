<?php
$errMsg = "";

try {
    require_once("../connectg3.php");
	$sql ="update user set game_money= game_money + :game_money, game_record = :game_record, game_date= :game_date where user_no=:user_no";
    $userData = $pdo->prepare($sql);
    $userData->bindValue(":game_money", $_REQUEST["game_money"]);
    $userData->bindValue(":game_record", $_REQUEST["game_record"]);
    $userData->bindValue(":game_date",  $_REQUEST["game_date"]);
    $userData->bindValue(":user_no", $_REQUEST["user_no"]);
    $userData->execute();
    echo "為什麼字出不來";
 
}catch(PDOExeption $e){
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
 
}
?>