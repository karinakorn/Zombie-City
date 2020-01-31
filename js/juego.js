/* El objeto Juego sera el encargado del control de todo el resto de los Objetos
existentes.
Le dara ordenes al Dibujante para que dibuje entidades en la pantalla. Cargara
el mapa, chequeara colisiones entre los objetos y actualizara sus movimientos
y ataques. */

var Juego = {
  anchoCanvas: 961,
  altoCanvas: 577,
  jugador: Jugador,
  vidasInicial: Jugador.vidas,
  ganador: false,

  obstaculosCarretera: [
    // Vallas
    new Obstaculo('imagenes/valla_horizontal.png', 70, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 100, 430, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 800, 200, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 770, 200, 30, 30, 1),
    new Obstaculo('imagenes/valla_horizontal.png', 800, 450, 30, 30, 1),
    new Obstaculo('imagenes/valla_vertical.png', 390, 390, 30, 30, 1),
    // Baches
    new Obstaculo('imagenes/bache.png', 310, 400, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 200, 490, 30, 30, 1),
    new Obstaculo('imagenes/bache.png', 850, 400, 30, 30, 1),
    // Autos
    new Obstaculo('imagenes/auto_verde_abajo.png', 500, 400, 15, 30, 2),
    new Obstaculo('imagenes/auto_verde_abajo.png', 320, 200, 15, 30, 2)

  ],

  bordes: [
    // Bordes
    new Obstaculo('', 0, 5, 961, 18, 0),
    new Obstaculo('', 0, 559, 961, 18, 0),
    new Obstaculo('', 0, 5, 18, 572, 0),
    new Obstaculo('', 943, 5, 18, 572, 0),
    // Veredas
    new Obstaculo('', 18, 23, 51, 536, 2),
    new Obstaculo('', 69, 507, 690, 52, 2),
    new Obstaculo('', 587, 147, 173, 360, 2),
    new Obstaculo('', 346, 147, 241, 52, 2),
    new Obstaculo('', 196, 267, 263, 112, 2),
    new Obstaculo('', 196, 23, 83, 244, 2),
    new Obstaculo('', 279, 23, 664, 56, 2),
    new Obstaculo('', 887, 79, 56, 480, 2)
  ],

  enemigos: [
    new ZombieCaminante('imagenes/zombie1.png', 300, 300, 10, 10, 2, {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 577
    }),
    new ZombieCaminante('imagenes/zombie1.png', 509, 180, 10, 10, 2, {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 577
    }),
    new ZombieCaminante('imagenes/zombie1.png', 300, 300, 10, 10, 2, {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 577
    }),
    new ZombieCaminante('imagenes/zombie1.png', 700, 90, 10, 10, 2, {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 577
    }),
    new ZombieCaminante('imagenes/zombie1.png', 600, 220, 10, 10, 2, {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 577
    }),
    new ZombieCaminante('imagenes/zombie1.png', 800, 100, 10, 10, 2, {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 577
    }),
    new ZombieCaminante('imagenes/zombie4.png', 780, 380, 10, 10, 3, {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 577
    }),
    new ZombieConductor('imagenes/tren_vertical.png', 644, 0, 30, 90, 2.5, "v", {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 470
    }),
    new ZombieConductor('imagenes/tren_vertical.png', 678, 0, 30, 90, 2, "v", {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 470
    }),
    new ZombieConductor('imagenes/tren_horizontal.png', 0, 322, 90, 30, 2, "h", {
      desdeX: 0,
      hastaX: 961,
      desdeY: 0,
      hastaY: 500
    }),

  ]

}

// Se cargan los recursos de las imagenes para tener un facil acceso a ellos.
Juego.iniciarRecursos = function () {
  Resources.load([
    'imagenes/mapa.png',
    'imagenes/mensaje_gameover.png',
    'imagenes/Splash.png',
    'imagenes/bache.png',
    'imagenes/tren_horizontal.png',
    'imagenes/tren_vertical.png',
    'imagenes/valla_horizontal.png',
    'imagenes/valla_vertical.png',
    'imagenes/zombie1.png',
    'imagenes/zombie2.png',
    'imagenes/zombie3.png',
    'imagenes/zombie4.png',
    'imagenes/auto_rojo_abajo.png',
    'imagenes/auto_rojo_arriba.png',
    'imagenes/auto_rojo_derecha.png',
    'imagenes/auto_rojo_izquierda.png',
    'imagenes/auto_verde_abajo.png',
    'imagenes/auto_verde_derecha.png'
  ]);
  Resources.onReady(this.comenzar.bind(Juego));
};

// Agrega los bordes de las veredas a los obstaculos de la carretera
Juego.obstaculos = function () {
  return this.obstaculosCarretera.concat(this.bordes);
};


Juego.comenzar = function () {
  // Inicializar el canvas del juego
  Dibujante.inicializarCanvas(this.anchoCanvas, this.altoCanvas);
  /* Actualiza los movimientos y el pintado de la pantalla. Sera el encargado de calcular los
  ataques, colisiones, etc*/
  this.buclePrincipal();
};


Juego.buclePrincipal = function () {
  // Actualiza la logica del juego, tanto ataques como movimientos
  this.update();
  // Funcion que dibuja por cada fotograma a los objetos en pantalla.
  this.dibujar();
  // Llama a la funcion Juego.buclePrincipal() repetidas veces
  window.requestAnimationFrame(this.buclePrincipal.bind(this));
};


