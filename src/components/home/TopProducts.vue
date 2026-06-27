<script setup lang="ts">
import productos from '../../data/productos.json'
import { useInView } from '../../composables/useInView'

const top = productos.filter((p) => p.isTop)

const { target, isVisible } = useInView()
</script>

<template>
  <section
    id="destacados"
    ref="target"
    class="py-16 px-4 transition-all duration-700"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
  >
    <h2 class="text-3xl font-bold mb-8 text-center text-rose">Productos Destacados</h2>
    <div class="max-w-5xl mx-auto space-y-12">
      <article
        v-for="(item, i) in top"
        :key="item.id"
        class="flex flex-col md:flex-row items-center gap-8"
        :class="{ 'md:flex-row-reverse': i % 2 !== 0 }"
      >
        <div class="flex-1">
          <img :src="item.imagenes[0]" :alt="item.nombre" class="w-full h-80 object-cover rounded-xl border border-toffee/30" />
        </div>
        <div class="flex-1 text-center md:text-left">
          <h3 class="text-2xl font-bold mb-2 text-chocolate-dark">{{ item.nombre }}</h3>
          <p class="text-chocolate-dark/70">{{ item.descripcionCorta }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
