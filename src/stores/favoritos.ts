import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFavoritosStore = defineStore('favoritos', () => {
  const ids = ref<number[]>([])

  function load() {
    try {
      const saved = localStorage.getItem('favoritos')
      if (saved) ids.value = JSON.parse(saved)
    } catch {}
  }

  function save() {
    localStorage.setItem('favoritos', JSON.stringify(ids.value))
  }

  function toggle(id: number) {
    const idx = ids.value.indexOf(id)
    if (idx === -1) ids.value.push(id)
    else ids.value.splice(idx, 1)
    save()
  }

  function esFavorito(id: number): boolean {
    return ids.value.includes(id)
  }

  load()

  return { ids, toggle, esFavorito }
})
