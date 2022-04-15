<?php
  // $_REQUEST['admin_no']=1;
  $errMsg = "";
  try{
    require_once("connectg3.php");

    $sql = "select * from product";
    $products  = $pdo->query($sql);
    $productRows = $products -> fetchAll(PDO::FETCH_ASSOC);

  }catch(PDOException $e){
    $errMsg .= "錯誤原因 : ".$e -> getMessage(). "<br>";
    $errMsg .= "錯誤行號 : ".$e -> getLine(). "<br>";
  }
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
  <title>CoreUI Free Bootstrap Admin Template</title>
  <!-- Icons-->
  @@include('../html/layout/inputcss.html')
</head>

<body class="app header-fixed sidebar-fixed aside-menu-fixed sidebar-lg-show">
  <!-- top_header -->
  @@include('../html/layout/top_header.html')
  <div class="app-body">
    <div class="sidebar">
      <!-- sidebar menu-->
      @@include('../html/layout/sidebar_nav.html')
      <button class="sidebar-minimizer brand-minimizer" type="button"></button>
    </div>
    <main class="main">
      <!-- Breadcrumb-->
      <ol class="breadcrumb">
        <li class="breadcrumb-item">商品管理</li>

      </ol>
      <div class="container-fluid">
        <!-- 中間內容 -->
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">商品管理</div>
      
              <div class="card-body">
                <table class="table table-responsive-sm table-bordered">
                  <thead>
                    <tr>
                      <th>商品編號</th>
                      <th>商品名稱</th>
                      <th>商品圖片</th>
                      <th>商品價格</th>
                      <th>狀態(0:下架;1:上架)</th>
                      <th>商品說明</th>
                      <th colspan="2"></th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  <!-- 新增 -->
                  <form action="addProductData.php" method="post" enctype="multipart/form-data">
                  <!-- 標題列 -->
                    <tr class="tr_title"> 
                      <td></td>
                      <td>
                        <input type="text" name="product_name" id="" maxlength="10" required>
                      </td>
                      <td class="productimg_width">
                        <img width="50%" src="" alt="" id="product_img_preview">
                        <input type="file" id="select_product_img" name="product_img" accept="image/*" required>
                      </td>
                      <td>
                        <input type="number" name="product_price" id="" required>
                      </td>
                      <td>
                        <input type="number" name="product_status" id="" required min="0" max="1">
                      </td>
                      <td>
                        <input type="text" name="product_description" id="" maxlength="255" required>
                      </td>
                      <td colspan="2">
                        <input class="btn btn-block btn-outline-primary addbtn" type="submit" value="新增">
                      </td>
                    </tr>
                  </form>
                  
<?php
if( $errMsg != ""){ //例外
        echo "<div><center>$errMsg</center></div>";
    }elseif($products->rowCount()==0){
        echo "<div><center>無留言紀錄資料</center></div>";
    }else{
?>
<?php

  
    foreach( $productRows as $i => $productRow){
    
?>
                  <form action="updateProductData.php" method="post" enctype="multipart/form-data">
                    <tr>
                      <td><?php echo $productRow['product_no'];?><input name="product_no" type="hidden" value="<?= $productRow['product_no']?>"></td>
                      <td><input type="text" name="product_name" value="<?= $productRow['product_name']?>" readonly="true" class="dissinputstyle" maxlength="10" required></td>
                      <td><img width="50%" src="../<?= $productRow['product_img']?>?<?php echo time();?>" alt="" class="image"><input type="file" class="btnimg" name="product_img" size="10" class="dissinputstyle" style="display:none"></td>
                      <td><input type="number" name="product_price" value="<?= $productRow['product_price']?>" readonly="true" class="dissinputstyle" required></td>
                      <td><input type="number" name="product_status" value="<?= $productRow['product_status']?>" readonly="true" class="dissinputstyle" required min="0" max="1"></td>
                      <td><input type="text" name="product_description" value="<?= $productRow['product_description']?>" readonly="true" class="dissinputstyle" maxlength="255" required></td>
                      <td><input class="btn btn-block btn-outline-primary btn1" type="button" value="編輯"></td>
                      <td><input class="btn btn-block btn-outline-primary" type="submit"  value="修改完成" disabled></td>
                  </form>
                    </tr>
                 
  <?php
    }
  }
  ?>
                  </tbody>
                </table>
                <!-- 切換頁數 -->
               
      
              </div>
            </div>
          </div>
        </div>
      
        <!-- end -->
      </div>
    </main>

  </div>
  @@include('../html/layout/footer.html')
  <!-- CoreUI and necessary plugins-->
  @@include('../html/layout/inputjs.html')
  
  <script>

      function $id(id) {
        return document.getElementById(id);
      }

      // 控制哪些欄位可修改start
      function reversechange(e){
        console.log(e.target.parentNode.parentNode.children[1]);   
        e.target.parentNode.parentNode.children[1].firstChild.removeAttribute("readonly");   
        e.target.parentNode.parentNode.children[2].firstChild.removeAttribute("readonly");
        e.target.parentNode.parentNode.children[2].lastChild.style.display='block';
        e.target.parentNode.parentNode.children[3].firstChild.removeAttribute("readonly");   
        e.target.parentNode.parentNode.children[4].firstChild.removeAttribute("readonly");   
        e.target.parentNode.parentNode.children[5].firstChild.removeAttribute("readonly");   
        e.target.parentNode.parentNode.children[1].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[2].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[3].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[4].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[5].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[7].firstChild.removeAttribute("disabled");
      }
      
    
    var btn1= document.getElementsByClassName('btn1');
    function doFirst(){

      for(i=0; i<btn1.length;i++){
        btn1[i].addEventListener('click',reversechange,false);
      }
    }
    window.addEventListener('load',doFirst);
    // 控制哪些欄位可修改end

    // 控制新增商品圖片時的預覽
    window.addEventListener("load", function () {
      $id("product_img_preview").style.display="none";   
      $id("select_product_img").onchange = function (e) {
          let file = e.target.files[0];

          let reader = new FileReader(); //建立新的 FileReader 物件
          reader.onload = function (e) {

            $id("product_img_preview").style.display="block";   
            $id("product_img_preview").src = reader.result;
          }

          reader.readAsDataURL(file);
        }
    })
    

    // 控制修改商品圖片時的預覽
    var btnimg=document.getElementsByClassName('btnimg');

    function changeImg(e){
      let file = e.target.files[0];
      //  console.log(e.target.previousSibling); //找點到那一個的上一個節點 就是img  

      let showImg = e.target.previousSibling; //<img.......>

      let reader = new FileReader(); //建立新的 FileReader 物件
      reader.onload = function() {

        // console.log(e.target);   
        showImg.src = reader.result;
      }

      reader.readAsDataURL(file);
    }
   
    window.addEventListener('load',function(){
        for(i=0; i<btnimg.length;i++){
        btnimg[i].addEventListener('change',changeImg,false);
      }
    });

  </script>
 
  
  <script>
  </script>

</body>

</html>