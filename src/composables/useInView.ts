import { ref, onMounted, onUnmounted } from 'vue'

export function useInView(threshold = 0.15) {
  const target = ref<HTMLElement | null>(null)
  const isVisible = ref(false)

  onMounted(() => {
    const el = target.value
    if (!el) return
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting) {
          isVisible.value = true
          observer.unobserve(el)
        }
      },
      { threshold },
    )
    observer.observe(el)
    onUnmounted(() => observer.disconnect())
  })

  return { target, isVisible }
}
