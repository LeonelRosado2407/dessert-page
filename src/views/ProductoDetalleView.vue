<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import { useFavoritosStore } from '../stores/favoritos'
import productos from '../data/productos.json'

const route = useRoute()
const fav = useFavoritosStore()
const producto = productos.find((p) => p.slug === route.params.slug)
</script>

<template>
  <article v-if="producto" class="max-w-4xl mx-auto py-16 px-4">
    <div class="flex items-center justify-between mb-8">
      <RouterLink to="/productos" class="text-sm underline underline-offset-2 text-rose hover:text-toffee transition-colors">
        ← Volver a productos
      </RouterLink>
      <button
        @click="fav.toggle(producto.id)"
        class="text-2xl transition-transform hover:scale-110"
        :class="fav.esFavorito(producto.id) ? 'text-rose' : 'text-chocolate-dark/40'"
      >
        {{ fav.esFavorito(producto.id) ? '♥' : '♡' }}
      </button>
    </div>

    <header class="mb-12">
      <h1 class="text-4xl font-bold mb-2 text-rose">{{ producto.nombre }}</h1>
      <p class="text-lg text-toffee">{{ producto.descripcionCorta }}</p>
    </header>

    <section v-if="producto.imagenes.length" class="flex gap-4 mb-12 overflow-x-auto">
      <img
        v-for="(img, i) in producto.imagenes"
        :key="i"
        :src="img"
        :alt="`${producto.nombre} - imagen ${i + 1}`"
        class="w-96 h-64 object-cover rounded-xl border border-toffee/30 shrink-0"
      />
    </section>

    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-4 text-rose">Descripción</h2>
      <p class="text-chocolate-dark/80 leading-relaxed">{{ producto.descripcion }}</p>
    </section>

    <section v-if="producto.videoUrl" class="mb-12">
      <h2 class="text-2xl font-bold mb-4 text-rose">Preparación</h2>
      <iframe
        :src="producto.videoUrl"
        title="Video del producto"
        class="w-full aspect-video rounded-xl border border-toffee/30"
      ></iframe>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-4 text-rose">Historia</h2>
      <p class="text-chocolate-dark/80 leading-relaxed">{{ producto.historia }}</p>
    </section>
  </article>

  <div v-else class="py-16 px-4 text-center">
    <h1 class="text-2xl font-bold mb-4 text-rose">Producto no encontrado</h1>
    <RouterLink to="/productos" class="underline underline-offset-2 text-rose">Volver a productos</RouterLink>
  </div>
</template>
