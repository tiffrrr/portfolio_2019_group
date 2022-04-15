<?php
try {
		require_once("connectg3.php");
		//啟動交易管理
		// $pdo->beginTransaction();
		//寫入訂單主檔
		//INSERT INTO `bookorder` (`orderNo`, `orderMemNo`, `orderTime`, `email`, `payStatus`) VALUES
		
		
		$sql = "insert into prompts (hint_no, hint_question) values (null, :hint_question)";
		$newPrompts = $pdo->prepare($sql);
		$newPrompts->bindValue(":hint_question",$_REQUEST['hint_question']);
		$newPrompts->execute();
		//取得自動創號的管理員號碼
        $hint_no = $pdo->lastInsertId();
        echo "新增管理員成功";
    	header('Location:prompts.php');
	} catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
		$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
		// $pdo->rollback();
	}

?>