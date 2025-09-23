// Clase Turno
class Turno {
  constructor(id, fecha, hora, servicio, mascota, duenio) {
    this.id = id;
    this.fecha = fecha;
    this.hora = hora;
    this.servicio = servicio;
    this.mascota = mascota;
    this.duenio = duenio;   // dueño/a que reserva
    this.estado = "reservado";
  }

  // Resumen claro: servicio para la mascota, reservado por el dueño/a
  resumen() {
    return `Turno ${this.id}: ${this.mascota} tiene un ${this.servicio} el ${this.fecha} a las ${this.hora} (reservado por ${this.duenio}).`;
  }
}

// Servicios del spa (mock)
const servicios = [
  { id: 1, nombre: "Baño Premium", duracion: "45 min" },
  { id: 2, nombre: "Spa Detox", duracion: "60 min" },
  { id: 3, nombre: "Grooming Élite", duracion: "75 min" }
];

// Turnos iniciales (mock)
let turnos = [
  new Turno(1, "2025-09-13", "10:00", "Baño Premium",   "Tomate (Perro)",  "Karen Fernandez"),
  new Turno(2, "2025-09-14", "11:00", "Spa Detox",      "Elmichi (Gato)", "Sergio Medina"),
  new Turno(3, "2025-09-15", "12:00", "Grooming Élite", "Hernesto (perro)","Agustin Tapia")
];

// Render de turnos en pantalla
function renderTurnos() {
  const contenedor = document.getElementById("lista-turnos");
  if (!contenedor) return;
  contenedor.innerHTML = "";

  turnos.forEach(t => {
    const div = document.createElement("div");
    div.className = "turno-card";
    div.innerHTML = `
      <strong>Mascota:</strong> ${t.mascota} <br>
      <strong>Servicio:</strong> ${t.servicio} <br>
      <strong>Dueño/a:</strong> ${t.duenio} <br>
      <strong>Fecha:</strong> ${t.fecha} a las ${t.hora} <br>
      <em>Estado: ${t.estado}</em>
    `;
    contenedor.appendChild(div);
  });
}



renderTurnos();


