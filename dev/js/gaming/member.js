// <!------ tab open page ----->

function open_page(e,className){
 var i, tabcontents, tablinks;
 tabcontents = document.getElementsByClassName("tabcontent");
 
for (i = 0; i < tabcontents.length; i++) {
    tabcontents[i].style.display = "none";
  }
 tablinks = document.getElementsByClassName("tablink");
for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("tablink_color");
  }

document.getElementById(className).style.display = "block";
 e.currentTarget.classList.add("tablink_color");
 //  console.log(e.target);
 }
 
 
let tablinks = document.getElementsByClassName("tablink");
 
tablinks[0].addEventListener('click',function(){open_page(event, 'member_basic')});
tablinks[1].addEventListener('click',function(){open_page(event, 'member_order')});
tablinks[2].addEventListener('click',function(){open_page(event, 'member_receive')});
tablinks[3].addEventListener('click',function(){open_page(event, 'member_love')});
  
  
window.addEventListener('load',
  function(){
  document.getElementById("default_open").click();
  document.getElementById("default_open").classList.add("red")
  }
);
  
// <!------ tab open page ----->