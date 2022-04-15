<?php
$errMsg = "";
$work_no=$_GET["work_no"];
try {
    require_once("../connectg3.php");
    session_start();

    $sql_message_ctn = 
   // "SELECT * FROM `message.user_no=user.user_no ;`";
  // "SELECT * FROM `message m ,user u` where `m.user_no=u.user_no` ;";
   "select m.msg_content
   ,m.msg_date
   ,u.user_name
   ,u.my_animalbg_img
   ,m.work_no,m.msg_no
      from message m,user u
      where m.user_no=u.user_no and m.msg_status=1 and m.work_no= $work_no
      order by m.msg_date desc;";

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
?>  