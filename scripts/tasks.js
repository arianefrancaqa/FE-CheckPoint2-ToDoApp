import { login, baseUrl } from "./login.js";
let divTarefa = document.getElementById("divTarefa");
let inputNomeTarefa = document.getElementById("novaTarefa");
let buttonSubmit = document.getElementById("submit");
// let inputDescricao = document.getElementById("descricaoPost");
// let inputUrl = document.getElementById("urlImagemPost");
// let buttonSubmit = document.getElementById("submitButton");
// let form = document.querySelector("form");

let token;

function getJwt() {
  login("denise@gmail.com", "de123");

  token = localStorage.getItem("token");
  console.log(`Retorno do getJwt(): ${token}`);
  return token;
}

//Tranformando a data
function transformaData() {
  let data = new Date();
  let ano = data.getFullYear();
  let mes = data.getMonth() + 1;
  let dia = data.getDate();
  let dataFormatada = dia + "/" + mes + "/" + ano;

  return `Criada em: ${dataFormatada}`;
}
//Fetch POST Tasks
function postTask(nomeTarefa) {
  let taskBody = {
    description: inputNomeTarefa.value,
    completed: "false",
  };

  fetch(`${baseUrl}/v1/tasks`, {
    method: "POST",
    body: JSON.stringify(taskBody),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: getJwt(),
    },
  })
    .then((response) => {
      if (response.status === 201) {
        console.log("Successfull login");
        return response.json();
      }
    })
    .then((data) => {
      console.log(data);
      return data;
    })
    .then((task) => {
      taskCreator(task.description);
    })
    .catch((err) => console.log(err));
}

function taskCreator(taskName) {
  let liTarefa = document.createElement("li");
  liTarefa.setAttribute("class", "tarefa");

  let notDoneDiv = document.createElement("div");
  notDoneDiv.setAttribute("class", "not-done");

  let descricao = document.createElement("div");
  descricao.setAttribute("class", "descricao");

  let nomeTarefa = document.createElement("p");
  nomeTarefa.setAttribute("class", "nome");
  nomeTarefa.innerHTML = taskName;

  let timeStamp = document.createElement("p");
  timeStamp.setAttribute("class", "timeStamp");
  timeStamp.innerHTML = transformaData();

  descricao.appendChild(nomeTarefa);
  descricao.appendChild(timeStamp);

  liTarefa.appendChild(notDoneDiv);
  liTarefa.appendChild(descricao);

  divTarefa.appendChild(liTarefa);
  divTarefa.appendChild(liTarefa);
}

function waitForElm(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

window.addEventListener("load", function (event) {
  buttonSubmit.addEventListener("click", function (e) {
    postTask();

    waitForElm('.tarefa').then((elm) => {
      console.log('Element is ready');
      console.log(elm.textContent);
      inputNomeTarefa.value = "";
  });

    e.preventDefault();
  });

  event.preventDefault();
});
