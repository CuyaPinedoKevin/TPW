
document.addEventListener("DOMContentLoaded", function() {
  
    const listaVehiculos = obtenerVehiculos();

    const totalInicio = document.getElementById("statTotalVehiculos");
    if (totalInicio) {
        totalInicio.textContent = listaVehiculos.length;
    }
});
