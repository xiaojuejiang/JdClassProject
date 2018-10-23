$(function () {
    // 内容滑块
    mui('.mui-scroll-wrapper').scroll({
        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
    // 获取一级菜单
    $.ajax({
        url:'/category/queryTopCategory',
        type:'get',
        success:function (response) {
            var html=template('first-category',response);
            $('#link').html(html);
            if(response.rows.length){
                var id=response.rows[0].id;
                $('#link a:first-of-type').addClass('active');
                getSecond(id);
            }
        }
    })
    //获取二级菜单
    function getSecond(id){
        $.ajax({
            url:'/category/querySecondCategory',
            type:'get',
            data:{
                id:id
            },
            success:function(response){
                var html='';
                if(response.total==0){
                    html='暂无数据';
                }else{
                    html=template('second-category',response);
                }
                $('#brand-list').html(html);
            }
        })
    }
    //注册一级菜单的点击事件
    mui('#link').on('tap','a',function(){
        var id=$(this).attr('data-id');
        $(this).addClass('active').siblings().removeClass('active');
        getSecond(id);
    });
    mui('body').on('tap','a',function(){
        window.top.location.href=this.href;
    });
})