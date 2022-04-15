<?php
$errMsg = "";
//$user_no=13;
$user_no=$_GET["user"];
try {
    require_once("../connectg3.php");
    session_start();

    $sql_message_ctn = 

  "select work_no FROM favorite where user_no={$user_no} and favorite_status ='1' ;";

    $message_ctn = $pdo->prepare($sql_message_ctn);
    $message_ctn ->execute();
}
catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}

$j=0;
while( $message_ctnRow[$j]= $message_ctn -> fetch(PDO::FETCH_ASSOC)){
   $j++;
}//u.user_name   m.msg_content   m.msg_date  u.my_animalbg_img
array_splice($message_ctnRow,$j,1);
echo json_encode( $message_ctnRow );
//echo json_encode( $user_no );
?>