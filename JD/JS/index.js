window.onload = function(){
    var over = document.querySelector('.site-nav-over');
    var send = document.querySelector('.site-nav-send');
    var citys_s = document.querySelector('.site-nav-send s');

    //设置送至：北京的鼠标悬停和离开事件
    changeNav(over, send, citys_s);

    var items = document.querySelectorAll('.item');
    var send_span = document.querySelector('.site-nav-send span');
    selCity(items,send_span);  //设置城市选择的鼠标点击事件

    var fore = document.querySelectorAll('.fore');
    var menu = document.querySelectorAll('.menu');
    var fore_s = document.querySelectorAll('.fore s');
    for (var i = 0; i < fore.length; i++) {
        changeNav(menu[i], fore[i], fore_s[i]);
        changeNav(fore[i], fore[i], fore_s[i]);
    }

    var jdtel_span = document.querySelector('.jd-tel span');
    var jdtel = document.querySelector('.jd-tel.fore');
    var fore2 = document.querySelector('.fore2.menu');
    //设置事件使鼠标悬停时更换背景图片黑色手机为红色
    jdtel.addEventListener("mouseover", function () {
        jdtel_span.setAttribute("style", "background-position:0 -25px");
    }, false);
    fore2.addEventListener("mouseover", function () {
        jdtel_span.setAttribute("style", "background-position:0 -25px");
    }, false);
    jdtel.addEventListener("mouseout", function () {
        jdtel_span.setAttribute("style", "background-position:0 0");
    }, false);
    fore2.addEventListener("mouseout", function () {
        jdtel_span.setAttribute("style", "background-position:0 0");
    }, false);

    var close_banner = document.querySelector(".close-banner");
    var top_banner = document.querySelector(".top-banner");
    //设置广告栏点击隐藏事件
    close_banner.addEventListener("click", function () {
        top_banner.setAttribute("style", "display:none");
    });

    var search_input = document.querySelector('.search-input input');
    var valIni = "运动相机";
    // var valIni = search_input.value;
    
    //设置搜索框点击文字清空并改变样式事件
    search_input.addEventListener("focus", function () {
        if(this.value == valIni)
        {
            search_input.value = "";
            search_input.setAttribute("style", "color:#000");
        }
    });
    search_input.addEventListener("blur", function () {
        
        if(this.value == "")
        {
            search_input.value = valIni;
            search_input.setAttribute("style", "color:rgb(153,153,153)");
        }
    });

    var main_slide = document.querySelector('.main-slide');
    var main_slide_arrow1 = document.querySelector('.main-slide .main-slide-arrow');
    var main_slide_arrow_left1 = document.querySelector('.main-slide .main-slide-arrow-left');
    var main_slide_arrow_right1 = document.querySelector('.main-slide .main-slide-arrow-right');
    var today_right = document.querySelector('.today-right');
    var main_slide_arrow2 = document.querySelector('.today-right .main-slide-arrow');
    var main_slide_arrow_left2 = document.querySelector('.today-right .main-slide-arrow-left');
    var main_slide_arrow_right2 = document.querySelector('.today-right .main-slide-arrow-right');

    //设置轮播图左右栏鼠标悬停显示，离开消失事件
    slideShow(main_slide, main_slide_arrow1);
    slideShow(today_right, main_slide_arrow2);

    var main_slide_bottom_li = document.querySelectorAll('.main-slide-bottom li');
    var main_slide_img_li = document.querySelectorAll('.main-slide-img li');
    var main_slide_img = document.querySelector('.main-slide-img');
    var index = 0;
    var square = 0;
    var newLi = main_slide_img_li[0].cloneNode(true);
    main_slide_img.appendChild(newLi);

    //设置主轮播图鼠标点击事件
    var length = main_slide_img_li[0].offsetWidth;
    var temp = main_slide_img_li.length;
    main_slide_arrow_left1.addEventListener("click", function () {
        if(index <= 0)
        {
            main_slide_img.style.left = -4380 + 'px';
            index = main_slide_img_li.length;
        }
            index--;
            square--;
            square = square < 0 ? main_slide_bottom_li.length-1 :square;
            for (var j = 0; j < main_slide_bottom_li.length; j++) {
                main_slide_bottom_li[j].className = "";
            }
            main_slide_bottom_li[square].className = "main-slide-current";
            animate(main_slide_img,-index*length);
    });
    main_slide_arrow_right1.addEventListener("click", function () {
        setTimeOut();
    });

    //设置轮播图底部导航鼠标悬停事件
    for (var m = 0; m < main_slide_bottom_li.length; m++) {
        main_slide_bottom_li[m].num = m;
        main_slide_bottom_li[m].addEventListener("mouseover", function () {
            for (var j = 0; j < main_slide_bottom_li.length; j++) {
                main_slide_bottom_li[j].className = "";
            }
            this.className = "main-slide-current";
            square = index = this.num;
            animate(main_slide_img,-index*length);
        });
    }

    //设置定时事件，实现自动轮播  鼠标悬停清除定时，鼠标移开恢复定时事件
    var timer = null;
    timer = setInterval(setTimeOut,4000);
    main_slide.addEventListener("mouseover",function(){
        clearInterval(timer);
    });
    main_slide.addEventListener("mouseout",function(){
        timer = setInterval(setTimeOut,4000);
    });

    //定时事件修改样式实现轮播
    function setTimeOut() {
        var temp = main_slide_img_li.length;
        if(index > temp-1){
            index = 0;
            main_slide_img.style.left = 0 + 'px';
        }
        index++;
        square++;
        square = square > main_slide_bottom_li.length-1? 0:square;
        for (var j = 0; j < main_slide_bottom_li.length; j++) {
            main_slide_bottom_li[j].className = "";
        }
        main_slide_bottom_li[square].className = "main-slide-current";
        animate(main_slide_img,-index*length);
    }

    var main_news_top_money_i = document.querySelectorAll('.main-news-top-money i');
    //设置京东快报部分精灵图坐标
    function setFlyPhoto() {
        var j = -25;
        for (var i = 0; i < main_news_top_money_i.length - 4; i++) {
            main_news_top_money_i[i].setAttribute("style", "background-position-y:" + i * j + "px");
        }
    }
    setFlyPhoto();

    //设置下方轮播图箭头点击事件
    var today_right_ul = document.querySelector('.today-right ul');
    var today_right_li = document.querySelectorAll('.today-right li');
    var today_len = 1004;
    var left_distance = 0;
    var temp1 = today_right_li.length / 4;
    
    main_slide_arrow_left2.addEventListener("click", function () {
        if (left_distance < 0) {
            left_distance += today_len;
            animate(today_right_ul,left_distance);
        }
    });
    main_slide_arrow_right2.addEventListener("click", function () {
        if (left_distance > -today_len * (temp1 - 1)) {
            left_distance -= today_len;
            animate(today_right_ul,left_distance);
        }
    });
};

