/* =====================================================
   BIRTHDAY SURPRISE WEBSITE
   CLEAN COMPLETE JAVASCRIPT
===================================================== */


/* =====================================================
   SCREEN SYSTEM
===================================================== */

const screens =
    document.querySelectorAll(".screen");

const transitionOverlay =
    document.getElementById("transitionOverlay");


function showScreen(id, useTransition = true) {

    const nextScreen =
        document.getElementById(id);

    if (!nextScreen) {

        console.error(
            `Screen "${id}" was not found.`
        );

        return;
    }


    if (!useTransition) {

        screens.forEach(screen => {

            screen.classList.remove("active");

        });

        nextScreen.classList.add("active");

        return;
    }


    if (!transitionOverlay) {

        screens.forEach(screen => {

            screen.classList.remove("active");

        });

        nextScreen.classList.add("active");

        return;
    }


    transitionOverlay.classList.add("show");


    setTimeout(() => {

        screens.forEach(screen => {

            screen.classList.remove("active");

        });

        nextScreen.classList.add("active");

    }, 380);


    setTimeout(() => {

        transitionOverlay.classList.remove("show");

    }, 850);
}


/* =====================================================
   SURPRISE COMPLETION SYSTEM
===================================================== */

const completedSurprises = {

    envelope: false,
    flower: false,
    choice: false,
    games: false,
    book: false

};


const completedCount =
    document.getElementById(
        "completedCount"
    );


const surpriseCards = {

    envelope:
        document.getElementById(
            "envelopeItem"
        ),

    flower:
        document.getElementById(
            "flowerItem"
        ),

    choice:
        document.getElementById(
            "choiceItem"
        ),

    games:
        document.getElementById(
            "gamesItem"
        ),

    book:
        document.getElementById(
            "bookItem"
        )

};


const completionBadges = {

    envelope:
        document.getElementById(
            "envelopeComplete"
        ),

    flower:
        document.getElementById(
            "flowerComplete"
        ),

    choice:
        document.getElementById(
            "choiceComplete"
        ),

    games:
        document.getElementById(
            "gamesComplete"
        ),

    book:
        document.getElementById(
            "bookComplete"
        )

};


function allSurprisesComplete() {

    return (
        completedSurprises.envelope &&
        completedSurprises.flower &&
        completedSurprises.choice &&
        completedSurprises.games &&
        completedSurprises.book
    );

}


/*
    Mark one surprise as completed.
*/

function completeSurprise(name) {

    if (!completedSurprises.hasOwnProperty(name)) {
        return;
    }


    /*
        Don't count the same surprise twice.
    */

    if (completedSurprises[name]) {
        return;
    }


    completedSurprises[name] = true;


    /*
        Update the card.
    */

    const card =
        surpriseCards[name];

    if (card) {

        card.classList.add(
            "completed"
        );

    }


    /*
        Update the badge.
    */

    const badge =
        completionBadges[name];

    if (badge) {

        badge.style.display =
            "inline-block";

    }


    /*
        Count completed surprises.
    */

    const count =
        Object.values(
            completedSurprises
        ).filter(Boolean).length;


    if (completedCount) {

        completedCount.textContent =
            count;


        const counter =
            document.querySelector(
                ".progress-counter"
            );


        if (counter) {

            counter.classList.remove(
                "bump"
            );

            void counter.offsetWidth;

            counter.classList.add(
                "bump"
            );

        }

    }


    console.log(
        `Completed: ${name}`
    );


    /*
        Check whether this was the final surprise.
    */

    if (allSurprisesComplete()) {

        revealFinalLetter();

    }

}


/*
    Final letter reveal.
*/

let finalLetterShown = false;


function revealFinalLetter() {

    if (finalLetterShown) {
        return;
    }


    finalLetterShown = true;


    if (transitionOverlay) {

        transitionOverlay.classList.add(
            "show"
        );

    }


    setTimeout(() => {

        screens.forEach(screen => {

            screen.classList.remove(
                "active"
            );

        });


        const letterScreen =
    document.getElementById("letterScreen");

if (letterScreen) {

    letterScreen.style.display = "flex";

    letterScreen.classList.add("active");

}

    }, 700);


    setTimeout(() => {

        if (transitionOverlay) {

            transitionOverlay.classList.remove(
                "show"
            );

        }

    }, 1250);

}

/* =====================================================
   1. YES / NO
===================================================== */

const yesBtn =
    document.getElementById("yesBtn");

