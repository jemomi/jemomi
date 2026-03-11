<template>
  <LazyNuxtImg
    v-if="image"
    :src="image.url"
    :width="image.width"
    :height="image.height"
    class="mb-2 max-w-36 flex-grow rounded-[100%] group-hover:rounded-none transition-all duration-200 object-cover aspect-square"
  />
  <span class="underline underline-offset-2 group-hover:no-underline">
    {{ playlist.name }}
  </span>
  <span>
    By:
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