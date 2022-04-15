<?php
$errMsg = "";
$user_no=$_GET["user_no"];

$upload_dir = "../../img/collections//";  
if( ! file_exists($upload_dir )){
    mkdir($upload_dir);
}


try {
    require_once("../connectg3.php");
    session_start();
//取出動物排行
    $sql_user_ctn = 
    "select u.user_no,u.my_animal_name,u.my_animal_img, u.my_animal_bg_img,u.attend ,u.my_environ_img,u.animal_life,u.animal_jump
    from user u
    where  u.user_no = {$user_no}  ";
    $user_ctn = $pdo->prepare($sql_user_ctn);
    $user_ctn ->execute();
    $sql_work_no = 
    "select work_no
    from collections
    ORDER BY work_no DESC ";
    $work_no = $pdo->prepare($sql_work_no);
    $work_no ->execute();

}
catch (PDOException $e) {
    $errMsg = $errMsg . "錯誤訊息: " . $e->getMessage() . "<br>";
    $errMsg .= "錯誤行號: " . $e->getLine() . "<br>";
}
$item_user_ctnRow=0;
while( $user_ctnRow[$item_user_ctnRow]= $user_ctn -> fetch(PDO::FETCH_ASSOC)){
   $item_user_ctnRow++;
}
if($user_ctnRow[0]['attend']==1){
    echo json_encode( "error");
}else {
    $sql_update = "UPDATE `user` SET `attend` = '1' WHERE `user`.`user_no` = $user_no;";
    $update = $pdo->prepare($sql_update);
    $update ->execute();

for ($i=0; $i < 1; $i++) { 
    $work_no_box=  $work_no -> fetch(PDO::FETCH_ASSOC);
    $work_no_box['work_no'] =$work_no_box['work_no']+1;
}
$time=date("Y-m-d");

$sql_INSERT =
"INSERT INTO `collections` (`work_no`, `vote`,`cmp_img`,`work_name`,`work_date`,`bg_img`,`user_no`,`amlbg_img`,`environ_img`,`work_jump`,`work_life`) VALUES
(null, 0, 'img/collections/work_{$work_no_box['work_no']}.png', 
'{$user_ctnRow[0]['my_animal_name']}', 
'{$time}',
'img/collections/work_bg_{$work_no_box['work_no']}.png',
'{$user_ctnRow[0]['user_no']}',
'img/collections/work_amlbg_{$work_no_box['work_no']}.png',
'img/collections/work_radar_{$work_no_box['work_no']}.png',
'{$user_ctnRow[0]['animal_life']}',
'{$user_ctnRow[0]['animal_jump']}');";
$data_INSERT = $pdo->prepare($sql_INSERT);
$data_INSERT ->execute();
 copy("../../img/customize/user{$user_no}_aml.png", "../../img/collections/work_{$work_no_box['work_no']}.png");	
 copy("../../img/customize/user{$user_no}_bg.png", "../../img/collections/work_bg_{$work_no_box['work_no']}.png");
 copy("../../img/customize/user{$user_no}_amlbg.png", "../../img/collections/work_amlbg_{$work_no_box['work_no']}.png");	
 copy("../../img/customize/user{$user_no}_radar.png", "../../img/collections/work_radar_{$work_no_box['work_no']}.png");
//sql timestamp not null
echo json_encode( $work_no_box['work_no']);}

?>