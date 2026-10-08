import { describe, it, expect } from 'vitest'
import { coincideBusqueda, normalizar } from '../buscar'

const mocha = { nombre: 'Mocha', descripcionCorta: 'Café con chocolate' }

describe('normalizar', () => {
  it('quita acentos y pasa a minúsculas', () => {
    expect(normalizar('Café Ñandú')).toBe('cafe nandu')
  })
})

describe('coincideBusqueda', () => {
  it('ignora acentos y mayúsculas en ambos lados', () => {
    expect(coincideBusqueda(mocha, 'cafe')).toBe(true)
    expect(coincideBusqueda(mocha, 'CAFÉ')).toBe(true)
  })

  it('busca en nombre y descripción corta', () => {
    expect(coincideBusqueda(mocha, 'moch')).toBe(true)
    expect(coincideBusqueda(mocha, 'chocolate')).toBe(true)
    expect(coincideBusqueda(mocha, 'galleta')).toBe(false)
  })

  it('una búsqueda vacía coincide con todo', () => {
    expect(coincideBusqueda(mocha, '')).toBe(true)
    expect(coincideBusqueda(mocha, '   ')).toBe(true)
  })
})
