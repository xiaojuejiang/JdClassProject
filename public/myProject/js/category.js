$(function () {
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        success:function (response) {
            console.log(response);
            var html=template('first-category',response);
            console.log(html);
            $('.content-left .mui-scroll').html(html);
        }
    })
})