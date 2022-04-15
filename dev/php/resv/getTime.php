<?php

try{
    if($_GET['data'] == 'time'){
        require_once('../connectg3.php');
        $time=$pdo->query('select * from resv_session_capacity');
        $timeRow=$time->fetchAll(PDO::FETCH_ASSOC);
        echo json_encode($timeRow);
    }else{
        $date=$_GET['data'];
        require_once('../connectg3.php');
        $NumRemain=$pdo->query("select tour_date,number_of_booking,session_no from resv_order where tour_date='{$date}'");
        if($NumRemain->rowCount() == 0){
            echo 'noResv';
        }else{
            $NumRemainRow=$NumRemain->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode($NumRemainRow); 
        };
    }

}catch (PDOException $e) {
	$errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
	$errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
?>