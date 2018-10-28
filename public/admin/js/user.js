$(function(){
    var page=1;
    var pageSize=10;

    getUser();

    $('#userList').on('click','#status',function(){
    
        var id=$(this).data('id');
        var isDelete=parseInt($(this).data('isdelete'))?0:1;
        console.log(isDelete);
        $.ajax({
            type:'post',
            url:'/user/updateUser',
            data:{
                id:id,
                isDelete:isDelete
            },
            success:function(res){
                if(res.success){
                    location.reload();
                }
            }
        })
    })

    function getUser(){
        $.ajax({
            type:'get',
            url:'/user/queryUser',
            data:{
                page:1,
                pageSize:10,
            },
            success:function(res){
                console.log(res);
                var html=template('employeeTpl',res);
                $('#userList').html(html);
            }
        })
    }
})