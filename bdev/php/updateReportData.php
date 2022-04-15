<?php
$errMsg = "";
try{
  require_once("connectg3.php");
  $sql = "update report SET report_status=:report_status WHERE report_no=:report_no";
  $report = $pdo->prepare($sql);
  $report->bindValue(":report_status",$_REQUEST['report_status']);
  $report->bindValue(":report_no",$_REQUEST['report_no']);
  $report->execute(); 

  $sql2 = "update message SET msg_status=:msg_status WHERE msg_no=:msg_no";
  $report2 = $pdo->prepare($sql2);
  $report2->bindValue(":msg_status",$_REQUEST['report_status']);
  $report2->bindValue(":msg_no",$_REQUEST['msg_no']);
  $report2->execute(); 

  
    echo "修改成功";
    header('Location:report.php');
  
  
}catch(PDOException $e){
  echo $e->getMessage();
}
?>