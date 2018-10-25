var html = '';
var page = 1;
var price=1;
var num=1;
var that;
$(function () {
    var keyWord = getKeyWord(location.href, 'keyWord');
    mui.init({
        pullRefresh: {
            container: '#refreshContainer', //待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
            up: {
                height: 50, //可选.默认50.触发上拉加载拖动距离
                auto: true, //可选,默认false.自动上拉加载一次
                contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
                contentnomore: '没有更多数据了', //可选，请求完毕若没有更多数据时显示的提醒内容；
                callback: getData //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
            }
        }
    });
    $('#price').on('tap',function(){
        price=price==1?2:1;
        page=1;
        html='';
        getData();
        mui('#refreshContainer').pullRefresh().refresh(true);
    })
    $('#sales').on('tap',function(){
        num=num==1?2:1;
        price=null;
        page=1;
        html='';
        getData();
        mui('#refreshContainer').pullRefresh().refresh(true);
    })
    function getData() {
        if (!that) {
             that = this;
        }
        $.ajax({
            type: 'get',
            url: '/product/queryProduct',
            data: {
                page: page++,
                pageSize: 3,
                price:price,
                num:num,
                proName: keyWord
            },
            success: function (response) {
                console.log(response);
                html += template('product', response);
                $('.product ul').html(html);
                that.endPullupToRefresh(response.data.length == 0);
            }
        })
    }
    mui('body').on('tap','a',function(){
        location.href=this.href;
    })
})