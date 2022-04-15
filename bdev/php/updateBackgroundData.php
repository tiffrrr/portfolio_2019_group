<?php
$errMsg = "";
try{
  require_once("connectg3.php");
  $sql = "update background SET bg_name=:bg_name, bg_status=:bg_status, bg_ch_name=:bg_ch_name WHERE bg_no=:bg_no";
  $background = $pdo->prepare($sql);
  $background->bindValue(":bg_name",$_REQUEST['bg_name']);
  $background->bindValue(":bg_status",$_REQUEST['bg_status']);
  $background->bindValue(":bg_ch_name",$_REQUEST['bg_ch_name']);
  $background->bindValue(":bg_no",$_REQUEST['bg_no']);
  $background->execute();
  
  $bg_name = $_REQUEST['bg_name'];
  $bg_no= $_REQUEST["bg_no"];

  if( $_FILES["bg_img"]["error"] == UPLOAD_ERR_OK){

    // 後台的存檔路徑
    $upload_dir = "../img/modify/bg_";

    //實際寫進資料庫 給前台使用的路徑
    $save_directory = "img/modify/bg_";

    //先檢查shop資料夾存不存在
    if( file_exists("modify") === false){
        mkdir("modify");
    }

    //檔案名稱都要變 `$bg_name.png`
    $fileName = $bg_name .".png";

    //背景圖片
    $from = $_FILES["bg_img"]["tmp_name"];
    $to = "$upload_dir" . "$fileName";
    copy( $from, $to);


    //將檔案名稱寫回資料庫
    $sql = "update background set bg_img = :bg_img  where bg_no = $bg_no";
    $newbg = $pdo->prepare($sql);
    $newbg -> bindValue(":bg_img", "$save_directory"."$fileName");
    $newbg -> execute();
    echo "新增成功~";
			

    }
    
    


    echo "修改成功";
    header('Location:background.php');

}catch(PDOException $e){
  echo $e->getMessage();
}
?>