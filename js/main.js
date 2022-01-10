//spinner
let spinner = document.querySelector(".spinner");
spinner.onclick = function () {
    document.querySelector(".spinner i").classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle("opened");
};

//get the color from local storage
let storageColor = localStorage.getItem("color");

if (storageColor != null) {
    document.documentElement.style.setProperty("--main-color", storageColor);

    // remove and add class active which exists in localstorage
    document.querySelectorAll(".colors-option li").forEach((element) => {
        element.classList.remove("active");

        if (storageColor === element.dataset.color) {
            element.classList.add("active");
        }
    });
}

// color changing
let colorsLi = document.querySelectorAll(".colors-option li");
colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty(
            "--main-color",
            e.target.dataset.color
        );
        // store the color in localstorage
        localStorage.setItem("color", e.target.dataset.color);

        // remove and set the active class
        handleActive(li);
    });
});

// get the randomBackground Option from localStorage
let randomBAckgroundOption = true;
let backgroundInterval;

if (localStorage.getItem("backGround") !== null) {
    document.querySelectorAll(".random-background span").forEach((e) => {
        e.classList.remove("active");
        if (e.dataset.background == localStorage.getItem("backGround")) {
            e.classList.add("active");
        }
        if (e.dataset.background == "yes") {
            randomizeImage();
        } else if (localStorage.getItem("backGround") == "no") {
            clearInterval(backgroundInterval);
        }
    });
}
// random background option yes or no

let randomBackground = document.querySelectorAll(".random-background span");
randomBackground.forEach((span) => {
    if (
        span.dataset.background === "yes" &&
        span.classList.contains("active")
    ) {
        randomBAckgroundOption = true;
        randomizeImage();
    }
    span.addEventListener("click", (el) => {
        // store the option in localstorage
        localStorage.setItem("backGround", el.target.dataset.background);

        // remove and set the active class
        handleActive(span);
        // to stop and containue in random background
        if (span.dataset.background === "yes") {
            randomBAckgroundOption = true;
            randomizeImage();
        } else {
            randomBAckgroundOption = false;
            clearInterval(backgroundInterval);
        }
    });
});

// get landing page elements
let landingPage = document.querySelector(".landing");
// get images
let myImages = [
    "01.jpg",
    "02.jpg",
    "03.jpg",
    "04.jpg",
    "05.jpg",
    "06.jpg",
    "07.jpg",
    "08.jpg",
    "09.jpg",
    "10.jpg",
];
// set random background
function randomizeImage() {
    if (randomBAckgroundOption === true) {
        backgroundInterval = setInterval(function () {
            let randomNumber = Math.floor(Math.random() * myImages.length);
            landingPage.style.backgroundImage = `url("imgs/${myImages[randomNumber]}")`;
        }, 5000);
    }
}

// our skills animation
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    let skillsOffsettop = ourSkills.offsetTop;

    let skillsOffsetHeight = ourSkills.offsetHeight;

    let windowHeight = this.innerHeight;

    let windowScroll = this.pageYOffset;

    if (windowScroll >= skillsOffsetHeight + skillsOffsettop - windowHeight) {
        document
            .querySelectorAll(".skills-box .skill-progress span")
            .forEach((skill) => {
                skill.style.width = skill.dataset.progress;
            });
    }
};

//creating the popup to images
let allImages = document.querySelectorAll(".images-box img");

// loop to all images
allImages.forEach((img) => {
    // when click on the image
    img.addEventListener("click", (e) => {
        //create the overlay at first and add it to the body
        let overlayForImage = document.createElement("div");
        overlayForImage.className = "overlay-image";
        document.body.appendChild(overlayForImage);

        // create the image box and add it to the page
        let popupBox = document.createElement("div");
        popupBox.className = "image-container";
        document.body.appendChild(popupBox);

        //create the image and pop up and add it to the page
        let popupImage = document.createElement("img");
        popupImage.className = "popup-image";
        popupImage.src = img.src;
        popupBox.appendChild(popupImage);

        if (img.alt !== "") {
            //create the text into the popup box and add it to the page
            let imageText = document.createElement("h3");
            let imageTextContent = document.createTextNode(img.alt);
            imageText.appendChild(imageTextContent);
            popupBox.prepend(imageText);
        }

        // create close button and add it to the page
        let closeButton = document.createElement("span");
        closeButton.className = "close-button";
        let closeButtoncontent = document.createTextNode("X");
        closeButton.appendChild(closeButtoncontent);
        popupBox.appendChild(closeButton);
    });
});

//remove the popup from the page by clicking the close button
document.addEventListener("click", (e) => {
    if (e.target.className == "close-button") {
        document.querySelector(".image-container").remove();
        document.querySelector(".overlay-image").remove();
    }
});

//bullets and nav scroll it to the section
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let allLinks = document.querySelectorAll(".links li a");

function scrollToSection(elements) {
    elements.forEach((element) => {
        // onclick at the link go to the section
        element.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView();
        });
    });
}
scrollToSection(allBullets);
scrollToSection(allLinks);

// show and hide bullets from the page
if (window.localStorage.getItem("bullets") != null) {
    document.querySelectorAll(".bullets-option span").forEach((e) => {
        e.classList.remove("active");
        if (e.dataset.bullets == localStorage.getItem("bullets")) {
            e.classList.add("active");
        }
    });
    if (window.localStorage.getItem("bullets") == "yes") {
        document.querySelector(".nav-bullets").style.display = "block";
    } else {
        document.querySelector(".nav-bullets").style.display = "none";
    }
}

let showHideBullets = document.querySelectorAll(".bullets-option span");

showHideBullets.forEach((element) => {
    element.addEventListener("click", (e) => {
        handleActive(element);

        // hide and show bullets
        if (element.dataset.bullets == "yes") {
            document.querySelector(".nav-bullets").style.display = "block";
        } else {
            document.querySelector(".nav-bullets").style.display = "none";
        }
        window.localStorage.setItem("bullets", element.dataset.bullets);
    });
});

function handleActive(event) {
    event.parentElement.querySelectorAll(".active").forEach((element) => {
        element.classList.remove("active");
    });
    event.classList.add("active");
}

//to Reset All Optins
document.querySelector(".reset").addEventListener("click", (e) => {
    window.localStorage.clear();
    window.location.reload();
});

// toggle menu
let toggleBtn = document.querySelector(".menu-toggle");
let toggleLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
    e.stopPropagation();

    this.classList.toggle("menu-active");

    toggleLinks.classList.toggle("open");
};
toggleLinks.onclick = function (e) {
    e.stopPropagation();
};

// close toggle menu onblur
document.addEventListener("click", (e) => {
    if (e.target !== toggleLinks && e.target !== toggleBtn) {
        toggleBtn.classList.remove("menu-active");

        toggleLinks.classList.remove("open");
    }
});
