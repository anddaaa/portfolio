// ----------SCRIPTS PARA LA CONTACTA----------

function limpiarYBloquearCelda(){
    const nombre = document.getElementById('nom');
    const correo = document.getElementById('correoe');

    //Borrar valores
    nombre.value = '';
    correo.value = '';

    //Bloquear campos
    nombre.disabled = true;
    correo.disabled = true;
}

function Habilitar(){
    const nombre = document.getElementById('nom');
    const correo = document.getElementById('correoe');

    //Habilitar campos
    nombre.disabled = false;
    correo.disabled = false;
}

function mostrarOpciones(motivo) {
    // Oculta todas las opciones
    document.getElementById('dudas').classList.add('hidden');
    document.getElementById('errores').classList.add('hidden');

    // Muestra las opciones según el motivo seleccionado
    if (motivo === 'duda') {
        document.getElementById('dudas').classList.remove('hidden');
    } else if (motivo === 'error') {
        document.getElementById('errores').classList.remove('hidden');
    }
}