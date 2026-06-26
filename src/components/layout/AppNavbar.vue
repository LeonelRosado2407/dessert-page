<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="flex items-center gap-6 px-6 py-4 sticky top-0 bg-cream/90">
    <RouterLink to="/" class="font-bold text-lg text-rose">Dulce Tentación</RouterLink>
    <div class="flex gap-4 ml-auto">
      <RouterLink to="/" class="hover:text-rose transition-colors">Inicio</RouterLink>
      <RouterLink to="/productos" class="hover:text-rose transition-colors">Productos</RouterLink>
      <RouterLink to="/historia" class="hover:text-rose transition-colors">Historia</RouterLink>
    </div>
  </nav>
</template>
