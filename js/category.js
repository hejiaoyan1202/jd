/**
 * Created by Administrator on 2016/7/7 0007.
 */
window.onload = function () {
    swipeLeft();
    swiptRight();
}

//需求分析：1）随着鼠标的滚动li标签上下滑动
// 2）滑动距离有上限(超出上限时，吸回顶部即最大定位值，需缓动)和下限（小于下限时，吸回底部即最小定位， 需缓动），期间正常滑动，无需缓动
// 3)点击li标签时，内容和背景色发生变化，li的高度发生移动，当

var swipe = document.querySelector("#category");
swipeH = swipe.offsetHeight

function swipeLeft() {
    //获取元素--左边
    var swipeUL = document.querySelector(".category-list ul");
    swipeULH = swipeUL.offsetHeight;

    //var swipe = document.querySelector("#category");
    //swipeH = swipe.offsetHeight

    var startY = 0;
    var endY = 0;
    var distanceY = 0;
//ul的定位范围 [0~ swipeH-swipeUL];
//ul的允许滑动距离假设为150px.则滑动距离的范围[150~swipeH-swipeUL-150]
    var minPosition = swipeH - swipeULH;
    var maxPosition = 0;
    var buffer = 150;       //缓冲区距离
    var minSwipeDis = minPosition - buffer;
    var maxSwipeDis = maxPosition + buffer
    var currentY = 0; //记录当前要定位的位置 (和我们轮播图的index)

//添加滚动事件
    swipeUL.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    })

    swipeUL.addEventListener("touchmove", function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        //distanceY=endY-startY;
        if ((currentY + distanceY) < maxSwipeDis && (currentY + distanceY) > minSwipeDis) {
            setTranslateY(currentY + distanceY); //之前移动的距离总和+当前移动距离
            //手指滑动距离较小，不需要设置缓动
            removeTransition();
        }

    })
    swipeUL.addEventListener("touchend", function (e) {
        endY = e.changedTouches[0].clientY;
        //不断更新上次移动之后的距离总和
        currentY += distanceY;
        if ((currentY + distanceY) > maxSwipeDis) {
            currentY = maxPosition;
            setTranslateY(currentY);
            setTransition();
        } else if ((currentY + distanceY) < minSwipeDis) {
            currentY = minPosition;
            setTranslateY(currentY);
            setTransition();
        }

    })

}

//获取元素--左边点击li时添加点击事件
var swipeUL = document.querySelector(".category-list ul");
swipeULH = swipeUL.offsetHeight;

////给ul添加点击事件，冒泡事件原理，给li或ul添加事件即可
//swipeUL.addEventListener("click", function (e) {
//    var lis = swipeUL.querySelectorAll("li");
//    var liH=lis[0].offsetHeight;
//
//    var swipe = document.querySelector("#category");
//    swipeH = swipe.offsetHeight
//    var minPosition = swipeH - swipeULH;
//    //console.log(lis);
//    for (var i = 0; i < lis.length; i++) {
//        lis[i].className = "";
//        //自定义属性获取index
//        lis[i].index = i;
//    }
//    //lis[index].className = "now";
//    e.target.parentNode.className="now";
//    console.log(e.target.parentNode.index);
//
//    var height= -e.target.parentNode.index*liH;
//    currentY = height;
//    //当点击li时，li发生移动:50是li的高度
//    setTranslateY(currentY);
//    setTransition();
//
//    if(height<minPosition){
//        //height=minPosition;
//        currentY = minPosition;
//        setTranslateY(currentY);
//        setTransition();
//    }
//
//})

tap(swipeUL,function(e){
    var lis = swipeUL.querySelectorAll("li");
    var liH=lis[0].offsetHeight;

    var swipe = document.querySelector("#category");
    swipeH = swipe.offsetHeight
    var minPosition = swipeH - swipeULH;
    //console.log(lis);
    for (var i = 0; i < lis.length; i++) {
        lis[i].className = "";
        //自定义属性获取index
        lis[i].index = i;
    }
    //lis[index].className = "now";
    e.target.parentNode.className="now";
    //console.log(e.target.parentNode.index);

    var height= -e.target.parentNode.index*liH;
    currentY = height;
    //当点击li时，li发生移动:50是li的高度
    setTranslateY(currentY);
    setTransition();

    if(height<minPosition){
        //height=minPosition;
        currentY = minPosition;
        setTranslateY(currentY);
        setTransition();
    }

});

//封装函数
function setTranslateY(y) {
    //var swipeUL = document.querySelector(".category-list ul");
    swipeUL.style.transform = "translateY(" + y + "px)";
}
function setTransition() {
    //var swipeUL = document.querySelector(".category-list ul");
    swipeUL.style.transition = "all 0.2s";
}
function removeTransition() {
    //var swipeUL = document.querySelector(".category-list ul");
    swipeUL.style.transition = "none";
}




//右边
//获取元素--右边

function swiptRight(){
    var swipeDiv = document.querySelector(".category-content");
    swipeDivH = swipeDiv.offsetHeight;

    var startY = 0;
    var endY = 0;
    var distanceY = 0;
//ul的定位范围 [0~ swipeH-swipeUL];
//ul的允许滑动距离假设为150px.则滑动距离的范围[150~swipeH-swipeUL-150]
    var minPosition = swipeH - swipeDivH;
    var maxPosition = 0;
    var buffer = 150;       //缓冲区距离
    var minSwipeDis = minPosition - buffer;
    var maxSwipeDis = maxPosition + buffer
    var currentY = 0; //记录当前要定位的位置 (和我们轮播图的index)

//添加滚动事件
    swipeDiv.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    })

    swipeDiv.addEventListener("touchmove", function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        //distanceY=endY-startY;
        if ((currentY + distanceY) < maxSwipeDis && (currentY + distanceY) > minSwipeDis) {
            setTranslateY(currentY + distanceY); //之前移动的距离总和+当前移动距离
            //手指滑动距离较小，不需要设置缓动
            removeTransition();
        }

    })
    swipeDiv.addEventListener("touchend", function (e) {

        endY = e.changedTouches[0].clientY;
        //不断更新上次移动之后的距离总和
        currentY += distanceY;
        if ((currentY + distanceY) > maxSwipeDis) {
            currentY = maxPosition;
            setTranslateY(currentY);
            setTransition();
        } else if ((currentY + distanceY) < minSwipeDis) {
            currentY = minPosition;
            setTranslateY(currentY);
            setTransition();
        }

    })

    //封装函数
    function setTranslateY(y) {
        //var swipeUL = document.querySelector(".category-list ul");
        swipeDiv.style.transform = "translateY(" + y + "px)";
    }
    function setTransition() {
        //var swipeUL = document.querySelector(".category-list ul");
        swipeDiv.style.transition = "all 0.2s";
    }
    function removeTransition() {
        //var swipeUL = document.querySelector(".category-list ul");
        swipeDiv.style.transition = "none";
    }

}

//封装一个tap函数:由于手机点击会有300s的延时
function tap(dom,callback){
    var isMove=false;
    dom.addEventListener("touchstart",function(){

    });
    dom.addEventListener("touchmove",function(){
        isMove=true;
    });
    dom.addEventListener("touchend",function(e){
            //if(isMove==false){
            //    callback();
            //} 短路操作
        callback&&callback(e);
        isMove=false;
    });
}




