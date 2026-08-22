<template>
  <section class="space-y-3">
    <div class="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 class="text-xl font-semibold">
          Aktuelt
        </h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Ikke-afsluttede hændelser og komponenter, der ikke står som operational.
        </p>
      </div>
      <p class="text-sm text-zinc-500 dark:text-zinc-400">
        {{ itemCount }} aktive markeringer
      </p>
    </div>

    <div
      v-if="itemCount === 0"
      class="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-800 dark:border-green-900 dark:bg-green-950/50 dark:text-green-300"
    >
      Alle registrerede komponenter er operational, og der er ingen aktive hændelser.
    </div>

    <div
      v-else
      class="grid gap-3 lg:grid-cols-2"
    >
      <SignaturgruppenStatusLineCard
        v-for="group in incidentGroups"
        :key="`current-${group.key}`"
        :status-line="group.statusLine"
        :group-size="group.groupSize"
      />

      <NuxtLink
        v-for="group in componentGroups"
        :key="`current-${group.key}`"
        :to="`/api/signaturgruppen-status/${group.statusLine.id}`"
        class="rounded-lg border border-zinc-200 bg-white p-4 transition hover:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-zinc-600"
      >
        <div class="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
          <div class="space-y-1">
            <p class="text-base font-medium text-zinc-950 dark:text-white">
              {{ getComponentName(group.statusLine) }}
            </p>
            <p class="text-sm text-zinc-500 dark:text-zinc-400">
              Senest opdateret {{ formatDate(group.statusLine.received_at) }}
            </p>
            <p class="text-xs text-zinc-500 dark:text-zinc-500">
              {{ group.groupSize }} registrerede komponentændringer
            </p>
          </div>
          <SignaturgruppenStatusBadge :status="getComponentStatus(group.statusLine)" />
        </div>
      </NuxtLink>
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
  getComponentName,
  getComponentStatus,
} from '~/utils/signaturgruppen/statusView';

const props = defineProps<{
  incidentGroups: StatusLineGroup<IncidentStatusLine>[];
  componentGroups: StatusLineGroup<ComponentStatusLine>[];
}>()

const itemCount = computed(() => props.incidentGroups.length + props.componentGroups.length)
</script>
