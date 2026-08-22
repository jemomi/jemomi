<template>
  <div
    v-if="selectedStatusLine"
    class="container mx-auto space-y-8 px-4 py-16"
  >
    <SignaturgruppenStatusDetailHero
      :status-line="selectedStatusLine"
      :title="detailTitle"
      :status="detailStatus"
      :label="detailLabel"
    />

    <SignaturgruppenStatusIncidentDetail
      v-if="selectedIncidentGroup"
      :group="selectedIncidentGroup"
    />

    <SignaturgruppenStatusComponentDetail
      v-else-if="selectedComponentGroup"
      :group="selectedComponentGroup"
      :related-incident-groups="relatedIncidentGroups"
    />

    <SignaturgruppenStatusPayloadPanel :payload="selectedStatusLine.payload" />
  </div>
  <div
    v-else-if="pending"
    class="container mx-auto px-4 py-16"
  >
    Indlæser status...
  </div>
  <div
    v-else-if="error"
    class="container mx-auto px-4 py-16"
  >
    <h1 class="text-red-700">
      Fejl: {{ error.status }} - {{ error.statusMessage }}
    </h1>
    <p>
      {{ error.message }}
    </p>
  </div>
  <div
    v-else
    class="container mx-auto px-4 py-16"
  >
    <h1 class="text-red-700">
      Statuslinjen findes ikke
    </h1>
    <p class="mt-2 text-zinc-600 dark:text-zinc-400">
      Der blev ikke fundet en statuslinje med id {{ pageId }}.
    </p>
    <NuxtLink
      to="/api/signaturgruppen-status"
      class="mt-4 inline-block text-sm underline underline-offset-2 hover:no-underline"
    >
      Tilbage til status
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import type { PublicStatus } from '#shared/types/signaturGruppen';
import {
  getComponentGroupForStatusLine,
  getComponentGroups,
  getComponentName,
  getComponentStatus,
  getIncidentGroupForStatusLine,
  getIncidentGroups,
  getIncidentGroupsForComponent,
  getIncidentStatus,
  isComponentStatusLine,
  isIncidentStatusLine,
} from '~/utils/signaturgruppen/statusView';

const route = useRoute()
const pageId = String(route.params.id)

const {data, error, pending} = await useFetch<PublicStatus[]>('/api/signaturgruppen/status');

const statusLines = computed(() => data.value ?? [])

const incidentGroups = computed(() => getIncidentGroups(statusLines.value))
const componentGroups = computed(() => getComponentGroups(statusLines.value))

const selectedStatusLine = computed(() => {
  return statusLines.value.find((statusLine) => String(statusLine.id) === pageId) ?? null
})

const selectedIncidentStatusLine = computed(() => {
  return selectedStatusLine.value && isIncidentStatusLine(selectedStatusLine.value)
    ? selectedStatusLine.value
    : null
})

const selectedComponentStatusLine = computed(() => {
  return selectedStatusLine.value && isComponentStatusLine(selectedStatusLine.value)
    ? selectedStatusLine.value
    : null
})

const selectedIncidentGroup = computed(() => {
  return selectedIncidentStatusLine.value
    ? getIncidentGroupForStatusLine(incidentGroups.value, selectedIncidentStatusLine.value)
    : null
})

const selectedComponentGroup = computed(() => {
  return selectedComponentStatusLine.value
    ? getComponentGroupForStatusLine(componentGroups.value, selectedComponentStatusLine.value)
    : null
})

const relatedIncidentGroups = computed(() => {
  if (!selectedComponentStatusLine.value) {
    return []
  }

  return getIncidentGroupsForComponent(
    incidentGroups.value,
    selectedComponentStatusLine.value.payload.component.id,
  )
})

const detailTitle = computed(() => {
  if (selectedIncidentGroup.value) {
    return selectedIncidentGroup.value.statusLine.payload.incident.name
  }

  if (selectedComponentGroup.value) {
    return getComponentName(selectedComponentGroup.value.statusLine)
  }

  return selectedStatusLine.value?.event_type ?? 'Ukendt hændelse'
})

const detailStatus = computed(() => {
  if (selectedIncidentGroup.value) {
    return getIncidentStatus(selectedIncidentGroup.value.statusLine)
  }

  if (selectedComponentGroup.value) {
    return getComponentStatus(selectedComponentGroup.value.statusLine)
  }

  return selectedStatusLine.value?.event_type ?? 'unknown'
})

const detailLabel = computed(() => {
  return selectedComponentGroup.value ? 'Komponent' : 'Hændelsesforløb'
})
</script>