const noBtn =
    document.getElementById("noBtn");

const noMessage =
    document.getElementById("noMessage");


let noCount = 0;


if (yesBtn) {

    yesBtn.addEventListener(
        "click",
        () => {

            showScreen(
                "specialScreen"
            );

        }
    );

}


function escapeNoButton() {

    if (!noBtn) return;


    noCount++;


    const area =
        document.querySelector(
            ".yes-no-area"
        );


    if (!area) return;


    const areaRect =
        area.getBoundingClientRect();

    const buttonRect =
        noBtn.getBoundingClientRect();


    const maxX =
        Math.max(
            90,
            areaRect.width -
            buttonRect.width
        );


    const maxY = 85;


    const randomX =
        Math.random() * maxX -
        maxX / 2;


    const randomY =
        Math.random() * maxY -
        maxY / 2;


    noBtn.style.position =
        "absolute";

    noBtn.style.left =
        "50%";

    noBtn.style.top =
        "50%";


    noBtn.style.transform =
        `
        translate(
            calc(-50% + ${randomX}px),
            calc(-50% + ${randomY}px)
        )
        rotate(${Math.random() * 10 - 5}deg)
        scale(1.04)
        `;


    if (!noMessage) return;


    if (noCount === 1) {

        noMessage.textContent =
            "HOW DARE U 😭";

    }
    else if (noCount === 2) {

        noMessage.textContent =
            "Excuse me?! 😭";

    }
    else if (noCount === 3) {

        noMessage.textContent =
            "You really thought I'd let you press NO? 😂";

    }
    else {

        noMessage.textContent =
            "JUST PRESS YES ALREADY 😭🎀";

    }


    noMessage.classList.remove(
        "no-pop"
    );

    void noMessage.offsetWidth;

    noMessage.classList.add(
        "no-pop"
    );
}


if (noBtn) {

    noBtn.addEventListener(
        "mouseenter",
        escapeNoButton
    );


    noBtn.addEventListener(
        "touchstart",
        event => {

            event.preventDefault();

            escapeNoButton();

        },
        {
            passive: false
        }
    );

}


/* =====================================================
   2. SPECIAL MESSAGE
===================================================== */

const specialContinue =
    document.getElementById(
        "specialContinue"
    );


if (specialContinue) {

    specialContinue.addEventListener(
        "click",
        () => {

            showScreen(
                "birthdayScreen"
            );

        }
    );

}


/* =====================================================
   3. HAPPY BIRTHDAY
===================================================== */

const birthdayContinue =
    document.getElementById(
        "birthdayContinue"
    );


if (birthdayContinue) {

    birthdayContinue.addEventListener(
        "click",
        () => {

            showScreen(
                "surpriseScreen"
            );

        }
    );

}


/* =====================================================
   4. SURPRISE MENU
===================================================== */

const envelopeItem =
    document.getElementById(
        "envelopeItem"
    );

const flowerItem =
    document.getElementById(
        "flowerItem"
    );

const choiceItem =
    document.getElementById(
        "choiceItem"
    );

const bookItem =
    document.getElementById(
        "bookItem"
    );

const gamesItem =
    document.getElementById(
        "gamesItem"
    );


if (envelopeItem) {

    envelopeItem.addEventListener(
        "click",
        () => {

            resetEnvelope();

            showScreen(
                "envelopeScreen"
            );

        }
    );

}


if (flowerItem) {

    flowerItem.addEventListener(
        "click",
        () => {

            showScreen(
                "flowerScreen"
            );

        }
    );

}


if (choiceItem) {

    choiceItem.addEventListener(
        "click",
        () => {

            showScreen(
                "choiceScreen"
            );

        }
    );

}


if (bookItem) {

    bookItem.addEventListener(
        "click",
        () => {

            showScreen(
                "bookScreen"
            );

        }
    );

}


if (gamesItem) {

    gamesItem.addEventListener(
        "click",
        () => {

            showScreen(
                "gamesScreen"
            );

        }
    );

}


/* =====================================================
   5. ENVELOPE
===================================================== */

const envelopeImage =
    document.getElementById(
        "envelopeImage"
    );

const openEnvelopeBtn =
    document.getElementById(
        "openEnvelopeBtn"
    );

const envelopeMessage =
    document.getElementById(
        "envelopeMessage"
    );

const backFromEnvelope =
    document.getElementById(
        "backFromEnvelope"
    );


