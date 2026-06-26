<script setup lang="ts">
import faqs from '../../data/faq.json'
</script>

<template>
  <section class="py-16 px-4">
    <h2 class="text-3xl font-bold mb-8 text-center text-rose">Preguntas Frecuentes</h2>
    <div class="max-w-3xl mx-auto space-y-6">
      <article v-for="faq in faqs" :key="faq.id" class="border border-toffee/30 rounded-xl p-6 bg-white/60">
        <h3 class="font-bold mb-2 text-chocolate-dark">{{ faq.pregunta }}</h3>
        <p class="text-chocolate-dark/70">{{ faq.respuesta }}</p>
      </article>
    </div>
  </section>
</template>
