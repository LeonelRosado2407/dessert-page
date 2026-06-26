<script setup lang="ts">
import reviews from '../../data/reviews.json'
</script>

<template>
  <section class="py-16 px-4 bg-white/60">
    <h2 class="text-3xl font-bold mb-8 text-center text-rose">Reseñas</h2>
    <div class="max-w-4xl mx-auto space-y-8">
      <article v-for="review in reviews" :key="review.id" class="border border-toffee/30 rounded-xl p-6 bg-cream">
        <p class="mb-2 italic text-chocolate-dark/80">"{{ review.texto }}"</p>
        <p class="text-sm text-toffee">— {{ review.nombre }} ({{ review.rating }}/5)</p>
      </article>
    </div>
  </section>
</template>
