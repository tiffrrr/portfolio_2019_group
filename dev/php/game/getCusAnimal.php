<?php 
    try{
        $errMsg = "";
        require_once('../connectg3.php');
        $sql = "select * from user where user_no=:user_no";
        $userData = $pdo->prepare($sql);
        $userData->bindValue(":user_no", $_GET["user_no"]);
        $userData->execute();

        if( $userData->rowCount() == 0 ){ //找不到
            echo "{}";
        }else{
            $memRow = $userData->fetch(PDO::FETCH_ASSOC);
            echo json_encode( $memRow );
        }	
    }catch(PDOExeption $e){
        $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
        $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    }

    



?>