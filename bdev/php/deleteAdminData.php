<?php

try {
		require_once("connectg3.php");
		//啟動交易管理
		// $pdo->beginTransaction();
		//刪除表單傳送 GET 值
        $sql = "DELETE FROM admin WHERE admin_no =:admin_no";
        $deleteAdmin = $pdo->prepare($sql);
        $deleteAdmin->bindValue(":admin_no", $_GET["admin_no"]);
        //$admin_member->bindValue(":admin_name", $_GET["admin_name"]);

		$deleteAdmin->execute();
        echo "刪除管理員成功";
    	header('Location:admin.php');
	} catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
		$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
		// $pdo->rollback();
	}

?>