<template>
  <a
    :href="repo.html_url"
    class="sweep-bg flex flex-col border border-zinc-700 p-4 rounded-lg"
  >
    <p class="font-bold">
      {{ repo.name }}
    </p>
    <div class="flex gap-2">
      <span v-if="repo.created_at">
        Created: {{ getDisplayDate(repo.created_at) }}
      </span>
      <span v-if="repo.updated_at">
        Updated: {{ getDisplayDate(repo.updated_at) }}
      </span>
    </div>
  </a>
</template>

<script setup lang="ts">
import type {GitHubUserRepo} from '#shared/types/github';

defineProps<{
  repo: GitHubUserRepo
}>()

const getDisplayDate = (dateString: string) => {
  const today = new Date();
  const date = new Date(dateString);
  if (today.getDate() === date.getDate()) {
    return 'Today';
  }
  if (today.getDate() - 1 === date.getDate()) {
    return 'Yesterday';
  }
  return date.toLocaleDateString()
}
</script>

<style scoped>
.sweep-bg {
  @apply relative overflow-hidden isolate;
  
  &::before {
    @apply bg-zinc-700 absolute inset-0 -z-10;
    content: "";
    transform: translateX(-100%);
    transition: transform 300ms ease;
  }
  
  &:hover::before {
    transform: translateX(0);
  }
}

</style>