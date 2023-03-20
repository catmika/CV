"use strict";
///////////////////Selectors
const lightbulb = document.querySelector("#lightbulb");
const primary = document.querySelectorAll(".color-primary-dark");
const secondary = document.querySelectorAll(".color-secondary-dark");
const tertiary = document.querySelectorAll(".color-tertiary-dark");
const quarternary = document.querySelectorAll(".color-quarternary-dark");
const h1 = document.querySelectorAll("h1");
const h2 = document.querySelectorAll("h2");
const h3 = document.querySelectorAll("h3");
const p = document.querySelectorAll("p");
const a = document.querySelectorAll("a");
const ul = document.querySelectorAll("ul");
const main_label = document.querySelector(".main-label");
const contacts = document.querySelector(".contacts");
const contacts_links = document.querySelector(".contacts-links");
const tabcontent = document.querySelectorAll(".tabcontent");
const tablinks = document.querySelectorAll(".tablinks");
const navbar = document.querySelector(".navbar");
const slider__btns = document.querySelectorAll(".slider__btn");
const projects_labels = document.querySelectorAll(".project-label");

const imgTargets = document.querySelectorAll("img[data-src]");
const sectionTargets = document.querySelectorAll("section");
const projectImgs = document.querySelectorAll(".project-img");

////////////////Go to top after reloading
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

///////////////Lazy Loading Images
const loadImg = function (entries, observer) {
  for (let i = 0; i < 3; i++) {
    if (!entries[i]?.isIntersecting) return;

    //Replace src with data-src
    entries[i].target.src = entries[i].target.dataset.src;
    //Removing blur filter
    entries[i].target.addEventListener("load", function () {
      entries[i].target.classList.remove("lazy-img");
    });
    observer.unobserve(entries[i].target);
  }
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "100px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

//////////////////Dark/Light Mode

document.getElementById("switch").addEventListener("click", function () {
  //button
  lightbulb.classList.toggle("fa-solid");

  //Background colors
  primary.forEach((e) => e.classList.toggle("color-primary-light"));

  secondary.forEach((e) => e.classList.toggle("color-secondary-light"));

  tertiary.forEach((e) => e.classList.toggle("color-tertiary-light"));

  quarternary.forEach((e) => e.classList.toggle("color-quarternary-light"));

  //Font color
  h1.forEach((e) => e.classList.toggle("font-light"));
  h2.forEach((e) => e.classList.toggle("font-light"));
  h3.forEach((e) => e.classList.toggle("font-light"));
  p.forEach((e) => e.classList.toggle("font-light"));
  a.forEach((e) => e.classList.toggle("font-light"));
  ul.forEach((e) => e.classList.toggle("font-light"));
  main_label.classList.toggle("font-label-light");
  main_label.classList.toggle("main-label");
  contacts.classList.toggle("contacts-light");
  contacts.classList.toggle("contacts");
  tablinks.forEach((e) => e.classList.toggle("tablinks"));
  tablinks.forEach((e) => e.classList.toggle("tablinks-light"));
  slider__btns.forEach((e) => e.classList.toggle("slider__btn-light"));
  projects_labels.forEach((e) => e.classList.toggle("project-label"));
  projects_labels.forEach((e) => e.classList.toggle("project-label-light"));
  projectImgs.forEach((e) => e.classList.toggle("project-img"));
  projectImgs.forEach((e) => e.classList.toggle("project-img-light"));
});

////////////////////Tabbed component
function openTab(evt, tabName) {
  // Get all elements with class="tabcontent" and hide them
  tabcontent.forEach((e) => (e.style.display = "none"));

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks.forEach((e) => e.classList.remove("active"));

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "flex";
  evt.currentTarget.classList.toggle("active");
}

///////////////////Navbar on scroll
let lastScrollTop = 0;

window.addEventListener(
  "scroll",
  function () {
    let st = window.pageYOffset;
    if (st > lastScrollTop) {
      navbar.style.transform = "translateY(-100%)";
    }
    if (st < lastScrollTop) {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollTop = st <= 0 ? 0 : st;
  },
  false
);

//////////////////Sections sliding in on scroll

const slideSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  for (let i = 0; i < entry.target.childNodes.length; i++) {
    if (
      entry.target.childNodes[i].nodeName.toLowerCase() === "div" ||
      entry.target.childNodes[i].nodeName.toLowerCase() === "h2" ||
      entry.target.childNodes[i].nodeName.toLowerCase() === "p"
    ) {
      entry.target.childNodes[i].style.transform = "translate(0, 0)";
    }
  }

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(slideSection, {
  root: null,
  threshold: 0,
  rootMargin: "-30%",
});

sectionTargets.forEach((section) => sectionObserver.observe(section));

//////////////////////////Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document.querySelectorAll(".dots__dot").forEach((dot) => {
      dot.classList.remove("dots__dot--active");
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  createDots();
  goToSlide(0);
  activateDot(0);

  //Next slide
  btnRight.addEventListener("click", nextSlide);

  //Previous slide
  btnLeft.addEventListener("click", prevSlide);

  //Key control
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  //Dots
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();
