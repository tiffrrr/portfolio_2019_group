<?php
$errMsg = "";
try {
    $dsn = "mysql:host=localhost;port=3306;dbname=dd102g3;charset=utf8";
    $user = "root";
    $password = "123456";
    $options = array(PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION, PDO::ATTR_CASE=>PDO::CASE_NATURAL);
    $pdo = new PDO($dsn, $user, $password, $options);

    $sql_msg_user = 
    "select message.msg_content,message.msg_date,user.user_name,user.my_animal_img,user.my_animal_bg_img
    from message,user
    where message.user_no=user.user_no";
    $msg_user = $pdo->prepare($sql_msg_user);
    $msg_user ->execute();

    
    // $sql_user_ctn = 
    // "select user.user_name,user.my_animal_img,user.my_animal_bg_img,collections.vote,collections.work_name,collections.bg_img,collections.cmp_img
    // from user,collections
    // where collections.user_no=user.user_no";
    $sql_user_ctn = 
    "select u.user_name, u.my_animal_img,u.my_animal_bg_img,c.vote,c.work_name,c.bg_img,c.cmp_img
    from user u,collections c
    where c.user_no=u.user_no and YEAR(work_date) = 2019 
    order by c.vote desc";

    $user_ctn = $pdo->prepare($sql_user_ctn);
    $user_ctn ->execute();


    $item = "select count(*) from collections";
$result = $pdo->query($item);
$result ->bindColumn(1,$totalRecord);
$result->fetch();

$recPerPage = 6;

$totalPage = ceil($totalRecord/$recPerPage);

if(isset($_GET["work_date"])==false)
$work_date=1;
else
$work_date=$_GET["work_date"];

$start = ($work_date-1) * $recPerPage;
$items = "select * from collections order by work_date limit $start,$recPerPage";
$collections = $pdo->query($items);


} catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>


<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/owl.theme.default.min.css">
  <link rel="stylesheet" href="css/owl.carousel.min.css">
  
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="js/plugin/owl.carousel.min.js"></script>
  <script src="js/frank/frank.js"></script>
  

  
  <title>Document</title>
