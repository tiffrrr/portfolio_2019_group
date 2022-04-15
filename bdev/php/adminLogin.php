<?php
session_start();
try{
  require_once("connectg3.php");
  $sql = "select * from admin where admin_name=:memId and admin_psw=:memPsw";
  $member = $pdo->prepare( $sql);
  $member->bindValue(":memId", $_REQUEST["memId"]);
  $member->bindValue(":memPsw", $_REQUEST["memPsw"]);
  $member->execute();
  if( $member->rowCount() == 0){ //查無此人
  	echo "查無此人";
  }else{
  	$memRow = $member->fetch(PDO::FETCH_ASSOC);
  //登入成功,將登入者的資料寫入session
  $_SESSION["memId"] = $memRow["admin_id"];
  $_SESSION["memName"] = $memRow["admin_name"];
  $_SESSION["memNo"] = $memRow["admin_no"];
  
  	echo $memRow["admin_name"];
  }
}catch(PDOException $e){
  //echo $e->getMessage();
  //echo "系統異常,請通知系統維護人員";	
  echo "sysError";
}
?>