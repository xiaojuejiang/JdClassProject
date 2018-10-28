$(function(){

	var navLi = $('.navs li')

	navLi.on('click',function(){

		$(this).find('ul').slideToggle();

	});

	$('#logout').on('click',function () {
		$.ajax({
			type:'get',
			url:'/employee/employeeLogout',
			success:function(res){
				if(res.success){
					location.href='login.html';
				}else{
					alert('res.message')
				}
			}
		})
	})
});