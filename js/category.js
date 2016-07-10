/**
 * Created by Administrator on 2016/7/7 0007.
 */
window.onload = function () {
    swipeLeft();
    swiptRight();
}

//���������1���������Ĺ���li��ǩ���»���
// 2����������������(��������ʱ�����ض��������λֵ���軺��)�����ޣ�С������ʱ�����صײ�����С��λ�� �軺�������ڼ��������������軺��
// 3)���li��ǩʱ�����ݺͱ���ɫ�����仯��li�ĸ߶ȷ����ƶ�����

var swipe = document.querySelector("#category");
swipeH = swipe.offsetHeight

function swipeLeft() {
    //��ȡԪ��--���
    var swipeUL = document.querySelector(".category-list ul");
    swipeULH = swipeUL.offsetHeight;

    //var swipe = document.querySelector("#category");
    //swipeH = swipe.offsetHeight

    var startY = 0;
    var endY = 0;
    var distanceY = 0;
//ul�Ķ�λ��Χ [0~ swipeH-swipeUL];
//ul���������������Ϊ150px.�򻬶�����ķ�Χ[150~swipeH-swipeUL-150]
    var minPosition = swipeH - swipeULH;
    var maxPosition = 0;
    var buffer = 150;       //����������
    var minSwipeDis = minPosition - buffer;
    var maxSwipeDis = maxPosition + buffer
    var currentY = 0; //��¼��ǰҪ��λ��λ�� (�������ֲ�ͼ��index)

//��ӹ����¼�
    swipeUL.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    })

    swipeUL.addEventListener("touchmove", function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        //distanceY=endY-startY;
        if ((currentY + distanceY) < maxSwipeDis && (currentY + distanceY) > minSwipeDis) {
            setTranslateY(currentY + distanceY); //֮ǰ�ƶ��ľ����ܺ�+��ǰ�ƶ�����
            //��ָ���������С������Ҫ���û���
            removeTransition();
        }

    })
    swipeUL.addEventListener("touchend", function (e) {
        endY = e.changedTouches[0].clientY;
        //���ϸ����ϴ��ƶ�֮��ľ����ܺ�
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

//��ȡԪ��--��ߵ��liʱ��ӵ���¼�
var swipeUL = document.querySelector(".category-list ul");
swipeULH = swipeUL.offsetHeight;

////��ul��ӵ���¼���ð���¼�ԭ����li��ul����¼�����
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
//        //�Զ������Ի�ȡindex
//        lis[i].index = i;
//    }
//    //lis[index].className = "now";
//    e.target.parentNode.className="now";
//    console.log(e.target.parentNode.index);
//
//    var height= -e.target.parentNode.index*liH;
//    currentY = height;
//    //�����liʱ��li�����ƶ�:50��li�ĸ߶�
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
        //�Զ������Ի�ȡindex
        lis[i].index = i;
    }
    //lis[index].className = "now";
    e.target.parentNode.className="now";
    //console.log(e.target.parentNode.index);

    var height= -e.target.parentNode.index*liH;
    currentY = height;
    //�����liʱ��li�����ƶ�:50��li�ĸ߶�
    setTranslateY(currentY);
    setTransition();

    if(height<minPosition){
        //height=minPosition;
        currentY = minPosition;
        setTranslateY(currentY);
        setTransition();
    }

});

//��װ����
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




//�ұ�
//��ȡԪ��--�ұ�

function swiptRight(){
    var swipeDiv = document.querySelector(".category-content");
    swipeDivH = swipeDiv.offsetHeight;

    var startY = 0;
    var endY = 0;
    var distanceY = 0;
//ul�Ķ�λ��Χ [0~ swipeH-swipeUL];
//ul���������������Ϊ150px.�򻬶�����ķ�Χ[150~swipeH-swipeUL-150]
    var minPosition = swipeH - swipeDivH;
    var maxPosition = 0;
    var buffer = 150;       //����������
    var minSwipeDis = minPosition - buffer;
    var maxSwipeDis = maxPosition + buffer
    var currentY = 0; //��¼��ǰҪ��λ��λ�� (�������ֲ�ͼ��index)

//��ӹ����¼�
    swipeDiv.addEventListener("touchstart", function (e) {
        startY = e.touches[0].clientY;
    })

    swipeDiv.addEventListener("touchmove", function (e) {
        moveY = e.touches[0].clientY;
        distanceY = moveY - startY;
        //distanceY=endY-startY;
        if ((currentY + distanceY) < maxSwipeDis && (currentY + distanceY) > minSwipeDis) {
            setTranslateY(currentY + distanceY); //֮ǰ�ƶ��ľ����ܺ�+��ǰ�ƶ�����
            //��ָ���������С������Ҫ���û���
            removeTransition();
        }

    })
    swipeDiv.addEventListener("touchend", function (e) {

        endY = e.changedTouches[0].clientY;
        //���ϸ����ϴ��ƶ�֮��ľ����ܺ�
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

    //��װ����
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

//��װһ��tap����:�����ֻ��������300s����ʱ
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
            //} ��·����
        callback&&callback(e);
        isMove=false;
    });
}




