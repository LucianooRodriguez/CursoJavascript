let segsDiv = document.getElementById("conteiner");
let coincidir = document.getElementById("coinBusqueda");
let selecOrden = document.getElementById("selectOrden");
let btnMostrarListado = document.getElementById("botonMostrar");
let ocultarListadoBtn = document.getElementById("botonOcultar");
let buscador = document.getElementById("buscador");
let modalCotizadorSeguros = document.getElementById("modal-bodyCotizador")
let agregarSeguro = document.getElementById("botonCotizador")
let calcuTotal = document.getElementById("preTotal")
let loader = document.getElementById("load")
let dia = document.getElementById("dia")
let compraFin = document.getElementById("botonFinalizarCompra")

//funcion de ver el listado de seguros
function desplegarListado(array) {
    segsDiv.innerHTML = "";
    for (let seg of array) {
        let nuevoSeguroDiv = document.createElement("div");
        nuevoSeguroDiv.classList.add("col-12", "col-md-6", "col-lg-5", "mb-2");
        nuevoSeguroDiv.innerHTML = `
        <div id="${seg.id}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;"src="assets/iconos/${seg.imagen}" alt="">
        <div class="card-body">
            <h4 class="card-e">${seg.empresa}</h4>
            <p class = "card-e">Nombre: ${seg.nombre}</p>
            <p class="card-e">Precio: $${seg.precio}</p>
            <p class="card-e">Tipo: ${seg.tipo}</p>
        <button id="agregarSegCotizador${seg.id}" class="btn btn-outline-primary">Agregar al cotizador</button>
        </div>
    </div> `;
        segsDiv.appendChild(nuevoSeguroDiv);
        let agregarC = document.getElementById(`agregarSegCotizador${seg.id}`);

        agregarC.addEventListener("click", () => {
            agregarSegCotizador(seg);
        });
    }
}

//funcion de busqueda
function buscarSeg(buscado, array) {
    let busquedaListado = array.filter(
        (seguro) =>
            seguro.empresa.toLowerCase().includes(buscado) ||
            seguro.nombre.toLowerCase().includes(buscado) ||
            seguro.tipo.toLowerCase().includes(buscado)
    )
    busquedaListado.length == 0 ?
        (coincidir.innerHTML = `<h4> No hay coincidencias con la busqueda solicitada</h4>`, desplegarListado(busquedaListado)) : (coincidir.innerHTML = "", desplegarListado(busquedaListado))
    return busquedaListado
    // if (busquedaListado.length == 0) {
    //     coincidir.innerHTML = `<h4> No hay coincidencias con la busqueda</h4>`;
    //     desplegarListado(busquedaListado);
    // } else {
    //     coincidir.innerHTML = "";
    //     desplegarListado(busquedaListado);
    // }
}

//funciones de filtrado
function filtrarPorEmpresa(array) {
    let utiBuscada = "Empresa"
    let busqueda = array.filter(
        (seg) => seg.empresa.toLowerCase() == utiBuscada.toLocaleLowerCase()
    );
    desplegarListado(busqueda);
}

function filtrarPorNombre(array) {
    let utiBuscada = "Nombre"
    let busqueda = array.filter(
        (seg) => seg.nombre.toLowerCase() == utiBuscada.toLocaleLowerCase()
    );
    desplegarListado(busqueda);
}

function filtrarPorTipo(array) {
    let utiBuscada = "Tipo"
    let busqueda = array.filter(
        (seg) => seg.tipo.toLowerCase() == utiBuscada.toLocaleLowerCase()
    );
    desplegarListado(busqueda);
}

function ordenMenoraMayor(array) {
    const menoraMayor = [].concat(array);
    menoraMayor.sort((a, b) => a.precio - b.precio);
    desplegarListado(menoraMayor);
}
//condicion para agregar seguro al cotizador
let segurosEnCotizador = []

if (localStorage.getItem("cotizador")) {
    for (let seguro of JSON.parse(localStorage.getItem("cotizador"))) {
        let cantidadEnStorage = seguro.cantidad
        let seguroCotizador = new Seguro(seguro.id, seguro.empresa, seguro.nombre, seguro.tipo, seguro.precio, seguro.imagen)
        seguroCotizador.cantidad = cantidadEnStorage
        segurosEnCotizador.push(seguroCotizador)
    }
    console.log(segurosEnCotizador)
} else {
    segurosEnCotizador = []
    localStorage.setItem("cotizador", segurosEnCotizador)
}

