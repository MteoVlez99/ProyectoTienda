//variables globales
const d = document;
let tablePro = d.querySelector("#tabla-listado > tbody");
let searchInput = d.querySelector("#buscador-input");
let dataTableGlobal;

//evento al input buscar
searchInput.addEventListener("keyup", () => {
  console.log(searchInput.value);
});

//evento al navegador apenas cargue la pagina
d.addEventListener("DOMContentLoaded", () => {
  getDataTable();
});

//funcion para realizar la peticion
//y mostrar los datos en la tabla
let getDataTable = async () => {
  let url = "http://localhost/backend-apiCrud/productos";
  try {
    let respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    //validar que hayan datos en la tabla
    if (respuesta.status === 204) {
      alert("No hay datos en la BD");
    } else {
      let dataTable = await respuesta.json();
      console.log(dataTable);
      //Guardar los datos en localStorage
      localStorage.setItem("datosTabla", JSON.stringify(dataTable))

      //recorrer el array de datos con forEach
      dataTable.forEach((dato, i) => {
        //crear la fila de la tabla
        let row = d.createElement("tr");
        row.innerHTML = `
            <td> ${i + 1} </td>
            <td> ${dato.nombre} </td>
            <td> ${dato.descripcion} </td>
            <td> ${dato.precio} </td>
            <td> ${dato.stock} </td>
            <td> <img src="${dato.imagen}" width="100"> </td>
            <td>
                <button type="button" onclick="editDataTable(${i})" id="btn-Edit" class="btn btn-warning">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                    </svg>
                </button> - 
                <button type="button" onclick="deleteDataTable(${i})" id="btn-delete" class="btn btn-danger">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                    </svg>
                </button>
            </td>
        `;
        tablePro.appendChild(row);
      });
    }
  } catch (error) {
    console.log(error);
  }
};


let editDataTable = (pos) =>{
  let products = [];
  let productsSave = JSON.parse(localStorage.getItem("datosTabla"));
  if (productsSave != null) {
    products = productsSave;
  }
  let singleProduct = products[pos];

  localStorage.setItem("productEdit", JSON.stringify(singleProduct));
  localStorage.removeItem("datosTabla");
  location.href = "../crear-pro.html"

}

let deleteDataTable = () =>{

}