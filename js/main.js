
document.addEventListener("click", (clic)=>{
    //console.log(clic)
    if(clic.target.matches("#informes")) url("login old.html")
    if(clic.target.matches("#exit")) url("index.html")
})

document.addEventListener("submit", (e)=>{
    e.preventDefault()
    //console.log(e.target)
    if(e.target.matches("#f_login")) validarLogin()
})

function url(destino){
    location.href=destino
}

function validarLogin(){
    let ExReg_mail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
    let ExRegContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,18}$/
    
    let $div_msg = document.querySelector("#msg_log"), msg=""
    $div_msg.innerHTML="Procesando...."

    let usuario = user.value, pass = clave.value
    console.log("user: "+usuario, "Password: "+ pass)

    //if(!ExReg_mail.test(usuario)) {$div_msg.innerHTML = "<b>Correo invalido</b>"; return false;}
    //if(!ExRegContraseña.test(pass)) {$div_msg.innerHTML = "<b>Contaseña invalida</b>"; return false;}
    if(!ExReg_mail.test(usuario)) {
        msg="Correo invalido"
        if(!ExRegContraseña.test(pass)) {
            msg = "Correo y Contraseña invalidos" 
        } 
    } else if(!ExRegContraseña.test(pass)) {
        msg = "Contraseña invalida" 
    }
    
    if(!msg=="") {$div_msg.innerHTML = "<b>"+msg+"</b>"; return false;}
    $div_msg.innerHTML = "Datos ingresados correctamente";
}