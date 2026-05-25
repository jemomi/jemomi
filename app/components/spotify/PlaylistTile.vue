<template>
  <LazyNuxtImg
    v-if="image"
    :src="image.url"
    :width="image.width"
    :height="image.height"
    class="w-full mb-2 object-cover aspect-square transition duration-200 ease-in-out filter-image-ghost group-hover:filter-none group-hover:opacity-100"
  />
  <span class="underline underline-offset-2 group-hover:no-underline">
    {{ playlist.name }}
  </span>
  <span>
    Af:
    {{ playlist.owner.display_name }}
  </span>
  
</template>

<script setup lang="ts">
import type {SpotifyPlaylist} from '#shared/types/spotify';

const props = defineProps<{
  playlist: SpotifyPlaylist
}>()
const image = props.playlist.images[0]
</script>

<style scoped>

</style>
