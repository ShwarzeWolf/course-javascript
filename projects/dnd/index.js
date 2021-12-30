/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем,
 что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');
let draggedElement = null;

document.addEventListener('mousemove', (e) => {
  if (draggedElement) {
    draggedElement.style.top = e.clientY + 'px';
    draggedElement.style.left = e.clientX + 'px';
  }
});

export function createDiv() {
  const element = document.createElement('div');

  element.classList.add('draggable-div');
  element.style.position = 'fixed';
  element.style.width = Math.random() * document.body.clientWidth + 'px';
  element.style.height = Math.random() * document.body.clientHeight + 'px';
  element.style.background = '#' + Math.floor(Math.random() * 16777215).toString(16);
  element.style.top = Math.random() * document.body.clientWidth + 'px';
  element.style.left = Math.random() * document.body.clientHeight + 'px';

  element.addEventListener('mousedown', (event) => {
    draggedElement = element;
  });

  element.addEventListener('mouseup', (event) => {
    draggedElement = null;
  });

  return element;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
