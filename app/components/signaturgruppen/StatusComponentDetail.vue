<template>
  <section class="space-y-6">
    <div class="space-y-3">
      <h2 class="text-xl font-semibold">
        Komponentændring
      </h2>
      <div
        class="rounded-lg border border-l-4 border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
        :class="getStatusBorderClass(componentStatus)"
      >
        <div class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div class="space-y-1">
            <p class="text-sm text-zinc-500 dark:text-zinc-400">
              {{ formatDate(statusLine.payload.component_update.created_at ?? statusLine.received_at) }}
            </p>
            <p class="text-lg font-medium text-zinc-950 dark:text-white">
              {{ formatStatusText(statusLine.payload.component_update.old_status ?? 'unknown') }}
              til
              {{ formatStatusText(componentStatus) }}
            </p>
          </div>
          <SignaturgruppenStatusBadge :status="componentStatus" />
        </div>
      </div>
    </div>

    <div class="space-y-3">
      <h2 class="text-xl font-semibold">
        Overblik
      </h2>
      <SignaturgruppenStatusDetailFacts :facts="facts" />
    </div>

    <div class="space-y-3">
      <div class="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 class="text-xl font-semibold">
            Komponenthistorik
          </h2>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">
            Alle registrerede statusændringer for komponenten.
          </p>
        </div>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          {{ group.groupSize }} skift
        </p>
      </div>

      <div class="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
        <NuxtLink
          v-for="update in group.updates"
          :key="update.id"
          :to="`/api/signaturgruppen-status/${update.id}`"
          class="block border-b border-l-4 border-zinc-200 p-4 last:border-b-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
          :class="getStatusBorderClass(getComponentStatus(update))"
        >
          <div class="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
            <div>
              <p class="font-medium text-zinc-950 dark:text-white">
                {{ formatStatusText(update.payload.component_update.old_status ?? 'unknown') }}
                til
                {{ formatStatusText(getComponentStatus(update)) }}
              </p>
              <p class="text-sm text-zinc-500 dark:text-zinc-400">
                {{ formatDate(update.received_at) }} · statuslinje #{{ update.id }}
              </p>
            </div>
            <SignaturgruppenStatusBadge :status="getComponentStatus(update)" />
          </div>
        </NuxtLink>
      </div>
    </div>

    <div
      v-if="relatedIncidentGroups.length"
      class="space-y-3"
    >
      <div class="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 class="text-xl font-semibold">
            Relaterede hændelser
          </h2>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">
            Incident- og vedligeholdelsesforløb, der nævner denne komponent.
          </p>
        </div>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          {{ relatedIncidentGroups.length }} hændelser
        </p>
      </div>

      <div class="space-y-3">
        <SignaturgruppenStatusLineCard
          v-for="incidentGroup in relatedIncidentGroups"
          :key="incidentGroup.key"
          :status-line="incidentGroup.statusLine"
          :group-size="incidentGroup.groupSize"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type {
  ComponentStatusLine,
  IncidentStatusLine,
  StatusLineGroup,
} from '~/utils/signaturgruppen/statusView';
import {
  formatDate,
  formatStatusText,
  getComponentGroupLabel,
  getComponentStatus,
  getStatusBorderClass,
} from '~/utils/signaturgruppen/statusView';

const props = defineProps<{
  group: StatusLineGroup<ComponentStatusLine>;
  relatedIncidentGroups: StatusLineGroup<IncidentStatusLine>[];
}>()

const statusLine = computed(() => props.group.statusLine)
const component = computed(() => statusLine.value.payload.component)
const componentUpdate = computed(() => statusLine.value.payload.component_update)
const componentStatus = computed(() => getComponentStatus(statusLine.value))

const facts = computed(() => [
  {
    label: 'Komponent',
    value: component.value.name,
  },
  {
    label: 'Gruppe',
    value: getComponentGroupLabel(statusLine.value),
  },
  {
    label: 'Status',
    value: formatStatusText(componentStatus.value),
  },
  {
    label: 'Tidligere status',
    value: formatStatusText(componentUpdate.value.old_status ?? 'unknown'),
  },
  {
    label: 'Side',
    value: statusLine.value.payload.page.status_description,
  },
  {
    label: 'Component ID',
    value: component.value.id,
  },
  {
    label: 'Component update ID',
    value: componentUpdate.value.id,
  },
  {
    label: 'Group ID',
    value: component.value.group_id,
  },
])
</script>
