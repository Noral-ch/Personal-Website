//轮播
function lunbo() {
    let ul = $("#lunbo > ul");
    let li = ul.children("li");
    let dots = $("#dots");
    let currentIndex = 0;
    let timerLunbo;

    // 初始化第一个图片显示
    li.eq(0).fadeIn();
    dots.empty();

    // 创建指示点
    for (let i = 0; i < li.length; i++) {
        let span = $('<span></span>');
        dots.append(span);
        if (i === 0) {
            span.addClass("active");
        }
    }

    // 图片切换函数
    function imgChange(index) {
        li.eq(index).fadeIn(200);
        li.eq(index).siblings().fadeOut(200);
        dots.children().eq(index).addClass("active")
            .siblings().removeClass("active");
    }

    // 指示点点击事件
    dots.on("click", "span", function() {
        currentIndex = $(this).index();
        imgChange(currentIndex);
        resetTimer();
    });

    // 自动轮播
    function startAutoPlay() {
        timerLunbo = setInterval(() => {
            currentIndex = (currentIndex + 1) % li.length;
            imgChange(currentIndex);
        }, 5000);
    }

    // 重置定时器
    function resetTimer() {
        clearInterval(timerLunbo);
        startAutoPlay();
    }

    // 鼠标拖拽切换
    let isDragging = false;
    let startX, startY, startLeft;

    ul.on('mousedown', function(e) {
        clearInterval(timerLunbo);
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        startLeft = ul.scrollLeft();
        $(this).css('cursor', 'grabbing');
    });

    $(document).on('mousemove', function(e) {
        if (!isDragging) return;
        
        const dy = Math.abs(e.clientY - startY);
        const dx = Math.abs(e.clientX - startX);
        
        // 只有当水平移动大于垂直移动时才处理
        if (dx > dy) {
            e.preventDefault();
            ul.scrollLeft(startLeft - (e.clientX - startX));
        }
    });

    $(document).on('mouseup', function(e) {
        if (!isDragging) return;
        
        isDragging = false;
        ul.css('cursor', 'grab');
        
        const threshold = 50; // 拖动距离阈值
        const dx = e.clientX - startX;
        
        if (dx < -threshold) {
            // 向左拖动，切换到下一个
            currentIndex = (currentIndex + 1) % li.length;
        } else if (dx > threshold) {
            // 向右拖动，切换到上一个
            currentIndex = (currentIndex + li.length - 1) % li.length;
        }
        
        imgChange(currentIndex);
        ul.scrollLeft(0);
        resetTimer();
    });

    // 触摸事件支持
    ul.on('touchstart', function(e) {
        clearInterval(timerLunbo);
        isDragging = true;
        startX = e.originalEvent.touches[0].clientX;
        startLeft = ul.scrollLeft();
    });

    $(document).on('touchmove', function(e) {
        if (!isDragging) return;
        e.preventDefault();
        const touchX = e.originalEvent.touches[0].clientX;
        ul.scrollLeft(startLeft - (touchX - startX));
    });

    $(document).on('touchend', function(e) {
        if (!isDragging) return;
        isDragging = false;
        
        const touchX = e.originalEvent.changedTouches[0].clientX;
        const dx = touchX - startX;
        const threshold = 50;
        
        if (dx < -threshold) {
            currentIndex = (currentIndex + 1) % li.length;
        } else if (dx > threshold) {
            currentIndex = (currentIndex + li.length - 1) % li.length;
        }
        
        imgChange(currentIndex);
        ul.scrollLeft(0);
        resetTimer();
    });

    // 开始自动轮播
    startAutoPlay();

    // 返回清除轮播定时器的函数
    return function clearLunboTimer() {
        clearInterval(timerLunbo);
    };
}


