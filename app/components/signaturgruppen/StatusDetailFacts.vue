<template>
  <dl class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
    <div
      v-for="fact in visibleFacts"
      :key="fact.label"
      class="rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/40"
    >
      <dt class="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {{ fact.label }}
      </dt>
      <dd class="mt-1 text-sm text-zinc-900 dark:text-zinc-100">
        <NuxtLink
          v-if="fact.href"
          :to="fact.href"
          target="_blank"
          rel="noopener noreferrer"
          class="underline underline-offset-2 hover:no-underline"
        >
          {{ fact.value }}
        </NuxtLink>
        <span v-else>
          {{ fact.value }}
        </span>
      </dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
type DetailFact = {
  label: string;
  value?: string | number | null;
  href?: string;
};

const props = defineProps<{
  facts: DetailFact[];
}>()

const visibleFacts = computed(() => {
  return props.facts.filter((fact) => fact.value !== undefined && fact.value !== null && fact.value !== '')
})
</script>
