// ------------------------- SEC 1 ----------------------------------
// Select elements
const html = document.querySelector('html');
const tiltDiv = document.querySelector(".tilted-div");
const sec1 = document.querySelector(".sec1");
const sec2 = document.querySelector(".sec2");
const aTag = document.querySelectorAll("a")
const cursor = document.querySelector(".cursor")

html.addEventListener("mouseenter",()=>{
  cursor.style.display = "block"
})
// Cursor follow animation
html.addEventListener("mousemove", (e) => {
  gsap.to(".cursor", {
    x: e.clientX,
    y: e.clientY,
    duration: 1, 
    opacity: 1,
    ease: "power3.out" // Simpler easing
  });
});

html.addEventListener("mouseleave",()=>{
  cursor.style.display = "none"
})

// Navigation and social media animations
gsap.from(".nav-item", {
  y: 0,
  opacity: 0,
  duration: 0.8,
  delay: 0.3,
  stagger: 0.14,
  ease: "back.out(4)",
});
gsap.from(".social-media", {
  x: 15,
  opacity: 0,
  duration: 2,
  delay: 0.1,
  stagger: 0.5,
  ease: "back.out(4)",
});
gsap.from(".navbar-brand", {
  opacity: 0,
  duration: 5, // Reduced duration
  delay: 0.3,
  // stagger: 0.14,
  ease: "back.out(4)",
});
gsap.from(".home-left", {
  y: 20,
  opacity: 0,
  duration: 0.7, // Reduced duration
  ease: "back.in(1)",
});


// Tilt effect on mouse move
function mouseMoving(e) {
  const rect = tiltDiv.getBoundingClientRect();
  const xVal = e.clientX - rect.x - rect.width / 2;
  const yVal = e.clientY - rect.y - rect.height / 2;
  const x = xVal / 30;
  const y = -yVal / 10;

  const xLeft = e.clientX - rect.x;
  const xRight = rect.x + rect.width;
  const yTop = e.clientY - rect.y;
  const yBottom = rect.y + rect.height;

  // Apply tilt only if within bounds to reduce unnecessary calculations
  if (xLeft > 0 && e.clientX < xRight && yTop > 0 && e.clientY < yBottom) {
    gsap.to(".tilted-div", {
      transform: `rotateY(${x}deg) rotateX(${y}deg)`,
      duration: 0.4, // Reduced duration for faster response
      ease: "power2.out"
    });
  } else {
    gsap.to(".tilted-div", {
      transform: `rotateY(0deg) rotateX(0deg)`,
      duration: 0.5,
      ease: "bounce.out"
    });
  }
}

// Apply mousemove event on sec1 for tilting effect
sec1.addEventListener("mousemove", mouseMoving);

// Reset tilt on mouse leave
sec2.addEventListener("mouseover", () => {
  gsap.to(".tilted-div", {
    transform: `rotateY(0deg) rotateX(0deg)`,
    duration: 0.5,
    ease: "bounce.out",
  });
});
sec1.addEventListener("mouseleave", () => {
  gsap.to(".tilted-div", {
    transform: `rotateY(0deg) rotateX(0deg)`,
    duration: 0.5,
    ease: "bounce.out",
  });
});




// --------------------  Sec 2 Animations ------------------------


document.querySelectorAll(".nav-link").forEach(item => {
  item.addEventListener("click", () => {
    gsap.set(".about-me-description span", { opacity: 1 });
    gsap.set(".about-me-heading", { opacity: 1 });
  });
})

// ABOUT ME HEADING
gsap.from(".about-me-heading",{
  opacity : 0,
  x : -50,
  scrollTrigger : {
    trigger : ".about-me-heading",
    start : "top 90%",
    stop : "top 20"
  }
})



// ABOUT ME DESCRIPTION 
document.querySelectorAll(".about-me-description span").forEach( word => {
  gsap.from(word , {
    opacity : .1,
    duration : .3,
    delay : .3,
    x : -50,
    scrollTrigger : {
      trigger : word,
      start : "top 80%",
    }
  })
})


// TECH STACK 
gsap.from(".tech-stack-heading",{
  opacity : 0,
  x : -50,
  scrollTrigger : {
    trigger : ".tech-stack-heading",
    start : "top 90%",
  }
})
// TECH STACK ITEM (HTML, CSS, JS,...)
document.querySelectorAll(".tech-stack ul li").forEach( item => {
    gsap.from(item, {
      opacity: 0.1,
      duration: 1,
      x: -50,
      scrollTrigger: {
        trigger: item,
        start: "top 80%",
      },
    });
});



document.querySelectorAll(".tech-stack-line").forEach((item, index, allItem) => {
  gsap.from(item, {
    opacity: 0.1,
    duration: 1,
    width : 0,
    x: -50,
    scrollTrigger: {
      trigger: item,
      start: "top 95%",
    }
  }
)});



