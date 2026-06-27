<script setup lang="ts">
import { RouterLink } from 'vue-router'
import company  from "@/data/company.json"
</script>

<template>
  <div id="inicio" class="relative h-screen overflow-hidden">
    <img src="/img/banner_main.jpg" alt="" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-black/40"></div>
    <section class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
      <h1 class="text-5xl font-bold mb-4 text-rose opacity-0 translate-y-10 animate-hero-up" style="animation-delay: 0.1s">{{ company.name }}</h1>
      <p class="text-xl mb-8 text-toffee opacity-0 translate-y-10 animate-hero-up" style="animation-delay: 0.3s">{{ company.eslogan }}</p>
      <RouterLink
        to="/productos"
        class="inline-block px-6 py-3 border border-rose text-rose rounded-xl hover:bg-rose hover:text-cream transition-colors opacity-0 translate-y-10 animate-hero-up"
        style="animation-delay: 0.5s"
      >
        Ver nuestros productos
      </RouterLink>
    </section>
  </div>
</template>

<style scoped>
@keyframes hero-up {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-hero-up {
  animation: hero-up 0.8s ease-out forwards;
}
</style>