function resetEnvelope() {

    if (envelopeImage) {

        envelopeImage.classList.remove(
            "envelope-pop"
        );

    }


    if (envelopeMessage) {

        envelopeMessage.classList.remove(
            "show"
        );

    }


    if (openEnvelopeBtn) {

        openEnvelopeBtn.style.display =
            "inline-block";

    }

}


if (openEnvelopeBtn) {

    openEnvelopeBtn.addEventListener(
        "click",
        () => {

            if (envelopeImage) {

                envelopeImage.classList.remove(
                    "envelope-pop"
                );

                void envelopeImage.offsetWidth;

                envelopeImage.classList.add(
                    "envelope-pop"
                );

            }


            openEnvelopeBtn.style.display =
                "none";


            setTimeout(() => {

                if (envelopeMessage) {

                    envelopeMessage.classList.add(
                        "show"
                    );

                }

            }, 450);

        }
    );

}


/*
    Going back means the envelope has
    been opened/completed.
*/

if (backFromEnvelope) {

    backFromEnvelope.addEventListener(
        "click",
        () => {

            completeSurprise(
                "envelope"
            );

            resetEnvelope();

            showScreen(
                "surpriseScreen"
            );

        }
    );

}


/* =====================================================
   6. FLOWER
===================================================== */

const backFromFlower =
    document.getElementById(
        "backFromFlower"
    );


if (backFromFlower) {

    backFromFlower.addEventListener(
        "click",
        () => {

            completeSurprise(
                "flower"
            );

            showScreen(
                "surpriseScreen"
            );

        }
    );

}


/* =====================================================
   7. GIFT CHOICE
===================================================== */

const choiceButtons =
    document.querySelectorAll(
        ".choice-btn"
    );

const choiceResult =
    document.getElementById(
        "choiceResult"
    );

const backFromChoice =
    document.getElementById(
        "backFromChoice"
    );


choiceButtons.forEach(button => {

    button.addEventListener(
        "click",
        () => {

            const choice =
                button.dataset.choice;


            choiceButtons.forEach(btn => {

                btn.classList.remove(
                    "selected"
                );

            });


            button.classList.add(
                "selected"
            );


            if (choiceResult) {

                choiceResult.textContent =
                    `You picked "${choice}" 💗`;


                choiceResult.classList.remove(
                    "result-pop"
                );


                void choiceResult.offsetWidth;


                choiceResult.classList.add(
                    "result-pop"
                );

            }


            completeSurprise(
                "choice"
                );


            localStorage.setItem(
                "birthdayGiftChoice",
                choice
            );


            if (backFromChoice) {

                backFromChoice.classList.remove(
                    "hidden"
                );

            }

        }
    );

});


if (backFromChoice) {

    backFromChoice.addEventListener(
        "click",
        () => {

            showScreen(
                "surpriseScreen"
            );


            checkCompletion();

        }
    );

}


/* =====================================================
   8. GAMES MENU
===================================================== */

const backFromGames =
    document.getElementById(
        "backFromGames"
    );

const loveTapItem =
    document.getElementById(
        "loveTapItem"
    );


if (backFromGames) {

    backFromGames.addEventListener(
        "click",
        () => {

            showScreen(
                "surpriseScreen"
            );

        }
    );

}


if (loveTapItem) {

    loveTapItem.addEventListener(
        "click",
        () => {

            startLoveTap();

        }
    );

}


/* =====================================================
   9. LOVE TAP
===================================================== */

const birthdayAge = 24;

let currentAge = 0;

let combo = 0;

let gameRunning = false;

let countdownRunning = false;

const gameCountdown =
    document.getElementById(
        "gameCountdown"
    );

const ageScore =
    document.getElementById(
        "ageScore"
    );

const targetAge =
    document.getElementById(
        "targetAge"
    );

const comboScore =
    document.getElementById(
        "comboScore"
    );

const movingHeart =
    document.getElementById(
        "movingHeart"
    );

const loveTapArena =
    document.getElementById(
        "loveTapArena"
    );

const gameHint =
    document.getElementById(
        "gameHint"
    );

const tapFeedback =
    document.getElementById(
        "tapFeedback"
    );

if (targetAge) {

    targetAge.textContent =
        birthdayAge;

}


