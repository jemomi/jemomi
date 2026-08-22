<template>
  <div class="container mx-auto space-y-6 px-4 py-16">
    <div class="space-y-2">
      <h1 class="text-2xl font-semibold">
        SignaturGruppen statushændelser
      </h1>
      <p class="max-w-3xl dark:text-zinc-300">
        SignaturGruppen sender webhook-hændelser til denne app. Hændelserne gemmes i databasen og videresendes til Discord som en formateret besked.
      </p>
    </div>

    <div
      v-if="loggedIn"
      class="rounded-xl border border-zinc-700 bg-zinc-900/60 p-4"
    >
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="font-medium">
            Test Discord-besked
          </h2>
          <p class="text-sm text-zinc-400">
            Sender en indbygget testbesked til Discord, så formateringen kan kontrolleres uden at vente på en rigtig hændelse.
          </p>
        </div>
        <button
          class="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-zinc-700"
          :disabled="isSendingFixtureTest"
          @click="sendFixtureTest"
        >
          {{ isSendingFixtureTest ? 'Sender...' : 'Send test' }}
        </button>
      </div>
      <p
        v-if="fixtureTestMessage"
        class="mt-3 text-sm text-zinc-300"
      >
        {{ fixtureTestMessage }}
      </p>
      <NuxtLink
        v-if="fixtureTestUrl"
        :to="fixtureTestUrl"
        class="mt-2 inline-block text-sm underline underline-offset-2 hover:no-underline"
      >
        Åbn oprettet hændelse
      </NuxtLink>
    </div>

    <p v-if="pending">
      Indlæser hændelser...
    </p>

    <div
      v-else-if="data"
      class="space-y-3"
    >
      <SignaturgruppenStatusLineCard
        v-for="statusLineGroup in statusLineGroups"
        :key="statusLineGroup.key"
        :status-line="statusLineGroup.statusLine"
        :group-size="statusLineGroup.groupSize"
      />
    </div>

    <pre v-if="error">{{ error }}</pre>
  </div>
</template>

<script setup lang="ts">
import type { PublicStatus } from '#shared/types/signaturGruppen';

const {data, error, pending} = await useFetch<PublicStatus[]>('/api/signaturgruppen/status');
const {loggedIn} = useUserSession()

const isSendingFixtureTest = ref(false)
const fixtureTestMessage = ref('')
const fixtureTestUrl = ref('')

const statusLineGroups = computed(() => {
  const groups = new Map<string, { key: string; statusLine: PublicStatus; groupSize: number }>()

  for (const statusLine of data.value ?? []) {
    const key = getStatusLineGroupKey(statusLine)
    const existingGroup = groups.get(key)

    if (existingGroup) {
      existingGroup.groupSize += 1
      continue
    }

    groups.set(key, {
      key,
      statusLine,
      groupSize: 1,
    })
  }

  return [...groups.values()]
})

const getStatusLineGroupKey = (statusLine: PublicStatus) => {
  if ('incident' in statusLine.payload) {
    return `incident-${statusLine.payload.page.id}-${statusLine.payload.incident.id}`
  }

  const componentId = statusLine.payload.component.id
    ?? statusLine.payload.component_update.component_id

  return componentId
    ? `component-${statusLine.payload.page.id}-${componentId}`
    : `status-${statusLine.id}`
}

const sendFixtureTest = async () => {
  if (isSendingFixtureTest.value) {
    return
  }

  isSendingFixtureTest.value = true
  fixtureTestMessage.value = ''
  fixtureTestUrl.value = ''

  try {
    const response = await $fetch<{ createdRecordId: number | null; eventUrl: string | null }>('/api/signaturgruppen/status/test', {
      method: 'POST',
      body: {},
    })

    fixtureTestMessage.value = response.createdRecordId
      ? `Testbesked sendt til Discord og gemt som hændelse #${response.createdRecordId}.`
      : 'Testbesked sendt til Discord.'
    fixtureTestUrl.value = response.eventUrl ?? ''
  } catch (testError) {
    fixtureTestMessage.value = testError instanceof Error
      ? testError.message
      : 'Kunne ikke sende testbesked til Discord.'
  } finally {
    isSendingFixtureTest.value = false
  }
}
</script>
