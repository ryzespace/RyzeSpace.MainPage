import { defineStore } from 'pinia';
import { ref } from 'vue';

export type ThemeMode = 'light' | 'dark' | 'system';

export const useThemeStore = defineStore('theme', () => {
  const mode = ref<ThemeMode>(
    (localStorage.getItem('ryzespace_theme') as ThemeMode) || 'dark'
  );
  const isDark = ref<boolean>(true);

  function applyTheme(targetMode: ThemeMode) {
    mode.value = targetMode;
    localStorage.setItem('ryzespace_theme', targetMode);

    let shouldBeDark = true;
    if (targetMode === 'system') {
      shouldBeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    } else {
      shouldBeDark = targetMode === 'dark';
    }

    isDark.value = shouldBeDark;
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }

  function toggle() {
    applyTheme(isDark.value ? 'light' : 'dark');
  }

  function init() {
    applyTheme(mode.value);
  }

  return {
    mode,
    isDark,
    applyTheme,
    toggle,
    init,
  };
});
