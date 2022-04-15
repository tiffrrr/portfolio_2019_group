// 按下去  顯示當日日期
//剩餘人數
//下拉式選單可以選
function showInfo(dataNum,total) {
    //抓到場次時間
    $.get('php/resv/getTime.php', { data: 'time' }, function (data) {
        data = $.parseJSON(data);
        $('.show_data_table').html(`<div class='table_content_row'>
        <span class="show_datano">場次</span>
        <span class="show_datatime">開始時間</span>
        <span class="show_datalen">長度</span>
        <span class="show_datanum">剩餘人數</span>
    </div>`);
        $.each(data, (i, n) => {
            n.peopleNum=n.max_capacity-total[i];
            /[0-9]+/.test(n.peopleNum)==true? n.peopleNum = n.peopleNum : n.peopleNum = Number(n.max_capacity);
            n.start_time=n.start_time.replace(n.start_time.substr(5),'');

            $('.show_data_table').append(
                `<div class="table_content_row">
                    <span class="show_datano">場次${n.session_no}</span>
                    <span class="show_datatime">${n.start_time}</span>
                    <span class="show_datalen">${n.length}min</span>
                    <span class="show_datanum">${n.peopleNum}人</span>
                </div>`);
        })

        changeSelect(data);
        
    });

}

function changeSelect(data){
    //清空下拉選單
    if($('#time_select').children().length>1){
        for(let i=0;i<$('#time_select').children().length;i++){
            $('#time_select').children("option:last").remove();
        }
    }
    //讓下拉選單可以按
    $('#time_select').attr('disabled', false);
    
    //加option
    $.each(data, (i, n) => {
        $('#time_select').append(
            `<option value="${n.start_time}">第${n.session_no}場-${n.start_time}</option>`
        )
    })

   //清空下拉選單
    $('#peoplenum_select').html('<option value="">--選擇人數--</option>');

    //第一個選單選了的時候
    $('#time_select').change(function(){
        //清空
        $('#peoplenum_select').html('<option value="">--選擇人數--</option>');
       
        //可以按
        $('#peoplenum_select').attr('disabled', false);

        //找到第一個選單選的是誰
        var a;
        $.each(data, (i, n) => {
            if($("#time_select option:selected").val() == n.start_time){
                a=i;
            }
        })

        //準備要塞進去字串
        let str='';
        for(let i=1;i<= data[a].peopleNum;i++){
            str+= `<option value="${i}">${i}</option>`
        }
        //塞進去
        $('#peoplenum_select').append(str);
        //顯示剩餘人數

        if(data[a].peopleNum == '0'){
            $("#numRemain").text(`已額滿，請選擇別場`);
        }else{
            $("#numRemain").text(`剩餘人數：${data[a].peopleNum}`);
        }
    });
}


function showNumRemain() {
    //把剩餘人數清空
    $("#numRemain").text(``);

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
    $('#show_data_title').text(fullDate + "日預約導覽時段資訊：");



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
