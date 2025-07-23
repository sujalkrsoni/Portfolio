// ------------------------- SEC 1 ----------------------------------
const html = document.querySelector('html');
const tiltDiv = document.querySelector(".tilted-div");
const sec1 = document.querySelector(".sec1");
const sec2 = document.querySelector(".sec2");
const aTag = document.querySelectorAll("a"); // Not used in this snippet, but kept for context

// Check if it's a touch device
const isTouchDevice = () => {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};

// --- Custom Cursor Logic ---
const cursor = document.querySelector(".cursor");
const cursor2 = document.querySelector("#cursor2"); // Select cursor2 explicitly

if (!isTouchDevice()) {
    // Only enable custom cursor on non-touch devices
    html.addEventListener("mouseenter", () => {
        cursor.style.display = "block";
    });

    html.addEventListener("mousemove", (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.5, // Reduced duration for snappier feel
            opacity: 1,
            ease: "power2.out"
        });
    });

    html.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
            opacity: 0,
            duration: 0.3,
            onComplete: () => {
                cursor.style.display = "none";
            }
        });
    });

    // Handle cursor for certificate images on non-touch devices
    document.querySelectorAll(".certificate-item").forEach(item => {
        item.addEventListener("mouseenter", (e) => {
            gsap.to(item.childNodes[1], {
                display: "block",
                scale: 1,
                opacity: 1 // Ensure opacity is set
            });
            cursor.style.display = "none"; // Hide main cursor
            gsap.to(cursor2, { opacity: 1, duration: 0.2 }); // Show cursor2
        });

        item.addEventListener("mousemove", (e) => {
            gsap.to(item.childNodes[1], {
                x: e.x - item.getBoundingClientRect().x - 170, // Adjust offset as needed
                y: e.y - item.getBoundingClientRect().y,
            });
            // Update cursor2 position
            gsap.to(cursor2, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.1, // Snappier follow
            });
        });

        item.addEventListener("mouseleave", (e) => {
            gsap.to(item.childNodes[1], {
                display: "none",
                scale: 0,
                opacity: 0,
                duration: 0.3
            });
            gsap.to(cursor2, { opacity: 0, duration: 0.2, onComplete: () => {
                cursor2.style.display = "none"; // Hide cursor2 after fade
            }});
            cursor.style.display = "block"; // Show main cursor again
            gsap.to(cursor, { opacity: 1, duration: 0.2 });
        });
    });

    // Remove cursor animation during image showing - refined
    document.querySelector(".certificates ul").addEventListener("mouseenter", () => {
        // This block is largely replaced by the individual item event listeners above
        // but if there's a need for a general .certificates ul hover, keep this in mind.
        // It's usually better to handle cursor changes on specific interactive elements.
    });

    document.querySelector(".certificates").addEventListener("mouseleave", (e) => {
        // This also might be redundant if individual item listeners handle it correctly.
        // The main cursor should reappear when leaving any certificate item.
    });

} else {
    // Hide custom cursors on touch devices
    cursor.style.display = "none";
    if (cursor2) { // Check if cursor2 exists before trying to access it
        cursor2.style.display = "none";
    }
    // Also remove event listeners for mouse-based cursor if they were added via GSAP setup
    html.removeEventListener("mousemove", (e) => {
        gsap.to(".cursor", {
            x: e.clientX,
            y: e.clientY,
            duration: 1,
            opacity: 1,
            ease: "power3.out"
        });
    });
    // And for certificate item hovers - ensure these are not active
    document.querySelectorAll(".certificate-item").forEach(item => {
        // Remove listeners or ensure they don't apply
        item.removeEventListener("mouseenter", () => {}); // placeholder for actual functions
        item.removeEventListener("mousemove", () => {});
        item.removeEventListener("mouseleave", () => {});
    });
}


// --- Initial Load Animations (These should generally work fine on mobile) ---
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
    duration: 1.5, // Reduced duration for quicker load on mobile
    delay: 0.3,
    ease: "back.out(4)",
});
gsap.from(".home-left", {
    y: 20,
    opacity: 0,
    duration: 0.7,
    ease: "back.in(1)",
});

// --- Tilt Effect ---
if (!isTouchDevice()) {
    function mouseMoving(e) {
        const rect = tiltDiv.getBoundingClientRect();
        const xVal = e.clientX - rect.x - rect.width / 2;
        const yVal = e.clientY - rect.y - rect.height / 2;
        const x = xVal / 30;
        const y = -yVal / 10;

        // Apply tilt only if within bounds
        if (e.clientX > rect.left && e.clientX < rect.right && e.clientY > rect.top && e.clientY < rect.bottom) {
            gsap.to(tiltDiv, {
                rotationY: x, // Use rotationY/rotationX for simpler GSAP syntax
                rotationX: y,
                duration: 0.4,
                ease: "power2.out"
            });
        } else {
            gsap.to(tiltDiv, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: "bounce.out"
            });
        }
    }

    sec1.addEventListener("mousemove", mouseMoving);
    sec2.addEventListener("mouseover", () => {
        gsap.to(tiltDiv, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "bounce.out",
        });
    });
    sec1.addEventListener("mouseleave", () => {
        gsap.to(tiltDiv, {
            rotationY: 0,
            rotationX: 0,
            duration: 0.5,
            ease: "bounce.out",
        });
    });
} else {
    // Ensure the tilted-div is not transformed if it's a touch device
    gsap.set(tiltDiv, { clearProps: "transform" });
}

