<?php
$errMsg = "";
try {
    require_once("../connectg3.php");
    session_start();
    $sql_user_ctn = 
    "select u.user_name, u.my_animal_img,u.my_animal_bg_img,c.vote,c.work_name,c.bg_img,c.cmp_img,c.work_no,c.environ_img,c.work_life,c.work_jump,c.amlbg_img
    from user u,collections c
    where c.user_no=u.user_no and YEAR(work_date) = 2019 
    order by c.vote desc";
    $user_ctn = $pdo->prepare($sql_user_ctn);
    $user_ctn ->execute();
}
catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}

// $j=0;
// while( $user_ctnRow[$j]= $user_ctn -> fetch(PDO::FETCH_ASSOC)){
//    $j++;
// }
// array_splice($user_ctnRow,$j,1);
$user_ctnRow = $user_ctn -> fetchAll(PDO::FETCH_ASSOC);
echo json_encode( $user_ctnRow );
?>