import { login, baseUrl } from "./login";

function getJwt() {
  let jwt = login(
     "asasasas@mail.com",
    "asaasd"
  );
  console.log("TESTE FILHA DA PUTA DO CARALHO");
  return console.log(jwt);
}

getJwt();

// Solicitação GET Tasks
// fetch(`${baseUrl}/v1/tasks`)
//     // Tratamento do sucesso
//     .then((response) => response.json()) // converter para json
//     .then((json) => console.log(json)) //imprimir dados no console
//     .catch((err) => console.log("Erro de solicitação", err));

// //Envio POST Tasks
// let postTaskBody = {
//     description: "Terminar Checkpoint",
//     completed: "false",
// };

// function postTask(body) {
//     fetch(`${baseUrl}/v1/tasks`, {
//         method: "POST",
//         body: JSON.stringify(postTaskBody),
//         headers: {
//             "Content-type": "application/json; charset=UTF-8",
//             "authorization": jwt,

//         },
//     })
//         .then((response) => {
//             if (response.status === 201) {
//                 console.log("Successfull login");
//                 return response.json()
//             }
//         })
//         .then((data) => {
//             console.log(data)
//             return data
//         })
//         .catch((err) => console.log(err));
// }

//postTask(postTaskBody);
