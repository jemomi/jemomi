<template>
  <NuxtRouteAnnouncer />
  <header class="bg-zinc-900">
    <div class="flex container mx-auto justify-between py-2">
      <nav class="flex gap-8">
        <NuxtLink
          to="/"
          class="p-4 hover:bg-zinc-500/50 transition-colors rounded-lg"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/mit-id-status"
          class="p-4 hover:bg-zinc-500/50 transition-colors rounded-lg"
        >
          MitID status
        </NuxtLink>
      </nav>
      <div class="flex justify-end gap-8">
        <!--Space for right content in header-->
      </div>
    </div>
  </header>
  <main class="my-10">
    <NuxtPage />
  </main>
  <footer class="bg-zinc-700 py-10">
    <div class="container mx-auto">
      <ul class="flex flex-col gap-4 text-zinc-400">
        <li>
          <p v-if="dbVer.data && dbVer.data.value">
            DB-ver: {{ dbVer.data.value.version }}
          </p>
          <p v-if="dbVer.error">
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

</script>