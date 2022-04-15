<?php
  // $_REQUEST['admin_no']=1;
  $errMsg = "";
  try{
    require_once("connectg3.php");

    $sql = "select * from resv_order";
    $resvOrders  = $pdo->query($sql);
    $resvOrderRows = $resvOrders -> fetchAll(PDO::FETCH_ASSOC);

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
        <li class="breadcrumb-item">預約導覽管理</li>
        <li class="breadcrumb-item">預約單管理</li>

      </ol>
      <div class="container-fluid">
        <!-- 中間內容 -->
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">預約單管理</div>
      
              <div class="card-body">
                <table class="table table-responsive-sm table-bordered">
                  <thead>
                    <tr>
                      <th>預約編號</th>
                      <th>訂購日期</th>
                      <th>預約時段</th>
                      <th>預約人數</th>
                      <th>訂單狀態(0:已結束;1:未開始)</th>
                      <th>會員編號</th>
                      <th>訂購日期</th>
                      <th>到場狀態(0:未到場;1:已到場)</th>
                      <th colspan="2"></th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  
                  
<?php
if( $errMsg != ""){ //例外
        echo "<div><center>$errMsg</center></div>";
    }elseif($resvOrders->rowCount()==0){
        echo "<div><center>無預約單資料</center></div>";
    }else{
?>
<?php

  
    foreach( $resvOrderRows as $i => $resvOrderRow){
    
?>
                  <form action="updateResvOrderData.php">
                    <tr>
                      <td><?php echo $resvOrderRow['booking_no'];?><input name="booking_no" type="hidden" value="<?= $resvOrderRow['booking_no']?>" class="dissinputstyle"></td>
                      <td><input type="text" name="booking_date" value="<?= $resvOrderRow['booking_date']?>" readonly="true" class="dissinputstyle"></td>
                      <td><input type="text" name="tour_date" value="<?= $resvOrderRow['tour_date']?>" readonly="true" class="dissinputstyle"></td>
                      <td><input type="number" name="number_of_booking" value="<?= $resvOrderRow['number_of_booking']?>" readonly="true" class="dissinputstyle"></td>
                      <td><input type="number" name="order_status" value="<?= $resvOrderRow['order_status']?>" readonly="true" class="dissinputstyle" min="0" max="1" required></td>
                      <td><input type="text" name="member_id" value="<?= $resvOrderRow['member_id']?>" readonly="true" class="dissinputstyle"></td>
                      <td><input type="text" name="session_no" value="<?= $resvOrderRow['session_no']?>" readonly="true" class="dissinputstyle"></td>
                      <td><input type="number" name="resv_status" value="<?= $resvOrderRow['resv_status']?>" readonly="true" class="dissinputstyle" min="0" max="1" required></td>
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
        e.target.parentNode.parentNode.children[4].firstChild.removeAttribute("readonly");   
        e.target.parentNode.parentNode.children[7].firstChild.removeAttribute("readonly");
        e.target.parentNode.parentNode.children[4].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[7].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[9].firstChild.removeAttribute("disabled");
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