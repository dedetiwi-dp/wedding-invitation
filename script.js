// ========================================
// OPEN INVITATION
// ========================================

const openButton = document.querySelector(".open-button");
const opening = document.querySelector(".opening");
const mainContent = document.querySelector(".main-content");

openButton.addEventListener("click", () => {

    opening.style.display = "none";
    mainContent.style.display = "block";

    weddingMusic.play();
        
    createFireworks();

    startCountdown();

});


// ========================================
// COUNTDOWN
// ========================================

function startCountdown() {

    const weddingDate = new Date(
        "September 20, 2026 10:00:00"
    ).getTime();


    function updateCountdown() {

        const now = new Date().getTime();

        const distance = weddingDate - now;


        if (distance <= 0) {

            document.querySelector("#days").textContent = "00";
            document.querySelector("#hours").textContent = "00";
            document.querySelector("#minutes").textContent = "00";
            document.querySelector("#seconds").textContent = "00";

            return;

        }


        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            / (1000 * 60 * 60)
        );

        const minutes = Math.floor(
            (distance % (1000 * 60 * 60))
            / (1000 * 60)
        );

        const seconds = Math.floor(
            (distance % (1000 * 60))
            / 1000
        );


        document.querySelector("#days").textContent =
            String(days).padStart(2, "0");

        document.querySelector("#hours").textContent =
            String(hours).padStart(2, "0");

        document.querySelector("#minutes").textContent =
            String(minutes).padStart(2, "0");

        document.querySelector("#seconds").textContent =
            String(seconds).padStart(2, "0");

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);

}

// ========================================
// MUSIC
// ========================================

const musicButton = document.querySelector("#musicButton");
const weddingMusic = document.querySelector("#weddingMusic");

let musicPlaying = false;

musicButton.addEventListener("click", () => {

    if (musicPlaying) {

        weddingMusic.pause();

        musicButton.textContent = "♫ Music";

        musicPlaying = false;

    } else {

        weddingMusic.play();

        musicButton.textContent = "❚❚ Music";

        musicPlaying = true;

    }

});

// ========================================
// RSVP
// ========================================

const rsvpForm = document.querySelector("#rsvpForm");
const rsvpMessage = document.querySelector("#rsvpMessage");

rsvpForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.querySelector("#guestName").value;
    const attendance = document.querySelector("#attendance").value;
    const guestCount = document.querySelector("#guestCount").value;

    if (attendance === "yes") {

        rsvpMessage.textContent =
            `Thank you, ${name}! We can't wait to see you with ${guestCount} guest(s). ❤️`;

    } else {

        rsvpMessage.textContent =
            `Thank you, ${name}. We truly appreciate your response. ❤️`;

    }

    rsvpForm.reset();

});


// ========================================
// WEDDING WISHES
// ========================================

const wishForm = document.querySelector("#wishForm");
const wishList = document.querySelector("#wishList");

wishForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const name = document.querySelector("#wishName").value;
    const message = document.querySelector("#wishMessage").value;

    const wishCard = document.createElement("div");

    wishCard.className = "wish-card";

    wishCard.innerHTML = `
        <strong>${name}</strong>
        <p>${message}</p>
    `;

    wishList.prepend(wishCard);

    wishForm.reset();

});

// ========================================
// GALLERY LIGHTBOX
// ========================================

const galleryImages =
    document.querySelectorAll(".gallery-grid img");

const lightbox =
    document.querySelector("#lightbox");

const lightboxImage =
    document.querySelector("#lightboxImage");

const lightboxClose =
    document.querySelector("#lightboxClose");


if (
    galleryImages.length &&
    lightbox &&
    lightboxImage &&
    lightboxClose
) {

    galleryImages.forEach((image) => {

        image.addEventListener("click", () => {

            lightboxImage.src = image.src;

            lightbox.classList.add("active");

        });

    });


    lightboxClose.addEventListener("click", () => {

        lightbox.classList.remove("active");

    });


    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {

            lightbox.classList.remove("active");

        }

    });

}

// ========================================
// SCROLL REVEAL
// ========================================

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

                revealObserver.unobserve(
                    entry.target
                );

            }

        });

    }, {
        threshold: 0.15
    });


revealElements.forEach((element) => {

    revealObserver.observe(element);

});

// ========================================
// WEDDING FIREWORKS
// ========================================

function createFireworks() {

    const fireworks =
        document.querySelector("#fireworks");

    if (!fireworks) {
        return;
    }


    const particleCount = 70;


    for (let i = 0; i < particleCount; i++) {

        const particle =
            document.createElement("span");

        particle.className =
            "firework-particle";


        const angle =
            Math.random() * Math.PI * 2;

        const distance =
            100 + Math.random() * 220;


        const x =
            Math.cos(angle) * distance;

        const y =
            Math.sin(angle) * distance;


        particle.style.setProperty(
            "--x",
            `${x}px`
        );

        particle.style.setProperty(
            "--y",
            `${y}px`
        );


        particle.style.left = "50%";
        particle.style.top = "50%";


        fireworks.appendChild(particle);


        setTimeout(() => {

            particle.remove();

        }, 1300);

    }

}

// ========================================
// SHARE INVITATION
// ========================================

const shareButton =
    document.querySelector("#shareButton");

const shareMessage =
    document.querySelector("#shareMessage");


if (shareButton && shareMessage) {

    shareButton.addEventListener("click", async () => {

        const invitationUrl =
            window.location.href;


        if (navigator.share) {

            try {

                await navigator.share({
                    title: "Alex & Maya — Wedding Invitation",
                    text: "You are invited to celebrate our special day with us. ❤️",
                    url: invitationUrl
                });

            } catch (error) {

                // User closed the share menu.
                // Nothing needs to happen.

            }

        } else {

            try {

                await navigator.clipboard.writeText(
                    invitationUrl
                );

                shareMessage.textContent =
                    "Invitation link copied! ❤️";

            } catch (error) {

                shareMessage.textContent =
                    "Please copy the link from your browser.";

            }

        }

    });

}

// ========================================
// WEDDING GIFT
// ========================================

const copyAccount =
    document.querySelector("#copyAccount");

const accountNumber =
    document.querySelector("#accountNumber");

const copyMessage =
    document.querySelector("#copyMessage");


if (
    copyAccount &&
    accountNumber &&
    copyMessage
) {

    copyAccount.addEventListener("click", async () => {

        try {

            await navigator.clipboard.writeText(
                accountNumber.textContent.trim()
            );

            copyMessage.textContent =
                "Account number copied! ❤️";

        } catch (error) {

            copyMessage.textContent =
                "Please copy the account number manually.";

        }

    });

}
