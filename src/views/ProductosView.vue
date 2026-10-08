<script setup lang="ts">
import { ref, computed, watch, nextTick, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import productos from '../data/productos.json'
import ProductCard from '../components/productos/ProductCard.vue'
import { useFavoritosStore } from '../stores/favoritos'
import { scrollToId } from '../utils/scrollToId'

const categorias: { key: string; label: string; subs?: { key: string; label: string }[] }[] = [
  {
    key: 'bebidas',
    label: 'Bebidas',
    subs: [
      { key: 'cafe', label: 'Café' },
      { key: 'calientes', label: 'Otras Bebidas Calientes' },
      { key: 'frias', label: 'Bebidas Frías' },
    ],
  },
  { key: 'panaderia', label: 'Panadería y Horneado del Día' },
  {
    key: 'pasteles',
    label: 'Pasteles y Rebanadas',
    subs: [{ key: 'rebanadas', label: 'Pasteles y Rebanadas' }],
  },
  { key: 'individuales', label: 'Individuales' },
  { key: 'galletas', label: 'Galletas' },
  {
    key: 'especiales',
    label: 'Pasteles para Ocasiones Especiales',
    subs: [{ key: 'por-encargo', label: 'Por Encargo' }],
  },
]

const route = useRoute()
const router = useRouter()
const fav = useFavoritosStore()

const busqueda = ref(typeof route.query.q === 'string' ? route.query.q : '')
const soloFavoritos = ref(route.query.fav === '1')

// Sincroniza si la URL cambia estando en la página (p. ej. "Mis favoritos" en el footer)
watch(
  () => route.query,
  (query) => {
    busqueda.value = typeof query.q === 'string' ? query.q : ''
    soloFavoritos.value = query.fav === '1'
  },
)

watch([busqueda, soloFavoritos], ([q, f]) => {
  router.replace({ query: { ...(q ? { q } : {}), ...(f ? { fav: '1' } : {}) } })
})

function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()
}

const hayFiltros = computed(() => busqueda.value.trim() !== '' || soloFavoritos.value)

const filtrados = computed(() => {
  const q = normalizar(busqueda.value.trim())
  return productos.filter(
    (p) =>
      (!soloFavoritos.value || fav.esFavorito(p.id)) &&
      (!q || normalizar(`${p.nombre} ${p.descripcionCorta}`).includes(q)),
  )
})

function productosPorSub(catKey: string, subKey?: string) {
  return filtrados.value.filter(
    (p) => p.categoria === catKey && (!subKey || p.subcategoria === subKey),
  )
}

const categoriasVisibles = computed(() =>
  categorias
    .map((cat) => ({
      ...cat,
      subs: cat.subs?.filter((sub) => productosPorSub(cat.key, sub.key).length > 0),
    }))
    .filter((cat) => productosPorSub(cat.key).length > 0),
)

function limpiarFiltros() {
  busqueda.value = ''
  soloFavoritos.value = false
}

// Resalta la categoría que está en pantalla (chips en móvil y sidebar en desktop)
const activeCat = ref('')
const chipsRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

watch(
  categoriasVisibles,
  async () => {
    await nextTick()
    observer?.disconnect()
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeCat.value = (entry.target as HTMLElement).id
        }
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    document.querySelectorAll('[data-categoria]').forEach((el) => observer?.observe(el))
  },
  { immediate: true },
)

watch(activeCat, (key) => {
  const container = chipsRef.value
  const chip = container?.querySelector<HTMLElement>(`[data-chip="${key}"]`)
  if (!container || !chip) return
  container.scrollTo({
    left: chip.offsetLeft - container.clientWidth / 2 + chip.clientWidth / 2,
    behavior: 'smooth',
  })
})

onUnmounted(() => observer?.disconnect())
</script>

