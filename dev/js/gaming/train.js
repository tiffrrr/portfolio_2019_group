class Train {
    constructor(monsterSize=50){
        this.r = monsterSize;
        this.x = width;
        this.y = height*0.8;
        this.hitStatus = false;
    }   
    move(Vx=scrollSpeed,Vy=0) {
        if(unicorn.hits(this)){
            this.hitStatus = true;
        }
        
        if(this.hitStatus == true && strongStatus == true){
            this.x += 1.2*Vx;
            this.y -= 40
        }else{
            this.x -= 1.2*Vx;
        }
        
    }
    show(mWidth=this.r,mHeight=this.r) { 
        image(tImg, this.x, this.y, mWidth, mHeight);
        // rect( this.x, this.y, this.r, this.r);
    }  
}

class Fallen {
    constructor(){
        this.r = 80;
        this.y = -50;
        this.x = random(0.3*width, width+20);
        this.hitStatus = false;
    }
    move(Vx=40,Vy=60){
        if(unicorn.hits(this)){
            this.hitStatus = true;
        }
        if(this.hitStatus==true && strongStatus==true){
            this.y -= Vy;
            this.x += Vx;
        }else {
            this.y += 9;
            this.x -= 6;
        }

    }
    show(){
        image(fImg, this.x, this.y, this.r, this.r);
    }
}