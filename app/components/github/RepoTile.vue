<template>
  <a
    :href="repo.html_url"
    target="_blank"
    rel="noopener noreferrer"
    class="sweep-bg flex flex-col rounded-lg border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-950"
  >
    <p class="font-bold text-zinc-950 dark:text-white">
      {{ repo.name }}
    </p>
    <div class="mt-3 flex flex-col gap-1 text-sm text-zinc-600 dark:text-zinc-400">
      <span v-if="repo.created_at">
        Oprettet: {{ getDisplayDate(repo.created_at) }}
      </span>
      <span v-if="repo.updated_at">
        Opdateret: {{ getDisplayDate(repo.updated_at) }}
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
    return 'I dag';
  }
  if (today.getDate() - 1 === date.getDate()) {
    return 'I går';
  }
  return date.toLocaleDateString('da-DK')
}
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
