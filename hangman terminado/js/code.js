let nombres = [
    ["V", "I", "E", "G", "O"],
    ["A", "K", "A", "L", "I"],
    ["Y", "A", "S", "U", "O"],
    ["T", "E", "E", "M", "O"],
    ["A", "M", "U", "M", "U"],
    ["A", "N", "N", "I", "E"],
    ["B", "A", "R", "D", "O"],
    ["B", "R", "I", "A", "R"],
    ["C", "O", "R", "K", "I"],
    ["D", "I", "A", "N", "A"]
];
let contadorWin=0;
let contadorlose=0;
let palabraActual = [];
let palabraOculta = [];
let intentosFallidos = 0;
let letrasUsadas = [];
let menuAcc=document.getElementById("tecla");

function funNuevaPartida() {
    palabraActual = nombres[Math.floor(Math.random() * nombres.length)];
    palabraOculta = Array(palabraActual.length).fill("_");
    intentosFallidos = 0;
    letrasUsadas = [];
    menuAcc.style.display="block";
    document.getElementById("letrasactuales").textContent = palabraOculta.join(" ");
    document.getElementById("mensaje").textContent = "";
    document.querySelectorAll("#imagenahorcado img").forEach(img => img.style.display = "none");
    actualizarFondo();
}

function funletra(letra) {
    letra = letra.toUpperCase();

    if (letrasUsadas.includes(letra)) {
        document.getElementById("mensaje").textContent = "Ya usaste esa letra, intenta otra.";
        return;
    }

    letrasUsadas.push(letra);
    let acierto = false;

    for (let i = 0; i < palabraActual.length; i++) {
        if (palabraActual[i] === letra) {
            palabraOculta[i] = letra;
            acierto = true;
        }
    }

    if (acierto) {
        document.getElementById("letrasactuales").textContent = palabraOculta.join(" ");
        if (!palabraOculta.includes("_")) {
            document.getElementById("mensaje").textContent = "¡Felicidades! Has ganado.";
            contadorWin++;
            document.getElementById("contWin").value=contadorWin;
            menuAcc.style.display="none";
            
        }
    } else {
        intentosFallidos++;
        mostrarParteCuerpo();
        if (intentosFallidos === 9) {
            document.getElementById("mensaje").textContent = "Lo siento, has perdido. La palabra era " + palabraActual.join("");
            contadorlose++;
            document.getElementById("contLose").value= contadorlose;
            menuAcc.style.display="none";
        }
    }
}

function mostrarParteCuerpo() {
    const partes = ["tronco1", "tronco2", "soga", "cabeza", "cuerpo", "brazoder", "brazoizq", "piernader", "piernaizq"];
    if (intentosFallidos <= partes.length) {
        document.getElementById(partes[intentosFallidos - 1]).style.display = "block";
    }
}
