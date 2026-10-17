<template>
  <section id="marketplace" class="py-20 bg-neutral-50 dark:bg-[#0E121B] border-b border-neutral-200 dark:border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div class="max-w-2xl">
          <div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F38020] mb-2">
            <span>{{ t.marketplace.badge }}</span>
          </div>
          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            {{ t.marketplace.title }}
          </h2>
          <p class="mt-2 text-base text-neutral-600 dark:text-neutral-400">
            {{ t.marketplace.subtitle }}
          </p>
        </div>

        <div class="flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 text-xs font-mono font-medium text-neutral-700 dark:text-neutral-300">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            {{ filteredNodes.length }} Active Bare Metal Nodes
          </span>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 p-2 rounded-lg bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
        <div class="relative w-full sm:w-72">
          <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="t.marketplace.searchNodes"
            class="w-full bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 rounded-md pl-9 pr-3 py-1.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:border-[#F38020]"
          />
        </div>

        <div class="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          <select
            v-model="selectedRegion"
            class="bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 rounded-md px-2.5 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-[#F38020]"
          >
            <option value="all">{{ t.marketplace.allRegions }}</option>
            <option value="DE">DE — Frankfurt</option>
            <option value="PL">PL — Warsaw</option>
            <option value="GB">GB — London</option>
            <option value="US">US — Ashburn / San Jose</option>
            <option value="JP">JP — Tokyo</option>
            <option value="SG">SG — Singapore</option>
            <option value="NL">NL — Amsterdam</option>
          </select>

          <select
            v-model="selectedCategory"
            class="bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 rounded-md px-2.5 py-1.5 text-xs font-medium text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-[#F38020]"
          >
            <option value="all">{{ t.marketplace.allCategories }}</option>
            <option value="compute">Compute Optimized</option>
            <option value="balanced">Balanced</option>
            <option value="memory">Memory Optimized</option>
            <option value="storage">Storage Vault</option>
          </select>

          <button
            v-if="searchQuery || selectedRegion !== 'all' || selectedCategory !== 'all'"
            type="button"
            @click="resetFilters"
            class="px-2.5 py-1.5 text-xs font-semibold text-[#F38020] hover:underline"
          >
            {{ t.marketplace.resetFilters }}
          </button>
        </div>
      </div>

      <div v-if="filteredNodes.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          v-for="node in filteredNodes"
          :key="node.id"
          class="flex flex-col justify-between p-5 rounded-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 transition-colors"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700">
                {{ node.countryCode }}
              </span>
              <span class="text-[11px] font-mono text-emerald-500 font-semibold">
                {{ node.pingMs }} ms
              </span>
            </div>

            <h3 class="text-sm font-bold text-neutral-900 dark:text-white leading-snug">
              {{ node.name }}
            </h3>
            <p class="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 truncate">
              {{ node.provider }}
            </p>

            <div class="my-4 pt-3 border-t border-neutral-100 dark:border-neutral-800 space-y-1.5 text-xs">
              <div class="flex items-center justify-between">
                <span class="text-neutral-500">CPU:</span>
                <span class="font-mono font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[140px]">{{ node.cpuModel }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-neutral-500">RAM:</span>
                <span class="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{{ node.ramGB }} GB DDR5</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-neutral-500">Disk:</span>
                <span class="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{{ node.storageGB }} GB {{ node.storageType }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-neutral-500">Uplink:</span>
                <span class="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{{ node.networkSpeedGbps }} Gbps Anycast</span>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between gap-2">
            <div>
              <div class="text-base font-bold font-mono text-neutral-900 dark:text-white leading-none">
                {{ marketStore.formatPrice(node.pricePerMonth) }}
              </div>
              <div class="text-[10px] text-neutral-500 mt-0.5">
                {{ marketStore.formatPrice(node.pricePerHour) }}{{ t.marketplace.perHour }}
              </div>
            </div>

            <button
              type="button"
              @click="handleRentNode(node)"
              class="px-3 py-1.5 rounded-md text-xs font-semibold text-white bg-[#F38020] hover:bg-[#E56F10] transition-colors cursor-pointer"
            >
              {{ t.marketplace.rentNow }}
            </button>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 bg-white dark:bg-[#131824] rounded-xl border border-neutral-200 dark:border-neutral-800">
        <p class="text-xs text-neutral-500">{{ t.marketplace.noResults }}</p>
        <button
          type="button"
          @click="resetFilters"
          class="mt-3 px-3 py-1.5 text-xs font-semibold text-[#F38020] hover:underline"
        >
          {{ t.marketplace.resetFilters }}
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { useMarketStore } from '@/stores/market';
import { useCartStore } from '@/stores/cart';
import type { MarketplaceNode } from '@/types';
import { Search } from 'lucide-vue-next';

const i18nStore = useI18nStore();
const marketStore = useMarketStore();
const cartStore = useCartStore();

const t = computed(() => i18nStore.t);

const searchQuery = ref('');
const selectedRegion = ref('all');
const selectedCategory = ref('all');

const filteredNodes = computed(() => {
  return marketStore.marketplaceNodes.filter((node) => {
    const matchesSearch =
      searchQuery.value === '' ||
      node.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      node.cpuModel.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      node.location.toLowerCase().includes(searchQuery.value.toLowerCase());

    const matchesRegion =
      selectedRegion.value === 'all' || node.countryCode === selectedRegion.value;

    const matchesCategory =
      selectedCategory.value === 'all' || node.category === selectedCategory.value;

    return matchesSearch && matchesRegion && matchesCategory;
  });
});

function resetFilters() {
  searchQuery.value = '';
  selectedRegion.value = 'all';
  selectedCategory.value = 'all';
}

function handleRentNode(node: MarketplaceNode) {
  cartStore.openDeployModal(node);
}

function setSearch(query: string) {
  searchQuery.value = query;
}

defineExpose({
  setSearch,
  searchQuery,
});
</script>
