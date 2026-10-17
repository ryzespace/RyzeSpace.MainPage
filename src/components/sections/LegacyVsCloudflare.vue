<template>
  <section class="py-20 bg-neutral-50 dark:bg-[#0E121B] border-b border-neutral-200 dark:border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-12">
        <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          {{ t.comparison.title }}
        </h2>
        <p class="mt-3 text-base text-neutral-600 dark:text-neutral-400">
          {{ t.comparison.subtitle }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div class="p-6 rounded-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <span class="text-[11px] font-bold text-rose-500 uppercase tracking-wider block">
                {{ t.comparison.legacySubtitle }}
              </span>
              <h3 class="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                {{ t.comparison.legacyTitle }}
              </h3>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-500 border border-rose-500/20">
              Legacy Cloud
            </span>
          </div>

          <div class="space-y-2">
            <div
              v-for="(item, idx) in t.comparison.legacyItems"
              :key="idx"
              class="flex items-start gap-2.5 p-2.5 rounded-lg bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-800 text-xs"
            >
              <span class="px-1.5 py-0.2 rounded text-[10px] font-mono font-bold bg-rose-500/10 text-rose-500 shrink-0 mt-0.5">
                {{ item.tag }}
              </span>
              <span class="text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {{ item.text }}
              </span>
            </div>
          </div>
        </div>

        <div class="p-6 rounded-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
            <div>
              <span class="text-[11px] font-bold text-emerald-500 uppercase tracking-wider block">
                {{ t.comparison.shippingSubtitle }}
              </span>
              <h3 class="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
                {{ t.comparison.shippingTitle }}
              </h3>
            </div>
            <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              RyzeSpace
            </span>
          </div>

          <div class="space-y-2.5">
            <div
              v-for="(point, idx) in t.comparison.shippingPoints"
              :key="idx"
              class="flex items-start gap-2.5 p-2.5 rounded-lg bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-800 text-xs"
            >
              <Check class="w-4 h-4 text-[#F38020] shrink-0 mt-0.5" />
              <span class="font-medium text-neutral-800 dark:text-neutral-200 leading-relaxed">
                {{ point }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { Check } from 'lucide-vue-next';

const i18nStore = useI18nStore();
const t = computed(() => i18nStore.t);
</script>
