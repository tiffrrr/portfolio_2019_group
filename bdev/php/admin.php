<?php
  // $_REQUEST['admin_no']=1;
  $errMsg = "";
  try{
    require_once("connectg3.php");

    $sql = "select * from admin where admin_no != 1";
    $admins  = $pdo->query($sql);
    $adminRows = $admins -> fetchAll(PDO::FETCH_ASSOC);

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
        <li class="breadcrumb-item"><a href="#">HOME</a></li>
        <li class="breadcrumb-item active">管理員帳號管理</li>

      </ol>
      <div class="container-fluid">
        <!-- 中間內容 -->
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">管理員</div>
      
              <div class="card-body">
                <table class="table table-responsive-sm table-bordered">
                  <thead>
                    <tr>
                      <th>編號</th>
                      <th>姓名</th>
                      <th>帳號</th>
                      <th>密碼</th>
                      <th>狀態(0:停權; 1:正常)</th>
                      <th colspan="3"></th>
                      
                    </tr>
                  </thead>
                  <tbody>
                  <form action="addAdminData.php" method="post">
                    <tr> 
                      <td>
      
                      </td>
                      <td>
                        <input type="text" name="admin_name" id="" maxlength="10" required>
                      </td>
                      <td>
                        <input type="text" name="admin_id" id="" maxlength="10" required>
                      </td>
                      <td>
                        <input type="text" name="admin_psw" id="" maxlength="15" required>
                      </td>
                      <td>
                        <input type="number" name="admin_status" id="" required min="0" max="1" required>
                      </td>
                      <td colspan="3">
                        <input class="btn btn-block btn-outline-primary addbtn" type="submit" value="新增">
                      </td>
                    </tr>
                  </form>
<?php
if( $errMsg != ""){ //例外
        echo "<div><center>$errMsg</center></div>";
    }elseif($admins->rowCount()==0){
        echo "<div><center>無管理者資料</center></div>";
    }else{
?>
<?php

  
    foreach( $adminRows as $i => $adminRow){
    // $status = $adminRow['admin_status'] =='1' ?'on':'off';

      // echo "<pre>";
      // print_r($adminRow);
      // echo "</pre>";
?>
                  <form action="updateAdminData.php" method="post">
                    <tr>
                      <td><?php echo $adminRow['admin_no'];?><input name="admin_no" type="hidden" value="<?= $adminRow['admin_no']?>"></td>
                      <td><input type="text" class="dissinputstyle" name="admin_name" value="<?= $adminRow['admin_name']?>" readonly="true" maxlength="10" required></td>
                      <td><input type="text" class="dissinputstyle" name="admin_id" value="<?= $adminRow['admin_id']?>" readonly="true" maxlength="10" required></td>
                      <td><input type="text" class="dissinputstyle" name="admin_psw" value="<?= $adminRow['admin_psw']?>" readonly="true" maxlength="15" required></td>
                      <td><input type="number" class="dissinputstyle" name="admin_status" value="<?= $adminRow['admin_status']?>" readonly="true" required min="0" max="1"></td>
                      <td><input class="btn btn-block btn-outline-primary btn1" type="button" value="編輯"></td>
                      <td><input class="btn btn-block btn-outline-primary" type="submit"  value="修改完成" disabled></td>
                      </form>
                      <td>
                        <form action="deleteAdminData.php">
                            <input name="admin_no" type="hidden" value="<?= $adminRow['admin_no']?>">
                            <input class="btn btn-block btn-outline-primary" type="submit" value="刪除">
                        </form>

                        <!-- </div> -->
                      </td>
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
        e.target.parentNode.parentNode.children[3].firstChild.removeAttribute("readonly");   
        e.target.parentNode.parentNode.children[4].firstChild.removeAttribute("readonly");
        e.target.parentNode.parentNode.children[1].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[3].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[4].firstChild.classList.remove("dissinputstyle");
        e.target.parentNode.parentNode.children[6].firstChild.removeAttribute("disabled");

        // if (e.target.innerHTML == "編輯"){

        //     e.target.innerHTML = "完成";
        // }else if(e.target.innerHTML = "完成"){
            // console.log(e.target.parentNode.parentNode.children[0].innerText);
            // e.target.innerHTML = "修改";
            // var xhr = new XMLHttpRequest();
            // xhr.onload = function () {
            //     if (xhr.status == 200) {
                    //modify here
            //         console.log(xhr.responseText);
            //     } else {
            //         alert(xhr.status);
            //     }
            // }

            // var str1 = "admin_no="+ e.target.parentNode.parentNode.children[0].innerText;
            // var str2 = "&admin_name="+ e.target.parentNode.parentNode.children[1].firstChild.value;
            
            // var str3 = "&admin_psw="+ e.target.parentNode.parentNode.children[3].firstChild.value;
            // var str4 = "&admin_status="+ e.target.parentNode.parentNode.children[4].firstChild.value;
            // var url = "updateAdminData.php?"+str1+str2+str3+str4;
            // console.log(url);
            // xhr.open("Get", url, true);   
            // xhr.send(null);
            
        // } 
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