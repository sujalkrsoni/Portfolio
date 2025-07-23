// ------------------------- SEC 1 ----------------------------------
document.addEventListener("DOMContentLoaded", () => { // Wrap all code in DOMContentLoaded
    // Select elements
    const html = document.querySelector('html');
    const tiltDiv = document.querySelector(".tilted-div");
    const sec1 = document.querySelector(".sec1");
    const sec2 = document.querySelector(".sec2");
    const aTag = document.querySelectorAll("a"); // Not used in this snippet, but kept for context

    // Check if it's a touch device
    const isTouchDevice = () => {
        // Using window.matchMedia for a more robust touch detection, also considering hover capability
        // 'ontouchstart' is a classic but less reliable. maxTouchPoints is better.
        // (hover: none) and (pointer: coarse) checks for no hover capability and a coarse pointer (finger)
        return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
    };


    // --- Custom Cursor Logic ---
    const cursor = document.querySelector(".cursor");
    const cursor2 = document.querySelector("#cursor2"); // Select cursor2 explicitly

    if (!isTouchDevice()) {
        // Only enable custom cursor on non-touch devices
        html.addEventListener("mouseenter", () => {
            cursor.style.display = "block";
            gsap.to(cursor, { opacity: 1, duration: 0.3 });
        });

        html.addEventListener("mousemove", (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.2, // Snappier follow for main cursor
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
                    opacity: 1, // Ensure opacity is set
                    duration: 0.3
                });
                gsap.to(cursor, { opacity: 0, duration: 0.1 }); // Hide main cursor quickly
                if (cursor2) {
                    cursor2.style.display = "block"; // Show cursor2
                    gsap.to(cursor2, { opacity: 1, duration: 0.2 }); // Fade in cursor2
                }
            });

            item.addEventListener("mousemove", (e) => {
                gsap.to(item.childNodes[1], {
                    x: e.x - item.getBoundingClientRect().x - 170, // Adjust offset as needed
                    y: e.y - item.getBoundingClientRect().y,
                });
                // Update cursor2 position
                if (cursor2) {
                    gsap.to(cursor2, {
                        x: e.clientX,
                        y: e.clientY,
                        duration: 0.1, // Snappier follow
                    });
                }
            });

            item.addEventListener("mouseleave", (e) => {
                gsap.to(item.childNodes[1], {
                    display: "none",
                    scale: 0,
                    opacity: 0,
                    duration: 0.3
                });
                if (cursor2) {
                    gsap.to(cursor2, { opacity: 0, duration: 0.2, onComplete: () => {
                        cursor2.style.display = "none"; // Hide cursor2 after fade
                    }});
                }
                cursor.style.display = "block"; // Show main cursor again
                gsap.to(cursor, { opacity: 1, duration: 0.2 });
            });
        });

    } else {
        // Hide custom cursors on touch devices (redundant if CSS handles this, but safe)
        if (cursor) cursor.style.display = "none";
        if (cursor2) cursor2.style.display = "none";

        // IMPORTANT: For touch devices, ensure certificate images are NOT displayed on hover.
        // Your CSS media query is the best place for this:
        // @media (max-width: 480px) { .certificates img { display: none !important; } }
    }


    // --- Initial Load Animations (These should generally work fine on mobile) ---
    // Reduced durations for snappier mobile experience
    gsap.from(".nav-item", {
        y: 0,
        opacity: 0,
        duration: 0.6, // Slightly faster
        delay: 0.3,
        stagger: 0.1, // Slightly faster stagger
        ease: "back.out(4)",
    });
    gsap.from(".social-media", {
        x: 15,
        opacity: 0,
        duration: 1.5, // Faster
        delay: 0.1,
        stagger: 0.3, // Faster stagger
        ease: "back.out(4)",
    });
    gsap.from(".navbar-brand", {
        opacity: 0,
        duration: 1, // Faster
        delay: 0.3,
        ease: "back.out(4)",
    });
    gsap.from(".home-left", {
        y: 20,
        opacity: 0,
        duration: 0.6, // Faster
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
    // Removed gsap.set here as recommended. Initial opacity should be set in CSS.

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
        // Determine the animation based on device type
        if (isTouchDevice()) {
            // Animation for touch devices: come from bottom
            gsap.from(item, {
                y: 100, // Start 100px from the bottom
                opacity: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 90%", // Start when item top is 90% in view
                    end: "bottom 10%", // End when item bottom is 10% in view
                    toggleActions: "play none none none", // Play once when entering view
                    // markers: true // For debugging
                }
            });
        } else {
            // Animation for non-touch devices (desktop): original scale/opacity/margin
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: item,
                    start: "top 50%",
                    end: "bottom 63%",
                    toggleActions: "play reverse play reverse",
                }
            });
            tl.to(item, {
                    opacity: 0.3,
                    scale: 0.95,
                    duration: 0.3,
                    marginTop: "10px"
                })
                .to(item, {
                    opacity: 1,
                    scale: 1,
                    duration: 0.3,
                    marginTop: "30px",
                });
        }
    });
}); // End of DOMContentLoaded