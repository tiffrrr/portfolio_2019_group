<?php
try{
  require_once("connectg3.php");
  $sql = "update admin SET admin_name=:admin_name, admin_psw=:admin_psw, admin_status=:admin_status WHERE admin_no=:admin_no";
  $admin_member = $pdo->prepare($sql);
  $admin_member->bindValue(":admin_name", $_REQUEST["admin_name"]);
  $admin_member->bindValue(":admin_psw", $_REQUEST["admin_psw"]);
  $admin_member->bindValue(":admin_status", $_REQUEST["admin_status"]);
  $admin_member->bindValue(":admin_no", $_REQUEST["admin_no"]);
  $admin_member->execute(); 

  
    echo "修改成功";
    header('Location:admin.php');
  	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>