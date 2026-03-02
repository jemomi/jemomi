<template>
  <div></div>
</template>

<script setup lang="ts">


const route = useRoute()

const pageId = String(route.params.id)

const {data, error} = await useFetch(`/api/signaturgruppen/status/${pageId}`);
console.log(0, data, error)
</script>