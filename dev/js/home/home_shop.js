var controller = new ScrollMagic.Controller();
var shop_appear = TweenMax.fromTo('.home_shop .container', 2, {
    y: 30, opacity: 0
},
    { y: 0, opacity: 1 }

);


var shop_balloon = TweenMax.fromTo('.home_shop .balloon', 3,
    { x: 100, y: 600, opacity: 0 },
    { x: 100, y: 300, opacity: 1, width: 150 });


var shop_appear = new ScrollMagic.Scene({
    triggerElement: '.home_shop',
    reverse: true,
    offset: "-200px",
}).setTween(shop_appear)
    // .addIndicators()
    .addTo(controller)

var shop_balloon = new ScrollMagic.Scene({
    triggerElement: '.home_shop ',
    reverse: true,
}).setTween(shop_balloon)
    // .addIndicators()
    .addTo(controller)

//===============================================


$.get("php/home/home_shop.php",function(data){
    data=JSON.parse(data);
    // console.log(data);
    let img=JSON.parse(data[1]);
    // console.log(img);
    img.forEach(n => {
        $('.shop_rank_img').append(`
        <div class="rank_img_item">
        <img  class="shop_animal_bg" src=${n.amlbg_img}>
        </div>`);

        $('.pic_chosen_flex').append(`
        <div class="pic_chosen_one">
            <img class="shop_animal_bg" src=${n.amlbg_img}>
        </div>
        `);
    });
    $('.pic_chosen_flex').append(`
        <div class="pic_chosen_one">
            <img class="shop_animal_bg" src=${img[0].amlbg_img}>
        </div>
    `);

    let prod=JSON.parse(data[0]);
    $('.prod_plain').prop("src",prod.product_img);
    $(".price").text(`NT$${prod.product_price}`);
    $('.prod_info h3').text(prod.product_name);
});
// console.log(1);