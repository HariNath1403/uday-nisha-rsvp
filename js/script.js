// 1. Picture Transition
const backgroundImgs = [
  "../imgs/main-background-small-4.jpg",
  "../imgs/main-background-small-2.jpg",
  "../imgs/main-background-small-5.jpg",
];

const backgroundContainer = document.getElementById("background__img");
let indexBackground = 0;

function preloadImages(urls) {
  urls.forEach((url) => {
    const img = new Image();
    img.src = url;
  });
}

window.addEventListener("load", () => {
  preloadImages(backgroundImgs);
});

function changeBackgroundImg() {
  setTimeout(function () {
    backgroundContainer.style.backgroundImage = `linear-gradient(to bottom, rgba(217, 65, 105, 0.1) 50%, rgba(217, 65, 105, 0.5)), url(${backgroundImgs[indexBackground]})`;
  }, 0);

  if (indexBackground < backgroundImgs.length - 1) {
    indexBackground++;
  } else {
    indexBackground = 0;
  }
}
setInterval(changeBackgroundImg, 3000);

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

document.addEventListener("DOMContentLoaded", function () {
  var inputField = document.querySelectorAll("input");
  inputField.forEach((field) => {
    field.addEventListener("focus", function () {
      field.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
});
