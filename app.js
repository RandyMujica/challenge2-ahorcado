//declaration of variables
let pantalla = document.querySelector("canvas");
let nuevoJuego = (document.getElementById("boton-nuevo-juego").style.display =
  "none");
let SalirInvisible = (document.getElementById("boton-salir").style.display =
  "none");
let AgregarPalabra = (document.getElementById("agregar-palabra").style.display =
  "none");
let NuevoJuego = document.getElementById("boton-nuevo-juego");
let salir = document.getElementById("boton-salir");
let cancelar = document.getElementById("boton-cancelar");

var palabras = [
  "ESTUFA",
  "CABALLO",
  "PERRO",
  "TIGRE",
  "PELOTA",
  "GORRO",
  "TIBURON",
  "RAYO",
  "VERANO",
  "PLAYA",
];

var tablero = document.getElementById("horca").getContext("2d");
var palabraSecreta = "";
var letras = [];
var palabraAcertada = "";
var fallos = 8;
let letrasIncorrectas = [];
let numeroFallos = 8;
let letraElegida = [];

//event invocation onclick

document.getElementById("iniciar-juego").onclick = () => {
  iniciarJuego();
};

document.getElementById("boton-guardar").onclick = () => {
  guardarPalabra();
};

NuevoJuego.addEventListener("click", function () {
  location.reload();
});

salir.addEventListener("click", function () {
  location.reload();
});

cancelar.addEventListener("click", function () {
  location.reload();
});

// random word to unscramble
function elegirPalabra() {
  let palabra = palabras[Math.floor(Math.random() * palabras.length)];
  palabraSecreta = palabra;
  return palabra;
}

// keyboard event
function letraPulsada(key) {
  if (letras.length < 1 || letras.indexOf(key) < 0) {
    letras.push(key);
    return false;
  } else {
    letras.push(key);
    return true;
  }
}
//Add correct uppercase letter to the secret word
function agregarLetraCorrecta(i) {
  palabraAcertada += palabraSecreta[i].toUpperCase();
}
//Add incorrect capital letter and update counter
function agregarLetraIncorrecta(letter) {
  if (palabraSecreta.indexOf(letter) <= 0) {
    fallos -= 1;
  }
}

function finJuego(letra) {
  //check if the letter has been included in the array of correct or incorrect letters
  if (letraElegida.length < palabraSecreta.length) {
    //include the letters in the wrongletters list
    letrasIncorrectas.push(letra);

    //Check if he made the 8 allowed errors
    if (letrasIncorrectas.length > numeroFallos) {
      perdiste();
    }

    //add the letter, show the letter and draw the error
    else if (letraElegida.length < palabraSecreta.length) {
      agregarLetraIncorrecta(letra);
      escribirLetraIncorrecta(letra, fallos);
    }
  }
}

//Check if the user has won
function Ganado(letra) {
  letraElegida.push(letra.toUpperCase());
  if (letraElegida.length == palabraSecreta.length) {
    ganaste();
  }
}

//check if it is a letter
function verificarLetra(keyCode) {
  if (typeof keyCode === "number" && keyCode >= 65 && keyCode <= 90) {
    return true;
  } else {
    return false;
  }
}

function irAgregarPalabra() {
  document.getElementById("invisible").style.display = "none";
  document.getElementById("agregar-palabra").style.display = "block";
}

function guardarPalabra() {
  let nuevaPalabra = document.getElementById("input-nueva-palabra").value;

  if (nuevaPalabra !== "") {
    palabras.push(nuevaPalabra.toUpperCase());
    alert("Palabra agregada exitosamente");
    document.getElementById("agregar-palabra").style.display = "none";
    iniciarJuego();
  } else {
    alert("Por favor la palabra debe tener al menos una letra");
  }
}

//start the game
function iniciarJuego() {
  document.getElementById("invisible").style.display = "none";

  //calls the function that draws the hangman board
  dibujarTablero();

  //calls the function that sorts the word
  elegirPalabra();

  //calls the function that draws the lines of the number of letters
  dibujarLineas();
  document.getElementById("boton-nuevo-juego").style.display = "block";
  document.getElementById("boton-salir").style.display = "block";

  // capture the letter typed on the keyboard
  document.onkeydown = (e) => {
    let letra = e.key.toUpperCase();
    if (letrasIncorrectas.length <= numeroFallos) {
      if (!letraPulsada(e.key) && verificarLetra(e.keyCode)) {
        if (palabraSecreta.includes(letra)) {
          agregarLetraCorrecta(palabraSecreta.indexOf(letra));
          for (let i = 0; i < palabraSecreta.length; i++) {
            if (palabraSecreta[i] === letra) {
              escribirLetraCorrecta(i);
              Ganado(letra);
            }
          }
        }
        // if the user made more mistakes than are allowed,
        //calls the functions that draw the hangman and displays the game over message
        else {
          if (!letraPulsada(e.key) && !Ganado(letra)) return;
          dibujarAhorcado(fallos);
          finJuego(letra);
        }
      }
    }

    //if you keep touching letters the screen restarts
    else {
      location.reload();
    }
  };
}
