<template>
  <footer class="border-t border-zinc-200 bg-zinc-50 py-10 dark:border-zinc-800 dark:bg-zinc-950">
    <div class="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-start">
      <div class="max-w-2xl space-y-3">
        <h2 class="text-base font-semibold text-zinc-950 dark:text-white">
          Jens Morten Mikkelsen
        </h2>
        <p class="leading-7 text-zinc-600 dark:text-zinc-400">
          Full-stack webudvikler med speciale i moderne frontend, Nuxt, Vue, TypeScript, Tailwind, CMS-løsninger og praktisk full-stack udvikling.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <NuxtLink
          to="https://www.linkedin.com/in/jens-morten-mikkelsen-27893761/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          class="rounded-md p-2 text-zinc-700 transition hover:bg-zinc-200 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <Icon
            name="simple-icons:linkedin"
            class="size-5"
          />
        </NuxtLink>
        <NuxtLink
          to="https://github.com/jemomi"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          class="rounded-md p-2 text-zinc-700 transition hover:bg-zinc-200 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
        >
          <Icon
            name="simple-icons:github"
            class="size-5"
          />
        </NuxtLink>
      </div>

      <div
        v-if="loggedIn"
        class="md:col-span-2"
      >
        <h2 class="text-sm font-semibold text-zinc-950 dark:text-white">
          Integrationer
        </h2>
        <ul class="mt-3 flex flex-col gap-3 text-sm text-zinc-600 dark:text-zinc-400">
          <li class="flex flex-wrap gap-2">
            <span class="font-semibold text-zinc-900 dark:text-zinc-200">
              Neon-DB
            </span>
            <span v-if="dbVer.data && dbVer.data.value">
              Databaseversion: {{ dbVer.data.value.version }}
            </span>
            <span v-if="dbVer.error">
              {{ dbVer.error }}
            </span>
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { DBVersion } from '#shared/types/dbVersion';

const dbVer = await useFetch<DBVersion>('/api/version');

const { loggedIn } = useUserSession()
</script>
