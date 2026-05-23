<template>
  <article class="container mx-auto px-4">
    <h1>
      Hello 👋
      <span>My name is</span> <!-- switching translation, jeg hedder, je suis, ich bin others... -->
      Jens Morten Mikkelsen
    </h1>
    <section>
      <h2>
        Code! 💾
      </h2>
      <p>
        GitHub!
      </p>
      
      <article
        v-if="repos"
      >
        <h3>
          Repos
        </h3>
        <div class="grid my-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <GithubRepoTile
            v-for="repo in repos.data.value"
            :key="`gitRepo-${repo.id}`"
            :repo
          />
        </div>
      </article>
      <article>
        <h3>
          Contributions
        </h3>
        <div class="grid my-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <a
            href="https://github.com/nuxt/image/pull/2028"
            class="sweep-bg flex flex-col border border-zinc-700 p-4 rounded-lg"
          >
            <p class="font-bold">
              Nuxt/Image
            </p>
            <p>
              Not yet released
              <br>
              look for umbraco and @jemomi
            </p>
          </a>
        </div>
      </article>
    </section>
    <section>
      <h2>
        Music! 🎶
      </h2>
      <p>
        I love music, and it has always been a huge part of my life!
      </p>
      <article v-if="favoriteArtists.data">
        <h3>
          Some of my favorite artists
        </h3>
        <div
          class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 my-4"
          role="list"
        >
          <a
            v-for="artist in favoriteArtists.data.value"
            :key="artist.id"
            class="group flex flex-col items-center border border-zinc-700 p-4 rounded-lg"
            :href="artist.external_urls.spotify"
            target="_blank"
            role="listitem"
          >
            <SpotifyArtistTile :artist />
          </a>
        </div>
      </article>
      <article v-if="playlists.data">
        <h3>
          Some of the playlists i listen to
        </h3>
        <div
          class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 my-4"
          role="list"
        >
          <a
            v-for="playlist in playlists.data.value"
            :key="playlist.id"
            class="group flex flex-col items-center border border-zinc-700 p-4 rounded-lg"
            :href="playlist.external_urls.spotify"
            target="_blank"
            role="listitem"
          >
            <SpotifyPlaylistTile :playlist />
          </a>
        </div>
      </article>
    </section>
  </article>
</template>

<script setup lang="ts">
  const favoriteArtists = useFetch('/api/spotify/favorite-artists')
  const playlists = useFetch('/api/spotify/playlists')
  
  const repos = useFetch('/api/github/repos')
</script>

<style scoped>
.sweep-bg {
  @apply relative overflow-hidden isolate;
  
  &::before {
    @apply bg-zinc-300 dark:bg-zinc-700 absolute inset-0 -z-10;
    content: "";
    transform: translateX(-100%);
    transition: transform 300ms ease;
  }
  
  &:hover::before {
    transform: translateX(0);
  }
}
</style>