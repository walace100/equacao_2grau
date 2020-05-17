class Equacao{
    a = 0
    b = 0
    c = 0
    delta = undefined
    x1 = undefined
    x2 = undefined
    x1Fracao = undefined 
    x2Fracao =  undefined
    x1Raiz = undefined
    x2Raiz = undefined
    Xv = undefined
    Yv = undefined
    constructor(a, b, c){
        this.a = Number(a)
        this.b = Number(b)
        this.c = Number(c)
        if(a < 0){
            this.a *= -1
            this.b *= -1 
            this.c *= -1 
        }
        this.Delta()
        this.x()
        this.xv()
        this.yv()
        if(this.delta > 0 && this.x2 > this.x1){
            let x = this.x1
            this.x1 = this.x2
            this.x2 = x
        }
    }
    Delta(){
        this.delta = this.b**2 - 4 * this.a * this.c
    }
    x(){
        let a = this.a
        let b = this.b
        let delta = this.delta
        let x1 = 0
        let x2 = 0
        if(delta >= 0){
            x1 = (-b + Math.sqrt(delta))/(2*a)
            x2 = (-b - Math.sqrt(delta))/(2*a)
            this.x1 = !Number.isInteger(x1) ? Number( x1.toFixed(3)): x1
            this.x2 = !Number.isInteger(x2) ? Number(x2.toFixed(3)): x2
            x1 = this.DecimalParafracao(x1)
            this.x1Fracao = !Number.isInteger(x1) ? x1.total: x1 
            x2 = this.DecimalParafracao(x2)
            this.x2Fracao = !Number.isInteger(x2) ? x2.total: x2 
            if(!Number.isInteger(Math.sqrt(delta))){
                let resp
                x1 = {parte1: 0, parte2: '', total: ''} 
                x2 = {parte1: 0, parte2: '', total: ''}
                resp = this.DecimalParafracao(-b/(2*a))
                x1.parte1 = Number.isInteger(resp) ? resp: resp.total
                x2.parte1 = Number.isInteger(resp) ? resp: resp.total
                resp = this.simplificaRaiz(delta)
                if(typeof resp == 'number'){
                    x1.parte2 = `√${resp}/${2*a}`
                    x2.parte2 = `√${resp}/${2*a}`
                    x1.total = `${x1.parte1} + ${x1.parte2}`
                    x2.total = `${x2.parte1} - ${x2.parte2}`
                } else {
                    let resp2 = this.DecimalParafracao(resp.frente/(2*a))
                    if(resp2.cima == 1){
                        resp2.cima = ''
                    }
                    if(Number.isInteger(resp2)){
                        x1.parte2 = resp2 != 1 ? `${resp2}√${resp.sobra}`: `√${resp.sobra}`
                        x2.parte2 = resp2 != 1 ? `${resp2}√${resp.sobra}`: `√${resp.sobra}`
                    } else {
                        x1.parte2 = resp2 != 1 ? `${resp2.cima}√${resp.sobra}/${resp2.baixo}`: `√${resp.sobra}`
                        x2.parte2 = resp2 != 1 ? `${resp2.cima}√${resp.sobra}/${resp2.baixo}`: `√${resp.sobra}`
                    }
                    x1.total = `${x1.parte1} + ${x1.parte2}`
                    x2.total = `${x2.parte1} - ${x2.parte2}`
                }
                this.x1Raiz = x1.total
                this.x2Raiz = x2.total
            }
        } else {
            let resp
            x1 = {parte1: 0, parte2: '', total: ''}
            x2 = {parte1: 0, parte2: '', total: ''}
            delta *= -1
            resp = this.DecimalParafracao(-b/(2*a))
            x1.parte1 = Number.isInteger(resp) ? resp: resp.total
            resp = this.DecimalParafracao(-b/(2*a))
            x2.parte1 = Number.isInteger(resp) ? resp: resp.total
            resp = this.DecimalParafracao(Math.sqrt(delta)/(2*a))
            x1.parte2 = Number.isInteger(resp) ? `${resp}i`: `${resp.total}i`
            x2.parte2 = Number.isInteger(resp) ? `${resp}i`: `${resp.total}i`
            x1.total = `${x1.parte1} + ${x1.parte2 == '1i' ? 'i': x1.parte2}`
            x2.total = `${x1.parte1} - ${x2.parte2 == '1i' ? 'i': x2.parte2}`
            this.x1 = x1.total
            this.x2 = x2.total
            resp = this.simplificaRaiz(delta)
            if(typeof resp == 'number'){
                x1.parte2 = `√${resp}/${2*a}`
                x2.parte2 = `√${resp}/${2*a}`
                x1.total = `${x1.parte1} + ${x1.parte2}i`
                x2.total = `${x2.parte1} - ${x2.parte2}i`
            } else {
                let resp2 = this.DecimalParafracao(resp.frente/(2*a))
                if(resp2.cima == 1){
                    resp2.cima = ''
                }
                if(Number.isInteger(resp2)){
                    x1.parte2 = resp2 != 1 ? `${resp2}√${resp.sobra}i`: `√${resp.sobra}i`
                    x2.parte2 = resp2 != 1 ? `${resp2}√${resp.sobra}i`: `√${resp.sobra}i`
                } else {
                    x1.parte2 = resp2 != 1 ? `${resp2.cima}√${resp.sobra}i/${resp2.baixo}`: `√${resp.sobra}i`
                    x2.parte2 = resp2 != 1 ? `${resp2.cima}√${resp.sobra}i/${resp2.baixo}`: `√${resp.sobra}i`
                }
                x1.total = `${x1.parte1} + ${x1.parte2}`
                x2.total = `${x2.parte1} - ${x2.parte2}`
            }
            this.x1Raiz = x1.total
            this.x2Raiz = x2.total
        }
    }
    DecimalParafracao(x){
        if(!Number.isInteger(x)){
            let neg = false
            if(x < 0){
                neg = true
                x *= -1
            }
            let parteCima
            let parteBaixo
            if(x.toPrecision().length > 4){
                x = x.toFixed(3)
                parteCima = x*1000
                parteBaixo = 1000
            } else {
                x = x.toFixed(2)
                parteCima = x*100
                parteBaixo = 100
            } 
            parteCima = Math.round(parteCima)
            let total = {cima: parteCima, baixo: parteBaixo, total: `${parteCima}/${parteBaixo}`}
            for(let i = 2; i <= x*100; i++){
                do{
                    if(Number.isInteger(parteCima/i) && Number.isInteger(parteBaixo/i)){
                        parteCima /= i
                        parteBaixo /= i
                    }
                } while(Number.isInteger(parteCima/i) && Number.isInteger(parteBaixo/i))
                if(this.isPrimo(parteCima) || this.isPrimo(parteBaixo)){
                    break
                }
            }
            if(neg){
                total.cima = parteCima * -1
            } else {
                total.cima = parteCima
            }
            total.baixo = parteBaixo
            total.total = `${total.cima}/${parteBaixo}`
            return total
        } else {
            return x
        }
    }
    simplificaRaiz(raiz){
        const limite = raiz
        let total = {frente: 1, sobra: 1}
        let possivel = false 
        let cont = [] 
        if(!Number.isInteger(Math.sqrt(raiz))){
            for(let i = 0; i <= limite; i++){
                let teste = () => {
                    let resp
                    cont.forEach( e => {
                        if(e.numero != i){
                            resp = true 
                        } else {
                            resp = false 
                        }
                    })
                    return resp
                }
                if(raiz == 1){
                    break
                }
                do{
                    if(this.isPrimo(i) && Number.isInteger(raiz/i)){
                        if(cont.length == 0 || teste()){
                            cont.push({numero: i, vezes: 1})
                            raiz /= i
                        } else {
                            cont.forEach( e =>{
                                if(e.numero == i){
                                    e.vezes += 1
                                    raiz /= i
                                    if(e.vezes % 2 == 0){
                                        total.frente *= e.numero
                                        possivel = true
                                    }
                                }
                            })
                        }
                    }
                } while(Number.isInteger(raiz/i) && i >= 2)
            }
            if(!possivel){
                return limite
            } else {
                cont.forEach( e =>{
                    if(e.vezes % 2 == 1){
                        total.sobra *= e.numero
                    }
                })
                return total
            }
        } else if(!this.isPrimo(raiz)){
            return Math.sqrt(raiz)
        } else {
            return raiz
        }
    }
    isPrimo(x){
        if(x == 0)
            return false 
        let cont = 0
        for(let i = 0; i <= x; i++){
            if(Number.isInteger(x/i))
                cont++
        }
        if(cont == 2)
            return true 
        else 
            return false 
    }
    xv(){
        let a = this.a
        let b = this.b
        let xv = -b/(2*a)
        this.Xv = !Number.isInteger(xv) ? Number(xv.toFixed(2)): xv  
    }
    yv(){
        let a = this.a
        let delta = this.delta
        let yv = -delta/(4*a) == 0 ? delta/(4*a): -delta/(4*a)
        this.Yv = !Number.isInteger(yv) ? Number(yv.toFixed(2)): yv
    }
} 