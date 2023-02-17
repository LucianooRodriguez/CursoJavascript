let acumulador = 0
let poliza

class Seguro {
    constructor(id, empresa, nombre, precio, tipo) {
        this.id = id,
            this.empresa = empresa,
            this.nombre = nombre,
            this.precio = precio,
            this.tipo = tipo
            
    }
    
    verElListado() {
        console.log(`El seguro ${this.nombre} de la empresa  ${this.empresa} esta valuado en : $${this.precio}`)
    }
}
const seguro1 = new Seguro(1, "Rio Uruguay Seguros", "basico", 8000, "economico")
const seguro2 = new Seguro(2, "Rio Uruguay Seguros", "todo riesgo", 10000, "premium")
const seguro3 = new Seguro(3, "Rio Uruguay Seguros", "completo", 12000, "premium")
const seguro4 = new Seguro(4, "Sancor Seguros", "basico", 9000, "economico")
const seguro5 = new Seguro(5, "Sancor Seguros", "todo riesgo", 12000, "premium")
const seguro6 = new Seguro(6, "Sancor Seguros", "completo", 15000, "premium")
const seguro7 = new Seguro(7, "La nueva seguros", "basico", 7000, "economico")
const seguro8 = new Seguro(8, "La nueva seguros", "todo riesgo", 9000, "premium")
const seguro9 = new Seguro(9, "La nueva seguros", "completo", 10000, "premium")



const listado = []
listado.push(seguro1, seguro2, seguro3, seguro4, seguro5, seguro6, seguro7, seguro8, seguro9)
console.log(listado)


function agregarPoliza() {
    while(poliza !== "s"){
        let poliza = prompt(`Ingrese el NUMERO de la poliza a adquirir o s para salir \n1) ${seguro1.empresa} ${seguro1.nombre} $ ${seguro1.precio}\n2) ${seguro2.empresa} ${seguro2.nombre} ${seguro2.precio}\n3) ${seguro3.empresa} ${seguro3.nombre} $ ${seguro3.precio}\n4) ${seguro4.empresa} ${seguro4.nombre} $ ${seguro4.precio}\n5) ${seguro5.empresa} ${seguro5.nombre} $ ${seguro5.precio}\n6) ${seguro6.empresa} ${seguro6.nombre} $${seguro6.precio} \n7) ${seguro7.empresa} ${seguro7.nombre} $${seguro7.precio}\n8) ${seguro8.empresa} ${seguro8.nombre} $${seguro8.precio}\n9) ${seguro9.empresa} ${seguro9.nombre} $${seguro9.precio}`)

       
        if (poliza == 1) {
            acumulador = acumulador + seguro1.precio
            alert(`Se agrego una cobertura ${seguro1.nombre} \n Lleva un total de $${acumulador} acumulados en el cotizador`)

        }
        else if (poliza == 2) {
            acumulador = acumulador + seguro2.precio
            alert(`Se agrego una cobertura ${seguro2.nombre} \n Lleva un total de $${acumulador} acumulados en el cotizador`)
        }
        else if (poliza == 3) {
            acumulador = acumulador + seguro3.precio
            alert(`Se agrego una cobertura ${seguro3.nombre} \n Lleva un total de $${acumulador} acumulados en el cotizador`)

        }
        else if (poliza == 4) {
            acumulador = acumulador + seguro4.precio
            alert(`Se agrego una cobertura ${seguro4.nombre} \n Lleva un total de $${acumulador} acumulados en el cotizador`)

        }
        else if (poliza == 5) {
            acumulador = acumulador + seguro5.precio
            alert(`Se agrego una cobertura ${seguro5.nombre} \n Lleva un total de $${acumulador} acumulados en el cotizador`)

        }
        else if (poliza == 6) {
            acumulador = acumulador + seguro6.precio
            alert(`Se agrego una cobertura ${seguro6.nombre} \n Lleva un total de $${acumulador} acumulados en el cotizador`)

        }
        else if (poliza == 7) {
            acumulador = acumulador + seguro7.precio
            alert(`Se agrego una cobertura ${seguro7.nombre} \n Lleva un total de $${acumulador} acumulados en el cotizador`)

        }
        else if (poliza == 8) {
            acumulador = acumulador + seguro8.precio
            alert(`Se agrego una cobertura ${seguro8.nombre} \n Lleva un total de $${acumulador} acumulados en el cotizador`)

        }
        else if (poliza == 9) {
            acumulador = acumulador + seguro9.precio
            alert(`Se agrego una cobertura ${seguro9.nombre} \n Lleva un total de $${acumulador} acumulados en el cotizador`)

        }
        
        else if ( poliza === "s") {
            if (acumulador > 0) {
                alert("Cotización finalizada. Seleccione su método de pago")
                finalizarCompra()
            }
            else {
                alert("¡¡Muchas gracias!!") 
            }
            break ;
        }
        else if ( poliza == null) {
            alert("Error");
            console.log(".........")
            break ;
        }
        else {
            alert("Entrada erronea.")
        }
    }
}


