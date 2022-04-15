<?php
  // $_REQUEST['admin_no']=1;
  $errMsg = "";
  try{
    require_once("connectg3.php");

    $sql = "select * from product_order";
    $productOrders  = $pdo->query($sql);
    $productOrderRows = $productOrders -> fetchAll(PDO::FETCH_ASSOC);

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
        <li class="breadcrumb-item">訂單管理</li>

      </ol>
      <div class="container-fluid">
        <!-- 中間內容 -->
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">訂單管理</div>
              <div class="card-body">
                <table class="table table-responsive-sm table-bordered">
                  <thead>
                    <tr class="aaa">
                      <th class="align-middle" width="300px">訂單編號</th>
                      <th class="align-middle">會員編號</th>
                      <th class="align-middle">訂單成立時間</th>
                      <th class="align-middle">訂單總金額</th>
                      <th class="align-middle" width="280px">訂單狀態<br>(0:處理中;1:已出貨)</th>
                      <th class="align-middle" width="280px">訂單付款狀態<br>(0:未付款;1:已付款)</th>
                      <th class="align-middle">收貨人姓名</th>
                      <th class="align-middle">收貨人手機</th>
                      <th class="align-middle">收貨人地址</th>
                      <th colspan="2"></th>
                    </tr>
                  </thead>
                  <tbody>
                  
                  
<?php
if( $errMsg != ""){ //例外
        echo "<div><center>$errMsg</center></div>";
    }elseif($productOrders->rowCount()==0){
        echo "<div><center>無商品訂單資料</center></div>";
    }else{
?>
<?php

  
    foreach( $productOrderRows as $i => $productOrderRow){
    
?>
                  <form action="updateProductOrderData.php" method="post">
                    <tr>
                      <td><?php echo $productOrderRow['order_no'];?><input name="order_no" type="hidden" value="<?= $productOrderRow['order_no']?>"></td>
                      <td><input type="text" name="user_no" value="<?= $productOrderRow['user_no']?>" readonly="true" class="dissinputstyle"></td>
                      <td><input type="text" name="order_date" value="<?= $productOrderRow['order_date']?>" readonly="true" class="dissinputstyle"></td>
                      <td><input type="text" name="order_sum" value="<?= $productOrderRow['order_sum']?>" readonly="true" class="dissinputstyle"></td>
                      <td><input type="number" name="shipping_status" size="14" value="<?= $productOrderRow['shipping_status']?>" readonly="true" class="dissinputstyle" required min="0" max="1"></td>
                      <td><input type="number" name="payment_status" size="14" value="<?= $productOrderRow['payment_status']?>" readonly="true" class="dissinputstyle" required min="0" max="1"></td>
                      <td><input type="text" name="receiver_name" value="<?= $productOrderRow['receiver_name']?>" readonly="true" class="dissinputstyle"></td>
                      <td><input type="text" name="receiver_phone" value="<?= $productOrderRow['receiver_phone']?>" readonly="true" class="dissinputstyle"></td>
                      <td><input type="text" name="receiver_address" value="<?= $productOrderRow['receiver_address']?>" readonly="true" class="dissinputstyle"></td>
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
        e.target.parentNode.parentNode.children[5].firstChild.removeAttribute("readonly");
        e.target.parentNode.parentNode.children[4].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[5].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[10].firstChild.removeAttribute("disabled");
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