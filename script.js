class Usuario {
    constructor (nome, email, senha){
        this.nome = nome
        this.email = email
        this.senha = senha
    }
}

const usuarios = []

var indiceAtual = -1

function adicionarUsuario (){
    const nome = document.getElementById("campoNome").value
    const email = document.getElementById("campoEmail").value
    const senha = document.getElementById("campoSenha").value
    if(nome && email && senha){
        const novoUsuario = new Usuario(nome, email, senha)
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
        lista += `<li> <p>${usuario.nome}</p> <p>${usuario.email}</p> 
        <button onclick="deletarCadastro(${index})">Deletar</button>
        <button id = "botaoEditar" onclick ="editarUsuario(${index})">Editar</button></li>`;
    }); 
    lista += "</ul>"
    document.getElementById("mostrarUsers").innerHTML = lista
}

function editarUsuario(index) {
    const nomeEdit = document.getElementById("campoNomeEdit");
    const labelNome = document.getElementById("labelCampoNome");
    const emailEdit = document.getElementById("campoEmailEdit");
    const labelEmail = document.getElementById("labelCampoEmail");
    const senhaEdit = document.getElementById("campoSenhaEdit");
    const labelSenha = document.getElementById("labelCampoSenha");
    const botaoEditar = document.getElementById("botaoEditar");
    const botaoSalvar = document.getElementById("botaoSalvar");

    indiceAtual = index;
    console.log(nomeEdit)
    const styleDisplay = nomeEdit.style.display;
    if (styleDisplay === "none" || styleDisplay === "") {
        console.log("llaala")
        nomeEdit.style.display = "inline-block";
        labelNome.style.display = "inline-block";
        emailEdit.style.display = "inline-block";
        labelEmail.style.display = "inline-block";
        senhaEdit.style.display = "inline-block";
        labelSenha.style.display = "inline-block";
        botaoEditar.style.display = "none";
        botaoSalvar.style.display = "inline-block";

        const usuariosCadastrados = JSON.parse(localStorage.getItem("cadastros"));
        const usuario = usuariosCadastrados[index];
        nomeEdit.value = usuario.nome;
        emailEdit.value = usuario.email;
        senhaEdit.value = usuario.senha;
    } else {
        nomeEdit.style.display = "none";
        labelNome.style.display = "none"
        emailEdit.style.display = "none";
        labelEmail.style.display = "none";
        senhaEdit.style.display = "none";
        labelSenha.style.display = "none";
        botaoEditar.style.display = "inline-block";
        botaoSalvar.style.display = "none";
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

