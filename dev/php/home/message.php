<?php
$errMsg = "";

try {
    require_once("../connectg3.php");
    session_start();

    $sql_message_ctn = 
   // "SELECT * FROM `message.user_no=user.user_no ;`";
  // "SELECT * FROM `message m ,user u` where `m.user_no=u.user_no` ;";
   "select 
   m.msg_content
   ,m.msg_date
   ,u.user_name
   ,u.my_animal_bg_img
   ,u.my_animal_img
   ,m.work_no,m.msg_no
      from message m,user u
      where m.user_no=u.user_no and m.msg_status=1  
      order by m.msg_date desc;";

    $message_ctn = $pdo->prepare($sql_message_ctn);
   $message_ctn ->execute();
}
catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}


for ($i=0; $i <3 ; $i++) { 
    $message_ctnRow[$i]= $message_ctn -> fetch(PDO::FETCH_ASSOC);
}
//u.user_name   m.msg_content   m.msg_date  u.my_animalbg_img

echo json_encode( $message_ctnRow );

?>  