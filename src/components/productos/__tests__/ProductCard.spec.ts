import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import ProductCard from '../ProductCard.vue'

// jsdom no implementa IntersectionObserver (lo usa useInView)
vi.stubGlobal(
  'IntersectionObserver',
  class {
    observe() {}
    unobserve() {}
    disconnect() {}
  },
)

const props = {
  id: 1,
  slug: 'latte',
  nombre: 'Latte',
  descripcionCorta: 'Espresso con leche',
  imagen: '/img/latte.jpg',
  precio: 55,
}

function montar(extra = {}) {
  return mount(ProductCard, {
    props: { ...props, ...extra },
    global: { stubs: { RouterLink: RouterLinkStub } },
  })
}

describe('ProductCard', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('muestra nombre, descripción y precio', () => {
    const wrapper = montar()
    expect(wrapper.text()).toContain('Latte')
    expect(wrapper.text()).toContain('Espresso con leche')
    expect(wrapper.text()).toContain('$55')
  })

  it('muestra "Por cotizar" en productos sin precio', () => {
    expect(montar({ precio: 0 }).text()).toContain('Por cotizar')
  })

  it('enlaza al detalle del producto', () => {
    expect(montar().getComponent(RouterLinkStub).props('to')).toBe('/productos/latte')
  })

  it('el botón de favorito alterna su estado', async () => {
    const wrapper = montar()
    const boton = wrapper.get('button[aria-pressed]')
    expect(boton.attributes('aria-label')).toBe('Agregar a favoritos')

    await boton.trigger('click')
    expect(boton.attributes('aria-pressed')).toBe('true')
    expect(boton.attributes('aria-label')).toBe('Quitar de favoritos')
  })
})
