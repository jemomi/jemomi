<template>
  <header>
    <nav>
      <NuxtLink to="/">
        Home
      </NuxtLink>
      <NuxtLink to="/mit-id-status">
        MitID status
      </NuxtLink>
    </nav>
  </header>
  <div>
    <h1>Welcome</h1>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
