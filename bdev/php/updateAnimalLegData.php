<?php
$errMsg = "";
try{
  require_once("connectg3.php");
  $sql = "update leg SET leg_name=:leg_name, leg_jump=:leg_jump, leg_environment1=:leg_environment1, leg_environment2=:leg_environment2, leg_environment3=:leg_environment3, leg_status=:leg_status , leg_ch_name=:leg_ch_name WHERE leg_no=:leg_no";
  $animal_leg = $pdo->prepare($sql);
  $animal_leg->bindValue(":leg_name",$_REQUEST['leg_name']);
  $animal_leg->bindValue(":leg_jump",$_REQUEST['leg_jump']);
  $animal_leg->bindValue(":leg_environment1",$_REQUEST['leg_environment1']);
  $animal_leg->bindValue(":leg_environment2",$_REQUEST['leg_environment2']);
  $animal_leg->bindValue(":leg_environment3",$_REQUEST['leg_environment3']);
  $animal_leg->bindValue(":leg_status",$_REQUEST['leg_status']);
  $animal_leg->bindValue(":leg_ch_name",$_REQUEST['leg_ch_name']);
  $animal_leg->bindValue(":leg_no", $_REQUEST["leg_no"]);
  $animal_leg->execute();
  
  $leg_name = $_REQUEST['leg_name'];
  $leg_no= $_REQUEST["leg_no"];

  // 看你傳入的欄位值是 leg_img or leg_img_combination
	function add ($name){    //name = leg_img  or  leg_img_combination

		$leg_name = $_REQUEST['leg_name'];
		$leg_no= $_REQUEST["leg_no"];
		
		// 後台的存檔路徑
		$upload_dir = "../img/modify/";

		//實際寫進資料庫 給前台使用的路徑
		$save_directory = "img/modify/";

		//先檢查modify資料夾存不存在
		if( file_exists("modify") === false){
			mkdir("modify");
		}

		//檔案名稱都要變成leg_xxx.png or p_leg_xxx.png
		if($name == "leg_img_combination"){ //如果是左側組合圖
			$fileName = "p_leg_" . $leg_name .".png";
		}else if($name == "leg_img"){ //如果是右側選單圖
			$fileName = "leg_" . $leg_name .".png";
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
		$sql = "update leg set $name = :$name where leg_no = $leg_no";
		$newleg = $pdoa->prepare($sql);
		$newleg -> bindValue(":$name", "$save_directory"."$fileName");
		$newleg -> execute();

		echo " $name 新增成功~";
	}

	if( $_FILES["leg_img"]["error"] == UPLOAD_ERR_OK){
		add("leg_img");
	}


	if( $_FILES["leg_img_combination"]["error"] == UPLOAD_ERR_OK){
		add("leg_img_combination");
	}

    header('Location:animalLeg.php');

}catch(PDOException $e){
  echo $e->getMessage();
}
?>