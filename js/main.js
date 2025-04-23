//Importar el archivo de funciones
import { validarLogin } from "./login.js"
import { activar_menu, menu } from "./principal.js"

document.addEventListener("click", (clic)=>{
    //console.log(clic)
    if(clic.target.matches("#informes")) url("login old.html")
    if(clic.target.matches("#exit")) url("index.html")
    if(clic.target.matches(".mobile-menu")) activar_menu()
    if(clic.target.matches("#sidebar a")) {clic.preventDefault(); menu();}
})

document.addEventListener("submit", (e)=>{
    e.preventDefault()
    //console.log(e.target)
    if(e.target.matches("#loginForm")) validarLogin()
})