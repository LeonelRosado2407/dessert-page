<script setup lang="ts">
import productos from '../../data/productos.json'
import { useInView } from '../../composables/useInView'

const alturas = ['h-56', 'h-80', 'h-64', 'h-72', 'h-60', 'h-76']

const altura = (i: number) => alturas[i % alturas.length]

const allImages = productos
  .filter((p) => p.inGallery)
  .flatMap((p) => p.imagenes.map((img) => ({ img, nombre: p.nombre })))
  .slice(0, 6)

const { target, isVisible } = useInView()
</script>

<template>
  <section
    id="galeria"
    ref="target"
    class="py-16 px-4 bg-white/60 transition-all duration-700"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
  >
    <h2 class="text-3xl font-bold mb-8 text-center text-rose">Galería</h2>
    <div class="columns-2 md:columns-3 gap-4 max-w-6xl mx-auto">
      <article
        v-for="(item, i) in allImages"
        :key="i"
        class="rounded-xl overflow-hidden border border-toffee/30 bg-cream mb-4 break-inside-avoid transition-all duration-300 hover:scale-[1.03] hover:shadow-lg hover:border-rose/40"
      >
        <img
          :src="item.img"
          :alt="item.nombre"
          :class="['w-full object-cover', altura(i)]"
        />
      </article>
    </div>
  </section>
</template>
