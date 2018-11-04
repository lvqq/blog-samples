$(function() {
    //设置导航栏左侧鼠标悬停事件
    var $send_nav_over = $(".site-nav-over");
    var $send = $(".site-nav-send");
    var $citys_s = $(".site-nav-send s");
    changeNav($send_nav_over, $send, $citys_s);

    //设置城市鼠标点击样式
    $(".item").click(function() {
        $(this).addClass("select").siblings().removeClass("select");
        $(".site-nav-send span").text($(this).text());
    });
    //设置导航栏右侧鼠标悬停事件
    var $none = $(".none, .none1");
    var $fore = $(".fore");
    var $fore_s = $(".fore s");
    changeNav($none, $fore, $fore_s);

    //设置鼠标悬停更换为红色手机
    $(".jd-tel.fore, .fore2.menu").mouseover(function() {
        $('.jd-tel span').css("backgroundPosition","0 -25px");
    });
    $(".jd-tel.fore, .fore2.menu").mouseout(function() {
        $('.jd-tel span').css("backgroundPosition","0 0");
    });

    //设置点击广告栏隐藏事件
    $(".close-banner").click(function() {
        $(".top-banner").fadeOut("slow");
    });

    //设置搜索框点击文字清空并改变样式事件
    //$(".search-input input").focus();  //设置页面直接获取光标 
    $(".search-input input").focus(function() {
        if( $(this).val() == this.defaultValue)  //初始值
        {
            $(this).val("").css("color","#000");
        }
    });
    $(".search-input input").blur(function() {
        if( $(this).val() == "")
        {
            $(this).val(this.defaultValue).css("color","rgb(153,153,153)");
        }
    });

    var $main_slide = $(".main-slide");
    var $today_right = $(".today-right");
    var $main_slide_arrow1 = $(".main-slide .main-slide-arrow");
    var $main_slide_arrow2 = $(".today-right .main-slide-arrow");
    changeSlide($main_slide, $main_slide_arrow1);
    changeSlide($today_right, $main_slide_arrow2);

    // //设置主轮播图滑动事件
    var $m = 0;
    var $n = 0;
    var $timer = null;
    var $main_slide_img = $(".main-slide-img");
    var $main_slide_img_li = $(".main-slide-img li");
    var $arrow_left1 = $(".main-slide .main-slide-arrow-left");
    var $arrow_right1 = $(".main-slide .main-slide-arrow-right");
    var $main_slide_bottom_li = $(".main-slide-bottom li");
    var $slideLen = $main_slide_img_li.eq(0).width();
    $main_slide_img.append("<li><a href='#'><img src='Image/slide1.jpg'></a></li>");
    $timer = setInterval(setTimeOut,4000);
    //设置鼠标悬停取消定时，鼠标移开设置定时事件。
    $main_slide.hover(function(){
        clearInterval($timer);
    },function(){
        $timer = setInterval(setTimeOut,4000);
    });

    //设置主轮播点击切换事件
    $arrow_left1.click(function(){  //左键
        if(!$main_slide_img.is(":animated")){
            if($m<=0){
                $m = $main_slide_img.children().length-1;
                $main_slide_img.css("left",-$slideLen*$m+"px");
            }
            $m--;
            $n--;
            $n = $n <0?$main_slide_img.children().length-2:$n;
            $main_slide_img.animate({left:-$slideLen*$m+'px'},"slow");
            //设置轮播图下方滚动条
            $(".main-slide-current").removeClass("main-slide-current");
            $main_slide_bottom_li.eq($n).addClass("main-slide-current");
        }
    });
    $arrow_right1.click(function(){  //右键
        setTimeOut();
    });

    //设置轮播图下方滚动条鼠标悬停事件
    $main_slide_bottom_li.mouseover(function() {
        $m = $n = $main_slide_bottom_li.index(this);
        $main_slide_img.animate({left:-$slideLen*$m+'px'},"fast");
        $(this).addClass("main-slide-current").siblings().removeClass("main-slide-current");
    });

    //设置定时事件
    function setTimeOut() {
        if(!$main_slide_img.is(":animated")){
            if($m>= $main_slide_img.children().length-1){
                $m = 0;
                $main_slide_img.css("left",-$slideLen*$m+"px");
            }
            $m++;
            $n++;
            $n = $n >= $main_slide_img.children().length-1? 0:$n;
            $main_slide_img.animate({left:-$slideLen*$m+'px'},"slow");
            $(".main-slide-current").removeClass("main-slide-current");
            $main_slide_bottom_li.eq($n).addClass("main-slide-current");
        }
    }

    //设置下方轮播图滑动事件
    var $main_slide_arrow_left2 = $(".today-right .main-slide-arrow-left");
    var $main_slide_arrow_right2 = $(".today-right .main-slide-arrow-right");    
    var $today_right_ul = $(".today-right ul");
    var $today_right_li = $(".today-right li");
    var $upSlideLen = ($today_right_li.width()+1)*4; 
    setUpSlideMove($upSlideLen);

    //设置京东快报部分精灵图
    var $main_news_top_money_i = $(".main-news-top-money i");
    for (var j = 0; j < $main_news_top_money_i.length - 4; j++) {
        $main_news_top_money_i.eq(j).css("backgroundPositionY",j *(-25) + "px");
    }

    //修改导航栏鼠标悬停和离开样式
    function changeNav(obj1, obj2, obj3) {
        obj1.hover(function() {
            obj2.eq(obj1.index(this)).css({"backgroundColor":"#fff","border":"1px solid #e3e4e5","borderBottom":"none"});
            obj3.eq(obj1.index(this)).css("top","-2px");  //index 获得当前索引(来自父元素obj1)
        },function() {
            obj2.eq(obj1.index(this)).css({"backgroundColor":"#f1f1f1","border":"1px solid #f1f1f1","borderBottom":"none"});
            obj3.eq(obj1.index(this)).css("top","-7px");
        }); 
    }

    //设置轮播图侧栏鼠标悬停显示，离开消失事件
    function changeSlide(obj1, obj2) {
        obj1.hover(function () {
            obj2.show();
        },function () {
            obj2.hide();
        });
    }

    //设置底部轮播图左右滑动点击事件
    function setUpSlideMove(len) {
        var k =0;
        $main_slide_arrow_left2.click(function(){ //左键
            if(!$today_right_ul.is(":animated")){
                if(k<0){
                    k++;
                    $today_right_ul.animate({left:len*k+'px'},2000);
                }
            }
        });
        $main_slide_arrow_right2.click(function(){  //右键
            if(!$today_right_ul.is(":animated")){
                if(k>-$today_right_ul.children().length/4+1){
                    k--;
                    $today_right_ul.animate({left:len*k+'px'},2000);
                }
            }
        });
    }
});