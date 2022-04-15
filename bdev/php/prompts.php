<?php
  // $_REQUEST['admin_no']=1;
  $errMsg = "";
  try{
    require_once("connectg3.php");

    $sql = "select * from prompts";
    $prompts  = $pdo->query($sql);
    $promptsRows = $prompts -> fetchAll(PDO::FETCH_ASSOC);

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
        <li class="breadcrumb-item">會員管理</li>
        <li class="breadcrumb-item">提示語管理</li>

      </ol>
      <div class="container-fluid">
        <!-- 中間內容 -->
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">提示語管理</div>
      
              <div class="card-body">
                <table class="table table-responsive-sm table-bordered">
                  <thead>
                    <tr>
                      <th>提示語編號</th>
                      <th>提示語題目</th>
                      <th></th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  <form action="addPromptsData.php" method="post">
                      <tr> 
                        <td></td>
                        <td>
                          <input type="text" name="hint_question" id="" size="60" required>
                        </td>
                        <td colspan="3">
                          <input class="btn btn-block btn-outline-primary addbtn" type="submit" value="新增">
                      </tr> 
                  </form>
<?php
if( $errMsg != ""){ //例外
        echo "<div><center>$errMsg</center></div>";
    }elseif($prompts->rowCount()==0){
        echo "<div><center>無提示語資料</center></div>";
    }else{
?>
<?php

  
    foreach( $promptsRows as $i => $promptsRow){
    
?>
                  
                    <tr>
                      <td><?php echo $promptsRow['hint_no'];?><input class="dissinputstyle" name="hint_no" type="hidden" value="<?= $promptsRow['hint_no']?>"></td>
                      <td colspan="2"><input type="text"  class="dissinputstyle" name="hint_question" value="<?= $promptsRow['hint_question']?>" readonly="true"></td>
                    </tr>
                 
  <?php
    }
  }
  ?>
                  </tbody>
                </table>
                <!-- 切換頁數 -->
                <!--  -->
      
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
  
  <!-- <script>
      function reversechange(e){
        console.log(e.target.parentNode.parentNode.children[1]);   
        e.target.parentNode.parentNode.children[1].firstChild.removeAttribute("readonly");   
        e.target.parentNode.parentNode.children[2].firstChild.removeAttribute("readonly");
      }
      
    
    var btn1= document.getElementsByClassName('btn1');
    function doFirst(){

      for(i=0; i<btn1.length;i++){
        btn1[i].addEventListener('click',reversechange,false);
      }
    }
    window.addEventListener('load',doFirst);
    
  </script> -->
 
  
  <script>
  </script>

</body>

</html>