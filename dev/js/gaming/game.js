
    let x,y,z,areaChoice;


let scene = {
    desert:{
        area:'./img/game/遊戲背景-沙漠.png',
        monster:'./img/game/蠍子.png'
    },
    mountain:{
        area:'./img/game/scene_mountain.png',
        monster:'./img/game/lion.png'
    },
    forest:{ 
        area:'./img/game/scene_forest.png',
        monster:'./img/game/lion.png'
    }
}

function chosenArea(area){
    areaChoice = scene[area];
    console.log('areaChoice:' + areaChoice);
}

    function $cls(cls){
        return document.getElementsByClassName(cls);
    }
    
    function mapPointer(location){
        $cls('desert_pointer')[0].classList.remove('pointer_shaking');
        $cls('mountain_pointer')[0].classList.remove('pointer_shaking');
        $cls('forest_pointer')[0].classList.remove('pointer_shaking');
        $cls('forest_pointer')[0].style.filter ="hue-rotate(360deg)";
        $cls('desert_pointer')[0].style.filter ="hue-rotate(360deg)";
        $cls('mountain_pointer')[0].style.filter ="hue-rotate(360deg)";

        if(location.indexOf('forest')!=-1){
            $cls('forest_pointer')[0].classList.add('pointer_shaking');
            $cls('forest_pointer')[0].style.filter ="hue-rotate(180deg)";
        }
        if(location.indexOf('desert')!=-1){
            $cls('desert_pointer')[0].classList.add('pointer_shaking');
            $cls('desert_pointer')[0].style.filter ="hue-rotate(180deg)";
        }
        if(location.indexOf('mountain')!=-1){
            $cls('mountain_pointer')[0].classList.add('pointer_shaking');
            $cls('mountain_pointer')[0].style.filter ="hue-rotate(180deg)";
        }
    }

    function picClicked(e){
        if( e.target.style.left== x){
            sliderRight();
        }else if ( e.target.style.left == z ){
            sliderLeft();
        }
        
    }

    
    
    function sliderLeft(){
        if(window.innerWidth>=768){
            for(var j=0;j<$cls('playing_window').length; j++){
                if($cls('playing_window')[j].style.left!= x){
                    $cls('playing_window')[j].style.left = parseInt($cls('playing_window')[j].style.left)- 30 + '%';
    
                }else {
                    $cls('playing_window')[j].style.left = z;
    
                }
                if($cls('playing_window')[j].style.left== x){ 
                    $cls('playing_window')[j].style.zIndex = 2; 
                    $cls('playing_window')[j].classList.add('normalScale');
                    $cls('playing_window')[j].classList.remove('scaleUp');
                }
                if($cls('playing_window')[j].style.left== y){ 
                    $cls('playing_window')[j].style.zIndex = 4;
                    $cls('playing_window')[j].classList.remove('normalScale'); 
                    $cls('playing_window')[j].classList.add('scaleUp');
                 
                    mapPointer($cls('playing_window')[j].classList.value);

                }
                if($cls('playing_window')[j].style.left == z){ 
                    $cls('playing_window')[j].style.zIndex = 2; 
                    $cls('playing_window')[j].classList.add('normalScale');
                    $cls('playing_window')[j].classList.remove('scaleUp');
                }
            }
        }else {
            for(var k=0;k<$cls('playing_window').length;k++){
                if($cls('playing_window')[k].style.zIndex!=2){
                    $cls('playing_window')[k].style.zIndex++;
                }else{
                    $cls('playing_window')[k].style.zIndex=0;
                }
            }
        }
    }
    
    function sliderRight(){
        if(window.innerWidth>=768){
            for(var j=0;j<$cls('playing_window').length; j++){
                if($cls('playing_window')[j].style.left != z){
                    $cls('playing_window')[j].style.left = parseInt($cls('playing_window')[j].style.left) + 30 + '%';
    
                }else {
                    $cls('playing_window')[j].style.left =  x;
                }
                
                if($cls('playing_window')[j].style.left== x){ 
                    $cls('playing_window')[j].style.zIndex = 2; 
                    $cls('playing_window')[j].classList.add('normalScale');
                    $cls('playing_window')[j].classList.remove('scaleUp');
                }
                if($cls('playing_window')[j].style.left== y){ 
                    $cls('playing_window')[j].style.zIndex = 4;
                    $cls('playing_window')[j].classList.remove('normalScale'); 
                    $cls('playing_window')[j].classList.add('scaleUp');
                    mapPointer($cls('playing_window')[j].classList.value);
                }
                if($cls('playing_window')[j].style.left == z){ 
                    $cls('playing_window')[j].style.zIndex = 2; 
                    $cls('playing_window')[j].classList.add('normalScale');
                    $cls('playing_window')[j].classList.remove('scaleUp');
                }
               
            }
        }else {
            for(var k=0;k<$cls('playing_window').length;k++){
                if($cls('playing_window')[k].style.zIndex!=0){
                    $cls('playing_window')[k].style.zIndex--;
                }else{
                    $cls('playing_window')[k].style.zIndex=2;
                }
            }
        }
    }


    
    function doFirst(){
        
        $cls('arrowLeft')[0].addEventListener('click', sliderLeft);
        $cls('arrowRight')[0].addEventListener('click', sliderRight);

        if(window.innerWidth>=768){
            x="-5%"; y= "25%";  z= "55%";
            for(var i=0; i<$cls('playing_window').length; i++){
                $cls('playing_window')[i].addEventListener('click', picClicked);
                $cls('playing_window')[i].style.left = i*30 - 5+ '%';
                    if($cls('playing_window')[i].style.left== x){ 
                        $cls('playing_window')[i].style.zIndex = 2; 
                        // $cls('playing_window')[i].style.transform = 'translateY(-50%) scale:0.7';
                        $cls('playing_window')[i].classList.add('normalScale');
                        $cls('playing_window')[i].classList.remove('scaleUp');
                    }
                    if($cls('playing_window')[i].style.left== y){ 
                        $cls('playing_window')[i].style.zIndex = 22;
                        $cls('playing_window')[i].classList.remove('normalScale'); 
                        $cls('playing_window')[i].classList.add('scaleUp');
                    }
                    if($cls('playing_window')[i].style.left == z){ 
                        $cls('playing_window')[i].style.zIndex = 2; 
                        $cls('playing_window')[i].classList.add('normalScale');
                        $cls('playing_window')[i].classList.remove('scaleUp');
                    }
            }
        }else if(window.innerWidth<=767){
            for(var i=0; i<$cls('playing_window').length; i++){
                $cls('playing_window')[i].style.zIndex = i;
            } 
        }
        
    }
    window.addEventListener('click', function(e){
        console.log(e.screenX,e.screenY);
    })
    window.addEventListener('load', doFirst);
  