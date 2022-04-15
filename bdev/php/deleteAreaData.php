<?php
$errMsg = "";

try {
		require_once("connectg3.php");
		//啟動交易管理
		// $pdo->beginTransaction();
		//刪除表單傳送 GET 值
        $sql = "DELETE FROM area WHERE area_no =:area_no";
        $deleteArea = $pdo->prepare($sql);
        $deleteArea->bindValue(":area_no", $_REQUEST["area_no"]);

		$deleteArea->execute();
        echo "刪除地區成功";
    	header('Location:area.php');
	} catch (PDOException $e) {
		$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
		$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
		// $pdo->rollback();
	}

?>