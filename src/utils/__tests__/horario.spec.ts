import { describe, it, expect, vi } from 'vitest'

// Horario fijo para que las pruebas no dependan del contenido de company.json
vi.mock('@/data/company.json', () => ({
  default: {
    horario: [
      { etiqueta: 'Lunes a sábado', dias: [1, 2, 3, 4, 5, 6], abre: '08:00', cierra: '20:00' },
      { etiqueta: 'Domingo', dias: [0], abre: null, cierra: null },
    ],
  },
}))

const { estaAbierto, formatTurno, horario } = await import('../horario')

// 5 de octubre de 2026 es lunes; 4 de octubre, domingo
const lunes = (h: number, m = 0) => new Date(2026, 9, 5, h, m)
const domingo = (h: number) => new Date(2026, 9, 4, h)

describe('estaAbierto', () => {
  it('está abierto dentro del horario', () => {
    expect(estaAbierto(lunes(8))).toBe(true)
    expect(estaAbierto(lunes(13, 30))).toBe(true)
    expect(estaAbierto(lunes(19, 59))).toBe(true)
  })

  it('está cerrado antes de abrir y a partir de la hora de cierre', () => {
    expect(estaAbierto(lunes(7, 59))).toBe(false)
    expect(estaAbierto(lunes(20))).toBe(false)
    expect(estaAbierto(lunes(23))).toBe(false)
  })

  it('está cerrado los días sin horario', () => {
    expect(estaAbierto(domingo(12))).toBe(false)
  })
})

describe('formatTurno', () => {
  it('muestra el rango de horas o "Cerrado"', () => {
    expect(formatTurno(horario[0]!)).toBe('08:00 – 20:00')
    expect(formatTurno(horario[1]!)).toBe('Cerrado')
  })
})
