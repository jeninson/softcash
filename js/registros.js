import { enviarAjax, url } from "./tool.js";
import { cargarCategorias } from "./categoria.js";

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
                                            <button title="Actualizar\n${reg.categoria} de ${reg.valor}" data-id="${reg.id}" data-tipo="${reg.tipo_registro}" data-bs-toggle="modal" data-bs-target="#ModalActualizarReg" type="button" class="btn btn-primary btn_update_reg"><i class="bi bi-pencil btn_update_reg" data-id="${reg.id}" data-tipo="${reg.tipo_registro}"></i></button>
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
    const modalBootstrap = bootstrap.Modal.getInstance(document.getElementById('ModalEliminarReg'));
    let modal = bootstrap.Modal.getOrCreateInstance(document.getElementById('ModalEliminarReg')) // Returns a Bootstrap modal instance
    // Show or hide:
    modal.show();
    modal.hide();

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
                consultarRegistros();
                url("principal.html");
            } else {
                alert('Error al eliminar el registro: ' + data.msg);
            }
        }
    };
    //console.log(info);
    modalBootstrap.hide(); // Cerrar el modal antes de enviar la solicitud
    //enviarAjax(info);
}


export function modalActualizarRegistro(el){
    let $inf=document.querySelector("#ModalActualizarReg div .modal-body")
    let $tag=document.querySelector("#ModalActualizarReg div .modal-header")
    LbActualizar.innerHTML = `Atención ... Actualizar Registro (${el.target.dataset.tipo})`;
    $tag.classList.remove("bg-success", "bg-danger", "bg-secondary", "bg-primary", "bg-warning");
    if(el.target.dataset.tipo === "INGRESO") $tag.classList.add("bg-success");
    else if(el.target.dataset.tipo === "EGRESO") $tag.classList.add("bg-warning");

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
                    datos = `<form action="" class="form-control" method=""  id="form_actualizar_reg">
                            <input type="hidden" id="tx_id_reg_act" name="tx_id_reg_act" value="${el.target.dataset.id}">
                            <input type="hidden" id="tx_tipo_reg_act" name="tx_tipo_reg_act" value="${reg.tipo_reg}">
                            <div class="mb-3">
                                <div class="form-floating mb-3">
                                    <input type="date" class="form-control" id="tx_fec_act" placeholder="Fecha del Ingreso" value="${reg.fecha}" required>
                                    <label for="tx_fec_act">Fecha del Ingreso</label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <div class="form-floating mb-3">
                                    <input type="number" class="form-control" id="tx_val_act" placeholder="0" value="${reg.valor}" required>
                                    <label for="tx_val_act">Valor del Ingreso</label>
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="sl_cat_act" class="form-label">Categoria</label>
                                <select class="form-select" id="sl_cat_act" required>
                                    <option selected>Open this select menu</option>
                                    <option value="1">One</option>
                                    <option value="2">Two</option>
                                    <option value="3">Three</option>
                                </select>
                            </div>
                            <div class="mb-3">
                                <div class="form-floating mb-3">
                                    <input type="text" class="form-control" id="tx_des_act" placeholder="Descripción del Ingreso" value="${reg.descripcion}" required>
                                    <label for="tx_des_act">Descripción del Ingreso</label>
                                </div>
                            </div>
                            <div class="mb-3 text-center">
                            <button type="submit" class="btn btn-primary">Actualizar Registro</button>
                            <div>
                        </form>`;
                    let btnEliminar = document.querySelector("#btnEliminarReg");
                    btnEliminar.dataset.id = reg.id; // Asignar el ID del registro al botón de eliminar
                    cargarCategorias("sl_cat_act","",el.target.dataset.tipo, reg.id_categoria);  

                } else datos = `<p class="text-danger">Error al consultar el registro <b>(id=${el.target.dataset.id})</b></p>`;
                $inf.innerHTML = datos
            }}
    enviarAjax(info)
}

export function actualizarRegistro() {
    // Validar campos requeridos
    if (document.querySelector('#tx_id_reg_act').value === '' ||
        document.querySelector('#tx_tipo_reg_act').value === '' ||
        document.querySelector('#tx_fec_act').value === '' ||
        document.querySelector('#tx_val_act').value === '' ||
        document.querySelector('#sl_cat_act').value === '' ||
        document.querySelector('#tx_des_act').value === '') {
        alert('Por favor, complete todos los campos requeridos.');
        return;
    }

    let info = {
        url: '../api/registros/registros.php',
        method: 'PUT',
        param: {
            idTk: localStorage.getItem('idTk'),
            idUser: localStorage.getItem('idUser'),
            id_reg_act: document.querySelector('#tx_id_reg_act').value,
            tipo_registro: document.querySelector('#tx_tipo_reg_act').value,
            fecha: document.querySelector('#tx_fec_act').value,
            valor: document.querySelector('#tx_val_act').value,
            categoria: document.querySelector('#sl_cat_act').value,
            descripcion: document.querySelector('#tx_des_act').value
        },
        fResp: (data) => {
            if (data.code == 200) {
                //alert(data.msg);
                consultarRegistros(10)
                url("principal.html"); // Redirigir a la sección de registros
            } else {
                alert('Error al guardar el ingreso: ' + data.msg);
            }
        }
    };
    //console.log(info);
    enviarAjax(info);
}