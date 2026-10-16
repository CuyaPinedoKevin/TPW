
document.addEventListener("DOMContentLoaded", function() {
    let vehiculos = obtenerVehiculos();
    

    const editId = localStorage.getItem("autofix_edit_id");
    const editIndexRaw = localStorage.getItem("autofix_edit_index");
    let indiceEdicion = -1;

    if (editId !== null) {
        indiceEdicion = vehiculos.findIndex(v => String(v.id) === String(editId));
    } else if (editIndexRaw !== null) {
        indiceEdicion = parseInt(editIndexRaw);
    }

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

    // Filtro en tiempo real para admitir sólo dígitos numéricos (máximo 9)
    const inputTelefono = document.getElementById("telefono");
    if (inputTelefono) {
        inputTelefono.addEventListener("input", function() {
            this.value = this.value.replace(/[^0-9]/g, "").slice(0, 9);
        });
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

        if (!placa || !marca || !modelo || !anio || !propietario || !telefono || !servicio) {
            alert("Por favor complete todos los campos obligatorios (*).");
            return;
        }

        // Validación estricta de año: obligatorio y dentro del rango permitido (1980 - 2027)
        const anioNum = parseInt(anio, 10);
        if (isNaN(anioNum) || anioNum < 1980 || anioNum > 2027) {
            alert("Por favor ingrese un año de fabricación válido entre 1980 y 2027.");
            const inputAnio = document.getElementById("anio");
            if (inputAnio) inputAnio.focus();
            return;
        }

        // Validación estricta de teléfono: debe contener exactamente 9 dígitos numéricos
        const regexTelefono = /^[0-9]{9}$/;
        if (!regexTelefono.test(telefono)) {
            alert("El teléfono debe contener exactamente 9 dígitos numéricos (ej. 987654321).");
            const inputTel = document.getElementById("telefono");
            if (inputTel) inputTel.focus();
            return;
        }

        if (indiceEdicion === -1 || !vehiculos[indiceEdicion]) {
            // Calcular el ID numérico más alto para garantizar que el nuevo ID sea siempre único
            const maxId = vehiculos.reduce((max, v) => {
                const num = parseInt(v.id, 10);
                return isNaN(num) ? max : Math.max(max, num);
            }, 0);
            const nuevoId = String(maxId + 1).padStart(3, "0");

            const nuevo = { id: nuevoId, placa, marca, modelo, anio, propietario, telefono, servicio };
            vehiculos.push(nuevo);
            guardarVehiculos(vehiculos);
            alert("¡Vehículo con placa " + placa + " registrado exitosamente con ID " + nuevoId + "!");
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
            localStorage.removeItem("autofix_edit_id");
            alert("¡Registro del vehículo actualizado correctamente!");
        }


        window.location.href = "tabla.html";
    });


    const btnCancelar = document.getElementById("btnCancelar");
    if (btnCancelar) {
        btnCancelar.addEventListener("click", function() {
            localStorage.removeItem("autofix_edit_index");
            localStorage.removeItem("autofix_edit_id");
        });
    }
});
