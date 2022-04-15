<?php
$errMsg = "";

try {
		require_once("connectg3.php");
		//啟動交易管理
		// $pdo->beginTransaction();
		//刪除表單傳送 GET 值
        $sql = "DELETE FROM game_question WHERE question_no =:question_no";
        $deleteGameQuestion = $pdo->prepare($sql);
        $deleteGameQuestion->bindValue(":question_no", $_REQUEST["question_no"]);

		$deleteGameQuestion->execute();
        echo "刪除題庫成功";
    	header('Location:gameQuestion.php');
	} catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
		$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
		// $pdo->rollback();
	}

?>