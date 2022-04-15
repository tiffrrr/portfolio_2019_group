<?php
$errMsg = "";
try {
		require_once("connectg3.php");
		
		
		$sql = "insert into background (bg_no, bg_name, bg_img, bg_status, bg_ch_name) values (null, :bg_name, '', :bg_status, :bg_ch_name)";
		$newBackground = $pdo->prepare($sql);
		$newBackground->bindValue(":bg_name",$_REQUEST['bg_name']);
		$newBackground->bindValue(":bg_status",$_REQUEST['bg_status']);
		$newBackground->bindValue(":bg_ch_name",$_REQUEST['bg_ch_name']);
		$newBackground->execute();
		//取得自動創號的地區號碼
        $bg_no = $pdo->lastInsertId();
        echo "新增背景成功";
		header('Location:background.php');

		$bg_name = $_REQUEST['bg_name'];

		if( $_FILES["bg_img"]["error"] == UPLOAD_ERR_OK){

			// 後台的存檔路徑
			$upload_dir = "../img/modify/bg_";

			//實際寫進資料庫，給前台使用的路徑
			$save_directory = "img/modify/bg_";

			//先檢查modify資料夾存不存在
			if( file_exists("modify") === false){
				mkdir("modify");
			}

			//將檔案copy到要放的路徑
			$fileInfoArr = pathinfo($_FILES["bg_img"]["name"]);

			//檔案名稱都要變成bg_xxx.png
			$fileName = $bg_name .".png";

			//背景圖片
			$from = $_FILES["bg_img"]["tmp_name"];
			$to = "$upload_dir" . "$fileName";
			copy( $from, $to);


			//將檔案名稱寫回資料庫
			$sql = "update background set bg_img = :bg_img where bg_no = $bg_no";
			$newbg = $pdo->prepare($sql);
			$newbg -> bindValue(":bg_img", "$save_directory"."$fileName");
			$newbg -> execute();
			echo "新增成功~";
		

		}else{
			echo "錯誤代碼 : {$_FILES["bg_img"]["error"]} <br>";
			echo "新增失敗<br>";
		}

	} catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
		$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
        // $pdo->rollback();
        echo $errMsg;
	}

?>