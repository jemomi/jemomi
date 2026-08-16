<template>
  <button
    type="button"
    class="inline-grid min-h-10 grid-cols-2 items-center rounded-md border border-zinc-300 bg-zinc-100 p-1 text-zinc-700 transition hover:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500"
    :aria-label="`Skift til ${nextThemeLabel} tilstand`"
    :aria-pressed="theme === 'dark'"
    :title="`Skift til ${nextThemeLabel} tilstand`"
    @click="toggleTheme"
  >
    <span
      class="inline-flex size-8 items-center justify-center rounded transition"
      :class="theme === 'light' ? 'bg-white text-zinc-950 shadow-sm dark:bg-zinc-800 dark:text-white' : 'text-zinc-500 dark:text-zinc-400'"
    >
      <span class="sr-only">Lys</span>
      <svg
        aria-hidden="true"
        class="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle
          cx="12"
          cy="12"
          r="4"
        />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>
    </span>
    <span
      class="inline-flex size-8 items-center justify-center rounded transition"
      :class="theme === 'dark' ? 'bg-zinc-950 text-white shadow-sm dark:bg-white dark:text-zinc-950' : 'text-zinc-500 dark:text-zinc-400'"
    >
      <span class="sr-only">Mørk</span>
      <svg
        aria-hidden="true"
        class="size-4"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M20.99 12.46A9 9 0 1 1 11.54 3.01 7 7 0 0 0 20.99 12.46Z" />
      </svg>
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
