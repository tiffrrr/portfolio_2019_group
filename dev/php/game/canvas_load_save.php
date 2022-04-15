<?php
$upload_dir = "../../img/customize/";  //檢查資料夾存不存在
$load_dir = "img/customize/";
if(!file_exists($upload_dir)){
    mkdir($upload_dir);
}


$imgDataStr = $_POST['result_img'];//收到convas.toDataURL()送來的資料
$imgDataStr = str_replace('data:image/png;base64,', '', $imgDataStr); //將檔案格式的資訊拿掉
$data = base64_decode($imgDataStr);

//準備好要存的filename
$fileName = 'user_' . $_REQUEST["user_no"] . '_gaming';  

$file = $upload_dir . $fileName . ".png"; // 從PHP檔案往上推的存檔路徑
$loadPath = $load_dir.$fileName.".png";//實際從網頁讀取的路徑
$success = file_put_contents($file, $data);

echo $success ? $file : 'error';
?>


<?php
$errMsg = "";
try {
    require_once("../connectg3.php");
	$sql ="update user set game_img= :game_img where user_no=:user_no";
    $userData = $pdo->prepare( $sql);
    $userData->bindValue(":game_img", $loadPath);
    $userData->bindValue(":user_no", $_REQUEST["user_no"]);
    $userData->execute();
    // echo "遊戲畫面更新成功";
}catch(PDOExeption $e){
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>