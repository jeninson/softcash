
export function validarLogin(){
    let ExReg_mail = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/
    let ExRegContraseña = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,18}$/
    
    let $div_msg = document.querySelector("#div_msg"), msg=""
    $div_msg.innerHTML="Procesando...."

    let usuario = username.value, pass = password.value
    //console.log("user: "+usuario, "Password: "+ pass)
    
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
    enviarAjax(usuario, pass); 
}

function enviarAjax(user , pass){
    
    //console.log(user,pass)
    let $div_msg = document.querySelector("#div_msg")
    //Peticion Fecth
    let header = {
        headers: {
            "Content-Type":"application/json"
        },
        method: "POST",
        body: JSON.stringify({
            "usuario": user,
            "clave": pass
        }) 
    }
    fetch("../api/login/login.php",header)
    .then(resp=> resp.json())
    .then((data)=>{
        console.log(data)
        if(data.code==200){
            $div_msg.innerHTML = data.Usuario
        }else{
            $div_msg.innerHTML = data.msg
        }
    })
    .catch((error)=>{})

}