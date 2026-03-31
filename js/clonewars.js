function handleSelection(selectElement) {
  const value = selectElement.value;
  if (value) {
    window.location.href = value;
  }
}

const quotes = [
  "Great leaders inspire greatness in others.",
  "Belief is not a matter of choice, but of conviction.",
  "Easy is the path to wisdom for those not blinded by ego.",
  "A plan is only as good as those who see it through.",
  "The best confidence builder is experience.",
  "Trust in your friends, and they'll have reason to trust in you.",
  "Ignore your instincts at your peril.",
  "The wise man leads, the strong man follows.",
  "Failure is the greatest teacher.",
  "Who a person truly is cannot be seen with the eye.",
  "Adversity is a friendship's truest test.",
  "Fear is a disease; hope is its only cure.",
  "The first step to correcting a mistake is patience.",
  "A true heart should never be doubted.",
  "Survival is one step on the path to living.",
  "Trust is the greatest of gifts, but it must be earned.",
  "He who seeks to control fate shall never find peace.",
  "Adaptation is the key to survival.",
  "A soldier's most powerful weapon is courage.",
  "The truth about yourself is always the hardest to accept."
];

const quoteElement = document.getElementById("clonewars-quote");
if (quoteElement) {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  quoteElement.textContent = randomQuote;
  requestAnimationFrame(() => quoteElement.classList.add("show"));
}

const slideshowContainer = document.querySelector(".slideshow-container");
const slides = document.querySelectorAll(".slide");
let currentSlide = 0;
let slideIntervalId;

function isVideoSlide(index) {
  return slides[index]?.classList.contains("video-slide");
}

function stopSlideShow() {
  window.clearInterval(slideIntervalId);
}

function showSlide(index) {
  if (!slides.length) {
    return;
  }

  slides[currentSlide].classList.remove("active");
  currentSlide = (index + slides.length) % slides.length;
  slides[currentSlide].classList.add("active");

  if (isVideoSlide(currentSlide)) {
    stopSlideShow();
  } else {
    startSlideShow();
  }
}

function startSlideShow() {
  stopSlideShow();

  if (slides.length > 1 && !isVideoSlide(currentSlide)) {
    slideIntervalId = window.setInterval(() => {
      showSlide(currentSlide + 1);
    }, 5000);
  }
}

function changeSlide(step) {
  showSlide(currentSlide + step);
}

if (slideshowContainer) {
  slideshowContainer.addEventListener("mouseenter", stopSlideShow);
  slideshowContainer.addEventListener("mouseleave", startSlideShow);
}

window.changeSlide = changeSlide;
startSlideShow();