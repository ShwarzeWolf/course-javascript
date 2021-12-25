/* ДЗ 5 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунд

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {
  const MILLISECONDS_IN_SECONDS = 1000;

  return new Promise((resolve) => {
    setTimeout(() => resolve(), seconds * MILLISECONDS_IN_SECONDS);
  });
}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов можно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */
function loadAndSortTowns() {
  const URL = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

  return fetch(URL)
    .then((data) => data.json())
    .then((data) =>
      data.sort((town, otherTown) => town.name.localeCompare(otherTown.name))
    );
}

export { delayPromise, loadAndSortTowns };
