<template>
  <div class="relative" ref="dropdownRef">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-700/80 transition-colors"
      aria-label="Select Language"
    >
      <Globe class="w-3.5 h-3.5 text-neutral-500" />
      <span class="tracking-wider uppercase">{{ currentLangData.code }}</span>
      <ChevronDown class="w-3.5 h-3.5 text-neutral-400 transition-transform duration-150" :class="{ 'rotate-180': isOpen }" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-1.5 w-36 rounded-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 shadow-xl py-1 z-50"
    >
      <button
        v-for="item in languagesList"
        :key="item.id"
        @click="selectLang(item.id)"
        class="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
        :class="item.id === i18nStore.currentLanguage ? 'text-[#F38020] font-semibold bg-orange-500/5' : 'text-neutral-700 dark:text-neutral-300'"
      >
        <span>{{ item.label }}</span>
        <Check v-if="item.id === i18nStore.currentLanguage" class="w-3.5 h-3.5 text-[#F38020]" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import type { Language } from '@/types';
import { Globe, ChevronDown, Check } from 'lucide-vue-next';

const i18nStore = useI18nStore();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const languagesList: { id: Language; label: string; code: string }[] = [
  { id: 'en', label: 'English', code: 'EN' },
  { id: 'pl', label: 'Polski', code: 'PL' },
  { id: 'de', label: 'Deutsch', code: 'DE' },
  { id: 'ru', label: 'Русский', code: 'RU' },
];

const currentLangData = computed(() => {
  return languagesList.find((l) => l.id === i18nStore.currentLanguage) || languagesList[0];
});

function selectLang(lang: Language) {
  i18nStore.setLanguage(lang);
  isOpen.value = false;
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false;
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>
