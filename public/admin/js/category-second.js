$(function () {
    var page = 1;
    var pageSize = 10;
    var total = 0;
    var imgUrl;

    //二级分类数据获取
    getCategory();
    //下一页
    $('#next').on('click', function () {
        page++;
        if (page > Math.ceil(total / pageSize)) {
            alert('到达最后一页');
            return page = Math.ceil(total / pageSize);
        }
        getCategory();
    })
    //上一页
    $('#perv').on('click', function () {
        page--;
        if (page < 1) {
            alert('到达第一页');
            return page = 1;
        }
        getCategory();
    })

    //添加分类
    $('#addCategory').on('click', function () {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
                page: 1,
                pageSize: 999
            },
            success: function (res) {
                console.log(res);
                var html = template('categoryFirstTpl', res);
                $('#categoryId').html(html);
            }
        })
    })

    //获取上传图片地址,并预览
    $('#fileUpload').fileupload({
        dataType: 'json',
        done: function (e, data) {

            imgUrl = data.result.picAddr;

            $("#showBrand").attr("src", imgUrl);
        }
    });
    //保存
    $('#saveCategory').on('click', function () {
        console.log(123);
        var categoryId = $('#categoryId').val();
        var brandName = $('#brandName').val();
        if (!imgUrl) {
            return alert('请选择图片')
        }
        $.ajax({
            type: 'post',
            url: '/category/addSecondCategory',
            data: {
                categoryId: categoryId,
                brandName: brandName,
                brandLogo: imgUrl,
                hot: 1
            },
            success: function (res) {
                console.log(res);
                if(res.success){
                    location.reload();
                }
            }
        })
    })

    function getCategory() {
        $.ajax({
            type: 'get',
            url: '/category/querySecondCategoryPaging',
            data: {
                page: page,
                pageSize: pageSize
            },
            success: function (res) {
                console.log(res);
                total = res.total;
                var html = template('listTpl', res);

                $('#listBox').html(html);
            }
        })
    }

})