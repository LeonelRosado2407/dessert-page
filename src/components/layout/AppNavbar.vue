<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const scrolled = ref(false)

function updateScrollState() {
  scrolled.value = route.name !== 'home' || window.scrollY > 80
}

function onScroll() {
  if (route.name === 'home') {
    scrolled.value = window.scrollY > 80
  }
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', onScroll)
})
onUnmounted(() => window.removeEventListener('scroll', onScroll))

watch(() => route.name, () => {
  updateScrollState()
})
</script>

<template>
  <nav
    class="flex items-center gap-6 px-6 py-4 fixed top-0 inset-x-0 z-50 transition-colors duration-300"
    :class="
      scrolled
        ? 'bg-cream/95 text-chocolate-dark shadow-sm'
        : 'bg-transparent text-cream'
    "
  >
    <RouterLink to="/" class="font-bold text-lg" :class="scrolled ? 'text-rose' : 'text-cream'">
      Dulce Tentación
    </RouterLink>
    <div class="flex gap-4 ml-auto">
      <RouterLink to="/" class="hover:text-rose transition-colors">Inicio</RouterLink>
      <RouterLink to="/productos" class="hover:text-rose transition-colors">Productos</RouterLink>
      <RouterLink to="/historia" class="hover:text-rose transition-colors">Historia</RouterLink>
    </div>
  </nav>
</template>
