<script setup lang="ts">
import productos from '../data/productos.json'
import ProductGallery from '../components/productos/ProductGallery.vue'
</script>

<template>
  <div class="py-16 px-4">
    <h1 class="text-4xl font-bold text-center mb-12 text-rose">Productos Insignia</h1>
    <ProductGallery :productos="productos" />
  </div>
</template>
