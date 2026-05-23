<template>
  <article class="bg-white dark:bg-zinc-950">
    <section class="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/70">
      <div class="container mx-auto px-4 py-16">
        <div class="max-w-3xl space-y-5">
          <p class="text-sm font-semibold uppercase tracking-normal text-emerald-700 dark:text-emerald-400">
            Om mig
          </p>
          <h1 class="text-4xl font-bold leading-tight text-zinc-950 dark:text-white md:text-5xl">
            Hej, jeg hedder Jens Morten Mikkelsen
          </h1>
          <p class="text-lg leading-8 text-zinc-700 dark:text-zinc-300">
            Jeg er full-stack webudvikler fra Silkeborg-området med mange års erfaring inden for moderne webudvikling.
          </p>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            Min primære styrke ligger i frontendudvikling med teknologier som Nuxt, Vue, Vite, TypeScript, Tailwind, HTML, CSS og JavaScript. Samtidig har jeg en god forståelse for backend, C#, integrationer og hvordan hele løsningen hænger sammen.
          </p>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            Jeg kan godt lide at blive udfordret, sparre om teknik, dele viden og finde løsninger, der både er enkle at bruge og fornuftige at vedligeholde.
          </p>
        </div>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.75fr_1fr] lg:items-start">
        <h2 class="text-3xl font-bold text-zinc-950 dark:text-white">
          Lidt mere om mig
        </h2>
        <div class="space-y-5 text-lg leading-8 text-zinc-700 dark:text-zinc-300">
          <p>
            Udover kode interesserer jeg mig for musik, teknologi og gode samtaler om alt mellem himmel og jord. Jeg kan godt lide at fordybe mig, men jeg trives også med sparring, vidensdeling og samarbejde.
          </p>
          <p>
            Jeg er nysgerrig af natur og bliver hurtigt fanget af nye idéer, tekniske detaljer og muligheder for at gøre ting smartere eller mere enkle.
          </p>
        </div>
      </div>
    </section>

    <section class="bg-zinc-50 py-16 dark:bg-zinc-900/70">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl space-y-4">
          <h2 class="text-3xl font-bold text-zinc-950 dark:text-white">
            Kode og eksperimenter
          </h2>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            Jeg bruger GitHub til små projekter, tekniske eksperimenter og kode, hvor jeg undersøger nye teknologier eller tester idéer af.
          </p>
        </div>

        <article
          v-if="repos.data.value?.length"
          class="mt-8"
        >
          <h3 class="text-xl font-semibold text-zinc-950 dark:text-white">
            GitHub-projekter
          </h3>
          <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <GithubRepoTile
              v-for="repo in repos.data.value"
              :key="`gitRepo-${repo.id}`"
              :repo
            />
          </div>
        </article>

        <article class="mt-8">
          <h3 class="text-xl font-semibold text-zinc-950 dark:text-white">
            Bidrag
          </h3>
          <div class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <a
              href="https://github.com/nuxt/image/pull/2028"
              target="_blank"
              rel="noopener noreferrer"
              class="sweep-bg flex flex-col rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
            >
              <span class="font-bold text-zinc-950 dark:text-white">
                Nuxt/Image
              </span>
              <span class="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                Pull request med Umbraco-relateret arbejde under @jemomi.
              </span>
            </a>
          </div>
        </article>
      </div>
    </section>

    <section class="py-16">
      <div class="container mx-auto px-4">
        <div class="max-w-3xl space-y-4">
          <h2 class="text-3xl font-bold text-zinc-950 dark:text-white">
            Musik
          </h2>
          <p class="leading-8 text-zinc-600 dark:text-zinc-400">
            Musik har altid fyldt meget for mig. Her er lidt af det, jeg vender tilbage til.
          </p>
        </div>

        <article
          v-if="favoriteArtists.data.value?.length"
          class="mt-8"
        >
          <h3 class="text-xl font-semibold text-zinc-950 dark:text-white">
            Nogle af mine favoritkunstnere
          </h3>
          <div
            class="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
            role="list"
          >
            <a
              v-for="artist in favoriteArtists.data.value"
              :key="artist.id"
              class="group flex flex-col items-center rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              :href="artist.external_urls.spotify"
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
            >
              <SpotifyArtistTile :artist />
            </a>
          </div>
        </article>

        <article
          v-if="playlists.data.value?.length"
          class="mt-8"
        >
          <h3 class="text-xl font-semibold text-zinc-950 dark:text-white">
            Playlister jeg lytter til
          </h3>
          <div
            class="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6"
            role="list"
          >
            <a
              v-for="playlist in playlists.data.value"
              :key="playlist.id"
              class="group flex flex-col items-center rounded-lg border border-zinc-200 bg-zinc-50 p-4 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              :href="playlist.external_urls.spotify"
              target="_blank"
              rel="noopener noreferrer"
              role="listitem"
            >
              <SpotifyPlaylistTile :playlist />
            </a>
          </div>
        </article>
      </div>
    </section>
  </article>
</template>

<script setup lang="ts">
useHead({
  title: 'Om Jens Morten Mikkelsen — Full-stack webudvikler',
  meta: [
    {
      name: 'description',
      content: 'Lær Jens Morten Mikkelsen at kende som full-stack webudvikler med speciale i moderne frontend, Nuxt, Vue, TypeScript og praktiske webløsninger.',
    },
  ],
})

const favoriteArtists = useFetch('/api/spotify/favorite-artists')
const playlists = useFetch('/api/spotify/playlists')
const repos = useFetch('/api/github/repos')
</script>

<style scoped>
.sweep-bg {
  @apply relative isolate overflow-hidden;

  &::before {
    @apply absolute inset-0 -z-10 bg-zinc-100 dark:bg-zinc-800;
    content: "";
    transform: translateX(-100%);
    transition: transform 300ms ease;
  }

  &:hover::before {
    transform: translateX(0);
  }
}
</style>
