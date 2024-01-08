// 2. Страница просмотра отзывов.
// Показывает список всех продуктов, на которые были оставлены отзывы.
// Рядом с каждым продуктом должна быть кнопка "показать отзывы" / "скрыть отзывы"
// (надпись кнопки меняется), при нажатии на которую показываются / скрываются
// отзывы продукта.
// После текста отзыва должна быть кнопка "удалить", которая удаляет данный отзыв
// из localstorage и со страницы.
// Если удалены все отзывы продукта, то продукта вовсе должен быть удален, как из
// localstorage, так и со страницы.

const currentData = getProductsFromLocalStorage();

const wrapper = document.querySelector(".wrapper");

function renderItem(product, reviews, id) {
  reviewList = "";
  for (let review of reviews) {
    let n = 0;
    reviewList += `
    <div>
        <div class="product-item__review ${id}" data-marker="${review.id}">${review.text}
            <button class="product-item__buttonDelete" data-marker="${review.id}">Удалить</button>
            <p></p>
        </div>
    </div>`;
    n++;
  }
  return `
      <div class="product-item">
          <h3>${product}</h3>
          <button class="product-item__buttonShow" id="${id}">Показать/скрыть отзывы</button><p></p>
          ${reviewList}
      </div>

      <div class="product-item__error-feedback"></div>
    `;
}

function renderProductsList(list) {
  let productsList = list
    .map((item) => renderItem(item.product, item.reviews, item.id))
    .join("");
  document.querySelector(".wrapper").innerHTML = productsList;
}

renderProductsList(currentData);

const mainPageRouterBtn = document.getElementById(
  "mainListRouter"
);

mainPageRouterBtn.addEventListener("click", (e) => {
  window.open("index.html", "_self");
});



wrapper.addEventListener("click", (e) => {
  let target = e.target;
  if (e.target.classList.contains("product-item__buttonShow")) {
    clickHandler(target);
  }
  if (e.target.classList.contains("product-item__buttonDelete")) {
    // target.parentElement.parentElement.remove();
    // console.log(target.parentElement);
    // target.marker = target.parentElement.id;
    deleteHandler(target);
    // console.log(target.id);
  }
});

function clickHandler(target) {
  let mas = document.querySelectorAll(".product-item__review");
  for (let i = 0; i < mas.length; i++) {
    if (mas[i].classList.contains(target.id)) {
      mas[i].classList.toggle("notShowFeedback");
    }
  }
}

function deleteHandler(target) {
    // let mas = document.querySelectorAll(".product-item__review");
    // console.log(mas);
    // console.log(target.getAttribute("data-marker"));
    deleteProductFromLocalStorage(target.getAttribute("data-marker"))
    renderProductsList(getProductsFromLocalStorage());
    // console.log(target);
    // console.log(target.parentElement);
    // console.log(target.parentElement.classList);
    // for (let i = 0; i < mas.length; i++) {
    //     if (mas[i].classList.contains(target.id)) {
    //           console.log(mas[i]);
    //         deleteProductFromLocalStorage(mas[i].id);
    //     }
    // }
}

