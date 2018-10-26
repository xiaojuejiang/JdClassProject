$(function () {
    //修改密码
    $('#modify').on('tap', function () {
        //获取输入的value值
        var oldPassword = $('#oldPassword').val();
        var newPsd = $('#newPsd').val();
        var reqpsd=$('#reqpsd').val();
        var vCode = $('#vCode').val();
        //验证是否输入正确
        if (oldPassword.trim().length <= 0) {
            return mui.toast('请输入原密码');
        }
        if (newPsd.trim().length <= 0) {
            return mui.toast('请输入新密码');
        }
        if (reqpsd.trim().length <= 0||newPsd!=reqpsd) {
            return mui.toast('请输入正确的新密码');
        }
        if (vCode.trim().length <= 0) {
            return mui.toast('请输入验证码');
        }
        //向后台发送请求
        $.ajax({
            type: 'post',
            url: '/user/updatePassword',
            data: {
                oldPassword: oldPassword,
                newPassword: newPsd,
                vCode: vCode
            },
            success: function (res) {
                if(res.success){
                    mui.toast('修改成功,请重新登录');
                    setTimeout(function(){
                        location.href='login.html';
                    },2000)
                }else{
                    mui.toast(res.message);
                }
            }
        })

    })
    $('.getCode').on('tap',function(){
        $.ajax({
            type:'get',
            url:'/user/vCodeForUpdatePassword',
            success:function(res){
                console.log(res.vCode);
            }
        })
    })
    mui('body').on('tap','a',function(){
        location.href=this.href;
    })
})