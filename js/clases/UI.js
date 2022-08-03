import {cargarCita, eliminarCita, DB} from '../funciones.js';
import {contenedorCitas, heading} from '../selectores.js';
// Variable para leer tener instancia de la BD

//Clase UI que nos sirve para manejar toda la interface
class UI{
    constructor({citas}) {
        this.textoHeading(citas);
    }
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
    // imprimirCitas ({citas}){Lo quito para meter datos de la bd
    imprimirCitas (){
        // console.log(citas);

        // Limpiar el html
        this.limpiarHTML();
        // Establezco un encabezado
        this.textoHeading(citas);
        
        // Como ya accedi directamente al arreglo, lo recorro con un foreach
        // Cancelo el forEach xq voy a meter datos desde la bd ya no desde el destructurin del objeto
        // Ver con que lo substituyo más adelante en la línea 129
        // citas.forEach(cita => {
        //     // hago destructuring con las propiedades del array
        //     const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

        //     // Creo div para tener los datos de la cita
        //     const divCita = document.createElement('div');
        //     // Agrego clases
        //     divCita.classList.add('cita', 'p-3');
        //     // le pongo un atributo al div
        //     divCita.dataset.id = id;

        //     // Scripting de los elementos de la cita
        //     const mascotaParrafo = document.createElement('h2');
        //     const propietarioParrafo = document.createElement('p');
        //     const telefonoParrafo = document.createElement('p');
        //     const fechaParrafo = document.createElement('p');
        //     const horaParrafo = document.createElement('p');
        //     const sintomasParrafo = document.createElement('p');
        //     const idParrafo = document.createElement('p');

        //     // Creo botón para eliminar cita
        //     const btnEliminar = document.createElement('button');

        //     // Creo botón para editar cita
        //     const btnEditar = document.createElement('button');
            
        //     // Agrego clases a los elementos de las citas
        //     mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
        //     btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
        //     btnEditar.classList.add('btn', 'btn-info', 'mr-2');

        //     // Agrego texto a los elementos de la cita
        //     mascotaParrafo.textContent = mascota;
        //     // Agrego texto con scripting
        //     propietarioParrafo.innerHTML = `
        //         <span class="font-weight-bolder">Propietario: </span>${propietario}
        //     `;

        //     telefonoParrafo.innerHTML = `
        //         <span class="font-weight-bolder">Teléfono: </span>${telefono}
        //     `;

        //     fechaParrafo.innerHTML = `
        //         <span class="font-weight-bolder">Fecha: </span>${fecha}
        //     `;

        //     horaParrafo.innerHTML = `
        //         <span class="font-weight-bolder">Hora: </span>${hora}
        //     `;

        //     sintomasParrafo.innerHTML = `
        //         <span>Sintomas: </span>${sintomas}
        //     `;

        //     btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>';

        //     btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>';

        //     // Agrego los elementos de la cita al divCita
        //     divCita.appendChild(mascotaParrafo);
        //     divCita.appendChild(propietarioParrafo);
        //     divCita.appendChild(telefonoParrafo);
        //     divCita.appendChild(fechaParrafo);
        //     divCita.appendChild(horaParrafo);
        //     divCita.appendChild(sintomasParrafo);
        //     divCita.appendChild(btnEliminar);
        //     divCita.appendChild(btnEditar);

        //     // Agrego el div al HTML en el contenedorCitas
        //     contenedorCitas.appendChild(divCita);

        //     // Agrego funcionalidad a los botones
        //     btnEliminar.onclick = ()=> eliminarCita(id);
        //     btnEditar.onclick = ()=> cargarCita(cita);


        // });

        // Leer el contenido de la BD
        const objectStore = DB.transaction('citas').objectStore('citas');

        // Modifico el textHeading por la bd
        const fnTextoHeading = this.textoHeading;
        // Obtengo el total de registros existentes en la bd
        const total = objectStore.count();
        // console.log(total);
        total.onsuccess = function (){
            // console.log(total.result);
            fnTextoHeading(total.result);
        }

        // Para leer las columnas, utilizamos el método openCursor, que hace la
        // función de un foreach para recorrer las columnas de la BD
        objectStore.openCursor().onsuccess = function (e) {
            // console.log(e.target.result);
            // obtengo una instancia del cursor
            const cursor = e.target.result;

            // Si tengo el cursor
            if(cursor){
                // Hago destructuring al value del cursor
                const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cursor.value;

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
                // btnEditar.onclick = ()=> cargarCita(cita); Así estaba antes de indexedDb 
                const cita = cursor.value;
                btnEditar.onclick = ()=> cargarCita(cita); 
                
                // Le indicamos al cursor que vaya al siguiente elemento, con el
                // iterador continue
                cursor.continue();
            }
        }
        // Fin objectStore

    }

    // Agrego un encabezado
    // textoHeading(citas) {Lo modifico por la bd, para que la leyenda me cambie en base a la bd
    textoHeading(resultado) {
        // console.log(citas);
        // if(citas.length > 0 ) {
            // Si hay citas en la bd
        if(resultado > 0 ) {
            heading.textContent = 'Administra tus Citas '
        } else {
            heading.textContent = 'No hay Citas, comienza creando una'
        }
    }

    // Función que permite limpiar el HTML
    limpiarHTML(){
        while (contenedorCitas.firstChild) {
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }

}

export default UI;