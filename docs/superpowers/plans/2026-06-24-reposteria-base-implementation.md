# Repostería Web — Base Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Scaffold the structural base for a bakery/pastry shop website with Vue 3 + TypeScript

**Architecture:** Multi-page SPA with Vue Router; home page composed of sections; products from static JSON data; no styling/animation yet.

**Tech Stack:** Vue 3, TypeScript, Vue Router, Pinia, Tailwind CSS, Vite

## Global Constraints
- All `.vue` file names in English
- No design styling, animations, or visual refinements — structure only
- All data is static JSON (no backend/API)
- TypeScript in all `<script setup lang="ts">` blocks
- Pinia store not needed for this base (data is JSON-imported directly)

---

### Task 1: Data + Router + Config Foundation

**Files:**
- Create: `src/data/productos.json`
- Modify: `src/router/index.ts`
- Modify: `index.html`

**Interfaces:**
- Consumes: nothing
- Produces: `Producto[]` type shape, route table with 4 routes, HTML title

- [ ] **Step 1: Create `src/data/productos.json`** with 4-5 sample products

```json
[
  {
    "id": 1,
    "slug": "tarta-de-frutos-rojos",
    "nombre": "Tarta de Frutos Rojos",
    "descripcionCorta": "Tarta con fresas, arándanos y frambuesas frescas",
    "descripcion": "Nuestra tarta estrella elaborada con frutas de temporada...",
    "historia": "Esta receta nació en 1998 cuando la abuela Rosa mezcló los frutos rojos del huerto familiar por primera vez...",
    "imagenes": ["/images/tarta-frutos-rojos-1.jpg", "/images/tarta-frutos-rojos-2.jpg"],
    "videoUrl": "https://www.youtube.com/embed/example1",
    "categoria": "pasteles"
  },
  {
    "id": 2,
    "slug": "croissant-de-almendra",
    "nombre": "Croissant de Almendra",
    "descripcionCorta": "Croissant artesanal relleno de crema de almendra",
    "descripcion": "Hojaldrado y crujiente por fuera, suave por dentro...",
    "historia": "Inspirado en un viaje a París, nuestro maestro pastelero perfeccionó esta receta durante meses...",
    "imagenes": ["/images/croissant-almendra-1.jpg"],
    "videoUrl": "",
    "categoria": "panaderia"
  },
  {
    "id": 3,
    "slug": "macarons-surtidos",
    "nombre": "Macarons Surtidos",
    "descripcionCorta": "Selección de 6 sabores clásicos franceses",
    "descripcion": "Delicados macarons con rellenos artesanales...",
    "historia": "Los macarons llegaron a nuestra tienda como un reto personal de nuestra pastelera principal...",
    "imagenes": ["/images/macarons-1.jpg", "/images/macarons-2.jpg", "/images/macarons-3.jpg"],
    "videoUrl": "",
    "categoria": "pasteles"
  },
  {
    "id": 4,
    "slug": "cheesecake-new-york",
    "nombre": "Cheesecake New York",
    "descripcionCorta": "Cheesecake cremoso estilo neoyorquino",
    "descripcion": "Receta familiar horneada a baño María...",
    "historia": "Nuestra versión del clásico neoyorquino, adaptada con ingredientes locales...",
    "imagenes": ["/images/cheesecake-1.jpg"],
    "videoUrl": "",
    "categoria": "pasteles"
  }
]
```

- [ ] **Step 2: Modify `src/router/index.ts`** — add routes for productos, producto-detalle, historia

```typescript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/productos',
      name: 'productos',
      component: () => import('../views/ProductosView.vue'),
    },
    {
      path: '/productos/:slug',
      name: 'producto-detalle',
      component: () => import('../views/ProductoDetalleView.vue'),
    },
    {
      path: '/historia',
      name: 'historia',
      component: () => import('../views/HistoryView.vue'),
    },
  ],
})

export default router
```

- [ ] **Step 3: Update `index.html`** title

Replace `<title>Vite App</title>` with `<title>Dulce Tentación - Repostería Artesanal</title>` (or similar placeholder name).

- [ ] **Step 4: Create directories** for new components

```bash
mkdir src/components/layout src/components/home src/components/productos src/data
```

---

### Task 2: Layout Components + App.vue

**Files:**
- Create: `src/components/layout/AppNavbar.vue`
- Create: `src/components/layout/AppFooter.vue`
- Modify: `src/App.vue`

**Interfaces:**
- Consumes: router from Task 1
- Produces: `<AppNavbar />` and `<AppFooter />` — present on every page

- [ ] **Step 1: Create `AppNavbar.vue`**

```vue
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Inicio</RouterLink>
    <RouterLink to="/productos">Productos</RouterLink>
    <RouterLink to="/historia">Historia</RouterLink>
  </nav>
</template>
```

- [ ] **Step 2: Create `AppFooter.vue`**

```vue
<template>
  <footer>
    <p>&copy; {{ new Date().getFullYear() }} Dulce Tentación - Repostería Artesanal</p>
  </footer>
</template>
```

- [ ] **Step 3: Update `App.vue`** — replace header with AppNavbar, add AppFooter around RouterView

