<script setup lang="ts">
import { useInView } from '../../composables/useInView'
import company  from "@/data/company.json"

const { target, isVisible } = useInView()
</script>

<template>
  <section
    id="nosotros"
    ref="target"
    class="py-16 px-4 transition-all duration-700"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
  >
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10">
      <div class="flex-1">
        <div class="group w-full h-80 rounded-xl border border-toffee/30 bg-toffee/20 overflow-hidden">
          <img
            src="/img/our_team.jpg"
            alt="Nuestro equipo"
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        </div>
      </div>
      <div class="flex-1">
        <h2 class="text-3xl font-bold mb-4 text-rose">Quiénes Somos</h2>
        <p class="text-chocolate-dark/80 leading-relaxed">{{ company.description }}</p>
      </div>
    </div>
  </section>
</template>
