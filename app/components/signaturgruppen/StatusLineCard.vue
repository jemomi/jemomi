<template>
  <div class="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/60">
    <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div class="space-y-1">
        <NuxtLink
          :to="`/api/signaturgruppen-status/${statusLine.id}`"
          class="text-base font-medium text-zinc-950 underline underline-offset-2 hover:no-underline dark:text-white"
        >
          {{ label }} #{{ statusLine.id }}
        </NuxtLink>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          {{ formatDate(statusLine.received_at) }}
        </p>
        <p class="text-sm text-zinc-700 dark:text-zinc-300">
          {{ eventTitle }}
        </p>
        <p
          v-if="groupSize > 1"
          class="text-xs text-zinc-500 dark:text-zinc-500"
        >
          {{ groupSize }} statusopdateringer samlet
        </p>
      </div>
      <div
        class="inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium"
        :class="statusClass"
      >
        {{ formattedEventStatus }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PublicStatus } from '#shared/types/signaturGruppen';
import {
  formatDate,
  formatStatusText,
  getStatusClass,
} from '~/utils/signaturgruppen/statusView';

const props = defineProps<{
  statusLine: PublicStatus;
  groupSize?: number;
  label?: string;
}>()

const groupSize = computed(() => props.groupSize ?? 1)
const label = computed(() => props.label ?? 'Hændelse')

const eventTitle = computed(() => {
  if ('incident' in props.statusLine.payload) {
    return props.statusLine.payload.incident?.name
  }

  return props.statusLine.payload.component?.name ?? props.statusLine.event_type ?? 'Ukendt hændelse'
})

const eventStatus = computed(() => {
  if ('incident' in props.statusLine.payload) {
    return props.statusLine.payload.incident.status ?? props.statusLine.event_type ?? 'Ukendt'
  }

  return props.statusLine.payload.component_update?.new_status
    ?? props.statusLine.payload.component.status
    ?? props.statusLine.event_type
    ?? 'Ukendt'
})

const formattedEventStatus = computed(() => formatStatusText(eventStatus.value))

const statusClass = computed(() => getStatusClass(eventStatus.value))
</script>
