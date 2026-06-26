<script setup lang="ts">
defineProps<{
  slug: string
  nombre: string
  descripcionCorta: string
  imagen: string
}>()
</script>

<template>
  <article class="border border-toffee/30 rounded-xl overflow-hidden bg-cream">
    <img :src="imagen" :alt="nombre" class="w-full h-56 object-cover" />
    <div class="p-4">
      <h3 class="font-bold text-lg mb-1 text-chocolate-dark">{{ nombre }}</h3>
      <p class="mb-3 text-sm text-chocolate-dark/70">{{ descripcionCorta }}</p>
      <RouterLink
        :to="`/productos/${slug}`"
        class="inline-block text-sm font-semibold underline underline-offset-2 text-rose hover:text-toffee transition-colors"
      >
        Ver más
      </RouterLink>
    </div>
  </article>
</template>
