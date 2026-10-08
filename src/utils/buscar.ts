export function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

// Coincide por nombre o descripción corta, sin importar acentos ni mayúsculas
export function coincideBusqueda(
  producto: { nombre: string; descripcionCorta: string },
  busqueda: string,
): boolean {
  const q = normalizar(busqueda.trim())
  return !q || normalizar(`${producto.nombre} ${producto.descripcionCorta}`).includes(q)
}
