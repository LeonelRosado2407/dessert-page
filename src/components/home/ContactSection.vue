<script setup lang="ts">
import { useInView } from '../../composables/useInView'
import company from '@/data/company.json'
import { horario, formatTurno } from '@/utils/horario'
import OpenBadge from '../layout/OpenBadge.vue'

const { target, isVisible } = useInView()

const { street, city, state, zip } = company.address
const direccion = `${street}, ${city}, ${state} ${zip}`
const mapaUrl = `https://www.google.com/maps?q=${company.mapa.lat},${company.mapa.lng}&z=16&output=embed`
const comoLlegarUrl = `https://www.google.com/maps/dir/?api=1&destination=${company.mapa.lat},${company.mapa.lng}`
</script>

<template>
  <section
    id="contacto"
    ref="target"
    class="py-16 px-4 bg-white/60 transition-all duration-700"
    :class="isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'"
  >
    <h2 class="text-3xl font-bold mb-3 text-center text-rose">Visítanos</h2>
    <p class="mb-10 text-center text-chocolate-dark/60">Te esperamos con café recién hecho.</p>

    <div class="max-w-5xl mx-auto grid gap-8 md:grid-cols-2 items-stretch">
      <div class="space-y-6">
        <div class="rounded-xl border border-toffee/30 bg-cream p-5">
          <h3 class="text-sm font-semibold uppercase tracking-wider text-toffee mb-2">Dirección</h3>
          <p class="text-chocolate-dark/80">{{ direccion }}</p>
          <a
            :href="comoLlegarUrl"
            target="_blank"
            rel="noopener"
            class="group inline-flex items-center gap-1 mt-3 text-sm font-semibold text-rose hover:text-toffee transition-colors"
          >
            Cómo llegar
            <span class="transition-transform group-hover:translate-x-1">→</span>
          </a>
        </div>

        <div class="rounded-xl border border-toffee/30 bg-cream p-5">
          <div class="flex items-center justify-between gap-3 mb-3">
            <h3 class="text-sm font-semibold uppercase tracking-wider text-toffee">Horario</h3>
            <OpenBadge />
          </div>
          <dl class="space-y-1.5 text-chocolate-dark/80">
            <div v-for="turno in horario" :key="turno.etiqueta" class="flex justify-between gap-4">
              <dt>{{ turno.etiqueta }}</dt>
              <dd class="font-medium">{{ formatTurno(turno) }}</dd>
            </div>
          </dl>
        </div>

        <div class="flex flex-wrap gap-3">
          <a
            :href="`https://wa.me/${company.whatsapp}`"
            target="_blank"
            rel="noopener"
            class="flex-1 min-w-40 text-center px-5 py-3 rounded-full bg-rose text-cream font-semibold hover:bg-toffee hover:text-chocolate-dark hover:-translate-y-0.5 transition-all"
          >
            WhatsApp
          </a>
          <a
            :href="`tel:${company.telefono.replace(/\s/g, '')}`"
            class="flex-1 min-w-40 text-center px-5 py-3 rounded-full border border-rose text-rose font-semibold hover:bg-rose hover:text-cream transition-colors"
          >
            Llamar
          </a>
        </div>
      </div>

      <div class="min-h-80 rounded-xl overflow-hidden border border-toffee/30 bg-toffee/10">
        <iframe
          :src="mapaUrl"
          title="Ubicación de Dulce Tentación"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="w-full h-full min-h-80"
        ></iframe>
      </div>
    </div>
  </section>
</template>
