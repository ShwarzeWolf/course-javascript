/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie.
 Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из
    браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie.
 Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу
   добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично,
 есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер,
 но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

loadCookiesToTable();

function cookieMatchesFilter(cookie, cookies) {
  const pattern = filterNameInput.value ? filterNameInput.value.trim().toUpperCase() : '';
  return (
    pattern === '' ||
    cookie.toUpperCase().includes(pattern) ||
    (cookies[cookie] && cookies[cookie].toUpperCase().includes(pattern))
  );
}

function getCookies() {
  const obj = {};

  if (document.cookie) {
    document.cookie.split('; ').map((cookie) => {
      const [cookieName, cookieValue] = cookie.split('=');
      obj[cookieName] = cookieValue;
    });
  }

  return obj;
}

function loadCookiesToTable() {
  listTable.innerHTML = '';
  const cookies = getCookies();
  Object.keys(cookies)
    .filter((cookie) => {
      return cookieMatchesFilter(cookie, cookies);
    })
    .map((cookieName) => {
      addCookie(cookieName, cookies[cookieName]);
    });
}

filterNameInput.addEventListener('input', function () {
  loadCookiesToTable();
});

addButton.addEventListener('click', () => {
  const cookieName = addNameInput.value;
  const cookieValue = addValueInput.value;

  document.cookie = `${cookieName}=${cookieValue}`;
  loadCookiesToTable();
});

function addCookie(cookieName, cookieValue) {
  const cookieElement = document.createElement('tr');
  cookieElement.classList.add(cookieName);

  const cookieNameElement = document.createElement('th');
  cookieNameElement.textContent = cookieName;

  const cookieValueElement = document.createElement('th');
  cookieValueElement.textContent = cookieValue;

  const cookieDeleteButton = document.createElement('button');
  cookieDeleteButton.textContent = 'удалить';

  cookieDeleteButton.addEventListener('click', (event) => {
    listTable.removeChild(cookieElement);
    document.cookie = `${cookieName}=;expires=${new Date(0)}`;
  });

  cookieElement.append(cookieNameElement, cookieValueElement, cookieDeleteButton);
  listTable.append(cookieElement);
}
