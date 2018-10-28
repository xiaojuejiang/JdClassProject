$(function(){
    var page=1;
    var pageSize=10;
    var total=0;
    
    getCategory();
    //下一页
    $('#next').on('click',function(){
        page++;
        if(page>Math.ceil(total/pageSize)){
            alert('到达最后一页');
           return page=Math.ceil(total/pageSize);
        }
        getCategory();
    })
    //上一页
    $('#perv').on('click',function(){
        page--;
        if(page<1){
            alert('到达第一页');
           return page=1;
        }
        getCategory();
    })

    //添加分类
    $('#addCategory').on('click',function(){
        var categoryName=$('#categoryName').val();
        console.log(categoryName);
        $.ajax({
            type:'post',
            url:'/category/addTopCategory',
            data:{
                categoryName:categoryName
            },
            success:function(res){
                console.log(res);
                if(res.success){
                    location.reload();
                }
            }
        })
    })

    function getCategory(){
        $.ajax({
            type:'get',
            url:'/category/queryTopCategoryPaging',
            data:{
                page:page,
                pageSize:pageSize
            },
            success:function(res){

                total=res.total;
                var html=template('listTpl',res);
            
                $('#listBox').html(html);
            }
        })
    }
    
})