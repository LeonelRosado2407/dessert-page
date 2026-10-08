<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  src?: string
  alt: string
  fit?: 'cover' | 'contain'
}>()

const failed = ref(false)

watch(
  () => props.src,
  () => {
    failed.value = false
  },
)
</script>

<template>
  <img
    v-if="src && !failed"
    :src="src"
    :alt="alt"
    loading="lazy"
    class="w-full h-full"
    :class="fit === 'contain' ? 'object-contain' : 'object-cover'"
    @error="failed = true"
  />
  <div
    v-else
    role="img"
    :aria-label="alt"
    class="w-full h-full flex flex-col items-center justify-center gap-1 bg-linear-to-br from-toffee/30 to-rose/20"
  >
    <span class="font-display text-5xl text-rose/60">{{ alt.charAt(0) }}</span>
    <span class="text-xs text-chocolate-dark/50 px-2 text-center">{{ alt }}</span>
  </div>
</template>
