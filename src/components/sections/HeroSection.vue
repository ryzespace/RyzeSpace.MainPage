<template>
  <section class="py-20 md:py-28 bg-white dark:bg-[#0B0E14] border-b border-neutral-200 dark:border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-[#F38020] text-xs font-semibold uppercase tracking-wider mb-6">
          <span>{{ t.hero.badge }}</span>
        </div>

        <h1 class="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.12] mb-6">
          {{ t.hero.title }},
          <span class="block text-neutral-500 dark:text-neutral-400 font-bold mt-1">
            {{ t.hero.subtitle }}.
          </span>
        </h1>

        <p class="text-base sm:text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto mb-8 leading-relaxed">
          {{ t.hero.description }}
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <button
            type="button"
            @click="openRegister"
            class="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[#F38020] hover:bg-[#E56F10] transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{{ t.hero.ctaPrimary }}</span>
            <ArrowRight class="w-4 h-4" />
          </button>

          <button
            type="button"
            @click="scrollToSection('marketplace')"
            class="w-full sm:w-auto px-6 py-3 rounded-lg text-sm font-semibold text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{{ t.hero.ctaSecondary }}</span>
          </button>
        </div>

        <p class="text-xs text-neutral-500 dark:text-neutral-400 flex items-center justify-center gap-1.5">
          <Check class="w-3.5 h-3.5 text-emerald-500" />
          <span>{{ t.hero.noCreditCard }}</span>
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { useAuthStore } from '@/stores/auth';
import { ArrowRight, Check } from 'lucide-vue-next';

const i18nStore = useI18nStore();
const authStore = useAuthStore();
const t = computed(() => i18nStore.t);

function openRegister() {
  authStore.openAuth('register');
}

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
