<?php 
$errMsg = "";
try {
	require_once('php/connectg3.php');
    $prods  = $pdo->query("select * from product where product_status=1");
    $prodsRow=$prods->fetchAll(PDO::FETCH_ASSOC);
    // echo json_encode($prodsRow);

    $imgs  = $pdo->query("select cmp_img,amlbg_img from collections order by vote desc limit 3");
    
    // echo json_encode($imgRow);
    // print_r($prodsRow);
?>
<?php
} catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}



?>    
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>動物商城</title>
    @@include('template/csslink.html')
    <script src="js/shop/shop.js"></script>
    <style>
        * {
            /* outline: 1px solid #f00; */
        }
    </style>
</head>

<body class="shop" id="shop">
    @@include('template/header.html')
    <section class="banner">
        <div class="container">
            <div class="banner_title">
                <img class="icon_l" src="img/header/banner_icon_l.png" alt="">
                <h1 class="title">動物商城</h1>
                <img class="icon_r" src="img/header/banner_icon_r.png" alt="">
            </div>
            <div class="banner_text">
                <div class="guide_animal">
                    <div class="guide_animal_animal">
                        <img src="img/shop/animal2.png" alt="">
                    </div>
                    <div class="guide_animal_cloud">
                        <img src="img/shop/titleCloud.png" alt="">
                    </div>
                </div>
                <p>在這裡你可以印製專屬商品哦~趕快來逛逛吧！</p>
            </div>

        </div>
        <div class="balloon">
            <img src="img/shop/balloon.png" alt="">
        </div>
        <img class="cloudl cloud" src="img/shop/cloud.png" alt="">
        <img class="cloudm cloud" src="img/shop/cloud.png" alt="">
        <img class="cloudr cloud" src="img/shop/cloud.png" alt="">

      
    </section>
    <section class="shop_area" id="shop_area">
        <img class="cloudbl cloud" src="img/shop/cloud.png" alt="">
        <img class="cloudbr cloud" src="img/shop/cloud.png" alt="">
        <div class="tent">
            <img src="img/shop/tent.png" alt="">
        </div>
        <div class="container">

            <div class="wrap">
                <div class="lights">
                    <img src="img/shop/lights.png">
                    <img src="img/shop/lights.png">
                    <img src="img/shop/lights.png">
                </div>
                <div class="choose_pic">
                    <h2>選擇商品</h2>
                    <p class='intro'>請選擇您想要印製的圖案:</p>
                    <div class="choose_pic_wrap">
                        <!-- 第一個我的動物，從session storage撈 -->
                    <div class="item">
                        <div class="pic">
                            <img class="shop_animal_bg" >
                        </div>
                        <p>我的動物</p>
                        <span><a href="modify.html">立即創造動物</a></span>
                    </div>


                    <!-- 選美前三名從資料庫撈 -->
                        <?php
                        if( $imgs->rowCount() == 0 ){
                            $imgName=['選美No.1','選美No.2','選美No.3'];
                            foreach ($imgName as $i => $value) {
                        ?>
                        <div class="item">
                            <div class="pic">
                                <img class="shop_animal_bg" src="img/member/user0_amlbg.png" alt="">
                            </div>
                            <p><?=$value?></p>
                        </div>
                        <?php
                            }
                        }else{ 
                            $imgRow=$imgs->fetchAll(PDO::FETCH_ASSOC);
                            $imgName=['選美No.1','選美No.2','選美No.3'];
                            foreach ($imgName as $i => $value) {
                        ?>
                        <div class="item">
                            <div class="pic">
                                <img class="shop_animal_bg" src=<?=$imgRow[$i]['amlbg_img'] ?> alt="">
                            </div>
                            <p><?=$value?></p>
                        </div>
                        <?php
                            }
                        }
                        ?>

                </div>
                </div>
                <div class="choose_bgpic">
                    <p class="intro">
                        請選擇圖案是否要背景圖片：<br>
                        <input type="radio" name="bgpic" checked>我要背景圖片
                        <input type="radio" name="bgpic" >我不要背景圖片
                    </p>

                </div>
                <div class="choose_product">
                <?php 
                
                foreach ($prodsRow as $i => $data) {
                    $name=explode(".",explode("/",$prodsRow[$i]['product_img'])[2])[0];    //cup/pillow/hat/bag
                    $prodData=[$prodsRow[$i]['product_no'],$prodsRow[$i]['product_name'],$prodsRow[$i]['product_img'],$prodsRow[$i]['product_price']];
                ?>
                    <div class="item" id=<?=$name?> >
                        <div class="deco deco_top" ></div>
                        <h3><?=$prodsRow[$i]['product_name']?></h3>
                        <div class="prod_img">
                            <img class="prod_plain" src=<?=$prodsRow[$i]['product_img']?> alt="">
                            <div class=<?="pic_chosen"?>>
                                <img class="shop_animal_bg" src=<?=$imgRow[0]['amlbg_img']?>  alt="">
                                <!-- <img class="shop_animal" src="img/shop/animal1.png" alt=""> -->
                            </div>
                        </div>
                        <p class="price"><?=$prodsRow[$i]['product_price']?></p>
                        <div class="number">
                            <button  class="minus_num">-</button>
                            <input class="prod_num" type="number" value="1">
                            <button  class="add_num">+</button>
                        </div>
                        <div class="btn">
                            <a class="btn_cloudb view_detail">查看詳情@@include('template/btn_sp.html')</a>
                            <a class="btn_cloudp add_cart">加入購物車@@include('template/btn_sp.html')</a>
                            <input class='prod_data' name='prod_data' type="hidden" value=<?=json_encode($prodData)?>>
                            <input class='prod_desc' name='prod_desc' type="hidden" value=<?=$prodsRow[$i]['product_description']?>>
                        </div>
                        <div class="deco deco_bottom"></div>
                    </div>
                <?php  }?>
                </div>
            </div>
        </div>
    </section>
    <!-- 商品詳情 -->
    <div class="prod_detail" id="prod_detail">
        <div class="detail_container">
            <button class="back_button">X</button>
            <div class="wrap">
                <div class="title">
                    <img src="img/shop/sign_board.png" alt="">
                    <p>商品詳情</p>
                </div>
                <div class="prod_img">
                    <img class="prod_plain" src="img/shop/pillow.png" alt="">
                    <div id='detail_pic_chosen' class="pic_chosen">
                        <img class="shop_animal_bg"  alt="">
                    </div>
                </div>
                <div class="prod_text">
                    <p></p>
                </div>
            </div>
        </div>
    </div>
    @@include('template/footer.html')
</body>

</html>

