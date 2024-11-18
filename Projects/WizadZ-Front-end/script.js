tl = gsap.timeline();

tl.from("nav h4 , nav button ,nav h1",{
    y : -40,
    opacity : 0 ,
    duration : 1,
    delay : .5,
    stagger : .2,
})
tl.from(".cen-p1 h4 , .cen-p1 p , .cen-p1 button",{
    x : -100 ,
    opacity : 0 ,
    duration : .7,
    stagger : .2,
})
tl.from(".cen-p2",{
    x : 100 ,
    opacity : 0 ,
    duration : .7,
    stagger : .2,
},"-=1")

var tl2 =gsap.timeline({
    markers : true,
    scrollTrigger : {
        trigger : "#a",
        scroller : "body",
        start : "top 110%",   
        end : "top 20",
        scrub : 2, 
    }
})
tl2.from(" #a",{
    opacity : 0,
    duration : 1,
    y : 80,
    stagger : .2,
    ease :"back.out",
},"sujal")   // we pass same value because we want to come these elements together a and b 
tl2.from(" #b",{
    opacity : 0,
    duration : 1,
    y : 80,
    stagger : -.2,
    ease :"back.out",
},"sujal")   // we pass same value because we want to come these elements together a and b 

var tl3 =gsap.timeline({
    markers : true,
    scrollTrigger : {
        trigger : ".sec2",
        scroller : "body",
        // markers : true,
        start : "top 95%",  
        end : "top 30",
        scrub : 2, 
    }
})
tl3.from(".sec2 .services",{
    x : -100,
    opacity : 0,
    duration : 1,
})


var tl4 =gsap.timeline({
    markers : true,
    scrollTrigger : {
        trigger : ".sec2",
        scroller : "body",
        start : "top 50%",
        end : "top 50",
        scrub : 2,   
    }
})

tl4.from(".ser-left-side-card1",{
    x : -100,
    opacity : 0,
    duration : 1,
},"card1")
tl4.from(".ser-right-side-card1",{
    x : 100,
    opacity : 0,
    duration : 1,
},"card1")

var tl5 =gsap.timeline({
    scrollTrigger : {
        trigger : ".sec2",
        scroller : "body",
        start : "top 0%", 
        end : "top 80",
        scrub : 2,  
    }
})
tl5.from(".ser-left-side-card2",{
    x : -100,
    opacity : 0,
    duration : 1,
},"card2")
tl5.from(".ser-right-side-card2",{
    x : 100,
    opacity : 0,
    duration : 1,
},"card2")


var tl6 =gsap.timeline({
    markers : true,
    scrollTrigger : {
        trigger : ".sec3",
        scroller : "body",
        start : "top 90%",  
        end : "top 20",
        scrub : 2, 
    }
})
tl6.from(".sec3-con-left h1",{
    y : -60,
    opacity : 0,
    duration : 1,
},".sec3-con-left")
tl6.from(".sec3-con-left p",{
    x : -60,
    opacity : 0,
    duration : 1,
},".sec3-con-left")
tl6.from(".sec3-con-right",{
    x : 100,
    opacity : 0,
    delay : .5,
    start : "top 0%",  
    duration : 1,
},".sec3-con-left")

var tl7 =gsap.timeline({
    markers : true,
    scrollTrigger : {
        trigger : ".sec3",
        scroller : "body",
        start : "top 60%", 
        end : "top 20",
        scrub : 2,  
    }
})
tl7.from(".sec3-con-left button",{
    y : 60,
    opacity : 0,
    start : "top 0%",  
    duration : 1,
})

var tl8 =gsap.timeline({
    // markers : true,
    scrollTrigger : {
        trigger : ".sec4",
        scroller : "body",
        start : "top 90%",  
        end : "top 20",
        scrub : 2,  
    }
})
tl8.from(".sec4 .services",{
    x : -100,
    opacity : 0,
    duration : 1,
})
var tl9 =gsap.timeline({
    // markers : true,
    scrollTrigger : {
        trigger : ".sec4",
        scroller : "body",
        start : "top 65%",
        end : "top 20",
        scrub : 2,  
    }
})
tl9.from(".csc-sec1",{
    x : -100,
    opacity : 0,
    duration : 1.3,
},".csc-sec")
tl9.from(".csc-sec2",{
    y : 100,
    opacity : 0,
    duration : 1.3,
},".csc-sec")
tl9.from(".csc-sec3",{
    x : 100,
    opacity : 0,
    duration : 1.3,
},".csc-sec")