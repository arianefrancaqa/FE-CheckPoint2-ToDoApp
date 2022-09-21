import { login, baseUrl } from "./login.js";
let divTarefa = document.getElementById("divTarefa");
// let inputDescricao = document.getElementById("descricaoPost");
// let inputUrl = document.getElementById("urlImagemPost");
// let buttonSubmit = document.getElementById("submitButton");
// let form = document.querySelector("form");

let token

function getJwt() {
    login(
        "denise@gmail.com",
        "de123"
    );

    token = localStorage.getItem("token");
    console.log(`Retorno do getJwt(): ${token}`)
    return token
}

//Envio POST Tasks
let postTaskBody = {
    description: "Terminar Checkpoint",
    completed: "false",
};

function transformaData() {
    let data = new Date();
    let ano = data.getFullYear();
    let mes = data.getMonth() + 1;
    let dia = data.getDate();
    let dataFormatada = dia + "/" + mes + "/" + ano;

    return `Criada em: ${dataFormatada}`;
}

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

//<li class="tarefa">
//   <div class="not-done"></div>
//   <div class="descricao">
//     <p class="nome">Nova tarefa</p>
//     <p class="timestamp">Criada em: 15/07/21</p>
//   </div>
//</li> 

function taskCreator(taskName) {
    let liTarefa = document.createElement("li");
    liTarefa.setAttribute("class", "tarefa");

    let notDoneDiv = document.createElement("div");
    notDoneDiv.setAttribute("class", "not-done");

    let descricao = document.createElement("div");
    descricao.setAttribute("class", "descricao");

    let nomeTarefa = document.createElement("p");
    nomeTarefa.setAttribute("class", "nome")
    nomeTarefa.innerHTML = taskName;

    let timeStamp = document.createElement("p");
    timeStamp.setAttribute("class", "timeStamp")
    timeStamp.innerHTML = transformaData();

    descricao.appendChild(nomeTarefa)
    descricao.appendChild(timeStamp)

    liTarefa.appendChild(notDoneDiv);
    liTarefa.appendChild(descricao);

    document.getElementById("divTarefa").appendChild(liTarefa);
    document.getElementById("divTarefa").appendChild(liTarefa);
}

taskCreator("Terminar Checkpoint");

window.addEventListener("load", function (e) {
    taskCreator("Terminar Checkpoint");

    e.preventDefault();
});


