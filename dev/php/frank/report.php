<?php
$user_no=$_GET["user_no"];
$msg_no=$_GET["msg_no"];
$report_reason=$_GET["report_reason"];
require_once("../connectg3.php");
$time=date("Y-m-d H:i:s");
// $sql_INSERT =
// "INSERT INTO  `message` (`msg_no`, `user_no`,`msg_content`,`msg_date`,`work_no`, `msg_status`)  VALUES
// (null, '{$user_no}', '{$msg}','{$time}', '{$work_no}', '1' );";
// $data_INSERT = $pdo->prepare($sql_INSERT);
// $data_INSERT ->execute();
$sql_INSERT =
"INSERT INTO `report` (`report_no`, `user_no`,`msg_no`,`report_reason`,`report_date`, `report_status`) VALUES
(null, '{$user_no}', '{$msg_no}', '{$report_reason}', '{$time}', 1);";
$data_INSERT = $pdo->prepare($sql_INSERT);
$data_INSERT ->execute();
echo json_encode( $report_reason);
 
?> 