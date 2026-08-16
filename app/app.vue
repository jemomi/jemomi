<template>
  <NuxtRouteAnnouncer />
  <header class="sticky top-0 z-20 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90">
    <div class="container mx-auto flex flex-col gap-3 px-4 py-3 md:flex-row md:items-center md:justify-between">
      <NuxtLink
        to="/"
        class="text-sm font-semibold text-zinc-950 underline-offset-4 hover:underline dark:text-white"
      >
        Jens Morten Mikkelsen
      </NuxtLink>

      <div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:justify-end">
        <nav
          class="flex flex-wrap gap-1"
          aria-label="Primær navigation"
        >
          <NuxtLink
            to="/services"
            class="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            Tjenester
          </NuxtLink>
          <NuxtLink
            to="/me"
            class="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            Om mig
          </NuxtLink>
          <NuxtLink
            to="/api/signaturgruppen-status"
            class="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            Status
          </NuxtLink>
        </nav>

        <div class="flex items-center gap-2">
          <ColorModeToggle />
          <NuxtLink
            to="https://www.linkedin.com/in/jens-morten-mikkelsen-27893761/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            class="rounded-md p-2 text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
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
            class="rounded-md p-2 text-zinc-700 transition hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-white"
          >
            <Icon
              name="simple-icons:github"
              class="size-5"
            />
          </NuxtLink>
          <template v-if="loggedIn && user">
            <p class="text-sm text-zinc-600 dark:text-zinc-400">
              Hej {{ user.name }}
            </p>
            <button
              class="rounded-md bg-zinc-950 px-3 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              @click="clear"
            >
              Log ud
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
  <main>
    <NuxtPage />
  </main>
  <AppFooter />
</template>

<script setup lang="ts">
const {loggedIn, user, clear} = useUserSession()
</script>