//鼠标滚动页面翻到固定位置
function ScrollNext(num){
    // 获取所有部分的DOM元素
        const sections = document.querySelectorAll('.section');
        let currentSectionIndex = num;
        let isScrolling = false; // 标志变量，防止多次触发

        // 监听鼠标滚轮事件
        window.addEventListener('wheel', (event) => {
            if (isScrolling) return; // 如果正在滚动，直接返回

            isScrolling = true; // 设置标志变量

            // 防止默认滚动行为
            event.preventDefault();

            // 判断滚动方向
            if (event.deltaY > 0) {
                // 向下滚动
                if (currentSectionIndex < sections.length - 1) {
                    currentSectionIndex++;
                }
            } else {
                // 向上滚动
                if (currentSectionIndex > 0) {
                    currentSectionIndex--;
                }
            }

            // 滚动到目标部分
            sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });

            // 滚动完成后重置标志变量
            setTimeout(() => {
                isScrolling = false;
            }, 500); // 根据滚动动画的持续时间调整
        });
}

//到底部
//右边栏和continue到指定位置显示
function toFooterBt() {
    let toFooter=$("#toFooter");
    let rightNav=$(".right_nav2");
    let continueBox=$(".continue_box");
    continueBox.children().hide();
    continueBox.children().eq(0).show();
    toFooter.on("click",function(){
        window.scrollTo({
            top:2335,
            behavior:"smooth"
        });
        ScrollNext(3);
    });
    $(window).on("scroll",function(){
        let sTop=$(window).scrollTop();
        if(sTop<$(".banner").height()){
            rightNav.fadeIn();
            continueBox.children().hide();
            continueBox.children().eq(1).show();
        }else{
            rightNav.fadeOut();
            continueBox.children().hide();
            continueBox.children().eq(0).show();
        }
    })
};