<template>
  <div class="py-16 px-4">
    <h1 class="text-4xl font-bold text-center mb-8 text-rose">Nuestro Menú</h1>

    <div
      class="sticky top-15 z-30 -mx-4 px-4 py-3 mb-8 bg-cream/95 backdrop-blur lg:static lg:mx-auto lg:max-w-7xl lg:px-0 lg:bg-transparent lg:backdrop-blur-none"
    >
      <div class="flex gap-3 max-w-7xl mx-auto lg:justify-end">
        <label class="relative flex-1 lg:flex-none lg:w-80">
          <span class="sr-only">Buscar en el menú</span>
          <svg
            class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-chocolate-dark/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" stroke-linecap="round" />
          </svg>
          <input
            v-model="busqueda"
            type="text"
            enterkeyhint="search"
            placeholder="Buscar café, pastel, galleta…"
            class="w-full h-10 pl-9 pr-9 rounded-full border border-toffee/40 bg-white/70 text-sm placeholder:text-chocolate-dark/40 focus:outline-none focus:border-rose focus:ring-2 focus:ring-rose/20 transition"
          />
          <button
            v-if="busqueda"
            type="button"
            aria-label="Borrar búsqueda"
            class="absolute right-3 top-1/2 -translate-y-1/2 text-chocolate-dark/40 hover:text-rose transition-colors cursor-pointer"
            @click="busqueda = ''"
          >
            ✕
          </button>
        </label>
        <button
          type="button"
          :aria-pressed="soloFavoritos"
          class="shrink-0 h-10 px-4 rounded-full border text-sm font-medium transition-colors cursor-pointer"
          :class="
            soloFavoritos
              ? 'bg-rose border-rose text-cream'
              : 'border-toffee/40 bg-white/70 text-chocolate-dark/70 hover:border-rose hover:text-rose'
          "
          @click="soloFavoritos = !soloFavoritos"
        >
          {{ soloFavoritos ? '♥' : '♡' }} Favoritos
          <span v-if="fav.ids.length" class="ml-1 opacity-80">({{ fav.ids.length }})</span>
        </button>
      </div>

      <div
        v-if="categoriasVisibles.length"
        ref="chipsRef"
        class="lg:hidden flex gap-2 mt-3 overflow-x-auto no-scrollbar"
      >
        <button
          v-for="cat in categoriasVisibles"
          :key="cat.key"
          :data-chip="cat.key"
          type="button"
          class="shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors cursor-pointer"
          :class="
            activeCat === cat.key
              ? 'bg-chocolate-dark border-chocolate-dark text-cream'
              : 'border-toffee/40 text-chocolate-dark/70'
          "
          @click="scrollToId(cat.key)"
        >
          {{ cat.label }}
        </button>
      </div>
    </div>

    <p v-if="hayFiltros && filtrados.length" class="max-w-7xl mx-auto mb-6 text-sm text-chocolate-dark/60">
      {{ filtrados.length }} {{ filtrados.length === 1 ? 'resultado' : 'resultados' }}
    </p>

    <div v-if="categoriasVisibles.length" class="flex gap-8 max-w-7xl mx-auto relative">
      <aside class="hidden lg:block w-56 shrink-0">
        <nav class="sticky top-28 space-y-1 border-l-2 border-toffee/20 pl-4">
          <div v-for="cat in categoriasVisibles" :key="cat.key">
            <button
              @click="scrollToId(cat.key)"
              class="block w-full text-left text-sm font-medium hover:text-rose transition-colors cursor-pointer"
              :class="activeCat === cat.key ? 'text-rose' : 'text-chocolate-dark/60'"
            >
              {{ cat.label }}
            </button>
            <div v-if="cat.subs" class="ml-3 mt-0.5 space-y-0.5">
              <button
                v-for="sub in cat.subs"
                :key="sub.key"
                @click="scrollToId(sub.key)"
                class="block w-full text-left text-xs text-chocolate-dark/40 hover:text-rose transition-colors cursor-pointer"
              >
                {{ sub.label }}
              </button>
            </div>
          </div>
        </nav>
      </aside>

      <div class="flex-1 min-w-0">
        <section
          v-for="cat in categoriasVisibles"
          :key="cat.key"
          :id="cat.key"
          data-categoria
          class="mb-16 scroll-mt-48 lg:scroll-mt-28"
        >
          <h2 class="text-3xl font-bold mb-8 text-chocolate-dark">
            {{ cat.label }}
          </h2>

          <template v-if="cat.subs">
            <div
              v-for="sub in cat.subs"
              :key="sub.key"
              :id="sub.key"
              class="mb-10 scroll-mt-48 lg:scroll-mt-28"
            >
              <h3 class="text-xl font-semibold mb-4 text-toffee">{{ sub.label }}</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProductCard
                  v-for="(p, i) in productosPorSub(cat.key, sub.key)"
                  :key="p.id"
                  :id="p.id"
                  :slug="p.slug"
                  :nombre="p.nombre"
                  :descripcionCorta="p.descripcionCorta"
                  :imagen="p.main_img ?? p.imagenes[0] ?? ''"
                  :precio="p.precio"
                  :index="i"
                />
              </div>
            </div>
          </template>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard
              v-for="(p, i) in productosPorSub(cat.key)"
              :key="p.id"
              :id="p.id"
              :slug="p.slug"
              :nombre="p.nombre"
              :descripcionCorta="p.descripcionCorta"
              :imagen="p.main_img ?? p.imagenes[0] ?? ''"
              :precio="p.precio"
              :index="i"
            />
          </div>
        </section>
      </div>
    </div>

    <div v-else class="max-w-md mx-auto py-16 text-center">
      <p class="text-5xl mb-4 text-rose/60">{{ soloFavoritos && !busqueda ? '♡' : '☕' }}</p>
      <p class="text-lg font-semibold mb-2 text-chocolate-dark">
        {{
          soloFavoritos && !busqueda
            ? 'Aún no tienes favoritos'
            : 'No encontramos nada con esa búsqueda'
        }}
      </p>
      <p class="text-sm text-chocolate-dark/60 mb-6">
        {{
          soloFavoritos && !busqueda
            ? 'Toca el ♡ de cualquier producto para guardarlo aquí.'
            : 'Prueba con otra palabra o quita los filtros.'
        }}
      </p>
      <button
        type="button"
        class="px-5 py-2 rounded-full border border-rose text-rose hover:bg-rose hover:text-cream transition-colors cursor-pointer"
        @click="limpiarFiltros"
      >
        Ver todo el menú
      </button>
    </div>
  </div>
</template>

<style scoped>
.no-scrollbar {
  scrollbar-width: none;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
