<?php

    try {
        require_once("connectg3.php");
        
        $sql_head = "select * from head";
        $sql_body = "select * from body";
        $sql_foot = "select * from foot";
        $sql_tail = "select * from tail";

        $headdata = $pdo->query($sql_head);
        for($i=0;$i<4;$i++){
            $partRows = $headdata -> fetch(PDO::FETCH_ASSOC);
            $array1[$i] = $partRows;
        }
        echo print_r($array1);

        $bodydata = $pdo->query($sql_body);
        for($i=0;$i<4;$i++){
            $partRows = $bodydata -> fetch(PDO::FETCH_ASSOC);
            $array2[$body][$i] = $partRows;
        }
        echo print_r($array1);


        echo json_encode( $array );

    } catch (PDOException $e) {
        $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
        $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
    }


?>