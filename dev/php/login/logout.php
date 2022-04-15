<?php 
session_start();
if(isset($_SESSION['cart'])){
    unset($_SESSION['user_no']);
}else{
    session_destroy();
}

?>