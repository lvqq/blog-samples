window.onload = function(){
    var x,y,nX,nY;
    var sumX = 0, sumY = 0;
    var page = document.querySelector(".page");
    var album = document.querySelector(".album");
    var change = document.querySelectorAll(".change");
    var change2 = document.querySelectorAll(".change2");

    /* 设置延时绑定事件，不影响开场动画 */ 
    setTimeout(function(){
        document.addEventListener("mousedown",start);        
    },3000);

    /* 设置图片背景 */ 
    var mainHold = document.querySelectorAll(".main-hold");
    for(var i = 0;i<12;i++) {
        mainHold[i].setAttribute("style","background-image:url(./images/"+(i+1)+".jpg)");
    }
    
    var top = document.querySelector(".top");
    var bottom =document.querySelector(".bottom");
    function start(event) {
        if(event.button == 0) {
            //阻止浏览器默认事件
            stopDefault(event);

            //使橙色方块隐藏
            top.setAttribute("style","animation:orange-hide 3s linear forwards");
            bottom.setAttribute("style","animation:orange-hide 3s linear forwards");
            

            nX = event.clientX;
            nY = event.clientY;
            document.addEventListener("mousemove",move);
            document.addEventListener("mouseup",end);
        }
        return false;
    }

    function move(event) {
        //设置绕Y轴旋转
        x = nX - event.clientX;
        sumX = sumX + 0.1*x;        

         //设置绕X轴旋转
         y = nY - event.clientY;
         sumY =  0.1*y;

         /*划定边界*/
         if(sumY >= 10) {
             sumY = 10;
         }
         else if(sumY <= -10){
             sumY = -10;
         }

        album.setAttribute("style","transform: translateZ(460px) rotateY("+ sumX +"deg) rotate3d(100,0,0,"+ sumY +"deg)");

        //保存当前clientX的值以便下次调用
        nX = event.clientX;

        //设置颜色变换
         change[0].setAttribute("style","animation-play-state:running");
         change[1].setAttribute("style","animation-play-state:running");
         change2[0].setAttribute("style","animation-play-state:running");
         change2[1].setAttribute("style","animation-play-state:running");         
        
        return false;
    }

    function end() {
        album.setAttribute("style","transform: translateZ(460px) rotateY("+ sumX +"deg)");

        //停止颜色变换
        change[0].setAttribute("style","animation-play-state:paused");        
        change[1].setAttribute("style","animation-play-state:paused");        
        change2[0].setAttribute("style","animation-play-state:paused");        
        change2[1].setAttribute("style","animation-play-state:paused");        
        

        document.removeEventListener("mousemove",move);
        document.removeEventListener("mouseup",end);    
    }

    //阻止浏览器默认行为触发的通用方法 
    function stopDefault(e){ 
        //防止浏览器默认行为(W3C) 
        if(e && e.preventDefault){ 
            e.preventDefault(); 
        } 
        //IE中组织浏览器行为 
        else{ 
            window.event.returnValue=fale;
            return false;
        } 
    }

};
