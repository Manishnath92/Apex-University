/* =====================================================
   APEX UNIVERSITY - LANDING PAGE JAVASCRIPT
===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
    ================================================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const header = document.querySelector(".header");
    const backToTop = document.getElementById("backToTop");

    /* =================================================
       MOBILE MENU
    ================================================= */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const icon = menuToggle.querySelector("i");

            if (navMenu.classList.contains("active")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });


        // Close menu after clicking a link

        const navLinks = navMenu.querySelectorAll(".nav-link");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                const icon = menuToggle.querySelector("i");

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            });

        });

    }


    /* =================================================
       HEADER ON SCROLL
    ================================================= */

    function handleHeaderScroll() {

        if (!header) return;

        if (window.scrollY > 50) {

            header.classList.add("scrolled");

        } else {

            header.classList.remove("scrolled");

        }

    }

    window.addEventListener("scroll", handleHeaderScroll);

    handleHeaderScroll();


    /* =================================================
       SMOOTH SCROLL
    ================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                header ? header.offsetHeight : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight -
                10;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =================================================
       ACTIVE NAVIGATION LINK
    ================================================= */

    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =================================================
       PROGRAM FILTER
    ================================================= */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const programCards =
        document.querySelectorAll(".program-card");


    filterButtons.forEach(button => {

        button.addEventListener("click", () => {

            const filter =
                button.getAttribute("data-filter");


            // Active button

            filterButtons.forEach(btn => {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            // Filter cards

            programCards.forEach(card => {

                const category =
                    card.getAttribute("data-category");


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    card.style.display = "block";

                    setTimeout(() => {

                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";

                    }, 50);

                } else {

                    card.style.opacity = "0";
                    card.style.transform = "translateY(15px)";

                    setTimeout(() => {

                        card.style.display = "none";

                    }, 250);

                }

            });

        });

    });


    /* =================================================
       FAQ ACCORDION
    ================================================= */

    const faqItems =
        document.querySelectorAll(".faq-item");


    faqItems.forEach(item => {

        const question =
            item.querySelector(".faq-question");

        const answer =
            item.querySelector(".faq-answer");

        const icon =
            item.querySelector(".faq-icon i");


        if (!question || !answer) return;


        question.addEventListener("click", () => {

            const isOpen =
                item.classList.contains("active");


            // Close all other FAQ items

            faqItems.forEach(otherItem => {

                if (otherItem !== item) {

                    otherItem.classList.remove("active");

                    const otherAnswer =
                        otherItem.querySelector(".faq-answer");

                    const otherIcon =
                        otherItem.querySelector(".faq-icon i");


                    if (otherAnswer) {

                        otherAnswer.style.maxHeight = null;

                    }

                    if (otherIcon) {

                        otherIcon.classList.remove("fa-minus");
                        otherIcon.classList.add("fa-plus");

                    }

                }

            });


            // Toggle current item

            if (!isOpen) {

                item.classList.add("active");

                answer.style.maxHeight =
                    answer.scrollHeight + "px";


                if (icon) {

                    icon.classList.remove("fa-plus");
                    icon.classList.add("fa-minus");

                }

            } else {

                item.classList.remove("active");

                answer.style.maxHeight = null;


                if (icon) {

                    icon.classList.remove("fa-minus");
                    icon.classList.add("fa-plus");

                }

            }

        });

    });


    /* =================================================
       TESTIMONIAL SLIDER
    ================================================= */

    const testimonials =
        document.querySelectorAll(".testimonial");

    const dots =
        document.querySelectorAll(".dot");

    const prevButton =
        document.querySelector(".prev-btn");

    const nextButton =
        document.querySelector(".next-btn");


    let currentSlide = 0;
    let testimonialTimer;


    function showSlide(index) {

        if (testimonials.length === 0) return;


        // Loop slides

        if (index >= testimonials.length) {

            currentSlide = 0;

        } else if (index < 0) {

            currentSlide = testimonials.length - 1;

        } else {

            currentSlide = index;

        }


        // Hide all testimonials

        testimonials.forEach((testimonial, i) => {

            testimonial.classList.remove("active");

            testimonial.style.display = "none";

            if (i === currentSlide) {

                testimonial.style.display = "block";

                setTimeout(() => {

                    testimonial.classList.add("active");

                }, 20);

            }

        });


        // Update dots

        dots.forEach((dot, i) => {

            dot.classList.toggle(
                "active",
                i === currentSlide
            );

        });

    }


    if (prevButton) {

        prevButton.addEventListener("click", () => {

            showSlide(currentSlide - 1);

            restartTestimonialTimer();

        });

    }


    if (nextButton) {

        nextButton.addEventListener("click", () => {

            showSlide(currentSlide + 1);

            restartTestimonialTimer();

        });

    }


    dots.forEach((dot, index) => {

        dot.addEventListener("click", () => {

            showSlide(index);

            restartTestimonialTimer();

        });

    });


    function startTestimonialTimer() {

        testimonialTimer = setInterval(() => {

            showSlide(currentSlide + 1);

        }, 5000);

    }


    function restartTestimonialTimer() {

        clearInterval(testimonialTimer);

        startTestimonialTimer();

    }


    if (testimonials.length > 0) {

        showSlide(0);

        startTestimonialTimer();

    }


    /* =================================================
       CONTACT FORM
    ================================================= */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();


            const name =
                document.getElementById("name")?.value.trim();

            const email =
                document.getElementById("email")?.value.trim();

            const phone =
                document.getElementById("phone")?.value.trim();

            const program =
                document.getElementById("program")?.value;

            const message =
                document.getElementById("message")?.value.trim();


            /* -----------------------------------------
               Validation
            ----------------------------------------- */

            if (!name || !email || !message) {

                showFormMessage(
                    "Please fill in all required fields.",
                    "error"
                );

                return;

            }


            // Basic email validation

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                showFormMessage(
                    "Please enter a valid email address.",
                    "error"
                );

                return;

            }


            /* -----------------------------------------
               Success
            ----------------------------------------- */

            console.log("Contact Form Data:", {
                name,
                email,
                phone,
                program,
                message
            });


            showFormMessage(
                "Thank you! Your enquiry has been received.",
                "success"
            );


            contactForm.reset();

        });

    }


    function showFormMessage(message, type) {

        if (!formMessage) return;

        formMessage.textContent = message;

        formMessage.className =
            `form-message ${type}`;


        setTimeout(() => {

            formMessage.textContent = "";

            formMessage.className =
                "form-message";

        }, 5000);

    }


    /* =================================================
       BACK TO TOP
    ================================================= */

    if (backToTop) {

        window.addEventListener("scroll", () => {

            if (window.scrollY > 500) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =================================================
       SCROLL REVEAL ANIMATION
    ================================================= */

    const revealElements =
        document.querySelectorAll(".reveal");


    const revealObserver =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(element => {

        revealObserver.observe(element);

    });


    /* =================================================
       STAGGER CARD ANIMATION
    ================================================= */

    const cardGroups = [

        ".feature-card",
        ".program-card",
        ".admission-step",
        ".life-card",
        ".achievement-card",
        ".news-card"

    ];


    cardGroups.forEach(selector => {

        const cards =
            document.querySelectorAll(selector);


        cards.forEach((card, index) => {

            card.style.transitionDelay =
                `${index * 80}ms`;

        });

    });


    /* =================================================
       CURRENT YEAR
    ================================================= */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =================================================
       IMAGE ERROR HANDLING
    ================================================= */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener("error", () => {

            image.style.opacity = "0.5";

        });

    });


    /* =================================================
       ESC KEY
    ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") return;


        // Close mobile menu

        if (navMenu) {

            navMenu.classList.remove("active");

        }


        if (menuToggle) {

            const icon =
                menuToggle.querySelector("i");


            if (icon) {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        }


        // Close FAQs

        faqItems.forEach(item => {

            item.classList.remove("active");

            const answer =
                item.querySelector(".faq-answer");

            const icon =
                item.querySelector(".faq-icon i");


            if (answer) {

                answer.style.maxHeight = null;

            }


            if (icon) {

                icon.classList.remove("fa-minus");
                icon.classList.add("fa-plus");

            }

        });

    });


    /* =================================================
       PAGE LOADED
    ================================================= */

    console.log(
        "Apex University Landing Page Loaded Successfully 🚀"
    );

});