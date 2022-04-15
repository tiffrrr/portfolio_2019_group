// 這裡是雷達圖的核心程式，資料外面先算好後才帶進來這裡
// 指令為myRadarChart.data.datasets[0].data = 新資料; 就可以把資料寫進去
// 然後再myRadarChart.update(); 即可刷新圖表



// 定義cart的data與options變數
var mychart_data;
var mychart_options;

// 把Chart圖表上方的標記方塊取消
Chart.defaults.global.legend.display = false;

// 尚不明
Chart.defaults.global.defaultFontColor = 'rgba(0,0,74, 1)';

// 抓到HTML的目標canvas
let mychart = document.getElementsByClassName('chart_canvas')[0];


let inputdata = [6,4,5];

mychart_data = {
    // 設定三個資料
    labels: ['森林', '高山', '沙漠'],

    datasets: [{
        // 資料數據輸入到data裡，是陣列型態
        // 其他的為描述資料長度的顏色外觀
        data: inputdata,
        backgroundColor: "rgba(250,180,0,.8)",
        pointBackgroundColor: ['#006400', '#2F4F4F', '#FF8C00'],
        pointBorderColor: ['#006400', '#2F4F4F', '#FF8C00'],
        pointHoverBackgroundColor: ['#006400', '#2F4F4F', '#FF8C00'],
        pointHoverBorderColor: ['#006400', '#2F4F4F', '#FF8C00'],
        pointBorderWidth: 3,
        pointHoverBorderWidth: 3,
        borderJoinStyle: 'round',
    }]
}

// 針對表格做的設定
mychart_options = 
{   
    scale: 
    {
        ticks:      //尺標，每格大小從這裡設
        {
            display:false,
            fontSize: 13,
            beginAtZero: true,
            maxTicksLimit: 10,
            min:0,
            max:10
        },
        pointLabels:    //資料名稱
        {
            display: true,
            fontSize: 18,
            fontColor: ['#006400', '#2F4F4F', '#dd7426'],
            fontFamily: 'Microsoft JhengHei',
        },
        gridLines:      //格線
        {
            color: '#777',
        },
        legend: 
        {

        }
    }
};

// 把HTML的canvas轉成chart型態的物件
// type為圖表型態，我們用雷達圖radar，其他也有長條圖之類的
var myRadarChart = new Chart(mychart, {
    type: 'radar',
    data: mychart_data,
    options: mychart_options,
});


