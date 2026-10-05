<template>
  <main class="min-h-screen w-full bg-[#0f0019] text-[#e9d7ff] px-3 py-10">
    <header class="mx-auto mb-10 max-w-5xl text-center">
      <div class="text-3xl font-semibold tracking-wide">
        Memories <3
      </div>
            <div class="text-right -mt-7">
        <RouterLink to="/fluffy" class="relative text-white text-2xl transition bg-[#3f0064]
                py-1 px-2 rounded-xl border border-purple-300/75 hover:bg-[rgb(54,10,87)] 
          hover:shadow-lg hover:shadow-[#7f43ba] duration-200 ease-in-out 
          hover:-translate-y-1 hover:scale-110">Some More</RouterLink>
      </div>
    </header>


    <section class="bento-grid" aria-label="Image gallery">
      <article
        v-for="(img, index) in images"
        :key="img.id"
        class="bento-tile"
        :class="`tile-${index % 8}`"
      >
        <img
          :src="img.src"
          :alt="img.alt"
          loading="lazy"
          decoding="async"
          :fetchpriority="img.priority"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
      </article>
    </section>

    <div ref="sentinel" class="h-px w-full" />
    <div class="mt-3 flex justify-center">
      <p v-if="loading" class="text-xs opacity-70" role="status">Loading more memories...</p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from "vue"
import { RouterLink } from "vue-router"

type ImageItem = {
  id: string
  src: string
  alt: string
  priority?: "high" | "low"
}

const images = ref<ImageItem[]>([])
const loading = ref(false)
const sentinel = ref<HTMLElement | null>(null)

const PAGE_SIZE = 8

// Keep the manifest explicit because files in public/ are not discoverable at runtime.
const MY_PHOTOS = Array.from({ length: 17 }, (_, index) => {
  const number = index + 1
  return `/photos/alina%20(${number}).webp`
})

// Cursor points to the next photo index to render.
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
      priority: images.value.length < 2 ? "high" : "low",
    })
    cursor++
  }

  batch++
  return out
}

async function loadMore() {
  if (loading.value) return
  loading.value = true

  images.value.push(...nextBatch(PAGE_SIZE))
  await nextTick()
  loading.value = false
}

let observer: IntersectionObserver | null = null

onMounted(async () => {
  await nextTick()
  await loadMore()

  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) loadMore()
    },
    {
      root: null,
      rootMargin: "400px",
      threshold: 0,
    }
  )

  if (sentinel.value) observer.observe(sentinel.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.gallery-page {
  min-height: 100vh;
  padding: 3.5rem clamp(1rem, 4vw, 4rem) 5rem;
  color: #f9eaf1;
  background:
    radial-gradient(circle at 10% 0%, rgba(151, 35, 86, 0.25), transparent 32rem),
    #170c18;
}

.gallery-heading {
  max-width: 72rem;
  margin: 0 auto 2rem;
}

.gallery-kicker {
  margin: 0 0 0.35rem;
  color: #e99ab8;
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.gallery-heading h1 {
  margin: 0;
  color: #fff4f7;
  font-size: clamp(2rem, 5vw, 4rem);
  font-weight: 650;
  letter-spacing: 0;
  line-height: 0.98;
}

.bento-grid {
  display: grid;
  grid-auto-flow: dense;
  grid-auto-rows: 10rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
  max-width: 72rem;
  margin: 0 auto;
}

.bento-tile {
  min-width: 0;
  overflow: hidden;
  content-visibility: auto;
  contain-intrinsic-size: 12rem;
  border: 1px solid rgba(255, 214, 228, 0.14);
  border-radius: 0.8rem;
  background: #2b1726;
}

.bento-tile img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 500ms ease;
}

.bento-tile:hover img {
  transform: scale(1.04);
}

.tile-0,
.tile-5 {
  grid-row: span 2;
}

.tile-1,
.tile-6 {
  grid-column: span 1;
  grid-row: span 3;
}

.tile-2,
.tile-7 {
  grid-column: span 1;
  grid-row: span 2;
}

.tile-3,
.tile-4 {
  grid-row: span 1;
}

.sentinel {
  height: 1px;
  max-width: 72rem;
  margin: 2rem auto 0;
}

.loading-label {
  margin: 0.75rem 0 0;
  color: rgba(249, 234, 241, 0.62);
  font-size: 0.75rem;
  text-align: center;
}

@media (min-width: 640px) {
  .bento-grid {
    grid-auto-rows: 11rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .tile-1,
  .tile-6 {
    grid-column: span 1;
  }
}

@media (min-width: 1024px) {
  .bento-grid {
    grid-auto-rows: 12rem;
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .tile-0,
  .tile-5 {
    grid-column: span 2;
    grid-row: span 2;
  }

  .tile-1,
  .tile-6 {
    grid-row: span 3;
  }
}

@media (prefers-reduced-motion: reduce) {
  .bento-tile img {
    transition: none;
  }
}
</style>
