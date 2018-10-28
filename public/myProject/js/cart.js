$.ajax({
    type: 'get',
    url: '/user/queryUserMessage',
    async: false,
    success: function (res) {
        if (res.error) {
            location.href = 'login.html';
        }
    }
})
$(function () {
    var resArr = null;
    $.ajax({
        type: 'get',
        url: '/cart/queryCart',
        success: function (res) {
            resArr = res;
            console.log(res);
            var html = template('cartTpl', {
                result: res
            });
            $('#addList').html(html);
        }
    })
    //编辑事件
    $('#addList').on('tap', '.editAddress', function () {
        var id = $(this).data('id');
        var li=$(this).parent().parent()[0];
        for (var i = 0; i < resArr.length; i++) {
            if (resArr[i].id == id) {
                var current = resArr[i];
                console.log(current);
                break;
            }
        }
        var sizeArr = [];
        var sizes = current.productSize.split('-');
        for (var i = parseInt(sizes[0]); i <= parseInt(sizes[1]); i++) {
            sizeArr.push(i);
        }
        current.sizeArr = sizeArr;
        var html = template('detailTpl', current).replace(/\n/g, '');
        // console.log(html);
        //加载修改界面
        mui.confirm(html, '编辑商品', ['取消', '确定'], function (message) {
            console.log(message);
            if(message.index==1){
                $.ajax({
                    type:'post',
                    url:'/cart/updateCart',
                    data:{
                        id:id,
                        num:num,
                        size:size
                    },
                    success:function(res){
                        if(res.success){
                            location.reload();
                        }
                    }
                })
            }else{
                mui.swipeoutClose(li);
            }
        })
        var num = $('.num').val();
        var spans = document.querySelectorAll('.detail-size span')
        //默认选中的尺码
        for (var i = 0; i < spans.length; i++) {
            // console.log($(spans[i]).data('value'), current.size);
            if ($(spans[i]).html() == current.size) {
                $(spans[i]).addClass('active');
                var size=$(spans[i]).html();
            }
        }

        //修改尺码
        $('.detail-size').on('tap', 'span', function () {
            $(this).addClass('active').siblings().removeClass('active');
            size = $(this).html();
        })
        //添加数量
        $('body').on('tap', '.plus', function () {
            num = $('.num').val();
            num++;
            if (num > current.productNum) {
                num = current.productNum;
            }
            $('.num').val(num);
        })
        //减少数量
        $('body').on('tap', '.reduce', function () {
            num = $('.num').val();
            num--;
            if (num < 1) {
                num = 1;
            }
            $('.num').val(num);
        })


    })
    //删除事件
    $('#addList').on('tap','.delAddress',function(){
        var id=$(this).data('id');
        var li=$(this).parent().parent()[0];
        mui.confirm('确认要删除吗?',['确定','取消'],function(message){
            console.log(message);
            if(message.index==1){
                $.ajax({
                    type:'get',
                    data:{
                        id:[id]
                    },
                    url:'/cart/deleteCart',
                    success:function(res){
                        if(res.success){
                            location.reload();
                        }
                    }
                })
            }else{
                mui.swipeoutClose(li);
            }
        });


    })
    mui('body').on('tap', 'a', function () {
        location.href = this.href;
    })
})