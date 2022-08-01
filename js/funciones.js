import Citas from './clases/Citas.js';
import UI from './clases/UI.js';
import {
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasArea, 
    formulario
} from './selectores.js';
// INSTANCIO CLASES
const administrarCitas = new Citas();
console.log(administrarCitas);
const ui = new UI(administrarCitas);

let editando;

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
export function datosCita(e) {
    // Veo en consola
    // console.log(e.target.value);
    // Accedo a las propiedades del objeto y leo lo que escribo
    citaObj[e.target.name] = e.target.value;

    // console.log(citaObj);
}

// Valida y agrega una cita a la clase de citas
export function nuevaCita(e) {
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

    // Verifico si el formulario está en modo edición
    if (editando) {
        console.log('Modo edición');
        // Mensaje de editada correctamente
        ui.imprimirAlerta('Cita modificada correctamente');

        // Pasar el objeto de la cita a edición. Le paso una copia del objeto con los {...}
        administrarCitas.editarCitas({...citaObj})
        // Modifico el texto del botón para crear cita
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';

        // quito el modo edición
        editando = false;
    }else{
        // console.log('Modo nueva cita');
        // Generar un id único
        citaObj.id = Date.now();
        // Creando una nueva cita accediendo a la instancia de administrarCitas de la clase Citas y 
        // accediendo a su método agregarCita y le paso una copia objeto citaObj
        // console.log(citaObj);
        administrarCitas.agregarCita({...citaObj});

        // Mensaje de agregado correctamente
        ui.imprimirAlerta('Cita agregada correctamente');
    }

    // Reinicio el objeto para nueva validación
    reiniciarObjetoCita();
    // Reseteo el formulario
    formulario.reset();

    // Mostrar el html de las citas
    ui.imprimirCitas(administrarCitas);
}

// Función que permite reiniciar el objeto citaObj
export function reiniciarObjetoCita() {
    citaObj.mascota = '';
    citaObj.propietario= '';
    citaObj.telefono= '';
    citaObj.fecha= '';
    citaObj.hora= '';
    citaObj.sintomas= '';
}

// Función que permite eliminar una cita
export function eliminarCita(id) {
    // console.log(id);
    // Elimina la cita
    administrarCitas.eliminarCita(id);
    // Muestre mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');
    // Refresque las citas
    ui.imprimirCitas(administrarCitas);
}

// función que me permite cargar los datos de la cita y abrir en modo edición
export function cargarCita(cita) {
    // console.log(cita);
    // Aplico destructuring para extraer en una constante los valores de la cita
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Lleno los inputs modificando su value
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasArea.value = sintomas;

    // Lleno nuevamente con datos el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    // Cambiar el texto del botón
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;

}