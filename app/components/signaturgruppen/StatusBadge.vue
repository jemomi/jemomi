<template>
  <span
    class="inline-flex w-fit items-center rounded-full px-2.5 py-1 text-xs font-medium"
    :class="getStatusClass(status)"
  >
    {{ formatStatusText(status) }}
  </span>
</template>

<script setup lang="ts">
import { formatStatusText, getStatusClass } from '~/utils/signaturgruppen/statusView';

defineProps<{
  status: string;
}>()
</script>
