<script setup lang="ts">
import productos from '../data/productos.json'
import ProductCard from '../components/productos/ProductCard.vue'

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

function productosPorSub(catKey: string, subKey?: string) {
  return productos.filter((p) => p.categoria === catKey && (!subKey || p.subcategoria === subKey))
}

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <div class="py-16 px-4">
    <h1 class="text-4xl font-bold text-center mb-12 text-rose">Nuestro Menú</h1>

    <div class="flex gap-8 max-w-7xl mx-auto relative">
      <aside class="hidden lg:block w-56 shrink-0">
        <nav class="sticky top-28 space-y-1 border-l-2 border-toffee/20 pl-4">
          <button
            v-for="cat in categorias"
            :key="cat.key"
            @click="scrollTo(cat.key)"
            class="block w-full text-left text-sm font-medium text-chocolate-dark/60 hover:text-rose transition-colors cursor-pointer"
          >
            {{ cat.label }}
            <div v-if="cat.subs" class="ml-3 mt-0.5 space-y-0.5">
              <button
                v-for="sub in cat.subs"
                :key="sub.key"
                @click.stop="scrollTo(sub.key)"
                class="block w-full text-left text-xs text-chocolate-dark/40 hover:text-rose transition-colors cursor-pointer"
              >
                {{ sub.label }}
              </button>
            </div>
          </button>
        </nav>
      </aside>

      <div class="flex-1 min-w-0">
        <section
          v-for="cat in categorias"
          :key="cat.key"
          :id="cat.key"
          class="mb-16 scroll-mt-28"
        >
          <h2 class="text-3xl font-bold mb-8 text-chocolate-dark">
            {{ cat.label }}
          </h2>

          <template v-if="cat.subs">
            <div v-for="sub in cat.subs" :key="sub.key" :id="sub.key" class="mb-10 scroll-mt-28">
              <h3 class="text-xl font-semibold mb-4 text-toffee">{{ sub.label }}</h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <ProductCard
                  v-for="p in productosPorSub(cat.key, sub.key)"
                  :key="p.id"
                  :id="p.id"
                  :slug="p.slug"
                  :nombre="p.nombre"
                  :descripcionCorta="p.descripcionCorta"
                  :imagen="p.imagenes[0] ?? ''"
                />
              </div>
            </div>
          </template>

          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ProductCard
              v-for="p in productosPorSub(cat.key)"
              :key="p.id"
              :id="p.id"
              :slug="p.slug"
              :nombre="p.nombre"
              :descripcionCorta="p.descripcionCorta"
              :imagen="p.imagenes[0] ?? ''"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