```vue
<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from './components/layout/AppNavbar.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<template>
  <AppNavbar />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>
```

---

### Task 3: Home Page Sections + HomeView

**Files:**
- Create: `src/data/reviews.json`
- Create: `src/data/faq.json`
- Create: `src/components/home/HeroBanner.vue`
- Create: `src/components/home/AboutUs.vue`
- Create: `src/components/home/MiniGallery.vue`
- Create: `src/components/home/TopProducts.vue`
- Create: `src/components/home/Reviews.vue`
- Create: `src/components/home/FAQ.vue`
- Create: `src/components/home/ContactSection.vue`
- Modify: `src/views/HomeView.vue`

**Interfaces:**
- Consumes: `src/data/productos.json` (for MiniGallery and TopProducts), `src/data/reviews.json`, `src/data/faq.json`
- Produces: `<HomeView />` with 7 sections

- [ ] **Step 1: Create `src/data/reviews.json`**

```json
[
  {
    "id": 1,
    "nombre": "María García",
    "texto": "Los mejores pasteles que he probado. La tarta de frutos rojos es espectacular.",
    "rating": 5
  },
  {
    "id": 2,
    "nombre": "Carlos López",
    "texto": "Pedimos el pastel de bodas y superó todas nuestras expectativas.",
    "rating": 5
  },
  {
    "id": 3,
    "nombre": "Ana Martínez",
    "texto": "Siempre compro los croissants los domingos. Son increíbles.",
    "rating": 4
  }
]
```

- [ ] **Step 2: Create `src/data/faq.json`**

```json
[
  {
    "id": 1,
    "pregunta": "¿Hacen pasteles personalizados?",
    "respuesta": "Sí, aceptamos pedidos personalizados con al menos 72 horas de anticipación."
  },
  {
    "id": 2,
    "pregunta": "¿Tienen opciones sin gluten?",
    "respuesta": "Contamos con una selección de productos sin gluten. Consulta disponibilidad."
  },
  {
    "id": 3,
    "pregunta": "¿Hacen entregas a domicilio?",
    "respuesta": "Sí, realizamos entregas dentro de la ciudad. El costo varía según la zona."
  }
]
```

- [ ] **Step 3: Create `HeroBanner.vue`**

```vue
<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <section>
    <h1>Dulce Tentación</h1>
    <p>Repostería artesanal desde 1985</p>
    <RouterLink to="/productos">Ver nuestros productos</RouterLink>
  </section>
</template>
```

- [ ] **Step 4: Create `AboutUs.vue`**

```vue
<template>
  <section>
    <h2>Quiénes Somos</h2>
    <p>Placeholder: descripción corta de la repostería...</p>
  </section>
</template>
```

- [ ] **Step 5: Create `MiniGallery.vue`** — 6 images Pinterest-style cards

```vue
<script setup lang="ts">
import productos from '../../data/productos.json'
</script>

<template>
  <section>
    <h2>Galería</h2>
    <div>
      <article v-for="item in productos.slice(0, 6)" :key="item.id">
        <img :src="item.imagenes[0]" :alt="item.nombre" />
        <p>{{ item.nombre }}</p>
      </article>
    </div>
  </section>
</template>
```

- [ ] **Step 6: Create `TopProducts.vue`** — alternating list (img|text, text|img, img|text)

```vue
<script setup lang="ts">
import productos from '../../data/productos.json'

const top = productos.slice(0, 3)
</script>

<template>
  <section>
    <h2>Productos Destacados</h2>
    <div>
      <article v-for="(item, i) in top" :key="item.id">
        <img v-if="i % 2 === 0" :src="item.imagenes[0]" :alt="item.nombre" />
        <div>
          <h3>{{ item.nombre }}</h3>
          <p>{{ item.descripcionCorta }}</p>
        </div>
        <img v-if="i % 2 !== 0" :src="item.imagenes[0]" :alt="item.nombre" />
      </article>
    </div>
  </section>
</template>
```

- [ ] **Step 7: Create `Reviews.vue`**

```vue
<script setup lang="ts">
import reviews from '../../data/reviews.json'
</script>

<template>
  <section>
    <h2>Reseñas</h2>
    <article v-for="review in reviews" :key="review.id">
      <p>"{{ review.texto }}"</p>
      <p>— {{ review.nombre }} ({{ review.rating }}/5)</p>
    </article>
  </section>
</template>
```

- [ ] **Step 8: Create `FAQ.vue`**

```vue
<script setup lang="ts">
import faqs from '../../data/faq.json'
</script>

<template>
  <section>
    <h2>Preguntas Frecuentes</h2>
    <article v-for="faq in faqs" :key="faq.id">
      <h3>{{ faq.pregunta }}</h3>
      <p>{{ faq.respuesta }}</p>
    </article>
  </section>
</template>
```

- [ ] **Step 9: Create `ContactSection.vue`**

```vue
<template>
  <section>
    <h2>Contacto</h2>
    <p>Dirección: placeholder</p>
    <p>Teléfono: placeholder</p>
    <p>Horario: Lunes a sábado, 8:00 - 20:00</p>
  </section>
</template>
```

