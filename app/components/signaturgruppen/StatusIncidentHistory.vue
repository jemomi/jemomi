<template>
  <section class="space-y-4">
    <div class="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 class="text-xl font-semibold">
          Hændelser og vedligehold
        </h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Hændelsesforløb grupperet på incident-id.
        </p>
      </div>
      <p class="text-sm text-zinc-500 dark:text-zinc-400">
        {{ incidentCount }} hændelser
      </p>
    </div>

    <div class="space-y-8">
      <div
        v-for="dayGroup in dayGroups"
        :key="dayGroup.key"
        class="space-y-3"
      >
        <h3 class="border-b border-zinc-200 pb-2 text-lg font-medium dark:border-zinc-800">
          {{ dayGroup.label }}
        </h3>

        <div class="space-y-3">
          <SignaturgruppenStatusLineCard
            v-for="group in dayGroup.groups"
            :key="group.key"
            :status-line="group.statusLine"
            :group-size="group.groupSize"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { IncidentDayGroup } from '~/utils/signaturgruppen/statusView';

const props = defineProps<{
  dayGroups: IncidentDayGroup[];
}>()

const incidentCount = computed(() => {
  return props.dayGroups.reduce((total, dayGroup) => total + dayGroup.groups.length, 0)
})
</script>
