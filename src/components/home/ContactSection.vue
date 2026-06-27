<script setup lang="ts">
import { useInView } from '../../composables/useInView'

const { target, isVisible } = useInView()
</script>

<template>
  <section
    id="contacto"
    ref="target"
    class="py-16 px-4 bg-white/60 transition-all duration-700"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
  >
    <h2 class="text-3xl font-bold mb-8 text-center text-rose">Contacto</h2>
    <div class="max-w-xl mx-auto text-center space-y-2 text-chocolate-dark/80">
      <p>Dirección: placeholder</p>
      <p>Teléfono: placeholder</p>
      <p>Horario: Lunes a sábado, 8:00 - 20:00</p>
    </div>
  </section>
</template>
