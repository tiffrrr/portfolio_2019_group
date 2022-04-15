<?php
$errMsg = "";
try{
  require_once("connectg3.php");
  $sql = "update tail SET tail_name=:tail_name, tail_status=:tail_status , tail_ch_name=:tail_ch_name WHERE tail_no=:tail_no";
  $animal_tail = $pdo->prepare($sql);
  $animal_tail->bindValue(":tail_name",$_REQUEST['tail_name']);
  $animal_tail->bindValue(":tail_status",$_REQUEST['tail_status']);
  $animal_tail->bindValue(":tail_ch_name",$_REQUEST['tail_ch_name']);
  $animal_tail->bindValue(":tail_no", $_REQUEST["tail_no"]);
  $animal_tail->execute();
  
  // 看你傳入的欄位值是 tail_img or tail_img_combination
	function add ($name){    //name = tail_img  or  tail_img_combination

		$tail_name = $_REQUEST['tail_name'];
		$tail_no= $_REQUEST["tail_no"];
		
		// 後台的存檔路徑
		$upload_dir = "../img/modify/";

		//實際寫進資料庫 給前台使用的路徑
		$save_directory = "img/modify/";

		//先檢查modify資料夾存不存在
		if( file_exists("modify") === false){
			mkdir("modify");
		}

		//檔案名稱都要變成tail_xxx.png or p_tail_xxx.png
		if($name == "tail_img_combination"){ //如果是左側組合圖
			$fileName = "p_tail_" . $tail_name .".png";
		}else if($name == "tail_img"){ //如果是右側選單圖
			$fileName = "tail_" . $tail_name .".png";
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
		$sql = "update tail set $name = :$name where tail_no = $tail_no";
		$newtail = $pdoa->prepare($sql);
		$newtail -> bindValue(":$name", "$save_directory"."$fileName");
		$newtail -> execute();

		echo " $name 新增成功~";
	}

	if( $_FILES["tail_img"]["error"] == UPLOAD_ERR_OK){
		add("tail_img");
	}


	if( $_FILES["tail_img_combination"]["error"] == UPLOAD_ERR_OK){
		add("tail_img_combination");
	}

    header('Location:animalTail.php');

}catch(PDOException $e){
  echo $e->getMessage();
}
?>