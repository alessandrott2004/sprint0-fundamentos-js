import { menu, contarPlatos, agregarPlatoDemo } from './menu.js';
import {
  buscarPlatoPorNombre,
  filtrarStockBajo,
  obtenerResumenMenu,
  venderPlato,
  verificarEstadoGeneral,
  calcularEstadoPlato
} from './operaciones.js';

export function renderMenu() {
  const output = document.getElementById("output");
  const totalPlatos = contarPlatos();

  let html = "<ul>";

  for (let i = 0; i < menu.length; i++) {
    const plato = menu[i];
    const estado = calcularEstadoPlato(plato);
    html += `<li class="${estado}">${plato.nombre} — S/ ${plato.precio} — Stock: ${plato.stock}</li>`;
  }

  html += "</ul>";
  html += `Hay un total de ${totalPlatos} platos`;
  html += `<p><strong>${verificarEstadoGeneral()}</strong></p>`;
  output.innerHTML = html;
}

export function renderLista(titulo, listaDeTextos) {
  const output = document.getElementById("output");
  let html = `<h3>${titulo}</h3><ul>`;

  for (let i = 0; i < listaDeTextos.length; i++) {
    html += `<li>${listaDeTextos[i]}</li>`;
  }

  html += "</ul>";
  output.innerHTML = html;
}

export function mostrarMensaje(texto) {
  const output = document.getElementById("output");
  output.innerHTML = `<p>${texto}</p>`;
}

export function conectarEventos() {
  document.getElementById("btnMostrar").addEventListener("click", () => {
    renderMenu();
  });

  document.getElementById("btnAgregar").addEventListener("click", () => {
    const exito = agregarPlatoDemo();
    if (exito) {
      renderMenu();
    } else {
      renderLista("Aviso", ["Ese plato ya está en el menú"]);
    }
  });

  document.getElementById("btnBuscar").addEventListener("click", () => {
    const valor = document.getElementById("inputBuscar").value;
    const plato = buscarPlatoPorNombre(valor);
    if (!plato) {
      renderLista("Resultado de búsqueda", ["Plato no encontrado"]);
      return;
    }
    renderLista("Resultado de la búsqueda", [
      `${plato.nombre} - S/${plato.precio} - Stock: ${plato.stock}`
    ]);
  });

  document.getElementById("btnStockBajo").addEventListener("click", () => {
    const platos = filtrarStockBajo();
    if (platos.length === 0) {
      renderLista("Stock bajo", ["No hay platos con stock bajo"]);
      return;
    }
    renderLista("Stock bajo", platos.map(p => `${p.nombre} - Stock: ${p.stock}`));
  });

  document.getElementById("btnResumen").addEventListener("click", () => {
    renderLista("Resumen del menú", obtenerResumenMenu());
  });

  document.getElementById("btnVender").addEventListener("click", () => {
    const nombre   = document.getElementById("inputVenderNombre").value;
    const cantidad = Number(document.getElementById("inputVenderCantidad").value);
    const resultado = venderPlato(nombre, cantidad);

    if (resultado.ok) {
      renderLista("Venta exitosa", [resultado.mensaje]);
      renderMenu();
    } else {
      renderLista("Aviso", [resultado.mensaje]);
    }
  });
}
