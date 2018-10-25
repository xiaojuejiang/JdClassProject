$(function(){
    var vCode;
    $('.getCode').on('tap',function(){
        $.ajax({
            type:'get',
            url:'/user/vCode',
            success:function(res){
                console.log(res.vCode);
            }
        })
    })
    $('#login').on('tap',function(){
        var username=$('#username').val();
        var mobile=$('#mobile').val();
        var password=$('#password').val();
        var reqpsd=$('#reqpsd').val();
        var vCode=$('#v-code').val();
        if(username.trim().length==0){
            return mui.toast('请输入用户名')
        }
        if(mobile.trim().length==0||/^1[345]\d{9}$/.test(true)){
            return mui.toast('请输入电话')
        }
        if(password.trim().length==0){
            return mui.toast('请输入密码')
        }
        if(reqpsd.trim().length==0){
            return mui.toast('请确认密码')
        }
        if(vCode.trim().length==0){
            return mui.toast('请输入认证码')
        }
        $.ajax({
            type:'post',
            url:'/user/register',
            data:{
                username:username,
                password:password,
                mobile:mobile,
                vCode:vCode
            },
            success:function(res){
                if(res.success){
                    location.href='user.html'
                }
                mui.toast(res.message);
            }
        })
    })
    mui('body').on('tap','a',function(){
        location.href=this.href;
    })
})