//Contador de seguros seleccionados que se acumularon
function calcularTotal(array) {

    let total = array.reduce((acc, segurosEnCotizador) => acc + (segurosEnCotizador.precio * segurosEnCotizador.cantidad), 0)
    total == 0 ? calcuTotal.innerHTML = `<p class ="vacio">No hay seguros en su cotizador<p>` :
        calcuTotal.innerHTML = `<p class = "total">El precio Total es: $${total}<p>`
    return total
}

//Agrego seguros al cotizador
function agregarSegCotizador(seg) {
    let segAgregado = segurosEnCotizador.find((element) => element.id == seg.id)
    if (segAgregado == undefined) {
        console.log(`Usted sumo a su cotizador de seguros un ${seg.empresa} de nombre  ${seg.nombre} que tiene un valor de : $${seg.precio}`)
        segurosEnCotizador.push(seg)
        console.log(segurosEnCotizador)
        localStorage.setItem("cotizador", JSON.stringify(segurosEnCotizador))
        Swal.fire({
            title: "Ha agregado un seguro",
            text: `${seg.empresa} de ${seg.nombre} fue agregado a su cotizador`,
            icon: "success",
            confirmButtonColor: "blue",
            confirmButtonText: "Gracias",
            timer: 2500,
            imageUrl: `assests/${seg.imagen}`,
            imageHeight: 250
        })
    } else {
        Swal.fire({
            title: "El seguro seleccionado ya existe en su cotizador",
            text: `${segAgregado.empresa} de nombre ${segAgregado.nombre} ya existe en su cotizador`,
            icon: "info",
            timer: 2000,
            showConfirmButton: false
        })
    }
}


//Despliego lo que se suma en el cotizador
function cargarSeguroCotizador(array) {
    modalCotizadorSeguros.innerHTML = ""
    array.forEach((segurosEnCotizador) => {
        modalCotizadorSeguros.innerHTML +=
            `
        <div class="card border-primary mb-3" id ="productoCarrito${segurosEnCotizador.id}" style="max-width: 540px;">
        <img class="card-img-top" height="250px" src="assests/${segurosEnCotizador.imagen}" alt="">
        <div class="card-body">
            <h4 class="card-title">${segurosEnCotizador.empresa}</h4>
                <p class="card-text">Precio por unidad: $${segurosEnCotizador.precio}</p> 
                <p class="card-text">Cantidad de unidades: ${segurosEnCotizador.cantidad}</p>
                <p class="card-text">SubTotal: ${segurosEnCotizador.cantidad * segurosEnCotizador.precio}</p>
                <button class= "btn" id="botonEliminar${segurosEnCotizador.id}"><i class="fas fa-trash-alt"><img class= "basura" src = "./assests/iconos/basura.png"></i></button>
                <button class= "btn btn-success" id="botonSumarUnidad${segurosEnCotizador.id}"><i class=""></i>+1</button>
                <button class= "btn btn-danger" id="botonEliminarUnidad${segurosEnCotizador.id}"><i class=""></i>-1</button> 
        
        </div>
        </div>
        <div class="row ml-ato">
            <p id="preTotal"></p>
        </div>`
    })
    calcularTotal(array)
    array.forEach((segurosEnCotizador) => {
        document.getElementById(`botonEliminar${segurosEnCotizador.id}`).addEventListener("click", () => {
            console.log(`el seguro ${segurosEnCotizador.empresa} y ${segurosEnCotizador.nombre} fue eliminado del cotizador`)
            //Borro desde el DOM
            let cardSeguro = document.getElementById(`seguroCotizador${segurosEnCotizador.id}`)
            cardSeguro.remove()
            //Borro desde el Array
            let seguroEliminar = array.find((seguro) => seguro.id == segurosEnCotizador.id)
            console.log(seguroEliminar)
            let indice = array.indexOf(seguroEliminar)
            console.log(indice)
            array.splice(indice, 1)
            console.log(array)
            //Seteat el StoragE
            localStorage.setItem("cotizador", JSON.stringify(array))
            calcularTotal(array)
        })
 //Sumatoria de unidades por seguro
 document.getElementById(`botonSumarUnidad${segurosEnCotizador.id}`).addEventListener("click", () => {
    segurosEnCotizador.sumarCantidad()
    localStorage.setItem("cotizador", JSON.stringify(array))
    cargarSeguroCotizador(array)
})
//Restar unidades de seguro
document.getElementById(`botonEliminarUnidad${segurosEnCotizador.id}`).addEventListener("click", () => {
    let eliminar = segurosEnCotizador.restarCantidad()
    if (eliminar < 1) {
        let cardSeguro = document.getElementById(`seguroCotizador${segurosEnCotizador.id}`)
        cardSeguro.remove()
        let seguroEliminar = array.find((seguro) => seguro.id == segurosEnCotizador.id)
        console.log(seguroEliminar)
        let indice = array.indexOf(seguroEliminar)
        console.log(indice)
        array.splice(indice, 1)
        localStorage.setItem("cotizador", JSON.stringify(array))
        calcularTotal(array)
    }else{
        localStorage.setItem("cotizador", JSON.stringify(array))
    }
    cargarSeguroCotizador(array)
})
})

calcularTotal()
}
//finalizo la compra
function finalizarCompra() {
    Swal.fire({
        title: '¿Está seguro de que quiere realizar la compra?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Sí, estoy seguro',
        cancelButtonText: 'No, no quiero',
        confirmButtonColor: 'blue',
        cancelButtonColor: 'red',
    }).then((result) => {
        if (result.isConfirmed) {
            let finSimulador = calcularTotal(segurosEnCotizador)
            console.log(finSimulador)
            if(finSimulador == 0){
                Swal.fire({
                    title: 'Compra rechazada',
                    icon: 'error',
                    confirmButtonColor: 'blue',
                    text: `Usted no tiene seguros en el cotizador, agregue del listado cargado`,
                })
                
            }else{
            Swal.fire({
                title: 'Compra realizada',
                icon: 'success',
                confirmButtonColor: 'blue',
                text: `Le agradecemos por la compra, usted ya se encuentra asegurado, el total a pagar es: $${finSimulador}`,
            })}
            
            segurosEnCotizador = []
            localStorage.removeItem("cotizador")
            modalCotizadorSeguros.innerHTML = ""
        } else {
            Swal.fire({
                title: 'Compra no realizada',
                icon: 'error',
                text: `La compra no se ha realizado, continuan los seguros en su cotizador`,
                confirmButtonColor: 'blue',
                timer: 3500
            })
        }
    }

    )
}

