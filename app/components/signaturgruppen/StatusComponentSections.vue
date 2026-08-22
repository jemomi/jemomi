<template>
  <section class="space-y-3">
    <div class="flex flex-col gap-1 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 class="text-xl font-semibold">
          Komponenter
        </h2>
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          Seneste status pr. komponent, grupperet på SignaturGruppens komponentgrupper.
        </p>
      </div>
      <p class="text-sm text-zinc-500 dark:text-zinc-400">
        {{ componentCount }} komponenter
      </p>
    </div>

    <div class="space-y-4">
      <div
        v-for="section in sections"
        :key="section.key"
        class="overflow-hidden rounded-lg border border-l-4 border-t-4 border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40"
        :class="getStatusBorderClass(getComponentGroupSectionStatus(section))"
      >
        <button
          type="button"
          class="flex w-full items-center justify-between gap-4 border-b border-zinc-200 bg-zinc-50 px-4 py-3 text-left dark:border-zinc-800 dark:bg-zinc-900"
          :aria-expanded="isSectionOpen(section.key)"
          @click="toggleSection(section.key)"
        >
          <div class="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
            <h3 class="font-medium text-zinc-950 dark:text-white">
              {{ section.label }}
            </h3>
            <SignaturgruppenStatusBadge :status="getComponentGroupSectionStatus(section)" />
          </div>
          <span class="text-lg leading-none text-zinc-500 dark:text-zinc-400">
            {{ isSectionOpen(section.key) ? '−' : '+' }}
          </span>
        </button>

        <div v-show="isSectionOpen(section.key)">
          <NuxtLink
            v-for="group in section.groups"
            :key="group.key"
            :to="`/api/signaturgruppen-status/${group.statusLine.id}`"
            class="block border-b border-l-4 border-zinc-200 py-4 pl-4 pr-4 transition last:border-b-0 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            :class="getStatusBorderClass(getComponentStatus(group.statusLine))"
          >
            <div class="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
              <div class="space-y-1">
                <p class="font-medium text-zinc-950 dark:text-white">
                  {{ getComponentName(group.statusLine) }}
                </p>
                <p class="text-sm text-zinc-500 dark:text-zinc-400">
                  Senest {{ formatDate(group.statusLine.received_at) }} · {{ group.groupSize }} skift registreret
                </p>
                <p class="text-xs text-zinc-500 dark:text-zinc-500">
                  Seneste skift: {{ formatStatusText(getComponentTransition(group.statusLine)) }}
                </p>
              </div>
              <SignaturgruppenStatusBadge :status="getComponentStatus(group.statusLine)" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { ComponentGroupSection } from '~/utils/signaturgruppen/statusView';
import {
  formatDate,
  formatStatusText,
  getComponentGroupSectionStatus,
  getComponentName,
  getComponentStatus,
  getComponentTransition,
  getStatusBorderClass,
} from '~/utils/signaturgruppen/statusView';

const props = defineProps<{
  sections: ComponentGroupSection[];
}>()

const componentCount = computed(() => {
  return props.sections.reduce((total, section) => total + section.groups.length, 0)
})

const openSectionKeys = ref(new Set<string>())

const isSectionOpen = (sectionKey: string) => {
  return openSectionKeys.value.has(sectionKey)
}

const toggleSection = (sectionKey: string) => {
  const nextOpenSectionKeys = new Set(openSectionKeys.value)

  if (nextOpenSectionKeys.has(sectionKey)) {
    nextOpenSectionKeys.delete(sectionKey)
  } else {
    nextOpenSectionKeys.add(sectionKey)
  }

  openSectionKeys.value = nextOpenSectionKeys
}
</script>
