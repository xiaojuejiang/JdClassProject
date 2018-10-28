$(function(){
    $('#login').on('tap',function(){
        var username=$('#username').val();
        var password=$('#password').val();
        if(username.trim().length<=0){
            return mui.toast('请输入用户名');
        }
        if(password.trim().length<=0){
            return mui.toast('请输入密码');
        }
        $.ajax({
            type:'post',
            url:'/user/login',
            data:{
                "username":username,
                "password":password
            },
            success:function(res){
                if(res.success){
                    location='user.html';
                }
                mui.toast(res.message);
            }
        })
    })
    mui('body').on('tap','a',function(){
        location.href=this.href;
    })
})
// 闭包可以模拟出js中没有的私有成员