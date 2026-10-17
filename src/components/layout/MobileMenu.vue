<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 lg:hidden">
    <div
      class="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      @click="$emit('close')"
    ></div>

    <div
      class="fixed inset-y-0 right-0 max-w-xs w-full bg-white dark:bg-[#0B0E14] border-l border-neutral-200 dark:border-neutral-800 p-6 flex flex-col justify-between shadow-2xl z-10 overflow-y-auto"
    >
      <div>
        <div class="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
          <Logo @click="handleNav('hero')" />
          <button
            type="button"
            @click="$emit('close')"
            class="p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
            aria-label="Close Navigation"
          >
            <X class="w-5 h-5" />
          </button>
        </div>

        <nav class="mt-4 flex flex-col gap-1">
          <button
            v-for="item in navLinks"
            :key="item.id"
            @click="handleNav(item.id)"
            class="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-[#F38020] transition-colors text-left"
          >
            <span>{{ item.label }}</span>
            <ChevronRight class="w-3.5 h-3.5 text-neutral-400" />
          </button>
        </nav>

        <div class="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between gap-2">
          <LanguageDropdown />
          <CurrencyDropdown />
          <ThemeToggle />
        </div>
      </div>

      <div class="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-2">
        <button
          type="button"
          @click="openAuth('login')"
          class="w-full py-2 px-3 rounded-lg text-xs font-semibold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
        >
          {{ t.nav.login }}
        </button>
        <button
          type="button"
          @click="openAuth('register')"
          class="w-full py-2 px-3 rounded-lg text-xs font-semibold text-white bg-[#F38020] hover:bg-[#E56F10] transition-colors"
        >
          {{ t.nav.getStarted }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { useAuthStore } from '@/stores/auth';
import Logo from '@/components/common/Logo.vue';
import LanguageDropdown from '@/components/common/LanguageDropdown.vue';
import CurrencyDropdown from '@/components/common/CurrencyDropdown.vue';
import ThemeToggle from '@/components/common/ThemeToggle.vue';
import { X, ChevronRight } from 'lucide-vue-next';

defineProps<{
  isOpen: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
}>();

const i18nStore = useI18nStore();
const authStore = useAuthStore();
const t = computed(() => i18nStore.t);

const navLinks = computed(() => [
  { id: 'region-earth', label: t.value.nav.solutions },
  { id: 'marketplace', label: t.value.nav.marketplace },
  { id: 'roles', label: t.value.nav.company },
  { id: 'network', label: t.value.nav.network },
  { id: 'contact', label: t.value.nav.contact },
]);

function handleNav(id: string) {
  emit('close');
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function openAuth(mode: 'login' | 'register') {
  emit('close');
  authStore.openAuth(mode);
}
</script>
