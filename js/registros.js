import { enviarAjax, url } from "./tool.js";

export function consultarRegistros(id="",limite=""){
    let info = {
            url: "../api/registros/registros.php",
            method: "GET",
            param: {
                limite,
                id,
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
                                            <button title="Actualizar\n${reg.categoria} de ${reg.valor}" data-id="${reg.id}" data-bs-toggle="modal" data-bs-target="" type="button" class="btn btn-primary btn_update_reg"><i class="bi bi-pencil btn_update_reg" data-id="${reg.id}"></i></button>
                                            <button title="Eliminar\n${reg.categoria} de ${reg.valor}" data-id="${reg.id}" data-bs-toggle="modal" data-bs-target="#ModalEliminarReg" type="button" class="btn btn-danger btn_delete_reg"><i class="bi bi-x-lg btn_delete_reg" data-id="${reg.id}"></i></button>
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

export function modalEliminarRegistro(el){
    let $inf=document.querySelector("#ModalEliminarReg div .modal-body")
    let info = {
            url: "../api/registros/registros.php",
            method: "GET",
            param: {
                limite: 1,
                id: el.target.dataset.id,
                idTk: localStorage.getItem("idTk"),
            },
            fResp: (data)=> { 
                let datos = "";
                 if(data.code==200){
                    let reg = data.data[0];
                    datos = `<p>¿Está seguro de eliminar el registro <b>(ID=${reg.id})</b>?</p>
                             <p><b>Fecha:</b> ${reg.fecha}</p>
                             <p><b>Tipo:</b> ${reg.tipo_registro}</p>
                             <p><b>Categoría:</b> ${reg.categoria}</p>
                             <p><b>Valor:</b> ${parseFloat(reg.valor).toLocaleString('es-ES', { style: 'currency', currency: 'PES' })}</p>
                             <p><b>Descripción:</b> ${reg.descripcion}</p>`;
                    let btnEliminar = document.querySelector("#btnEliminarReg");
                    btnEliminar.dataset.id = reg.id; // Asignar el ID del registro al botón de eliminar
                } else datos = `<p class="text-danger">Error al consultar el registro <b>(id=${el.target.dataset.id})</b></p>`;
                $inf.innerHTML = datos
            }}
    enviarAjax(info)
}

export function eliminarRegistro(id){
    let info = {
        url: "../api/registros/registros.php",
        method: "DELETE",
        param: {
            id,
            idTk: localStorage.getItem("idTk"),
        },
        fResp: (data) => {
            if(data.code==200){
                alert(data.msg)
                url("principal.html")
            } else {
                alert('Error al eliminar el registro: ' + data.msg);
            }
        }
    };
    //console.log(info);
    enviarAjax(info);
}