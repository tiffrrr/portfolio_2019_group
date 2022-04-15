<?php


//設定要上傳的php伺服器的資料夾路徑，如果路徑上沒有此資料，則新建一個
    $upload_dir = "../../img/customize//";  
    if( ! file_exists($upload_dir )){
        mkdir($upload_dir);
    }

// 以下為儲存動物的部分，用一般input text的單筆資料送的：
//收到convas.toDataURL()送來的資料，把base64資料的前面說明文字去掉再碼回圖片檔案
    $amlDataStr = $_POST['aml_data'];
    $amlDataStr = str_replace('data:image/png;base64,', '', $amlDataStr); //將檔案格式的資訊拿掉

    $bgDataStr = $_POST['bg_data'];
    $bgDataStr = str_replace('data:image/png;base64,', '', $bgDataStr); //將檔案格式的資訊拿掉

    $amlbgDataStr = $_POST['amlbg_data'];
    $amlbgDataStr = str_replace('data:image/png;base64,', '', $amlbgDataStr); //將檔案格式的資訊拿掉

    $radarDataStr = $_POST['chart_data'];
    $radarDataStr = str_replace('data:image/png;base64,', '', $radarDataStr); //將檔案格式的資訊拿掉


    $data_aml = base64_decode($amlDataStr);
    $data_bg = base64_decode($bgDataStr);
    $data_amlbg = base64_decode($amlbgDataStr);
    $data_radar = base64_decode($radarDataStr);

//準備好要存的檔名，抓到user_no
    $user_no = $_POST["user_no"];
    // $aml_name = $_POST["name_data"];
    // $fileName2 = date("Ymd");

//存檔路徑與檔名
    $file_aml = $upload_dir . "user" . $user_no . "_aml" . ".png";
    $file_bg = $upload_dir . "user" . $user_no . "_bg" . ".png";
    $file_amlbg = $upload_dir . "user" . $user_no . "_amlbg" . ".png";
    $file_radar = $upload_dir . "user" . $user_no . "_radar" . ".png";

// 儲存檔案
    $success_aml = file_put_contents($file_aml, $data_aml);
    $success_bg = file_put_contents($file_bg, $data_bg);
    $success_amlbg = file_put_contents($file_amlbg, $data_amlbg);
    $success_radar = file_put_contents($file_radar, $data_radar);
    // echo $success_aml ? $file : 'error';


// 以下為儲存背景的部分，用input file的型式送的：
// 用switch檢查送過來的檔案
    // switch($_FILES['up_bg_file']['error']){
    //     case UPLOAD_ERR_OK:
    //             $upload_dir = "../../img/customize//";

    //             $from = $_FILES['up_bg_file']['tmp_name'];
    //             $to = $upload_dir . "user" . $user_no . "_aml" ."_bg" . ".png";
    //             copy($from, $to);
    //             // echo "上傳成功<br>";
    //             break;	
    //     case UPLOAD_ERR_INI_SIZE:
    //             echo "上傳檔案太大,不得超過", ini_get("upload_max_filesize"),"<br>";
    //             break;
    //     case UPLOAD_ERR_FORM_SIZE:
    //             // echo "上傳檔案太大, 不得超過{$_POST["MAX_FILE_SIZE"]}位元組<br>";
    //             break;
    //     case UPLOAD_ERR_PARTIAL:
    //             echo "上傳檔案不完整<br>";
    //             break;
    //     case UPLOAD_ERR_NO_FILE:
    //             // echo "没選送檔案<br>";
    //             break;
    //     default:
    //             echo "請聯絡網站維護人員<br>";
    //             echo "error code : ", $_FILES['up_bg_file']['error'],"<br>";
    // }


// 要放資料庫的動物圖片路徑
    $file_aml_src = "img/customize/" . "user" . $user_no . "_aml" . ".png";
// 要放資料庫的背景圖片路徑
    $file_bg_src = "img/customize/" . "user" . $user_no . "_bg" . ".png";
// 要放資料庫的動物加背景圖片路徑
    $file_amlbg_src = "img/customize/" . "user" . $user_no . "_amlbg" . ".png";
// 要放資料庫的適應力圖片路徑
    $file_radar_src = "img/customize/" . "user" . $user_no . "_radar" . ".png";


    try {
        require_once("../connectg3.php");

        $sql ="update user set my_animal_img = :my_animal_img,
        my_animal_name = :my_animal_name,
        my_animal_bg_img = :my_animal_bg_img,
        my_animalbg_img = :my_animalbg_img,
        animal_howl = :animal_howl,
        environ_adapt_1 = :environ_adapt_1,
        environ_adapt_2 = :environ_adapt_2,
        environ_adapt_3 = :environ_adapt_3,
        animal_life = :animal_life,
        animal_jump = :animal_jump,
        attend = :attend,
        my_environ_img = :my_environ_img where user_no=:user_no";
        $userData = $pdo->prepare( $sql);
        $userData->bindValue(":my_animal_img", $file_aml_src);
        $userData->bindValue(":my_animal_name", $_POST["myanimal_name"]);
        $userData->bindValue(":my_animal_bg_img", $file_bg_src);
        $userData->bindValue(":my_animalbg_img", $file_amlbg_src);
        $userData->bindValue(":animal_howl", $_POST["voice_data"]);
        $userData->bindValue(":environ_adapt_1", $_POST["environ_adapt_1"]);
        $userData->bindValue(":environ_adapt_2", $_POST["environ_adapt_2"]);
        $userData->bindValue(":environ_adapt_3", $_POST["environ_adapt_3"]);
        $userData->bindValue(":animal_life", $_POST["animal_life"]);
        $userData->bindValue(":animal_jump", $_POST["animal_jump"]);
        $userData->bindValue(":attend", 0);
        $userData->bindValue(":my_environ_img", $file_radar_src);
        $userData->bindValue(":user_no", $_POST["user_no"]);
        $userData->execute();
        echo "動物存檔成功";

    } catch (PDOException $e) {
        $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "</br>";
        $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
        echo $errMsg;
    }


?>