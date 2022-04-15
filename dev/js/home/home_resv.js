//----------------animation-----------------------------
var controller = new ScrollMagic.Controller();
var resv_balloon = TweenMax.to('.home_resv .balloon', 4,
{
    bezier: {
        type: "cubic",
        curviness: 4,
        values: [{
            x: 100,
            y: 100,
        }, {
            x: 400,
            y: 200,
        }, {
            x: 100,
            y: 400
        }, {
            x: 100,
            y: 600,
        }],
    }
});

//創建場景
var resv_balloon = new ScrollMagic.Scene({
    triggerElement: '.home_resv ',
    reverse: true,
}).setTween(resv_balloon)
    // .addIndicators()
    .addTo(controller)

var resv_appear = new ScrollMagic.Scene({
    triggerElement: '.home_resv',
    reverse: true,
    offset: "-200px",
}).setTween(resv_appear)
    // .addIndicators()
    .addTo(controller)

    var resv_appear = TweenMax.fromTo('.home_resv .container', 2, {
        y: 30, opacity: 0
    },
        { y: 0, opacity: 1 }

    );













// 按下去  顯示當日日期
//剩餘人數
//下拉式選單可以選
function showInfo(dataNum,total) {
    //抓到場次時間
    $.get('php/resv/getTime.php', { data: 'time' }, function (data) {
        data = $.parseJSON(data);
        $('.show_data_table').html(`<div class='text_row'>
        <p class="show_datano">場次</p>
        <p class="show_datatime">開始時間</p>
     
        <p class="show_datanum">剩餘人數</p>
    </div>`);
        $.each(data, (i, n) => {
            n.peopleNum=n.max_capacity-total[i];
            /[0-9]+/.test(n.peopleNum)==true? n.peopleNum = n.peopleNum : n.peopleNum = Number(n.max_capacity);
            n.start_time=n.start_time.replace(n.start_time.substr(5),'');

            $('.show_data_table').append(
                `<div class="text_row">
                    <p class="show_datano">場次${n.session_no}</p>
                    <p class="show_datatime">${n.start_time}</p>
                  
                    <p class="show_datanum">${n.peopleNum}人</p>
                </div>`);
        })
        
    });

}













//-----------------------------------------------

function showNumRemain() {
    // $(".sunglasses").css("opacity","0");
    // $(".sunglasses").css("opacity","24%");

    // //戴墨鏡動畫
    $(".sunglasses").css("opacity","1");
    $(".sunglasses").css("opacity","30%");

    //把日曆上已點過的底色拿掉
    $(".curday_after").removeClass('curday_after_check');
    //點到的加底色
    $(this).addClass('curday_after_check');
    //整理傳進去的資料 要變成mysql日期格式
    let date;  //日
    let month; //月
    my_month + 1 < 10 ? month = `0${my_month + 1}` : month = my_month + 1;
    $(this).text() < 10 ? date = `0${$(this).text()}` : date = $(this).text();
    let fullDate = `${my_year}-${month}-${date}`;


     //顯示當日日期
    // $('#show_data_title').text((my_month + 1) + "/" + $(this).text() + "日預約導覽時段資訊：");
    $('.home_resv .info_text h3').text(fullDate + "導覽時段資訊：");



    //計算剩餘人數
    $.get('php/resv/getTime.php', { data: fullDate }, function (tour_date) {
        //[{"booking_no":"1","booking_date":"2019-09-06","tour_date":"2019-09-10","number_of_booking":"2","order_status":"0","member_id":"1","session_no":"1"}]
        //如果有資料傳回來（那一天有人預約）
        if (tour_date != 'noResv') {
            tour_date = $.parseJSON(tour_date);
            let max = 0;
            for (let i = 0; i < tour_date.length; i++) {
                if (max < tour_date[i].session_no) {
                    max = tour_date[i].session_no;
                }
            }
            let total = Array();
            for (let i = 0; i < max; i++) {
                total.push(0);
            }

            for (let i = 0; i < tour_date.length; i++) {
                num =  Number(tour_date[i].session_no) - 1;
                total[num] += Number(tour_date[i].number_of_booking) ;
            }
            showInfo($(this),total);
            
        }else{
            let total =[0];
            showInfo($(this),total);
        }
    })
}
















