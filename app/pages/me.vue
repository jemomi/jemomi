<template>
  <article class="container mx-auto px-4">
    <h1>
      Hello 👋
      <span>My name is</span> <!-- switching translation, jeg hedder, je suis, ich bin others... -->
      Jens Morten Mikkelsen
    </h1>
<!--    <p>
      This is you.
      &lt;!&ndash; fun place to show available information about the visitor 😈&ndash;&gt;
    </p>-->
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
    <section>
      <h2>
        Code! 💾
      </h2>
      <p>
        GitHub!
      </p>
    </section>
  </article>
</template>

<script setup lang="ts">
  const favoriteArtists = useFetch('/api/spotify/favorite-artists')
  const playlists = useFetch('/api/spotify/playlists')
  
</script>