<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  // Permite reutilizar la vista para casos como un producto inexistente
  titulo?: string
  mensaje?: string
}>()
</script>

<template>
  <section class="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 py-24">
    <div class="relative mb-8 select-none" aria-hidden="true">
      <span class="font-display text-[9rem] sm:text-[12rem] leading-none font-bold text-toffee/25">
        404
      </span>
      <span class="float absolute inset-0 flex items-center justify-center text-6xl sm:text-7xl">
        🧁
      </span>
    </div>
    <h1 class="text-3xl sm:text-4xl font-bold mb-3 text-rose">
      {{ titulo ?? 'Este postre no está en el horno' }}
    </h1>
    <p class="max-w-md mb-10 text-chocolate-dark/70">
      {{ mensaje ?? 'La página que buscas no existe o cambió de lugar. Pero el menú sigue aquí.' }}
    </p>
    <div class="flex flex-col sm:flex-row gap-3">
      <RouterLink
        to="/productos"
        class="px-7 py-3 rounded-full bg-rose text-cream font-semibold hover:bg-toffee hover:text-chocolate-dark hover:-translate-y-0.5 transition-all"
      >
        Ver el menú
      </RouterLink>
      <RouterLink
        to="/"
        class="px-7 py-3 rounded-full border border-rose text-rose font-semibold hover:bg-rose hover:text-cream transition-colors"
      >
        Ir al inicio
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(-4deg);
  }
  50% {
    transform: translateY(-12px) rotate(4deg);
  }
}

.float {
  animation: float 3.5s ease-in-out infinite;
}
</style>
