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
    if (myForm.email.value == "") {
        alert("Forneça um endereço de email")
        document.myForm.email.focus()
        return false
    } else if(myForm.senha.value == ""){
        alert("Forneça a sua senha")  
        document.myForm.senha.focus()
        return false
    } else if (myForm.repetirSenha.value !== myForm.senha.value){
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

    document.getElementById("btn").disabled = true

    let listOfInputs = document.querySelectorAll("input")
    for (let index = 0; index < listOfInputs.length; index++) {
        const input = listOfInputs[index];
      if(input.value === null || input.value === "") {
        document.getElementById("btn").disabled = true
        alert(`Preencha todos os campos`) 
        return 
      }
    }  
    document.getElementById("btn").disabled = false
    alert("Processo concluido")
    return 
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
