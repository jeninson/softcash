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
                let items="<tr><td colspan='6' class='text-center'><i>Cargando datos...</i></td></tr>"
                let $item_registros = document.querySelector("#item_registros")              
                if(data.code==200){
                    items = "";
                    //console.log(data.data)
                    data.data.forEach((reg) => {
                        let cl="", valor = parseFloat(reg.valor).toLocaleString('es-ES', { style: 'currency', currency: 'PES' });
                        reg.valor = valor;
                        if(reg.tipo_registro == "INGRESO") {cl="table-success"} else if (reg.tipo_registro == "EGRESO") {cl="table-danger"} else {cl="table-secondary"}
                        items += `<tr>
                                    <td>${reg.fecha}</td>
                                    <td>${reg.tipo_registro}</td>
                                    <td>${reg.categoria}</td>
                                    <td class="${cl}">${reg.valor}</td>
                                    <td>${reg.descripcion}</td>
                                    <td>
                                        <div class="btn-group" role="group" aria-label="Basic example">
                                            <button title="Actualizar\n${reg.categoria} de ${reg.valor}" type="button" class="btn btn-primary"><i class="bi bi-pencil"></i></button>
                                            <button title="Eliminar\n${reg.categoria} de ${reg.valor}" type="button" class="btn btn-danger"><i class="bi bi-x-lg"></i></button>
                                        </div>
                                    </td>
                                </tr>`;
                    });
                    //console.log()
                }else {
                    items="<tr><td colspan='6' class='text-center text-danger'><b>Error al consultar los datos</b></td></tr>"
                }
                $item_registros.innerHTML = items;
            }
        }
    enviarAjax(info);
}