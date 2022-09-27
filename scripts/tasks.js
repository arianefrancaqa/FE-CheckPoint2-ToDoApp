import { baseUrl } from "./constants.js";
import { getJwt, getMe } from "./auth.js"

let ulTarefasPendentes = document.getElementById("tarefas-pendentes");
let ulTarefasTerminadas = document.getElementById("tarefas-terminadas");
let inputNomeTarefa = document.getElementById("novaTarefa");
let buttonSubmit = document.getElementById("submit");
let buttonCloseApp = document.getElementById("closeApp");

/**
 * Converte data para formato DD/MM/YYYY
 */
function transformaData(date) {
  let data = new Date(date);
  let ano = data.getFullYear();
  let mes = data.getMonth() + 1;
  let dia = data.getDate();
  let dataFormatada = dia + "/" + mes + "/" + ano;

  return `Criada em: ${dataFormatada}`;
}

/**
 * Cadastra uma task para o usuario logado
 * e adiciona a task a lista
 */
async function postTask() {
  let taskBody = {
    description: inputNomeTarefa.value,
    completed: "false",
  };

  const response = await fetch(`${baseUrl}/v1/tasks`, {
    method: "POST",
    body: JSON.stringify(taskBody),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: getJwt(),
    },
  })

  if (response.status === 201) {
    console.log("Successfull post task");
  }

  const task = await response.json()

  await createTaskDOM(task);
}

/**
 * Retorna a lista de tasks do usuario logado
 */
async function getTasks() {
  const response = await fetch(`${baseUrl}/v1/tasks`, {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: getJwt(),
    },
  })

  if (response.status !== 200) {
    alert('Deu problema ao carregar as tasks')
    return false
  }

  const tasks = await response.json()

  // remove os itens das duas listas 
  ulTarefasPendentes.innerHTML = ""
  ulTarefasTerminadas.innerHTML = ""

  // Ordena as tasks por data de forma ascendente
  // Corrigir o codigo abaixo para fazer a ordenacao funcionar
  // const tasksMapCreatedAtToDate = tasks.map(obj => {
  //   return {...obj, date: new Date(obj.date)};
  // });

  // const sortedTasks = tasksMapCreatedAtToDate.sort(
  //   (objA, objB) => Number(objA.date) - Number(objB.date),
  // )

  tasks.forEach(async (task) => {
    await createTaskDOM(task);
  });

}

/**
 * Adiciona uma task a lista de tasks no DOM
 */
async function createTaskDOM(task) {
  let liTarefa = document.createElement("li");
  liTarefa.setAttribute("class", "tarefa");
  liTarefa.setAttribute("id", task.id)

  let notDoneDiv = document.createElement("div");
  notDoneDiv.setAttribute("class", "not-done");

  let descricao = document.createElement("div");
  descricao.setAttribute("class", "descricao");

  let nomeTarefa = document.createElement("p");
  nomeTarefa.setAttribute("class", "nome");
  nomeTarefa.innerHTML = task.description;

  let timeStamp = document.createElement("p");
  timeStamp.setAttribute("class", "timeStamp");
  timeStamp.innerHTML = transformaData(task.createdAt);

  let deleteTaskBtn = document.createElement("button");
  deleteTaskBtn.setAttribute("class", "delete-task-button");
  deleteTaskBtn.innerHTML = "Deletar Tarefa"

  // TODO: corrigir CSS do botao
  let updateTaskBtn = document.createElement("button");
  updateTaskBtn.setAttribute("class", "update-task-button");
  updateTaskBtn.innerHTML = "Terminar Tarefa"

  deleteTaskBtn.addEventListener("click", async () => {
    await deleteTask(task.id)
  })

  updateTaskBtn.addEventListener("click", async () => {
    await updateTask(task.id, task.description)
  })

  descricao.appendChild(nomeTarefa);
  descricao.appendChild(timeStamp);
  descricao.appendChild(updateTaskBtn);
  descricao.appendChild(deleteTaskBtn);

  liTarefa.appendChild(notDoneDiv);
  liTarefa.appendChild(descricao);

  if (task.completed) {
    ulTarefasTerminadas.appendChild(liTarefa)
  } else {
    ulTarefasPendentes.appendChild(liTarefa);
  }
}

