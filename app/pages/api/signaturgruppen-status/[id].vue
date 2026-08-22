<template>
  <div
    v-if="data"
    class="container mx-auto space-y-6 px-4 py-16"
  >
    <div class="space-y-2">
      <h1 class="text-2xl font-semibold">
        Hændelse #{{ data.id }}
      </h1>
      <p class="text-sm text-zinc-400">
        {{ new Date(data.received_at).toLocaleString() }}
      </p>
      <p class="text-zinc-400/80 dark:text-zinc-200">
        {{ getEventTitle(data) }}
      </p>
    </div>

    <div
      v-if="loggedIn"
      class="rounded-xl border border-zinc-700 bg-zinc-900/60 p-4"
    >
      <div class="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 class="font-medium">
            Send denne hændelse til Discord igen
          </h2>
          <p class="text-sm text-zinc-400">
            Sender en formateret testbesked baseret på den gemte hændelse.
          </p>
        </div>
        <button
          class="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-zinc-700"
          :disabled="isSendingEventTest"
          @click="sendEventTest"
        >
          {{ isSendingEventTest ? 'Sender...' : 'Send som test' }}
        </button>
      </div>
      <p
        v-if="eventTestMessage"
        class="mt-3 text-sm text-zinc-300"
      >
        {{ eventTestMessage }}
      </p>
      <NuxtLink
        v-if="eventTestUrl"
        :to="eventTestUrl"
        class="mt-2 inline-block text-sm underline underline-offset-2 hover:no-underline"
      >
        Åbn oprettet hændelse
      </NuxtLink>
    </div>

    <div>
      <div>
        <h2 class="mb-2 font-medium">
          Payload
        </h2>
        <pre class="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs text-white">{{ data.payload }}</pre>
      </div>
    </div>
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
</template>

<script setup lang="ts">
import type { PublicStatus } from '#shared/types/signaturGruppen';

const route = useRoute()
const pageId = String(route.params.id)

const {data, error} = await useFetch<PublicStatus>(`/api/signaturgruppen/status/${pageId}`);
const {loggedIn} = useUserSession()

const isSendingEventTest = ref(false)
const eventTestMessage = ref('')
const eventTestUrl = ref('')

const getEventTitle = (statusLine: PublicStatus) => {
  if ('incident' in statusLine.payload) {
    return statusLine.payload.incident.name
  }

  return statusLine.payload.component.name ?? statusLine.event_type ?? 'Ukendt hændelse'
}

const sendEventTest = async () => {
  if (isSendingEventTest.value || !data.value) {
    return
  }

  isSendingEventTest.value = true
  eventTestMessage.value = ''
  eventTestUrl.value = ''

  try {
    const response = await $fetch<{ createdRecordId: number | null; eventUrl: string | null }>('/api/signaturgruppen/status/test', {
      method: 'POST',
      body: {
        eventId: data.value.id,
      },
    })

    eventTestMessage.value = response.createdRecordId
      ? `Testbesked sendt til Discord og gemt som hændelse #${response.createdRecordId}.`
      : 'Testbesked sendt til Discord.'
    eventTestUrl.value = response.eventUrl ?? ''
  } catch (testError) {
    eventTestMessage.value = testError instanceof Error
      ? testError.message
      : 'Kunne ikke sende testbesked til Discord.'
  } finally {
    isSendingEventTest.value = false
  }
}
</script>
