<?php
  // $_REQUEST['admin_no']=1;
  $errMsg = "";
  try{
    require_once("connectg3.php");
 
    $sql = "select * from head";
    $heads  = $pdo->query($sql);
    $headRows = $heads -> fetchAll(PDO::FETCH_ASSOC);

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
  <style>
    /* input[name="head_img"] {
      width: 200px;
    }
    input[name="head_img_combination"] {
      width: 180px;
    }
    .image{
      display:block;
      margin:auto;
      text-align:center;
    }
    .btnimg{
      padding-top:6px;
    }
    .tr_title{
      border: 2px solid #ccc;
    } */
    
  </style>
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
        <li class="breadcrumb-item active">動物頭部</li>

      </ol>
      <div class="container-fluid">
        <!-- 中間內容 -->
        <!-- style="overflow-x: scroll -->
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">動物頭部</div>

              <div class="card-body">
                <table class="table table-responsive-sm table-bordered">
                  <thead>
                    <tr id='head_title'>
                      <th class="align-middle" width="90">頭部編號</th>
                      <th class="align-middle">頭部名稱</th>
                      <th class="align-middle">選單圖</th>
                      <th class="align-middle" width="230">組合圖</th>
                      <th class="align-middle">環境1適應力</th>
                      <th class="align-middle">環境2適應力</th>
                      <th class="align-middle">環境3適應力</th>
                      <th class="align-middle">狀態(0:下架; 1:上架)</th>
                      <th class="align-middle">頭部中文名稱</th>
                      <th class="align-middle">動物聲音</th>
                      <th colspan="2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <!-- 新增 -->
                    <form action="addAnimalHeadData.php" method="post" enctype="multipart/form-data">
                        <!-- 標題列 -->
                        <tr class="tr_title">
                            <td></td>
                            <td>
                                <input type="text" name="head_name" id="" maxlength="10" required>
                            </td>
                            <td>
                                <input type="file" id="select_head_img" name="head_img" accept="image/*"><br>
                                <img width="45%" src="" id="head_img_preview">
                            </td>
                            <td>
                                <input type="file" id="select_head_img_combination" name="head_img_combination" accept="image/*"><br>
                                <img img width='80%' src="" id="head_img_combination_preview">
                            </td>
                            <td>
                                <input type="number" name="head_environment1" id="" size="10" min="1" max="9" required>
                            </td>
                            <td>
                                <input type="number" name="head_environment2" id="" size="10" min="1" max="9" required>
                            </td>
                            <td>
                                <input type="number" name="head_environment3" id="" size="10" min="1" max="9" required>
                            </td>
                            <td>
                                <input type="number" name="head_status" id="" size="10" min="0" max="1" required>
                            </td>
                            <td>
                                <input type="text" name="head_ch_name" id="" size="10" required>
                            </td>
                            <td>
                                <input type="file" name="head_howl" id="" size="10" accept="audio/*" required>
                            </td>
                            <td colspan="2">
                                <input class="btn btn-block btn-outline-primary addbtn" type="submit" value="新增">
                            </td>
                        </tr>
                    </form>
                    <?php
                    if( $errMsg != ""){ //例外
                            echo "<div><center>$errMsg</center></div>";
                        }elseif($heads->rowCount()==0){
                            echo "<div><center>無動物頭部資料</center></div>";
                        }else{
                    ?>

                    <?php
                    
                    foreach( $headRows as $i => $headRow){
                        // echo "<pre>";
                        // print_r($haedRow);
                        // echo "</pre>";
                    ?>
                        <!-- 內容列 -->
                        <form action="updateAnimalHeadData.php" method="post" enctype="multipart/form-data">
                          <tr>
                            <td><?php echo $headRow['head_no'];?><input name="head_no" type="hidden" value="<?= $headRow['head_no']?>"></td>
                            <td><input type="text" name="head_name" value="<?= $headRow['head_name']?>" readonly="true" class="dissinputstyle" maxlength="10" required></td>
                            <td><img width="45%" src="../<?= $headRow['head_img']?>?<?php echo time();?>" alt="" class="image"><input type="file" class="btnimg" name="head_img" size="10" style="display:none"></td>
                            <td><img width='80%' src="../<?= $headRow['head_img_combination']?>?<?php echo time();?>" alt=""><input type="file" class="combination_btnimg"name="head_img_combination" size="10" style="display:none"></td>
                            <td><input type="number" name="head_environment1" value="<?= $headRow['head_environment1']?>" readonly="true" size="10" class="dissinputstyle" required min="1" max="9"></td>
                            <td><input type="number" name="head_environment2" value="<?= $headRow['head_environment2']?>" readonly="true" size="10" class="dissinputstyle" required min="1" max="9"></td>
                            <td><input type="number" name="head_environment3" value="<?= $headRow['head_environment3']?>" readonly="true" size="10" class="dissinputstyle" required min="1" max="9"></td>
                            <td><input type="number" name="head_status" value="<?= $headRow['head_status']?>" readonly="true" size="10" class="dissinputstyle" required></td>
                            <td><input type="text" name="head_ch_name" value="<?= $headRow['head_ch_name']?>" readonly="true" size="10" class="dissinputstyle" maxlength="10" required></td>
                            <td><input type="file" name="head_howl" value="<?= $headRow['head_howl']?>" readonly="true" size="10" accept="audio/*" required style="display:none"><p><?= $headRow['head_howl']?></p></td>
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

    //填入使用者名字到右上角
    function userName(){
      document.querySelector('.nav-link').innerHTML += `<span>Hi! ${sessionStorage['admin_name']}</span>`
    }



    // 不用了
    // // 判斷新增按鈕時，每個欄位是否都有值
    // function checkValue(e){

    //   var addtr = e.target.parentNode.parentNode;
    //   // if(Number(magictr.children[7].value) ==0 || Number(magictr.children[7].value) ==1){
    //   // alert("狀態只能0或1");
    //   // console.log("狀態只能0或1");
        
    //   for(var i=1; i<addtr.children.length-1; i++){
    //     if(addtr.children[i].firstElementChild.value==''){
    //       alert('請填入'+$id('head_title').children[i].innerText+'的值!');
    //       console.log('請填入'+$id('head_title').children[i].innerText+'的值!');
    //       e.preventDefault();
    //     }
    //   }
    // }
    

    // 控制哪些欄位可修改start  
    function reversechange(e){

        var updatetr = e.target.parentNode.parentNode;

        // console.log(e.target.parentNode.parentNode.children[1]);   
        // console.log(e.target.parentNode.parentNode.children[2].lastChild);

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
        updatetr.children[1].firstChild.classList.remove("dissinputstyle");
        updatetr.children[3].firstChild.classList.remove("dissinputstyle");
        updatetr.children[4].firstChild.classList.remove("dissinputstyle");
        updatetr.children[5].firstChild.classList.remove("dissinputstyle");
        updatetr.children[6].firstChild.classList.remove("dissinputstyle");
        updatetr.children[7].firstChild.classList.remove("dissinputstyle");
        updatetr.children[8].firstChild.classList.remove("dissinputstyle");
        updatetr.children[11].firstChild.removeAttribute("disabled");
        updatetr.children[9].firstChild.style.display='block';;

    }
      
    var btn1= document.getElementsByClassName('btn1');
    function doFirst(){
      for(i=0; i<btn1.length;i++){
        btn1[i].addEventListener('click',reversechange,false);
      }
      // document.getElementsByClassName('addbtn')[0].addEventListener('click',checkValue);
    }
    window.addEventListener('load',doFirst);
    // 控制哪些欄位可修改end


    // 控制新增選單圖片時的預覽
    window.addEventListener("load", function () {
      $id("head_img_preview").style.display="none";   
      $id("select_head_img").onchange = function (e) {
          let file = e.target.files[0];

          let reader = new FileReader(); //建立新的 FileReader 物件
          reader.onload = function (e) {

            $id("head_img_preview").style.display="block";   
            $id("head_img_preview").src = reader.result;
          }

          reader.readAsDataURL(file);
        }
    })
    
    // 控制新增組合圖片時的預覽
    window.addEventListener("load", function () {
      $id("head_img_combination_preview").style.display="none";   
      $id("select_head_img_combination").onchange = function (e) {
          let file = e.target.files[0];

          let reader = new FileReader(); //建立新的 FileReader 物件
          reader.onload = function (e) {

            // 執行onchange事件後才會顯示
            $id("head_img_combination_preview").style.display="block";

            $id("head_img_combination_preview").src = reader.result;
          }

          reader.readAsDataURL(file);
        }
    })

    // 控制修改選單圖片時的預覽
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
      userName();
        for(i=0; i<combination_btnimg.length;i++){
        combination_btnimg[i].addEventListener('change',changeCombinationImg,false);
      }
    });
    
  </script>

  
</body>

</html>