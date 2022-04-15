<?php
  // $_REQUEST['admin_no']=1;
  $errMsg = "";
  try{
    require_once("connectg3.php");

    $sql = "select * from unavailable_date";
    $unavailableDates = $pdo->query($sql);
    $unavailableDateRows = $unavailableDates -> fetchAll(PDO::FETCH_ASSOC);

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
        <li class="breadcrumb-item">預約日期管理</li>

      </ol>
      <div class="container-fluid">
        <!-- 中間內容 -->
        <div class="row">
          <div class="col-md-12"> 
            <div class="card">
              <div class="card-header">預約日期管理</div>
      
              <div class="card-body">
                <table class="table table-responsive-sm table-bordered">
                  <thead>
                    <tr>
                      <th>不可預約日期編號</th>
                      <th>日期</th>
                      <th colspan="2"></th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  <form action="addUnavailableDateData.php">
                    <tr> 
                      <td>
      
                      </td>
                      <td>
                        <input type="date" name="date_unavailable" id="" required>
                      </td>
                      <td colspan="3">
                        <input class="btn btn-block btn-outline-primary addbtn" type="submit" value="新增">
                      </td>
                    </tr>
                  </form>

                  
                  
<?php
if( $errMsg != ""){ //例外
        echo "<div><center>$errMsg</center></div>";
    }elseif($unavailableDates->rowCount()==0){
        echo "<div><center>無不可預約日期資料</center></div>";
    }else{
?>
<?php

  
    foreach( $unavailableDateRows as $i => $unavailableDatesRow){
    
?>
                  <form action="updateUnavailableDate.php">
                    <tr>
                      <td><?php echo $unavailableDatesRow['date_no'];?><input name="date_no" type="hidden" value="<?= $unavailableDatesRow['date_no']?>"></td>
                      <td><input class="dissinputstyle" type="date" name="date_unavailable" value="<?= $unavailableDatesRow['date_unavailable']?>" readonly="true" required></td>
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
        e.target.parentNode.parentNode.children[1].firstChild.removeAttribute("readonly");
        e.target.parentNode.parentNode.children[1].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[3].firstChild.removeAttribute("disabled");   
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