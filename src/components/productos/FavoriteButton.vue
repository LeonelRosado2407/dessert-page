<script setup lang="ts">
import { ref, computed } from 'vue'
import { useFavoritosStore } from '../../stores/favoritos'

const props = defineProps<{
  id: number
  // 'overlay': sobre una foto (corazón claro); 'plain': sobre fondo crema
  variant?: 'overlay' | 'plain'
}>()

const fav = useFavoritosStore()
const activo = computed(() => fav.esFavorito(props.id))
const animando = ref(false)

function toggle() {
  fav.toggle(props.id)
  animando.value = activo.value
}
</script>

<template>
  <button
    type="button"
    :aria-label="activo ? 'Quitar de favoritos' : 'Agregar a favoritos'"
    :aria-pressed="activo"
    class="relative w-10 h-10 flex items-center justify-center rounded-full text-2xl transition-colors cursor-pointer"
    :class="[
      variant === 'plain'
        ? 'hover:bg-rose/10'
        : 'bg-chocolate-dark/20 backdrop-blur-sm hover:bg-chocolate-dark/30',
      activo ? 'text-rose' : variant === 'plain' ? 'text-chocolate-dark/40' : 'text-cream',
    ]"
    @click.stop.prevent="toggle"
  >
    <span v-if="animando" class="burst" aria-hidden="true" @animationend="animando = false"></span>
    <span :class="{ pop: animando }" class="leading-none">{{ activo ? '♥' : '♡' }}</span>
  </button>
</template>

<style scoped>
@keyframes pop {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.35);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes burst {
  from {
    transform: scale(0.4);
    opacity: 0.8;
  }
  to {
    transform: scale(1.6);
    opacity: 0;
  }
}

.pop {
  display: inline-block;
  animation: pop 0.45s ease-out;
}

.burst {
  position: absolute;
  inset: 0;
  border-radius: 9999px;
  border: 2px solid var(--color-rose);
  animation: burst 0.5s ease-out forwards;
}
</style>
