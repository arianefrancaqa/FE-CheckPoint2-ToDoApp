import { login } from "./auth.js";

function normalizarCampos(inputEmail, inputPassword) {
  inputEmail = inputEmail.value.trim();
  inputPassword = inputPassword.value.trim();
  console.log("Email: " + inputEmail);
}

window.addEventListener("load", function (event) {
  event.preventDefault();
  let inputEmail = document.getElementById("inputEmail");
  let inputPassword = document.getElementById("inputPassword");
  let buttonSubmit = document.getElementById("submit");

  buttonSubmit.disabled = false;
  buttonSubmit.addEventListener("click", async function (e) {
    e.preventDefault();

    normalizarCampos(inputEmail, inputPassword);

    const jwt = await login(inputEmail.value, inputPassword.value)
    console.log(`JWT: ${jwt}`)
    if (jwt === undefined) {
      alert('Credenciais invalidas. tente novamente')
      return
    }

    localStorage.setItem('jwt_ctd', jwt)

    window.location.href = "tarefas.html";

  });
});

export { login };