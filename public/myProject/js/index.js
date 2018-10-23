$(function(){

    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
    });
    mui('body').on('tap','a',function(){
        window.top.location.href=this.href
    });
})