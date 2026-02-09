<template>
  <main class="min-h-screen w-full bg-[#0f0019] text-[#e9d7ff] px-3 py-10">
    <header class="mx-auto mb-10 max-w-5xl text-center">
      <div class="text-3xl font-semibold tracking-wide">
        Memories <3
      </div>
    </header>

    <!-- Masonry (CSS Columns) -->
    <section
      class="mx-auto max-w-5xl columns-2 sm:columns-3 lg:columns-4 gap-x-2 sm:gap-x-2.5"
      aria-label="Image gallery"
    >
      <article
        v-for="img in images"
        :key="img.id"
        class="mb-2 sm:mb-2.5 break-inside-avoid overflow-hidden rounded-lg
               border border-purple-300/20 bg-white/5"
      >
        <img
          :src="img.src"
          :alt="img.alt"
          loading="lazy"
          decoding="async"
          :fetchpriority="img.priority"
          class="block w-full h-auto"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
      </article>
    </section>

    <!-- Sentinel for infinite load -->
    <div ref="sentinel" class="h-px w-full" />

    <div class="mt-3 flex justify-center">
      <p v-if="loading" class="text-xs opacity-70">Loading…</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, nextTick } from "vue"

type ImageItem = {
  id: string
  src: string
  alt: string
  priority?: "high" | "low"
}

const images = ref<ImageItem[]>([])
const loading = ref(false)
const sentinel = ref<HTMLElement | null>(null)

const PAGE_SIZE = 20

// Photos looped
const MY_PHOTOS = [
  "/photos/1.webp",
  "/photos/2.webp",
  "/photos/3.webp",
  "/photos/4.webp",
  "/photos/5.webp",
  "/photos/6.webp",
  "/photos/7.webp",
  "/photos/8.webp",
  "/photos/9.webp",
  "/photos/10.webp",
  "/photos/11.webp",
  "/photos/12.webp",
  "/photos/13.webp",
  "/photos/14.webp",
  "/photos/15.webp",
  "/photos/16.webp",
  "/photos/17.webp",
  "/photos/18.webp",
  "/photos/19.webp",
  "/photos/20.webp",
  "/photos/21.webp",
]

// cursor points to the "next" photo index to render
let cursor = 0
let batch = 0

function nextBatch(count: number): ImageItem[] {
  const out: ImageItem[] = []
  const n = MY_PHOTOS.length
  if (n === 0) return out

  for (let i = 0; i < count; i++) {
    const idx = cursor % n
    const src = MY_PHOTOS[idx] ?? ""
    // Unique key forever (batch increments each fetch)
    out.push({
      id: `${batch}-${i}-${idx}-${cursor}`,
      src,
      alt: `Memory ${cursor + 1}`,
      // first screen-ish items can be "high", rest low; keep simple:
      priority: images.value.length < 8 ? "high" : "low",
    })
    cursor++
  }

  batch++
  return out
}

async function loadMore() {
  if (loading.value) return
  loading.value = true

  // If you later replace with real API call, remove this delay.
  // await new Promise((r) => setTimeout(r, 50))

  images.value.push(...nextBatch(PAGE_SIZE))
  loading.value = false
}

let observer: IntersectionObserver | null = null

onMounted(async () => {
  await nextTick()
  // initial fill
  await loadMore()
  await loadMore() // helps avoid "empty gap" on fast scroll / large screens

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) loadMore()
    },
    {
      root: null,
      // dynamic-ish preload: larger screens load earlier
      rootMargin: "1200px",
      threshold: 0,
    }
  )

  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>
