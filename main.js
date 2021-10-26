"use strict";

// const imagens = [
//     "img/ant-man_and.jpg",
//     "img/captain-america.jpg",
//     "img/deadpool.jpg",
//     "img/homem-de-ferro.jpg",
//     "img/hulk.jpg",
//     "img/loki.jpg",
//     "img/spiderman.jpg",
//     "img/wanda.jpg"
// ]


// const nomes = ["Marta", "Joao", "Mario"]
// const notas = [9, 7, 5]

// console.log(`o aluno ${nomes[0]} obteve a nota ${notas[1]}`)

// const aluno1 ={
//     'nome': 'mariana', 
//     'idade': 18, 
//     'nota': 6
// }

// console.log(`o aluno ${aluno1.nome} obteve a nota ${aluno1.nota}`)

// const alunos = [
//     {'nome': 'felipe', 'notas': [0, 5, 9]},
//     {'nome': 'Miguel', 'nota': 10},
//     {'nome': 'Joaquim', 'nota': 5}
// ]

// console.log(`o aluno ${alunos[0].nome} obteve a nota ${alunos[0].notas[1]}`)

const limparElementos = (elemento) => {
    while (elemento.firstChild){
        elemento.removeChild(elemento.lastChild)
    }
}

const pesquisarImagens = async (evento) =>{
    if(evento.key === 'Enter'){
        const filme = evento.target.value
        const url = `https://api.tvmaze.com/search/shows?q=${filme}`
        const imagensResposta = await fetch(url)
        if(imagensResposta.ok){
            const apimagens = await imagensResposta.json()
            console.log(apimagens)
            const nome = apimagens[0].show.name 
            const generos = apimagens[0].show.genres 
            const imagens = apimagens[0].show.image.original
            console.log(imagens)

            limparElementos(document.querySelector('.galeria-container'))
            limparElementos(document.querySelector('.slide-container'))
            criarItem(imagens, nome, generos)
            criarSlide(imagens)
        }
        else{
            alert('raça nao encontrada')
        }
    }
    
}

const filtrarId = (url) => {
    const ultimaBarra = url.lastIndexOf("/") + 1;
    const ultimoPonto = url.lastIndexOf('.')
    return url.substring(ultimaBarra, ultimoPonto)
}

const criarItem = (urlImagem, nomeFilme, genero) => {
    const container = document.querySelector(".galeria-container")
    const novolink = document.createElement("a")

    novolink.href = `#${filtrarId(urlImagem)}`
    novolink.classList.add("galeria-itens")
    container.innerHTML = `<h2>${nomeFilme}</h2>`
    novolink.innerHTML = `<img src="${urlImagem}" alt=""></img>`
    container.append(novolink);
    const novaDiv = document.createElement("div")
    novaDiv.innerHTML = `Generos: ${genero}`
    container.appendChild(novaDiv);
    // container.innerHTML += `<a href="#ant-man" class="galeria-itens">
    // <img src="${urlImagem}" alt="">
    // </a>`

}





const criarSlide = (urlImagem) => {
    const container = document.querySelector(".slide-container")
    const novaDiv = document.createElement("div")
    novaDiv.classList.add("slide")
    novaDiv.id = filtrarId(urlImagem)

    novaDiv.innerHTML = `
        <div class="imagem-container">
            <a href="" class="fechar">&#10006;</a>
            <img src="${urlImagem}" alt="">
        </div>
    `
    container.appendChild(novaDiv);


}


const carregarGaleria = (imgs) => imgs.forEach(criarItem)


document.querySelector('.pesquisa input')
    .addEventListener('keypress', pesquisarImagens)