/**
 * Deleta uma task do usuario e atualiza a lista de tasks no DOM
 */
async function deleteTask(id) {

  // Remove a tarefa do servidor
  const response = await fetch(`${baseUrl}/v1/tasks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: getJwt(),
    },
  })

  if (response.status === 200) {
    // após remover no servidor, renderizamos todas as tasks novamente
    await getTasks();
  }
  else {
    alert('Ocorreu um erro ao deletar a tarefa')
  }
}

/**
 * Marca uma task como terminada e a move da lista de task pendentes
 * para a lista de tasks terminadas
 */
async function updateTask(id, description) {
  let taskBody = {
    description: description,
    completed: "true",
  };
  const response = await fetch(`${baseUrl}/v1/tasks/${id}`, {
    method: "PUT",
    body: JSON.stringify(taskBody),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      authorization: getJwt(),
    },
  })

  // TODO: descomentar o codigo abaixo quando a API voltar a permitir
  // a criacao de tasks
  // if (response.status !== 200) {
  //   alert('Ocorreu um erro ao terminar a tarefa')
  //   return false
  // } 
  const listaDeTarefasPendentes = document.getElementById("tarefas-pendentes")
  const listaDeTarefasTerminadas = document.getElementById("tarefas-terminadas")
  const liElement = document.getElementById(id)
  const descricaoDiv = liElement.querySelector('.descricao')
  const updateTaskChildButton = descricaoDiv.querySelector('.update-task-button')

  descricaoDiv.removeChild(updateTaskChildButton)

  listaDeTarefasPendentes.removeChild(liElement)
  listaDeTarefasTerminadas.appendChild(liElement)
}

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

/**
 * Extrai informacoes do usuario a partir do token JWT
 * Se o token nao existir ou for invalido entao redireciona o usuario
 * para a tela de login
 */
async function getUserData() {
  const jwt = getJwt()

  if (jwt === null) {
    window.location.href = "login.html";
  }

  const response = await getMe();

  if (response === undefined) {
    localStorage.removeItem('jwt_ctd')
    window.location.href = "login.html";
  }

  return response
}

/**
 * Gera uma imagem dinamica para a foto de perfil do usuario
 */
async function setUserProfileImage() {
  const divProfile = document.querySelector('.user-image')
  const imgNode = document.createElement('img')
  imgNode.setAttribute('src', 'https://picsum.photos/200')
  divProfile.appendChild(imgNode)
}

/**
 * Popula o cabecalho com os dados do usuario logado
 */
function populateHeader(userData) {
  const pUser = document.getElementById('p_username')
  pUser.innerHTML = `${userData.firstName} ${userData.lastName}`
  // TODO: Ajustar imagem
  // setUserProfileImage()
}

window.addEventListener("load", async function (event) {
  // A pagina precisa ser protegida ja que fizemos autenticacao
  // por token JWT.
  // Portanto, no onload devemos primeiro verificar se existe o token
  // no localstorage. Se nao existir, redirecionar para a pagina de login
  // Se existir, chamar o endpoint v1/users/getMe enviando o token para
  // receber as informacoes do usuario.
  // Caso o retorno da chamada seja diferente de status 200, significa que
  // ou deu um erro no servidor ou o token eh invalido. Entao devemos redirecionar
  // o usuario para a pagina de login
  const userData = await getUserData()

  populateHeader(userData)

  await getTasks();

  // Event Listener que captura o click do botao +
  // e adiciona uma tarefa a lista de tarefas pendentes
  buttonSubmit.addEventListener("click", async function (e) {
    e.preventDefault();
    await postTask();

    waitForElm(".tarefa").then((elm) => {
      console.log("Element is ready");
      console.log(elm.textContent);
      inputNomeTarefa.value = "";
    });
  });

  /**
   * Event listener para o botao "Finalizar Sessao"
   * Remove o token do localstorage e redireciona o usuario
   * para a pagina de login
   */
  buttonCloseApp.addEventListener("click", function (e) {
    e.preventDefault();
    localStorage.removeItem('jwt_ctd')
    window.location.href = "login.html";
  });
});
