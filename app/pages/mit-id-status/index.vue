<template>
  <div class="container mx-auto">
    <h1>
      This page will show a list of incident status' from mit-id
    </h1>
    <p v-if="pending">
      pending...
    </p>
    <ul v-if="data">
      <li
        v-for="statusLine in data"
        :key="`status-${statusLine.id}`"
        class="grid grid-cols-7 odd:bg-zinc-700"
      >
        <p>
          <NuxtLink
            :to="`/mit-id-status/${statusLine.id}`"
            class="underline underline-offset-2 hover:no-underline"
          >
            See more for: {{ statusLine.id }}
          </NuxtLink>
        </p>
        <p>
          {{ new Date(statusLine.received_at).toLocaleString() }}
        </p>
        <p>
          {{ statusLine.event_type }}
        </p>
      </li>
    </ul>
    <pre
      v-if="error"
      v-html="error"
    />
  </div>
</template>

<script setup lang="ts">

const {data, error, pending} = await useFetch('/api/signaturgruppen/status');
</script>

<style scoped>

</style>