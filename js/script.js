// 1. Picture Transition
let homeImages = [
  "../imgs/Home/main-background-small-1.jpg",
  "../imgs/Home/main-background-small-2.jpg",
  "../imgs/Home/main-background-small-3.jpg",
  "../imgs/Home/main-background-small-4.jpg",
  "../imgs/Home/main-background-small-5.jpg",
];

let maxWidth = false;

if (window.innerWidth <= 390) {
  maxWidth = true;
}

const backgroundContainer = document.getElementById("background__img");
const leftArr = document.querySelector(".img__img--btn--left");
const rightArr = document.querySelector(".img__img--btn--right");

let indexBackground = 0;

const preloadImages = async function (urls) {
  await urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
};

window.addEventListener("load", async () => {
  if (maxWidth) {
    homeImages = [
      "../imgs/Home/main-background-small-7.jpg",
      "../imgs/Home/main-background-small-5.jpg",
      "../imgs/Home/main-background-small-6.jpg",
      "../imgs/Home/main-background-small-2.jpg",
      "../imgs/Home/main-background-small-3.jpg",
    ];
  }
  preloadImages(homeImages);
});

function changeBackgroundImg(index) {
  backgroundContainer.style.backgroundImage = `linear-gradient(to bottom, rgba(217, 65, 105, 0.1) 50%, rgba(217, 65, 105, 0.5)), url(${homeImages[index]})`;
}

function turnRight(index) {
  if (index > homeImages.length - 1) {
    indexBackground = 0;
  } else {
    indexBackground = index;
  }
}

function turnLeft(index) {
  if (index < 0) {
    indexBackground = homeImages.length - 1;
  } else {
    indexBackground = index;
  }
}

leftArr.addEventListener("click", () => {
  turnRight(indexBackground + 1);
  changeBackgroundImg(indexBackground);
  console.log(indexBackground);
});

rightArr.addEventListener("click", () => {
  turnLeft(indexBackground - 1);
  changeBackgroundImg(indexBackground);
  console.log(indexBackground);
});

setInterval(() => {
  turnRight(indexBackground + 1);
  changeBackgroundImg(indexBackground);
}, 5000);

// 2. Navigation pane
const btnMenu = document.querySelector(".img__menu");
const btnExit = document.querySelector(".navigation__exit");
const modalNav = document.getElementById("navigation");

btnMenu.addEventListener("click", () =>
  modalNav.classList.remove("navigation--hide")
);

btnExit.addEventListener("click", () =>
  modalNav.classList.add("navigation--hide")
);

backgroundContainer.addEventListener("click", () =>
  modalNav.classList.add("navigation--hide")
);

// 3. Time Left
const eventDate = new Date(2024, 5, 2, 19, 0, 0);
const curDate = new Date();
const timDif = Math.abs(eventDate.getTime() - curDate.getTime());

let daysRemaining = String(Math.floor(timDif / (1000 * 60 * 60 * 24)));
let hoursRemaining = String(
  Math.floor((timDif % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
).padStart(2, "0");
let minRemaining = String(
  Math.floor((timDif % (1000 * 60 * 60)) / (1000 * 60))
).padStart(2, "0");

const remainingTime = ["days", "hours", "min"];

function calcRemaining() {
  let remainingMarkup = "";

  document.querySelector(".content__context--remaining").innerHTML = "";

  remainingMarkup = remainingTime
    .map((detail) => {
      return `<span class="content__context--remaining--${detail}">${eval(
        detail + "Remaining"
      )} ${detail}</span>`;
    })
    .join("");

  document
    .querySelector(".content__context--remaining")
    .insertAdjacentHTML("beforeend", remainingMarkup);
}

calcRemaining();

// 4. RSVP Form
const formRsvp = document.querySelector(".rsvp__form--form");
const formSubmission = document.querySelector(".rsvp__submitted");
const formName = document.getElementById("form-name");
const formPhone = document.getElementById("form-phone");
const formEmail = document.getElementById("form-email");
const formPax = document.getElementById("form-pax");
const radioContainer = document.querySelector(".rsvp__form--question--radio");
const radioGroom = document.getElementById("form-grooms-side");
const radioBride = document.getElementById("form-brides-side");
const radioOthers = document.getElementById("form-others");
const btnFormRsvp = document.querySelector(".rsvp__form--submit");

radioContainer.addEventListener("click", (e) => {
  const allLabels = radioContainer.querySelectorAll("label");
  allLabels.forEach((label) => (label.style.color = "#808080"));
  e.target.nextElementSibling.style.color = "#d94169";
});

formRsvp.addEventListener("change", () => {
  if (
    formName.value !== "" &&
    formPhone.value !== "" &&
    formEmail.value !== "" &&
    formPax.value !== ""
  ) {
    btnFormRsvp.classList.add("rsvp__form--submit--complete");
  }
});

formSubmission.style.display = "none";
document
  .querySelectorAll(".content__page")
  .forEach((page) => (page.style.height = "100vh"));

formRsvp.addEventListener("submit", () => {
  // e.preventDefault();
  formRsvp.style.display = "none";
  formSubmission.style.display = "block";
});

// 5. Prevent Page From Jumping
// Get all input fields
const inputFields = document.querySelectorAll("input");

// Function to handle focus event on input fields
function handleInputFocus() {
  // Scroll to the focused input field
  this.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
    inline: "start",
  });
}

// Attach event listener to each input field
inputFields.forEach((input) => {
  input.addEventListener("focus", handleInputFocus);
});

// 6. Gallery
const pageGallery = document.getElementById("gallery");
const pageHome = document.getElementById("container");
const galleryLinks = document.querySelectorAll(".link--gallery");
const returnToHome = document.querySelector(".gallery__back--cta");

pageGallery.style.display = "none";

galleryLinks.forEach((link) => {
  link.addEventListener("click", () => {
    pageHome.style.display = "none";
    pageGallery.style.display = "block";
  });
});

returnToHome.addEventListener("click", () => {
  const currentUrl = window.location.href;
  const baseUrl = currentUrl.split("#")[0];
  window.location.href = baseUrl;
});