Juego.update = function () {
  this.calcularAtaques();
  this.moverEnemigos();
}


/* Captura las teclas y si coincide con alguna de las flechas tiene que
hacer que el jugador principal se mueva */
Juego.capturarMovimiento = function (tecla) {
  var movX = 0;
  var movY = 0;
  var velocidad = this.jugador.velocidad;
  // El movimiento esta determinado por la velocidad del jugador
  if (tecla == 'izq') {
    movX = -velocidad;
  }
  if (tecla == 'arriba') {
    movY = -velocidad;
  }
  if (tecla == 'der') {
    movX = velocidad;
  }
  if (tecla == 'abajo') {
    movY = velocidad;
  }
  this.jugador.orientacion(tecla);
  // Si se puede mover hacia esa posicion hay que hacer efectivo este movimiento
  if (this.chequearColisiones(movX + this.jugador.x, movY + this.jugador.y)) {
    this.jugador.movimientos(movX, movY);
    console.log("movY", movY)

  }
};


Juego.dibujar = function () {
  // Borrar el fotograma actual
  Dibujante.borrarAreaDeJuego();
  //Se pinta la imagen de fondo segun el estado del juego
  this.dibujarFondo();
  if (this.terminoJuego() || this.ganoJuego()) {
    return;
  }
  //Dibuja al jugador principal 
  Dibujante.dibujarEntidad(Jugador);
  // Se recorren los obstaculos de la carretera pintandolos
  this.obstaculosCarretera.forEach(function (obstaculo) {
    Dibujante.dibujarEntidad(obstaculo);
  });
  // Se recorren los enemigos pintandolos
  this.enemigos.forEach(function (enemigo) {
    Dibujante.dibujarEntidad(enemigo);
  });
  // El dibujante dibuja las vidas del jugador
  var tamanio = this.anchoCanvas / this.vidasInicial;
  Dibujante.dibujarRectangulo('white', 0, 0, this.anchoCanvas, 8);
  for (var i = 0; i < this.jugador.vidas; i++) {
    var x = tamanio * i
    Dibujante.dibujarRectangulo('red', x, 0, tamanio, 8);
  }
  // Dibuja la línea de llegada
  Dibujante.dibujarRectangulo("yellow", 758, 540, 130, 20)
};


// Recorre los enemigos haciendo que se muevan
Juego.moverEnemigos = function () {
  this.enemigos.forEach(function (enemigo) {
    enemigo.mover();
  })
};

/* Recorre los enemigos para ver cual esta colisionando con el jugador
Si colisiona empieza el ataque el zombie, si no, deja de atacar. */
Juego.calcularAtaques = function () {
  this.enemigos.forEach(function (enemigo) {
    if (this.intersecan(enemigo, this.jugador, this.jugador.x, this.jugador.y)) {
      enemigo.comenzarAtaque(this.jugador);
    } else {
      enemigo.dejarDeAtacar();
    }
  }, this);
};


// Chequea si el jugador se peude mover a la posicion destino.
Juego.chequearColisiones = function (x, y) {
  var puedeMoverse = true
  this.obstaculos().forEach(function (obstaculo) {
    if (this.intersecan(obstaculo, this.jugador, x, y)) {
      obstaculo.chocar(this.jugador);
      puedeMoverse = false
    }
  }, this)
  return puedeMoverse
};

/* Este metodo chequea si los elementos 1 y 2 si cruzan en x e y
 x e y representan la coordenada a la cual se quiere mover el elemento2*/
Juego.intersecan = function (elemento1, elemento2, x, y) {
  var izquierda1 = elemento1.x
  var derecha1 = izquierda1 + elemento1.ancho
  var techo1 = elemento1.y
  var piso1 = techo1 + elemento1.alto
  var izquierda2 = x
  var derecha2 = izquierda2 + elemento2.ancho
  var techo2 = y
  var piso2 = y + elemento2.alto

  return ((piso1 >= techo2) && (techo1 <= piso2) &&
    (derecha1 >= izquierda2) && (izquierda1 <= derecha2))
};

Juego.dibujarFondo = function () {
  // Si se termino el juego muestra el mensaje de game over de fondo
  if (this.terminoJuego()) {
    Dibujante.dibujarImagen('imagenes/mensaje_gameover.png', 0, 5, this.anchoCanvas, this.altoCanvas);
    document.getElementById('reiniciar').style.visibility = 'visible';
  }
  // Si se gano el juego se muestra el mensaje de ganoJuego de fondo
  else if (this.ganoJuego()) {
    Dibujante.dibujarImagen('imagenes/Splash.png', 190, 113, 500, 203);
    document.getElementById('reiniciar').style.visibility = 'visible';
  } else {
    Dibujante.dibujarImagen('imagenes/mapa.png', 0, 5, this.anchoCanvas, this.altoCanvas);
  }
};

Juego.terminoJuego = function () {
  return this.jugador.vidas <= 0;
};

/* Se gana el juego si se sobre pasa cierto altura y */
Juego.ganoJuego = function () {
  return (this.jugador.y + this.jugador.alto) > 530;
};

Juego.iniciarRecursos();

// Activa las lecturas del teclado al presionar teclas
document.addEventListener('keydown', function (e) {
  var allowedKeys = {
    37: 'izq',
    38: 'arriba',
    39: 'der',
    40: 'abajo'
  };

  Juego.capturarMovimiento(allowedKeys[e.keyCode]);
});