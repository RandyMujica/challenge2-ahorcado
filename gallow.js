function dibujarTablero() {
  tablero.lineWidth = 8;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#F3F5FC";
  tablero.strokeStyle = "#0A3871";
  tablero.fillRect(0, 0, 1200, 800);
  tablero.beginPath();
  tablero.moveTo(650, 500);
  tablero.lineTo(900, 500);
  tablero.stroke();
  tablero.closePath();
}

function dibujarLineas() {
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#0A3871";
  tablero.beginPath();
  let ancho = 600 / palabraSecreta.length;
  for (let i = 0; i < palabraSecreta.length; i++) {
    tablero.moveTo(500 + ancho * i, 640);
    tablero.lineTo(550 + ancho * i, 640);
  }
  tablero.stroke();
  tablero.closePath();
}
function escribirLetraCorrecta(index) {
  tablero.font = "bold 52px Inter";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#0A3871";
  let ancho = 600 / palabraSecreta.length;
  tablero.fillText(palabraSecreta[index], 505 + ancho * index, 620);
  tablero.stroke();
}

function escribirLetraIncorrecta(letra, errorsLeft) {
  tablero.lineWidth = 6;
  tablero.font = "bold 40px Inter";
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "#0A3871";
  tablero.fillText(letra, 535 + 40 * (10 - errorsLeft), 710, 40);
}

function dibujarAhorcado(puntaje) {
  tablero.lineWidth = 8;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.strokeStyle = "#0A3871";
  if (puntaje === 8) {
    //side post
    tablero.moveTo(700, 500);
    tablero.lineTo(700, 100);
  }
  if (puntaje === 7) {
    //top post
    tablero.moveTo(850, 100);
    tablero.lineTo(700, 100);
  }
  if (puntaje === 6) {
    //string
    tablero.moveTo(850, 100);
    tablero.lineTo(850, 171);
  }
  if (puntaje === 5) {
    //face
    tablero.moveTo(900, 230);
    tablero.arc(850, 230, 50, 0, Math.PI * 2);
  }
  if (puntaje === 4) {
    //for body
    tablero.moveTo(850, 389);
    tablero.lineTo(850, 289);
  }
  if (puntaje === 3) {
    //left leg
    tablero.moveTo(850, 389);
    tablero.lineTo(800, 450);
  }
  if (puntaje === 2) {
    //right leg
    tablero.moveTo(850, 389);
    tablero.lineTo(890, 450);
  }
  if (puntaje === 1) {
    //left arm
    tablero.moveTo(850, 330);
    tablero.lineTo(800, 389);
  }
  if (puntaje === 0) {
    //right arm
    tablero.moveTo(850, 330);
    tablero.lineTo(890, 389);
  }
  tablero.stroke();
  tablero.closePath();
}

function perdiste() {
  tablero.font = " bold 30px Inter";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "red";
  tablero.fillText("GAME OVER!", 930, 320);
  tablero.fillText("la palabra era:", 930, 360);
  tablero.fillText(palabraSecreta, 930, 400);
}

function ganaste() {
  tablero.font = "bold 42px Inter";
  tablero.lineWidth = 6;
  tablero.lineCap = "round";
  tablero.lineJoin = "round";
  tablero.fillStyle = "green";
  tablero.fillText("Felicidades!", 950, 320);
  tablero.fillText("Haz Ganado.", 930, 360);
  setTimeout(recargar, 1000);
}

function recargar() {
  location.reload();
}
