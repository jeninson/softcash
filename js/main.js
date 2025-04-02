
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

function url(destino){
    location.href=destino
}

function validarLogin(){
    let ExReg_mail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
    let ExRegContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,18}$/
    
    let $div_msg = document.querySelector("#div_msg"), msg=""
    $div_msg.innerHTML="Procesando...."

    let usuario = username.value, pass = password.value
    console.log("user: "+usuario, "Password: "+ pass)
    
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
    $div_msg.innerHTML = "Datos ingresados correctamente";
    
}