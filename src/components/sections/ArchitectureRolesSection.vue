<template>
  <section id="roles" class="py-20 bg-neutral-50 dark:bg-[#0E121B] border-b border-neutral-200 dark:border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-12">
        <div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F38020] mb-2">
          <span>{{ t.rolesSection.badge }}</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          {{ t.rolesSection.title }}
        </h2>
        <p class="mt-2 text-base text-neutral-600 dark:text-neutral-400">
          {{ t.rolesSection.subtitle }}
        </p>
      </div>

      <div class="flex items-center gap-1.5 max-w-lg p-1 rounded-lg bg-neutral-200/80 dark:bg-[#131824] mb-8">
        <button
          type="button"
          @click="activeRole = 'buyer'"
          class="flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-colors text-center"
          :class="activeRole === 'buyer' ? 'bg-white dark:bg-[#0B0E14] text-[#F38020] shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
        >
          {{ t.rolesSection.buyerTab }}
        </button>
        <button
          type="button"
          @click="activeRole = 'seller'"
          class="flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-colors text-center"
          :class="activeRole === 'seller' ? 'bg-white dark:bg-[#0B0E14] text-[#F38020] shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
        >
          {{ t.rolesSection.sellerTab }}
        </button>
        <button
          type="button"
          @click="activeRole = 'moderator'"
          class="flex-1 py-1.5 px-3 rounded-md text-xs font-semibold transition-colors text-center"
          :class="activeRole === 'moderator' ? 'bg-white dark:bg-[#0B0E14] text-[#F38020] shadow-sm' : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'"
        >
          {{ t.rolesSection.moderatorTab }}
        </button>
      </div>

      <div class="p-6 sm:p-8 rounded-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
        <div class="max-w-3xl space-y-4">
          <h3 class="text-xl font-bold text-neutral-900 dark:text-white leading-tight">
            {{ roleContent.title }}
          </h3>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {{ roleContent.desc }}
          </p>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div
              v-for="(point, idx) in roleContent.points"
              :key="idx"
              class="flex items-start gap-2.5 p-2.5 rounded-lg bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-800 text-xs"
            >
              <Check class="w-4 h-4 text-[#F38020] shrink-0 mt-0.5" />
              <span class="text-neutral-800 dark:text-neutral-200">{{ point }}</span>
            </div>
          </div>

          <div class="pt-2">
            <button
              type="button"
              @click="authStore.openAuth('register')"
              class="px-4 py-2 rounded-lg text-xs font-semibold text-white bg-[#F38020] hover:bg-[#E56F10] transition-colors"
            >
              Get Started as {{ activeRole }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { useAuthStore } from '@/stores/auth';
import type { UserRole } from '@/types';
import { Check } from 'lucide-vue-next';

const i18nStore = useI18nStore();
const authStore = useAuthStore();
const t = computed(() => i18nStore.t);

const activeRole = ref<UserRole>('buyer');

const roleContent = computed(() => {
  if (activeRole.value === 'seller') {
    return {
      title: t.value.rolesSection.sellerTitle,
      desc: t.value.rolesSection.sellerDesc,
      points: t.value.rolesSection.sellerPoints,
    };
  }
  if (activeRole.value === 'moderator') {
    return {
      title: t.value.rolesSection.moderatorTitle,
      desc: t.value.rolesSection.moderatorDesc,
      points: t.value.rolesSection.moderatorPoints,
    };
  }
  return {
    title: t.value.rolesSection.buyerTitle,
    desc: t.value.rolesSection.buyerDesc,
    points: t.value.rolesSection.buyerPoints,
  };
});
</script>
