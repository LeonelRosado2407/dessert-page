<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import faqs from '../../data/faq.json'
import { useInView } from '../../composables/useInView'

const openId: Ref<number | null> = ref(null)

function toggle(id: number) {
  openId.value = openId.value === id ? null : id
}

const { target, isVisible } = useInView()
</script>

<template>
  <section
    id="preguntas"
    ref="target"
    class="py-16 px-4 transition-all duration-700"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
  >
    <h2 class="text-3xl font-bold mb-8 text-center text-rose">Preguntas Frecuentes</h2>
    <div class="max-w-5xl mx-auto columns-1 sm:columns-2 gap-4">
      <article
        v-for="faq in faqs"
        :key="faq.id"
        class="break-inside-avoid border border-toffee/30 rounded-xl bg-white/60 overflow-hidden mb-4"
      >
        <button
          @click="toggle(faq.id)"
          class="w-full flex items-center justify-between px-4 py-3 text-left font-semibold text-sm text-chocolate-dark hover:text-rose transition-colors cursor-pointer"
        >
          <span>{{ faq.pregunta }}</span>
          <span
            class="text-base transition-transform duration-300 shrink-0 ml-2"
            :class="openId === faq.id ? 'rotate-45' : ''"
          >+</span>
        </button>
        <div
          class="grid transition-[grid-template-rows] duration-300"
          :style="{ gridTemplateRows: openId === faq.id ? '1fr' : '0fr' }"
        >
          <div class="overflow-hidden">
            <p class="px-4 pb-3 text-sm text-chocolate-dark/70">{{ faq.respuesta }}</p>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>
