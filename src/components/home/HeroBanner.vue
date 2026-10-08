<script setup lang="ts">
import { RouterLink } from 'vue-router'
import company from '@/data/company.json'
import { scrollToId } from '@/utils/scrollToId'
</script>

<template>
  <div id="inicio" class="relative h-svh min-h-[560px] overflow-hidden">
    <img
      src="/img/banner_main.jpg"
      alt=""
      fetchpriority="high"
      class="hero-zoom absolute inset-0 w-full h-full object-cover"
    />
    <div
      class="absolute inset-0 bg-linear-to-b from-chocolate-dark/70 via-chocolate-dark/45 to-chocolate-dark/75"
    ></div>
    <section
      class="relative z-10 h-full flex flex-col items-center justify-center text-center px-4"
    >
      <p
        class="mb-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-toffee opacity-0 animate-hero-up"
        style="animation-delay: 0.1s"
      >
        Café · Repostería artesanal
      </p>
      <h1
        class="text-5xl sm:text-6xl md:text-7xl font-bold mb-5 text-cream drop-shadow-lg opacity-0 animate-hero-up"
        style="animation-delay: 0.25s"
      >
        {{ company.name }}
      </h1>
      <p
        class="max-w-xl text-lg sm:text-xl mb-10 text-cream/85 opacity-0 animate-hero-up"
        style="animation-delay: 0.4s"
      >
        {{ company.eslogan }}
      </p>
      <div
        class="flex flex-col sm:flex-row gap-3 opacity-0 animate-hero-up"
        style="animation-delay: 0.55s"
      >
        <RouterLink
          to="/productos"
          class="px-7 py-3 rounded-full bg-rose text-cream font-semibold shadow-lg shadow-chocolate-dark/30 hover:bg-toffee hover:text-chocolate-dark hover:-translate-y-0.5 transition-all"
        >
          Ver el menú
        </RouterLink>
        <button
          type="button"
          class="px-7 py-3 rounded-full border border-cream/60 text-cream font-semibold hover:bg-cream hover:text-chocolate-dark transition-colors cursor-pointer"
          @click="scrollToId('contacto')"
        >
          Visítanos
        </button>
      </div>
    </section>

    <button
      type="button"
      aria-label="Bajar a la siguiente sección"
      class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 text-cream/70 hover:text-cream transition-colors cursor-pointer opacity-0 animate-hero-up"
      style="animation-delay: 0.9s"
      @click="scrollToId('nosotros')"
    >
      <svg
        class="scroll-cue w-7 h-7"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
@keyframes hero-up {
  from {
    opacity: 0;
    transform: translateY(32px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes hero-zoom {
  from {
    transform: scale(1.12);
  }
  to {
    transform: scale(1);
  }
}

@keyframes scroll-cue {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(6px);
  }
}

.animate-hero-up {
  animation: hero-up 0.8s ease-out forwards;
}

.hero-zoom {
  animation: hero-zoom 8s ease-out forwards;
}

.scroll-cue {
  animation: scroll-cue 1.6s ease-in-out infinite;
}
</style>
