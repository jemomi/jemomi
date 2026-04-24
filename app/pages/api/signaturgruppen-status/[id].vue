<template>
  <div
    v-if="data"
    class="container mx-auto space-y-6"
  >
    <div class="space-y-2">
      <h1 class="text-2xl font-semibold">
        Event #{{ data.id }}
      </h1>
      <p class="text-sm text-zinc-400">
        {{ new Date(data.received_at).toLocaleString() }}
      </p>
      <p class="text-zinc-200">
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
            Re-send this event to Discord
          </h2>
          <p class="text-sm text-zinc-400">
            Sends a formatted test notification built from this stored event.
          </p>
        </div>
        <button
          class="rounded-md bg-blue-700 px-4 py-2 text-sm font-medium hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-zinc-700"
          :disabled="isSendingEventTest"
          @click="sendEventTest"
        >
          {{ isSendingEventTest ? 'Sending…' : 'Send this event as test' }}
        </button>
      </div>
      <p
        v-if="eventTestMessage"
        class="mt-3 text-sm text-zinc-300"
      >
        {{ eventTestMessage }}
      </p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <div>
        <h2 class="mb-2 font-medium">
          Payload
        </h2>
        <pre class="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs">{{ data.payload }}</pre>
      </div>
      <div>
        <h2 class="mb-2 font-medium">
          Headers
        </h2>
        <pre class="overflow-x-auto rounded-xl border border-zinc-800 bg-zinc-950 p-4 text-xs">{{ data.headers }}</pre>
      </div>
    </div>
  </div>
  <div
    v-else-if="error"
    class="container mx-auto"
  >
    <h1 class="text-red-700">
      Error: {{ error.status }} - {{ error.statusMessage }}
    </h1>
    <p>
      {{ error.message }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { Status } from '#shared/types/signaturGruppen';

const route = useRoute()
const pageId = String(route.params.id)

const {data, error} = await useFetch<Status>(`/api/signaturgruppen/status/${pageId}`);
const {loggedIn} = useUserSession()

const isSendingEventTest = ref(false)
const eventTestMessage = ref('')

const getEventTitle = (statusLine: Status) => {
  if ('incident' in statusLine.payload) {
    return statusLine.payload.incident.name
  }

  return statusLine.payload.component.name ?? statusLine.event_type ?? 'Unknown event'
}

const sendEventTest = async () => {
  if (isSendingEventTest.value || !data.value) {
    return
  }

  isSendingEventTest.value = true
  eventTestMessage.value = ''

  try {
    const response = await $fetch<{ previewTitle: string | null }>('/api/signaturgruppen/status/test', {
      method: 'POST',
      body: {
        eventId: data.value.id,
      },
    })

    eventTestMessage.value = response.previewTitle
      ? `Sent: ${response.previewTitle}`
      : 'Discord test notification sent.'
  } catch (testError) {
    eventTestMessage.value = testError instanceof Error
      ? testError.message
      : 'Failed to send Discord test notification.'
  } finally {
    isSendingEventTest.value = false
  }
}
</script>
