import { login, baseUrl } from "./login.js";

let token

function getJwt() {
  let jwt = login(
     "denise@gmail.com",
    "de123"
  );

  token = localStorage.getItem("token");
  console.log(`Retorno do getJwt(): ${token}`)
  return token
}





// Solicitação GET Tasks
// fetch(`${baseUrl}/v1/tasks`)
//     // Tratamento do sucesso
//     .then((response) => response.json()) // converter para json
//     .then((json) => console.log(json)) //imprimir dados no console
//     .catch((err) => console.log("Erro de solicitação", err));

//Envio POST Tasks
let postTaskBody = {
    description: "Terminar Checkpoint",
    completed: "false",
};

function postTask(body) {
    fetch(`${baseUrl}/v1/tasks`, {
        method: "POST",
        body: JSON.stringify(postTaskBody),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "authorization": getJwt()
        },
    })
        .then((response) => {
            if (response.status === 201) {
                console.log("Successfull login");
                return response.json()
            }
        })
        .then((data) => {
            console.log(data)
            return data
        })
        .catch((err) => console.log(err));
}

postTask(postTaskBody);
