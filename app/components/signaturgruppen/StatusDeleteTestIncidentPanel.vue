<template>
  <div class="flex flex-col items-start gap-1 md:items-end">
    <button
      type="button"
      class="text-sm font-medium text-zinc-500 underline underline-offset-2 hover:text-red-700 hover:no-underline disabled:cursor-not-allowed disabled:text-zinc-400 dark:text-zinc-400 dark:hover:text-red-300"
      :disabled="isDeleting"
      @click="deleteTestIncident"
    >
      {{ isDeleting ? 'Sletter testhændelse...' : `Slet testhændelse (${group.groupSize})` }}
    </button>
    <p
      v-if="deleteMessage"
      class="text-xs text-zinc-500 dark:text-zinc-400"
    >
      {{ deleteMessage }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type {
  IncidentStatusLine,
  StatusLineGroup,
} from '~/utils/signaturgruppen/statusView';

const props = defineProps<{
  group: StatusLineGroup<IncidentStatusLine>;
}>()

const emit = defineEmits<{
  deleted: [];
}>()

const isDeleting = ref(false)
const deleteMessage = ref('')

const deleteTestIncident = async () => {
  if (isDeleting.value) {
    return
  }

  const confirmed = window.confirm(`Slet testhændelsen og ${props.group.groupSize} statuslinjer?`)

  if (!confirmed) {
    return
  }

  isDeleting.value = true
  deleteMessage.value = ''

  try {
    const response = await $fetch<{ deletedCount: number }>(`/api/signaturgruppen/status/${props.group.statusLine.id}`, {
      method: 'DELETE',
    })

    deleteMessage.value = `${response.deletedCount} statuslinjer slettet.`
    emit('deleted')
  } catch (deleteError) {
    deleteMessage.value = deleteError instanceof Error
      ? deleteError.message
      : 'Kunne ikke slette testhændelsen.'
  } finally {
    isDeleting.value = false
  }
}
</script>
