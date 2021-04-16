/*
let form = document.getElementById('login-form');
*/
let button = document.getElementById('form-login-button');
button.addEventListener('click', ev => {
  ev.preventDefault();
  const user = document.getElementById('user');
  const pass = document.getElementById('password');


  if (isValidUser(user, pass)) {
    const user_data = {
      user: 'admin',
      password: '1234',
    }
    window.localStorage.setItem('user', JSON.stringify(user_data));
    location.replace('./pages/cards_page.html');
  }
});



/**
 * Revisa si el usuario y contraseña es correcto, de ser así retornará true
 * caso contrario, mostrará error
 * @param user {HTMLInputElement}
 * @param pass {HTMLInputElement}
 * @return boolean
 */
function isValidUser(user, pass) {
  const user_error = document.getElementById('form-user-error');
  const pass_error = document.getElementById('form-password-error');

  if (user.value === 'admin' && pass.value === '1234') {
    return true;
  }

  if (user.value !== 'admin') {
    user_error.textContent = 'Usuario no válido';
  }

  if (pass.value !== '1234') {
    pass_error.textContent = 'Contraseña no válida';
  }

  setTimeout(() => {
    user_error.textContent = '';
    pass_error.textContent = '';
  }, 4000);

  return false;
}