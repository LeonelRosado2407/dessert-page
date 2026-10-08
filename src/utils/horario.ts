import company from '@/data/company.json'

export const horario = company.horario

function minutos(hora: string) {
  const [h = 0, m = 0] = hora.split(':').map(Number)
  return h * 60 + m
}

export function estaAbierto(fecha = new Date()): boolean {
  const ahora = fecha.getHours() * 60 + fecha.getMinutes()
  const turno = horario.find((t) => t.dias.includes(fecha.getDay()))
  if (!turno?.abre || !turno.cierra) return false
  return ahora >= minutos(turno.abre) && ahora < minutos(turno.cierra)
}

export function formatTurno(turno: (typeof horario)[number]): string {
  return turno.abre && turno.cierra ? `${turno.abre} – ${turno.cierra}` : 'Cerrado'
}
