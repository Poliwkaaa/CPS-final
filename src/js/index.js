import Swiper from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/swiper-bundle.css'
import '../scss/style.scss'

const width = document.body.clientWidth

// Функция для инициализации Swiper
function initSwiper(selector) {
  return new Swiper(selector, {
    loop: true,
    spaceBetween: 16,
    slidesPerView: 'auto',
    allowTouchMove: true,
    modules: [Pagination],
    pagination: {
      el: selector + ' .swiper-pagination',
      clickable: true
    }
  })
}

// Функция для удаления Swiper классов
function deleteSwiperClasses(containerSelector) {
  const swiperContainer = document.querySelector(containerSelector)
  const wrapper = swiperContainer.querySelector('.swiper-wrapper')
  const slides = swiperContainer.querySelectorAll('.swiper-slide')

  if (wrapper) {
    wrapper.classList.remove('swiper-wrapper')
  }
  swiperContainer.classList.remove('swiper')

  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove('swiper-slide')
  }
}

if (width < 768) {
  initSwiper('.brands__swiper')
  initSwiper('.technic__swiper')
  initSwiper('.price__swiper')
} else {
  deleteSwiperClasses('.brands__swiper')
  deleteSwiperClasses('.technic__swiper')
  deleteSwiperClasses('.price__swiper')
}

const brandsButton = document.querySelector('.brands__btn')
const technicButton = document.querySelector('.technic__btn')

const brandsCards = document.querySelectorAll('.brands__item')
const technicCards = document.querySelectorAll('.technic__item')

let visibleBrandsCardsCount = 6
let visibleTechnicCardsCount = 3

// Проверка ширины экрана для адаптации количества карточек
if (width >= 1440) {
  ;(visibleBrandsCardsCount = 8), (visibleTechnicCardsCount = 4)
}

// Функция для скрытия карточек
function hideExtraCards(cards, visibleCount, hiddenClass) {
  for (var i = 0; i < cards.length; i++) {
    if (i >= visibleCount) {
      cards[i].classList.add(hiddenClass)
    }
  }
}

// Проверка ширины экрана и скрытие лишних карточек, чтобы не было конфликта со Swiper
if (width >= 768) {
  hideExtraCards(brandsCards, visibleBrandsCardsCount, 'brands__item--hidden')
  hideExtraCards(
    technicCards,
    visibleTechnicCardsCount,
    'technic__item--hidden'
  )
}

// Функция для переключения состояния карточек и кнопки
function toggleCards(button, cards, visibleCount, hiddenClass) {
  if (button.classList.contains('show-more-btn--show')) {
    // Показываем все карточки
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove(hiddenClass)
    }
    button.textContent = 'Скрыть'
    button.classList.replace('show-more-btn--show', 'show-more-btn--hide')
  } else {
    // Скрываем лишние карточки
    for (var i = 0; i < cards.length; i++) {
      if (i >= visibleCount) {
        cards[i].classList.add(hiddenClass)
      }
    }
    button.textContent = 'Показать все'
    button.classList.replace('show-more-btn--hide', 'show-more-btn--show')
  }
}

// Навешиваем обработчики на каждую кнопку
brandsButton.addEventListener('click', function () {
  toggleCards(
    brandsButton,
    brandsCards,
    visibleBrandsCardsCount,
    'brands__item--hidden'
  )
})

technicButton.addEventListener('click', function () {
  toggleCards(
    technicButton,
    technicCards,
    visibleTechnicCardsCount,
    'technic__item--hidden'
  )
})

// Модальные окна
const modalOpenButtons = document.querySelectorAll('.open-modal-btn')
const modalOverlays = document.querySelectorAll('.overlay--modal')
const modalCloseButtons = document.querySelectorAll('.modal__close')

// Открытие
for (var i = 0; i < modalOpenButtons.length; i++) {
  modalOpenButtons[i].addEventListener('click', function () {
    const modalId = this.getAttribute('data-modal')
    const modal = document.getElementById('modal-' + modalId)
    modal.classList.remove('overlay--hidden')
    document.body.classList.remove('scroll-lock')

    // Если кнопка внутри меню — закрываем меню
    if (this.closest('.menu')) {
      closeMenu()
    }
  })
}

// Закрытие по крестику
for (var j = 0; j < modalCloseButtons.length; j++) {
  modalCloseButtons[j].addEventListener('click', function () {
    const modal = this.closest('.overlay--modal')
    modal.classList.add('overlay--hidden')
    document.body.classList.remove('scroll-lock')
  })
}

// Закрытие по клику на заблюренную область
for (var k = 0; k < modalOverlays.length; k++) {
  modalOverlays[k].addEventListener('click', function (event) {
    if (!this.querySelector('.modal').contains(event.target)) {
      this.classList.add('overlay--hidden')
      document.body.classList.remove('scroll-lock')
    }
  })
}

// Меню
const menuOpenButton = document.querySelector('.button--burger')
const menuOverlay = document.querySelector('.overlay--menu')
const menu = document.querySelector('.menu')
const menuCloseBtn = document.querySelector('.button--close')

// Функции открытия и закрытия меню
function openMenu() {
  menuOverlay.classList.remove('overlay--hidden')
  document.body.classList.add('scroll-lock')
}

function closeMenu() {
  menuOverlay.classList.add('overlay--hidden')
  document.body.classList.remove('scroll-lock')
}

menuOpenButton.addEventListener('click', function () {
  openMenu()
})

menuCloseBtn.addEventListener('click', function () {
  closeMenu()
})

menuOverlay.addEventListener('click', function (event) {
  if (!menu.contains(event.target)) {
    closeMenu()
  }
})

// Кнопка Читать далее

const readMoreButton = document.querySelector('.services__btn')
const paragraphs = document.querySelectorAll('.services__text')
var initialVisibleParagraphs = getInitialVisibleParagraphs()

setInitialVisibility()

function getInitialVisibleParagraphs() {
  if (width < 768) {
    return 1 // Мобильные
  } else if (width < 1440) {
    return 2 // Планшеты
  } else {
    return 3 // Десктоп
  }
}

function setInitialVisibility() {
  for (var i = 0; i < paragraphs.length; i++) {
    if (i >= initialVisibleParagraphs) {
      paragraphs[i].classList.add('services__text--hidden')
    } else {
      paragraphs[i].classList.remove('services__text--hidden')
    }
  }
  readMoreButton.textContent = 'Читать далее'
  readMoreButton.classList.replace('show-more-btn--hide', 'show-more-btn--show')
}

function toggleParagraphs() {
  var isOpen = readMoreButton.classList.contains('show-more-btn--hide')

  if (isOpen) {
    setInitialVisibility()
  } else {
    for (var i = 0; i < paragraphs.length; i++) {
      paragraphs[i].classList.remove('services__text--hidden')
    }

    readMoreButton.textContent = 'Скрыть'
    readMoreButton.classList.replace(
      'show-more-btn--show',
      'show-more-btn--hide'
    )
  }
}

readMoreButton.addEventListener('click', function () {
  toggleParagraphs()
})
