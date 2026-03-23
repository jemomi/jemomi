<template>
  <div
    v-if="data"
    class="container mx-auto"
  >
    <h1>
      {{ data.id }}
    </h1>
    <p class="text-xs">
      {{ new Date(data.received_at).toLocaleString() }}
    </p>
    <p>
      {{ data.event_type }}
    </p>
    <div v-if="loggedIn">
      <div>
        <h2>
          payload
        </h2>
        <pre>
            {{ data.payload }}
        </pre>
      </div>
      <div>
        <h2>
          headers
        </h2>
        <pre class="overflow-x-auto">
          {{ data.headers }}
        </pre>
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
const route = useRoute()

const pageId = String(route.params.id)

const {data, error} = await useFetch(`/api/signaturgruppen/status/${pageId}`);

const {loggedIn} = useUserSession()
</script>