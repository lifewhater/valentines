<template>
  <main class="min-h-screen w-full bg-[#0f0019] text-[#e9d7ff] px-3 py-4">
    <header class="mx-auto mb-3 max-w-5xl text-center">
      <h1 class="text-lg font-semibold tracking-wide sm:text-xl">Memories</h1>
    </header>

    <!-- Masonry (CSS Columns) -->
    <section
      class="mx-auto max-w-5xl
             columns-2 sm:columns-3 lg:columns-4
             gap-x-2 sm:gap-x-2.5"
      aria-label="Image gallery"
    >
      <article
        v-for="img in images"
        :key="img.id"
        class="mb-2 sm:mb-2.5 break-inside-avoid overflow-hidden
               rounded-lg border border-purple-300/20 bg-white/5"
      >
        <img
          :src="img.src"
          :alt="img.alt"
          loading="lazy"
          class="block w-full h-auto"
        />
      </article>
    </section>

    <!-- Sentinel for infinite load -->
    <div ref="sentinel" class="h-px w-full" />

    <div class="mt-3 flex justify-center">
      <p v-if="loading" class="text-xs opacity-70">Loading…</p>
      <p v-else-if="done" class="text-xs opacity-70">You reached the end.</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue"

type ImageItem = {
  id: string
  src: string
  alt: string
}

const images = ref<ImageItem[]>([])
const loading = ref(false)
const done = ref(false)

const sentinel = ref<HTMLElement | null>(null)

const PAGE_SIZE = 20
let page = 0

// NEED TO ADD MY OWN PHOTOS TO REPLACE.
function makeImages(pageNum: number, count: number): ImageItem[] {
  return Array.from({ length: count }, (_, i) => {
    const n = pageNum * count + i
    // varied heights -> masonry feel
    const w = 600
    const h = 420 + ((n * 37) % 520)
    return {
      id: `${pageNum}-${i}`,
      src: `https://picsum.photos/seed/${n}/${w}/${h}`,
      alt: `Photo ${n}`,
    }
  })
}

async function loadMore() {
  if (loading.value || done.value) return
  loading.value = true

  // remove this in real fetch
  await new Promise((r) => setTimeout(r, 200))

  images.value.push(...makeImages(page, PAGE_SIZE))
  page++

  // demo stopping condition (remove if infinite)
  if (page >= 25) done.value = true

  loading.value = false
}

let observer: IntersectionObserver | null = null

onMounted(async () => {
  await loadMore()

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) loadMore()
    },
    {
      root: null,
      rootMargin: "700px", // preload before bottom
      threshold: 0,
    }
  )

  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>
