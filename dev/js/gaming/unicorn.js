

class Unicorn {  
    constructor(life,weight=2){
        this.r = 150;
        this.x = 50;
        this.y = height-this.r;
        this.vy = 10;
        this.life=life;
        this.gravity = weight;
        if(sessionStorage['animal_name']=='董董'){
            
        }
       
    }
    show() {

        if(window.innerWidth<=768){
            image(uImg,this.x, this.y, this.r, this.r);
        }else {// >=768
            if(sessionStorage['animal_name']=='董董'&&strongStatus!=true){
                image(uImg,this.x, this.y-20, 150, 189);
            }else{
                image(uImg,this.x, this.y-20, this.r, this.r);
            }
        }

    } 
    jump(jumpForce=(-25)) {
        if(flyStatus == true || sessionStorage['animal_name']=='董董'){
            this.vy = jumpForce;
        }else if(flyStatus ==false){
            if(strongStatus ==false && this.y==height - this.r){
                this.vy = jumpForce;
            }
        } 
        if(window.innerWidth>=768){
            if(strongStatus ==true && this.y==height - 350){
                this.vy = jumpForce;
            }
        }else {
            if(strongStatus ==true && this.y==height - this.r+30){
                this.vy = jumpForce;
            }
        }

    }
    hits(train){ 
        if(strongStatus==true && immuneStatus ==false){
            return collideCircleCircle(this.x,this.y,600,train.x,train.y,train.r);
        }else if(strongStatus == false && immuneStatus == false){
            return collideCircleCircle(this.x,this.y,this.r-20,train.x,train.y,train.r);
        }else if(immuneStatus==true){
            return false;
        }
    }


    move() {
        this.y += this.vy; //彈跳力
        this.vy += this.gravity;

            if(strongStatus==true && window.innerWidth>=768){ //如果吃到寶石螢幕又是桌機
                this.y = constrain(this.y, 0, height-350);  
                this.x = constrain(this.x,this.r-350, width+350);

            }else if(strongStatus==true && window.innerWidth<768){//如果吃到寶石但螢幕是手機
                this.y = constrain(this.y, 0, height - this.r+30);
                this.x = constrain(this.x,this.r-300, width+this.r-400);

            }else {//如果沒吃到寶石的情況
                if(window.innerWidth>=768 && strongStatus==false){ //沒吃到寶石而且螢幕是桌機
                    this.y = constrain(this.y, 0, height-this.r);
                    this.x = constrain(this.x, 0, width-this.r);
                }else if(window.innerWidth<=767 && strongStatus==false){
                    this.y = constrain(this.y, 0, height-this.r);
                    this.x = constrain(this.x,this.r-150, width+this.r);
                }


            }

    }
    
}