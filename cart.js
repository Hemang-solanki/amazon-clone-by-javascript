let arr = []
let ary = []  
async function view(arr) {
    let d = new URLSearchParams(window.location.search)
    let id = d.get("id")

    let data = await fetch("https://mock-server-app-srw6.onrender.com/cart")
    let dee = await data.json()
    document.getElementById("data").innerHTML = v(dee)
    document.getElementById("btns").innerHTML=btns(dee)
    arr = dee
    ary = dee
}


function btns(el){
  return`<span onclick="del(${el.id})"> Checkout  <i class="fas fa-long-arrow-alt-right ms-2"></i></span>`
}

function del(el){
  ary.forEach((el)=>{
         fetch(`https://mock-server-app-srw6.onrender.com/cart/${el.id}`,{
          method : 'DELETE',
          headers :{
              'Content-type' : 'application/json'
          }
      })
      .then((res)=>res.json())
      .then((res)=>{
          ary = []
  document.getElementById("data").innerHTML = v(ary)
      })
      .catch((er)=>{
          console.log(er)
      })
  
  })
  const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Thank You For Shopping"
    });
  setTimeout(()=>{
      window.location.href="index.html"
  },2000)
  }
view()
let cart = 0;
let total = 0;
let disscount = 0;
let maintotal;

function v(arr) {
    // console.log(arr);
    cart = arr.length;
    // console.log(cart);
    // document.getElementById("carrt").innerText = cart;
    return arr.map((el) => {
        total += +el.price
        // // console.log(total);

        document.getElementById("maintotal").innerText = "₹" + total;
        disscount = 0.10 * total;
        document.getElementById("dissco").innerText = "₹" + Math.round(disscount);
        maintotal = total - disscount;
        document.getElementById("total").innerText = "₹" + Math.round(maintotal);
        // document.getElementById("ttotal").innerText = "₹" + Math.round(maintotal);


        let dis = Math.floor(
            ((el.strikedOffPrice - el.price) / el.strikedOffPrice) * 100)
        return `<div class="card mb-3">
                        <div class="card-body">
                          <div class="d-flex justify-content-between">
                            <div class="d-flex flex-row align-items-center">
                              <div>
                                <img
                                  src="${el.imageURL}"
                                  class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;">
                              </div>
                              <div class="ms-3">
                                <h5>${el.product}</h5>
                                <p class="small mb-0">${el.brand}</p>
                              </div>
                            </div>
                            <div class="d-flex flex-row align-items-center">
                              <div style="width: 80px;">
                                <h5 class="mb-0">₹${el.price}</h5>
                              </div>
                              <a href="#!" style="color: #cecece;"><i class="fas fa-trash-alt"></i></a>
                            </div>
                          </div>
                        </div>
                      </div>`
    }).join("")
}

