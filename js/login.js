import { enviarAjax, url } from './tool.js';
import { } from './md5.js';

export function validarLogin(){
    let ExReg_mail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
    let ExRegContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,18}$/
    
    let $div_msg = document.querySelector("#div_msg"), msg=""
    $div_msg.innerHTML="Procesando...."

    let usuario = username.value, pass = password.value
    //Mostrar el password encriptado
    //password.value = md5(pass)
    
    if(!ExReg_mail.test(usuario)) {
        msg="Correo invalido"
        if(pass.trim() === '') {
            msg = "Correo y Contraseña invalidos" 
        } 
    } else if(pass.trim() === '') {
        msg = "Contraseña requerida" 
    }// else if(!ExRegContraseña.test(pass)) {msg = "Contraseña invalida"}
    
    if(!msg=="") {        
        $div_msg.innerHTML = "<b class='text-red'>"+msg+"</b>";    
        setTimeout(() => {
            $div_msg.innerHTML = ""; 
        }, 3000);         
        return false;  
    }
    let info = {
        url: "../api/login/login.php",
        method: "POST",
        param: {
            usuario,
            clave: md5(pass)
        },
        fResp: (data)=> {                
            if(data.code==200){
                localStorage.clear()
                localStorage.setItem("idTk", data.idTk)
                localStorage.setItem("user", data.Usuario)
                localStorage.setItem("idUser", data.idUser)
                //console.log(data)
                url("principal.html")
            } else $div_msg.innerHTML = data.msg
        }
    }
    enviarAjax(info); 
}

export function validarToken(){
    let idTk = localStorage.getItem("idTk")
    let idUser = localStorage.getItem("idUser")
    let user = localStorage.getItem("user")

    if(idTk==null || idUser==null || user==null){
        localStorage.clear()
    } else {
        url("principal.html")
    }
}