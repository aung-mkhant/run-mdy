// Javascript library for lazy loading background images

// Javascript for side menu
const openSideMenu = () => {
  document.querySelector(".sidemenu").classList.toggle("active");

  document.querySelector("#main-content").classList.toggle("dimmed");
};
const hamburgerMenu = document.querySelector("#nav-icon1");
hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("open");
  openSideMenu();
});
document.addEventListener("click", (e) => {
  const sideMenu = document.querySelector(".sidemenu");
  const hamburger = document.querySelector("#nav-icon1");

  // If the click target is NOT inside the sidemenu or the hamburger icon
  if (!sideMenu.contains(e.target) && !hamburger.contains(e.target)) {
    hamburger.classList.remove("open");
    sideMenu.classList.remove("active");
    document.querySelector("#main-content").classList.remove("dimmed");
  }
});

// Javascript for Read More button
const expandButton = document.getElementById("expand-button");
expandButton.addEventListener("click", (e) => {
  e.preventDefault();
  expandText();
});
function expandText() {
  let moreText = document.getElementById("more");

  if (moreText.style.display === "none") {
    moreText.classList.toggle("hide");
  } else {
    moreText.classList.toggle("hide");
  }
  moreText.classList.contains("hide")
    ? (expandButton.innerHTML = "Read more")
    : (expandButton.innerHTML = "Read less");
  expandButton.innerHTML = "Read less";
}

// Javascript for background image change in tour section
const tourImages = document.querySelectorAll(".tour-image");

let index = 0;
const startImages = () => {
  const travel = setInterval(() => {
    index = index % tourImages.length;
    const currentImage = tourImages[index];
    const nextImage = tourImages[(index + 1) % tourImages.length];
    currentImage.classList.toggle("fade-out");
    nextImage.classList.toggle("fade-out");
    index++;
  }, 5000);
};
startImages();

// Javascript for Carousel
let cardIndex = 1;
let cardTimer;

showCards(cardIndex);
resetTimer();

// Next/previous controls
function plusCards(n) {
  showCards((cardIndex += n));
  resetTimer();
}

// Thumbnail image controls
function currentCard(n) {
  showCards((cardIndex = n));
  resetTimer();
}

// 5. The Reset Logic
function resetTimer() {
  // Stop the previous countdown
  clearInterval(cardTimer);

  // Start a brand new countdown
  cardTimer = setInterval(() => {
    plusCards(1);
  }, 5000);
}

function showCards(n) {
  let i;
  let cards = document.getElementsByClassName("testimonial");
  let dots = document.getElementsByClassName("dot");
  if (n > cards.length) {
    cardIndex = 1;
  }
  if (n < 1) {
    cardIndex = cards.length;
  }
  for (i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  cards[cardIndex - 1].style.display = "block";
  dots[cardIndex - 1].className += " active";
}

// Javascript for showing before and after images
// build scene

const controller = new ScrollMagic.Controller();
var scene = new ScrollMagic.Scene({
  triggerElement: "section#aid",
  triggerHook: 0.7,
  duration: "100%",
}).addTo(controller);

scene.on("progress", function (event) {
  let speed = 1;
  let progress = event.progress * 100 * speed;
  let finalWidth = Math.max(100 - progress, 0);
  document.querySelector(".aid-before").style.width = finalWidth + "%";
});

// Javascript for Fancybox lightbox
const galleryImages = [
  { file: "2lions.webp", cap: "Two Lions Statues" },
  { file: "shwenandaw.jpg", cap: "Shwenandaw Monastery" },
  { file: "ubein.jpg", cap: "U Bein Bridge at Sunset" },
  { file: "mandalay.jpeg", cap: "Mandalay View" },
  { file: "tour1.jpg", cap: "Tour Highlights" },
  { file: "kuthodaw2.jpg", cap: "Kuthodaw Pagoda" },
  { file: "tour3.jpg", cap: "Our Tour Group" },
  { file: "bamboo.jpg", cap: "Bamboo Workshop" },
  { file: "bike.jpg", cap: "U Bein Bridge View" },
  { file: "broom.jpg", cap: "Broom Making" },
  { file: "monks.jpg", cap: "Monks in Mandalay" },
  { file: "myatheindan.jpg", cap: "Myatheindan Pagoda" },
  { file: "painting.jpg", cap: "'Phoe Wa Yote' Doll Making" },
  { file: "pottery.jpg", cap: "Local Pottery" },
  { file: "shop.jpg", cap: "Mandalay Market" },
];

const formattedGallery = galleryImages.map((img) => ({
  src: `../assets/images/${img.file}`,
  thumb: `../assets/images/${img.file}`,
  caption: img.cap,
}));

document.getElementById("gallery-icon").addEventListener("click", (e) => {
  e.preventDefault();

  Fancybox.show(formattedGallery, {
    Infinite: true,
    transitionEffect: "fade",
    // DragToClose: false //
  });
});

// Find all elements you want to animate
const revealElements = document.querySelectorAll(".reveal-on-scroll");

revealElements.forEach((element) => {
  new ScrollMagic.Scene({
    triggerElement: element,
    triggerHook: 0.85, // Animation starts when element is 85% down the screen
    reverse: false,
  })
    .setClassToggle(element, "is-visible") // Adds the class to trigger the CSS
    .addTo(controller);
});
