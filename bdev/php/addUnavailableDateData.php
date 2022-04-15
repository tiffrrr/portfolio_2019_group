<?php
try {
		require_once("connectg3.php");
		//啟動交易管理
		// $pdo->beginTransaction();
		//寫入訂單主檔
		//INSERT INTO `bookorder` (`orderNo`, `orderMemNo`, `orderTime`, `email`, `payStatus`) VALUES
		
		
		$sql = "insert into unavailable_date (date_no, date_unavailable) values (null, :date_unavailable)";
		$newUnavailableDate = $pdo->prepare($sql);
		$newUnavailableDate->bindValue(":date_unavailable",$_REQUEST['date_unavailable']);
		$newUnavailableDate->execute();
		//取得自動創號的不可預約日期號碼
        $date_no = $pdo->lastInsertId();
        echo "新增導覽場次成功";
    	header('Location:unaviableDate.php');
	} catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
        $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
        echo $errMsg;
		// $pdo->rollback();
	}

?>