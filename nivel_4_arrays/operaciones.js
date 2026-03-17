import { menu } from './menu.js';

// Día 8 — Clase de error personalizada
export class ErrorNegocio extends Error {
  constructor(mensaje) {
    super(mensaje);
    this.name = "ErrorNegocio";
  }
}

export function buscarPlatoPorNombre(nombre) {
  return menu.find(p =>
    p.nombre.toLowerCase() === nombre.toLowerCase()
  ) || null;
}

export function filtrarStockBajo() {
  return menu.filter(p => p.stock <= 3);
}

export function obtenerResumenMenu() {
  return menu.map(p => `${p.nombre} - S/ ${p.precio}`);
}

export function venderPlato(nombre, cantidad) {
  const plato = menu.find(p =>
    p.nombre.toLowerCase() === nombre.toLowerCase()
  );

  if (!plato)            return { ok: false, mensaje: "Plato no encontrado" };
  if (plato.stock === 0) return { ok: false, mensaje: "No disponible" };
  if (plato.stock < cantidad) {
    return { ok: false, mensaje: `Stock insuficiente. Stock actual de ${plato.nombre}: ${plato.stock}` };
  }

  plato.stock -= cantidad;
  return { ok: true, mensaje: `Se vendieron ${cantidad} x ${plato.nombre}. Stock restante: ${plato.stock}` };
}

export function verificarEstadoGeneral() {
  let agotados = 0;
  let bajos = 0;

  for (let i = 0; i < menu.length; i++) {
    if (menu[i].stock === 0)      agotados++;
    else if (menu[i].stock <= 3)  bajos++;
  }

  if (agotados > 0) return "Hay platos agotados";
  if (bajos > 0)    return "Hay platos con stock bajo";
  return "Todo disponible";
}

export function calcularEstadoPlato(plato) {
  if (plato.stock === 0) return "agotado";
  if (plato.stock <= 3)  return "bajo";
  return "normal";
}

export function simularRespuestaServidor(resultado) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const falla = Math.random() < 0.3;
      if (falla) {
        reject(new Error("Error del servidor simulado."));
      } else {
        resolve(resultado);
      }
    }, 2000);
  });
}

// Día 8 — venderPlatoAsync con validaciones y throw
export async function venderPlatoAsync(nombre, cantidad) {
  if (!nombre || nombre.trim() === "") {
    throw new ErrorNegocio("El nombre del plato no puede estar vacío.");
  }
  if (isNaN(cantidad) || cantidad === "") {
    throw new ErrorNegocio("La cantidad debe ser un número.");
  }
  if (cantidad <= 0) {
    throw new ErrorNegocio("La cantidad debe ser mayor a cero.");
  }

  const plato = buscarPlatoPorNombre(nombre);
  if (!plato) {
    throw new ErrorNegocio(`El plato "${nombre}" no existe en el menú.`);
  }
  if (plato.stock === 0) {
    throw new ErrorNegocio(`"${plato.nombre}" está agotado.`);
  }
  if (cantidad > plato.stock) {
    throw new ErrorNegocio(`Stock insuficiente. Stock actual de "${plato.nombre}": ${plato.stock}.`);
  }

  plato.stock -= cantidad;
  const mensaje = `Se vendieron ${cantidad} x ${plato.nombre}. Stock restante: ${plato.stock}`;

  const respuesta = await simularRespuestaServidor(mensaje);
  return respuesta;
}