function changeNav(obj1, obj2, obj3) { //设置送至：北京的鼠标悬停和离开事件
    obj1.onmouseout = function () {
        //对盒子进行样式设计
        obj2.setAttribute("style", "background-color:#f1f1f1;border:1px solid #f1f1f1;border-bottom:none");
        //对s标签进行样式设计
        obj3.setAttribute("style", "top: -7px");
    };
    obj1.onmouseover = function () {
        //对盒子进行样式设计
        obj2.setAttribute("style", "background-color:#fff;border:1px solid #e3e4e5;border-bottom:none");
        //对s标签进行样式设计
        obj3.setAttribute("style", "top: -2px");
    };
}

function selCity(obj1,obj2){  //设置城市选择的鼠标点击事件
    for (var i = 0; i < obj1.length; i++) {
        obj1[i].num = i;
        obj1[i].addEventListener("click", function() {
            for (var j = 0; j < obj1.length; j++) {
                obj1[j].classList.remove("select");
            }
            obj1[this.num].classList.add("select");
            var temp = obj1[this.num].innerText;
            obj2.innerText = temp;
        });
    }
}

function slideShow(obj1, obj2) {     //设置轮播图左右栏鼠标悬停显示，离开消失事件
    obj1.addEventListener("mouseover", function () {
        obj2.setAttribute("style", "display:block");
    });
    obj1.addEventListener("mouseout", function () {
        obj2.setAttribute("style", "display:none");
    });
}

 function animate(obj,target) {   //定义函数设置单次滑动 
    clearInterval(obj.timer);
    var speed = obj.offsetLeft < target ? 15 : -15;

    obj.timer = setInterval(function () {
        var result = target - obj.offsetLeft;

        obj.style.left = obj.offsetLeft + speed + "px";
        if(Math.abs(result) <= 10 ){
            clearInterval(obj.timer);
            obj.style.left = target + "px";
        }
    },1);
}