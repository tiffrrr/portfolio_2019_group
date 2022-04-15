<?php
$errMsg = "";
try {
    require_once("../connectg3.php");
    session_start();
//     // $userItems = $pdo->prepare('SELECT * FROM `user` WHERE user_no = :user_no');
//     // $userItems ->bindValue(':user_no',$_SESSION['user_no']);
//     // $userItems ->execute();
//     // if($_SESSION['username']==null){
//     //     header("Location:home.php");
//     // }
//     // $server
//     // $upload_dir = "img/collections//";  
//     // if( ! file_exists($upload_dir )){
//     //     mkdir($upload_dir);
//     // };
//     // $sql_ctn = "INSERT INTO `collections` (`user_no`,`user_name`,`my_animal_img`,`my_animal_bg_img`) 
//     // SELECT `user_no`,`user_name`
//     // FROM `user`";
//     // $ctn_insert = $pdo->prepare($sql_ctn);
//     // $ctn_insert ->execute();
//     // $sql_msg_user = 
//     // "select message.msg_content,message.msg_date,user.user_name,user.my_animal_img,user.my_animal_bg_img
//     // from message,user
//     // where message.user_no=user.user_no";
//     // $msg_user = $pdo->prepare($sql_msg_user);
//     // $msg_user ->execute();

    $sql_user_ctn = 
    "select u.user_name, u.my_animal_img,u.my_animal_bg_img,c.vote,c.work_name,c.bg_img,c.cmp_img
    from user u,collections c
    where c.user_no=u.user_no and YEAR(work_date) = 2019 
    order by c.vote desc";
    $user_ctn = $pdo->prepare($sql_user_ctn);
    $user_ctn ->execute();

//     // $sql_vote = "SELECT user.last_vote_date , user.vote_remain FROM user where user_no='1' ";
//     // $user_vote = $pdo->prepare($sql_vote);
//     // $user_vote ->execute();
//     // $sql_rank = 
//     // "select c.bg_img,c.cmp_img
//     // from collections c
//     // where  YEAR(work_date) = 2019 
//     // order by c.vote desc";
//     // $user_rank = $pdo->prepare($sql_rank);
//     // $user_rank ->execute();

    
}
catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
// //留言
// if( $errMsg != ""){
//     echo "<center>$errMsg</center>";
//     exit();}

//     while($msg_userRow = $msg_user -> fetch(PDO::FETCH_ASSOC)){
//     $msg_userRow["my_animal_bg_img"];
//     $msg_userRow["my_animal_img"];
//     $msg_userRow["user_name"];
//     $msg_userRow["msg_date"];
//     $msg_userRow["msg_content"];
// }

// //第一二三名
for($i=0;$i<3;$i++){
    $user_ctnRow[$i] = $user_ctn -> fetch(PDO::FETCH_ASSOC);
    // $user_ctnRow[$i]["vote"];
    // $user_ctnRow[$i]["bg_img"];
    // $user_ctnRow[$i]["cmp_img"];
    // $user_ctnRow[$i]["work_name"];
    // $user_ctnRow[$i]["user_name"];
};

// for($i=0;$i<3;$i++){
//     $user_ctnRow[$i] = $user_ctn -> fetch(PDO::FETCH_ASSOC);
//    };
$j=4;
while( $user_ctnRow[$j]= $user_ctn -> fetch(PDO::FETCH_ASSOC)){
   $j++;
//    echo json_encode( "123");
    // $user_ctnRow["work_name"];
    // $user_ctnRow["bg_img"];
    // $user_ctnRow["cmp_img"];
    // $user_ctnRow["user_name"];
    // $user_ctnRow["vote"];
    
}
echo json_encode( $user_ctnRow );
?>