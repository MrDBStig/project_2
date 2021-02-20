/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против...",
    ],
  };

  const promoBlock = document.querySelectorAll(".promo__adv img"),
    poster = document.querySelector(".promo__bg"),
    genre = poster.querySelector(".promo__genre"),
    films = document.querySelector(".promo__interactive-list"),
    addForm = document.querySelector("form.add"),
    addInput = addForm.querySelector(".adding__input"),
    checkbox = addForm.querySelector('[type="checkbox"]'),
    throwAds = document.querySelector("#delete-banners"),
    headerBackground = document.querySelector(".header__logo");

  addForm.addEventListener("submit", function addUserFilm(event) {
    event.preventDefault();

    let newFilm = addInput.value;
    const favorite = checkbox.checked;

    if (newFilm) {
      if (newFilm.length > 21) {
        newFilm = `${newFilm.substr(0, 21)}...`;
      }
      if (favorite) {
        alert(`Добавляем любимый фильм: ${newFilm}`);
      }
      movieDB.movies.push(newFilm);
      sortFilms(movieDB.movies);
      createMovieList(movieDB.movies, films);
    }

    event.target.reset();
  });

  const deleteAds = (arg, lc) => {
    lc.addEventListener("click", () => {
      arg.forEach((item) => {
        item.remove();
      });
      lc.remove();
    });
  };

  const makeChanges = () => {
    genre.textContent = "ДРАМА";
    poster.style.backgroundImage = `url(img/bg.jpg)`;
  };

  const sortFilms = (array) => {
    array.sort();
  };

  function changeBackground() {
    headerBackground.addEventListener("click", (event) => {
      if (event.target && event.target.tagName == "IMG") {
        headerBackground.classList.toggle("active");
      }
    });
  }

  function createMovieList(mov, parent) {
    parent.innerHTML = "";
    sortFilms(mov);
    mov.forEach((film, i) => {
      parent.innerHTML += `
        <li class="promo__interactive-item">${i + 1}. ${film}
          <div class="delete"></div>
        </li>`;
    });
    document.querySelectorAll(".delete").forEach((btn, i) => {
      btn.addEventListener("click", () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);
        createMovieList(mov, parent);
      });
    });
  }

  makeChanges();
  deleteAds(promoBlock, throwAds);
  changeBackground();
  createMovieList(movieDB.movies, films);
});
