'use stric';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height
document.addEventListener('scroll', () => {
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark')
  } else {
    navbar.classList.remove('navbar--dark')
  }
})


// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  const scrollTo = document.querySelector(link);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
})


// Handle click on "my work" button on home
const homeLinkBtn = document.querySelector('.home__contact');
homeLinkBtn.addEventListener('click', (event) => {
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  scrollIntoView(link);
})


// Home section transparent when scroll down
const homeSection = document.querySelector('.home__container');
const homeHeight = homeSection.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  homeSection.style.opacity = 1 - window.scrollY / homeHeight;
})


// Show Arrow Button when scrolling down
const arrowBtn = document.querySelector('.arrow__btn')
document.addEventListener('scroll', () => {
  console.log("test");
  if (window.scrollY > homeHeight / 2) {
    arrowBtn.classList.add('visible')
  } else {
    arrowBtn.classList.remove('visible')
  }
})

// Handle click on the "arrow btn"
arrowBtn.addEventListener('click', () => {
  scrollIntoView('#home')
})

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}