//到顶部
//右边栏和continue到指定位置显示
function toTopBt() {
    let toTop=$("#toTop");
    let rightNav=$(".right_nav");
    let continueBox=$(".continue_box");
    continueBox.children().hide();
    continueBox.children().eq(0).show();
    toTop.on("click",function(){
        window.scrollTo({
            top:0,
            behavior:"smooth"
        });
        ScrollNext(0);
    });
    rightNav.hide();
    $(window).on("scroll",function(){
        let sTop=$(window).scrollTop();
        if(sTop>$(".banner").height()){
            rightNav.fadeIn();
            continueBox.children().hide();
            continueBox.children().eq(1).show();
        }else{
            rightNav.fadeOut();
            continueBox.children().hide();
            continueBox.children().eq(0).show();
        }
    })
};
//sec动画
function clientAnimal(box){
    let ele=$(box);
    $(window).on("scroll",function(){
        let divHeight=ele[0].getBoundingClientRect().top;
        let viewHeight=$(window).height();
        let sTop=$(window).scrollTop();
        // console.log("顶部",divHeight);
        // console.log("：：",sTop);
        // console.log("视图",viewHeight);
        if(divHeight<viewHeight*0.2&&divHeight>-(viewHeight-viewHeight/2)*0.5){
            ele.children().eq(0).addClass("ani");
            ele.children().eq(1).addClass("show_container");
        }else
        {
            ele.children().eq(0).removeClass("ani");
            ele.children().eq(1).removeClass("show_container");

        }
    })
}
//添加类
function addCarSelect($this,select) {
    $this.addClass(select);  
    $this.siblings().removeClass(select); 
}
//初始化
function initBox(){
    let box1=$(".box");
    let box2 = $(".box2");  
    let box3 = $(".box3");  
    box1.hide();
    box2.hide();
    box3.hide();
}
//二级菜单1
function twoNav() {  
    // 缓存所有需要频繁查询的DOM元素  
    let navListUl = $(".nav_list > ul");  
    let navListLi = navListUl.find("> li"); 
    let carNav = $(".car_nav > ul");  
    let headerNav = $(".header_nav > ul");  
    let brandAndProduct = headerNav.children().eq(1);  
    let headerDown = $(".header_down");  
    let box = $("#dowBox");  
    let header = $("header");  
    let carDataList = $(".car_data_list");  
    let NavLi = carNav.children();  
    let NavList = $(".nav_list");  
    let data = $(".data_list"); 
    let carImgBox=$(".car_img_box");
   
    let currIndex;
    // 初始状态设置  
    let box2 = $(".box2");  
    let box3 = $(".box3");  
    box2.hide();
    box3.hide();
    header.removeClass("filter");  
    headerDown.hide();  
    navListLi.eq(0).addClass("car_select"); // 默认选中第一个  
    NavLi.eq(0).addClass("nav_select"); // 默认选中第一个  
    carDataList.children().eq(0).fadeIn();  
    carDataList.children().not(":first").fadeOut();
    NavList.children().hide().eq(0).fadeIn(); // 默认显示第一个列表  
    data.children().hide().eq(0).fadeIn(); // 默认显示第一个数据列表 
    data.children().children().hide();
    data.children().eq(0).children().eq(0).fadeIn(); 
    carImgBox.children().eq(0).fadeIn(200);
    carImgBox.children().eq(0).siblings().fadeOut(200);
    // 二级菜单显示  
    brandAndProduct.on("mouseenter", function() {  
        header.addClass("filter");  
        headerDown.fadeIn(200);  
        box.fadeIn(200);
        box2.hide();
        box3.hide();
        //list显示
        function handleNavLiMouseEnter(event) {  
            let $this = $(event.target);  
            addCarSelect($this,"nav_select");
            let index = $this.index();  
           //显示当前选择的carnav 
            navListUl.hide();  
            navListUl.eq(index).show(); 
            //给当前的carnav的第一个li添加黄色
            let li = navListUl.eq(index).children();  
            li.removeClass("car_select");
            li.eq(0).addClass("car_select");  
            //更换cardata
            carDataList.children().hide();
            carDataList.children().eq(index).show();
            carImgBox.children().eq(index).show();
            //每次更换list时,cardata的状态
            carDataList.children().eq(index).children().eq(index).show();
            carDataList.children().eq(index).children().not(":first").hide();
            // console.log("1:",index)
            currIndex=index;
            //datap
            data.children().hide();
            data.children().eq(index).show();
            data.children().eq(index).children().eq(0).show();
            data.children().eq(index).children().eq(0).siblings().hide();
            data.children().eq(index).children().eq(0).children().show(); 

        }  
        NavLi.on("mouseenter", handleNavLiMouseEnter);
        //car显示
        navListLi.on("mouseenter",function(){
            // console.log("3:",currIndex);
            let index=$(this).index();
            let $this = $(this);
            addCarSelect($this,"car_select");
            // console.log("2:",index);
            //显示carList
            carImgBox=carDataList.children().eq(currIndex);
            carImgBox.children().eq(index).siblings().hide();
            carImgBox.children().eq(index).show();
            //data显示
            data.children().children().hide();
            data.children().children().children().hide();
            data.children().eq(currIndex).children().hide();
            data.children().eq(currIndex).children().eq(index).show(); 
            data.children().eq(currIndex).children().eq(index).siblings().hide(); 
            data.children().eq(currIndex).children().eq(index).children().eq(index).show(); 
            data.children().eq(currIndex).children().eq(index).children().eq(index).siblings().show(); 



        })
    });  
    //离开二级菜单
    box.on("mouseleave", function() {  
        box.hide();
        headerDown.hide();  
        header.removeClass("filter");  
    });  
    let notbrandAndProduct = headerNav.children().eq(1).siblings();  
    notbrandAndProduct.on("mouseenter", function() {  
        box.hide();
        header.removeClass("filter");  
        headerDown.hide();  
    })
}  
//二级菜单2
function bindByCarEvents() {  
    let headerNav = $(".header_nav > ul");  
    let byCar = headerNav.children().eq(2);
    let header = $("header");  
    let headerDown = $(".header_down");  
    let box2=$(".box2")
    let box1=$(".box");
    let box2NavList=$(".box2_nav_list");
    let li=box2NavList.children();
    let productGuideR=$(".box2>.product_guide_r");
    let box3=$(".box3");
    box2.hide();
    header.removeClass("filter");  
    headerDown.hide();  
    // 绑定 mouseenter 事件  
    byCar.on("mouseenter", function() {  
        box1.hide();
        box3.hide();
        header.addClass("filter");  
        headerDown.show();
        box2.show();
        //初始化
        li.eq(0).addClass("box2_select");
        li.on("mouseenter", function() {
            let index=$(this).index();
            productGuideR.children().eq(index).siblings().hide();
            productGuideR.children().eq(index).show();
            li.removeClass("box2_select");
            li.eq(index).addClass("box2_select");
          });
    });  
    //绑定 mouseleave 事件  
    box2.on("mouseleave", function() {  
        box2.hide();
        header.removeClass("filter");  
        headerDown.hide();  
        li.removeClass("box2_select");
    });
} 
//二级菜单3
function carServe() {  
    let headerNav = $(".header_nav > ul");  
    let serve = headerNav.children().eq(3);
    let header = $("header");  
    let headerDown = $(".header_down");  
    let box3=$(".box3")
    let box1=$(".box");
    let box2=$(".box2");
    let box3NavList=$(".box3_nav_list");
    let li=box3NavList.children();
    let productGuideR=$(".product_guide_r");
    box3.hide();
    header.removeClass("filter");  
    headerDown.hide();  
    // 绑定 mouseenter 事件  
    serve.on("mouseenter", function() {  
        box2.hide();
        box1.hide();
        header.addClass("filter");  
        headerDown.show()
        box3.show();
        //初始化
        li.eq(0).addClass("box2_select");
        li.on("mouseenter", function() {
            let index=$(this).index();
            productGuideR.children().eq(index).siblings().hide();
            productGuideR.children().eq(index).show();
            li.removeClass("box2_select");
            li.eq(index).addClass("box2_select");
          })
    });  
    //绑定 mouseleave 事件  
    box3.on("mouseleave", function() {  
        box3.hide();
        header.removeClass("filter");  
        headerDown.hide();  
        li.removeClass("box2_select");
    });
} 
//car旋转
function carClickRotate(){
    let clickRotate=$(".click_rotate");
    let clicIndexRight=2;
    let clicIndexMid=1;
    let clicIndexLeft=0;
    let li=clickRotate.children();
    let LiLength=clickRotate.children().length;
    
    function indexChange(currentIndex,direction) {  
        return (currentIndex + direction) % LiLength; // 返回下一个索引  
    } 
    //右边
    clickRotate.on("click",".sec_right",function(){
        li.removeClass("sec_right sec_mid sec_left");
        clicIndexRight = indexChange(clicIndexRight,1);  
        clicIndexMid = indexChange(clicIndexMid,1);  
        clicIndexLeft = indexChange(clicIndexLeft,1);  
        li.eq(clicIndexRight).addClass("sec_right");
        li.eq(clicIndexMid).addClass("sec_mid");
        li.eq(clicIndexLeft).addClass("sec_left");
        console.log("r:",clicIndexRight);
        console.log("m:",clicIndexMid);
        console.log("l:",clicIndexLeft);
    })
    //左边
    clickRotate.on("click",".sec_left", function() {  
        li.removeClass("sec_right sec_mid sec_left");  
        clicIndexRight = indexChange(clicIndexRight,-1);  
        clicIndexMid = indexChange(clicIndexMid,-1);  
        clicIndexLeft = indexChange(clicIndexLeft,-1);  
        li.eq(clicIndexRight).addClass("sec_right");  
        li.eq(clicIndexMid).addClass("sec_mid");  
        li.eq(clicIndexLeft).addClass("sec_left");  
        console.log("left:",clicIndexRight);
    });  
}
$(function(){
    ScrollNext(0);
    lunbo();
    toTopBt();
    toFooterBt();
    clientAnimal(".section2");
    clientAnimal(".section3");
    initBox();
    twoNav();
    bindByCarEvents();
    carServe();
    carClickRotate();
})
