<script setup lang="ts">
import { computed, watch, onUnmounted } from 'vue'
import ProductImage from './ProductImage.vue'

const props = defineProps<{
  images: string[]
  alt: string
}>()

const index = defineModel<number | null>({ required: true })

const abierto = computed(() => index.value !== null)

function cerrar() {
  index.value = null
}

function mover(delta: number) {
  if (index.value === null) return
  index.value = (index.value + delta + props.images.length) % props.images.length
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') cerrar()
  else if (e.key === 'ArrowRight') mover(1)
  else if (e.key === 'ArrowLeft') mover(-1)
}

watch(abierto, (open) => {
  document.body.style.overflow = open ? 'hidden' : ''
  if (open) window.addEventListener('keydown', onKeydown)
  else window.removeEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition name="lightbox">
      <div
        v-if="index !== null"
        role="dialog"
        aria-modal="true"
        :aria-label="alt"
        class="fixed inset-0 z-100 flex items-center justify-center bg-chocolate-dark/90 backdrop-blur-sm p-4"
        @click.self="cerrar"
      >
        <button
          type="button"
          aria-label="Cerrar"
          class="absolute top-4 right-4 w-10 h-10 rounded-full text-cream text-xl hover:bg-cream/10 transition-colors cursor-pointer"
          @click="cerrar"
        >
          ✕
        </button>

        <Transition name="lightbox-img" mode="out-in">
          <div :key="index" class="lightbox-frame w-full max-w-4xl h-[75vh]">
            <ProductImage
              :src="images[index]"
              :alt="`${alt} - imagen ${index + 1}`"
              fit="contain"
            />
          </div>
        </Transition>

        <template v-if="images.length > 1">
          <button
            type="button"
            aria-label="Imagen anterior"
            class="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/10 text-cream text-2xl hover:bg-cream/20 transition-colors cursor-pointer"
            @click="mover(-1)"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Imagen siguiente"
            class="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-cream/10 text-cream text-2xl hover:bg-cream/20 transition-colors cursor-pointer"
            @click="mover(1)"
          >
            ›
          </button>
          <p class="absolute bottom-5 inset-x-0 text-center text-sm text-cream/70">
            {{ index + 1 }} / {{ images.length }}
          </p>
        </template>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.25s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}

.lightbox-enter-active .lightbox-frame {
  transition: transform 0.3s ease-out;
}

.lightbox-enter-from .lightbox-frame {
  transform: scale(0.95);
}

.lightbox-img-enter-active,
.lightbox-img-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-img-enter-from,
.lightbox-img-leave-to {
  opacity: 0;
}
</style>