// connect to database
//兩種不同年的年份
var month_olympic = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //閏年
var month_normal = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; //平年
var month_name = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];

var holder = document.getElementById("days"); //<ul id='day'>
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var ctitle = document.getElementById("calendar_month");
var cyear = document.getElementById("calendar_year");

var my_date = new Date(); //獲取當前時間
var my_year = my_date.getFullYear(); //獲取當前年份
var my_month = my_date.getMonth(); //獲取當前月份
var my_day = my_date.getDate(); //獲取當前日期  
// console.log(my_date);

//獲取某年某月的第一天是星期幾
function day_start(month, year) {
    var tmpDate = new Date(year, month, 2);
    // new Date(year, month[, day]);
    // console.log(tmpDate.getDay());
    return (tmpDate.getDay());
}
//計算是不是閏年（前年份除以4的餘數）
/*
 1.西元年份除以4不可整除，為平年。
 2.西元年份除以4可整除，且除以100不可整除，為閏年。
 3.西元年份除以100可整除，且除以400不可整除，為平年。
 4.西元年份除以400可整除，為閏年。
*/
function days_month(month, year) {
    var tmp = year % 4;
    if (tmp == 0) {
        return (month_olympic[month]);
    } else {
        return (month_normal[month]);
    }
}

//前月
prev.onclick = function (e) {
    e.preventDefault();
    my_month--;
    if (my_month < 0) {
        my_year--;
        my_month = 11;
    }
    getDate();
}
//後月
next.onclick = function (e) {
    e.preventDefault();
    my_month++;
    if (my_month > 11) {
        my_year++;
        my_month = 0;
    }
    getDate();
}

function refresh_date(date) {
    var str = "";  //設置日期顯示，預設為空 line153
    var totalDay = days_month(my_month, my_year); //獲取該月天數
    var firstDay = day_start(my_month, my_year); //獲取該月第一天星期幾
    var myclass; //設置css
    for (var i = 1; i < firstDay; i++) {
        str += "<li> </li>"; //那個禮拜的期使日期之前空白
    }

    // console.log(date);
    var dates=date.map((n,i) =>{
      return n.split("-");
    });
    // console.log(dates)
    // console.log(dates[0],dates[1]);//0= ["2019", "09", "30"] 1= ["2019", "09", "10"]
    
    
    for (var i = 1; i <= totalDay; i++) {
            if ((i < my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year < my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month < my_date.getMonth())|| (my_year == my_date.getFullYear() && my_month > my_date.getMonth()+1)) {
                myclass = " class='lightgrey'"; //在當日期今天之前，灰色字
            }else if (i == my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) {
                myclass = " class='fontColor colorbox'"; //當天日期背景顯示
                
            } else if((i > my_day && my_year == my_date.getFullYear() && my_month == my_date.getMonth()) || my_year > my_date.getFullYear() || (my_year == my_date.getFullYear() && my_month > my_date.getMonth())){
                myclass = " class='curday_after'"; //在當日期今天之後，黑色字
            }
            for(var j=0;j<dates.length;j++){
                if(i == dates[j][2] && my_year==dates[j][0] && (my_month+1) == dates[j][1])
                myclass = " class='lightgrey'";
            
        }
        str += "<li" + myclass + ">" + i + "</li>"; //創建日期節點
    }
    holder.innerHTML = str; //設置日期顯示
    ctitle.innerHTML = month_name[my_month]; //設置英文月份顯示
    cyear.innerHTML = my_year; //設置年份顯示

    //  $('.curday_after').click(showInfo);
    $('.curday_after').click(showNumRemain); 
}

function getDate(){
    fetch('php/resv/getDate.php').then(date => date.json()).then(date =>{refresh_date(date);} );
};



// window.addEventListener('load', refresh_date) //執行函數
window.addEventListener('load', getDate) //執行函數



