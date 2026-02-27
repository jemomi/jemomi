<template>
  <header class="bg-zinc-900">
    <nav class="container mx-auto">
      <NuxtLink to="/">
        Home
      </NuxtLink>
      <NuxtLink to="/mit-id-status">
        MitID status
      </NuxtLink>
    </nav>
  </header>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
