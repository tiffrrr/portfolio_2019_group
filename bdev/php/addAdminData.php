<?php
try {
		require_once("connectg3.php");
		//啟動交易管理
		// $pdo->beginTransaction();
		//寫入訂單主檔
		//INSERT INTO `bookorder` (`orderNo`, `orderMemNo`, `orderTime`, `email`, `payStatus`) VALUES
		
		
		$sql = "insert into admin (admin_no, admin_name, admin_id ,admin_psw, admin_status) values (null, :admin_name, :admin_id, :admin_psw, :admin_status)";
		$newAdmin = $pdo->prepare($sql);
		$newAdmin->bindValue(":admin_name",$_REQUEST['admin_name']);
		$newAdmin->bindValue(":admin_id",$_REQUEST['admin_id']);
		$newAdmin->bindValue(":admin_psw",$_REQUEST['admin_psw']);
		$newAdmin->bindValue(":admin_status",$_REQUEST['admin_status']);
		$newAdmin->execute();
		//取得自動創號的管理員號碼
        $admin_no = $pdo->lastInsertId();
        echo "新增管理員成功";
    	header('Location:admin.php');
	} catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
		$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
		// $pdo->rollback();
	}

?>