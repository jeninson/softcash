//Importar el archivo de funciones
import { validarLogin, validarToken} from "./login.js"
import { activar_menu, menu, validarUsuario } from "./principal.js"

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

document.addEventListener("DOMContentLoaded", (e)=>{
    //console.log(location.pathname)
    if(location.pathname.includes("principal")) validarUsuario()
    if(location.pathname.includes("index") || location.pathname === "/softcash/html/") validarToken() 
})