function calcular() {
    const a = Number(document.querySelector('#a').value)
    const b = Number(document.querySelector('#b').value)
    const c = Number(document.querySelector('#c').value)
    if (a == '' || b == '' || c == '') {
        $('#dadosError').show()
        return
    }
    const div = document.querySelector('.container-fluid')
    const body = document.querySelector('#divSaida')
    let escreva = document.createElement('div')
    if (document.querySelector('#saida') != null) {
        const remover = div.removeChild(document.querySelector('#saida'))
    }
    if (document.querySelector('canvas') != null) {
        const remover = body.removeChild(document.querySelector('canvas'))
    }
    const formula = `${a == 0 ? '' : a == 1 ? 'x²' : a == -1 ? '-x²' : `${a}x²`} ${b != 0 ? b > 0 ? '+' : '' : ''} ${b == 0 ? '' : b == 1 ? 'x' : a == -1 ? '-x' : `${b}x`} ${c != 0 ? c > 0 ? '+' : '' : ''} ${c == 0 ? '' : c} = 0`
    const equacao = new Equacao(a, b, c)
    escreva.setAttribute('id', 'saida')
    escreva.innerHTML = `<h5 class="text-center">Resultado<h5>`
    escreva.innerHTML += `Equação: <strong>${formula}</strong><br>`
    escreva.innerHTML += `Valor de X<small>1</small>: <strong>${equacao.x1}</strong><br>`
    escreva.innerHTML += `Valor de X<small>2</small>: <strong>${equacao.x2}</strong><br>`
    escreva.innerHTML += `Delta: <strong>${equacao.delta}</strong><br>`
    if (typeof equacao.x1Fracao != 'undefined' && !Number.isInteger(equacao.x1Fracao)) {
        escreva.innerHTML += `Fração de X<small>1</small>: <strong>${equacao.x1Fracao}</strong><br>`
    }
    if (typeof equacao.x2Fracao != 'undefined' && !Number.isInteger(equacao.x2Fracao)) {
        escreva.innerHTML += `Fração de X<small>2</small>: <strong>${equacao.x2Fracao}</strong><br>`
    }
    if (typeof equacao.x1Raiz != 'undefined' && !Number.isInteger(equacao.x1Raiz)) {
        escreva.innerHTML += `Raiz simplificada de X<small>1</small>: <strong>${equacao.x1Raiz}</strong><br>`
    }
    if (typeof equacao.x2Raiz != 'undefined' && !Number.isInteger(equacao.x2Fracao)) {
        escreva.innerHTML += `Raiz simplificada de X<small>2</small>: <strong>${equacao.x2Raiz}</strong><br>`
    }
    escreva.innerHTML += `<h6 class="text-center">Para Uso do Gráfico</h6>`
    escreva.innerHTML += `X do vértice: <strong>${equacao.Xv}</strong><br>`
    escreva.innerHTML += `Y do vértice: <strong>${equacao.Yv}</strong><br>`
    div.appendChild(escreva)
    document.querySelector('.rodapeFixo').classList.remove('rodapeFixo')
}
function registro() {
    if (document.querySelector('#nome').value == '' || document.querySelector('#email').value == '' || document.querySelector('#senha').value == '' || document.querySelector('#confirm').value == '') {
        $('#dadosError').show()
        $('#meumodal').modal('toggle')
        return
    }
    let senha
    let confirmacao
    let email
    let confirm = false
    let user = []
    let nome = document.querySelector('#nome').value
    if (!localStorage.login || !localStorage.user) {
        localStorage.login = JSON.stringify(false)
        localStorage.link = 'index.html'
        localStorage.user = JSON.stringify([{ nome: 'admin', email: 'admin@gmail.com', senha: '123', logado: false, ultimaPag: 'index.html'}])
    } else {
        user = JSON.parse(localStorage.user)
    }
    document.querySelector('#senha').type = 'text'
    document.querySelector('#confirm').type = 'text'
    senha = document.querySelector('#senha').value
    confirmacao = document.querySelector('#confirm').value
    document.querySelector('#senha').type = 'password'
    document.querySelector('#confirm').type = 'password'
    email = document.querySelector('#email').value
    for (let i in user) {
        if (email == user[i].email) {
            confirm = false
            $('#emailError').show()
            $('#meumodal').modal('toggle')
            break
        } else {
            confirm = true
        }
    }
    if (confirm) {
        if (senha != confirmacao) {
            confirm = false
            $('#senhaError').show()
            $('#meumodal').modal('toggle')
        }
    }
    if (confirm) {
        document.querySelector('#nome').value = ''
        document.querySelector('#email').value = ''
        document.querySelector('#senha').value = ''
        document.querySelector('#confirm').value = ''
        user.push({ nome: nome, email: email, senha: confirmacao, logado: true, ultimaPag: 'index.html'})
        localStorage.user = JSON.stringify(user)
        localStorage.login = JSON.stringify(true)
        location.href = localStorage.link
    }
}
function login() {
    if (!localStorage.login) {
        localStorage.login = JSON.stringify(false)
        localStorage.user = JSON.stringify([{ nome: 'admin', email: 'admin@gmail.com', senha: '123', logado: false, ultimaPag: 'index.html' }])
    }
    if(!localStorage.link) 
        localStorage.link = 'index.html'
    if (document.querySelector('#emailLogin').value == '' || document.querySelector('#senhaLogin').value == '') {
        $('#dadosError').show()
        return
    }
    document.querySelector('#senhaLogin').type = 'text'
    let senha = document.querySelector('#senhaLogin').value
    document.querySelector('#senhaLogin').type = 'password'
    let email = document.querySelector('#emailLogin').value
    let LSuser = JSON.parse(localStorage.user)
    let confirm = false
    for (let i in LSuser) {
        if (LSuser[i].senha == senha && LSuser[i].email == email) {
            localStorage.login = JSON.stringify(true)
            LSuser[i].logado = true
            localStorage.user = JSON.stringify(LSuser)
            document.querySelector('#emailLogin').value = ''
            confirm = true
            location.href = localStorage.link
            break
        } else {
            confirm = false
        }
    }
    if (!confirm) {
        localStorage.login = JSON.stringify(false)
        $('#dadosError').show()
    }
}
function raizTotal() {
    const div = document.querySelector('.container-fluid')
    if (document.querySelector('#saida') != null) {
        const remover = div.removeChild(document.querySelector('#saida'))
    }
    let valor = document.querySelector('#raiz').value
    if (valor == '') {
        $('#dadosError').show()
        return
    }
    let neg = false
    if (valor < 0) {
        neg = true
        valor *= -1
    }
    const raiz = new Equacao(1, 1, 1)
    let escreva = document.createElement('div')
    escreva.setAttribute('id', 'saida')
    let resp = raiz.simplificaRaiz(valor)
    if (!Number.isInteger(Number(resp))) {
        if (neg) {
            resp = `${resp.frente}√${resp.sobra}i`
        } else {
            resp = `${resp.frente}√${resp.sobra}`
        }
    } else {
        if (neg) {
            resp += 'i'
        }
    }
    escreva.innerHTML = `<h5 class="text-center">Resultado<h5>`
    escreva.innerHTML += `Valor da radicando: <strong>${neg ? valor *= -1 : valor}</strong><br>`
    escreva.innerHTML += `Valor da raiz: <strong>${resp}</strong>`
    div.appendChild(escreva)
    document.querySelector('#raiz').value = ''
}
function decimal() {
    const div = document.querySelector('.container-fluid')
    if (document.querySelector('#saida') != null) {
        const remover = div.removeChild(document.querySelector('#saida'))
    }
    const valor = document.querySelector('#num').value
    if (valor == '') {
        $('#dadosError').show()
        return
    }
    const decimal = new Equacao(1, 1, 1)
    let escreva = document.createElement('div')
    escreva.setAttribute('id', 'saida')
    let resp = decimal.DecimalParafracao(Number(valor))
    if (!Number.isInteger(Number(valor))) {
        resp = resp.total
    }
    escreva.innerHTML = `<h5 class="text-center">Resultado<h5>`
    escreva.innerHTML += `Valor do número: <strong>${valor}</strong><br>`
    escreva.innerHTML += `Valor em fração: <strong>${resp}</strong>`
    div.appendChild(escreva)
    document.querySelector('#num').value = ''
}
function isPage(page = "index.html"){
    if(location.pathname.split('/')[2] == '' || location.href.split('#').join('').split('/').indexOf(page) != -1 && location.protocol != 'http:' && location.protocol != 'https:'){
        return true
    } else if(location.pathname.split('/')[2] == page){
        return true
    } else {
        return false
    }
}
addEventListener('load', () => {
    if (localStorage.login == 'true' && !isPage("login.html")) {
        document.querySelector('#login').innerHTML = `<button class="btn btn-outline-success my-2 my-sm-0" onclick="javascript:
        window.location.href = 'index.html';
        localStorage.login = false; localStorage.link = 'index.html';
        let a = JSON.parse(localStorage.user); a.forEach( (e, i) =>{
            if(e.logado == true){
                a[i].logado = false; localStorage.user = JSON.stringify(a)
            }
        });">Sair</button>`
        document.querySelector('#rodapeSair').innerHTML = `<a href='#' class="text-white" onclick="javascript:
        window.location.href = 'index.html';
        localStorage.login = false;
        localStorage.link = 'index.html';
        let a = JSON.parse(localStorage.user);
        a.forEach( (e, i) =>{
            if(e.logado == true){
                a[i].logado = false;
                localStorage.user = JSON.stringify(a)
            }
        });">Sair</a>`
        if(isPage()){
            let user = JSON.parse(localStorage.user)
            let nome
            let ultimaPag
            user.forEach(e => {
                if (e.logado == true) {
                    nome = e.nome
                    ultimaPag = e.ultimaPag
                }
            })
            document.querySelector('#nomeTitulo').innerHTML = `Bem Vindo, ${nome}!`
            if (ultimaPag != 'index.html') {
                let p = document.createElement('p')
                p.innerHTML = `Deseja voltar para a última página visitada? clique <a href="${ultimaPag}" style="color: green;">aqui</a>`
                let pIrmao = document.querySelector('#pIrmao')
                let pai = pIrmao.parentNode
                pai.insertBefore(p, pIrmao)
            }
        }
    }
	if (localStorage.login == 'true' && isPage("login.html")) {
        let user = JSON.parse(localStorage.user)
	       user.forEach((e, i) => {
	           if (e.logado == true) {
	            	user[i].logado = false
	         	}
	        })
	    localStorage.user = JSON.stringify(user)
	    localStorage.login = false
	}
	if (!localStorage.getItem('login') && localStorage.login == 'false' && !isPage("login.html") && !isPage()){
	    location.href = 'login.html'
	}
})

function verificacao(link2 = 'index.html') {
    if (localStorage.login != 'true') {
        if (!isPage("login")) {
            localStorage.link = link2
            location.href = 'login.html'
        }
    } else {
        let user = JSON.parse(localStorage.user)
        if (isPage(link2)) {
            if (link2 != 'index.html') {
                user.forEach((e, i) => {
                    if (e.logado == true) {
                        user[i].ultimaPag = link2
                    }
                })
            }
            localStorage.user = JSON.stringify(user)
            location.href = link2
        }
    }
}