// Clase Turno
class Turno {
    constructor(id, fecha, hora, servicio, mascota, cliente) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.servicio = servicio;
        this.mascota = mascota;
        this.cliente = cliente;
        this.estado = "reservado";
    }

    // Para ver un resumen del turno
    resumen() {
        return `Turno ${this.id} - ${this.mascota} (${this.servicio}) con ${this.cliente} el ${this.fecha} a las ${this.hora}`;
    }
}

// Para ver si la consola anda (BORRAR despues)
const turnoEjemplo = new Turno(1, "2025-09-20", "10:00", "Baño Premium", "Firulais", "Carelis");
console.log(turnoEjemplo.resumen());
