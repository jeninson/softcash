import { enviarAjax } from "./tool.js";
import { consultarRegistros } from "./registros.js";

export function guardarGasto() {
    // Validar campos requeridos
    if (document.querySelector('#tx_fec_gas').value === '' ||
        document.querySelector('#tx_val_gas').value === '' ||
        document.querySelector('#sl_cat_gas').value === '' ||
        document.querySelector('#tx_des_gas').value === '') {
        alert('Por favor, complete todos los campos requeridos.');
        return;
    }

    let info = {
        url: '../api/registros/registros.php',
        method: 'POST',
        param: {
            idTk: localStorage.getItem('idTk'),
            idUser: document.querySelector('#iduser').value,
            tipo_registro: "2", // 2 para gasto
            fecha: document.querySelector('#tx_fec_gas').value,
            valor: document.querySelector('#tx_val_gas').value,
            categoria: document.querySelector('#sl_cat_gas').value,
            descripcion: document.querySelector('#tx_des_gas').value
        },
        fResp: (data) => {
            if (data.code == 200) {
                alert(data.msg);
                document.querySelector('#form_gasto').reset();
                consultarRegistros(10)
                url("principal.html"); // Redirigir a la sección de registros
            } else {
                alert('Error al guardar el ingreso: ' + data.msg);
            }
        }
    };
    enviarAjax(info);
}