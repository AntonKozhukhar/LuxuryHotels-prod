//Active menu
const menuLinks = document.querySelectorAll('.header__link');
menuLinks.forEach((element) => {
  if (document.location.href === element.href) {
		element.classList.add('_active');
	}
});


//Burger-menu
const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__list');

burger.addEventListener('click', function () {
	let active = burger.classList.toggle('_active');
	if (active) {
		document.body.style.overflow = 'hidden';
		menu.classList.toggle('_active');
	} else {
		document.body.style.overflow = 'visible';
		menu.classList.remove('_active');
	}
});

//Srcoll
const scroll = document.querySelector('.luxury__scroll-btn[data-goto]');
if (scroll) {
	scroll.addEventListener('click', function (e) {
		let btn = e.target;
		if (btn.dataset.goto && document.querySelector(btn.dataset.goto)) {
			let gotoBlock = document.querySelector(btn.dataset.goto);
			let gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;
			window.scrollTo({
				top: gotoBlockValue,
				behavior: 'smooth',
			});
			e.preventDefault();
		}
	});
}

//Slider
new Swiper('.rooms__slider', {
	navigation: {
		nextEl: '.rooms__btn-next',
		prevEl: '.rooms__btn-prev',
	},
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	grabCursor: true,
	loop: true,
	autoplay: {
		delay: 5000,
	},
	speed: 600,
});

//Dropdown
const details = document.querySelectorAll('.rooms__details');
const dropdowns = document.querySelectorAll('.rooms__details-list');

details.forEach((btn, i) => {
  const dropdown = dropdowns[i];

	btn.addEventListener('click', function () {
		btn.classList.toggle('_show');
		dropdown.classList.toggle('_show');
	});

	if (isActive(btn)) {
		window.addEventListener('click', removeDropdown(btn, dropdown));
	}
})

if (details) {
	document.addEventListener('click', function (e) {
		const activeElements = document.querySelectorAll('._show');
    if (!e.target.classList.contains('rooms__details')) {
      activeElements.forEach(activeEl => removeActive(activeEl));
		}
	});
}

function removeDropdown(element1, element2) {
	removeActive(element1);
	removeActive(element2);
}
function isActive(element) {
	return element.classList.contains('_show');
}
function removeActive(element) {
	element.classList.remove('_show');
}

//Validation
const form = document.forms.form;
const formReq = document.querySelectorAll('._input');

isInputsEmpty(formReq);

function isInputsEmpty(arr) {
  arr.forEach((input) => {
    input.addEventListener('blur', function () {
			if (input.value != '') {
				input.classList.add('_active');
			} else {
				input.classList.remove('_active');
			}
		});
  })
}

const regEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const footerForm = document.forms.footerForm;
const footerInput = footerForm.elements.footerInput;
const footerErrors = document.querySelectorAll('.error-message');

footerForm.addEventListener('submit', function (e) {
	e.preventDefault();
	formRemoveError(footerForm);

	for (let i = 0; i < footerErrors.length; i++) {
		removeErrorMessage(footerErrors[i]);
		if (footerInput.value != '') {
			if (emailTest(footerInput)) {
				formAddError(footerForm);
				addErrorMessage(footerErrors[1]);
			}
		} else {
			formAddError(footerForm);
			addErrorMessage(footerErrors[0]);
		}
	}
});

if (form) {
	form.addEventListener('submit', formSend);

	function formSend(e) {
		e.preventDefault();
		formValidate();
	}
}
function formValidate() {
	const errorMessages = document.querySelectorAll('._message');
	const errorEmail = document.querySelector('._message-email');

  removeErrorMessage(errorEmail);
  
  formReq.forEach((input, i) => {
    const message = errorMessages[i];

    formRemoveError(input);
    removeErrorMessage(message);

    if (input.name === 'email' && input.value != '') {
      if (emailTest(input)) {
        formAddError(input);
        addErrorMessage(errorEmail);
      }
    } else {
      if (input.value === '') {
        formAddError(input);
        addErrorMessage(message);
      }
    }
  });
}

function formAddError(input) {
	input.classList.add('_error');
}
function formRemoveError(input) {
	input.classList.remove('_error');
}
function emailTest(input) {
	return !regEmail.test(input.value);
}

function addErrorMessage(message) {
	message.classList.add('_active');
}
function removeErrorMessage(message) {
	message.classList.remove('_active');
}

//Webp

function testWebP(callback) {
	let webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src =
		'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('_webp');
	} else {
		document.querySelector('body').classList.add('_no-webp');
	}
});
