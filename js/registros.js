import { enviarAjax } from "./tool.js";

export function consultarRegistros(limite=10){
    let info = {
            url: "../api/registros/registros.php",
            method: "GET",
            param: {
                limite,
                idTk: localStorage.getItem("idTk"),
            },
            fResp: (data)=> { 
                let items="<tr><td colspan='5' class='text-center'><i>Cargando datos...</i></td></tr>"
                let $item_registros = document.querySelector("#item_registros")              
                if(data.code==200){
                    items = "";
                    console.log(data.data)
                    data.data.forEach((reg) => {
                        items += `<tr>
                                    <td>${reg.fecha}</td>
                                    <td>${reg.tipo_registro}</td>
                                    <td>${reg.categoria}</td>
                                    <td>${reg.valor}</td>
                                    <td>${reg.descripcion}</td>
                                </tr>`;
                    });
                    console.log()
                $item_registros.innerHTML = items;
                } else {}
                //$div_msg.innerHTML = data.msg
            }
        }
    enviarAjax(info);
}