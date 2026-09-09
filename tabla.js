
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
                        <button class="btn btn-sm btn-edit" onclick="prepararEdicion(${i})">
                            <i class="fa-solid fa-pen-to-square"></i> Editar
                        </button>
                        <button class="btn btn-sm btn-delete" onclick="eliminarVehiculo(${i})">
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


function prepararEdicion(posicion) {
    localStorage.setItem("autofix_edit_index", posicion);
    window.location.href = "registrar.html";
}


function eliminarVehiculo(posicion) {
    const v = vehiculos[posicion];
    if (confirm("¿Está seguro de eliminar el vehículo con placa " + v.placa + "?")) {
        vehiculos.splice(posicion, 1);
        guardarVehiculos(vehiculos);
        mostrarVehiculosEnTabla();
    }
}
