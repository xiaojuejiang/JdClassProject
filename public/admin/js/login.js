$(function () {
    $('button').on('click', function () {
        var username = $('#username').val();
        var password = $('#password').val();

        if (!username.trim().length) {
            return $('.form-top-left p').html('请输入用户名');
        }
        if (!password.trim().length) {
            return $('.form-top-left p').html('请输入密码');
        }
        $.ajax({
            type: 'post',
            url: '/employee/employeeLogin',
            data: {
                username: username,
                password: password
            },
            success: function (res) {
                console.log(res)
                if (res.error) {
                    return $('.form-top-left p').html(res.message);
                }else{
                    location.href='user.html'
                }
            }
        })
    })

})