// Pagina de Login:
// Ambos os campos devem ser normalizados (ex: retirar espaços desnecessários);
// Nenhum dos campos pode ser vazio/nulo;
// O email deve ser de um tipo válido (ex: aplicar expressões regulares);
// O botão de acesso deve ser habilitado apenas quando todos os campos do formulário estiverem validados corretamente.

import { login } from "./auth.js";

//Nenhum dos campos pode ser vazio/nulo;

//O botão de acesso deve ser habilitado
//apenas quando todos os campos do formulário
//estiverem validados corretamente.

function normalizarCampos(inputEmail, inputPassword) {
  inputEmail = inputEmail.value.trim();
  inputPassword = inputPassword.value.trim();
  console.log("Email: " + inputEmail);
}

function validarEmail(email) {
  let emailValue = /\S+@\S+\.\S+/;
  if (!emailValue.test(email)) {
    alert("Email inválido");
    return false;
  }
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
    
    if (jwt === undefined) {
      alert('Credenciais invalidas. tente novamente')
      return
    }

    localStorage.setItem('jwt_ctd', jwt)

    window.location.href = "tarefas.html";
    
  });
});

export { login };