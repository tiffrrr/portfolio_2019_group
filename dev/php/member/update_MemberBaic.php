<?php 
$errMsg = "";
session_start();

try {
	require_once('../connectg3.php');
	
	$members=$pdo->prepare('update user set user_name=:user_name,user_psw=:user_psw,user_email=:user_email,user_tel=:user_tel,hint_answer=:hint_answer where user_id=:user_id');

	$members->bindValue(':user_id',$_REQUEST["user_id"]);
	$members->bindValue(':user_name',$_REQUEST["user_name"]);
	$members->bindValue(':user_psw',$_REQUEST["user_psw"]);
	$members->bindValue(':user_email',$_REQUEST["user_email"]);
	$members->bindValue(':user_tel',$_REQUEST["user_tel"]);
	$members->bindValue(':hint_answer',$_REQUEST["hint_answer"]);
	$members->execute();
	// echo "異動成功~" ;
	
	header("location:../../member.php");
    

  if( $_FILES["upFile"]["error"] == UPLOAD_ERR_OK){

		//先檢查images資料夾存不存在
		$dir ="../../img/customize//";

		if(!file_exists($dir)){
			mkdir($dir);
		}
		//將檔案copy到要放的路徑
		$fileInfoArr = pathinfo($_FILES["upFile"]["name"]); //原本使用者放的路徑
		
		$fileName = "user". $_SESSION['user_no'] . "_sticker" . "." . $fileInfoArr["extension"];  //use1_sticker.gif
		
		$from = $_FILES["upFile"]["tmp_name"];//暫存檔的路徑名稱
	
		$to = $dir . $fileName;
		
		copy( $from, $to);//從暫存檔的路徑名稱複製到images

	//將檔案名稱寫回資料庫
	
		$file_src = "img/customize/" . $fileName ;
	
		$sql = "update user set user_img=:user_img where user_id=:user_id";
		$memberImg = $pdo->prepare($sql);
		$memberImg -> bindValue(":user_img", $file_src);//把路徑use1_sticker.gif給image
    	// $memberImg -> bindValue(":user_img", $fileName);
    	$memberImg -> bindValue(':user_id',$_REQUEST["user_id"]);
		$memberImg -> execute();
		// echo "新增成功~";
		header("location:../../member.php");

	}else if($_FILES["upFile"]["error"] == 4){ //如果未指定上傳檔案,還是跳轉成功
		header("location:../../member.php");
	}
	else{
		echo "錯誤代碼 : {$_FILES["upFile"]["error"]} <br>";
		echo "新增失敗";
	}


} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    echo $errMsg;
}
?>   