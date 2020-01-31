
var Jugador = {
 
  sprite: 'imagenes/auto_rojo_abajo.png',
  x: 130,
  y: 160,
  ancho: 15,
  alto: 30,
  velocidad: 10,
  vidas: 5,
  
  movimientos: function(movX, movY){
    this.x += movX;
    this.y += movY;
  },
  orientacion: function(tecla){
    if (tecla == 'izq') {
      this.sprite = 'imagenes/auto_rojo_izquierda.png';
      this.ancho = 30;
      this.alto = 15;   
    }
    if (tecla == 'arriba') {
      this.sprite = 'imagenes/auto_rojo_arriba.png';
      this.ancho = 15;
      this.alto = 30;    
    }
    if (tecla == 'der') {
      this.sprite = 'imagenes/auto_rojo_derecha.png';
      this.ancho = 30;
      this.alto = 15;
    }
    if (tecla == 'abajo') {
      this.sprite = 'imagenes/auto_rojo_abajo.png';
      this.ancho = 15;
      this.alto = 30;
    }
  },
  perderVidas(cantVidas){
    this.vidas -= cantVidas;
  }
}