// MY JOURNEY 
gsap.from(".learning-journey-heading",{
  opacity : 0,
  x : -50,
  scrollTrigger : {
    trigger : ".learning-journey-heading",
    start : "top 90%",
  }
})

// JOURNEY DESCRIPTION WORD BY WORD
gsap.timeline({
  scrollTrigger: {
    trigger: ".learning-journey-description",
    start: "top 80%",
  }
})
.from(".learning-journey-description span", {
  opacity: 0.1,
  x: -50,
  duration: 0.3,
  stagger: 0.1, // Add stagger effect with a delay between each word
});

// JOURNEY DESCRIPTION LINE BY LINE
// document.querySelectorAll(".learning-journey-description span").forEach( word => {
//   gsap.from(word , {
//     opacity : .1,
//     duration : .3,
//     delay : .3,
//     x : -50,
//     scrollTrigger : {
//       trigger : word,
//       start : "top 80%",
//     }
//   })
// })




// CERTIFICATIONS
gsap.from(".certificates-heading",{
  opacity : 0,
  x : -50,
  scrollTrigger : {
    trigger : ".certificates-heading",
    start : "top 90%",
  }
})

// CERTIFICATIONS ITEMS
document.querySelectorAll(".certificates ul li div > span").forEach((item, index, allItem) => {
  gsap.from(item, {
    opacity: 0,
    duration: 0.5,
    delay : 0.2,
    ease: "power2.out",
    overflow : "hidden",
    yPercent: 100,
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      overflow : "hidden"
    }
  });
});
// CERTIFICATES PROVIDED BY 
document.querySelectorAll(".certificates ul li div p").forEach((item, index, allItem) => {
  gsap.from(item, {
    opacity: 0,
    duration: 0.8,
    delay : 0.2,
    ease: "power2.out",
    overflow : "hidden",
    yPercent: 100,
    scrollTrigger: {
      trigger: item,
      start: "top 80%",
      overflow : "hidden"
    }
  });
});


// image appearing animation 
document.querySelectorAll(".certificate-item").forEach( item => {
  item.addEventListener("mouseenter",(e)=>{
    gsap.to(item.childNodes[1],{
      display : "block",
      scale : 1,
    })
  })
  item.addEventListener("mousemove",(e)=>{
    gsap.to(item.childNodes[1],{
      x : e.x - item.getBoundingClientRect().x - 170,
      y : e.y - item.getBoundingClientRect().y,
    })
  })
  item.addEventListener("mouseleave",(e)=>{
    gsap.to(item.childNodes[1],{
      display : "none",
      scale : 0,
      // opacity : 0,
    })
  })
})

let isInside = false;
// Removing cursor animation during image showing
document.querySelector(".certificates ul").addEventListener("mouseenter",()=>{
  isInside = true;
  document.querySelector(".cursor").style.display = "none";
  let cursor = document.querySelector("#cursor2")
  if(isInside){
    html.addEventListener("mousemove", (e)=>{
      cursor.style.opacity = 1;
      cursor.style.display = "block"
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    })
  }
})
// come again cursor when list is not hovering 
document.querySelector(".certificates").addEventListener("mouseleave", (e) => {
  html.addEventListener("mousemove", (e)=>{
    document.querySelector("#cursor2").style.opacity = 0;
  })
  document.querySelector(".cursor").style.display = "block";  // Show .cursor
});

// CERTIFICATIONS LINE
document.querySelectorAll(".certificates-line").forEach((item, index, allItem) => {
    gsap.from(item, {
      opacity: 0.1,
      duration: 1,
      width : 0,
      x: -50,
      scrollTrigger: {
        trigger: item,
        start: "top 95%",
      }
    }
  )});

// APPROACH 
gsap.from(".approach-heading",{
  opacity : 0,
  y : 50,
  scrollTrigger : {
    trigger : ".approach-heading",
    start : "top 90%",
  }
})

// APPROACH DESCRIPTION
document.querySelectorAll(".approach-dialogue").forEach( item => {
  gsap.from(item,{
    opacity : 0,
    y : 50,
    scrollTrigger : {
      trigger : item,
      start : "top 80%",
    }
  })
})







// ------------------------------ sec3 -----------------------

document.querySelectorAll(".projects img").forEach(item => {
  // Create a timeline for each image
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: item,
      start: "top 50%",    // Start trigger when the top of the item reaches 95% of the viewport height
      end: "bottom 63%",   // End trigger when the bottom of the item reaches 15% of the viewport height
      toggleActions: "play reverse play reverse", // Play forward on scroll down, reverse on scroll up
    }
  });

  // Set the initial animation to scale down and set opacity to 0.5 with margin
  tl.to(item, { 
    opacity: 0.3, 
    scale: 0.95, 
    duration: 0.3, 
    marginTop: "10px" 
  })
  // Transition to full opacity, scale up, and increase margin when scrolling further
  .to(item, { 
    opacity: 1, 
    scale: 1, 
    duration: 0.3, 
    marginTop: "30px", 
  });
});






