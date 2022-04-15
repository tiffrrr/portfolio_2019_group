<?php
// echo $_POST['data'];

try{
    require_once("../connectg3.php");
    if(isset($_GET['data'])){
        $sql='SELECT hint_question FROM `user`natural join prompts where  user_id=:user_id;';
        $user=$pdo->prepare($sql);
        $user->bindValue(':user_id',$_GET['data']);
        $user->execute();
        if($user->rowCount() == 0){
            echo 'none';
        }else{
            $qsn=$user->fetch(PDO::FETCH_NUM);
            echo $qsn[0];
        };


    }else if(isset($_GET['ans'])){
        $sql='SELECT hint_answer FROM `user` where  user_id=:user_id;';
        $ans=$pdo->prepare($sql);
        $ans->bindValue(':user_id',$_GET['id']);
        $ans->execute();
        $ansRow=$ans->fetch(PDO::FETCH_NUM);
        // echo $ansRow[0];
        if($ansRow[0] == $_GET['ans']){
            echo "ok";
        }else{
            echo '答案錯誤，請聯繫客服人員。';
        };

    }else{
        $sql='UPDATE `user` SET `user_psw` = :user_psw  WHERE `user`.`user_id` =:user_id;';
        $psw=$pdo->prepare($sql);
        $psw->bindValue(':user_id',$_GET['id']);
        $psw->bindValue(':user_psw',$_GET['psw']);
        $psw->execute();
        echo "密碼修改成功，請重新登入";
    }
    


}catch(PDOException $e){
    // echo $e->getMessage();
    echo "sysError";

}
?>