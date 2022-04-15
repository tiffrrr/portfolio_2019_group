<?php
$errMsg = "";
try{
  require_once("connectg3.php");
  $sql = "update product SET product_name=:product_name,  product_price=:product_price, product_status=:product_status, product_description=:product_description WHERE product_no=:product_no";
  $product = $pdo->prepare($sql);
  $product->bindValue(":product_name",$_REQUEST['product_name']);
  $product->bindValue(":product_price",$_REQUEST['product_price']);
  $product->bindValue(":product_status",$_REQUEST['product_status']);
  $product->bindValue(":product_description",$_REQUEST['product_description']);
  $product->bindValue(":product_no",$_REQUEST['product_no']);
  $product->execute();
  
  $product_name = $_REQUEST['product_name'];
  $product_no= $_REQUEST["product_no"];

  if( $_FILES["product_img"]["error"] == UPLOAD_ERR_OK){

    // 後台的存檔路徑
    $upload_dir = "../img/shop/";

    //實際寫進資料庫 給前台使用的路徑
    $save_directory = "img/shop/";

    //先檢查shop資料夾存不存在
    if( file_exists("shop") === false){
        mkdir("shop");
    }

    //檔案名稱都要變 `$product_name.png`
    $fileName = $product_no .".png";

    //商品圖片
    $from = $_FILES["product_img"]["tmp_name"];
    $to = "$upload_dir" . "$fileName";
    copy( $from, $to);


    //將檔案名稱寫回資料庫
    $sql = "update product set product_img = :product_img  where product_no = $product_no";
    $newproduct = $pdo->prepare($sql);
    $newproduct -> bindValue(":product_img", "$save_directory"."$fileName");
    $newproduct -> execute();
    echo "新增成功~";
			

    }
    
    


    echo "修改成功";
    header('Location:product.php');

}catch(PDOException $e){
  echo $e->getMessage();
}
?>