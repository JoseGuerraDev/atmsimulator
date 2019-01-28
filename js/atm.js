var soundE = new Audio()
soundE.src = '/audio/money.mp3'

var imagenes = [];
imagenes["500"] = "/images/billete500.png"
imagenes["200"] = "/images/billete200.png"
imagenes["100"] = "/images/billete100.png"
imagenes["50"] = "/images/billete50.png"
imagenes["20"] = "/images/billete20.png"
imagenes["10"] = "/images/billete10.png"
imagenes["5"] = "/images/billete5.png"
imagenes["2"] = "/images/moneda2.png"
imagenes["1"] = "/images/moneda1.png"

class Money {
    constructor(v, c) {
        this.valor = v;
        this.cantidad = c;
        this.imagen = new Image();
        this.imagen.src = imagenes[this.valor];
    }
}

var caja = [];
caja.push(new Money(500, 3))
caja.push(new Money(200, 3))
caja.push(new Money(100, 3))
caja.push(new Money(50, 3))
caja.push(new Money(20, 5))
caja.push(new Money(10, 5))
caja.push(new Money(5, 10))
caja.push(new Money(2, 10))
caja.push(new Money(1, 10))

contar();

var div = 0;
var papeles = 0;

var resultado = document.getElementById("resultado");
var b = document.getElementById("retirar");
b.addEventListener("click", entregarDinero);

function entregarDinero() {
    soundE.play()
    var dibujado = [];
    var t = document.getElementById("importe");
    importe = parseInt(t.value);
    if (total >= importe) {
        for (bi of caja) {
            if (importe > 0) {
                div = Math.floor(importe / bi.valor);
                if (div > bi.cantidad) {
                    papeles = bi.cantidad;
                } else {
                    papeles = div;
                }
                bi.cantidad = bi.cantidad - papeles;
                for (var i = 0; i < papeles; i++) {
                    dibujado.push(new Money(bi.valor, 1));
                }
                importe -= (bi.valor * papeles);
            }
        }
        if (importe == 0) {
            resultado.innerHTML += "<p>Se a retirado";
            for (var e of dibujado) {
                resultado.innerHTML += "<img src=" + e.imagen.src + " width='60' style='margin: 2px;'/>";
            }
            contar();
        } else {
            resultado.innerHTML += "<p>No tengo los billetes para esa suma, intenta otro valor";
        }

    } else {
        resultado.innerHTML += "<p>Saldo insuficiente";
    }
}

function contar() {
    total = 0
    for (var tot of caja) {
        total = total + tot.valor * tot.cantidad
    }
    saldo.innerHTML = total + ' €';
}