
export let menu = [
  { nombre: "Arroz con pollo", precio: 12, stock: 5 },
  { nombre: "Lomo saltado",    precio: 18, stock: 9 },
  { nombre: "Sopa",            precio: 8,  stock: 10 },
  { nombre: "Causa rellena",   precio: 20, stock: 5 },
  { nombre: "Cuy chactado",    precio: 30, stock: 7 }
];

export function contarPlatos() {
  return menu.length;
}

export function agregarPlatoDemo() {
  const nuevoPlato = { nombre: "Pollo a la olla", precio: 19, stock: 6 };

  const duplicado = menu.some(p =>
    p.nombre.toLowerCase() === nuevoPlato.nombre.toLowerCase()
  );

  if (duplicado) return false;

  menu.push(nuevoPlato);
  return true;
}
export function actualizarStock(nombre, nuevoStock) {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].nombre.toLowerCase() === nombre.toLowerCase()) {
      menu[i].stock = nuevoStock;
      return true;
    }
  }
  return false;
}
export function agregarPlato(plato) {
  menu.push(plato);
}
