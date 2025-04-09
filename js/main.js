//Importar el archivo de funciones
import { validarLogin } from "./login.js"

document.addEventListener("click", (clic)=>{
    //console.log(clic)
    if(clic.target.matches("#informes")) url("login old.html")
    if(clic.target.matches("#exit")) url("index.html")
})

document.addEventListener("submit", (e)=>{
    e.preventDefault()
    //console.log(e.target)
    if(e.target.matches("#loginForm")) validarLogin()
})