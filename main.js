let segsDiv = document.getElementById("conteiner")
let coincidir = document.getElementById("coinBusqueda")
let selecOrden = document.getElementById("selectOrden")
let btnMostrarListado = document.getElementById("botonMostrar")
let ocultarListadoBtn = document.getElementById("botonOcultar")
let buscador = document.getElementById("buscador")

function desplegarListado(array){
    segsDiv.innerHTML= ""
    for(let seg of array){
        let nuevoSeguroDiv = document.createElement("div")
        nuevoSeguroDiv.classList.add("col-12","col-md-6", "col-lg-5", "mb-2")
        nuevoSeguroDiv.innerHTML = `
        <div id="${seg.id}" class="card" style="width: 18rem;">
        <img class="card-img-top img-fluid" style="height: 200px;"src="assets/${seg.imagen}" alt="">
        <div class="card-body">
            <h4 class="card-e">${seg.empresa}</h4>
            <p class = "card-e">Nombre: ${seg.nombre}</p>
            <p class="card-e">Precio: $${seg.precio}</p>
            <p class="card-e">Tipo: ${seg.tipo}</p>
        <button id="agregarSegCotizador${seg.id}" class="btn btn-outline-primary">Agregar al cotizador</button>
        </div>
    </div> `
        segsDiv.appendChild(nuevoSeguroDiv)
        let agregarC = document.getElementById(`agregarSegCotizador${seg.id}`)
    
    agregarC.addEventListener("click", ()=>{
    agregarSegCotizador(seg)
        
    
    })
    
    }
    }


function buscarSeg(buscado, array){
    let busquedaListado = array.filter(
        (seguro)=> seguro.empresa.toLowerCase().includes(buscado) || seguro.nombre.toLowerCase().includes(buscado) || seguro.precio.toLowerCase().includes(buscado) || seguro.tipo.toLowerCase().includes(buscado)
    )
    if(busquedaListado.length == 0){
        coincidir.innerHTML = `<h4> No hay coincidencias con la busqueda</h4>`
        desplegarListado(busquedaListado)
    }else{
        coincidir.innerHTML =""
        desplegarListado(busquedaListado)
    }

}


function filtrarPorEmpresa(array){
    let utiBuscada = "Empresa"
    let busqueda = array.filter(
        (seg)=> seg.empresa.toLowerCase() == utiBuscada.toLocaleLowerCase()
        )
    desplegarListado(busqueda)
}
function filtrarPorNombre(array){
    let utiBuscada = "Nombre"
    let busqueda = array.filter(
        (seg)=> seg.nombre.toLowerCase() == utiBuscada.toLocaleLowerCase()
        )
    desplegarListado(busqueda)
}
function filtrarPorTipo(array){
    let utiBuscada = "Tipo"
    let busqueda = array.filter(
        (seg)=> seg.tipo.toLowerCase() == utiBuscada.toLocaleLowerCase()
        )
    desplegarListado(busqueda)
}
function ordenMenoraMayor(array){
    
    const menoraMayor = [].concat(array)
   
    menoraMayor.sort((a,b) => a.precio - b.precio)
    desplegarListado(menoraMayor)
}



let segurosCotizador 
if(localStorage.getItem("cotizador")){
    segurosCotizador = JSON.parse(localStorage.getItem("cotizador"))
    }else{
        segurosCotizador = []
        localStorage.setItem("cotizador", segurosCotizador)

}

function agregarSegCotizador(seg){
   console.log(`Usted sumo a su cotizador de seguros un ${seg.empresa} de nombre  ${seg.nombre} que tiene un valor de : $${seg.precio}`)
    segurosCotizador.push(seg)
    console.log(segurosCotizador)
    localStorage.setItem("cotizador", JSON.stringify(segurosCotizador))
}




btnMostrarListado.onclick = ()=>{desplegarListado(listado)}

ocultarListadoBtn.ondblclick = function(){
    segsDiv.innerHTML =""
}

buscador.addEventListener("input", ()=>{
    buscarSeg(buscador.value, listado)
})

selecOrden.addEventListener("change", ()=> {
    if(selecOrden.value == 1){
        filtrarPorEmpresa(listado)
    }else if(selecOrden.value == 2){
        filtrarPorNombre(listado)
    } else if (selecOrden.value == 3){
        filtrarPorTipo(listado)
    }else if (selecOrden.value == 4){
        ordenMenoraMayor(listado)
    }else{
        desplegarListado(listado)
    }
})







