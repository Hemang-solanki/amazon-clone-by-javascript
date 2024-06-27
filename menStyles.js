// Importing Navbar
// import navbar from "components/navbar.js";
// let nav_container = document.getElementById("naz-nav-container");
// console.log(navbar);
// nav_container.innerHTML = navbar();

// Sidebar Filter
// import sidebar from "components/sidebar-filter.js";
let sidebar_container = document.getElementById("naz-sidebar");
sidebar_container.innerHTML = sidebar();

//rendering products to DOM
// import renderProducts from "scripts/renderProducts.js";

//filtering functionality
// import filterProducts from "scripts/filterFunctionality.js";

//sorting functionality
// import sortFunctionality from "scripts/sortFunctionality.js";

//API call
let data;
getData();

//Sort functionality
document
  .getElementById("naz-sort-products")
  .addEventListener("change", sortingProducts);

function sortingProducts() {
  sortFunctionality(data);
}
//Filter Products
let button = document
  .getElementById("filterButton")
  .addEventListener("click", filterProducts);

//API Call
async function getData() {
  const res = await fetch("https://mock-server-app-srw6.onrender.com/products");
  data = await res.json();
  // data = data.products;
  renderProducts(data);
}


function renderProducts(data) {
  let parent = document.getElementById("naz-product-container");
  parent.innerHTML = "";
  data.map((elem) => {

    // `<a href="index.html">Hello</a>`
    let product = document.createElement("div");
    product.setAttribute("class", "naz-product");
    let poster = document.createElement("img");
    poster.setAttribute("class", "naz-product-img");
    poster.setAttribute("src", elem.imageURL);
    
    let brand = document.createElement("p");
    brand.setAttribute("class", "naz-product-brand");
    brand.innerHTML = elem.brand;
    
    let title = document.createElement("p");
    title.setAttribute("class", "naz-product-title");
    title.innerHTML = elem.product;
    title.innerHTML=`<a href="clickedproduct.html?id=${elem.id}">${elem.product}</a>`;
    
    let price_container = document.createElement("div");
    price_container.setAttribute("class", "naz-price-container");

    let price = document.createElement("p");
    price.setAttribute("class", "naz-price");
    price.innerHTML = `₹${elem.price}`;

    let strikedPrice = document.createElement("p");
    strikedPrice.setAttribute("class", "naz-striked-price");
    strikedPrice.innerHTML = `₹${elem.strikedOffPrice}`;

    let offer = document.createElement("p");
    offer.setAttribute("class", "naz-offer");
    let offerValue = Math.floor(
      ((elem.strikedOffPrice - elem.price) / elem.strikedOffPrice) * 100
    );
    offer.innerHTML = `(${offerValue}% off)`;

    price_container.append(price, strikedPrice, offer);
    product.append(poster, brand, title, price_container);

    parent.append(product);

    poster.addEventListener("click", function () {
      addToCart(elem);
    });
  });
}


// Navbar Component
// function navbar() {
//   return `<div id="navbar">
//     <div id="navbar-left">
//         <img id="site-logo" src="https://assets.ajio.com/static/img/Ajio-Logo.svg" onclick="window.location.href = 'home.html'" alt="">
//     </div>
//     <div id="navbar-right">
//         <div id="right-upper">
//             <a href=""><p id="ru">Sign In / Join AJIO</p></a>
//             <a href=""><p id="ru">Customer Care</p></a>
//             <button id="navbar-button">Visit AJIOLUXE</button>
//         </div>
//         <div id="right-lower">
//             <p id="rl"><a href="../menStyles.html">MEN</a></p>
//             <p id="rl"><a href="../womenStyles.html">WOMEN</a></p>
//             <p id="rl"><a href="../kidsStyles.html">KIDS</a></p>
//             <p id="rl">INDIE</p>
//             <p id="rl">HOME AND KITCHEN</p>
//             <input id="navbar-input" type="text" placeholder="Search AJIO">
//             <img id="bar-img" src="https://i.pinimg.com/originals/fc/fa/0c/fcfa0c367d786deeaf42dec2fda70e47.png" alt="">
//             <img id="bar-img"  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjHuCTCHiz7-sR9YwmlVHDZ0UXU-tcjDRIzmGlub9of64k0gsAJXe29kR-9Bpfj1f_YAg&usqp=CAU" alt="">
//         </div>
//     </div>
// </div>`;
// }