- [ ] **Step 10: Update `HomeView.vue`**

```vue
<script setup lang="ts">
import HeroBanner from '@/components/home/HeroBanner.vue'
import AboutUs from '@/components/home/AboutUs.vue'
import MiniGallery from '@/components/home/MiniGallery.vue'
import TopProducts from '@/components/home/TopProducts.vue'
import Reviews from '@/components/home/Reviews.vue'
import FAQ from '@/components/home/FAQ.vue'
import ContactSection from '@/components/home/ContactSection.vue'
</script>

<template>
  <HeroBanner />
  <AboutUs />
  <MiniGallery />
  <TopProducts />
  <Reviews />
  <FAQ />
  <ContactSection />
</template>
```

---

### Task 4: Product Components + Pages

**Files:**
- Create: `src/components/productos/ProductCard.vue`
- Create: `src/components/productos/ProductGallery.vue`
- Create: `src/views/ProductosView.vue`
- Create: `src/views/ProductoDetalleView.vue`

**Interfaces:**
- Consumes: `src/data/productos.json` from Task 1, `Producto` type `{ id: number; slug: string; nombre: string; descripcionCorta: string; descripcion: string; historia: string; imagenes: string[]; videoUrl: string; categoria: string }`
- Produces: product gallery page, product detail page (blog-style with images, descripcion, video, historia)

- [ ] **Step 1: Create `src/types/index.ts`** — TypeScript type for Producto

```typescript
export interface Producto {
  id: number
  slug: string
  nombre: string
  descripcionCorta: string
  descripcion: string
  historia: string
  imagenes: string[]
  videoUrl: string
  categoria: string
}
```

- [ ] **Step 2: Create `ProductCard.vue`**

```vue
<script setup lang="ts">
defineProps<{
  slug: string
  nombre: string
  descripcionCorta: string
  imagen: string
}>()
</script>

<template>
  <article>
    <img :src="imagen" :alt="nombre" />
    <h3>{{ nombre }}</h3>
    <p>{{ descripcionCorta }}</p>
    <RouterLink :to="`/productos/${slug}`">Ver más</RouterLink>
  </article>
</template>
```

- [ ] **Step 3: Create `ProductGallery.vue`**

```vue
<script setup lang="ts">
import type { Producto } from '../../types'
import ProductCard from './ProductCard.vue'

defineProps<{
  productos: Producto[]
}>()
</script>

<template>
  <div>
    <ProductCard
      v-for="producto in productos"
      :key="producto.id"
      :slug="producto.slug"
      :nombre="producto.nombre"
      :descripcionCorta="producto.descripcionCorta"
      :imagen="producto.imagenes[0] ?? ''"
    />
  </div>
</template>
```

- [ ] **Step 4: Create `ProductosView.vue`**

```vue
<script setup lang="ts">
import productos from '../data/productos.json'
import ProductGallery from '../components/productos/ProductGallery.vue'
</script>

<template>
  <h1>Productos Insignia</h1>
  <ProductGallery :productos="productos" />
</template>
```

- [ ] **Step 5: Create `ProductoDetalleView.vue`** — blog-style page

```vue
<script setup lang="ts">
import { useRoute, RouterLink } from 'vue-router'
import productos from '../data/productos.json'

const route = useRoute()
const producto = productos.find((p) => p.slug === route.params.slug)
</script>

<template>
  <article v-if="producto">
    <RouterLink to="/productos">← Volver a productos</RouterLink>

    <header>
      <h1>{{ producto.nombre }}</h1>
      <p>{{ producto.descripcionCorta }}</p>
    </header>

    <section v-if="producto.imagenes.length">
      <img
        v-for="(img, i) in producto.imagenes"
        :key="i"
        :src="img"
        :alt="`${producto.nombre} - imagen ${i + 1}`"
      />
    </section>

    <section>
      <h2>Descripción</h2>
      <p>{{ producto.descripcion }}</p>
    </section>

    <section v-if="producto.videoUrl">
      <h2>Preparación</h2>
      <iframe
        :src="producto.videoUrl"
        title="Video del producto"
      ></iframe>
    </section>

    <section>
      <h2>Historia</h2>
      <p>{{ producto.historia }}</p>
    </section>
  </article>

  <div v-else>
    <h1>Producto no encontrado</h1>
    <RouterLink to="/productos">Volver a productos</RouterLink>
  </div>
</template>
```

---

### Task 5: History Page

**Files:**
- Create: `src/views/HistoryView.vue`

**Interfaces:**
- Consumes: nothing (static content)
- Produces: history page route (already in router from Task 1)

- [ ] **Step 1: Create `HistoryView.vue`**

```vue
<template>
  <article>
    <h1>Nuestra Historia</h1>
    <p>Placeholder: historia de la repostería familiar...</p>
    <p>Placeholder: cómo empezó, tradición familiar...</p>
  </article>
</template>
```

---

### Task 6: Verify project builds

- [ ] **Step 1: Run type-check**

```bash
npm run type-check
```

- [ ] **Step 2: Run build**

```bash
npm run build-only
```
