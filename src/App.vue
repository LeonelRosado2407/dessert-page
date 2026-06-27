<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppNavbar from './components/layout/AppNavbar.vue'
import AppFooter from './components/layout/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col bg-cream text-chocolate-dark font-body">
    <AppNavbar />
    <main class="flex-1">
      <RouterView v-slot="{ Component, route }">
        <Transition name="slide" mode="out-in">
          <div :key="route.path">
            <component :is="Component" />
          </div>
        </Transition>
      </RouterView>
    </main>
    <AppFooter />
  </div>
</template>

<style>
.slide-enter-active {
  transition: all 0.4s ease;
  transition-delay: 0.1s;
}

.slide-leave-active {
  transition: all 0.35s ease;
}

.slide-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
</style>
