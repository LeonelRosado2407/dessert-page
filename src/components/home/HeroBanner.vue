<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="min-h-screen flex flex-col items-center justify-center text-center px-4">
    <h1 class="text-5xl font-bold mb-4 text-rose">Dulce Tentación</h1>
    <p class="text-xl mb-8 text-toffee">Repostería artesanal desde 1985</p>
    <RouterLink
      to="/productos"
      class="inline-block px-6 py-3 border border-rose text-rose rounded-xl hover:bg-rose hover:text-cream transition-colors"
    >
      Ver nuestros productos
    </RouterLink>
  </section>
</template>
