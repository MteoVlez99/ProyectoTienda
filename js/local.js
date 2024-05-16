const d = document;
let nameUser = d.querySelector("#nombre-usuario");
let btnLogout = d.querySelector("#btnLogout"); 

d.addEventListener("DOMContentLoaded", ()=>{
    getUser();
});

let getUser = ()=>{
    let user = JSON.parse(localStorage.getItem("userLogin"));
    nameUser.textContent = user.nombre;
}

btnLogout.addEventListener("click", ()=>{
    localStorage.removeItem("userLogin");
    location.href = "../login.html"
})