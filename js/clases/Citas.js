// Clase citas que nos sirve para crear y administrar las citas
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

export default Citas;
// Fin clase citas