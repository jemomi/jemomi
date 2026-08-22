<template>
  <div class="container mx-auto space-y-10 px-4 py-16">
    <div class="space-y-2">
      <p class="text-sm font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Driftsstatus
      </p>
      <h1 class="text-2xl font-semibold">
        SignaturGruppen status
      </h1>
      <p class="max-w-3xl dark:text-zinc-300">
        Seneste registrerede hændelser, vedligehold og komponentændringer fra SignaturGruppens status-webhooks.
      </p>
    </div>

    <SignaturgruppenStatusTestPanel :logged-in="loggedIn" />

    <p v-if="pending">
      Indlæser hændelser...
    </p>

    <template v-else-if="data">
      <SignaturgruppenStatusCurrentSection
        :incident-groups="currentIncidentGroups"
        :component-groups="currentComponentGroups"
      />

      <SignaturgruppenStatusComponentSections :sections="componentSections" />

<!--      <SignaturgruppenStatusIncidentHistory :day-groups="incidentDayGroups" />-->

      <SignaturgruppenStatusRecentComponentChanges :status-lines="recentComponentChanges" />
    </template>

    <pre v-if="error">{{ error }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { PublicStatus } from '#shared/types/signaturGruppen';
import {
  getComponentGroups,
  getComponentGroupSections,
  getCurrentComponentGroups,
  getCurrentIncidentGroups,
  getIncidentDayGroups,
  getIncidentGroups,
  getRecentComponentChanges,
} from '~/utils/signaturgruppen/statusView';

const {data, error, pending} = await useFetch<PublicStatus[]>('/api/signaturgruppen/status');
const {loggedIn} = useUserSession()

const statusLines = computed(() => data.value ?? [])

const incidentGroups = computed(() => getIncidentGroups(statusLines.value))

const componentGroups = computed(() => getComponentGroups(statusLines.value))

const currentIncidentGroups = computed(() => getCurrentIncidentGroups(incidentGroups.value))

const currentComponentGroups = computed(() => getCurrentComponentGroups(componentGroups.value))

const componentSections = computed(() => getComponentGroupSections(componentGroups.value))

/*const incidentDayGroups = computed(() => getIncidentDayGroups(incidentGroups.value))*/

const recentComponentChanges = computed(() => getRecentComponentChanges(statusLines.value))
</script>
