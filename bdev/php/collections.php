<?php
  // $_REQUEST['admin_no']=1;
  $errMsg = "";
  try{
    require_once("connectg3.php");

    $sql = "select * from collections order by vote desc";
    $collections  = $pdo->query($sql);
    $collectionsRows = $collections -> fetchAll(PDO::FETCH_ASSOC);

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
        <li class="breadcrumb-item">選怪排行管理</li>
        <li class="breadcrumb-item">選怪作品管理</li>

      </ol>
      <div class="container-fluid">
        <!-- 中間內容 -->
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">選怪作品管理</div>
      
              <div class="card-body">
                <table class="table table-responsive-sm table-bordered">
                  <thead>
                    <tr>
                      <th>作品編號</th>
                      <th>投票數</th>
                      <th>參選動物圖片</th>
                      <th>動物名稱</th>
                      <th>參賽日期</th>
                      <th>參選背景圖片</th>
                      <th>會員編號</th>
                      <th>參選合成圖片</th>
                    </tr>
                  </thead>
                  <tbody>
                  
<?php
if( $errMsg != ""){ //例外
        echo "<div><center>$errMsg</center></div>";
    }elseif($collections->rowCount()==0){
        echo "<div><center>無選怪作品資料</center></div>";
    }else{
?>
<?php

  
    foreach( $collectionsRows as $i => $collectionRow){
    
?>
<!-- <div><?= $collectionRow['vote']?></div> -->
                    <tr class="collections_tr">
                      <td><?php echo $collectionRow['work_no'];?><input name="work_no" type="hidden" value="<?= $collectionRow['work_no']?>"></td>
                      <td><input class="dissinputstyle" type="text" name="vote" value="<?= $collectionRow['vote']?>" readonly="true"></td>
                      <td><img width="100%" class="image"  src="../<?= $collectionRow['cmp_img']?>"></td>
                      <td><input class="dissinputstyle" type="text" name="work_name" value="<?= $collectionRow['work_name']?>" readonly="true"></td>
                      <td><input class="dissinputstyle" type="text" name="work_date" value="<?= $collectionRow['work_date']?>" readonly="true"></td>
                      <td><img class="image" width=75% src="../<?= $collectionRow['bg_img']?>"></td>
                      <td><input class="dissinputstyle" type="text" name="user_no" value="<?= $collectionRow['user_no']?>" readonly="true"></td>
                      <td><img width="75%" class="image" width="75%" src="../<?= $collectionRow['amlbg_img']?>"></td>
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
  </script>

</body>

</html>