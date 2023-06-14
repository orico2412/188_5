const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');
const btnPopup = document.querySelector('.btnLogin-popup');
const iconClose = document.querySelector('.icon-close');

registerLink.addEventListener('click', () => {
  wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
  wrapper.classList.remove('active');
});

btnPopup.addEventListener('click', () => {
  wrapper.classList.add('active-popup');
});

iconClose.addEventListener('click', () => {
  wrapper.classList.remove('active-popup');
});

function checkLoginPopup() {
  const isMinimized = window.innerWidth <= 768;
  const isActive = wrapper.classList.contains('active-popup');

  if (isMinimized && !isActive) {
    wrapper.classList.add('active-popup');
  }
}

checkLoginPopup();
window.addEventListener('resize', checkLoginPopup);