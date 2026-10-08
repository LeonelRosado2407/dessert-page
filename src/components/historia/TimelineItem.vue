<script setup lang="ts">
import { useInView } from '../../composables/useInView'

defineProps<{
  anio: string
  titulo: string
  texto: string
  // En desktop, los hitos alternan de lado
  lado: 'izquierda' | 'derecha'
}>()

const { target, isVisible } = useInView(0.3)
</script>

<template>
  <li ref="target" class="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16">
    <span
      class="absolute left-4 md:left-1/2 top-1.5 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-cream transition-all duration-500"
      :class="isVisible ? 'bg-rose scale-100 shadow-[0_0_0_6px] shadow-rose/20' : 'bg-toffee/40 scale-75'"
      aria-hidden="true"
    ></span>

    <div
      class="transition-all duration-700 ease-out"
      :class="[
        lado === 'izquierda' ? 'md:text-right' : 'md:col-start-2',
        isVisible
          ? 'opacity-100 translate-x-0'
          : lado === 'izquierda'
            ? 'opacity-0 translate-x-6 md:-translate-x-8'
            : 'opacity-0 translate-x-6 md:translate-x-8',
      ]"
    >
      <p class="font-display text-3xl font-bold text-toffee">{{ anio }}</p>
      <h2 class="mt-1 mb-2 text-xl font-bold text-chocolate-dark">{{ titulo }}</h2>
      <p class="leading-relaxed text-chocolate-dark/70">{{ texto }}</p>
    </div>
  </li>
</template>