function moveHeart() {

    if (!gameRunning) return;

    if (!loveTapArena) return;

    if (!movingHeart) return;


    const arenaWidth =
        loveTapArena.clientWidth;

    const arenaHeight =
        loveTapArena.clientHeight;


    const heartWidth =
        movingHeart.offsetWidth;

    const heartHeight =
        movingHeart.offsetHeight;


    const padding = 15;


    const maxLeft =
        arenaWidth -
        heartWidth -
        padding;


    const maxTop =
        arenaHeight -
        heartHeight -
        padding;


    const randomLeft =
        Math.max(
            padding,
            Math.random() * maxLeft
        );


    const randomTop =
        Math.max(
            padding,
            Math.random() * maxTop
        );


    movingHeart.style.left =
        `${randomLeft}px`;

    movingHeart.style.top =
        `${randomTop}px`;
}


function moveHeart() {

    if (!gameRunning) return;
    if (!loveTapArena) return;
    if (!movingHeart) return;

    const arenaWidth =
        loveTapArena.clientWidth;

    const arenaHeight =
        loveTapArena.clientHeight;

    /*
        Difficulty increases with age.
        Higher age = smaller + harder-to-catch heart.
    */
    let heartSize = 78;
    let padding = 15;

    if (currentAge >= 10) {
        heartSize = 72;
    }

    if (currentAge >= 15) {
        heartSize = 66;
    }

    if (currentAge >= 18) {
        heartSize = 60;
    }

    if (currentAge >= 22) {
        heartSize = 54;
        padding = 10;
    }

    movingHeart.style.width =
        `${heartSize}px`;

    movingHeart.style.height =
        `${heartSize}px`;

    movingHeart.style.fontSize =
        `${Math.max(30, heartSize * 0.55)}px`;

    const heartWidth =
        movingHeart.offsetWidth;

    const heartHeight =
        movingHeart.offsetHeight;

    const maxLeft =
        Math.max(
            padding,
            arenaWidth -
            heartWidth -
            padding
        );

    const maxTop =
        Math.max(
            padding,
            arenaHeight -
            heartHeight -
            padding
        );

    /*
        Higher age = more random movement.
    */
    let randomLeft =
        Math.random() * maxLeft;

    let randomTop =
        Math.random() * maxTop;

    /*
        FINAL BOSS MODE 😂
        At 22+, force the heart farther away
        from its previous position.
    */
    if (currentAge >= 22) {

        randomLeft =
            Math.random() * maxLeft;

        randomTop =
            Math.random() * maxTop;

        movingHeart.style.transition =
            "left 0.08s ease, top 0.08s ease, transform 0.12s ease";

    }
    else if (currentAge >= 18) {

        movingHeart.style.transition =
            "left 0.11s ease, top 0.11s ease, transform 0.13s ease";

    }
    else {

        movingHeart.style.transition =
            "left 0.18s ease, top 0.18s ease, transform 0.16s ease";

    }

    movingHeart.style.left =
        `${randomLeft}px`;

    movingHeart.style.top =
        `${randomTop}px`;
}
    function startLoveTap() {

    currentAge = 0;
    combo = 0;

    gameRunning = false;
    countdownRunning = true;

    if (ageScore) {
        ageScore.textContent = currentAge;
    }

    if (comboScore) {
        comboScore.textContent = combo;
    }

    if (gameHint) {
        gameHint.textContent = "Get ready... 👀";
    }

    showScreen("loveTapScreen");

    if (!gameCountdown) {

        gameRunning = true;
        countdownRunning = false;

        moveHeart();

        return;
    }

    const countdown = [
        "3",
        "2",
        "1",
        "GO!"
    ];

    let index = 0;

    function nextCountdown() {

        if (index >= countdown.length) {

            countdownRunning = false;
            gameRunning = true;

            if (gameHint) {
                gameHint.textContent = "Catch it! 👀";
            }

            moveHeart();

            return;
        }

        gameCountdown.textContent =
            countdown[index];

        gameCountdown.classList.remove("show");

        void gameCountdown.offsetWidth;

        gameCountdown.classList.add("show");

        index++;

        setTimeout(
            nextCountdown,
            800
        );
    }

    setTimeout(
        nextCountdown,
        450
    );
}

function showTapFeedback(text) {

    if (!tapFeedback) return;

    tapFeedback.textContent = text;

    tapFeedback.classList.remove("show");

    void tapFeedback.offsetWidth;

    tapFeedback.classList.add("show");
}

