class Seguro {
    constructor(id, empresa, nombre, precio, tipo, imagen) {
        this.id = id,
            this.empresa = empresa,
            this.nombre = nombre,
            this.precio = precio,
            this.tipo = tipo
            this.imagen = imagen
    }
    
    verElListado() {
        console.log(`El seguro ${this.nombre} de la empresa  ${this.empresa} esta valuado en : $${this.precio}`)
    }
}
const seguro1 = new Seguro(1, "Rio Uruguay Seguros", "basico", 8000, "economico","np.png")
const seguro2 = new Seguro(2, "Rio Uruguay Seguros", "todo riesgo", 10000, "premium","np.png")
const seguro3 = new Seguro(3, "Rio Uruguay Seguros", "completo", 12000, "premium","np.png")
const seguro4 = new Seguro(4, "Sancor Seguros", "basico", 9000, "economico","np.png")
const seguro5 = new Seguro(5, "Sancor Seguros", "todo riesgo", 12000, "premium","np.png")
const seguro6 = new Seguro(6, "Sancor Seguros", "completo", 15000, "premium","np.png")
const seguro7 = new Seguro(7, "La nueva seguros", "basico", 7000, "economico","np.png")
const seguro8 = new Seguro(8, "La nueva seguros", "todo riesgo", 9000, "premium","np.png")
const seguro9 = new Seguro(9, "La nueva seguros", "completo", 10000, "premium","np.png")




let listado = []

if(localStorage.getItem("listado")){
    
    listado = JSON.parse(localStorage.getItem("listado"))
    
}else{
    console.log("Entra por primera vez, set array")
    listado.push(seguro1, seguro2, seguro3, seguro4, seguro5, seguro6, seguro7, seguro8, seguro9)
    localStorage.setItem("listado", JSON.stringify(listado))
}