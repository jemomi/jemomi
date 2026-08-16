<template>
  <button
    type="button"
    class="inline-grid min-h-10 grid-cols-2 items-center rounded-md border border-zinc-300 bg-zinc-100 p-1 text-xs font-semibold text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500"
    :aria-label="`Skift til ${nextThemeLabel} tilstand`"
    :aria-pressed="theme === 'dark'"
    @click="toggleTheme"
  >
    <span
      class="rounded px-2 py-1.5 transition"
      :class="theme === 'light' ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'"
    >
      Lys
    </span>
    <span
      class="rounded px-2 py-1.5 transition"
      :class="theme === 'dark' ? 'bg-zinc-950 text-white shadow-sm dark:bg-white dark:text-zinc-950' : 'text-zinc-500 dark:text-zinc-400'"
    >
      Mørk
    </span>
  </button>
</template>

<script setup lang="ts">
type Theme = 'light' | 'dark'

const storageKey = 'theme'
const theme = ref<Theme>('light')

const nextThemeLabel = computed(() => theme.value === 'dark' ? 'lys' : 'mørk')

const applyTheme = (nextTheme: Theme) => {
  theme.value = nextTheme

  if (!import.meta.client) {
    return
  }

  const isDark = nextTheme === 'dark'

  document.documentElement.classList.toggle('dark', isDark)
  document.documentElement.dataset.theme = nextTheme
  document.documentElement.style.colorScheme = nextTheme
  document.body.classList.toggle('dark', isDark)
  document.body.dataset.theme = nextTheme
  document.body.style.colorScheme = nextTheme
  window.localStorage.setItem(storageKey, nextTheme)
}

const getInitialTheme = (): Theme => {
  if (!import.meta.client) {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(storageKey)

  if (storedTheme === 'dark' || storedTheme === 'light') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

const toggleTheme = () => {
  applyTheme(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
  applyTheme(getInitialTheme())
})
</script>
