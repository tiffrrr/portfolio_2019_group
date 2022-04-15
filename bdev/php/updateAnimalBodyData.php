<?php
$errMsg = "";
try{
  require_once("connectg3.php");
  $sql = "update body SET body_name=:body_name, body_health=:body_health, body_environment1=:body_environment1, body_environment2=:body_environment2, body_environment3=:body_environment3, body_status=:body_status , body_ch_name=:body_ch_name WHERE body_no=:body_no";
  $animal_body = $pdo->prepare($sql);
  $animal_body->bindValue(":body_name",$_REQUEST['body_name']);
  $animal_body->bindValue(":body_health",$_REQUEST['body_health']);
  $animal_body->bindValue(":body_environment1",$_REQUEST['body_environment1']);
  $animal_body->bindValue(":body_environment2",$_REQUEST['body_environment2']);
  $animal_body->bindValue(":body_environment3",$_REQUEST['body_environment3']);
  $animal_body->bindValue(":body_status",$_REQUEST['body_status']);
  $animal_body->bindValue(":body_ch_name",$_REQUEST['body_ch_name']);
  $animal_body->bindValue(":body_no", $_REQUEST["body_no"]);
  $animal_body->execute();
  
  

  // 看你傳入的欄位值是 body_img or body_img_combination
	function add ($name){    //name = body_img  or  body_img_combination

		$body_name = $_REQUEST['body_name'];
		$body_no= $_REQUEST["body_no"];
		
		// 後台的存檔路徑
		$upload_dir = "../img/modify/";

		//實際寫進資料庫 給前台使用的路徑
		$save_directory = "img/modify/";

		//先檢查modify資料夾存不存在
		if( file_exists("modify") === false){
			mkdir("modify");
		}

		//檔案名稱都要變成body_xxx.png or p_body_xxx.png
		if($name == "body_img_combination"){ //如果是左側組合圖
			$fileName = "p_body_" . $body_name .".png";
		}else if($name == "body_img"){ //如果是右側選單圖
			$fileName = "body_" . $body_name .".png";
		}

		// 你要copy的檔案路徑
		$from = $_FILES[ $name ]["tmp_name"];
		$to = "$upload_dir" . "$fileName";
		copy( $from, $to);

		// 資料庫
		$dsn = "mysql:host=localhost;port=3306;dbname=dd102g3;charset=utf8";
		$user = "root";
		$password = "123456";
		// $user = "dd102g3";
		// $password = "dd102g3";
		$options=array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
		$pdoa = new PDO($dsn, $user, $password, $options);
	
		//將檔案名稱寫回資料庫
		$sql = "update body set $name = :$name where body_no = $body_no";
		$newbody = $pdoa->prepare($sql);
		$newbody -> bindValue(":$name", "$save_directory"."$fileName");
		$newbody -> execute();

		echo " $name 新增成功~";
	}

	if( $_FILES["body_img"]["error"] == UPLOAD_ERR_OK){
		add("body_img");
	}


	if( $_FILES["body_img_combination"]["error"] == UPLOAD_ERR_OK){
		add("body_img_combination");
	}

    header('Location:animalBody.php');

}catch(PDOException $e){
  echo $e->getMessage();
}
?>