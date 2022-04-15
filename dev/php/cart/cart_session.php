<?php
session_start();

try{
    if(isset($_GET['data'])){
        $add=$_GET['data'];
        $add=json_decode($add);
        if(isset($_SESSION['cart'][$add->name])){
            $_SESSION['cart'][$add->name]->num= (int)$_SESSION['cart'][$add->name]->num+1;
          
        }else{
            $_SESSION['cart'][$add->name]=$add;
        }
       
        print_r( $_SESSION['cart']);
    
    }else if(isset($_GET['num'])){
        $data=$_GET['num'];
        $id=explode(",",$data)[0];
        $num=(int)explode(",",$data)[1];

        $_SESSION['cart'][$id]->num=$num;
        echo  (int)$_SESSION['cart'][$id]->num *  (int)$_SESSION['cart'][$id]->prodInfo[2];


    }else if(isset($_GET['delete'])){
        $delete=$_GET['delete'];
        unset($_SESSION['cart'][$delete]);
        // // print_r( $_SESSION['cart']);
        // echo count($_SESSION['cart']);

        if(count($_SESSION['cart']) == 0 && isset($_SESSION['user_no'])){
            unset($_SESSION['cart']);
        }else if(count($_SESSION['cart']) == 0 && !isset($_SESSION['user_no'])){
            session_destroy();
        };
    }
}catch(PDOException $e){
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>