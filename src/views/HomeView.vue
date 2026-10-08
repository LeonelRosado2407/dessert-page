<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HeroBanner from '@/components/home/HeroBanner.vue'
import AboutUs from '@/components/home/AboutUs.vue'
import MiniGallery from '@/components/home/MiniGallery.vue'
import TopProducts from '@/components/home/TopProducts.vue'
import ReviewsSection from '@/components/home/ReviewsSection.vue'
import FAQ from '@/components/home/FAQ.vue'
import ContactSection from '@/components/home/ContactSection.vue'
import { scrollToId } from '@/utils/scrollToId'

const menuOpen = ref(false)
const showButton = ref(true)
let observer: IntersectionObserver | null = null

const sections = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'nosotros', label: 'Nosotros' },
  { id: 'galeria', label: 'Galería' },
  { id: 'destacados', label: 'Destacados' },
  { id: 'resenas', label: 'Reseñas' },
  { id: 'preguntas', label: 'Preguntas' },
  { id: 'contacto', label: 'Contacto' },
]

function scrollTo(id: string) {
  scrollToId(id)
  menuOpen.value = false
}

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

onMounted(() => {
  const el = document.getElementById('contacto')
  if (el) {
    observer = new IntersectionObserver(
      ([entry]) => { if (entry) showButton.value = !entry.isIntersecting },
      { threshold: 0.3 },
    )
    observer.observe(el)
  }
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <HeroBanner />
  <AboutUs />
  <MiniGallery />
  <TopProducts />
  <ReviewsSection />
  <FAQ />
  <ContactSection />

  <div
    v-if="showButton"
    class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
  >
    <Transition name="nav-menu">
      <nav
        v-if="menuOpen"
        class="border border-toffee/30 rounded-xl bg-cream shadow-lg overflow-hidden"
      >
        <a
          v-for="s in sections"
          :key="s.id"
          @click="scrollTo(s.id)"
          class="block px-5 py-2.5 text-sm font-medium text-chocolate-dark/70 hover:text-rose hover:bg-rose/5 transition-colors cursor-pointer first:rounded-t-xl last:rounded-b-xl"
        >{{ s.label }}</a>
      </nav>
    </Transition>

    <button
      @click="toggleMenu"
      class="flex items-center gap-2 px-5 py-3 rounded-full bg-rose text-cream font-semibold text-sm shadow-lg hover:bg-rose/90 transition-colors cursor-pointer pulse-btn z-10"
    >
      <span>{{ menuOpen ? 'Cerrar' : 'Navegar' }}</span>
      <span
        class="text-lg transition-transform duration-300"
        :class="menuOpen ? 'rotate-45' : 'arrow-bounce'"
      >+</span>
    </button>
  </div>
</template>

<style scoped>
@keyframes slide-up {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-btn {
  0%, 100% { box-shadow: 0 0 0 0 rgba(166, 93, 87, 0.5); }
  50% { box-shadow: 0 0 0 12px rgba(166, 93, 87, 0); }
}

.pulse-btn {
  animation: slide-up 0.5s ease-out forwards, pulse-btn 2s 0.5s infinite;
}

@keyframes arrow-bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(4px); }
}

.arrow-bounce {
  animation: arrow-bounce 1.2s ease-in-out infinite;
}

.nav-menu-enter-active {
  transition: all 0.25s ease-out;
}

.nav-menu-leave-active {
  transition: all 0.2s ease-in;
}

.nav-menu-enter-from,
.nav-menu-leave-to {
  opacity: 0;
  transform: translateY(8px) scale(0.95);
}
</style>
