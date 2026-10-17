<template>
  <section id="region-earth" class="py-20 bg-white dark:bg-[#0B0E14] border-b border-neutral-200 dark:border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-12">
        <div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F38020] mb-3">
          <span>{{ t.regionEarth.badge }}</span>
        </div>
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          {{ t.regionEarth.title }}
        </h2>
        <p class="mt-3 text-base text-neutral-600 dark:text-neutral-400">
          {{ t.regionEarth.subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div class="p-6 rounded-xl bg-neutral-50 dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
          <div class="text-4xl font-bold font-mono text-[#F38020] mb-2">
            {{ t.regionEarth.stat1Number }}
          </div>
          <h3 class="text-base font-bold text-neutral-900 dark:text-white mb-2">
            {{ t.regionEarth.stat1Title }}
          </h3>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {{ t.regionEarth.stat1Desc }}
          </p>
        </div>

        <div class="p-6 rounded-xl bg-neutral-50 dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
          <div class="text-4xl font-bold font-mono text-neutral-900 dark:text-white mb-2">
            {{ t.regionEarth.stat2Number }}
          </div>
          <h3 class="text-base font-bold text-neutral-900 dark:text-white mb-2">
            {{ t.regionEarth.stat2Title }}
          </h3>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {{ t.regionEarth.stat2Desc }}
          </p>
        </div>

        <div class="p-6 rounded-xl bg-neutral-50 dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
          <div class="text-4xl font-bold font-mono text-neutral-900 dark:text-white mb-2">
            {{ t.regionEarth.stat3Number }}
          </div>
          <h3 class="text-base font-bold text-neutral-900 dark:text-white mb-2">
            {{ t.regionEarth.stat3Title }}
          </h3>
          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            {{ t.regionEarth.stat3Desc }}
          </p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-6 rounded-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
          <span class="text-xs font-bold text-[#F38020] uppercase tracking-wider block mb-1">01. Run everywhere</span>
          <h4 class="text-base font-bold text-neutral-900 dark:text-white mb-2">{{ t.regionEarth.card1Title }}</h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ t.regionEarth.card1Desc }}</p>
        </div>

        <div class="p-6 rounded-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
          <span class="text-xs font-bold text-[#F38020] uppercase tracking-wider block mb-1">02. Run anywhere</span>
          <h4 class="text-base font-bold text-neutral-900 dark:text-white mb-2">{{ t.regionEarth.card2Title }}</h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ t.regionEarth.card2Desc }}</p>
        </div>

        <div class="p-6 rounded-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
          <span class="text-xs font-bold text-[#F38020] uppercase tracking-wider block mb-1">03. Run at massive scale</span>
          <h4 class="text-base font-bold text-neutral-900 dark:text-white mb-2">{{ t.regionEarth.card3Title }}</h4>
          <p class="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">{{ t.regionEarth.card3Desc }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';

const i18nStore = useI18nStore();
const t = computed(() => i18nStore.t);
</script>
