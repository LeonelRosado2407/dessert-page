# Repostería Web — Base Estructural

## Stack
- Vue 3 + TypeScript + Vite
- Tailwind CSS v4
- Pinia (estado)
- Vue Router (navegación)

## Rutas

| Ruta | Vista | Propósito |
|------|-------|-----------|
| `/` | HomeView | Landing con secciones |
| `/productos` | ProductosView | Galería de productos insignia |
| `/productos/:slug` | ProductoDetalleView | Página tipo blog: imágenes, videos, descripción e historia del postre |
| `/historia` | HistoriaView | Historia de la repostería familiar |

## Árbol de componentes

```
App.vue
├── AppNavbar.vue (layout)
├── RouterView
│   ├── HomeView.vue
│   │   ├── HeroBanner.vue
│   │   ├── AboutUs.vue
│   │   ├── MiniGallery.vue
│   │   ├── TopProducts.vue
│   │   ├── Reviews.vue
│   │   ├── FAQ.vue
│   │   └── ContactSection.vue
│   ├── ProductosView.vue
│   │   └── ProductGallery.vue
│   │       └── ProductCard.vue (v-for)
│   ├── ProductoDetalleView.vue
│   └── HistoriaView.vue
└── AppFooter.vue (layout)
```

## Secciones del Home (orden)

1. **HeroBanner** — imagen fullscreen, nombre grande centrado, eslogan debajo
2. **AboutUs** — descripción corta de la repostería
3. **MiniGallery** — 6 imágenes estilo Pinterest masonry/cards
4. **TopProducts** — 3 productos destacados en formato lista alternada (img|text, text|img, img|text)
5. **Reviews** — reseñas de clientes
6. **FAQ** — preguntas frecuentes
7. **ContactSection** — ubicación, horarios, formulario de contacto

## Datos

- `src/data/productos.json` — JSON estático con array de productos insignia
- `src/data/reviews.json` — JSON estático con reseñas de clientes
- `src/data/faq.json` — JSON estático con preguntas frecuentes
- Cada producto: `{ id, slug, nombre, descripcionCorta, descripcion, historia, imagenes[], videoUrl, categoria }`
  - `descripcion`: texto largo sobre el postre
  - `historia`: párrafo sobre el origen/anécdota del postre
  - `imagenes[]`: array de URLs para galería de imágenes

## Lo que NO incluye (futuro)
- Animaciones/transiciones
- Diseño visual detallado (colores, tipografías)
- Responsive refinado
- Backend/CMS
