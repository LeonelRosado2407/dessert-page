<script setup lang="ts">
import productos from '../../data/productos.json'
</script>

<template>
  <section class="py-16 px-4 bg-white/60">
    <h2 class="text-3xl font-bold mb-8 text-center text-rose">Galería</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
      <article
        v-for="item in productos.slice(0, 6)"
        :key="item.id"
        class="rounded-xl overflow-hidden border border-toffee/30 bg-cream"
      >
        <img :src="item.imagenes[0]" :alt="item.nombre" class="w-full h-64 object-cover" />
        <div class="p-4">
          <p class="font-semibold text-chocolate-dark">{{ item.nombre }}</p>
        </div>
      </article>
    </div>
  </section>
</template>
