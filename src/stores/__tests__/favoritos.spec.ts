import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFavoritosStore } from '../favoritos'

describe('useFavoritosStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('agrega y quita favoritos con toggle', () => {
    const fav = useFavoritosStore()
    fav.toggle(3)
    expect(fav.esFavorito(3)).toBe(true)
    fav.toggle(3)
    expect(fav.esFavorito(3)).toBe(false)
  })

  it('guarda los favoritos en localStorage', () => {
    const fav = useFavoritosStore()
    fav.toggle(1)
    fav.toggle(5)
    expect(JSON.parse(localStorage.getItem('favoritos')!)).toEqual([1, 5])
  })

  it('carga los favoritos guardados al crearse', () => {
    localStorage.setItem('favoritos', JSON.stringify([2, 7]))
    const fav = useFavoritosStore()
    expect(fav.ids).toEqual([2, 7])
  })

  it('ignora datos corruptos en localStorage', () => {
    localStorage.setItem('favoritos', '{no es json')
    const fav = useFavoritosStore()
    expect(fav.ids).toEqual([])
  })
})
