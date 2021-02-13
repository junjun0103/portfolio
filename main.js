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

var elms = document.getElementsByClassName('splide');
for (var i = 0, len = elms.length; i < len; i++) {
  new Splide(elms[i]).mount();
}

function scrollIntoView(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
}


// 1. 모든 섹션 요소 가져오기
// 2. IntersectionObserver를 이용하여 모든 섹션 관찰
// 3. 보여지는 섹션 해당 메뉴 활성화

const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonials', '#contact'];
const sections = sectionIds.map(id => document.querySelector(id));
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));

let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
let selectedSection = sections[0];
function selectNavItem(selected) {
  console.log(selected);
  selectedNavItem.classList.remove('active');
  selectedNavItem = navItems[selected];
  selectedNavItem.classList.add('active')
  changeBackground(selected - 1, selected, selected + 1);

}

// body background changing function
function changeBackground(from, to, next) {
  const body = document.querySelector('body');
  body.classList.add(`background__color-${to}`)
  body.classList.remove(`background__color-${from}`)
  body.classList.remove(`background__color-${next}`)

}

// function changeBackground(from, to, next) {
//   // if (from < 0) {
//   //   return;
//   //   // for (let i = 1; i < sectionIds.length; i++) {
//   //   //   selectedSection = sections[i];
//   //   //   selectedSection.classList.remove(`background__color-${i}`);
//   //   // }
//   // }

//   console.log(`to${to}// next${next}`);

//   selectedSection = sections[to];
//   selectedSection.classList.add(`background__color-${to}`);
//   selectedSection = sections[next];
//   selectedSection.classList.remove(`background__color-${next}`);
//   selectedSection = sections[from];
//   selectedSection.classList.remove(`background__color-${to}`);

//   // switch (selected) {
//   //   case 0:
//   //     selectedSection = sections[1];
//   //     selectedSection.classList.remove('background__color-1');
//   //   case 1:
//   //     console.log("switch");
//   //     selectedSection = sections[selected];
//   //     selectedSection.classList.add('background__color-1');
//   // }
// }



const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
}

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`)
      if (entry.boundingClientRect.y < 0) {
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
      selectNavItem(selectedNavIndex);
    }
  })
}

const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section))

// wheel event
window.addEventListener('wheel', () => {
  if (window.scrollY <= 5) {
    selectedNavIndex = 0;
  } else if (window.scrollY + window.innerHeight === document.body.clientHeight) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(selectedNavIndex)
});