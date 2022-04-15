<?php
// error_reporting(0); 
$errMsg = "";
try {
		require_once("connectg3.php");

			// 動物尾巴更新
			$sql = "insert into tail (tail_no, tail_name, tail_img ,tail_img_combination, tail_status, tail_ch_name) values (null, :tail_name, '', '', :tail_status, :tail_ch_name)";
			$newtail = $pdo->prepare($sql);
			$newtail->bindValue(":tail_name",$_REQUEST['tail_name']);
			$newtail->bindValue(":tail_status",$_REQUEST['tail_status']);
			$newtail->bindValue(":tail_ch_name",$_REQUEST['tail_ch_name']);
			$newtail->execute();
		
			//取得自動創號的動物尾巴號碼
			$tail_no = $pdo->lastInsertId();
			echo "新增動物尾巴成功";
			header('Location:animalTail.php');

			$tail_name = $_REQUEST['tail_name'];

			if( $_FILES["tail_img"]["error"] == UPLOAD_ERR_OK){

				// 後台的存檔路徑
				$upload_dir = "../img/modify/";

				//實際寫進資料庫，給前台使用的路徑
				$save_directory = "img/modify/";

				//先檢查modify資料夾存不存在
				if( file_exists("modify") === false){
					mkdir("modify");
				}

				//將檔案copy到要放的路徑
				$fileInfoArr = pathinfo($_FILES["tail_img"]["name"]);
				$fileInfoArr_combination = pathinfo($_FILES["tail_img_combination"]["name"]);

				//檔案名稱都要變成tail_xxx.png
				$fileName3 = "tail_" . $tail_name .".png";
				$fileName4 = "p_tail_" . $tail_name .".png";

				//右側選單圖
				$from = $_FILES["tail_img"]["tmp_name"];
				$to = "$upload_dir" . "$fileName3";
				copy( $from, $to);

				// 左側組合圖
				$from = $_FILES["tail_img_combination"]["tmp_name"];
				$to = "$upload_dir" . "$fileName4";
				copy( $from, $to);

				//將檔案名稱寫回資料庫
				$sql = "update tail set tail_img = :tail_img,  tail_img_combination= :tail_img_combination where tail_no = $tail_no";
				$newtail = $pdo->prepare($sql);
				$newtail -> bindValue(":tail_img", "$save_directory"."$fileName3");
				$newtail -> bindValue(":tail_img_combination", "$save_directory"."$fileName4");
				$newtail -> execute();
				echo "新增成功~";
			

			}else{
				echo "錯誤代碼 : {$_FILES["tail_img"]["error"]} <br>";
				echo "新增失敗<br>";
			}

}catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
	echo $errMsg;
	// $pdo->rollback();
}


?>