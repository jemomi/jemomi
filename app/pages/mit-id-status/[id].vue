<template>
  <div class="container mx-auto">
    <h1>
      This page will show current status from MitID / SignaturGruppen
    </h1>
    <p v-if="pending">
      pending...
    </p>
    <ul v-if="data">
      <li class="grid grid-cols-7">
        <p>
          {{ data.id }}
        </p>
        <p>
          {{ new Date(data.received_at).toLocaleString() }}
        </p>
        <p>
          {{ data.event_type }}
        </p>
        <pre class="col-span-2">
          {{ data.payload }}
        </pre>
        <pre class="col-span-2">
          {{ data.headers }}
        </pre>
      </li>
    </ul>
    <pre
      v-if="error"
      v-html="error"
    />
  </div>
</template>

<script setup lang="ts">


const route = useRoute()

const pageId = String(route.params.id)

const {data, error, pending} = await useFetch(`/api/signaturgruppen/status/${pageId}`);
console.log(0, data, error)
</script>