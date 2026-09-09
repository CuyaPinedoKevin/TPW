
document.addEventListener("DOMContentLoaded", function() {
    let vehiculos = obtenerVehiculos();
    

    const editIndexRaw = localStorage.getItem("autofix_edit_index");
    let indiceEdicion = editIndexRaw !== null ? parseInt(editIndexRaw) : -1;

    const vehicleForm = document.getElementById("vehicleForm");
    if (!vehicleForm) return;


    if (indiceEdicion !== -1 && vehiculos[indiceEdicion]) {
        const v = vehiculos[indiceEdicion];
        document.getElementById("placa").value = v.placa;
        document.getElementById("marca").value = v.marca;
        document.getElementById("modelo").value = v.modelo;
        document.getElementById("anio").value = v.anio;
        document.getElementById("propietario").value = v.propietario;
        document.getElementById("telefono").value = v.telefono;
        document.getElementById("servicio").value = v.servicio;

        document.getElementById("formTitle").textContent = "Modificar Vehículo ID " + v.id;
        document.getElementById("btnGuardar").innerHTML = `<i class="fa-solid fa-rotate"></i> Actualizar Vehículo`;
        document.getElementById("btnCancelar").classList.remove("hidden");
    }

    vehicleForm.addEventListener("submit", function(e) {
        e.preventDefault();

        const placa = document.getElementById("placa").value.toUpperCase().trim();
        const marca = document.getElementById("marca").value;
        const modelo = document.getElementById("modelo").value.trim();
        const anio = document.getElementById("anio").value.trim();
        const propietario = document.getElementById("propietario").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const servicio = document.getElementById("servicio").value;

        if (!placa || !marca || !modelo || !propietario || !telefono || !servicio) {
            alert("Por favor complete todos los campos obligatorios (*).");
            return;
        }

        if (indiceEdicion === -1) {

            const nuevoId = "00" + (vehiculos.length + 1);
            const nuevo = { id: nuevoId, placa, marca, modelo, anio, propietario, telefono, servicio };
            vehiculos.push(nuevo);
            guardarVehiculos(vehiculos);
            alert("¡Vehículo con placa " + placa + " registrado exitosamente!");
        } else {

            vehiculos[indiceEdicion].placa = placa;
            vehiculos[indiceEdicion].marca = marca;
            vehiculos[indiceEdicion].modelo = modelo;
            vehiculos[indiceEdicion].anio = anio;
            vehiculos[indiceEdicion].propietario = propietario;
            vehiculos[indiceEdicion].telefono = telefono;
            vehiculos[indiceEdicion].servicio = servicio;

            guardarVehiculos(vehiculos);
            localStorage.removeItem("autofix_edit_index");
            alert("¡Registro del vehículo actualizado correctamente!");
        }


        window.location.href = "tabla.html";
    });


    const btnCancelar = document.getElementById("btnCancelar");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", function() {
            localStorage.removeItem("autofix_edit_index");
        });
    }
});
