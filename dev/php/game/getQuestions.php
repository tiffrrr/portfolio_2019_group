<?php
    try{
        $errMsg = "";
        require_once('../connectg3.php');
        $sql = "select question_name, question_option1, question_option2, question_option3, question_option4, question_ans, ans_description from game_question";
        $questionData = $pdo->query($sql);
        $questionArray = [];
        while($questionRow=$questionData->fetch(PDO::FETCH_ASSOC)){
            $questionArray[] = $questionRow;
        }

        // $memRow = $userData->fetch(PDO::FETCH_ASSOC);
            echo json_encode($questionArray);
 	
    }catch(PDOExeption $e){
        $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
        $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    }
?>