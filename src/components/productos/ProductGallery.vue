<script setup lang="ts">
import type { Producto } from '../../types'
import ProductCard from './ProductCard.vue'

defineProps<{
  productos: Producto[]
}>()
</script>

<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
    <ProductCard
      v-for="producto in productos"
      :key="producto.id"
      :slug="producto.slug"
      :nombre="producto.nombre"
      :descripcionCorta="producto.descripcionCorta"
      :imagen="producto.imagenes[0] ?? ''"
    />
  </div>
</template>
