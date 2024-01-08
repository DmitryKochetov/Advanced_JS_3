function firstSaveProductsToLocalStorage(list) {
  if (localStorage.getItem("products") === null) {
    localStorage.setItem("products", JSON.stringify(list));
  }
}

function saveProductsToLocalStorage(list) {
  localStorage.setItem("products", JSON.stringify(list));
}

function getProductsFromLocalStorage() {
  return JSON.parse(localStorage.getItem("products"));
}

function deleteProductFromLocalStorage(id) {
  console.log(id);
  let products = getProductsFromLocalStorage();
  // console.log(products);
  for (let i = 0; i < products.length; i++) {
    // console.log(i);
    for(let j = 0; j < products[i].reviews.length; j++){
      if(products[i].reviews[j].id == id){
        console.log(id);
        products[i].reviews.splice(j, 1);
        console.log(products[i].reviews.length);
        if(products[i].reviews.length == 0){
          console.log("удаляем товар");
          products.splice(i, 1);
        }
        saveProductsToLocalStorage(products)
        console.log(products);
        // delete products[i].reviews[j];
        // renderProductsList(products);
      }
      // console.log(products[i].reviews[j]);
    }
  }
}
