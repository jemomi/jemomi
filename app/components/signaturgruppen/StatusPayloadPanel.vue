<template>
  <details class="rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
    <summary class="cursor-pointer px-4 py-3 font-medium text-zinc-950 dark:text-white">
      Rå payload
    </summary>
    <pre class="overflow-x-auto border-t border-zinc-200 bg-zinc-950 p-4 text-xs text-white dark:border-zinc-800">{{ payload }}</pre>
  </details>
</template>

<script setup lang="ts">
import type { PublicStatus } from '#shared/types/signaturGruppen';

defineProps<{
  payload: PublicStatus['payload'];
}>()
</script>
