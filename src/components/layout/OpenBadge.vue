<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { estaAbierto } from '@/utils/horario'

defineProps<{
  // 'dark' para fondos oscuros (footer)
  tone?: 'light' | 'dark'
}>()

const abierto = ref(estaAbierto())
let timer: ReturnType<typeof setInterval> | undefined

onMounted(() => {
  timer = setInterval(() => (abierto.value = estaAbierto()), 60_000)
})
onUnmounted(() => clearInterval(timer))
</script>

<template>
  <span
    class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold"
    :class="
      tone === 'dark'
        ? abierto
          ? 'bg-emerald-400/15 text-emerald-300'
          : 'bg-cream/10 text-toffee'
        : abierto
          ? 'bg-emerald-600/15 text-emerald-700'
          : 'bg-rose/15 text-rose'
    "
  >
    <span class="relative flex w-2 h-2">
      <span
        v-if="abierto"
        class="absolute inline-flex w-full h-full rounded-full bg-emerald-500 opacity-75 animate-ping"
      ></span>
      <span
        class="relative inline-flex w-2 h-2 rounded-full"
        :class="abierto ? 'bg-emerald-500' : 'bg-rose'"
      ></span>
    </span>
    {{ abierto ? 'Abierto ahora' : 'Cerrado ahora' }}
  </span>
</template>
