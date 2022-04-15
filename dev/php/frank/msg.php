<?php
$work_no=$_GET["work_no"];
$msg=$_GET["msg"];
$user_no=$_GET["user"];
require_once("../connectg3.php");

$time=date("Y-m-d H:i:s");
$sql_INSERT =
"INSERT INTO  `message` (`msg_no`, `user_no`,`msg_content`,`msg_date`,`work_no`, `msg_status`)  VALUES
(null, '{$user_no}', '{$msg}','{$time}', '{$work_no}', '1' );";
$data_INSERT = $pdo->prepare($sql_INSERT);
$data_INSERT ->execute();

echo $time;
 
?> 