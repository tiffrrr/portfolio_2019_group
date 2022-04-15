<?php
try {
		require_once("connectg3.php");
		//啟動交易管理
		// $pdo->beginTransaction();
		//寫入訂單主檔
		//INSERT INTO `bookorder` (`orderNo`, `orderMemNo`, `orderTime`, `email`, `payStatus`) VALUES
		
		
		$sql = "insert into resv_session_capacity (session_no, start_time, length, max_capacity) values (null, :start_time, :length, :max_capacity)";
		$newSession = $pdo->prepare($sql);
		$newSession->bindValue(":start_time",$_REQUEST['start_time']);
		$newSession->bindValue(":length",$_REQUEST['length']);
		$newSession->bindValue(":max_capacity",$_REQUEST['max_capacity']);
		$newSession->execute();
		//取得自動創號的導覽場次號碼
        $session_no = $pdo->lastInsertId();
        echo "新增導覽場次成功";
    	header('Location:resvSessionCapacity.php');
	} catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
		$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
		// $pdo->rollback();
	}

?>