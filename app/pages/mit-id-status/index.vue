<template>
  <div class="container mx-auto">
    <h1>
      This page will show current status from MitID / SignaturGruppen
    </h1>
    <p v-if="pending">
      pending...
    </p>
    <ul v-if="data">
      <li
        v-for="statusLine in data"
        :key="`status-${statusLine.id}`"
        class="grid grid-cols-7"
      >
        <p>
          {{ statusLine.id }}
        </p>
        <p>
          {{ new Date(statusLine.received_at).toLocaleString() }}
        </p>
        <p>
          {{ statusLine.event_type }}
        </p>
        <pre class="col-span-2">
          {{ statusLine.payload }}
        </pre>
        <pre class="col-span-2">
          {{ statusLine.headers }}
        </pre>
      </li>
    </ul>
    <pre v-if="error" v-html="error" />
  </div>
</template>

<script setup lang="ts">

const {data, error, pending} = await useFetch('/api/signaturgruppen/status');
</script>

<style scoped>

</style>