class Usuario {
    constructor (nome, email, senha){
        this.nome = nome
        this.email = email
        this.senha = senha
    }
}

let usuarios = []

var indiceAtual = -1

function adicionarUsuario (){
    const nome = document.getElementById("campoNome").value
    const email = document.getElementById("campoEmail").value
    const senha = document.getElementById("campoSenha").value
    if(nome && email && senha){
        const novoUsuario = new Usuario(nome, email, senha)
        usuarios = JSON.parse(localStorage.getItem("cadastros"))
        console.log(usuarios)
        usuarios.push(novoUsuario)
        localStorage.setItem("cadastros", JSON.stringify(usuarios))
        document.getElementById("campoNome").value=""
        document.getElementById("campoEmail").value=""
        document.getElementById("campoSenha").value=""
    }else{
        alert("Preencha os campos")
    }
    
}

function deletarCadastro (index){
    let cadastros = JSON.parse(localStorage.getItem("cadastros")) || "Não existem usuários cadastrados"
    cadastros.splice(index, 1)
    localStorage.setItem("cadastros", JSON.stringify(cadastros))
    mostrarCadastros()
}

function mostrarCadastros (){
    const cadastros = localStorage.getItem("cadastros")  
    if(cadastros === null){
        document.getElementById("mostrarUsers").innerHTML = "Não existem usuários cadastrados"
        return
    }
    const usuariosCadastrados = JSON.parse(cadastros)
    if(!Array.isArray(usuariosCadastrados) || usuariosCadastrados.length === 0){
        document.getElementById("mostrarUsers").innerHTML = "Não existem usuários cadastrados"
        return
    }
    let lista = "<ul>"
    usuariosCadastrados.forEach((usuario, index) => {
        lista += `<li id = "exibirCadastros"> <p id ="usuarioNome">${usuario.nome}</p> <p id = "usuarioEmail">${usuario.email}</p> 
        <button id = "botaoDeletar" onclick="deletarCadastro(${index})">Deletar</button>
        <button id = "botaoEditar" onclick ="editarUsuario(${index})">Editar</button></li>`;
    }); 
    lista += "</ul>"
    console.log(document.getElementById("mostrarUsers"))
    document.getElementById("mostrarUsers").innerHTML = lista
}

function editarUsuario(index) {
    const nomeEdit = document.getElementById("campoNomeEdit");
    const emailEdit = document.getElementById("campoEmailEdit");
    const senhaEdit = document.getElementById("campoSenhaEdit");
    const form = document.getElementById("formsEdit")
    const users = document.getElementById("mostrarUsers")
    

    indiceAtual = index;
    console.log(nomeEdit)
    const styleDisplay = form.style.display;
    if (styleDisplay === "none" || styleDisplay === "") {
        
        form.style.display = "inline-block"
        users.style.display = "none";

        const usuariosCadastrados = JSON.parse(localStorage.getItem("cadastros"));
        const usuario = usuariosCadastrados[index];
        nomeEdit.value = usuario.nome;
        emailEdit.value = usuario.email;
        senhaEdit.value = usuario.senha;
    } else {
        form.style.display = "none"
        users.style.display = "inline-block";
    }
}

function salvarEdicao() {
    const nomeEdit = document.getElementById("campoNomeEdit").value;
    const emailEdit = document.getElementById("campoEmailEdit").value;
    const senhaEdit = document.getElementById("campoSenhaEdit").value;
    console.log(indiceAtual)
    if (nomeEdit && emailEdit && senhaEdit) {
        const usuariosCadastrados = JSON.parse(localStorage.getItem("cadastros"));
        
        if (usuariosCadastrados) {
            const usuarioEditado = new Usuario(nomeEdit, emailEdit, senhaEdit);
            usuariosCadastrados[indiceAtual] = usuarioEditado;
            console.log(usuariosCadastrados)
            localStorage.setItem("cadastros", JSON.stringify(usuariosCadastrados));

            mostrarCadastros();
            
            document.getElementById("campoNomeEdit").value = "";
            document.getElementById("campoEmailEdit").value = "";
            document.getElementById("campoSenhaEdit").value = "";
            
        }
    } else {
        alert("Preencha todos os campos para salvar a edição.");
    }
}



document.addEventListener("DOMContentLoaded", mostrarCadastros)