// -------------------- Sec 2 Animations ------------------------

// Set initial opacity for elements that are animated on scroll
// This prevents them from being visible before ScrollTrigger applies
gsap.set([
    ".about-me-heading",
    ".about-me-description span",
    ".tech-stack-heading",
    ".tech-stack ul li",
    ".tech-stack-line",
    ".learning-journey-heading",
    ".learning-journey-description span",
    ".certificates-heading",
    ".certificates ul li div > span",
    ".certificates ul li div p",
    ".certificates-line",
    ".approach-heading",
    ".approach-dialogue"
], { opacity: 0 }); // Initial state: invisible

// ABOUT ME HEADING
gsap.from(".about-me-heading", {
    opacity: 0,
    x: -50,
    scrollTrigger: {
        trigger: ".about-me-heading",
        start: "top 90%",
        toggleActions: "play none none none" // Play once on scroll down
    }
});

// ABOUT ME DESCRIPTION
document.querySelectorAll(".about-me-description span").forEach(word => {
    gsap.from(word, {
        opacity: 0.1,
        duration: 0.3,
        x: -50,
        scrollTrigger: {
            trigger: word,
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});

// TECH STACK
gsap.from(".tech-stack-heading", {
    opacity: 0,
    x: -50,
    scrollTrigger: {
        trigger: ".tech-stack-heading",
        start: "top 90%",
        toggleActions: "play none none none"
    }
});
// TECH STACK ITEM (HTML, CSS, JS,...)
document.querySelectorAll(".tech-stack ul li").forEach(item => {
    gsap.from(item, {
        opacity: 0.1,
        duration: 0.5, // Reduced duration
        x: -50,
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        },
    });
});

document.querySelectorAll(".tech-stack-line").forEach(item => {
    gsap.from(item, {
        opacity: 0.1,
        duration: 0.5, // Reduced duration
        width: 0,
        x: -50,
        scrollTrigger: {
            trigger: item,
            start: "top 95%",
            toggleActions: "play none none none"
        }
    });
});

// MY JOURNEY
gsap.from(".learning-journey-heading", {
    opacity: 0,
    x: -50,
    scrollTrigger: {
        trigger: ".learning-journey-heading",
        start: "top 90%",
        toggleActions: "play none none none"
    }
});

// JOURNEY DESCRIPTION WORD BY WORD
gsap.timeline({
    scrollTrigger: {
        trigger: ".learning-journey-description",
        start: "top 80%",
        toggleActions: "play none none none"
    }
}).from(".learning-journey-description span", {
    opacity: 0.1,
    x: -50,
    duration: 0.2, // Reduced duration
    stagger: 0.05, // Reduced stagger
});

// CERTIFICATIONS
gsap.from(".certificates-heading", {
    opacity: 0,
    x: -50,
    scrollTrigger: {
        trigger: ".certificates-heading",
        start: "top 90%",
        toggleActions: "play none none none"
    }
});

// CERTIFICATIONS ITEMS
document.querySelectorAll(".certificates ul li div > span").forEach(item => {
    gsap.from(item, {
        opacity: 0,
        duration: 0.4, // Reduced duration
        ease: "power2.out",
        yPercent: 100,
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});
// CERTIFICATES PROVIDED BY
document.querySelectorAll(".certificates ul li div p").forEach(item => {
    gsap.from(item, {
        opacity: 0,
        duration: 0.6, // Reduced duration
        ease: "power2.out",
        yPercent: 100,
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});

// CERTIFICATES LINE
document.querySelectorAll(".certificates-line").forEach(item => {
    gsap.from(item, {
        opacity: 0.1,
        duration: 0.5, // Reduced duration
        width: 0,
        x: -50,
        scrollTrigger: {
            trigger: item,
            start: "top 95%",
            toggleActions: "play none none none"
        }
    });
});

// APPROACH
gsap.from(".approach-heading", {
    opacity: 0,
    y: 50,
    scrollTrigger: {
        trigger: ".approach-heading",
        start: "top 90%",
        toggleActions: "play none none none"
    }
});

// APPROACH DESCRIPTION
document.querySelectorAll(".approach-dialogue").forEach(item => {
    gsap.from(item, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
            trigger: item,
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });
});

// ------------------------------ sec3 -----------------------
document.querySelectorAll(".projects img").forEach(item => {
    // Create a timeline for each image
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: item,
            start: "top 50%",
            end: "bottom 63%",
            // Keep toggleActions: "play reverse play reverse" for desktop if desired
            // But consider "play none none none" for mobile if performance is an issue.
            // For now, keeping original as it's a critical animation for you.
            toggleActions: "play reverse play reverse",
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