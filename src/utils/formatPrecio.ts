const formatter = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

export function formatPrecio(precio: number): string {
  return precio > 0 ? formatter.format(precio) : 'Por cotizar'
}
