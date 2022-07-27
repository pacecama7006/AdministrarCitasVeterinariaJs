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

let editando;

// Clases
class Citas {
    constructor(){
        this.citas = [];
    }

    // Función que permite agregar citas
    agregarCita(cita){
        // Tomo el arreglo del constructor y le paso una copia de la nueva cita
        this.citas = [...this.citas, cita];

        // console.log(this.citas);
    }

    eliminarCita(id){
        // Elimino las citas que son distinas al id, mediante filter
        this.citas = this.citas.filter( cita => cita.id !== id);
    }

    editarCitas(citaActualizada){
        // Genero con map para crear un nuevo arreglo de citas y que me reescriba
        // el objeto, porque lo estoy editando
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada: cita);
    }
}
// Fin clase citas
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
        }, 3000);
    }

    // Función que imprime el html de las citas haciendo destructuring para
    // acceder al arreglo de citas, para acceder de forma directa al arreglo
    imprimirCitas ({citas}){
        // console.log(citas);

        // Limpiar el html
        this.limpiarHTML();
        // Como ya accedi directamente al arreglo, lo recorro con un foreach
        citas.forEach(cita => {
            // hago destructuring con las propiedades del array
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            // Creo div para tener los datos de la cita
            const divCita = document.createElement('div');
            // Agrego clases
            divCita.classList.add('cita', 'p-3');
            // le pongo un atributo al div
            divCita.dataset.id = id;

            // Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            const propietarioParrafo = document.createElement('p');
            const telefonoParrafo = document.createElement('p');
            const fechaParrafo = document.createElement('p');
            const horaParrafo = document.createElement('p');
            const sintomasParrafo = document.createElement('p');
            const idParrafo = document.createElement('p');

            // Creo botón para eliminar cita
            const btnEliminar = document.createElement('button');

            // Creo botón para editar cita
            const btnEditar = document.createElement('button');
            
            // Agrego clases a los elementos de las citas
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
            btnEditar.classList.add('btn', 'btn-info', 'mr-2');

            // Agrego texto a los elementos de la cita
            mascotaParrafo.textContent = mascota;
            // Agrego texto con scripting
            propietarioParrafo.innerHTML = `
                <span class="font-weight-bolder">Propietario: </span>${propietario}
            `;

            telefonoParrafo.innerHTML = `
                <span class="font-weight-bolder">Teléfono: </span>${telefono}
            `;

            fechaParrafo.innerHTML = `
                <span class="font-weight-bolder">Fecha: </span>${fecha}
            `;

            horaParrafo.innerHTML = `
                <span class="font-weight-bolder">Hora: </span>${hora}
            `;

            sintomasParrafo.innerHTML = `
                <span>Sintomas: </span>${sintomas}
            `;

            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>';

            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

            // Agrego los elementos de la cita al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            // Agrego el div al HTML en el contenedorCitas
            contenedorCitas.appendChild(divCita);

            // Agrego funcionalidad a los botones
            btnEliminar.onclick = ()=> eliminarCita(id);
            btnEditar.onclick = ()=> cargarCita(cita);


        });
    }

    // Función que permite limpiar el HTML
    limpiarHTML(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
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

    // console.log(citaObj);
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
function reiniciarObjetoCita() {
    citaObj.mascota = '';
    citaObj.propietario= '';
    citaObj.telefono= '';
    citaObj.fecha= '';
    citaObj.hora= '';
    citaObj.sintomas= '';
}

// Función que permite eliminar una cita
function eliminarCita(id) {
    // console.log(id);
    // Elimina la cita
    administrarCitas.eliminarCita(id);
    // Muestre mensaje
    ui.imprimirAlerta('La cita se eliminó correctamente');
    // Refresque las citas
    ui.imprimirCitas(administrarCitas);
}

// función que me permite cargar los datos de la cita y abrir en modo edición
function cargarCita(cita) {
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