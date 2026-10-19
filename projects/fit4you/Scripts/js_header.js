// ----------SCRIPTS PARA LA CABECERA----------

// Selecciona los íconos y menús
const userIcon = document.getElementById('user-icon');
const settingsIcon = document.getElementById('settings-icon');
const userMenu = document.getElementById('user-menu');
const settingsMenu = document.getElementById('settings-menu');

// Función para alternar el menú del usuario
function toggleUserMenu(event) {
    userMenu.classList.toggle('active');
}

// Función para alternar el menú de configuración
function toggleSettingsMenu(event) {
    settingsMenu.classList.toggle('active');
}

// Función para cerrar un menú cuando el mouse sale
function closeMenu(menu) {
    menu.classList.remove('active');
}

// Event listeners para los íconos (abrir los menús)
userIcon.addEventListener('click', toggleUserMenu);
settingsIcon.addEventListener('click', toggleSettingsMenu);

// Event listeners para cerrar los menús al salir el cursor
userMenu.addEventListener('mouseleave', () => closeMenu(userMenu));
settingsMenu.addEventListener('mouseleave', () => closeMenu(settingsMenu));


