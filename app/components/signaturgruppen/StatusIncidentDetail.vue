<template>
  <section class="space-y-6">
    <div class="space-y-3">
      <h2 class="text-xl font-semibold">
        Overblik
      </h2>
      <SignaturgruppenStatusDetailFacts :facts="facts" />
    </div>

    <div
      v-if="affectedComponents.length"
      class="space-y-3"
    >
      <h2 class="text-xl font-semibold">
        Berørte komponenter
      </h2>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="component in affectedComponents"
          :key="component"
          class="rounded-full bg-zinc-100 px-3 py-1 text-sm text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
        >
          {{ component }}
        </span>
      </div>
    </div>

    <div class="space-y-3">
      <div class="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 class="text-xl font-semibold">
            Opdateringer
          </h2>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">
            Statuspage-opdateringer for denne hændelse.
          </p>
        </div>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          {{ updates.length }} opdateringer
        </p>
      </div>

      <div class="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
        <article
          v-for="update in updates"
          :key="update.id"
          class="border-b border-zinc-200 p-4 last:border-b-0 dark:border-zinc-800"
        >
          <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
            <div>
              <p class="text-sm text-zinc-500 dark:text-zinc-400">
                {{ update.created_at ? formatDate(update.created_at) : 'Ukendt tidspunkt' }}
              </p>
              <p class="mt-2 whitespace-pre-line text-sm leading-6 text-zinc-800 dark:text-zinc-200">
                {{ update.body || 'Ingen beskrivelse.' }}
              </p>
            </div>
            <SignaturgruppenStatusBadge :status="update.status ?? incidentStatus" />
          </div>
        </article>
      </div>
    </div>

    <div class="space-y-3">
      <div class="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 class="text-xl font-semibold">
            Registrerede statuslinjer
          </h2>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">
            Alle webhook-rækker, der indgår i dette forløb.
          </p>
        </div>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          {{ group.groupSize }} statuslinjer
        </p>
      </div>

      <div class="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
        <NuxtLink
          v-for="updateLine in group.updates"
          :key="updateLine.id"
          :to="`/api/signaturgruppen-status/${updateLine.id}`"
          class="flex flex-col gap-2 border-b border-zinc-200 p-4 last:border-b-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <p class="font-medium text-zinc-950 dark:text-white">
              Statuslinje #{{ updateLine.id }}
            </p>
            <p class="text-sm text-zinc-500 dark:text-zinc-400">
              {{ formatDate(updateLine.received_at) }}
            </p>
          </div>
          <SignaturgruppenStatusBadge :status="getIncidentStatus(updateLine)" />
        </NuxtLink>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {
  IncidentStatusLine,
  StatusLineGroup,
} from '~/utils/signaturgruppen/statusView';
import {
  formatDate,
  formatStatusText,
  getIncidentStatus,
} from '~/utils/signaturgruppen/statusView';

const props = defineProps<{
  group: StatusLineGroup<IncidentStatusLine>;
}>()

const statusLine = computed(() => props.group.statusLine)
const incident = computed(() => statusLine.value.payload.incident)
const incidentStatus = computed(() => getIncidentStatus(statusLine.value))

const latestUpdate = computed(() => updates.value[0])

const updates = computed(() => {
  return [...(incident.value.incident_updates ?? [])].sort((first, second) => {
    return new Date(second.created_at ?? 0).getTime() - new Date(first.created_at ?? 0).getTime()
  })
})

const affectedComponents = computed(() => {
  const affectedNames = latestUpdate.value?.affected_components?.map((component) => component.name) ?? []
  const componentNames = incident.value.components?.map((component) => component.name) ?? []

  return [...new Set([...affectedNames, ...componentNames])].filter(Boolean)
})

const facts = computed(() => [
  {
    label: 'Status',
    value: formatStatusText(incidentStatus.value),
  },
  {
    label: 'Impact',
    value: formatStatusText(incident.value.impact ?? 'unknown'),
  },
  {
    label: 'Side',
    value: statusLine.value.payload.page.status_description,
  },
  {
    label: 'Incident ID',
    value: incident.value.id,
  },
  {
    label: 'Planlagt fra',
    value: incident.value.scheduled_for ? formatDate(incident.value.scheduled_for) : null,
  },
  {
    label: 'Planlagt til',
    value: incident.value.scheduled_until ? formatDate(incident.value.scheduled_until) : null,
  },
  {
    label: 'Løst',
    value: incident.value.resolved_at ? formatDate(incident.value.resolved_at) : null,
  },
  {
    label: 'Statuspage',
    value: incident.value.shortlink,
    href: incident.value.shortlink,
  },
])
</script>
