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

// --- storage ---
const STORAGE_KEY = "turnos_spa";

function guardarTurnos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(turnos));
}

function cargarTurnos() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  // reconstruye como Turno (para no perder métodos)
  turnos = data.map(t => new Turno(t.id, t.fecha, t.hora, t.servicio, t.mascota, t.duenio));
}

// --- <select> de servicios ---
function poblarServicios() {
  const sel = document.getElementById("servicio");
  if (!sel) return;
  sel.innerHTML = `<option value="">Elegí un servicio</option>` +
    servicios.map(s => `<option value="${s.nombre}">${s.nombre} (${s.duracion})</option>`).join("");
}

// --- manejo del form ---
function setupForm() {
  const form = document.getElementById("form-turno");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const mascota = document.getElementById("mascota").value.trim();
    const duenio  = document.getElementById("duenio").value.trim();
    const fecha   = document.getElementById("fecha").value;
    const hora    = document.getElementById("hora").value;
    const servicio= document.getElementById("servicio").value;

    // Validaciones 
    if (!mascota || !duenio || !fecha || !hora || !servicio) return alert("Completá todos los campos.");
    const hoy = new Date().toISOString().slice(0,10);
    if (fecha < hoy) return alert("Elegí una fecha futura.");

    // Evitar duplicar mismo fecha+hora
    const ocupado = turnos.some(t => t.fecha === fecha && t.hora === hora);
    if (ocupado) return alert("Ese horario ya está reservado.");

    // Crear y guardar
    const id = Date.now(); // id simple
    const nuevo = new Turno(id, fecha, hora, servicio, mascota, duenio);
    turnos.push(nuevo);
    guardarTurnos();
    renderTurnos();
    form.reset();
    alert("¡Turno reservado!");
  });
}

// --- init ( para que cuando cargue la página ande) ---
function init() {
  if (localStorage.getItem(STORAGE_KEY)) {
    cargarTurnos();
  } else {
    guardarTurnos(); 
  }
  poblarServicios();
  renderTurnos();
}

init();



