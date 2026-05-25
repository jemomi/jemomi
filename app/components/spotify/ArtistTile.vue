<template>
    <LazyNuxtImg
      v-if="image"
      :src="image.url"
      :width="image.width"
      :height="image.height"
      class="w-full mb-2 object-cover aspect-square transition duration-200 ease-in-out filter-image-ghost group-hover:filter-none group-hover:opacity-100"
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