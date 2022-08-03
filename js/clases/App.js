import {datosCita, nuevaCita, crearDB} from '../funciones.js';
import {
    mascotaInput, 
    propietarioInput, 
    telefonoInput, 
    fechaInput, 
    horaInput, 
    sintomasArea, 
    formulario
} from '../selectores.js';

class App{
    constructor(){
        this.initApp();
    }
    
    initApp(){
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

        // Función que llama la creación de la BD
        crearDB();
    }
}

export default App;