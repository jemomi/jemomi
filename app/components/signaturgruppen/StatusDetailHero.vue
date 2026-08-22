<template>
  <section
    class="rounded-lg border border-l-4 border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/60"
    :class="getStatusBorderClass(status)"
  >
    <NuxtLink
      to="/api/signaturgruppen-status"
      class="text-sm font-medium text-zinc-600 underline underline-offset-2 hover:no-underline dark:text-zinc-300"
    >
      Tilbage til status
    </NuxtLink>

    <div class="mt-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
      <div class="space-y-2">
        <p class="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          {{ label }}
        </p>
        <h1 class="text-2xl font-semibold text-zinc-950 dark:text-white">
          {{ title }}
        </h1>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Åbnet via statuslinje #{{ statusLine.id }} · modtaget {{ formatDate(statusLine.received_at) }}
        </p>
      </div>

      <div class="flex flex-col items-start gap-3 md:items-end">
        <SignaturgruppenStatusBadge :status="status" />
        <slot name="actions" />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { PublicStatus } from '#shared/types/signaturGruppen';
import { formatDate, getStatusBorderClass } from '~/utils/signaturgruppen/statusView';

defineProps<{
  statusLine: PublicStatus;
  title: string;
  status: string;
  label: string;
}>()
</script>
