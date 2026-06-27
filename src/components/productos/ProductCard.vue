<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useFavoritosStore } from '../../stores/favoritos'
import { useInView } from '../../composables/useInView'

const props = defineProps<{
  id: number
  slug: string
  nombre: string
  descripcionCorta: string
  imagen: string
}>()

const router = useRouter()
const { target, isVisible } = useInView()
const fav = useFavoritosStore()

function goToProduct() {
  router.push(`/productos/${props.slug}`)
}
</script>

<template>
  <article
    ref="target"
    class="border border-toffee/30 rounded-xl overflow-hidden bg-cream relative transition-all duration-500 cursor-pointer hover:shadow-lg hover:border-rose/40 hover:scale-[1.02]"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
    @click="goToProduct"
  >
    <button
      @click.stop="fav.toggle(id)"
      class="absolute top-3 right-3 z-10 text-2xl drop-shadow transition-transform hover:scale-110"
      :class="fav.esFavorito(id) ? 'text-rose' : 'text-cream'"
    >
      {{ fav.esFavorito(id) ? '♥' : '♡' }}
    </button>
    <div class="w-full h-56 bg-toffee/10">
      <img loading="lazy" :src="imagen" :alt="nombre" class="w-full h-full object-cover" />
    </div>
    <div class="p-4">
      <h3 class="font-bold text-lg mb-1 text-chocolate-dark">{{ nombre }}</h3>
      <p class="mb-3 text-sm text-chocolate-dark/70">{{ descripcionCorta }}</p>
    </div>
  </article>
</template>
