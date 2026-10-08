<script setup lang="ts">
import reviews from '../../data/reviews.json'
import { useInView } from '../../composables/useInView'

function estrellas(n: number) {
  return '★'.repeat(n) + '☆'.repeat(5 - n)
}

const { target, isVisible } = useInView()
</script>

<template>
  <section
    id="resenas"
    ref="target"
    class="py-16 px-4 bg-white/60 transition-all duration-700"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
  >
    <h2 class="text-3xl font-bold mb-8 text-center text-rose">Reseñas</h2>
    <div class="max-w-5xl mx-auto columns-1 sm:columns-2 gap-5">
      <article
        v-for="review in reviews"
        :key="review.id"
        class="break-inside-avoid border border-toffee/30 rounded-xl p-5 bg-cream mb-5"
      >
        <p class="text-sm leading-relaxed text-chocolate-dark/80">"{{ review.texto }}"</p>
        <div class="flex items-center justify-between mt-3">
          <span class="text-xs text-toffee font-medium">— {{ review.nombre }}</span>
          <span class="text-rose text-sm tracking-[2px]">{{ estrellas(review.rating) }}</span>
        </div>
      </article>
    </div>
  </section>
</template>
