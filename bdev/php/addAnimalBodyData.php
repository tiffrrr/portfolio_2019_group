<?php
// error_reporting(0); 
$errMsg = "";
try {
		require_once("connectg3.php");

			// 動物頭部更新
			$sql = "insert into body (body_no, body_name, body_img ,body_img_combination, body_health, body_environment1, body_environment2, body_environment3, body_status, body_ch_name) values (null, :body_name, '', '', :body_health, :body_environment1, :body_environment2, :body_environment3,:body_status, :body_ch_name)";
			$newbody = $pdo->prepare($sql);
			$newbody->bindValue(":body_name",$_REQUEST['body_name']);
			$newbody->bindValue(":body_health",$_REQUEST['body_health']);
			$newbody->bindValue(":body_environment1",$_REQUEST['body_environment1']);
			$newbody->bindValue(":body_environment2",$_REQUEST['body_environment2']);
			$newbody->bindValue(":body_environment3",$_REQUEST['body_environment3']);
			$newbody->bindValue(":body_status",$_REQUEST['body_status']);
			$newbody->bindValue(":body_ch_name",$_REQUEST['body_ch_name']);
			$newbody->execute();
		
			//取得自動創號的動物頭部號碼
			$body_no = $pdo->lastInsertId();
			echo "新增動物身體成功";
			header('Location:animalBody.php');

			$body_name = $_REQUEST['body_name'];

			if( $_FILES["body_img"]["error"] == UPLOAD_ERR_OK){

				// 後台的存檔路徑
				$upload_dir = "../img/modify/";

				//實際寫進資料庫，給前台使用的路徑
				$save_directory = "img/modify/";

				//先檢查modify資料夾存不存在
				if( file_exists("modify") === false){
					mkdir("modify");
				}

				//將檔案copy到要放的路徑
				$fileInfoArr = pathinfo($_FILES["body_img"]["name"]);
				$fileInfoArr_combination = pathinfo($_FILES["body_img_combination"]["name"]);

				//檔案名稱都要變成body_xxx.png
				$fileName3 = "body_" . $body_name .".png";
				$fileName4 = "p_body_" . $body_name .".png";

				//右側選單圖
				$from = $_FILES["body_img"]["tmp_name"];
				$to = "$upload_dir" . "$fileName3";
				copy( $from, $to);

				// 左側組合圖
				$from = $_FILES["body_img_combination"]["tmp_name"];
				$to = "$upload_dir" . "$fileName4";
				copy( $from, $to);

				//將檔案名稱寫回資料庫
				$sql = "update body set body_img = :body_img,  body_img_combination= :body_img_combination where body_no = $body_no";
				$newbody = $pdo->prepare($sql);
				$newbody -> bindValue(":body_img", "$save_directory"."$fileName3");
				$newbody -> bindValue(":body_img_combination", "$save_directory"."$fileName4");
				$newbody -> execute();
				echo "新增成功~";
			

			}else{
				echo "錯誤代碼 : {$_FILES["body_img"]["error"]} <br>";
				echo "新增失敗<br>";
			}

}catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
	echo $errMsg;
	// $pdo->rollback();
}


?>