$(function(){
    var id=getKeyWord(location.href,'id');
    // console.log(id);
    var size='';
    var num=1;
    $.ajax({
        type:'get',
        url:'/product/queryProductDetail',
        data:{
            id:id
        },
        success:function(res){
            var sizeArr=[];
            var sizes=res.size.split('-');
            for(var i=parseInt(sizes[0]);i<=parseInt(sizes[1]);i++){
                sizeArr.push(i);
            }
            res.size=sizeArr;
            console.log(sizeArr);
            console.log(res);

            var html=template('detailTpl',res);
            $('.detail-box').html(html);
            mui('.mui-scroll-wrapper').scroll({
                deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
            });
            //获取尺码
            $('.detail-size').on('tap','span',function(){
                $(this).addClass('active').siblings().removeClass('active');
                size=$(this).html();
            })
            //添加数量
            $('.plus').on('tap',function(){
                num=$('.num').val();
                num++;
                if(num>res.num){
                    num=res.num;
                }
                $('.num').val(num);
            })
            $('.reduce').on('tap',function(){
                num=$('.num').val();
                num--;
                if(num<1){
                    num=1;
                }
                $('.num').val(num);
            })
        }
    })

    //加入购物车
    $('#addCart').on('tap',function(){
        
        if(!size){
            return mui.toast('请选择尺码');
        }
        $.ajax({
            type:'post',
            url:'/cart/addCart',
            data:{
                productId:id,
                num:num,
                size:size
            },
            success:function(res){
                console.log(res);
                if(res.success){
                    mui.confirm('添加成功去购物车看看','提示',['取消','确定'],function(message){
                        if(message.index==1){
                            location.href='cart.html'
                        }
                    })
                }

            }
        })
    })
})