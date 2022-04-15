<?php
  // $_REQUEST['admin_no']=1;
  $errMsg = "";
  try{
    require_once("connectg3.php");

    $sql = "select user_no, user_id, user_name, user_email, user_tel, user_status from user";
    $users  = $pdo->query($sql);
    $userRows = $users -> fetchAll(PDO::FETCH_ASSOC);

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
        <li class="breadcrumb-item">會員</li>

      </ol>
      <div class="container-fluid">
        <!-- 中間內容 -->
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">會員</div>
      
              <div class="card-body" style="overflow-x: scroll;">
                <table class="table table-responsive-sm table-bordered">
                  <thead>
                    <tr>
                      <th>會員編號</th>
                      <th>帳號</th>
                      <th>姓名</th>
                      <th>信箱</th>
                      <th>行動電話</th>
                      <th>狀態(0:停權; 1:正常)</th>
                      <th colspan=2></th>
                    </tr>
                  </thead>
                  <tbody>
                  
                    
                  
<?php
if( $errMsg != ""){ //例外
        echo "<div><center>$errMsg</center></div>";
    }elseif($users->rowCount()==0){
        echo "<div><center>無會員資料</center></div>";
    }else{
?>
<?php

  
    foreach( $userRows as $i => $userRow){
    
?>
                  <form action="updateUserData.php" method="post">
                    <tr> 
                      <td><?php echo $userRow['user_no'];?><input name="user_no" type="hidden" value="<?= $userRow['user_no']?>"></td>
                      <td><input class="dissinputstyle" name="user_id" value="<?= $userRow['user_id']?>" readonly="true" size="6" maxlength="10"></td>
                      <td><input class="dissinputstyle" name="user_name" value="<?= $userRow['user_name']?>" readonly="true" size="8" maxlength="10"></td>
                      <td><input class="dissinputstyle" name="user_email" value="<?= $userRow['user_email']?>" readonly="true" size="16" maxlength="255"></td>
                      <td><input class="dissinputstyle" name="user_tel" value="<?= $userRow['user_tel']?>" readonly="true" size="10" maxlength="10"></td>
                      <td><input class="dissinputstyle" name="user_status" value="<?= $userRow['user_status']?>" type="number" readonly="true" size="3" min="0" max="1" required></td>
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
      function reversechange(e){
        console.log(e.target.parentNode.parentNode.children[1]);   
        e.target.parentNode.parentNode.children[5].firstChild.removeAttribute("readonly");
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
    
  </script>
 
  
  <script>
  </script>

</body>

</html>