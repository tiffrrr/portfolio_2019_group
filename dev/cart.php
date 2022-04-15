<?php
session_start();

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    @@include('template/csslink.html')
    <script src="js/shop/cart.js"></script>
    <title>購物車</title>
    <style>
        * {
            /* outline: 1px solid #f00; */
        }
    </style>
</head>

<body class="cart">
    @@include('template/header.html')
    <section class="banner">
        <div class="container">
            <div class="banner_title">
                <img class="icon_l" src="img/header/banner_icon_l.png" alt="">
                <h1 class="title">購物車</h1>
                <img class="icon_r" src="img/header/banner_icon_r.png" alt="">
            </div>
        </div>
        <div class="balloon">
            <img src="img/shop/balloon.png" alt="">
        </div>
        <img class="cloudl cloud" src="img/shop/cloud.png" alt="">
        <img class="cloudm cloud" src="img/shop/cloud.png" alt="">
        <img class="cloudr cloud" src="img/shop/cloud.png" alt="">
    </section>
    <section class="cart_list">
        <div class="container">
            <div class="wrap">
                <div class="list_header">
                    <h2 class="col-md-2">商品圖片</h2>
                    <h2 class="col-md-2">商品名稱</h2>
                    <h2 class="col-md-2">單價</h2>
                    <h2 class="col-md-2">數量</h2>
                    <h2 class="col-md-2">小計</h2>
                    <h2 class="col-md-2">刪除</h2>
                </div>

                <?php 
                if(isset($_SESSION['cart']) && count($_SESSION['cart'])>0 ){
                foreach ($_SESSION['cart'] as $i => $n) {
                
                ?>
                <!-- 動態新增開始 -->
                <div class="list_row" id='<?=$i?>'>
                    <div class="prod_pic col-6 col-md-2">
                        <div class="pic_item">
                            <img class="shop_animal_bg" src="<?=$n->img?>" >
                            <img src="<?=$n->prodInfo[2]?>" alt="">
                        </div>
                    </div>
                    <div class="prod_info col-6 col-md-8">
                        <div class="prod_name "><span class="title_inline">商品名稱：</span><?=$n->prodInfo[1]?></div>
                        <div class="price"><span class="title_inline">商品單價：</span><?=$n->prodInfo[3]?></div>
                        <div class="number">
                            <span class="title_inline">商品數量：</span>
                            <div class="number_input">
                                <button class="minus_num">-</button>
                                <input class="prod_num" type="number" value="<?=$n->num?>">
                                <button class="add_num">+</button>
                            </div>
                        </div>
                        <div class="subTotal">
                            <span class="title_inline">商品小計：</span>
                            $<span class="subTotal_num"><?=$n->num*$n->prodInfo[3]?></span>
                        </div>
                    </div>
                    <div class="clearfix"></div>
                    <div class="prod_delete col-md-2">
                        <a class="btn_cloudb delete">刪除@@include('template/btn_sp.html')</a>
                    </div>
                    <div class="clearfix"></div>
                </div>
           
            <?php
                }?>
                <div class="total" >
                    <p>商品金額：$<span>100</span></p>
                    <p>+運費：$60</p>
                    <p>總金額為：$<span class="total_money"></span></p>
                </div>
            </div>
            <div class="cart_btn">
                <a class="btn_cloudy" href="shop.php">繼續購物@@include('template/btn_sp.html')</a>
                <a class="btn_cloudp" href="checkOrder.html">進行結帳@@include('template/btn_sp.html')</a>
            </div>
            <?php
            }
                else{
            ?>
                <div class="list_row" >
                    <p class='empty'>您尚未選擇商品</p>
                </div>
                </div>
                <div class="cart_btn">
                    <a class="btn_cloudy" href="shop.php">去購物@@include('template/btn_sp.html')</a>
                    <!-- <a class="btn_cloudp" href="checkOrder.html">進行結帳@@include('template/btn_sp.html')</a> -->
                </div>
            <?php
                    }
            ?>
            <!-- 動態新增結束 -->
           
        </div>
    </section>

    @@include('template/footer.html')
</body>

</html>