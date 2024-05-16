//variables globales del formulario
const d = document;
let userInput = d.querySelector("#usuarioForm");
let contraInput = d.querySelector("#contraForm");
let btnLogin = d.querySelector(".btnLogin");

//evento al boton del login
btnLogin.addEventListener("click", () => {  
  let user = getData();
  sendData(user);
});

//funcion para validar datos
//y obtener las credenciales
let getData = () => {
  //validar formulario
  let user;
  if (userInput.value && contraInput.value) {
    user = {
      usuario: userInput.value,
      contrasena: contraInput.value,
    };
    userInput.value = "";
    contraInput.value = "";
    console.log(user);
  } else {
    alert("El usuario y la contraseña son obligarias");
  }

  return user;
};

//funcion para obtener los datos
//y realizar la peticion al servidor
let sendData = async (data) => {
  let url = "http://localhost/backend-apiCrud/login";
  try {
    let respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (respuesta.status == 401) {
      alert("EL usuario y/o contraseña es incorrecto");
    } else {
      let userData = await respuesta.json();
      alert("Bienvenido " + userData.nombre);
      localStorage.setItem("userLogin", JSON.stringify(userData))
      location.href = "../index.html";
      console.log(userData);
    }
  } catch (error) {
    console.log("error: " + error);
  }
};