// ----------SCRIPTS PARA LA TUTORIALES ENTRENAMIENTO----------

//funcion para mostrar y ocultar las instrucciones
function Instructions(instructionsId) {
    const instructionsElement = document.getElementById(instructionsId);
    if (instructionsElement.style.display === 'none') {
        instructionsElement.style.display = 'block';
    } else {
        instructionsElement.style.display = 'none';
    }
}
