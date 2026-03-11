<template>
  <LazyNuxtImg
    v-if="image"
    :src="image.url"
    :width="image.width"
    :height="image.height"
    class="mb-2 max-w-36 rounded-[100%] group-hover:rounded-none transition-all duration-200 object-cover aspect-square"
  />
  <span class="underline underline-offset-2 group-hover:no-underline">
    {{ artist.name }}
  </span>
</template>

<script setup lang="ts">
import type {SpotifyArtist} from '#shared/types/spotify';

const props = defineProps<{
  artist: SpotifyArtist
}>()

const image = getArtistImage()

function getArtistImage() {
  const image = unref(props.artist.images.at(1));
  
  if (!image) {
    return null;
  }
  
  if (image.width) {
    image.width = 160;
  }
  
  if (image.height) {
    image.height = 160;
  }
  
  return image;
}
</script>

<style scoped>

</style>