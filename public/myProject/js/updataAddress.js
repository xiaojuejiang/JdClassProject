$(function () {
    $('#cont').on('tap', '#city', function () {
        var picker = new mui.PopPicker({
            layer: 3
        });
        picker.setData(cityData);
        picker.show(function (selectItems) {
            console.log(selectItems[0].text); //智子
            console.log(selectItems[0].value); //zz 
        })
        picker.pickers[0].setSelectedIndex(0);
        picker.pickers[1].setSelectedIndex(0);
        picker.pickers[2].setSelectedIndex(0);
        picker.show(function (SelectedItem) {
            console.log(SelectedItem);
            var value = '';
            for (var i = 0; i < SelectedItem.length; i++) {
                value += SelectedItem[i].text;
            }
            $('#city').val(value)
        })
    })
    var address = JSON.parse(localStorage.getItem('address'));

    var html = template('addtpl', address);

    $('#cont').html(html);

    $('#cont').on('tap','#updataAddress', function () {
        var username = $('#username').val();
        var postCode = $('#postCode').val();
        var city = $('#city').val();
        var detail = $('#detail').val();
        if (username.trim().length <= 0) {
            return mui.toast('请填写收货人')
        }
        if (postCode.trim().length <= 0) {
            return mui.toast('请填写邮编')
        }
        if (city.trim().length <= 0) {
            return mui.toast('请选择城市')
        }
        if (detail.trim().length <= 0) {
            return mui.toast('请填写详细地址')
        }
        console.log(username,postCode,city,detail);
        $.ajax({
            type: 'post',
            url: '/address/updateAddress',
            data: {
                id:address.id,
                address: city,
                addressDetail: detail,
                recipients: username,
                postcode: postCode
            },
            success: function (res) {
                if (res.success) {
                    location.href = 'address.html'
                } else {
                    mui.toast('提交失败');
                }
            }
        })
    })


    mui('body').on('tap', 'a', function () {
        location.href = this.href;
    })
})