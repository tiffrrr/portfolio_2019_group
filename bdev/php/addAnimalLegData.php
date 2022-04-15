<?php
// error_reporting(0); 
$errMsg = "";
try {
		require_once("connectg3.php");

			// 動物身體更新
			$sql = "insert into leg (leg_no, leg_name, leg_img ,leg_img_combination, leg_jump, leg_environment1, leg_environment2, leg_environment3, leg_status, leg_ch_name) values (null, :leg_name, '', '', :leg_jump, :leg_environment1, :leg_environment2, :leg_environment3,:leg_status, :leg_ch_name)";
			$newleg = $pdo->prepare($sql);
			$newleg->bindValue(":leg_name",$_REQUEST['leg_name']);
			$newleg->bindValue(":leg_jump",$_REQUEST['leg_jump']);
			$newleg->bindValue(":leg_environment1",$_REQUEST['leg_environment1']);
			$newleg->bindValue(":leg_environment2",$_REQUEST['leg_environment2']);
			$newleg->bindValue(":leg_environment3",$_REQUEST['leg_environment3']);
			$newleg->bindValue(":leg_status",$_REQUEST['leg_status']);
			$newleg->bindValue(":leg_ch_name",$_REQUEST['leg_ch_name']);
			$newleg->execute();
		
			//取得自動創號的動物腿部號碼
			$leg_no = $pdo->lastInsertId();
			echo "新增動物腿部成功";
			header('Location:animalLeg.php');

			$leg_name = $_REQUEST['leg_name'];

			if( $_FILES["leg_img"]["error"] == UPLOAD_ERR_OK){

				// 後台的存檔路徑
				$upload_dir = "../img/modify/";

				//實際寫進資料庫，給前台使用的路徑
				$save_directory = "img/modify/";

				//先檢查modify資料夾存不存在
				if( file_exists("modify") === false){
					mkdir("modify");
				}

				//將檔案copy到要放的路徑
				$fileInfoArr = pathinfo($_FILES["leg_img"]["name"]);
				$fileInfoArr_combination = pathinfo($_FILES["leg_img_combination"]["name"]);

				//檔案名稱都要變成leg_xxx.png
				$fileName3 = "leg_" . $leg_name .".png";
				$fileName4 = "p_leg_" . $leg_name .".png";

				//右側選單圖
				$from = $_FILES["leg_img"]["tmp_name"];
				$to = "$upload_dir" . "$fileName3";
				copy( $from, $to);

				// 左側組合圖
				$from = $_FILES["leg_img_combination"]["tmp_name"];
				$to = "$upload_dir" . "$fileName4";
				copy( $from, $to);

				//將檔案名稱寫回資料庫
				$sql = "update leg set leg_img = :leg_img,  leg_img_combination= :leg_img_combination where leg_no = $leg_no";
				$newleg = $pdo->prepare($sql);
				$newleg -> bindValue(":leg_img", "$save_directory"."$fileName3");
				$newleg -> bindValue(":leg_img_combination", "$save_directory"."$fileName4");
				$newleg -> execute();
				echo "新增成功~";
			

			}else{
				echo "錯誤代碼 : {$_FILES["leg_img"]["error"]} <br>";
				echo "新增失敗<br>";
			}

}catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
	echo $errMsg;
	// $pdo->rollback();
}


?>