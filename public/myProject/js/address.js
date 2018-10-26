$(function(){
    var address=null;
    $.ajax({
        type:'get',
        url:'/address/queryAddress',
        success:function(res){
            address=res;
            var html=template('address',{result:res});
            $('.addList').html(html);
        }
    })
    //编辑事件
    $('.addList').on('tap','.editAddress',function(){
        var id=$(this).data('id');
        for(var i=0;i<address.length;i++){
            if(address[i].id==id){
                localStorage.setItem('address',JSON.stringify(address[i]));
                break;
            }
        }
    })
    //删除事件
    $('.addList').on('tap','.delAddress',function(){
        var id=$(this).data('id');
        var li=$(this).parent().parent()[0];
        mui.confirm('确认要删除吗?',['确定','取消'],function(message){
            console.log(message);
            if(message.index==1){
                $.ajax({
                    type:'post',
                    data:{
                        id:id
                    },
                    url:'/address/deleteAddress',
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
    mui('body').on('tap','a',function(){
        location.href=this.href;
    })
})