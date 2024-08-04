let tl = gsap.timeline()
let time = gsap.timeline()

tl.from("#nav h1, #nav ul li,#nav h2 ", {
    y:-100,
    delay:1,
    opacity:0,
    duration:1,
    stagger:0.2
})

time.from("#left h1", {
    x:-100,
    delay:1,
    opacity:0,
    duration:1,
    stagger:0.3
})
time.from("#right img", {
    scale:0,
    opacity:0,
    duration:1,
    stagger:0.1
})

gsap.from(".page2 .box", {
    y:-100,
    opacity:0,
    duration:1,
    stagger:0.4,
    scrollTrigger:".page2 .box"

})