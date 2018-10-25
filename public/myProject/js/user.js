var result;
$.ajax({
    type:'get',
    url:'/user/queryUserMessage',
    async:false,
    success:function(res){
        if(res.error){
            location.href='login.html';
        }
        result=res;
    }
})
$(function(){
    mui('#logout').on('tap','a',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            success:function(response){
                console.log(response);
                if(response.success){
                    location.href='index.html'
                }
            }
        })
    })
    var html=template('tempTitle',result);
    $('.title').html(html);
    mui('body').on('tap','a',function(){
        location.href=this.href;
    })
    
})