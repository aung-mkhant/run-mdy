
//   Intersection Observer for lazy loading background images
const lazyLoadImage = (element) => {
  element.classList.add("bg-loaded");
};
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        lazyLoadImage(entry.target); // load the image
        observer.unobserve(entry.target); // stop observing
      }
    });
  },
  {
    root: null, // viewport
    rootMargin: "200px 0px",
    threshold: 0.1, // trigger when 10% is visible
  },
);
// Observe all elements with .lazy-bg class
document.querySelectorAll(".lazy-bg").forEach((el) => {
  observer.observe(el);
});


// Javascript for side menu
const sideMenu = document.querySelector(".sidemenu");
const hamburgerMenu = document.querySelector("#nav-icon1");

const toggleSideMenu = () => {
  sideMenu.classList.toggle("active");
  hamburgerMenu.classList.toggle("open");
  // Targets both <html> and <body> to disable scrolling
  [document.documentElement, document.body].forEach(el => {
    el.classList.toggle('no-scroll');
  });
};

// Stop being unable to scroll when window width reaches over 1200px
window.addEventListener("resize", () => {
  [document.documentElement, document.body].forEach(el => {
    if (window.innerWidth> 1200 && sideMenu.classList.contains("active") && el.classList.contains("no-scroll")) {
      toggleSideMenu();
    }

  });
})
hamburgerMenu.addEventListener("click", () => {
  toggleSideMenu();
});

// Close sidemenu when a link is clicked
const sideMenuLinks = document.querySelectorAll(".sidemenu a");
sideMenuLinks.forEach((link) => {
  link.addEventListener("click", () => {
    // Only trigger if the menu is actually open
    if (sideMenu.classList.contains("active")) {
      // Reuse your existing function to toggle everything back to normal
      toggleSideMenu();
      // Also reset the hamburger icon animation
      hamburgerMenu.classList.remove("open");
    }
  });
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

document.getElementById("gallery-icon").addEventListener("click", () => {
  Fancybox.show(
    [...document.querySelectorAll('[data-fancybox="gallery"]')].map((el) => ({
      src: el.getAttribute("href") || el.getAttribute("src"),
      caption: el.dataset.caption || "",
    })),
    { infinite: true },
  );
});

// Javascript for Scroll Reveal Animations

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

// JavaScript for darken Animation on view
const tourImagesToBlur = document.querySelectorAll(".tour-image");
const tourOverlay = document.querySelector(".tour-overlay");

tourImagesToBlur.forEach((img) => {
  new ScrollMagic.Scene({
    triggerElement: img,
    triggerHook: 0.5, // Trigger when the image reaches the center
    duration: "70%", // How long the darken stays before reversing (40% of viewport height)
  })
    .setClassToggle(tourOverlay, "is-darkened") // Add/remove the darken class
    .addTo(controller);
});

