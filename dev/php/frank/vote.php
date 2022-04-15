<?php
$errMsg = "";
 $user_no=$_GET["user_no"];
 $work_no=$_GET["work_no"];
//$user_no=13;
try {
    require_once("../connectg3.php");
    session_start();

    $sql_user_ctn = 
    "select u.last_vote_date,u.vote_remain
    from user u
    where  u.user_no = {$user_no}  ";
    $user_ctn = $pdo->prepare($sql_user_ctn);
    $user_ctn ->execute();

    $sql_vote = 
    "select vote
    from collections
    where  work_no = {$work_no}  ";
    $vote_item = $pdo->prepare($sql_vote);
    $vote_item->execute();



}
catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}

$time=date("Y-m-d");
 $user_ctnRow= $user_ctn -> fetch(PDO::FETCH_ASSOC);
 $vote_box= $vote_item -> fetch(PDO::FETCH_ASSOC);

if($user_ctnRow['last_vote_date']>$time){
    echo json_encode( "error");
}else if($user_ctnRow['last_vote_date']==$time){
    if ($user_ctnRow['vote_remain']==3){
        echo json_encode( 3-$user_ctnRow['vote_remain']);

    }
    else
     if($user_ctnRow['vote_remain']<3){
        $user_ctnRow['vote_remain']=$user_ctnRow['vote_remain']+1;
        $sql_up="
            UPDATE `user` SET  `vote_remain` = '{$user_ctnRow['vote_remain']}' WHERE `user`.`user_no` = {$user_no} ;
            ";
            $user_ctn = $pdo->prepare($sql_up);
            $user_ctn ->execute();
        echo  json_encode( 3- $user_ctnRow['vote_remain']);
    
        $vote_box['vote']=$vote_box['vote']+1;
        $sql_vote_up="
       UPDATE `collections` SET `vote` = '{$vote_box['vote']}'
        WHERE `collections`.`work_no` = {$work_no};
       ";
        $user_vote_up = $pdo->prepare($sql_vote_up);
        $user_vote_up ->execute();
    }
    else if($user_ctnRow['vote_remain']>3){
        $vote_box['vote']=$vote_box['vote']+1;
        $sql_vote_up="
       UPDATE `collections` SET `vote` = '{$vote_box['vote']}'
        WHERE `collections`.`work_no` = {$work_no};
       ";
        $user_vote_up = $pdo->prepare($sql_vote_up);
        $user_vote_up ->execute();
        echo  json_encode("");
    }
   
 
}
else if ($user_ctnRow['last_vote_date']<$time){

  $sql_up="
  UPDATE `user` SET `last_vote_date` = '{$time}', `vote_remain` = '1' WHERE `user`.`user_no` = {$user_no} ;
  ";
  $user_ctn = $pdo->prepare($sql_up);
  $user_ctn ->execute();
 echo  json_encode(  "2");
 
 $vote_box['vote']=$vote_box['vote']+1;
 $sql_vote_up="
UPDATE `collections` SET `vote` = '{$vote_box['vote']}'
 WHERE `collections`.`work_no` = {$work_no};
";
 $user_vote_up = $pdo->prepare($sql_vote_up);
 $user_vote_up ->execute();

}

?>