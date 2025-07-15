const ramos = {
  "1-1": [
    { nombre: "Introducción y Praxis de la Psicología", abre: ["Procesos Psicológicos Individuales y Relacionales"] },
    { nombre: "Constructivismo I: Conversaciones y Emociones", abre: ["Práctica Inicial"] },
    { nombre: "Psicobiología I", abre: ["Psicobiología II"] },
    { nombre: "Bases Socioantropológicas de la Psicología", abre: [] },
    { nombre: "Epistemología", abre: [] }
  ],
  "1-2": [
    { nombre: "Procesos Psicológicos Individuales y Relacionales", abre: [] },
    { nombre: "Psicobiología II", abre: [] },
    { nombre: "Enfoques Psicoanalítico y Humanista", abre: [] },
    { nombre: "Metodología Cuantitativa", abre: ["Análisis de Datos Cuantitativos"] },
    { nombre: "Certificación 1", abre: ["Certificación 2"] },
    { nombre: "Electivo 1", abre: ["Electivo 2"] }
  ],
  "2-1": [
    { nombre: "Psicología del Desarrollo I", abre: ["Psicología del Desarrollo II"] },
    { nombre: "Psicología Social I", abre: ["Psicología Social II"] },
    { nombre: "Psicología Cognitiva y Conductual", abre: [] },
    { nombre: "Psicología Sistémica", abre: [] },
    { nombre: "Análisis de Datos Cuantitativos", abre: ["Metodología Cualitativa"] },
    { nombre: "Electivo 2", abre: ["Electivo 3"] }
  ],
  "2-2": [
    { nombre: "Psicología del Desarrollo II", abre: [] },
    { nombre: "Psicología Social II", abre: [] },
    { nombre: "Práctica Inicial", abre: ["Constructivismo II: Entrevistas Psicológicas"] },
    { nombre: "Psicología de la Comunicación", abre: [] },
    { nombre: "Metodología Cualitativa", abre: ["Análisis de Datos Cualitativos"] },
    { nombre: "Electivo 3", abre: ["Electivo 4"] }
  ]
};

const estadoRamos = {};

function crearMalla() {
  const malla = document.getElementById("malla");

  for (const semestre in ramos) {
    const contenedor = document.createElement("div");
    contenedor.className = "semestre";
    contenedor.innerHTML = `<h2>Semestre ${semestre}</h2>`;

    ramos[semestre].forEach(ramo => {
      const div = document.createElement("div");
      div.className = "ramo bloqueado";
      div.textContent = ramo.nombre;

      div.addEventListener("click", () => aprobarRamo(ramo.nombre));

      estadoRamos[ramo.nombre] = {
        element: div,
        aprobado: false,
        requisitos: [],
        abre: ramo.abre
      };

      contenedor.appendChild(div);
    });

    malla.appendChild(contenedor);
  }

  for (const nombre in estadoRamos) {
    const data = estadoRamos[nombre];
    data.abre.forEach(destino => {
      if (estadoRamos[destino]) {
        estadoRamos[destino].requisitos.push(nombre);
      }
    });
  }

  for (const nombre in estadoRamos) {
    const data = estadoRamos[nombre];
    if (data.requisitos.length === 0) {
      data.element.classList.remove("bloqueado");
    }
  }
}

function aprobarRamo(nombre) {
  const data = estadoRamos[nombre];
  if (data.aprobado) return;
  data.aprobado = true;
  data.element.classList.add("aprobado");

  for (const otroNombre in estadoRamos) {
    const otro = estadoRamos[otroNombre];
    if (!otro.aprobado && otro.requisitos.includes(nombre)) {
      const todosAprobados = otro.requisitos.every(req => estadoRamos[req].aprobado);
      if (todosAprobados) {
        otro.element.classList.remove("bloqueado");
      }
    }
  }
}

document.addEventListener("DOMContentLoaded", crearMalla);