if (movingHeart) {

    movingHeart.addEventListener(
        "click",
        () => {

            if (!gameRunning) return;

            currentAge++;
            combo++;

            if (combo >= 5) {
                showTapFeedback(
                    `COMBO x${combo}! 🔥`
                );
            }
            else {
                showTapFeedback(
                    "NICE! 💗"
                );
            }


            if (ageScore) {

                ageScore.textContent =
                    currentAge;

            }


            if (comboScore) {

                comboScore.textContent =
                    combo;

            }


            movingHeart.classList.remove(
                "heart-hit"
            );


            void movingHeart.offsetWidth;


            movingHeart.classList.add(
                "heart-hit"
            );


            if (currentAge >= 20) {

                if (gameHint) {

                    gameHint.textContent =
                        "SO CLOSE 👀💗";

                }

            }
            else if (currentAge >= 15) {

                if (gameHint) {

                    gameHint.textContent =
                        "Keep going! 😂";

                }

            }
            else {

                if (gameHint) {

                    gameHint.textContent =
                        "Gotcha! 💗";

                }

            }


            if (
                currentAge >=
                birthdayAge
            ) {

                finishLoveTap();

                return;

            }


            let moveDelay = 220 - (currentAge * 6);



if (currentAge >= 10) {
    moveDelay = 150;
}

if (currentAge >= 15) {
    moveDelay = 120;
}

if (currentAge >= 18) {
    moveDelay = 95;
}

if (currentAge >= 22) {
    moveDelay = 65;
}

setTimeout(
    moveHeart,
    Math.max(50, moveDelay)
);

        }
    );

}


/* MISS DETECTION — OUTSIDE THE HEART CLICK */

if (loveTapArena) {

    loveTapArena.addEventListener(
        "click",
        (event) => {

            if (!gameRunning) return;

            if (event.target === movingHeart) {
                return;
            }

            combo = 0;

            if (comboScore) {
                comboScore.textContent =
                    combo;
            }

            showTapFeedback(
                "MISS! 😭"
            );

            if (gameHint) {
                gameHint.textContent =
                    "MISSED! Get it! 😂";
            }

        }
    );

}


/* =====================================================
   LOVE TAP FINISH
===================================================== */

function finishLoveTap() {

    gameRunning = false;

    if (gameHint) {
        gameHint.textContent = "24!!! 🎉";
    }

    // Mark Games as completed,
    // but DON'T reveal the final letter yet.
    completedSurprises.games = true;

    const card = surpriseCards.games;
    const badge = completionBadges.games;

    if (card) {
        card.classList.add("completed");
    }

    if (badge) {
        badge.style.display = "inline-block";
    }

    const count = Object.values(completedSurprises)
        .filter(Boolean).length;

    if (completedCount) {
        completedCount.textContent = count;
    }

    // Show the funny 24 screen first.
    setTimeout(() => {
        showScreen("loveTapWinScreen");
    }, 700);
}


/* =====================================================
   QUIT LOVE TAP
===================================================== */

const quitLoveTap =
    document.getElementById(
        "quitLoveTap"
    );


if (quitLoveTap) {

    quitLoveTap.addEventListener(
        "click",
        () => {

            gameRunning = false;

            showScreen(
                "gamesScreen"
            );

        }
    );

}


/* =====================================================
   FUNNY ENDING
===================================================== */

const backToGamesAfterWin =
    document.getElementById(
        "backToGamesAfterWin"
    );


if (backToGamesAfterWin) {
    backToGamesAfterWin.addEventListener(
        "click",
        (event) => {

            event.stopPropagation();

            gameRunning = false;

            if (transitionOverlay) {
                transitionOverlay.classList.remove("show");
                transitionOverlay.style.pointerEvents = "none";
            }

            if (allSurprisesComplete()) {
                revealFinalLetter();
            } else {
                showScreen("gamesScreen");
            }

        }
    );
}


/* =====================================================
   BOOK
===================================================== */

const bookContinue =
    document.getElementById(
        "bookContinue"
    );


if (bookContinue) {

    bookContinue.addEventListener(
        "click",
        () => {

            /*
                Book is completed when she
                finishes viewing the page.
            */
completeSurprise(
    "book"
);

if (!allSurprisesComplete()) {

    showScreen(
        "surpriseScreen"
    );

}

        }
    );

}


/* =====================================================
   DEBUG
===================================================== */

console.log(
    "Birthday surprise progress:",
    completedSurprises
);

console.log(
    "All complete:",
    allSurprisesComplete()
);

console.log(
    "🎀 Birthday website loaded successfully!"
);

if (transitionOverlay) {
    transitionOverlay.style.pointerEvents = "none";
}