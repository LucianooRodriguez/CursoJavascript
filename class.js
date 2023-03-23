class Seguro {
    constructor(id, empresa, nombre, precio, tipo, imagen) {
        this.id = id,
            this.empresa = empresa,
            this.nombre = nombre,
            this.precio = precio,
            this.tipo = tipo
            this.imagen = imagen
            this.cantidad = 1
    }
    sumarCantidad(){
        this.cantidad = this.cantidad + 1
        return this.cantidad
    }
    restarCantidad(){
        this.cantidad = this.cantidad - 1
        return this.cantidad
    }
}  
let listado = []
const cargarlistado = async () => {
    const respuesta = await fetch("seguros.json")
    const data = await respuesta.json()
    console.log(data)
    for (let seguro of data){
        let seguroNuevo = new Seguro(seguro.id, seguro.empresa, seguro.nombre, seguro.precio, seguro.tipo, seguro.imagen)
        listado.push(seguroNuevo)
    }
    localStorage.setItem("listado", JSON.stringify(listado))
}



if(localStorage.getItem("listado")){
    for (let seguro of JSON.parse(localStorage.getItem("listado"))){
        let seguroNuevo = new Seguro(seguro.id, seguro.empresa, seguro.nombre, seguro.precio, seguro.tipo, seguro.imagen)
        listado.push(seguroNuevo)
    }
    
}else{
    console.log("Entra por primera vez, seteamos el array")
    cargarlistado()
    
}

