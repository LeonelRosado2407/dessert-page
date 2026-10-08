import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ProductImage from '../ProductImage.vue'

describe('ProductImage', () => {
  it('muestra la imagen cuando hay src', () => {
    const wrapper = mount(ProductImage, { props: { src: '/img/a.jpg', alt: 'Latte' } })
    expect(wrapper.find('img').attributes('src')).toBe('/img/a.jpg')
  })

  it('muestra el placeholder si no hay src', () => {
    const wrapper = mount(ProductImage, { props: { alt: 'Latte' } })
    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.get('[role="img"]').attributes('aria-label')).toBe('Latte')
    expect(wrapper.text()).toContain('L')
  })

  it('cambia al placeholder si la imagen falla y se recupera con un nuevo src', async () => {
    const wrapper = mount(ProductImage, { props: { src: '/img/rota.jpg', alt: 'Latte' } })
    await wrapper.find('img').trigger('error')
    expect(wrapper.find('img').exists()).toBe(false)

    await wrapper.setProps({ src: '/img/buena.jpg' })
    expect(wrapper.find('img').attributes('src')).toBe('/img/buena.jpg')
  })
})
