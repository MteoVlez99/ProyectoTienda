//variables globales
const d = document;
let nameInput = d.querySelector("#productos-select");
let priceInput = d.querySelector("#precio-pro");
let stockInput = d.querySelector("#stock-pro");
let descripcionInput = d.querySelector("#descripcion-pro");
let imagen = d.querySelector("#imagen-pro");
let btnCreate = d.querySelector("#btn-create");
let productUpdate;

//agregar evento al boton crear
btnCreate.addEventListener("click", () => {
  //alert(nameInput.value);
  let pro = getDataProduct();
  sendDataProduct(pro);
});

//validar el formulario y
//obtener los datos del producto
let getDataProduct = () => {
  //validar formulario
  let product;
  if (
    nameInput.value &&
    priceInput.value &&
    stockInput.value &&
    descripcionInput.value &&
    imagen.src
  ) {
    product = {
      nombre: nameInput.value,
      descripcion: descripcionInput.value,
      precio: priceInput.value,
      stock: stockInput.value,
      imagen: imagen.src,
    };
    nameInput.value = "";
    descripcionInput.value = "";
    priceInput.value = "";
    stockInput.value = 10;
    imagen.src = "https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg";
    console.log(product);
  } else {
    alert("Todos los datos son obligatorios");
  }

  return product;
};

//funcion para obtener los datos
//y realizar la peticion al servidor
let sendDataProduct = async (data) => {
  let url = "http://localhost/backend-apiCrud/productos";
  try {
    let respuesta = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (respuesta.status == 406) {
      alert("Los datos enviados no fueron adminitidos");
    } else {
      let mensaje = await respuesta.json();
      alert(mensaje.message);

      location.href = "../listado-pro.html";
    }
  } catch (error) {
    console.log("error: " + error);
  }
};
