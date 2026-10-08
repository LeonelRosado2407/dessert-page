import { describe, it, expect } from 'vitest'
import { formatPrecio } from '../formatPrecio'

describe('formatPrecio', () => {
  it('formatea en pesos sin decimales', () => {
    expect(formatPrecio(48)).toBe('$48')
    expect(formatPrecio(1500)).toBe('$1,500')
  })

  it('redondea los centavos', () => {
    expect(formatPrecio(20.99)).toBe('$21')
  })

  it('muestra "Por cotizar" cuando no hay precio', () => {
    expect(formatPrecio(0)).toBe('Por cotizar')
    expect(formatPrecio(-1)).toBe('Por cotizar')
  })
})