function finalizarCompra(){
    let medioPago = prompt("Elija el medio de pago para realizar su compra \n1) Efectivo \n2) Tarjeta de Debito")

    while (medioPago !== "1" && medioPago !== "2"){
        if(medioPago === null){
            alert("Error")
            break;
        }
        medioPago = prompt("Elija el medio de pago para realizar su compra \n1) Efectivo \n 2) Debito")
    }
    if(medioPago === "1"){
        let pagoEfectivo = acumulador * 0.95
        alert("Descuento de 5% por efectivo, su total a pagar es: $" + pagoEfectivo.toFixed(2))
    }
    else if (medioPago === "2"){
        alert("El total a pagar es de: $"+ acumulador +" gracias.")
    }

}

function verListado(array){
    console.log(`Seguros: `)
    array.forEach(
        (seg)=>{
            console.log(seg.id, seg.empresa, seg.nombre, seg.precio,seg.tipo)
        }
    )
}

function verPorEmpresa(array){
    let empresaBuscar = prompt("Ingrese la empresa preferida")
    let busca = array.filter(
        (seg)=> seg.empresa.toLowerCase() == empresaBuscar.toLowerCase()
        )
    if(busca.length == 0 ){
        console.log(`No disponemos de un seguro para la empresa: ${empresaBuscar} `)
    }else{
        console.log(busca)
    }
    
}

function verPorTipo(array){
    let tipoBuscar = prompt("Ingrese el tipo de seguro preferido")
    let buscando = array.filter(
        (seg)=> seg.tipo.toLowerCase() == tipoBuscar.toLowerCase()
        )
    if(buscando.length == 0 ){
        console.log(`No disponemos de un seguro para el tipo ${tipoBuscar}`)
    }else{
        console.log(buscando)
    }
}

function menuPrincipal(salir) {
    let opcion = parseInt(prompt(`Presione el numero deseado:
                1 - Adquirir Poliza
                2 - Ver Listado
                3 - Ver por Empresa Aseguradora
                4 - Ver por tipo de seguro
                0 - Salir`))

    switch (opcion) {
        case 1:
            agregarPoliza()
            break
        case 2:
            verListado(listado)            
            break
        case 3:
            verPorEmpresa(listado)
            break
        case 4:
            verPorTipo(listado)
            break
        case 0:
            alert("Gracias por asegurarte con nosotros")
            salir = true
            return salir
            break
        default:
            console.log("Ingresar opcion valida")
            break
    }
}

let polizaMenu = prompt("¿Desea ver las polizas de Seguros?Si/no")
if (polizaMenu == "no"){
    alert("¡¡Muchas gracias!!")
}
while(polizaMenu !== "no"){
    if (polizaMenu.toLowerCase() == "si"){
        menuPrincipal()
        break;
    }
    else if (polizaMenu == "no"){
        alert("¡¡Muchas gracias!!")
    }
    else if (polizaMenu == null){
        alert("¡¡Muchas gracias!!")
    }
    else {
        polizaMenu = prompt(`ALERTA, DEBE INGRESAR si/no`);
        if (polizaMenu === "no") {
            alert("¡¡Muchas gracias!!") 
        }
        else if (polizaMenu === "si"){
            agregarPoliza()
            break;
        }

    }
}