</head>
<body class="frank_body">
<?php
    if( $errMsg != ""){
        echo "<center>$errMsg</center>";
        exit();
    }?>



        <canvas class="world" id="world" width="1920" height="227"></canvas>
    @@include('template/header.html')


    <section class="frank_message" id="frank_message">
        <div class="frank_message_container">   
            <div class="frank_message_title">
                <h3>留言板</h3> 
                <img src="img/frank/close-button.png" alt="close" class="frank_closs_btn">
            </div>
            <div class="frank_message_content">
                <?php
                        while($msg_userRow = $msg_user -> fetch(PDO::FETCH_ASSOC)){
                    ?><div class="frank_message_wrap" id="message_wrap">
                     <figure class="frank_mem_pic"<?=$msg_userRow["my_animal_bg_img"]?>>
                   
                     <img src="<?=$msg_userRow["my_animal_img"]?>" alt="pinkbird">
                    </figure>
                    <div class="frank_mem_text">
                        <div class="frank_megsage_memname">
                            <p id="frank_message_memId"><?=$msg_userRow["user_name"]?></p>
                            <p class="frank_message_date"><?=$msg_userRow["msg_date"]?></p> 
                        </div>
                        <div class="frank_message_box">
                            <p class="frank_message_text">
                            <?=$msg_userRow["msg_content"]?>
                            </p>  
                        </div> 
                     
                        <div class="frank_message_btn">
                            <span class="btn_cloudb">檢舉
                                @@include('template/btn_sp.html')
                            </span>
                        </div>
                    </div>
                </div> 
                <?php
                        }
                     ?>  
            </div>
            <div class="message_wrap_input">
                <input type="text" id="input_text" placeholder="最多30字數" maxlength="30">
                <div class="message_input_btn">
                    <span href="#" class="btn_cloudb">留言
                        @@include('template/btn_sp.html')
                    </a>
                </div>
            </div> 
        </div>  
       
    </section>
    <section class="franks_banner">
        <div class="container">
            <div class="banner_cloud">
                <img class="icon_l" src="img/header/banner_icon_l.png" alt="icon">
                <h1 class="title">怪奇排行</h1>
                <img class="icon_r" src="img/header/banner_icon_r.png" alt="icon">
            </div>
        
    
            <div class="frank_banner">
                <div class="frank_banner_pic">
                    <img src="img/frank/Koala.png" alt="koala">
                    <div class="frank_wing">
                        <img src="img/frank/koala_wing.png" alt="wing"></div>
                </div>
                <div class="frank_banner_text">
                    <h3>歡迎來到怪奇排行榜～一起來看看誰的動物最特別吧！</h3>
                </div>
            </div>
        </div>
        
    </section>


    <section class="frank">
        <div class="frank_container" id="frank_container">
            <div class="frank_top_wrap">
                <div class="frank_top_title">
                    <h2>每月前三名</h2>
                    
                </div>
                <div class="frank_top_content">
                    <select class="frank_search_month">
                        <option value="2019_9" selected>2019年9月</option>
                        <option value="2019_8">2019年8月</option>
                    </select>
                </div>
        
            </div>
           
            <div class="frank_top_three owl-theme" id="owl-demo">
           
                  
            
            <?php
                for($i=0;$i<1;$i++){
                    
                    $user_ctnRow = $user_ctn -> fetch(PDO::FETCH_ASSOC)
                ?> 
            

                    
                <div class="frank_top_left item" id="frank_top_left">
              
                    <div class="frank_top_wraps">
                        <div class="frank_items_title">
                            <h3>第一名</h3>
                            <span>投票數</span>
                            
                            <span><?=$user_ctnRow["vote"]?></span>
                        </div>
                        
               
               
                        <div class="frank_top_background">
                            <img src="<?=$user_ctnRow["bg_img"]?>" alt="">
                            <div class="frank_items_text">
                                <div class="frank_items_animal">
                                    <img src="<?=$user_ctnRow["cmp_img"]?>" alt="pinkbird">
                                </div>
                               
                                <div class="frank_items_name">
                                    <h3>動物：<?=$user_ctnRow["work_name"]?></h3>
                                    <h3>會員：<?=$user_ctnRow["user_name"]?></h3>
                                </div>
                                
                            </div>
                        </div>
                   
                   
                        <div class="frank_top_btn">
                            <div class="frank_Collection_btn">
                                    <img src="img/frank/wlike.png" alt="collection" class="heart"  title="加入收藏">
                            </div>
                            <div class="frank_message_btn">
                                <span class="btn_cloudp" id="frank_message_btn">留言
                                    @@include('template/btn_sp.html')
                                </span>
                            </div>
                            <div class="frank_vote_btn">
                                <span href="#" class="btn_cloudb">投票
                                    @@include('template/btn_sp.html')
                                </span>
                            </div>
                        </div>      
                        <div class="frank_top_pic">
                            <img src="img/frank/NO.2island.png" alt="island">
                        </div>
                    </div>
                    <div class="frank_pic_shadow"></div>
                </div>
                
              <?php
                }
                ?>
                <?php
                for($i=0;$i<1;$i++){
                    
                    $user_ctnRow = $user_ctn -> fetch(PDO::FETCH_ASSOC)
                ?> 
                <div class="frank_top_middle item" id="frank_top_middle" >
                
                <div class="frank_top_wraps">
                    <div class="frank_items_title">
                        <h3>第二名</h3>
                        <span>投票數</span>
                        <span><?=$user_ctnRow["vote"]?></span>
                    </div>
                    <div class="frank_top_background">
                        <img src="<?=$user_ctnRow["bg_img"]?>" alt="">
                        <div class="frank_items_text">
                            <div class="frank_items_animal">
                                <img src="<?=$user_ctnRow["cmp_img"]?>" alt="pinkbird">
                            </div>
                            <div class="frank_items_name">
                                <h3>動物：<?=$user_ctnRow["work_name"]?></h3>
                                <h3>會員：<?=$user_ctnRow["user_name"]?></h3>
                            </div>
                        </div>
                    </div>
                    
                    <div class="frank_top_btn">
                        <div class="frank_Collection_btn">
                            <img src="img/frank/wlike.png" alt="collection" class="heart" title="加入收藏">
                        </div>
                        <div class="frank_message_btn">
                            <span href="#" class="btn_cloudp" id="frank_message_btn">留言
                                @@include('template/btn_sp.html')
                            </span>
                        </div>
                        <div class="frank_vote_btn">
                            <span href="#" class="btn_cloudb">投票
                                @@include('template/btn_sp.html')
                            </span>
                        </div>                                                  
                    </div>
                    <div class="frank_top_pic">
                        <img src="img/frank/NO.2island.png" alt="island">
                    </div>
                </div>
                <div class="frank_pic_shadow"></div>
                </div>
                <?php
                }
                ?>
                <?php
                for($i=0;$i<1;$i++){
                    
                    $user_ctnRow = $user_ctn -> fetch(PDO::FETCH_ASSOC)
                ?> 
                <div class="frank_top_right item" id="frank_top_right" >
                
                    <div class="frank_top_wraps">
                        <div class="frank_items_title">
                            <h3>第三名</h3>
                            <span>投票數</span>
                            <span><?=$user_ctnRow["vote"]?></span>
                        </div>
                        <div class="frank_top_background">
                        <img src="<?=$user_ctnRow["bg_img"]?>" alt="">
                        <div class="frank_items_text">
                            <div class="frank_items_animal">
                                <img src="<?=$user_ctnRow["cmp_img"]?>" alt="pinkbird">
                            </div>
                            <div class="frank_items_name">
                                <h3>動物：<?=$user_ctnRow["work_name"]?></h3>
                                <h3>會員：<?=$user_ctnRow["user_name"]?></h3>
                            </div>
                        </div>
                    </div>
                        
                        <div class="frank_top_btn">
                            <div class="frank_Collection_btn">
                                <img src="img/frank/wlike.png" alt="collection" class="heart" title="加入收藏">
                            </div>
                            <div class="frank_message_btn">
                                <span href="#" class="btn_cloudp">留言
                                    @@include('template/btn_sp.html')
                                </span>
                            </div>
                            <div class="frank_vote_btn">
                                <span href="#" class="btn_cloudb">投票
                                    @@include('template/btn_sp.html')
                                </span>
                            </div>
                        </div>
                        <div class="frank_top_pic">
                            <img src="img/frank/NO.2island.png" alt="island">
                        </div>
                    </div>
                    <div class="frank_pic_shadow"></div>
                </div>
               <?php
                }
                ?>
            </div>
        </div>
    </section>

    <section class="frank">
        <div class="frank_container">
            <div class="frank_activity_wrap">
                <div class="frank_activity_title">
                    <h2>活動說明</h2>
                </div>
            </div>
            
                <div class="frank_activity_content">
                    <div class="frank_activity_cactus">
                        <img src="img/frank/cactus.png" alt="cactus">
                    </div>
                    
                        <div class="frank_activity_description">
                            <div class="frank_description_text">
                                <h3>參賽條件</h3>
                                <p>特製自己的動物並且是會員。</h3>
                                <p>會員每日三票。</h3>
                                <p>前三名將會在商城裡上架販售。</p>
                                <div class="frank_activity_data">
                                    <h3>活動日期</h3>
                                    <p>2019年07月</p>
                                </div>
                            </div>
                        </div>
                    
                    <div class="frank_activity_btn">
                        <div class="frank_activity_frog">
                            <img src="img/frank/frog.png" alt="frog"> 
                            <div class="frank_frog_shadow"></div>
                        </div>
                        <div class="frank_activity_participate">
                            <span href="#" class="btn_cloudp">參加選怪
                                @@include('template/btn_sp.html') 

                            </span>
                        </div>
                        <div class="frank_activity_buy">
                            <span href="#" class="btn_cloudp">購買前三名商品
                                @@include('template/btn_sp.html')   
                            </span>
                        </div>
                        <div class="frank_activity_customization">
                            <span href="#" class="btn_cloudp">前往客製動物
                                @@include('template/btn_sp.html') 
                            </span>
                        </div>
                    </div>          
                </div>
            
        </div>
    </section>
    <section class="frank_player">
        <div class="frank_container">
            <div class="frank_player_wrap">
                <div class="frank_player_title">
                    <h2>更多參賽者</h2>
                </div>
                <div class="frank_player_content">    
                    <select class="frank_player_search">
                        <option value="" selected>參賽日期</option>
                        <option value="2019_9" >2019年9月</option>
                        <option value="2019_8">2019年8月</option>
                    </select> 
                </div>
            </div>
           


                
                    <div class="frank_player_more">
          
                    <?php
                    while( $user_ctnRow = $user_ctn -> fetch(PDO::FETCH_ASSOC)){

                    ?>
                    
                            
                       <div class="frank_player_items">   
                                <div class="frank_players_title">
                                        <span>動物：</span>
                                        <span><?=$user_ctnRow["work_name"]?></span>
                                    </div>
                       
                                    <div class="frank_player_card ">
                                        <div class="frank_player_front">
                                                
                                            <div class="frank_player_pic">
                                                <img src="<?=$user_ctnRow["bg_img"]?>" alt="">
                                                <div class="frank_player_animal">
                                                    <img src="<?=$user_ctnRow["cmp_img"]?>" alt="pinkbird">
                                                </div>
                                               
                                            </div>
                                                      
                                 
                                            <div class="frank_player_text">
                                                <h3>會員：<?=$user_ctnRow["user_name"]?></h3>
                                               
                                                <span>目前投票數</span>
                                               
                    
                                                <span><?=$user_ctnRow["vote"]?></span>
                                               
                                            </div>
                                           
                                             
                                            <div class="frank_expand_arrow">
                                                <img src="img/frank/expand-arrow.png" alt="expand-arrow">
                                            </div>
                                        </div>
                        
                                        <div class="frank_player_back">
                                            <div class="frank_back_text">
                                                <div class="frank_back_top">
                                                    <h3>生存能力</h3>
                                                </div>
                                                
                                                
                                                <div class="frank_back_jump">
                                                    <span>跳躍力</span>
                                                    <img src="img/frank/jump.png" alt="jump">
                                                </div>
                                                <div class="frank_back_life">
                                                    <span>生命力</span>
                                                    <img src="img/frank/life.png" alt="life">
                                                </div>
                                            </div>
                                            <div class="frank_back_pic">
                                                <h3>適應環境</h3>
                                                <p>森林</p>
                                                <div class="frank_back_img">
                                                    <img src="img/frank/adapt.png" alt="adpat">
                                                </div>
                                                <div class="frank_back_terrain">
                                                    <span>沙漠</span>
                                                    <span>平原</span>
                                                </div>
                                            </div>
                                            <div class="frank_back_btn">
                                                <span class="btn_cloudp">去玩遊戲
                                                    @@include('template/btn_sp.html')
                                                </span>
                                            </div>  
                                            <div class="frank_expand_button">
                                                <img src="img/frank/expand-button.png" alt="expand-button">
                                            </div>  
                                        </div>
                                    </div>
                                    
                                    <div class="frank_player_btn">
                                            <div class="frank_message_btn">
                                                <span class="btn_cloudp">留言
                                                    @@include('template/btn_sp.html')
                                                </span>
                                            </div>
                                            <div class="frank_vote_btn">
                                                <span class="btn_cloudb">投票
                                                    @@include('template/btn_sp.html')
                                                </span>
                                            </div>
                                            <div class="frank_Collection_btn">
                                                <span>
                                                    <img src="img/frank/wlike.png" alt="collection" class="heart" title="加入收藏">
                                                </span>
                                            </div>
                                        </div>
                                </div> 
                       
                              <?php
                    }
                    ?>
                    
                    <div style="display:compact;text-align:center;margin:auto;">
                       <?php
                       echo "<a href='?work_date=1' onclick='return false'>第一頁</a>&nbsp";
                       for($i=1;$i<= $totalPage;$i++){
                           if($i==$work_date)
                            echo "<a href='?work_date=$i' style='color:deepPink' onclick='return false'>",$i,"</a>&nbsp&nbsp";
                           else
                            echo "<a href='?work_date=$i'onclick='return false'>",$i,"</a>&nbsp&nbsp";
                       }
                       echo "<a href='?work_date=$totalPage' onclick='return false' javascript:'void(0)'>最後一頁</a>&nbsp";
                       ?>
                     </div>
            </div>
        </div>
    </section>
  
     @@include('template/footer.html')
</body>
</html>