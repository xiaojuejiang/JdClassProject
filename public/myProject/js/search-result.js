$(function(){
    var keyWord=getKeyWord(location.href,'keyWord');
    $.ajax({
        type:'get',
        url:'/product/queryProduct',
        data:{
            page:1,
            pageSize:6,
            proName:keyWord
        },
        success:function(response){
            var html=template('product',response);
            $('.product ul').html(html);
        }
    })
})