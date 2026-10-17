<template>
  <header
    :class="[
      'sticky top-0 z-40 w-full transition-colors duration-150 border-b',
      isScrolled
        ? 'bg-white/95 dark:bg-[#0B0E14]/95 backdrop-blur-md border-neutral-200 dark:border-neutral-800'
        : 'bg-white dark:bg-[#0B0E14] border-neutral-200 dark:border-neutral-800',
    ]"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
      <div class="flex items-center gap-8">
        <Logo @click="scrollToSection('hero')" />

        <nav class="hidden lg:flex items-center gap-1">
          <button
            v-for="item in navLinks"
            :key="item.id"
            type="button"
            @click="scrollToSection(item.id)"
            class="px-3 py-1.5 rounded-md text-sm font-medium text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            {{ item.label }}
          </button>
        </nav>
      </div>

      <div class="hidden lg:flex items-center gap-3">
        <LanguageDropdown />
        <CurrencyDropdown />
        <ThemeToggle />

        <div class="h-4 w-px bg-neutral-200 dark:bg-neutral-800"></div>

        <button
          type="button"
          @click="authStore.openAuth('login')"
          class="px-3 py-1.5 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          {{ t.nav.login }}
        </button>

        <button
          type="button"
          @click="authStore.openAuth('register')"
          class="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-[#F38020] hover:bg-[#E56F10] transition-colors"
        >
          {{ t.nav.getStarted }}
        </button>
      </div>

      <div class="flex lg:hidden items-center gap-2">
        <ThemeToggle />
        <button
          type="button"
          @click="isMobileMenuOpen = true"
          class="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Open Mobile Menu"
        >
          <Menu class="w-5 h-5" />
        </button>
      </div>
    </div>

    <MobileMenu :is-open="isMobileMenuOpen" @close="isMobileMenuOpen = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { useAuthStore } from '@/stores/auth';
import Logo from '@/components/common/Logo.vue';
import LanguageDropdown from '@/components/common/LanguageDropdown.vue';
import CurrencyDropdown from '@/components/common/CurrencyDropdown.vue';
import ThemeToggle from '@/components/common/ThemeToggle.vue';
import MobileMenu from '@/components/layout/MobileMenu.vue';
import { Menu } from 'lucide-vue-next';

const i18nStore = useI18nStore();
const authStore = useAuthStore();
const t = computed(() => i18nStore.t);

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const navLinks = computed(() => [
  { id: 'region-earth', label: t.value.nav.solutions },
  { id: 'marketplace', label: t.value.nav.marketplace },
  { id: 'roles', label: t.value.nav.company },
  { id: 'network', label: t.value.nav.network },
  { id: 'contact', label: t.value.nav.contact },
]);

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20;
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>
