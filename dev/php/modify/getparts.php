<?php
    $errMsg="";
    try {
        require_once("../connectg3.php");
        
        $sql_head = "select * from head where head_status = 1";
        $sql_body = "select * from body where body_status = 1";
        $sql_leg = "select * from leg where leg_status = 1";
        $sql_tail = "select * from tail where tail_status = 1";
        $sql_background = "select * from background where bg_status = 1";


        $headdata = $pdo->query($sql_head);
        while ($partRows = $headdata -> fetch(PDO::FETCH_ASSOC)){
            $array['head'][] = $partRows;
        }

        $bodydata = $pdo->query($sql_body);
        while ($partRows = $bodydata -> fetch(PDO::FETCH_ASSOC)){
            $array['body'][] = $partRows;
        }

        $legdata = $pdo->query($sql_leg);
        while ($partRows = $legdata -> fetch(PDO::FETCH_ASSOC)){
            $array['leg'][] = $partRows;
        }

        $taildata = $pdo->query($sql_tail);
        while ($partRows = $taildata -> fetch(PDO::FETCH_ASSOC)){
            $array['tail'][] = $partRows;
        }

        $bgdata = $pdo->query($sql_background);
        while ($partRows = $bgdata -> fetch(PDO::FETCH_ASSOC)){
            $array['bg'][] = $partRows;
        }

        echo json_encode( $array );

    } catch (PDOException $e) {
        $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
        $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
        echo $errMsg;
    }


?>