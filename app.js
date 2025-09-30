// Clase Turno
class Turno {
  constructor(id, fecha, hora, servicio, mascota, duenio) {
    this.id = id;
    this.fecha = fecha;
    this.hora = hora;
    this.servicio = servicio;
    this.mascota = mascota;
    this.duenio = duenio; // dueño/a que reserva
    this.estado = "reservado";
  }

  // Resumen claro: servicio para la mascota, reservado por el dueño/a
  resumen() {
    return `Turno ${this.id}: ${this.mascota} tiene un ${this.servicio} el ${this.fecha} a las ${this.hora} (reservado por ${this.duenio}).`;
  }
}

// Servicios del spa (mock)
const servicios = [
  { id: 1, nombre: "Baño Premium",   duracion: "45 min" },
  { id: 2, nombre: "Spa Detox",       duracion: "60 min" },
  { id: 3, nombre: "Grooming Élite",  duracion: "75 min" }
];

// Turnos iniciales (mock)
let turnos = [
  new Turno(1, "2025-10-13", "10:00", "Baño Premium",   "Tomate (Perro)",  "Karen Fernandez"),
  new Turno(2, "2025-10-14", "11:00", "Spa Detox",      "Elmichi (Gato)",  "Sergio Medina"),
  new Turno(3, "2025-10-15", "12:00", "Grooming Élite", "Hernesto (Perro)","Agustin Tapia")
];

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

// --- <select> de servicios (form de alta) ---
function poblarServicios() {
  const sel = document.getElementById("servicio");
  if (!sel) return;
  sel.innerHTML =
    `<option value="">Elegí un servicio</option>` +
    servicios.map(s => `<option value="${s.nombre}">${s.nombre} (${s.duracion})</option>`).join("");
}

// Filtros
const filtros = { q: "", fecha: "", servicio: "" };

// Completar select de filtro con servicios
function poblarFiltroServicios() {
  const sel = document.getElementById("filtro-servicio");
  if (!sel) return;
  sel.innerHTML =
    '<option value="">Todos los servicios</option>' +
    servicios.map(s => `<option value="${s.nombre}">${s.nombre}</option>`).join("");
}

// Render el que acepta lista, si no, usa turnos)
function renderTurnos(lista = turnos) {
  const cont = document.getElementById("lista-turnos");
  if (!cont) return;
  cont.innerHTML = "";
  lista.forEach(t => {
    const div = document.createElement("div");
    div.className = "turno-card";
    div.innerHTML = `
      <strong>Mascota:</strong> ${t.mascota} <br>
      <strong>Servicio:</strong> ${t.servicio} <br>
      <strong>Dueño/a:</strong> ${t.duenio} <br>
      <strong>Fecha:</strong> ${t.fecha} a las ${t.hora} <br>
      <em>Estado: ${t.estado}</em>`;
    cont.appendChild(div);
  });
  if (!lista.length) {
    cont.innerHTML = `<p style="color:#b3b3b3">No hay turnos que coincidan.</p>`;
  }
}

// Se hacen los filtros y hace el re-render
function aplicarFiltros() {
  const q = filtros.q.toLowerCase();
  const lista = turnos.filter(t =>
    t.mascota.toLowerCase().includes(q) &&
    (!filtros.fecha || t.fecha === filtros.fecha) &&
    (!filtros.servicio || t.servicio === filtros.servicio)
  );
  renderTurnos(lista);
}

// Listeners para filtros
function setupFiltros() {
  const inputBuscar = document.getElementById("buscar");
  const inputFecha  = document.getElementById("filtro-fecha");
  const selServ     = document.getElementById("filtro-servicio");

  if (inputBuscar) inputBuscar.addEventListener("keyup",  e => { filtros.q = e.target.value; aplicarFiltros(); });
  if (inputFecha)  inputFecha.addEventListener("change",  e => { filtros.fecha = e.target.value; aplicarFiltros(); });
  if (selServ)     selServ.addEventListener("change",     e => { filtros.servicio = e.target.value; aplicarFiltros(); });
}

// --- manejo del form (este es el alta de turnos) ---
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
    const id = Date.now(); // id simple por ahora
    const nuevo = new Turno(id, fecha, hora, servicio, mascota, duenio);
    turnos.push(nuevo);
    guardarTurnos();

    // Re-render respetando filtros activos
    aplicarFiltros();
    form.reset();
    alert("¡Turno reservado!");
  });
}

// --- init (una única vez) ---
function init() {
  if (localStorage.getItem(STORAGE_KEY)) {
    cargarTurnos();
  } else {
    guardarTurnos(); // primer guardado de los mocks
  }

  poblarServicios();         // <select> del formulario
  poblarFiltroServicios();   // <select> del filtro
  setupFiltros();            // listeners de búsqueda/fecha/servicio
  aplicarFiltros();          // render inicial respetando filtros (vacíos)
  setupForm();               // alta de turnos
}
init();





