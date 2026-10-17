<template>
  <div class="relative" ref="dropdownRef">
    <button
      type="button"
      @click="isOpen = !isOpen"
      class="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-700/80 border border-neutral-200 dark:border-neutral-700/80 transition-colors"
      aria-label="Select Currency"
    >
      <span class="font-mono text-[#F38020] font-bold">{{ currentCurrencyData.symbol }}</span>
      <span class="tracking-wider uppercase">{{ currentCurrencyData.code }}</span>
      <ChevronDown class="w-3.5 h-3.5 text-neutral-400 transition-transform duration-150" :class="{ 'rotate-180': isOpen }" />
    </button>

    <div
      v-if="isOpen"
      class="absolute right-0 mt-1.5 w-32 rounded-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 shadow-xl py-1 z-50"
    >
      <button
        v-for="item in currenciesList"
        :key="item.code"
        @click="selectCurrency(item.code)"
        class="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800"
        :class="item.code === marketStore.currency ? 'text-[#F38020] font-semibold bg-orange-500/5' : 'text-neutral-700 dark:text-neutral-300'"
      >
        <span class="flex items-center gap-2">
          <span class="font-mono font-bold text-neutral-400">{{ item.symbol }}</span>
          <span>{{ item.code }}</span>
        </span>
        <Check v-if="item.code === marketStore.currency" class="w-3.5 h-3.5 text-[#F38020]" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useMarketStore } from '@/stores/market';
import type { Currency } from '@/types';
import { ChevronDown, Check } from 'lucide-vue-next';

const marketStore = useMarketStore();
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const currenciesList: { code: Currency; label: string; symbol: string }[] = [
  { code: 'USD', label: 'USD ($)', symbol: '$' },
  { code: 'EUR', label: 'EUR (€)', symbol: '€' },
  { code: 'PLN', label: 'PLN (zł)', symbol: 'zł' },
  { code: 'GBP', label: 'GBP (£)', symbol: '£' },
];

const currentCurrencyData = computed(() => {
  return currenciesList.find((c) => c.code === marketStore.currency) || currenciesList[0];
});

function selectCurrency(c: Currency) {
  marketStore.setCurrency(c);
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
