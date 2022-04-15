<?php
  // $_REQUEST['admin_no']=1;
  $errMsg = "";
  try{
    require_once("connectg3.php");

    $sql = "select * from leg";
    $legs  = $pdo->query($sql);
    $legRows = $legs -> fetchAll(PDO::FETCH_ASSOC);

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
  <title>CoreUI Free Bootstrap Animal Head Template</title>
  
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
        <li class="breadcrumb-item">動物部件管理</li>
        <li class="breadcrumb-item active">動物腿部</li>

      </ol>
      <div class="container-fluid">
        <!-- 中間內容 -->
        <!-- style="overflow-x: scroll -->
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">動物腿部</div>

              <div class="card-body">
                <table class="table table-responsive-sm table-bordered">
                  <thead>
                    <tr class="legtr">
                      <th class="align-middle" width="100">腿部編號</th>
                      <th class="align-middle">腿部名稱</th>
                      <th class="align-middle">選單圖</th>
                      <th class="align-middle">組合圖</th>
                      <th class="align-middle">跳躍力</th>
                      <th class="align-middle">環境1適應力</th>
                      <th class="align-middle">環境2適應力</th>
                      <th class="align-middle">環境3適應力</th>
                      <th class="align-middle">狀態(0:下架; 1:上架)</th>
                      <th class="align-middle">腿部中文名稱</th>
                      <th colspan="2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- 新增 -->
                    <form action="addAnimalLegData.php" method="post" enctype="multipart/form-data">
                        <!-- 標題列 -->
                        <tr class="tr_title">
                            <td></td>
                            <td>
                                <input type="text" name="leg_name" id="" maxlength="10" required> 
                            </td>
                            <td>
                                <input type="file" id="select_leg_img" name="leg_img" accept="image/*" width="180" required>
                                <img width="40%" src="" id="leg_img_preview">
                            </td>
                            <td>
                                <input type="file" name="leg_img_combination" id="select_leg_img_combination" size="4" accept="image/*" width="180" required>
                                <img img width='50%' src="" id="leg_img_combination_preview">
                            </td>
                            <td>
                                <input type="number" name="leg_jump" id="" size="6" required min="1" max="5">
                            </td>
                            <td>
                                <input type="number" name="leg_environment1" id="" size="6" required min="1" max="9">
                            </td>
                            <td>
                                <input type="number" name="leg_environment2" id="" size="6" required min="1" max="9">
                            </td>
                            <td>
                                <input type="number" name="leg_environment3" id="" size="6" required min="1" max="9">
                            </td>
                            <td>
                                <input type="number" name="leg_status" id="" size="4" required min="0" max="1">
                            </td>
                            <td>
                                <input type="text" name="leg_ch_name" id="" maxlength="10" required>
                            </td>
                            <td colspan="2">
                                <input class="btn btn-block btn-outline-primary addbtn" type="submit" value="新增">
                            </td>
                        </tr>
                    </form>
                    <?php
                    if( $errMsg != ""){ //例外
                            echo "<div><center>$errMsg</center></div>";
                        }elseif($legs->rowCount()==0){
                            echo "<div><center>無動物腿部資料</center></div>";
                        }else{
                    ?>

                    <?php
                    
                    foreach( $legRows as $i => $legRow){
                        // echo "<pre>";
                        // print_r($haedRow);
                        // echo "</pre>";
                    ?>
                        <!-- 內容列 -->
                        <form action="updateAnimalLegData.php" method="post" enctype="multipart/form-data">
                          <tr>
                            <td><?php echo $legRow['leg_no'];?><input name="leg_no" type="hidden" value="<?= $legRow['leg_no']?>"></td>
                            <td><input type="text" name="leg_name" value="<?= $legRow['leg_name']?>" readonly="true" class="dissinputstyle" maxlength="10" required></td>
                            <td><img width="45%" src="../<?= $legRow['leg_img']?>?<?php echo time();?>" alt="" class="image"><input type="file" class="leg_btnimg" name="leg_img" size="10" style="display:none" readonly="true"></td>
                            <td><img width='50%' src="../<?= $legRow['leg_img_combination']?>?<?php echo time();?>" alt=""><input type="file" class="combination_btnimg"name="leg_img_combination" size="10" style="display:none" readonly="true"></td>
                            <td><input type="number" name="leg_jump" value="<?= $legRow['leg_jump']?>" readonly="true" size="4" class="dissinputstyle" min="1" max="5" required></td>
                            <td><input type="number" name="leg_environment1" value="<?= $legRow['leg_environment1']?>" readonly="true" size="6" class="dissinputstyle" min="1" max="9" required></td>
                            <td><input type="number" name="leg_environment2" value="<?= $legRow['leg_environment2']?>" readonly="true" size="6" class="dissinputstyle" min="1" max="9" required></td>
                            <td><input type="number" name="leg_environment3" value="<?= $legRow['leg_environment3']?>" readonly="true" size="6" class="dissinputstyle" min="1" max="9" required></td>
                            <td><input type="number" name="leg_status" value="<?= $legRow['leg_status']?>" readonly="true" size="4" class="dissinputstyle" min="0" max="1" required></td>
                            <td><input type="text" name="leg_ch_name" value="<?= $legRow['leg_ch_name']?>" readonly="true" class="dissinputstyle" maxlength="10" required></td>
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
        <!-- @@include('layout/content.html') -->
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
      
      var updatetr = e.target.parentNode.parentNode;

      // console.log(e.target.parentNode.parentNode.children[1]);

      updatetr.children[1].firstChild.removeAttribute("readonly");   
      updatetr.children[2].firstChild.removeAttribute("readonly");
      updatetr.children[2].lastChild.style.display='block';   
      updatetr.children[3].firstChild.removeAttribute("readonly");
      updatetr.children[3].lastChild.style.display='block';
      updatetr.children[4].firstChild.removeAttribute("readonly");   
      updatetr.children[5].firstChild.removeAttribute("readonly");   
      updatetr.children[6].firstChild.removeAttribute("readonly");   
      updatetr.children[7].firstChild.removeAttribute("readonly");   
      updatetr.children[8].firstChild.removeAttribute("readonly");   
      updatetr.children[9].firstChild.removeAttribute("readonly");
      updatetr.children[1].firstChild.classList.remove("dissinputstyle");
      updatetr.children[3].firstChild.classList.remove("dissinputstyle");
      updatetr.children[4].firstChild.classList.remove("dissinputstyle");
      updatetr.children[5].firstChild.classList.remove("dissinputstyle");
      updatetr.children[6].firstChild.classList.remove("dissinputstyle");
      updatetr.children[7].firstChild.classList.remove("dissinputstyle");
      updatetr.children[8].firstChild.classList.remove("dissinputstyle");
      updatetr.children[9].firstChild.classList.remove("dissinputstyle");
      updatetr.children[11].firstChild.removeAttribute("disabled");

   
    }
      
    var btn1= document.getElementsByClassName('btn1');
    function doFirst(){

      for(i=0; i<btn1.length;i++){
        btn1[i].addEventListener('click',reversechange,false);
      }
    }
    window.addEventListener('load',doFirst);
    // 控制哪些欄位可修改end

    // 控制新增選單圖片時的預覽
    window.addEventListener("load", function () {
      $id("leg_img_preview").style.display="none";   
      $id("select_leg_img").onchange = function (e) {
          let file = e.target.files[0];

          let reader = new FileReader(); //建立新的 FileReader 物件
          reader.onload = function (e) {

            $id("leg_img_preview").style.display="block";   
            $id("leg_img_preview").src = reader.result;
          }

          reader.readAsDataURL(file);
        }
    })
    
    // 控制新增組合圖片時的預覽
    window.addEventListener("load", function () {
      $id("leg_img_combination_preview").style.display="none";   
      $id("select_leg_img_combination").onchange = function (e) {
          let file = e.target.files[0];

          let reader = new FileReader(); //建立新的 FileReader 物件
          reader.onload = function (e) {

            // 執行onchange事件後才會顯示
            $id("leg_img_combination_preview").style.display="block";

            $id("leg_img_combination_preview").src = reader.result;
          }

          reader.readAsDataURL(file);
        }
    })

    // 控制修改選單圖片時的預覽
    var btnimg=document.getElementsByClassName('leg_btnimg');

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

    // 控制修改組合圖片時的預覽
    var combination_btnimg = document.getElementsByClassName('combination_btnimg');

    function changeCombinationImg(e){
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
        for(i=0; i<combination_btnimg.length;i++){
        combination_btnimg[i].addEventListener('change',changeCombinationImg,false);
      }
    });


    
  </script>
</body>

</html>