function sidebar() {
  return `
<div id="mobile-filter">
  <div>
    <h4 id="burgundy">Refine By</h4>
  </div>
  <div class="py-1 border-bottom ml-3">
    <h6 class="font-weight-bold">Gender</h6>
    <div id="orange"><span class="fa fa-minus"></span></div>
    <form>
      <div class="form-group">
        <input type="checkbox" id="menFilter" />
        <label for="menFilter">Men Styles</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="womenFilter" />
        <label for="womenFilter">Women Styles</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="kidsFilter" />
        <label for="kidsFilter">Kids Styles</label>
      </div>
    </form>
  </div>
  <div class="py-2 border-bottom ml-3">
    <h6 class="font-weight-bold">Category</h6>
    <div id="orange"><span class="fa fa-minus"></span></div>
    <form>
      <div class="form-group">
        <input type="checkbox" id="shirtFilter" />
        <label for="shirtFilter">Shirts</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="tshirtFilter" />
        <label for="tshirtFilter">T-Shirts</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="jacketFilter" />
        <label for="jacketFilter">Jackets</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="trouserFilter" />
        <label for="trouserFilter">Trousers</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="shortsFilter" />
        <label for="shortsFilter">Shorts</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="topsFilter" />
        <label for="topsFilter">Tops</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="kurtasFilter" />
        <label for="kurtasFilter">Kurtas</label>
      </div>
      <div class="form-group">
        <input type="checkbox" id="sareeFilter" />
        <label for="sareeFilter">Saree</label>
      </div>
    </form>
  </div>
  <button id="filterButton">Filter</button>
</div>`;
}



function filterProducts() {
  // Filtering Based On Gender
  let menFilter = document.getElementById("menFilter");
  let womenFilter = document.getElementById("womenFilter");
  let kidFilter = document.getElementById("kidsFilter");

  if (menFilter.checked == true) window.location.href = "./menStyles.html";

  if (womenFilter.checked == true) window.location.href = "./womenStyles.html";

  if (kidFilter.checked == true) window.location.href = "./kidsStyles.html";

  // Filtering based on Categories
  let queryURL = "http://localhost:5000/products/filter?items=[";
  let filterQuery = [];
  let shirtFilter = document.getElementById("shirtFilter");
  let tshirtFilter = document.getElementById("tshirtFilter");
  let jacketFilter = document.getElementById("jacketFilter");
  let trouserFilter = document.getElementById("trouserFilter");
  let shortsFilter = document.getElementById("shortsFilter");
  let topsFilter = document.getElementById("topsFilter");
  let kurtasFilter = document.getElementById("kurtasFilter");
  let sareeFilter = document.getElementById("sareeFilter");

  if (shirtFilter.checked == true) filterQuery.push("shirt");
  if (tshirtFilter.checked == true) filterQuery.push("tshirt");
  if (jacketFilter.checked == true) filterQuery.push("jacket");
  if (trouserFilter.checked == true) filterQuery.push("pants");
  if (shortsFilter.checked == true) filterQuery.push("shorts");
  if (topsFilter.checked == true) filterQuery.push("top");
  if (kurtasFilter.checked == true) filterQuery.push("kurta");
  if (sareeFilter.checked == true) filterQuery.push("saree");

  filterQuery.map((elem) => {
    queryURL = queryURL + elem + ",";
  });
  queryURL = queryURL.slice(0, -1);
  queryURL += "]";

  filteredData(queryURL);
}

async function filteredData(queryURL) {
  let res = await fetch(queryURL);
  let data = await res.json();
  data = data.products;
  console.log(data);
  renderProducts(data);
}



//Sort functionality for products
function sortFunctionality(data) {
  let selected = document.getElementById("naz-sort-products-option").value;

  if (selected == "default") {
    renderProducts(data);
  }
  if (selected == "Relevence") {
    shuffleArray(data);
  }
  if (selected == "Discount") {
    let array = data.slice();
    array.map((elem) => {
      let offer = Math.floor(
        ((elem.strikedOffPrice - elem.price) / elem.strikedOffPrice) * 100
      );
      elem.discount = offer;
    });
    array.sort((a, b) => {
      return b.discount - a.discount;
    });
    renderProducts(array);
  }

  if (selected == "lowtohigh") {
    let array = data.slice();
    array.sort((a, b) => {
      return a.price - b.price;
    });
    renderProducts(array);
  }

  if (selected == "hightolow") {
    let array = data.slice();
    array.sort((a, b) => {
      return b.price - a.price;
    });
    renderProducts(array);
  }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(data) {
  let array = data.slice();
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  renderProducts(array);
}