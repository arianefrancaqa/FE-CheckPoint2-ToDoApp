/*
# Ambos os campos devem ser normalizados (ex: retirar espaços desnecessários);
#variavel que tiver a string.trim() = remove espacos duplos e antes e depois 

# Nenhum dos campos pode ser vazio/nulo;
let minhaVariavel= ""
if(!minhaVariavel) {
}
primeira e segunda do login
para a nossa validacao    

https://www.simplilearn.com/tutorials/javascript-tutorial/email-validation-in-javascript
 */

import { signup } from './auth.js'


let form = document.querySelector("form")

function validate() {
    let isValid = false
    const myForm = document.myForm
    if (myForm.inputEmail.value == "") {
        alert("Forneça um endereço de email")
        document.myForm.inputEmail.focus()
    } else if (myForm.inputPassword.value == "") {
        alert("Forneça a sua senha")
        document.myForm.inputPassword.focus()
    } else if (myForm.inputPasswordRepetir.value !== myForm.inputPassword.value) {
        alert("Senhas não compatíveis")
    } else if (myForm.inputNome.value == "") {
        alert("Forneça um nome")
        document.myForm.inputNome.focus()
    } else if (myForm.inputSobrenome.value == "") {
        alert("Forneça um sobrenome")
        document.myForm.inputNome.focus()
    } else {
        isValid = true
    }

    return isValid
}

form.addEventListener("submit", async (evento) => {
    evento.preventDefault()

    // Validar se todos os campos foram preenchidos
    let isValid = validate()
    console.log(`Is valid: ${isValid}`)

    if (isValid) {

        // Extrair valores dos campos
        let nome = document.getElementById("inputNome").value;
        let sobrenome = document.getElementById("inputSobrenome").value;
        let email = document.getElementById("inputEmail").value;
        let password = document.getElementById("inputPassword").value;

        // Chamar a API /v1/users POST para criar um usuario
        // e receber o token JWT de acesso

        // Descomentar linha 78 e remover linha 79 quando a API voltar a funcionar
        const jwt = await signup(nome, sobrenome, email, password)
        // const jwt = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRlbmlzZUBnbWFpbC5jb20iLCJpZCI6NzA1MSwiaWF0IjoxNjYzODg0MzI4fQ.fUZAtE42hVZJYoYqLEIqUt9xg62eSBd3Yn-vfFnoiH4'

        console.log(`jwt received: ${jwt}`);

        // Salvar JWT no localstorage para extrair na pagina tasks.html
        localStorage.setItem('jwt_ctd', jwt)
        const valorJwtLocalstorage = localStorage.getItem('jwt_ctd')

        console.log(`JWT armazenado no localstorage ${valorJwtLocalstorage}`)

        alert('Cadastro efetuado com sucesso')

        // Caso for usar modal, usar o setTimeout para dar um tempo
        // para o usuario ler o modal e depois ser redirecionado
        // setTimeout(()=>{
        //     console.log('aguardando redirecionamento...')
        // }, 5000)

        // Redirecionar para a pagina de tarefas
        window.location.href = "tarefas.html";
        // return 
    }
})

function normalizarCampos() {
    let listOfInputs = document.querySelectorAll("input")
    for (let index = 0; index < listOfInputs.length; index++) {
        const input = listOfInputs[index];
        listOfInputs = input.value.trim();
    }
    return normalizarCampos;
}