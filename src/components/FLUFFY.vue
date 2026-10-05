<template>
  <main class="fluffy-page">
    <section
      class="message-panel"
      :class="{ 'is-final': currentIndex === message.length - 1 }"
    >
      <div :key="currentIndex" ref="split_text" class="message-text">
        {{ message[currentIndex] }}
      </div>

      <button v-if="currentIndex < message.length - 1" @click="nextLine" class="page-button">
        Next
      </button>
    </section>

    <section v-if="currentIndex === message.length - 1" class="fluffy-gallery" aria-label="Fluffy memories">
      <p class="gallery-label">Fluffy memories</p>
      <div class="bento-grid">
        <article
          v-for="(image, index) in images"
          :key="image.id"
          class="bento-tile"
          :class="`tile-${index % 8}`"
        >
          <img
            :src="image.src"
            :alt="image.alt"
            loading="lazy"
            decoding="async"
            :fetchpriority="image.priority"
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
          />
        </article>
      </div>
      <div ref="sentinel" class="h-px w-full" />
      <p v-if="loading" class="loading-label" role="status">Loading more memories...</p>

      <button @click="nextPage" class="page-button">Continue</button>
    </section>
  </main>

</template>
<script setup lang="ts">
import { ref, onBeforeUnmount, nextTick, watch } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const message = [
 "CAN NOT FORGET ABOUT FLUFFY",
 "Am I right?",
 "Even though she's not with us",
 "She was such a sweetheart and helped you through so much",
 "Fluffy has been through so many things with you",
 "Your graduation",
 "You becoming a nurse",
 "Meeting me",
 "Just know that we all miss her so much",

]

const currentIndex = ref(0)
const router = useRouter()
const split_text = ref<HTMLElement | null>(null)
const images = ref<{ id: string; src: string; alt: string; priority: 'high' | 'low' }[]>([])
const loading = ref(false)
const sentinel = ref<HTMLElement | null>(null)

const fluffyPhotos = [
  'IMG_20260527_235948.webp',
  'IMG_20260528_000129.webp',
  'IMG_20260528_000131.webp',
  'Screenshot_20260527_215251_Discord.webp',
  'Screenshot_20260527_215330_Discord.webp',
  'Screenshot_20260527_215343_Discord.webp',
  'Screenshot_20260527_220506_Discord.webp',
  'Screenshot_20260528_000902_Snapchat.webp',
  'Screenshot_20260528_000907_Snapchat.webp',
  'Snapchat-1155618702.webp',
  'Snapchat-1181723297.webp',
  'Snapchat-1188584704.webp',
  'Snapchat-1293492478.webp',
  'Snapchat-87409672.webp',
  'Snapchat-890876241.webp',
  'Snapchat-976291670.webp',
  'srcb_input_at_pe.webp',
]

const PAGE_SIZE = 8
let cursor = 0
let batch = 0
let observer: IntersectionObserver | null = null

function animation() {
let split = SplitText.create(split_text.value, { type: 'words, lines'})

  gsap.from(split.lines, {
    duration: 1,
    opacity: 0,
    stagger: 0.3,
    y: 20,
    ease: "expo.out",
    onComplete: () => split?.revert()
  })
}

async function nextLine() {
  if (currentIndex.value < message.length - 1) {
    currentIndex.value++
    await nextTick()
    animation()
    if (currentIndex.value === message.length - 1) {
      await loadMore()
      observeMore()
    }
  }
}

function loadMore() {
  if (loading.value) return
  loading.value = true

  const nextImages = Array.from({ length: PAGE_SIZE }, (_, index) => {
    const photoIndex = cursor % fluffyPhotos.length
    const fileName = fluffyPhotos[photoIndex]!
    cursor++
    return {
      id: `${batch}-${index}-${photoIndex}`,
      src: `/fluffy/${encodeURIComponent(fileName)}`,
      alt: `Fluffy memory ${cursor}`,
      priority: images.value.length < 2 ? 'high' as const : 'low' as const,
    }
  })

  images.value.push(...nextImages)
  batch++
  loading.value = false
}

function observeMore() {
  observer?.disconnect()
  observer = new IntersectionObserver(
    (entries) => {
      if (entries[0]?.isIntersecting) loadMore()
    },
    { rootMargin: '400px', threshold: 0 },
  )

  if (sentinel.value) observer.observe(sentinel.value)
}

function nextPage() {
  router.push('/home')
}

watch(currentIndex, async (index) => {
  if (index === message.length - 1) {
    await nextTick()
    if (images.value.length === 0) loadMore()
    observeMore()
  }
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.fluffy-page {
  min-height: 100vh;
  padding: 3rem 1rem 5rem;
  color: white;
  background: #11001c;
}

.message-panel {
  display: flex;
  min-height: 80vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
}

.message-panel.is-final {
  min-height: auto;
  gap: 0.75rem;
}

.message-text {
  width: min(100%, 70rem);
  min-height: 15rem;
  padding: 0 1.25rem;
  color: #d3abff;
  font-size: clamp(2rem, 5vw, 3.125rem);
  line-height: 1.15;
  text-align: center;
  text-wrap: pretty;
}

.message-panel.is-final .message-text {
  min-height: auto;
}

.page-button {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(216, 177, 255, 0.75);
  border-radius: 0.75rem;
  color: white;
  font-size: 1.5rem;
  background: #3f0064;
  transition: transform 200ms ease, box-shadow 200ms ease, background 200ms ease;
}

.page-button:hover {
  background: rgb(54, 10, 87);
  box-shadow: 0 10px 24px rgba(127, 67, 186, 0.5);
  transform: translateY(-0.25rem) scale(1.05);
}

.fluffy-gallery {
  width: min(100%, 72rem);
  margin: 0 auto;
}

.gallery-label {
  margin: 0 0 1rem;
  color: #e99ab8;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

.bento-grid {
  display: grid;
  grid-auto-flow: dense;
  grid-auto-rows: 10rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.65rem;
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
}

.tile-0,
.tile-5 {
  grid-row: span 2;
}

.tile-1,
.tile-6 {
  grid-row: span 3;
}

.tile-2,
.tile-7 {
  grid-row: span 2;
}

@media (min-width: 640px) {
  .bento-grid {
    grid-auto-rows: 11rem;
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
  }
}
</style>