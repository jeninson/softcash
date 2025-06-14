
import { enviarAjax, url } from './tool.js';
import { consultarRegistros } from "./registros.js";

export function guardarIngreso() {
    // Validar campos requeridos
    if (document.querySelector('#tx_fec_ing').value === '' ||
        document.querySelector('#tx_val_ing').value === '' ||
        document.querySelector('#sl_cat_ing').value === '' ||
        document.querySelector('#tx_des_ing').value === '') {
        alert('Por favor, complete todos los campos requeridos.');
        return;
    }

    let info = {
        url: '../api/registros/registros.php',
        method: 'POST',
        param: {
            idTk: localStorage.getItem('idTk'),
            idUser: document.querySelector('#iduser').value,
            tipo_registro: "1", // 1 para ingreso
            fecha: document.querySelector('#tx_fec_ing').value,
            valor: document.querySelector('#tx_val_ing').value,
            categoria: document.querySelector('#sl_cat_ing').value,
            descripcion: document.querySelector('#tx_des_ing').value
        },
        fResp: (data) => {
            if (data.code == 200) {
                alert(data.msg);
                document.querySelector('#form_ingreso').reset();
                consultarRegistros(10)
                url("principal.html"); // Redirigir a la sección de registros
            } else {
                alert('Error al guardar el ingreso: ' + data.msg);
            }
        }
    };
    enviarAjax(info);
}