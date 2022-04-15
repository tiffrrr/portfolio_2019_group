<?php
$errMsg = "";
try{
  require_once("connectg3.php");
  $sql = "update game_question SET question_name=:question_name, question_option1=:question_option1, question_option2=:question_option2, question_option3=:question_option3, question_option4=:question_option4, question_ans=:question_ans, question_status=:question_status, ans_description=:ans_description WHERE question_no=:question_no";
  $gameQues = $pdo->prepare($sql);
  $gameQues->bindValue(":question_name",$_REQUEST['question_name']);
  $gameQues->bindValue(":question_option1",$_REQUEST['question_option1']);
  $gameQues->bindValue(":question_option2",$_REQUEST['question_option2']);
  $gameQues->bindValue(":question_option3",$_REQUEST['question_option3']);
  $gameQues->bindValue(":question_option4",$_REQUEST['question_option4']);
  $gameQues->bindValue(":question_ans",$_REQUEST['question_ans']);
  $gameQues->bindValue(":question_status",$_REQUEST['question_status']);
  $gameQues->bindValue(":ans_description",$_REQUEST['ans_description']);
  $gameQues->bindValue(":question_no", $_REQUEST["question_no"]);
  $gameQues->execute(); 

  
    echo "修改成功";
    header('Location:gameQuestion.php');
  	
}catch(PDOException $e){
  echo $e->getMessage();
}
?>