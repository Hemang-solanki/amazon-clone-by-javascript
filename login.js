
document.getElementById("amazon").addEventListener("click",async (e)=>{
    e.preventDefault()
    let email = document.getElementById("email").value
    let password =document.getElementById("p").value
    let d = await fetch("https://mock-server-app-srw6.onrender.com/user")
    let data = await d.json()
    
    let val = data.filter((el)=>el.email == email)
    console.log(val)
    if(val.length == 0){
        alert("first Register")
        window.location.href = "index.html"
    }else{
        if(val[0].pass == password){
            alert("Login Successfull")
            window.location.href = "index.html"
        }else{
            alert("Wrong Passsword")
        }
    }
    
})