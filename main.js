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
  navbarMenu.classList.remove('open');
  scrollIntoView(link);
})

// Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn')
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
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

// Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (event) => {
  const filter = event.target.dataset.filter || event.target.parentNode.dataset.filter;
  if (filter == null) {
    return;
  }

  // Remove selection from the previous item and select new one
  const active = document.querySelector('.category__btn.selected');
  active.classList.remove('selected');
  const target = event.target.nodeName === 'BUTTON' ? event.target : event.target.parentNode;
  target.classList.add('selected')

  projectContainer.classList.add('anim-out');
  setTimeout(() => {
    projects.forEach((project) => {
      if (project.dataset.type == filter || filter == "*") {
        project.classList.remove('project--invisible')
      } else {
        project.classList.add('project--invisible')
      }
    })
    projectContainer.classList.remove('anim-out');

  }, 300);
})

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}


