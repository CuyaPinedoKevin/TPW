
let vehiculos = [];

document.addEventListener("DOMContentLoaded", function() {
    vehiculos = obtenerVehiculos();
    mostrarVehiculosEnTabla();


    const searchInput = document.getElementById("searchInput");
    if (searchInput) {
        searchInput.addEventListener("keyup", function() {
            const texto = this.value.toLowerCase();
            const filtrados = vehiculos.filter(function(v) {
                return v.placa.toLowerCase().includes(texto) ||
                       v.marca.toLowerCase().includes(texto) ||
                       v.propietario.toLowerCase().includes(texto);
            });
            mostrarVehiculosEnTabla(filtrados);
        });
    }


    const btnReset = document.getElementById("btnResetData");
    if (btnReset) {
        btnReset.addEventListener("click", function() {
            if (confirm("¿Restaurar los datos de ejemplo iniciales?")) {
                localStorage.setItem("autofix_vehiculos", JSON.stringify(vehiculosIniciales));
                localStorage.removeItem("autofix_edit_index");
                localStorage.removeItem("autofix_edit_id");
                vehiculos = [...vehiculosIniciales];
                mostrarVehiculosEnTabla();
            }
        });
    }
});


function mostrarVehiculosEnTabla(lista = vehiculos) {
    const tabla = document.getElementById("tableBody");
    if (!tabla) return;

    tabla.innerHTML = "";

    if (lista.length === 0) {
        tabla.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">No se encontraron vehículos registrados.</td></tr>`;
        return;
    }

    for (let i = 0; i < lista.length; i++) {
        const v = lista[i];
        const fila = `
            <tr>
                <td><strong>${v.id}</strong></td>
                <td><span class="placa-badge">${v.placa}</span></td>
                <td><strong>${v.marca} ${v.modelo}</strong> (${v.anio})</td>
                <td><strong>${v.propietario}</strong><br><small style="color:var(--text-muted);"><i class="fa-solid fa-phone"></i> ${v.telefono}</small></td>
                <td><span class="badge badge-service"><i class="fa-solid fa-wrench"></i> ${v.servicio}</span></td>
                <td>
                    <div class="actions-cell">
                        <button class="btn btn-sm btn-edit" onclick="prepararEdicion('${v.id}')">
                            <i class="fa-solid fa-pen-to-square"></i> Editar
                        </button>
                        <button class="btn btn-sm btn-delete" onclick="eliminarVehiculo('${v.id}')">
                            <i class="fa-solid fa-trash-can"></i> Eliminar
                        </button>
                    </div>
                </td>
            </tr>
        `;
        tabla.innerHTML += fila;
    }

    const counterInfo = document.getElementById("counterInfo");
    if (counterInfo) {
        counterInfo.textContent = "Mostrando " + lista.length + " vehículo(s) registrados.";
    }
}


function prepararEdicion(id) {
    localStorage.setItem("autofix_edit_id", id);
    window.location.href = "registrar.html";
}


function eliminarVehiculo(id) {
    const indexReal = vehiculos.findIndex(v => String(v.id) === String(id));
    if (indexReal === -1) return;

    const v = vehiculos[indexReal];
    if (confirm("¿Está seguro de eliminar el vehículo con placa " + v.placa + "?")) {
        vehiculos.splice(indexReal, 1);
        guardarVehiculos(vehiculos);

        // Mantener el filtro de búsqueda si el usuario tiene texto ingresado
        const searchInput = document.getElementById("searchInput");
        const texto = searchInput ? searchInput.value.toLowerCase().trim() : "";
        if (texto) {
            const filtrados = vehiculos.filter(function(item) {
                return item.placa.toLowerCase().includes(texto) ||
                       item.marca.toLowerCase().includes(texto) ||
                       item.propietario.toLowerCase().includes(texto);
            });
            mostrarVehiculosEnTabla(filtrados);
        } else {
            mostrarVehiculosEnTabla(vehiculos);
        }
    }
}

