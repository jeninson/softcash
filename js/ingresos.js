
import { enviarAjax, url } from './tool.js';

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
        url: '../api/ingresos/ingresos.php',
        method: 'POST',
        param: {
            idTk: localStorage.getItem('idTk'),
            idUser: localStorage.getItem('idUser'),
            tipo_registro: "1", // 1 para ingreso
            fecha: document.querySelector('#tx_fec_ing').value,
            valor: document.querySelector('#tx_val_ing').value,
            categoria: document.querySelector('#sl_cat_ing').value,
            descripcion: document.querySelector('#tx_des_ing').value
        },
        fResp: (data) => {
            if (data.code == 200) {
                alert('Ingreso guardado correctamente');
                document.querySelector('#form_ingreso').reset();
                url("principal.html"); // Redirigir a la sección de registros
                // Aquí podrías llamar a una función para actualizar la lista de ingresos
            } else {
                alert('Error al guardar el ingreso: ' + data.message);
            }
        }
    };
    enviarAjax(info);
}