<template>
  <NuxtRouteAnnouncer/>
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
        <div
          v-if="loggedIn && user"
          class="flex items-center gap-4"
        >
          <p>
            Hello {{ user.name }}
          </p>
          <button
            class="p-2 rounded-sm bg-blue-700 hover:bg-blue-900"
            @click="clear"
          >
            SignOut
          </button>
        </div>
      </div>
    </div>
  </header>
  <main class="my-10">
    <NuxtPage/>
  </main>
  <Footer/>
</template>

<script setup lang="ts">
const {loggedIn, user, clear} = useUserSession()
</script>