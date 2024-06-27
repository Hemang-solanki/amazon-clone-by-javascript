async function view(){
    let d = new URLSearchParams(window.location.search)
    let id = d.get("id")
    
     let data = await fetch(`https://mock-server-app-srw6.onrender.com/products/${id}`)
     let dee = await data.json()
     document.getElementById("data").innerHTML = v(dee)
     document.getElementById("btn").innerHTML = btns(dee)
  }
  
  view()
  
  function v(el){
     
    let dis= Math.floor(
      ((el.strikedOffPrice - el.price) / el.strikedOffPrice) * 100)
    document.getElementById("price").innerText ="₹"+el.price; 
    document.getElementById("noprice").innerText ="₹"+el.strikedOffPrice; 
    // document.getElementById("tit").innerHTML =el.product; 
    // document.getElementById("diss").innerHTML =dis+"% off"; 
          return `<img src="${el.imageURL}" alt=""/>`
  }
 
  function btns(el)
  {
    return`   <a href="cart.html?id=${el.id}"><div class="cart-icon" >   
                                  <button>
                                        <i class="fa fa-shopping-cart"></i>
                                       <span class="cart">Add to Cart</span>
                                  </button>
                              </div></a>
                              <div class="love-icon">
                                  <button onclick="post('${el.id}')">
                                      <i class="fa fa-heart"></i> 
                                  </button>  
                              </div> `
  }
  // let s = {}
  async function post(el){
    let count = 0
    let d = await fetch(`https://mock-server-app-srw6.onrender.com/cart`)
    let s = await d.json()
    
    s.forEach(element => {
       if(element.id == el){
         count++
       }
    });
    // console.log(count)
  
    if(count>0){
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
        icon: "error",
        title: "Product Is Alredy In Cart"
      });
    }else{
   fetch(`https://mock-server-app-srw6.onrender.com/products/${el}`)
    .then((res)=>{
      return res.json()
    })
    .then((res)=>{
      fetch("https://mock-server-app-srw6.onrender.com/cart",{
          method : 'POST',
          headers :{
              'Content-type' : 'application/json'
          },
          body : JSON.stringify(res)
      })
      .then((res)=>res.json())
      .then((res)=>{
          console.log(res)
      })
      .catch((er)=>{
          console.log(er)
      })
    })
  }
  }

