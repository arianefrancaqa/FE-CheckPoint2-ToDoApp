// Pagina de Login:
// Ambos os campos devem ser normalizados (ex: retirar espaços desnecessários);
// Nenhum dos campos pode ser vazio/nulo;
// O email deve ser de um tipo válido (ex: aplicar expressões regulares);
// O botão de acesso deve ser habilitado apenas quando todos os campos do formulário estiverem validados corretamente.

//Nenhum dos campos pode ser vazio/nulo;

//O botão de acesso deve ser habilitado
//apenas quando todos os campos do formulário
//estiverem validados corretamente.
//Envio POST Login

const baseUrl = "https://ctd-todo-api.herokuapp.com";

async function login(emailEntry, passwordEntry) {

  let postBodyLogin = {
    email: emailEntry,
    password: passwordEntry
  };

  await fetch(`${baseUrl}/v1/users/login`, {
    method: "POST",
    body: JSON.stringify(postBodyLogin),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  })
    .then((response) => {
      if (response.status === 201) {
        console.log("Successfull login");
        return response.json()
      }
    })
    .then((data) => {
        let token = data.jwt
        localStorage.setItem("token", token)
      return data.jwt
    })
    .catch((err) => console.log(err));
}




// function login(emailEntry, passwordEntry) {
//   let postBodyLogin = {
//     email: emailEntry,
//     password: passwordEntry
//   };

//   fetch(`${baseUrl}/v1/users/login`, {
//     method: "POST",
//     body: JSON.stringify(postBodyLogin),
//     headers: { "Content-type": "application/json; charset=UTF-8" },
//   })
//     .then((response) => {
//       if (response.status === 201) {
//         console.log("Successfull login");
//         return response.json()
//       }
//     })
//     .then((data) => {
//       console.log(`
//             jwt: ${data.jwt}
//             `);
//       let response = data.jwt
//       return response
//     })
//     .catch((err) => console.log(err));
// }

// email: "asasasas@mail.com",
// password: "asaasd",



window.addEventListener("load", function (event) {
  let inputEmail = document.getElementById("inputEmail");
  let inputPassword = document.getElementById("inputPassword");
  let buttonSubmit = document.getElementById("submit");
  let inputs = document.querySelectorAll("input");

  buttonSubmit.disabled = false;

  function normalizarCampos() {
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

  inputs.forEach((input) => {
    if (input.value.length > 0) {
      buttonSubmit.disabled = false;
    }
  });

  buttonSubmit.addEventListener("click", function (e) {
    normalizarCampos();
    window.location.href = "tarefas.html";
    e.preventDefault();
    //Adicionar o "Se os dados existirem na base..."
    // if (validarEmail(inputEmail.value)) {
    //   window.location.href = "tarefas.html";
    //   e.preventDefault();
    // } else {
    //   console.log("Este email é inválido");
    // }
  });

  event.preventDefault();
});

export { login, baseUrl };