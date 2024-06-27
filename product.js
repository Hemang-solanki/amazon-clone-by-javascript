// async function getData() {
//   const res = await fetch("http://localhost:3000/products");
//   data = await res.json();
//   // data = data.products;
//   // v(data);
//   document.getElementById("box").innerHTML=v(data)
// }


// function v(el)
// {
//   return ``
// }


let arr = []


function fet() {
    fetch("https://mock-server-app-srw6.onrender.com/products")
        .then((res) => {
            return res.json()
        })
        .then((res) => {
            arr = res
            document.getElementById("box").innerHTML = view(res)
        })
        .catch((err) => {
            console.log(err)
        })
}


function view(arr) {
    console.log(arr)
    return arr.map((el) => {
        return `<a href="single-Product-page.html?id=${el.id}">
        <div class="shop-link">
          <h3>${el.product}</h3>
          <img src="${el.imageURL}" alt="${el.title}">
          <h1>${el.category}</h1>
          <p>${el.brand}</p>
          <span></span><span style="text-decoration: line-through;">${el.strikedOffPrice}</span><span></span>  
        </div>
        </a>`
    }).join("")

}

fet()

document.getElementById("sort").addEventListener("change", () => {
    console.log(document.getElementById("sort").value)
    if (document.getElementById("sort").value == "asc") {
        let low = arr.sort((a, b) => +a.price - +b.price)
        document.getElementById("box").innerHTML = view(low)
    }
    else if (document.getElementById("sort").value == "desc") {
        let d = arr.sort((a, b) => +b.price - +a.price)
        document.getElementById("box").innerHTML = view(d)
    }
})