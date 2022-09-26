/*nav bar*/
$("header .container nav ul li a").on("click",function(){
    $(this).addClass("active").parent().siblings().children().removeClass("active");
});
/*end nav bar*/
/*up*/
$(window).on("scroll",function(){
    if($(window).scrollTop()>=720){
        $(".up").addClass("show")
    }
    else{
        $(".up").removeClass("show")
    }  
})
$(".up").on("click",function(){
    $(window).scrollTop({
        top:0
    })
})
/*end up*/
/*info*/
$(function () {
    'use strict';
    $('.ul li').click(function () {
    $(this).addClass('selected').siblings('li').removeClass('selected');
    $('.drop-contain div').hide();
    $('.' + $(this).data('class')).fadeIn();
    });
});
/* end info*/ 

/* phone button*/
$("header nav .toggle-menu").click(function(){
    if($("header nav ul").hasClass("bu-down"))
        $("header nav ul").removeClass("bu-down");
    else
    $("header nav ul").addClass("bu-down");
})

$(" header nav ul li a ").click(function(){
    $("header nav ul").removeClass("bu-down");
})
/* end phone button*/