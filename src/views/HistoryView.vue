<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterLink } from 'vue-router'
import historia from '../data/historia.json'
import company from '../data/company.json'
import TimelineItem from '../components/historia/TimelineItem.vue'

// La línea de la cronología se "dibuja" conforme avanzas en el scroll
const timeline = ref<HTMLElement | null>(null)
const progreso = ref(0)
let frame = 0

function medir() {
  frame = 0
  const el = timeline.value
  if (!el) return
  const { top, height } = el.getBoundingClientRect()
  const recorrido = window.innerHeight * 0.6 - top
  progreso.value = Math.min(1, Math.max(0, recorrido / height))
}

function onScroll() {
  if (!frame) frame = requestAnimationFrame(medir)
}

onMounted(() => {
  medir()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('resize', onScroll)
})
onUnmounted(() => {
  cancelAnimationFrame(frame)
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('resize', onScroll)
})
</script>

<template>
  <div>
    <header class="relative overflow-hidden pt-32 pb-20 px-4 text-center bg-chocolate-dark text-cream">
      <img
        src="/img/our_team.jpg"
        alt=""
        class="absolute inset-0 w-full h-full object-cover opacity-25"
      />
      <div class="relative max-w-2xl mx-auto">
        <p class="mb-4 text-xs sm:text-sm uppercase tracking-[0.3em] text-toffee">
          {{ company.eslogan }}
        </p>
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Nuestra Historia</h1>
        <p class="text-lg leading-relaxed text-cream/85">{{ historia.intro }}</p>
      </div>
    </header>

    <section class="max-w-5xl mx-auto px-4 py-20">
      <div ref="timeline" class="relative">
        <div
          class="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-toffee/25"
          aria-hidden="true"
        >
          <div
            class="w-full h-full origin-top bg-rose"
            :style="{ transform: `scaleY(${progreso})` }"
          ></div>
        </div>

        <ol class="relative space-y-16">
          <TimelineItem
            v-for="(hito, i) in historia.hitos"
            :key="hito.anio"
            v-bind="hito"
            :lado="i % 2 === 0 ? 'izquierda' : 'derecha'"
          />
        </ol>
      </div>
    </section>

    <section class="px-4 pb-24 text-center">
      <h2 class="text-3xl font-bold mb-3 text-rose">Ven a probar la historia</h2>
      <p class="mb-8 text-chocolate-dark/70">Cada receta del menú tiene algo de estos años.</p>
      <RouterLink
        to="/productos"
        class="inline-block px-7 py-3 rounded-full bg-rose text-cream font-semibold hover:bg-toffee hover:text-chocolate-dark hover:-translate-y-0.5 transition-all"
      >
        Ver el menú
      </RouterLink>
    </section>
  </div>
</template>
