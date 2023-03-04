let btnOscuro = document.getElementById("botonOscuro")

if(localStorage.getItem("modoOscuro")){
    
}else{
    localStorage.setItem("modoOscuro", false)
    
}

btnOscuro.addEventListener("click", ()=>{

    document.body.classList.toggle("darkMode")

    if(JSON.parse(localStorage.getItem("modoOscuro")) == false){
        btnOscuro.innerText = `Modo Claro`
        localStorage.setItem("modoOscuro", true)
        console.log(localStorage.getItem("modoOscuro"))
    }else if
    (JSON.parse(localStorage.getItem("modoOscuro")) == true){
        btnOscuro.innerText = `Modo Oscuro`
        localStorage.setItem("modoOscuro", false)
        console.log(localStorage.getItem("modoOscuro"))

    }

})

