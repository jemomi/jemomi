<template>
  <NuxtRouteAnnouncer/>
  <header class="bg-blue-400/30 dark:bg-zinc-900">
    <div class="flex container mx-auto justify-between py-2">
      <nav class="flex gap-8">
        <NuxtLink
          to="/"
          class="p-4 hover:bg-zinc-500/30 transition-colors rounded-lg"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/api/signaturgruppen-status"
          class="p-4 hover:bg-zinc-500/30 transition-colors rounded-lg"
        >
          SignaturGruppen status
        </NuxtLink>
        <NuxtLink
          to="/me"
          class="p-4 hover:bg-zinc-500/30 transition-colors rounded-lg"
        >
          Me
        </NuxtLink>
      </nav>
      <div class="flex justify-end gap-8">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="https://www.linkedin.com/in/jens-morten-mikkelsen-27893761/"
            class="py-2 px-4 hover:bg-zinc-500/30 transition-colors rounded-lg"
          >
            <Icon name="simple-icons:linkedin" />
          </NuxtLink>
          <NuxtLink
            to="https://github.com/jemomi"
            class="py-2 px-4 hover:bg-zinc-500/30 transition-colors rounded-lg"
          >
            <Icon name="simple-icons:github" />
          </NuxtLink>
          <template v-if="loggedIn && user">
            <p>
              Hello {{ user.name }}
            </p>
            <button
              class="p-2 rounded-sm bg-blue-700 hover:bg-blue-900"
              @click="clear"
            >
              SignOut
            </button>
          </template>
        </div>
      </div>
    </div>
  </header>
  <main class="my-10">
    <NuxtPage/>
  </main>
  <AppFooter/>
</template>

<script setup lang="ts">
const {loggedIn, user, clear} = useUserSession()
</script>