// PROGRAMA
let segurosCotizador;
if (localStorage.getItem("cotizador")) {
    segurosCotizador = JSON.parse(localStorage.getItem("cotizador"));
} else {
    segurosCotizador = [];
    localStorage.setItem("cotizador", segurosCotizador);
}

btnMostrarListado.onclick = () => {
    desplegarListado(listado);
};

ocultarListadoBtn.onclick = function () {
    segsDiv.innerHTML = "";
};

buscador.addEventListener("input", () => {
    buscarSeg(buscador.value.toLocaleLowerCase(), listado);
});

selecOrden.addEventListener("change", () => {
    if (selecOrden.value == 1) {
        let list = buscarSeg(buscador.value.toLocaleLowerCase(), listado)
        filtrarPorEmpresa(list);
    } else if (selecOrden.value == 2) {
        let list = buscarSeg(buscador.value.toLocaleLowerCase(), listado)
        filtrarPorNombre(list);
    } else if (selecOrden.value == 3) {
        let list = buscarSeg(buscador.value.toLocaleLowerCase(), listado)
        filtrarPorTipo(list);
    } else if (selecOrden.value == 4) {
        let list = buscarSeg(buscador.value.toLocaleLowerCase(), listado)
        ordenMenoraMayor(list);
    } else {
        let list = buscarSeg(buscador.value.toLocaleLowerCase(), listado)
        desplegarListado(list);
    }
});

agregarSeguro.addEventListener("click", () => { cargarSeguroCotizador(segurosEnCotizador) })

compraFin.addEventListener("click", () => {
    finalizarCompra()
})





// function mostrarCotizador() {
//     let cotizador = document.getElementById("modal-bodyCotizador");
//     cotizador.innerHTML = "<ul>";
//     segurosCotizador.forEach((seg) => {
//         cotizador.innerHTML += `
//         <div id="${seg.id}" class="card" style="width: 18rem;">
//         <img class="card-img-top img-fluid" style="height: 200px;"src="assets/iconos/${seg.imagen}" alt="">
//         <div class="card-body">.

//             <h4 class="card-e">${seg.empresa}</h4>
//             <p class = "card-e">Nombre: ${seg.nombre}</p>
//             <p class="card-e">Precio: $${seg.precio}</p>
//             <p class="card-e">Tipo: ${seg.tipo}</p>
//         <button id="agregarSegCotizador${seg.id}" class="btn btn-outline-primary">Agregar al cotizador</button>
//         </div>
//     </div> `;
//     })
//     cotizador.innerHTML += "<ul>";
// }





// function agregarSegCotizador(seg) {
//     console.log(
//         `Usted sumo a su cotizador de seguros un ${seg.empresa} de nombre  ${seg.nombre} que tiene un valor de : $${seg.precio}`
//     );
//     segurosCotizador.push(seg);
//     console.log(segurosCotizador);
//     localStorage.setItem("cotizador", JSON.stringify(segurosCotizador));
// }



