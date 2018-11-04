window.onload = function() {
    // 定义全局变量保存位置
    var _distanceY = 0;
    
    // 获取左ul
    var main_left = document.querySelector('.main-left ul');
    // 获取右div
    var main_right = document.querySelector('.main-right-box');
    // 手指拖拽事件
    moveUl(main_left);
    moveUl(main_right);
    //点击跳转事件
    // clickMove();
    tapMove();

    // 封装函数
    var startTransition = function(ele) {
        ele.style.transition = 'all .3s';
    };
    var endTransition = function(ele) {
        ele.style.transition = '';
    };
    var setTransform = function(ele,distance) {
        ele.style.transform = 'translateY('+distance +'px)';
    };

    function moveUl(ele) {
        // 定义变量
        var startY = 0;
        var moveY = 0;
        var distanceY = 0;
    
        //获取拖拽的最大范围
        var moveLength = ele.offsetHeight*0.05;
        var maxLength = 0;
        var minLength =  ele.parentNode.offsetHeight - ele.offsetHeight;


        // 注册事件
        ele.addEventListener('touchstart',function(event) {
            startY = event.touches[0].clientY;
        });
        ele.addEventListener('touchmove',function(event) {
            moveY = event.touches[0].clientY - startY;
            //判断是否为main-left盒子，若是，获取全局变量_distanceY存储的距离
            if(ele.parentNode.className == 'main-left'){
                distanceY = _distanceY;
            }
            //判断向上拖拽是否越界
            if(moveY + distanceY > maxLength + moveLength){
                moveY = 0;
                distanceY = maxLength + moveLength;
            }
            //判断向下拖拽是否越界
            //距离的绝对值为：ul的高 - ul父盒子的高 + 拖拽最大范围
            else if(moveY + distanceY < minLength - moveLength) {
                moveY = 0;
                distanceY = minLength - moveLength;
                
            }
            //清除动画
            endTransition(ele);
            setTransform(ele,moveY+distanceY);
        });
        ele.addEventListener('touchend',function(event) {
            // 存储本次滑动位置
            distanceY += moveY;
            
            //拖拽结束时判断是否越界
            //添加伸缩动画
            if(distanceY > maxLength) {
                distanceY = maxLength;
            }
            else if(distanceY < minLength) {
                distanceY = minLength;
            }
            //更新_distanceY的值
            _distanceY = distanceY;
            //清除此次滑动中 moveY 的值
            moveY = 0;
            //设置伸缩
            startTransition(ele);
            setTransform(ele,distanceY);

        });
    }

    function tapMove() {
        // 获取所有li标签
        var liArr = document.querySelectorAll('.main-left>ul>li');
        // 获取li的高度
        var liHeight = liArr[0].offsetHeight;
        // 获取自定义属性：
        // dom.dataset['index'];
        // 若无该属性则为添加，若有该属性则为赋值
        for(var i=0;i<liArr.length;i++) {
            liArr[i].dataset['index'] = i;
        }
        // 获取限制距离
        var minDistance = main_left.parentNode.offsetHeight - main_left.offsetHeight;

        fox_tap(main_left,function(e) {

            // 获取触发点击事件的li标签
            var currentLi = e.target.parentNode;
 
            for(var i=0;i<liArr.length;i++) {
                liArr[i].classList.remove('main-left-current');
            }
            currentLi.classList.add('main-left-current');

            //获取当前索引值
            var currentIndex = currentLi.dataset['index'];

            // 计算移动距离
            var moveDistance = currentIndex*liHeight*-1;

            // 限制移动距离
            if(moveDistance < minDistance){
                moveDistance = minDistance;
            }

            _distanceY = moveDistance;
            // 开始移动
            startTransition(main_left);

            setTransform(main_left,_distanceY);

        });
    }
};

