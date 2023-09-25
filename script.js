class Usuario {
    constructor (nome, email, senha){
        this.nome = nome
        this.email = email
        this.senha = senha
    }
}

const usuarios = []

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
    console.log(usuarios)
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
    usuariosCadastrados.forEach((usuario,index)=>{
        lista += `<li> ${usuario.nome} ${usuario.email} <button onclick="deletarCadastro(${index})">Deletar</button> <button onclick="editar(${index})">Editar</button></li>`
    
    })
    lista += "</ul>"
    document.getElementById("mostrarUsers").innerHTML = lista
}

function editar(){
    const usuariosCadastrados = JSON.parse(cadastros)
    const 
}

document.addEventListener("DOMContentLoaded", mostrarCadastros)

