<template>
  <footer class="bg-zinc-700 py-10">
    <div class="container mx-auto">
      <h3>
        Integrations:
      </h3>
      <ul class="flex flex-col gap-4 text-zinc-400">
        <li class="flex gap-4">
          <p class="font-bold">
            Neon-DB
          </p>
          <p v-if="dbVer.data && dbVer.data.value">
            DB-ver: {{ dbVer.data.value.version }}
          </p>
          <p v-if="dbVer.error && loggedIn">
            {{ dbVer.error }}
          </p>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { DBVersion } from '#shared/types/dbVersion';

const dbVer = await useFetch<DBVersion>('/api/version');

const { loggedIn } = useUserSession()
</script>

<style scoped>

</style>