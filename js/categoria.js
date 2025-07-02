import { enviarAjax } from "./tool.js";

export function cargarCategorias(el="", id = null, tipo = null, sele="") {
    let info = {
        url: "../api/categoria/categoria.php",
        method: "GET",
        param: {
            idTk: localStorage.getItem("idTk"),
            id,
            tipo
        },
        fResp: (data) => {
            let $select = document.querySelector(`#${el}`), opt;
            $select.innerHTML = "<option value=''>Seleccione una categoría</option>";
            if (data.code == 200) {
                data.data.forEach((cat) => {
                    let selected = (id || sele == cat.id) ? "selected" : "";
                    opt += `<option value="${cat.id}" ${selected}>${cat.nombre}</option>`;
                });
                $select.innerHTML += opt;
            } else {
                $select.innerHTML += "<option value=''>Error al cargar categorías</option>";
            }
        }
    };
    enviarAjax(info);
}