
const vehiculosIniciales = [
    {
        id: "001",
        placa: "ABC-123",
        marca: "Toyota",
        modelo: "Yaris",
        anio: "2021",
        propietario: "Juan Pérez",
        telefono: "987654321",
        servicio: "Cambio de aceite y filtro"
    },
    {
        id: "002",
        placa: "XYZ-987",
        marca: "Hyundai",
        modelo: "Accent",
        anio: "2019",
        propietario: "María Gómez",
        telefono: "912345678",
        servicio: "Mantenimiento de frenos"
    },
    {
        id: "003",
        placa: "KLS-456",
        marca: "Nissan",
        modelo: "Sentra",
        anio: "2022",
        propietario: "Carlos Rodríguez",
        telefono: "955443322",
        servicio: "Diagnóstico con Escáner"
    }
];


function obtenerVehiculos() {
    const datos = localStorage.getItem("autofix_vehiculos");
    if (!datos) {
        localStorage.setItem("autofix_vehiculos", JSON.stringify(vehiculosIniciales));
        return [...vehiculosIniciales];
    }
    let lista = JSON.parse(datos);
    if (!Array.isArray(lista) || lista.length === 0) {
        localStorage.setItem("autofix_vehiculos", JSON.stringify(vehiculosIniciales));
        return [...vehiculosIniciales];
    }

    // Asegurar unicidad estricta de IDs para evitar colisiones
    const idsVistos = new Set();
    let huboDuplicados = false;
    let maxIdNum = 0;

    lista.forEach(v => {
        const num = parseInt(v.id, 10);
        if (!isNaN(num) && num > maxIdNum) maxIdNum = num;
    });

    lista.forEach(v => {
        if (!v.id || idsVistos.has(String(v.id))) {
            maxIdNum++;
            v.id = String(maxIdNum).padStart(3, "0");
            huboDuplicados = true;
        } else {
            idsVistos.add(String(v.id));
        }
    });

    if (huboDuplicados) {
        guardarVehiculos(lista);
    }

    return lista;
}


function guardarVehiculos(lista) {
    localStorage.setItem("autofix_vehiculos", JSON.stringify(lista));
}


document.addEventListener("DOMContentLoaded", function() {

    
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", function() {
            navMenu.classList.toggle("show");
        });
    }


    const navRegistrarLinks = document.querySelectorAll("a[href='registrar.html']");
    navRegistrarLinks.forEach(link => {
        link.addEventListener("click", function() {
            if (!this.classList.contains("btn-edit")) {
                localStorage.removeItem("autofix_edit_index");
                localStorage.removeItem("autofix_edit_id");
            }
        });
    });
});
