<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

const links = [
  { to: '/', label: 'Inicio', exact: true },
  { to: '/productos', label: 'Menú', exact: false },
  { to: '/historia', label: 'Historia', exact: false },
]

const solid = computed(() => scrolled.value || menuOpen.value)

// Por prefijo: /productos/:slug es ruta hermana, no hija, así que RouterLink no la marca activa
function isActive(link: (typeof links)[number]) {
  return link.exact ? route.path === link.to : route.path.startsWith(link.to)
}

function updateScrollState() {
  scrolled.value = route.name !== 'home' || window.scrollY > 80
}

function onScroll() {
  if (route.name === 'home') {
    scrolled.value = window.scrollY > 80
  }
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') menuOpen.value = false
}

onMounted(() => {
  updateScrollState()
  window.addEventListener('scroll', onScroll)
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
})

// route.name llega después del montaje en la primera carga
watch(() => route.name, updateScrollState)

watch(
  () => route.fullPath,
  () => {
    menuOpen.value = false
    updateScrollState()
  },
)
</script>

<template>
  <nav
    class="fixed top-0 inset-x-0 z-50 transition-colors duration-300"
    :class="solid ? 'bg-cream/95 text-chocolate-dark shadow-sm backdrop-blur' : 'bg-transparent text-cream'"
  >
    <div class="flex items-center gap-6 px-6 py-4">
      <RouterLink to="/" class="font-bold text-lg" :class="solid ? 'text-rose' : 'text-cream'">
        Dulce Tentación
      </RouterLink>

      <div class="hidden md:flex gap-6 ml-auto">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="nav-link hover:text-rose transition-colors"
          :class="{ 'nav-link-active': isActive(link) }"
        >
          {{ link.label }}
        </RouterLink>
      </div>

      <button
        class="md:hidden ml-auto relative w-8 h-8 cursor-pointer"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        :aria-label="menuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="menuOpen = !menuOpen"
      >
        <span
          class="burger-line top-2"
          :class="menuOpen ? 'translate-y-[7px] rotate-45' : ''"
        ></span>
        <span class="burger-line top-[15px]" :class="menuOpen ? 'opacity-0' : ''"></span>
        <span
          class="burger-line top-[22px]"
          :class="menuOpen ? '-translate-y-[7px] -rotate-45' : ''"
        ></span>
      </button>
    </div>

    <Transition name="mobile-menu">
      <div v-if="menuOpen" id="mobile-menu" class="md:hidden border-t border-toffee/20">
        <RouterLink
          v-for="(link, i) in links"
          :key="link.to"
          :to="link.to"
          class="mobile-link block px-6 py-3 text-base font-medium hover:text-rose hover:bg-rose/5 transition-colors"
          :style="{ transitionDelay: `${i * 40}ms` }"
          :class="{ 'text-rose': isActive(link) }"
        >
          {{ link.label }}
        </RouterLink>
      </div>
    </Transition>
  </nav>
</template>

<style scoped>
.nav-link {
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -4px;
  height: 2px;
  border-radius: 1px;
  background: var(--color-rose);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-link:hover::after,
.nav-link-active::after {
  transform: scaleX(1);
}

.burger-line {
  position: absolute;
  left: 4px;
  right: 4px;
  height: 2px;
  border-radius: 1px;
  background: currentColor;
  transition:
    transform 0.3s ease,
    opacity 0.2s ease;
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

.mobile-menu-enter-active .mobile-link {
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.mobile-menu-enter-from .mobile-link {
  opacity: 0;
  transform: translateX(-12px);
}
</style>
