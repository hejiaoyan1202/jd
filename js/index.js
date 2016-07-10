/**
 * Created by Administrator on 2016/7/4 0004.
 */


window.onload = function () {
    //吸顶导航栏
    nav();
    //轮播图
    slide();
    //限时抢购
    setTimer();
}

//吸顶导航栏
//  分析需求 导航栏的背景色在轮播图区域内，随着滚动条的滚动而改变透明度发生变化。
function nav() {
    var nav = document.getElementById("nav");
    var slideH = document.getElementById("slide").offsetHeight;

    //var rgba=(201,21,25,0);
    window.onscroll = function () {
        var scrollY = document.body.scrollTop;
        var alpha = scrollY / slideH;
        //console.log(alpha);
        //nav.style.backgroundColor="rgba=(201,21,25,"+alpha+")";
        nav.style.backgroundColor = "rgba(201,21,25," + alpha + ")";
    }
}


//轮播图
var slideUL = document.querySelector("#slide").querySelectorAll("ul")[0];
function slide() {
    var slide = document.getElementById("slide");
    var index = 1;
    var timer = null;
    var slideWidth = slide.offsetWidth;

    var imgWidth = slideUL.querySelectorAll("li img")[0].offsetWidth;
    //console.log(imgWidth);

//分析需求 1）轮播图无缝自由滚动
    timer = setInterval(function () {
        index++;
        // index=9时，立即执行index=1，导致第一张图未完整显示
        //if (index >= 9) {
        //    index = 1;
        //    slideUL.style.transform="translataX(-10%)";
        //    //slideUL.style.transition="none";
        //}

        setTranslateX(-index*imgWidth);
        //slideUL.style.transition="all 0.2";
        setTransition();
        //console.log(index);
        //第一张停留时间为2s： index++;
    }, 1000);
    slideUL.addEventListener("transitionend", function () {
        //监听每张图片是否过渡完成
        //console.log(index+"过渡完成");
        if (index >= 9) {
            index = 1;
            //slideUL.style.transform = "translataX(-10%)";
            setTranslateX(-index*imgWidth);
            removeTransition();
        }
    })


//分析需求 2）轮播图随着滑动发生位移
    var startX = 0;
    var endX = 0;
    var distancesX = 0;
    var moveX = 0;

    slideUL.addEventListener("touchstart", function (e) {
        //开始滑动时,清除定时器
        clearInterval(timer);
        startX = e.touches[0].clientX;
    });
    //********************
    slideUL.addEventListener("touchmove", function (e) {
        moveX = e.touches[0].clientX - startX;
        //console.log(moveX);

        var s = moveX + -index * imgWidth;
        //slideUL.style.transform = "translateX(" + s + "px)";
        setTranslateX(s);
        removeTransition();

    });

    slideUL.addEventListener("touchend", function (e) {
        endX = e.changedTouches[0].clientX;
        distancesX = endX - startX;
        //console.log(distancesX);
        //由于滑动距离较小：无需添加计时器,也无需添加缓动，否则用户体验不好
        if (Math.abs(distancesX) > slideWidth / 3) {
            if (distancesX > 0) {
                index--;
                setTranslateX(-index*imgWidth);
                setTransition();
            }else {
                index++;
                setTranslateX(-index*imgWidth);
                setTransition();
            }
        }else {
            index = index;
            setTranslateX(-index*imgWidth);
            setTransition();
        }
        //为避免同时有两个以上定时器，设置定时器时，先清除定时器
        //滑动事件后,恢复无缝自由轮播效果
        clearInterval(timer);
        timer = setInterval(function () {
            index++;
            setTranslateX(-index*imgWidth);
            setTransition();
        }, 1000);

    })

    //兼听事件：滑动时前面图片是否过渡完成
    slideUL.addEventListener("transitionend",function(){
        if(index>=9){
            index=1;
            setTranslateX(-index*imgWidth);
            removeTransition();
        }else if(index<=0){
            index=8;
            setTranslateX(-index*imgWidth);
            removeTransition();
        }


//3)当图片滑动时，小圆圈随着改变样式:事件添加到兼听过渡完成事件中，
        var lis=document.querySelectorAll("#slide ul")[1].querySelectorAll("li");
        //console.log(lis);
        for(var i=0;i<lis.length;i++){
            //lis[i].classList.remove("");
            lis[i].className="";
        }
        //lis[index-1].classList.add("now");
        lis[index-1].className="now";
    })


}


//倒计时
function setTimer(){
    var time=5*60*60;

    var timer=null;
    timer=setInterval(function(){
        // 清除定时器，则只执行一次：clearInterval(timer);
        time--;
        var h=time/3600;
        //var m=time/60;
        var m=time%3600/60;
        var s=time%60;
        var spans=document.querySelectorAll(".seckill-time span");
        //console.log(spans);
        spans[0].innerHTML=Math.floor(h/10);
        spans[1].innerHTML=Math.floor(h%10);
        spans[3].innerHTML=Math.floor(m/10);
        spans[4].innerHTML=Math.floor(m%10);
        spans[6].innerHTML=Math.floor(s/10);
        spans[7].innerHTML=Math.floor(s%10);

    },1000);
}


//封装复用函数
function setTranslateX(x) {
    slideUL.style.transform ="translateX("+x+"px)";
}
function setTransition(){
    slideUL.style.transition="all 0.2s";
}

function removeTransition(){
    slideUL.style.transition="none";
}


//点击底部导航变色
//var footer=document.querySelector("#footer");
//var ul=footer.querySelector("ul");
//var lis=ul.querySelectorAll("li");
//
//console.log(lis);
//ul.addEventListener("click", function (e){
//   // for(var i=0;i<lis.length;i++){
//   //     lis[i].className="";
//   //     lis[i].index=i;
//   // }
//   //
//   //lis.index.className="active";
//})