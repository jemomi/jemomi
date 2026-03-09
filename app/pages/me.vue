<template>
  <article class="container mx-auto">
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
          Favorite artists
        </h3>
        <div
          class="grid grid-cols-[repeat(auto-fit,minmax(200px,250px))] gap-4 my-4"
          role="list"
        >
          <a
            v-for="artist in favoriteArtists.data.value"
            class="flex flex-col items-center border border-zinc-700 p-4 rounded-lg underline underline-offset-2 hover:no-underline"
            :href="artist.external_urls.spotify"
            target="_blank"
            role="listitem"
          >
            <SpotifyArtistTile :artist />
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
  
</script>