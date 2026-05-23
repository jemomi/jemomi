<template>
  <div class="rounded-xl border border-zinc-800 bg-blue-200 dark:bg-zinc-900/60 p-4">
    <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
      <div class="space-y-1">
        <NuxtLink
          :to="`/api/signaturgruppen-status/${statusLine.id}`"
          class="text-lg font-medium underline underline-offset-2 hover:no-underline"
        >
          Event #{{ statusLine.id }}
        </NuxtLink>
        <p class="text-sm text-blue-900 dark:text-zinc-400">
          {{ formatDate(statusLine.received_at) }}
        </p>
        <p class="text-sm text-blue-900/70 dark:text-zinc-300">
          {{ eventTitle }}
        </p>
      </div>
      <div class="text-sm text-blue-900 dark:">
        {{ eventStatus }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Status } from '#shared/types/signaturGruppen';

const props = defineProps<{
  statusLine: Status;
}>()

const formatDate = (value: Date | string) => {
  return new Date(value).toLocaleString()
}

const eventTitle = computed(() => {
  if ('incident' in props.statusLine.payload) {
    return props.statusLine.payload.incident?.name
  }

  return props.statusLine.payload.component?.name ?? props.statusLine.event_type ?? 'Unknown event'
})

const eventStatus = computed(() => {
  if ('incident' in props.statusLine.payload) {
    return props.statusLine.payload.incident.status ?? props.statusLine.event_type ?? 'Unknown'
  }

  return props.statusLine.payload.component_update?.new_status
    ?? props.statusLine.payload.component.status
    ?? props.statusLine.event_type
    ?? 'Unknown'
})
</script>
