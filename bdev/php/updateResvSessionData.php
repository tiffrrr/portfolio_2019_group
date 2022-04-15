<?php
try{
  require_once("connectg3.php");
  $sql = "update resv_session_capacity SET start_time=:start_time, length=:length, max_capacity=:max_capacity WHERE session_no=:session_no";
  $resvSession = $pdo->prepare($sql);
  $resvSession->bindValue(":start_time", $_REQUEST["start_time"]);
  $resvSession->bindValue(":length", $_REQUEST["length"]);
  $resvSession->bindValue(":max_capacity", $_REQUEST["max_capacity"]);
  $resvSession->bindValue(":session_no", $_REQUEST["session_no"]);
  $resvSession->execute(); 

  
    echo "修改成功";
    header('Location:resvSessionCapacity.php');
  	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>