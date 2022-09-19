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


function validate() {
    const myForm = document.myForm
    if (myForm.inputEmail.value == "") {
        alert("Forneça um endereço de email")
        document.myForm.inputEmail.focus()
        return false
    } else if(myForm.inputPassword.value == ""){
        alert("Forneça a sua senha")  
        document.myForm.inputPassword.focus()
        return false
    } else if (myForm.inputPasswordRepetir.value !== myForm.inputPassword.value){
        alert("Senhas não compatíveis")
        return false 

    } else {
        return true
    }
}

function emailValidation() {
    let mail = document.getElementById("inputEmail").value;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(!validRegex.test(mail)) {
        alert("Email inválido")
        return false
    }
}


form = document.querySelector("form")

form.addEventListener("submit", (evento) => {
    evento.preventDefault()

    // Validar se todos os campos foram preenchidos
    document.getElementById("btn").disabled = true
    validate()
    
    // let listOfInputs = document.querySelectorAll("input")
    // for (let index = 0; index < listOfInputs.length; index++) {
    //     const input = listOfInputs[index];
    //   if(input.value === null || input.value === "") {
    //     document.getElementById("btn").disabled = true
    //     alert(`Preencha todos os campos`) 
    //     return 
    //   }
    // }  
    document.getElementById("btn").disabled = false

    // Extrair valores dos campos
    let nome = document.getElementById("inputNome").value;
    let sobrenome = document.getElementById("inputSobrenome").value;
    let email = document.getElementById("inputEmail").value;
    let password = document.getElementById("inputPassword").value;
    
    console.log(email, password)
    
    // Chamar a API /users POST para criar um usuario
    const jwt = signup(nome, sobrenome, email, password)
    console.log(`jwt received: ${jwt}`);
    // Redirecionar para a pagina de login
    // window.location.href = "tarefas.html";
    // return 
})


function normalizarCampos(){
    let listOfInputs = document.querySelectorAll("input")
    for (let index = 0; index < listOfInputs.length; index++) {
        const input = listOfInputs[index];
        listOfInputs = input.value.trim();     
    }
    return normalizarCampos;
}

/*
        let conteudo = input.value
        if (conteudo !== null && conteudo !== ''){
            document.getElementById("btn").disabled = false
        } else {
            document.getElementById("btn").disabled = true
        }

let listOfInputs = document.querySelectorAll("input")
    for (let index = 0; index < listOfInputs.length; index++) {
        const input = listOfInputs[index];
        input.addEventListener("blur", function(event) {
            event.target.style.background = ''
        }, true)
      
    }
         */
function signup(nome, sobrenome, email, password) {
    console.log(nome, sobrenome, email, password)
    
    const baseUrl = "https://ctd-todo-api.herokuapp.com";
    let postBodyLogin = {
        firstName: nome,
        lastName: sobrenome,
        email: email,
        password: password
    };
      
    fetch(`${baseUrl}/v1/users`, {
        method: "POST",
        body: JSON.stringify(postBodyLogin),
        headers: { 
            "Content-type": "application/json; charset=UTF-8" 
        },
    })
    .then((response) => {
        if (response.status === 201) {
            return response.json()
        }
    })
    .then((data) => {
        return data.jwt
    })
    .catch((err) => console.log(err));
}