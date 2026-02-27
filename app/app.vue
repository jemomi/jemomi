<template>
  <NuxtRouteAnnouncer />
  <header class="bg-zinc-900">
    <nav class="flex container mx-auto gap-8 py-2">
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
  </header>
  <div class="mt-10">
    <NuxtPage />
  </div>
</template>
