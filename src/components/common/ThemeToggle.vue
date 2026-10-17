<template>
  <button
    type="button"
    @click="themeStore.toggle()"
    class="flex items-center justify-center w-8 h-8 rounded-md text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
    :aria-label="themeStore.isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <Sun v-if="themeStore.isDark" class="w-4 h-4" />
    <Moon v-else class="w-4 h-4" />
  </button>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/stores/theme';
import { Sun, Moon } from 'lucide-vue-next';

const themeStore = useThemeStore();
</script>
