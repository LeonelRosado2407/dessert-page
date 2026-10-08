<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useInView } from '../../composables/useInView'
import { formatPrecio } from '../../utils/formatPrecio'
import ProductImage from './ProductImage.vue'
import FavoriteButton from './FavoriteButton.vue'

const props = defineProps<{
  id: number
  slug: string
  nombre: string
  descripcionCorta: string
  imagen: string
  precio: number
  // Posición en la cuadrícula, para escalonar la aparición por columna
  index?: number
}>()

const { target, isVisible } = useInView()
const delay = `${((props.index ?? 0) % 3) * 90}ms`
</script>

<template>
  <!-- El wrapper maneja la aparición (con retraso); el article, el hover (sin retraso) -->
  <div
    ref="target"
    class="transition-all duration-500 ease-out"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'"
    :style="{ transitionDelay: delay }"
  >
    <article
      class="group relative h-full border border-toffee/30 rounded-xl overflow-hidden bg-cream transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-chocolate-dark/10 hover:border-rose/40 has-focus-visible:ring-2 has-focus-visible:ring-rose"
    >
      <div class="absolute top-2 right-2 z-20">
        <FavoriteButton :id="id" />
      </div>
      <div class="w-full h-56 bg-toffee/10 overflow-hidden">
        <div class="w-full h-full transition-transform duration-700 ease-out group-hover:scale-110">
          <ProductImage :src="imagen" :alt="nombre" />
        </div>
      </div>
      <div class="p-4">
        <div class="flex items-baseline justify-between gap-3 mb-1">
          <h3 class="font-bold text-lg text-chocolate-dark group-hover:text-rose transition-colors">
            <RouterLink
              :to="`/productos/${slug}`"
              class="after:absolute after:inset-0 after:z-10 focus:outline-none"
            >
              {{ nombre }}
            </RouterLink>
          </h3>
          <span class="shrink-0 font-semibold text-rose">{{ formatPrecio(precio) }}</span>
        </div>
        <p class="mb-3 text-sm text-chocolate-dark/70">{{ descripcionCorta }}</p>
        <span
          class="inline-flex items-center gap-1 text-xs font-semibold text-rose opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-focus-within:opacity-100 group-focus-within:translate-x-0 pointer-coarse:opacity-100 pointer-coarse:translate-x-0"
          aria-hidden="true"
        >
          Ver detalle →
        </span>
      </div>
    </article>
  </div>
</template>
