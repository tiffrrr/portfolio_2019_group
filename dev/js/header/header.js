window.addEventListener("load",()=>{
    if(sessionStorage['shopList'] && sessionStorage['shopList'].length>1){  //購物車裡有東西
        document.getElementById("cart_num").style.display='block';
        document.getElementById("cart_num").innerText=sessionStorage['shopList'].split(',').length-1;
    }

    if (window.innerWidth >= 996){
        switch (document.title){
            case '怪奇動物園':
                document.getElementsByClassName('home_title')[0].style.color = '#dd7426';
                break;
            case '動物改造':
                document.getElementsByClassName('modify_a')[0].style.color = '#dd7426';
                break;
            case '生存遊戲':
                document.getElementsByClassName('game_a')[0].style.color = "#dd7426";
                break;
            case '怪奇排行':
                document.getElementsByClassName('frank_a')[0].style.color = "#dd7426";
                break;
            case '動物商城':
                document.getElementsByClassName('shop_a')[0].style.color = "#dd7426";
                break;
            case '預約導覽':
                document.getElementsByClassName('resv_a')[0].style.color = "#dd7426";
                break;
            case '會員中心':
                document.getElementsByClassName('member_a')[0].style.color = "#dd7426";
                break;
            case '購物車':
                document.getElementsByClassName('cart_a')[0].style.color = "#dd7426";
                break;
        }
    }else {
        switch (document.title){
            case '怪奇動物園':
                document.getElementsByClassName('home_title')[0].style.color = 'rgb(241,158,97)';
                break;
            case '動物改造':
                document.getElementsByClassName('modify_a')[0].style.color = 'rgb(241,158,97)';
                break;
            case '生存遊戲':
                document.getElementsByClassName('game_a')[0].style.color = "rgb(241,158,97)";
                break;
            case '怪奇排行':
                document.getElementsByClassName('frank_a')[0].style.color = "rgb(241,158,97)";
                break;
            case '動物商城':
                document.getElementsByClassName('shop_a')[0].style.color = "rgb(241,158,97)";
                break;
            case '預約導覽':
                document.getElementsByClassName('resv_a')[0].style.color = "rgb(241,158,97)";
                break;
            case '會員中心':
                document.getElementsByClassName('member_a')[0].style.color = "rgb(241,158,97)";
                break;
            case '購物車':
                document.getElementsByClassName('cart_a')[0].style.color = "rgb(241,158,97)";
                break;
        }
    }
})

