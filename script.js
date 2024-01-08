// # Заключительное задание.

// Создайте две html-страницы:

// 1. Страница добавления отзыва о продукте.
// Должна содержать форму с полем для ввода названия продукта и текстовое поле
// для текста отзыва.
// Кнопка "Добавить отзыв", которая сохраняет отзыв о продукте в localstorage.
// Необходимо реализовать проверку, оба поля должны быть заполнены, если это не
// так, необходимо выводить ошибку пользователю.

const initialData = [
  {
    id: Date.now(),
    product: "Apple iPhone 13",
    reviews: [
      {
        id: Date.now() + 1,
        text: "Отличный телефон! Батарея держится долго.",
      },
      {
        id: Date.now() + 2,
        text: "Камера супер, фото выглядят просто потрясающе.",
      },
    ],
  },
  {
    id: Date.now() + 3,
    product: "Samsung Galaxy Z Fold 3",
    reviews: [
      {
        id: Date.now() + 4,
        text: "Интересный дизайн, но дорогой.",
      },
    ],
  },
  {
    id: Date.now() + 5,
    product: "Sony PlayStation 5",
    reviews: [
      {
        id: Date.now() + 6,
        text: "Люблю играть на PS5, графика на высоте.",
      },
    ],
  },
];

firstSaveProductsToLocalStorage(initialData);

const currentData = getProductsFromLocalStorage();

const itemsFeedBackListRouterBtn = document.getElementById(
  "itemsFeedBackListRouter"
);
const addProductNameInput = document.getElementById("addProductNameInput");
const addProductBtn = document.getElementById("addProductBtn");
const addFeedbackInput = document.getElementById("addFeedbackInput");
const errorMessage = document.getElementById("errorMessage");

const wrapper = document.querySelector(".wrapper");

itemsFeedBackListRouterBtn.addEventListener("click", (e) => {
  window.open("itemsFeedBackList.html", "_self");
});

function renderItem(product, reviews, id) {
  reviewList = "";
  for (let review of reviews) {
    reviewList += `<p class = "product-item__review">${review.text}</p>`;
  }
  return `
      <div class="product-item">
          <h3>${product}</h3>
          ${reviewList}
      </div>
      `;
}

function renderProductsList(list) {
  let productsList = list
    .map((item) => renderItem(item.product, item.reviews, item.id))
    .join("");
  productsList = `<div class="products-list">${productsList}</div>
  `;
  wrapper.innerHTML = productsList;
}

renderProductsList(getProductsFromLocalStorage());

addProductBtn.addEventListener("click", (e) => {
  let product = addProductNameInput.value;
  let feedback = addFeedbackInput.value;

  if (!product || !feedback) {
    console.log("Нужно ввести название продукта и текст отзыва");
    errorMessage.textContent = "Нужно ввести название продукта и текст отзыва";
  } else {
    if (currentData.find((el) => el.product === product)) {
      currentData[
        currentData.findIndex((el) => el.product === product)
      ].reviews.push({ id: Date.now(), text: feedback });
    } else {
      currentData.push({
        id: Date.now(),
        product: product,
        reviews: [
          {
            id: Date.now(),
            text: feedback,
          },
        ],
      });
      errorMessage.textContent = "";
    }
    saveProductsToLocalStorage(currentData);
    renderProductsList(getProductsFromLocalStorage());
  }
});
