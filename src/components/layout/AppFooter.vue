<script setup lang="ts">
import { RouterLink } from 'vue-router'
import company from '@/data/company.json'
import { horario, formatTurno } from '@/utils/horario'
import OpenBadge from './OpenBadge.vue'

const links = [
  { to: '/', label: 'Inicio' },
  { to: '/productos', label: 'Menú' },
  { to: '/productos?fav=1', label: 'Mis favoritos' },
  { to: '/historia', label: 'Nuestra historia' },
]

const { street, city, state } = company.address
</script>

<template>
  <footer class="bg-chocolate-dark text-cream/80">
    <div class="max-w-6xl mx-auto px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      <div>
        <RouterLink to="/" class="font-display text-2xl font-bold text-cream">
          {{ company.name }}
        </RouterLink>
        <p class="mt-3 text-sm leading-relaxed">{{ company.eslogan }}</p>
        <div class="flex gap-3 mt-5">
          <a
            :href="company.redes.instagram"
            target="_blank"
            rel="noopener"
            aria-label="Instagram"
            class="social-icon"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-5 h-5">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a
            :href="company.redes.facebook"
            target="_blank"
            rel="noopener"
            aria-label="Facebook"
            class="social-icon"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5">
              <path
                d="M13.5 21v-7.5h2.5l.4-3h-2.9V8.6c0-.9.3-1.5 1.5-1.5h1.5V4.4c-.3 0-1.2-.1-2.2-.1-2.2 0-3.7 1.3-3.7 3.8v2.4H8v3h2.6V21h2.9Z"
              />
            </svg>
          </a>
          <a
            :href="`https://wa.me/${company.whatsapp}`"
            target="_blank"
            rel="noopener"
            aria-label="WhatsApp"
            class="social-icon"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="w-5 h-5">
              <path
                d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8L4 20Z"
                stroke-linejoin="round"
              />
              <path
                d="M9 9.5c0 3 2.5 5.5 5.5 5.5l1-1.5-2-1-1 .8a3.5 3.5 0 0 1-1.8-1.8l.8-1-1-2L9 9.5Z"
                stroke-linejoin="round"
                stroke-width="1.4"
              />
            </svg>
          </a>
        </div>
      </div>

      <nav aria-label="Pie de página">
        <h3 class="footer-title">Explora</h3>
        <ul class="space-y-2 text-sm">
          <li v-for="link in links" :key="link.to">
            <RouterLink :to="link.to" class="hover:text-toffee transition-colors">
              {{ link.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div>
        <h3 class="footer-title">Horario</h3>
        <dl class="space-y-1 text-sm">
          <div v-for="turno in horario" :key="turno.etiqueta" class="flex justify-between gap-4">
            <dt>{{ turno.etiqueta }}</dt>
            <dd class="text-cream">{{ formatTurno(turno) }}</dd>
          </div>
        </dl>
        <div class="mt-4">
          <OpenBadge tone="dark" />
        </div>
      </div>

      <div>
        <h3 class="footer-title">Contacto</h3>
        <address class="not-italic space-y-2 text-sm">
          <p>{{ street }}<br />{{ city }}, {{ state }}</p>
          <p>
            <a
              :href="`tel:${company.telefono.replace(/\s/g, '')}`"
              class="hover:text-toffee transition-colors"
            >
              {{ company.telefono }}
            </a>
          </p>
          <p>
            <a :href="`mailto:${company.email}`" class="hover:text-toffee transition-colors">
              {{ company.email }}
            </a>
          </p>
        </address>
      </div>
    </div>

    <div class="border-t border-cream/10">
      <p class="max-w-6xl mx-auto px-6 py-5 text-xs text-cream/50 text-center sm:text-left">
        &copy; {{ new Date().getFullYear() }} {{ company.name }} · Repostería artesanal
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer-title {
  margin-bottom: 0.75rem;
  font-family: var(--font-body);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--color-toffee);
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  border: 1px solid color-mix(in oklab, var(--color-cream) 25%, transparent);
  transition:
    background-color 0.2s,
    color 0.2s,
    transform 0.2s;
}

.social-icon:hover {
  background: var(--color-cream);
  color: var(--color-chocolate-dark);
  transform: translateY(-2px);
}
</style>
