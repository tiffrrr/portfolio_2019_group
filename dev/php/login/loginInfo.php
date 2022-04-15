<?php 
session_start();

if(isset($_SESSION['user_no'])){
    echo $_SESSION['user_no'];
}else{
    echo "not login";
}
?>