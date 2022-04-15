<?php
try{
  require_once("connectg3.php");
  $sql = "update unavailable_date SET date_unavailable=:date_unavailable WHERE date_no=:date_no";
  $unavailable_date = $pdo->prepare($sql);
  $unavailable_date->bindValue(":date_unavailable", $_REQUEST["date_unavailable"]);
  $unavailable_date->bindValue(":date_no", $_REQUEST["date_no"]);
  $unavailable_date->execute(); 

  
    echo "修改成功";
    header('Location:unaviableDate.php');
  	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>