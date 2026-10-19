function verForm(trainer) {
    document.getElementById('trainer-name').innerText = trainer;

    document.getElementById('overlay').classList.add('active');
    document.getElementById('form-container').classList.add('active');
}

function cerrarForm() {
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('form-container').classList.remove('active');
}