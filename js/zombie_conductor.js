// Los zombies conductores manejan los trenes. Heredan las mismas propiedades que el objeto Enemigo y se le suma "dirección"

var ZombieConductor = function(sprite, x, y, ancho, alto, velocidad, direccion, rangoMov) {
  Enemigo.call(this, sprite, x, y, ancho, alto, velocidad, rangoMov);
  this.direccion = direccion;
}

ZombieConductor.prototype = Object.create(Enemigo.prototype);
ZombieConductor.prototype.constructor = ZombieConductor;

//Mueve a los zombies de forma horizontal o vertical
ZombieConductor.prototype.mover = function() {
  if (this.direccion == "v") {
      this.y += this.velocidad;
  } else if (this.direccion == "h") {
      this.x += this.velocidad;
  }
  
// Si llega a un extremo rebota en dirección contraria
  if ((this.x < this.rangoMov.desdeX) || (this.x > this.rangoMov.hastaX)){
    this.velocidad *= -1;
  }
  if ((this.y < this.rangoMov.desdeY) || (this.y > this.rangoMov.hastaY)) {
    this.velocidad *= -1;
  }
}

// Las coaliciones con los trenes le sacan al jugador todas las vidas
ZombieConductor.prototype.atacar = function(jugador){
  jugador.perderVidas(5)
}

