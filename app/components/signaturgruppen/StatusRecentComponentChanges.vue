<template>
  <section class="space-y-3">
    <div class="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 class="text-xl font-semibold">
          Seneste komponentændringer
        </h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Rå komponent-webhooks i modtaget rækkefølge.
        </p>
      </div>
      <p class="text-sm text-zinc-500 dark:text-zinc-400">
        Viser {{ statusLines.length }} seneste
      </p>
    </div>

    <div class="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
      <NuxtLink
        v-for="statusLine in statusLines"
        :key="`recent-component-${statusLine.id}`"
        :to="`/api/signaturgruppen-status/${statusLine.id}`"
        class="flex flex-col gap-2 border-b border-zinc-200 p-4 last:border-b-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <p class="font-medium text-zinc-950 dark:text-white">
            {{ getComponentName(statusLine) }}
          </p>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">
            {{ formatDate(statusLine.received_at) }} · {{ formatStatusText(getComponentTransition(statusLine)) }}
          </p>
        </div>
        <SignaturgruppenStatusBadge :status="getComponentStatus(statusLine)" />
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ComponentStatusLine } from '~/utils/signaturgruppen/statusView';
import {
  formatDate,
  formatStatusText,
  getComponentName,
  getComponentStatus,
  getComponentTransition,
} from '~/utils/signaturgruppen/statusView';

defineProps<{
  statusLines: ComponentStatusLine[];
}>()
</script>
