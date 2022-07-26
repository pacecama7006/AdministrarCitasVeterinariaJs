// Variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasArea = document.querySelector('#sintomas');
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');


// Listeners
eventListeners();
function eventListeners() {
    // El evento input me va dando tecla por tecla
    // mascotaInput.addEventListener('input', datosCita);
    // El evento change me da todo hasta que salgo del cuadro de texto
    mascotaInput.addEventListener('change', datosCita);
    propietarioInput.addEventListener('change', datosCita);
    telefonoInput.addEventListener('change',datosCita);
    fechaInput.addEventListener('change', datosCita);
    horaInput.addEventListener('change', datosCita);
    sintomasArea.addEventListener('change', datosCita);
  }

// Creación de objetos
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: '',
}

// Funciones
function datosCita(e) {
    // Veo en consola
    console.log(e.target.value);
    // Accedo a las propiedades del objeto y leo lo que escribo
    citaObj[e.target.name] = e.target.value;

    console.log(citaObj);
}