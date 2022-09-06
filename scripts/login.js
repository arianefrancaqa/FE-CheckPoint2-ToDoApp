// Pagina de Login:
// Ambos os campos devem ser normalizados (ex: retirar espaços desnecessários);
// Nenhum dos campos pode ser vazio/nulo;
// O email deve ser de um tipo válido (ex: aplicar expressões regulares);
// O botão de acesso deve ser habilitado apenas quando todos os campos do formulário estiverem validados corretamente.
window.addEventListener("load", function () {
    let inputEmail = document.getElementById("inputEmail");
    let inputPassword = document.getElementById("inputPassword");
    let buttonSubmit = document.getElementById("submit");

    function normalizarCampos(){
        inputEmail = inputEmail.value.trim();
        inputPassword = inputPassword.value.trim();
    }

    function checaCampos(){
        checaCampos = true
        return checaCampos
    }

    buttonSubmit.addEventListener("click", function (e) {
        normalizarCampos();
        checaCampos();

        if(campoOK){
            window.location.href = "tarefas.html"
        }
        e.preventDefault();
    });
})


