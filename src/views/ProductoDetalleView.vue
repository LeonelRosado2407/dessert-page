<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import productos from '../data/productos.json'
import { formatPrecio } from '../utils/formatPrecio'
import ProductImage from '../components/productos/ProductImage.vue'
import ImageLightbox from '../components/productos/ImageLightbox.vue'
import FavoriteButton from '../components/productos/FavoriteButton.vue'
import NotFoundView from './NotFoundView.vue'

const route = useRoute()
const producto = productos.find((p) => p.slug === route.params.slug)
const lightboxIndex = ref<number | null>(null)

document.title = `${producto?.nombre ?? 'Producto no encontrado'} · Dulce Tentación`
</script>

<template>
  <article v-if="producto" class="max-w-4xl mx-auto py-16 px-4">
    <div class="flex items-center justify-between mb-8">
      <RouterLink to="/productos" class="text-sm underline underline-offset-2 text-rose hover:text-toffee transition-colors">
        ← Volver al menú
      </RouterLink>
      <FavoriteButton :id="producto.id" variant="plain" />
    </div>

    <header class="mb-12">
      <h1 class="text-4xl font-bold mb-2 text-rose">{{ producto.nombre }}</h1>
      <p class="text-lg text-toffee">{{ producto.descripcionCorta }}</p>
      <p class="mt-3 text-2xl font-bold text-rose">{{ formatPrecio(producto.precio) }}</p>
    </header>

    <section v-if="producto.imagenes.length" class="flex gap-4 mb-12 overflow-x-auto">
      <button
        v-for="(img, i) in producto.imagenes"
        :key="i"
        type="button"
        :aria-label="`Ver ${producto.nombre} - imagen ${i + 1} en grande`"
        class="group w-80 sm:w-96 h-64 shrink-0 bg-toffee/10 rounded-xl border border-toffee/30 overflow-hidden cursor-zoom-in"
        @click="lightboxIndex = i"
      >
        <div class="w-full h-full transition-transform duration-500 group-hover:scale-105">
          <ProductImage :src="img" :alt="`${producto.nombre} - imagen ${i + 1}`" />
        </div>
      </button>
    </section>

    <ImageLightbox v-model="lightboxIndex" :images="producto.imagenes" :alt="producto.nombre" />

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

  <NotFoundView
    v-else
    titulo="No encontramos ese producto"
    mensaje="Puede que ya no esté en el menú. Échale un ojo a lo que tenemos hoy."
  />
</template>
