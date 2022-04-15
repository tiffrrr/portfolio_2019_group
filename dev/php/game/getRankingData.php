<?php
    try{
        $errMsg = "";
        require_once('../connectg3.php');
        $sql = "select user_name, user_id, game_record , my_animal_img, my_animal_name from user order by game_record desc";
        $userData = $pdo->query($sql);
        $array = [];
        for($i=0;$i<10;$i++){
            $memRow=$userData->fetch(PDO::FETCH_ASSOC);
            $array[] = $memRow;
        }

        // $memRow = $userData->fetch(PDO::FETCH_ASSOC);
            echo json_encode( $array );
 	
    }catch(PDOExeption $e){
        $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
        $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    }
?>


