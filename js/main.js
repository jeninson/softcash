//Importar el archivo de funciones
import { validarLogin, validarToken} from "./login.js"
import { activar_menu, menu, validarUsuario } from "./principal.js"
import { guardarIngreso } from "./ingresos.js"
import { guardarGasto } from "./gastos.js"
import { modalEliminarRegistro, eliminarRegistro, modalActualizarRegistro, actualizarRegistro } from "./registros.js"

document.addEventListener("click", (clic)=>{
    //console.log(clic)
    if(clic.target.matches("#informes")) url("login old.html")
    if(clic.target.matches("#exit")) url("index.html")
    if(clic.target.matches(".mobile-menu")) activar_menu()
    if(clic.target.matches("#sidebar a")) {clic.preventDefault(); menu();}
    if(clic.target.matches(".btn_delete_reg")) modalEliminarRegistro(clic)
    if(clic.target.matches("#btnEliminarReg")) eliminarRegistro(clic.target.dataset.id)
    if(clic.target.matches(".btn_update_reg")) modalActualizarRegistro(clic)

})

document.addEventListener("submit", (e)=>{
    e.preventDefault()
    //console.log(e.target)
    if(e.target.matches("#loginForm")) validarLogin()
    if(e.target.matches("#form_ingreso")) guardarIngreso()
    if(e.target.matches("#form_gasto")) guardarGasto()
    if(e.target.matches("#form_actualizar_reg")) actualizarRegistro()
})

document.addEventListener("DOMContentLoaded", (e)=>{
    //console.log(location.pathname)
    if(location.pathname.includes("principal")) validarUsuario()
    if(location.pathname.includes("index") || location.pathname === "/softcash/html/") validarToken() 
})