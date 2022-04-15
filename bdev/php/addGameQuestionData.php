<?php
$errMsg = "";
try {
		require_once("connectg3.php");
		
		
		$sql = "insert into game_question (question_no, question_name, question_option1, question_option2, question_option3, question_option4, question_ans, question_status, ans_description) values (null, :question_name, :question_option1, :question_option2, :question_option3, :question_option4, :question_ans, :question_status, :ans_description)";
		$newGameQuestion = $pdo->prepare($sql);
		$newGameQuestion->bindValue(":question_name",$_REQUEST['question_name']);
		$newGameQuestion->bindValue(":question_option1",$_REQUEST['question_option1']);
		$newGameQuestion->bindValue(":question_option2",$_REQUEST['question_option2']);
		$newGameQuestion->bindValue(":question_option3",$_REQUEST['question_option3']);
		$newGameQuestion->bindValue(":question_option4",$_REQUEST['question_option4']);
		$newGameQuestion->bindValue(":question_ans",$_REQUEST['question_ans']);
		$newGameQuestion->bindValue(":question_status",$_REQUEST['question_status']);
		$newGameQuestion->bindValue(":ans_description",$_REQUEST['ans_description']);
		$newGameQuestion->execute();
		//取得自動創號的地區號碼
        $question_no = $pdo->lastInsertId();
        echo "新增題庫成功";
    	header('Location:gameQuestion.php');
	} catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
		$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
        // $pdo->rollback();
        echo $errMsg;
	}

?>