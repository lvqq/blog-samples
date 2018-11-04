window.onload  = function() {
    // 顶部通栏滚动效果
    headerScroll();

    // 倒计时的效果
    cutDownTime();

    // 轮播图效果
    banner();
};


// 顶部通栏滚动效果
function headerScroll() {
    // 获取距离顶部的高度
    var navDom = document.querySelector('.jd_nav');
    var maxLength = navDom.offsetTop + navDom.offsetHeight;

    var headerDom = document.querySelector('.jd_header');

    window.onscroll = function() {
        // 获取滚动的距离
        var scrollLength = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        
        // 获取百分数
        var percent = scrollLength/maxLength;
        percent = percent>1?1:percent;

        // 设置透明度
        headerDom.style.backgroundColor = 'rgba(201,21,35,'+percent+')';
    };
}

 // 倒计时的效果
function cutDownTime() {
    // 定义总时间
    var totalHour = 4;

    // 转化为秒
    var totalSec = totalHour*60*60;

    // 获取所有的li
    var liArr = document.querySelectorAll('.main-content:nth-child(1) .content-top li');

    //初始化li
    liArr[0].innerHTML = Math.floor(totalHour/10);
    liArr[1].innerHTML = totalHour%10;

    var timeId = setInterval(function() {

        //判断是否小于0
        if(totalSec <= 0){
            clearInterval(timeId);
            return;
        }
        totalSec--;

        //计算时，分，秒
        var hour = Math.floor(totalSec/3600);
        var minute = Math.floor(totalSec % 3600 /60);
        var sec = totalSec % 60;

        //设置给dom
        liArr[0].innerHTML = Math.floor(hour/10);
        liArr[1].innerHTML = hour%10;

        liArr[3].innerHTML = Math.floor(minute/10);
        liArr[4].innerHTML = minute%10;

        liArr[6].innerHTML = Math.floor(sec/10);
        liArr[7].innerHTML = sec%10;
    },1000);
}

// 轮播图效果
function banner() {
    //获取宽度
    var width = document.querySelector('.jd_banner').offsetWidth;
    //获取ul
    var moveUl = document.querySelector('.banner-images');
    // 添加动画效果
    // moveUl.style.transition = 'all .3s';
    // 获取索引的li
    var indexLiArr = document.querySelectorAll('.banner-index>li');
    // 获取图片数量
    var sumImg = document.querySelectorAll('.banner-images>li').length;
    // 定义索引值
    var index = 1;

    // 优化代码
    var startTransition = function() {
        // 开启过渡
        moveUl.style.transition = 'all .3s';
    };

    var endTransition = function() {
        //关闭过渡
        moveUl.style.transition = '';
    };

    var setTranform = function(distance) {
        moveUl.style.transform = 'translateX('+distance+'px)';
    };


    //定时轮播
    var timeId = setInterval(function() {

        // 重构后的代码
        index++;

        // 开启过渡
        startTransition();
        // moveUl.style.transition = 'all .3s';

        // 动画修改ul的位置
        setTranform(index*width*(-1));

        // 重构前的代码
        // index++;

        // if(index>sumImg-1){
        //     index = 0;

        //     //到达最后一张，关闭过渡，瞬间切换到第一张
        //     moveUl.style.transition = '';
        // }

        // //修改位置
        // moveUl.style.transform = 'translateX('+index*width*(-1)+'px)';
        // for(var i = 0;i<indexLiArr.length;i++) {
        //     indexLiArr[i].classList.remove('current');
        // }
        // indexLiArr[index].classList.add('current');
    },2000);


    // 添加过渡结束事件，用于判断index
    moveUl.addEventListener('webkitTransitionEnd',function() {
        // 判断index是否有效
        if(index>sumImg-2) {  //向右
            index = 1;

            // 瞬间修改ul的位置
            endTransition();
            setTranform(index*width*(-1));
        }
        else if(index<1) {   //向左
            index = sumImg - 2;
            endTransition();
            setTranform(index*width*(-1));
        }
        // 修改位置
        for(var i = 0;i<indexLiArr.length;i++) {
            indexLiArr[i].classList.remove('current');
        }
        indexLiArr[index-1].classList.add('current');
    });

    // 定义变量
    var startX = 0;
    var moveX = 0;
    // var distanceX = 0;

    // 注册touch事件
    moveUl.addEventListener('touchstart',function(event) {
        clearInterval(timeId);

        // 关闭过渡效果
        endTransition();

        // 记录
        startX = event.touches[0].clientX;
    });
    moveUl.addEventListener('touchmove',function(event) {
        // 计算移动的值
        moveX = event.touches[0].clientX - startX;

        // 移动
        setTranform(moveX+index*width*(-1));
    });
    // 手指松开时判断移动距离进行吸附
    moveUl.addEventListener('touchend',function(event) {
        
        // 定义最大的偏移值
        var maxDistance = width/4;
        //超过最大偏移值  滚动
        if(Math.abs(moveX)>maxDistance) {
            if(moveX>0){
                index--;
            }
            else {
                index++;
            }

            // 开启过渡
            startTransition();

            setTranform(index*width*(-1));
        }
        //未超过  吸附回去
        else {
            // 开启过渡
            startTransition();

            setTranform(index*width*(-1));
        }

        // 松手后恢复定时器
        timeId = setInterval(function() {
            // 重构后的代码
            index++;
            // 开启过渡
            startTransition();
            // 动画修改ul的位置
            setTranform(index*width*(-1));
        },2000);
        
    });
}