<template>
  <section
    id="free-review"
    class="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
  >
    <div class="rounded-lg border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/70 dark:bg-emerald-400/10">
      <div class="container mx-auto px-4">
        <p class="text-sm font-semibold uppercase tracking-normal text-emerald-700 dark:text-emerald-400">
          * Gratis gennemgang
        </p>
        <div class="flex gap-6 lg:items-start">
          <div class="lg:max-w-[18rem]">
            <h2 class="mt-2 text-xl font-bold text-zinc-950 dark:text-white">
              Hvad du kan forvente
            </h2>
            <p class="mt-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300">
              En gratis gennemgang er et indledende tjek, ikke en detaljeret audit eller rapport.
            </p>
          </div>
          <ul class="grid gap-3 sm:grid-cols-2">
            <li
              v-for="item in freeReviewScope"
              :key="item"
              class="flex gap-3 text-sm leading-6 text-zinc-700 dark:text-zinc-300"
            >
                <span
                  class="mt-2 size-1.5 shrink-0 rounded-full bg-emerald-600 dark:bg-emerald-400"
                  aria-hidden="true"
                />
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

const freeReviewScope = [
  'Kort gennemgang af det relevante område',
  '2-4 vigtigste observationer',
  'Vurdering af mulig effekt og prioritet',
  'Forslag til næste skridt',
  'Eventuelt tilbud på løsning eller videre gennemgang',
]
</script>

<style scoped>

</style>