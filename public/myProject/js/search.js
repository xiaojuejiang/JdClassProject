$(function () {
    var keyArr = [];

    mui('.search').on('tap', '#search', function () {
        var value = $(this).siblings().val();
        console.log(123);
        keyArr.unshift(value);
        localStorage.setItem('keyArr', JSON.stringify(keyArr));
        $(this).siblings().val('');
        location.href = 'search-result.html?keyWord='+value;
    })

    if (localStorage.getItem('keyArr')) {
        keyArr = JSON.parse(localStorage.getItem('keyArr'));
    }

    var html = template('historyList', {
        keyArr: keyArr
    });

    $('.mui-table-view').html(html);
    mui('.history-top').on('tap', '#clearHistory', function () {
        localStorage.removeItem('keyArr');
        $('.mui-table-view').html('');
        keyArr=[];
    })
})