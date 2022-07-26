// Variables
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasArea = document.querySelector('#sintomas');

// UI
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

// Clases
class Citas {
    constructor(){
        this.citas = [];
    }
}

class UI{
    // Función para mandar una alerta
    imprimirAlerta(mensaje, tipo){
        // Creo un div
        const divMensaje = document.createElement('div');
        // Agrego clases al div. Son de bootstrap
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agrego clase en base al tipo de error
        if (tipo === 'error') {
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        // Agrego el mensaje de error al div
        divMensaje.textContent = mensaje;

        // Agrego al dom
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'));

        // Quitar la alerta después de 5 segundos
        setTimeout(() =>{
            divMensaje.remove();
        }, 5000);
    }
}

// INSTANCIO CLASES
const administrarCitas = new Citas();
const ui = new UI();
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

    formulario.addEventListener('submit', nuevaCita);
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
    // console.log(e.target.value);
    // Accedo a las propiedades del objeto y leo lo que escribo
    citaObj[e.target.name] = e.target.value;

    console.log(citaObj);
}

// Valida y agrega una cita a la clase de citas
function nuevaCita(e) {
    // Prevengo la acción por defecto del formulario
    e.preventDefault();

    // Extraigo la información del objeto de cita
    const{mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;

    // Valido información
    if (mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === '') {
        // Muestro en consola
        console.log('Todos los campos son obligatorios');
        // Muestro en pantalla
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        // Pongo el return para que ya no se ejecute la siguiente línea
        return;
    }

}