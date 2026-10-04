/* ==================================================
   HERO IMAGE SLIDER
================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==================================================
       HERO SLIDER
    ================================================== */

    const slides = document.querySelectorAll(".slide");

    const prevButton = document.getElementById("prev");
    const nextButton = document.getElementById("next");

    let currentSlide = 0;
    let autoSlide;


    /* ==================================================
       SHOW SLIDE
    ================================================== */

    function showSlide(index) {

        if (slides.length === 0) {
            return;
        }

        slides.forEach(function (slide) {
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");

    }


    /* ==================================================
       NEXT SLIDE
    ================================================== */

    function nextSlide() {

        if (slides.length === 0) {
            return;
        }

        currentSlide++;

        if (currentSlide >= slides.length) {
            currentSlide = 0;
        }

        showSlide(currentSlide);

    }


    /* ==================================================
       PREVIOUS SLIDE
    ================================================== */

    function previousSlide() {

        if (slides.length === 0) {
            return;
        }

        currentSlide--;

        if (currentSlide < 0) {
            currentSlide = slides.length - 1;
        }

        showSlide(currentSlide);

    }


    /* ==================================================
       START AUTOPLAY
    ================================================== */

    function startAutoSlide() {

        clearInterval(autoSlide);

        autoSlide = setInterval(function () {

            nextSlide();

        }, 4000);

    }


    /* ==================================================
       RESTART AUTOPLAY
    ================================================== */

    function restartAutoSlide() {

        clearInterval(autoSlide);

        startAutoSlide();

    }


    /* ==================================================
       ARROW BUTTONS
    ================================================== */

    if (nextButton) {

        nextButton.addEventListener("click", function () {

            nextSlide();

            restartAutoSlide();

        });

    }


    if (prevButton) {

        prevButton.addEventListener("click", function () {

            previousSlide();

            restartAutoSlide();

        });

    }


    /* ==================================================
       KEYBOARD
    ================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "ArrowRight") {

            nextSlide();

            restartAutoSlide();

        }

        if (event.key === "ArrowLeft") {

            previousSlide();

            restartAutoSlide();

        }

    });


    /* ==================================================
       HERO SWIPE
    ================================================== */

    const hero = document.querySelector(".hero");

    let touchStartX = 0;
    let touchEndX = 0;


    if (hero) {

        hero.addEventListener("touchstart", function (event) {

            touchStartX =
                event.changedTouches[0].screenX;

        });


        hero.addEventListener("touchend", function (event) {

            touchEndX =
                event.changedTouches[0].screenX;

            const difference =
                touchStartX - touchEndX;


            if (difference > 50) {

                nextSlide();

                restartAutoSlide();

            }


            if (difference < -50) {

                previousSlide();

                restartAutoSlide();

            }

        });

    }


    /* ==================================================
       INITIAL HERO SLIDE
    ================================================== */

    if (slides.length > 0) {

        showSlide(0);

        startAutoSlide();

    }


    /* ==================================================
       BUTTON RIPPLE EFFECT
    ================================================== */

    document
        .querySelectorAll(".btn")
        .forEach(function (button) {

            button.addEventListener("click", function (event) {

                const oldRipple =
                    this.querySelector(".ripple");

                if (oldRipple) {
                    oldRipple.remove();
                }


                const circle =
                    document.createElement("span");


                const diameter =
                    Math.max(
                        this.clientWidth,
                        this.clientHeight
                    );


                circle.style.width =
                    diameter + "px";

                circle.style.height =
                    diameter + "px";


                circle.style.left =
                    event.offsetX -
                    diameter / 2 +
                    "px";


                circle.style.top =
                    event.offsetY -
                    diameter / 2 +
                    "px";


                circle.classList.add("ripple");


                this.appendChild(circle);

            });

        });


    /* ==================================================
       SECTION FADE-IN
    ================================================== */

    const sections =
        document.querySelectorAll(".section");


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.style.opacity = "1";

                        entry.target.style.transform =
                            "translateY(0)";

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    sections.forEach(function (section) {

        section.style.opacity = "0";

        section.style.transform =
            "translateY(60px)";

        section.style.transition =
            "opacity 0.8s ease, transform 0.8s ease";

        observer.observe(section);

    });


    /* ==================================================
       PHOTO GALLERY
    ================================================== */

    const galleryTrack =
        document.querySelector(".gallery-track");


    const galleryImages =
        document.querySelectorAll(
            ".gallery-track img"
        );


    const galleryPrev =
        document.getElementById("galleryPrev");


    const galleryNext =
        document.getElementById("galleryNext");


    const galleryDots =
        document.querySelectorAll(
            ".gallery-dots .dot"
        );


    let galleryIndex = 0;

    let galleryAutoSlide;


    /* ==================================================
       UPDATE GALLERY
    ================================================== */

    function updateGallery() {

        if (
            !galleryTrack ||
            galleryImages.length === 0
        ) {
            return;
        }


        galleryTrack.style.transform =
            "translateX(-" +
            (galleryIndex * 100) +
            "%)";


        galleryDots.forEach(function (dot) {

            dot.classList.remove("active");

        });


        if (galleryDots[galleryIndex]) {

            galleryDots[galleryIndex]
                .classList.add("active");

        }

    }


    /* ==================================================
       NEXT GALLERY IMAGE
    ================================================== */

    function nextGallery() {

        if (galleryImages.length === 0) {
            return;
        }


        galleryIndex++;


        if (
            galleryIndex >=
            galleryImages.length
        ) {

            galleryIndex = 0;

        }


        updateGallery();

    }


    /* ==================================================
       PREVIOUS GALLERY IMAGE
    ================================================== */

    function previousGallery() {

        if (galleryImages.length === 0) {
            return;
        }


        galleryIndex--;


        if (galleryIndex < 0) {

            galleryIndex =
                galleryImages.length - 1;

        }


        updateGallery();

    }


    /* ==================================================
       GALLERY BUTTONS
    ================================================== */

    if (galleryNext) {

        galleryNext.addEventListener(
            "click",
            function () {

                nextGallery();

                restartGalleryAuto();

            }
        );

    }


    if (galleryPrev) {

        galleryPrev.addEventListener(
            "click",
            function () {

                previousGallery();

                restartGalleryAuto();

            }
        );

    }


    /* ==================================================
       GALLERY AUTOPLAY
    ================================================== */

    function startGalleryAuto() {

        clearInterval(galleryAutoSlide);


        galleryAutoSlide =
            setInterval(
                function () {

                    nextGallery();

                },
                3500
            );

    }


    function restartGalleryAuto() {

        clearInterval(galleryAutoSlide);

        startGalleryAuto();

    }


    /* ==================================================
       GALLERY DOTS
    ================================================== */

    galleryDots.forEach(
        function (dot, index) {

            dot.addEventListener(
                "click",
                function () {

                    if (
                        index >=
                        galleryImages.length
                    ) {
                        return;
                    }


                    galleryIndex = index;

                    updateGallery();

                    restartGalleryAuto();

                }
            );

        }
    );


    /* ==================================================
       GALLERY SWIPE
    ================================================== */

    const galleryWrapper =
        document.querySelector(
            ".gallery-wrapper"
        );


    let galleryStartX = 0;
    let galleryEndX = 0;


    if (galleryWrapper) {

        galleryWrapper.addEventListener(
            "touchstart",
            function (event) {

                galleryStartX =
                    event.changedTouches[0]
                        .screenX;

            }
        );


        galleryWrapper.addEventListener(
            "touchend",
            function (event) {

                galleryEndX =
                    event.changedTouches[0]
                        .screenX;


                const difference =
                    galleryStartX -
                    galleryEndX;


                if (difference > 50) {

                    nextGallery();

                    restartGalleryAuto();

                }


                if (difference < -50) {

                    previousGallery();

                    restartGalleryAuto();

                }

            }
        );

    }


    /* ==================================================
       GALLERY KEYBOARD
    ================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "ArrowRight") {

                nextGallery();

                restartGalleryAuto();

            }


            if (event.key === "ArrowLeft") {

                previousGallery();

                restartGalleryAuto();

            }

        }
    );


    /* ==================================================
       INITIAL GALLERY
    ================================================== */

    if (galleryImages.length > 0) {

        updateGallery();

        startGalleryAuto();

    }


    /* ==================================================
       PRELOAD HERO IMAGES
    ================================================== */

    document
        .querySelectorAll(".slide img")
        .forEach(function (img) {

            const image =
                new Image();

            image.src = img.src;

        });


    /* ==================================================
       CONSOLE
    ================================================== */

    console.log(
        "%cMarriage Profile by AbdulRahman",
        "color:gold;font-size:20px;font-weight:bold;"
    );

});