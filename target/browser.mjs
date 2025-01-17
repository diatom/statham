import * as p from 'https://cdn.jsdelivr.net/npm/@mitranim/js@0.1.25/prax.mjs'
const {E} = p.Ren.native()
import * as qoutes from './qoutes.js';
// import * as qoutes from './data/qoutes.js';
console.log(`The site was made by Severin B. https://sirseverin.ru/
༼ つ ◕_◕ ༽つ
`)


// URL button copy
document.querySelectorAll('.copy-b').forEach(button => {
  button.addEventListener('click', () => {
    const parentDiv = button.closest('.quote') // Получаем родительский div
    const divId = parentDiv.id // Получаем ID родительского div
    const currentUrl = window.location.href // Получаем текущий URL
    const textToCopy = `${currentUrl}#${divId}` // Формируем текст для копирования

    // Используем Clipboard API для копирования текста
    navigator.clipboard.writeText(textToCopy)
      // .then(() => {
      //   console.log('Текущий адрес и ID скопированы в буфер обмена!')
      //   alert('Скопировано: ' + textToCopy) // Уведомление для пользователя
      // })
      // .catch(err => {
      //   console.error('Ошибка при копировании: ', err)
      // })
  })
})

// Random day-qoute
function getRandomEvent() {
  const randomIndex = Math.floor(Math.random() * qoutes.q.length)
  return qoutes.q[randomIndex]
}
function setEvent() {
  const lastEventDate = localStorage.getItem('lastEventDate')
  const today = new Date().toISOString().split('T')[0] // Получаем текущую дату в формате YYYY-MM-DD
  if (lastEventDate !== today) {
      // Если дата изменилась, устанавливаем новое событие
      const newEvent = getRandomEvent()
      document.querySelector('.today-quote').innerText = `— ` + newEvent // Выводим событие в div
      localStorage.setItem('lastEventDate', today) // Сохраняем текущую дату
      localStorage.setItem('currentEvent', newEvent) // Сохраняем текущее событие
  } else {
      // Если дата не изменилась, загружаем предыдущее событие
      const previousEvent = localStorage.getItem('currentEvent')
      document.querySelector('.today-quote').innerText = previousEvent // Выводим предыдущее событие
  }
}
// Обновляем событие при загрузке страницы
setEvent()


// Random button qoute
function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * qoutes.q.length)
  return qoutes.q[randomIndex]
}
function updateQuote() {
  const newQuote = getRandomQuote()
  document.querySelector('.button-quote').innerText = `— ` + newQuote // Обновляем текст в div
}
// Обновляем цитату при загрузке страницы
updateQuote()
// Обновляем цитату по нажатию кнопки
document.querySelector('.quote-button').addEventListener('click', updateQuote)

let count = 0
document.querySelector(`.quote-button`).addEventListener(`click`, () => {
  count++
  document.querySelector('.click-count').innerText = count
})

// Tags button
// if (window.location.pathname.startsWith('/post') || window.location.pathname === ('/mixology')) {
//   document.addEventListener('DOMContentLoaded', function() {
//     const tagsContainer = document.querySelector('tags')
//     const buttons = tagsContainer.querySelectorAll('button[type="button"]')
//     const blogDivs = document.querySelectorAll('.filter, .cockt')
//     const activeTags = new Set()

//     buttons.forEach(button => {
//       button.addEventListener('click', function() {
//         const buttonTag = this.innerText.trim().toLowerCase()

//         if (activeTags.has(buttonTag)) {
//           activeTags.delete(buttonTag)
//         } else {
//           activeTags.add(buttonTag)
//         }

//         blogDivs.forEach(div => {
//           const divButtons = div.querySelectorAll('arttags button[type="button"]')
//           const divTags = Array.from(divButtons).map(btn => btn.innerText.trim().toLowerCase())

//           const shouldShow = Array.from(activeTags).every(tag => divTags.includes(tag))

//           if (shouldShow) {
//             div.style.display = 'block'
//           } else {
//             div.style.display = 'none'
//           }
//         })
//       })
//     })
//   })

//   document.addEventListener(`DOMContentLoaded`, function() {
//     var buttons = document.querySelectorAll(`.btn`)

//     buttons.forEach(function(button) {
//       button.addEventListener(`click`, function() {
//         button.classList.toggle(`active`)
//       })
//     })
//   })
// }

// // Search
// if (window.location.pathname === `/mixology`) {
//   const searchInput = document.getElementById(`searchInput`)
//   const searchButton = document.getElementById(`searchButton`)

//   function searchDataBook(input) {
//     const divs = document.getElementsByClassName(`cockt`)
//     for (const elem of divb) {
//       let result = elem.innerHTML.toLowerCase().includes(input)
//       if (result) {
//         elem.hidden = false
//       } else {
//         elem.hidden = true
//       } 
//     }
//   }
//   searchButton.addEventListener(`click`, () => {
//     const userInput = searchInput.value.toLowerCase()
//     searchDataBook(userInput)
//   })

//   // Enter click
//   document.addEventListener(`keydown`, function(event) {
//     if (event.key === `Enter`) {
//         document.getElementById(`searchButton`).dispatchEvent(new Event(`click`))
//         event.preventDefault()
//     }
//   })
// }
