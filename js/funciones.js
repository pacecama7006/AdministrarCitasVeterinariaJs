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
export let DB;

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
        // console.log('Modo edición');
        
        // Pasar el objeto de la cita a edición. Le paso una copia del objeto con los {...}
        administrarCitas.editarCitas({...citaObj})

        // Edita una cita con idexedDB
        const transaction = DB.transaction(['citas'], 'readwrite');
        const objectStore = transaction.objectStore('citas');
        // Editamos con el método put
        objectStore.put(citaObj);

        transaction.oncomplete = function (){
            // Las líneas hasta editando estaban afuera del oncomplete hasta que metí indexedDB
            // Mensaje de editada correctamente
            ui.imprimirAlerta('Cita modificada correctamente');
            // Modifico el texto del botón para crear cita
            formulario.querySelector('button[type="submit"]').textContent = 'Crear cita';
    
            // quito el modo edición
            editando = false;
        }
        transaction.onerror = ()=>{
            console.log('Hubo un error');
        }

    }else{
        // Nuevo registro

        // console.log('Modo nueva cita');
        // Generar un id único
        citaObj.id = Date.now();
        // Creando una nueva cita accediendo a la instancia de administrarCitas de la clase Citas y 
        // accediendo a su método agregarCita y le paso una copia objeto citaObj
        // console.log(citaObj);
        administrarCitas.agregarCita({...citaObj});

        // Insertar registro en bd IndexedDB. Habilito la bd citas en modo lectura-escritura
        
        const transaction = DB.transaction(['citas'], 'readwrite');

        // Habilitar el objectStore. Creo el objectStore
        const objectStore = transaction.objectStore('citas');

        // Agrego el objetoCita para insertar en la bd
        objectStore.add(citaObj);

        // Verifico que la transacción esté completa
        transaction.oncomplete = function(){
            console.log('Cita agregada');

            // Mensaje de agregado correctamente
            ui.imprimirAlerta('Cita agregada correctamente');
        }


    }

    // Reinicio el objeto para nueva validación
    reiniciarObjetoCita();
    // Reseteo el formulario
    formulario.reset();

    // Mostrar el html de las citas
    // ui.imprimirCitas(administrarCitas); lo quito porque se modifica para tomar datos de bd
    ui.imprimirCitas();
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
    // administrarCitas.eliminarCita(id); Quito este código por agregar el indexedDB

    // Elimino de la base de datos de indexedDB
    const transaction = DB.transaction(['citas'], 'readwrite');
    const objectStore = transaction.objectStore('citas');
    objectStore.delete(id);
    // Muestre mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');

    transaction.oncomplete = ()=>{
        console.log(`Cita ${id} eliminada...`);

        // Esto estaba afuera del oncomplete hasta que metí lo del indexedDB
        // Refresque las citas
        // ui.imprimirCitas(administrarCitas);Lo quito para agregar los datos de la bd
        ui.imprimirCitas();
    }

    transaction.onerror = ()=>{
        console.log('Hubo un error');
    }
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

// Crea la bd
export function crearDB() {
    // Crear la bd en versión 1.0
    const crearDB = window.indexedDB.open('citas', 1);

    // Si hay un error
    crearDB.onerror = function(){
        console.log('Hubo un error al crear la BD');
    }

    // Si todo sale bien
    crearDB.onsuccess = function () {
        console.log('Bd creada');

        DB = crearDB.result;
        console.log(DB);

        // Mostrar citas al cargar, pero indexedDB ya está listo
        ui.imprimirCitas();
    }
    

    // Definimos el schema
    crearDB.onupgradeneeded = function(e){
        // obtengo una instancia de la bd
        const db = e.target.result;

        // Creo el objectStore
        const objectStore = db.createObjectStore('citas',{
            keyPath: 'id',
            autoIncrement: true,
        });

        // Definimos las columnas
        objectStore.createIndex('mascota', 'mascota', {unique: false});
        objectStore.createIndex('propietario', 'propietario', {unique: false});
        objectStore.createIndex('telefono', 'telefono', {unique: false});
        objectStore.createIndex('fecha', 'fecha', {unique: false});
        objectStore.createIndex('hora', 'hora', {unique: false});
        objectStore.createIndex('sintomas', 'sintomas', {unique: false});
        objectStore.createIndex('id', 'id', {unique: true});

        console.log('DB creada y lista');


    }
}
// Fin crearDB