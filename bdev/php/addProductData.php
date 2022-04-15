<?php
$errMsg = "";
try {
		require_once("connectg3.php");
		
		
		$sql = "insert into product (product_no, product_name, product_img, product_price, product_status, product_description) values (null, :product_name, '', :product_price, :product_status, :product_description)";
		$newProduct = $pdo->prepare($sql);
		$newProduct->bindValue(":product_name",$_REQUEST['product_name']);
		$newProduct->bindValue(":product_price",$_REQUEST['product_price']);
		$newProduct->bindValue(":product_status",$_REQUEST['product_status']);
		$newProduct->bindValue(":product_description",$_REQUEST['product_description']);
		$newProduct->execute();
		//取得自動創號的地區號碼
        $product_no = $pdo->lastInsertId();
        echo "新增商品成功";
		header('Location:product.php');

		$product_name = $_REQUEST['product_name'];

		if( $_FILES["product_img"]["error"] == UPLOAD_ERR_OK){

			// 後台的存檔路徑
			$upload_dir = "../img/shop/";

			//實際寫進資料庫，給前台使用的路徑
			$save_directory = "img/shop/";

			//先檢查modify資料夾存不存在
			if( file_exists("shop") === false){
				mkdir("shop");
			}

			//將檔案copy到要放的路徑
			$fileInfoArr = pathinfo($_FILES["product_img"]["name"]);

			//檔案名稱都要變成product_xxx.png
			$fileName = $product_name .".png";

			//商品圖片
			$from = $_FILES["product_img"]["tmp_name"];
			$to = "$upload_dir" . "$fileName";
			copy( $from, $to);


			//將檔案名稱寫回資料庫
			$sql = "update product set product_img = :product_img where product_no = $product_no";
			$newproduct = $pdo->prepare($sql);
			$newproduct -> bindValue(":product_img", "$save_directory"."$fileName");
			$newproduct -> execute();
			echo "新增成功~";
		

		}else{
			echo "錯誤代碼 : {$_FILES["product_img"]["error"]} <br>";
			echo "新增失敗<br>";
		}

	} catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
		$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
        // $pdo->rollback();
        echo $errMsg;
	}

?>