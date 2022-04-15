<?php
session_start();

try{
    require_once("../connectg3.php");
    if(isset($_POST["user_psw"])){
        $sql='select * from user where user_id=:user_id and user_psw=:user_psw;';
        //  $sql='select * from user;';

        $user=$pdo->prepare($sql);
        $user->bindValue(':user_id',$_POST['user_id']);
        $user->bindValue(':user_psw',$_POST["user_psw"]);
        $user->execute();
        if($user->rowCount() == 0){
            echo 'loginError';
        }else{
            $userRow=$user->fetchAll(PDO::FETCH_ASSOC);
            $_SESSION['user_no']=$userRow[0]['user_no'];
            echo json_encode($userRow);
        };
    }else{
        $sql='select * from user where user_no=:user_no;';
        $user=$pdo->prepare($sql);
        $user->bindValue(':user_no',$_SESSION['user_no']);
        $user->execute();
        $userRow=$user->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($userRow);
    }

}catch(PDOException $e){
    // echo $e->getMessage();
    echo "sysError";

}
?>