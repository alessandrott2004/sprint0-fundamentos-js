import { menu } from './menu.js';

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
