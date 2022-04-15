<?php
try{
  require_once("connectg3.php");
  $sql = "update user SET user_status=:user_status WHERE user_no=:user_no";
  $user = $pdo->prepare($sql);
  $user->bindValue(":user_status", $_REQUEST["user_status"]);
  $user->bindValue(":user_no", $_REQUEST["user_no"]);
  $user->execute(); 

  
    echo "修改成功";
    header('Location:user.php');
  	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>