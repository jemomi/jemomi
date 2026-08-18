<template>
  <article
    class="grid row-span-4 grid-rows-subgrid rounded-lg border p-6"
    :class="isFreeReview
      ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-900/70 dark:bg-emerald-400/10'
      : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900'"
  >
    <p :aria-hidden="!service.badge">
      <NuxtLink
        v-if="service.badge && isFreeReview"
        to="#free-review"
        class="mb-3 inline-flex rounded-md bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white underline-offset-2 hover:underline dark:bg-emerald-400 dark:text-zinc-950"
        :aria-label="`${service.badge}. Læs hvad den gratis gennemgang indebærer`"
        title="Læs hvad den gratis gennemgang indebærer"
      >
        {{ service.badge }}*
      </NuxtLink>
      <span
        v-else-if="service.badge"
        class="mb-3 rounded-md bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-400/10 dark:text-emerald-300"
      >
        {{ service.badge }}
      </span>
    </p>
    <h4 class="text-lg font-semibold text-zinc-950 dark:text-white">
      {{ service.title }}
    </h4>
    <p class="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
      {{ service.text }}
    </p>
    <NuxtLink
      :to="contactHref"
      class="mt-5 inline-flex self-start text-sm font-semibold text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
    >
      {{ service.contactText ?? 'Kontakt om denne opgave' }}
    </NuxtLink>
  </article>
</template>

<script setup lang="ts">
import type { Service } from '~/types/services'

const props = defineProps<{
  contactEmail: string
  service: Service
}>()

const isFreeReview = computed(() => props.service.badge?.toLowerCase().includes('gratis') ?? false)

const contactHref = computed(() => {
  const subject = props.service.contactSubject ?? props.service.title

  return `mailto:${props.contactEmail}?subject=${encodeURIComponent(subject)}`
})
</script>
