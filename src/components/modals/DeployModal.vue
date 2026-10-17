<template>
  <div v-if="cartStore.isDeployModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      class="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity"
      @click="cartStore.closeDeploy()"
    ></div>

    <div
      class="relative w-full max-w-lg bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xl z-10 overflow-hidden"
    >
      <div class="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h3 class="text-sm font-bold text-neutral-900 dark:text-white leading-none">
            {{ t.deployModal.title }}
          </h3>
          <span class="text-[11px] text-neutral-500 font-mono mt-1 block">
            Automated Cloud-Init Cluster
          </span>
        </div>
        <button
          type="button"
          @click="cartStore.closeDeploy()"
          class="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Close Deploy Modal"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <div v-if="!cartStore.deploymentSuccess" class="mt-4 space-y-4">
        <div class="p-3.5 rounded-lg bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-800 space-y-2 font-mono text-xs">
          <div class="flex items-center justify-between pb-1.5 border-b border-neutral-200 dark:border-neutral-800 text-neutral-500">
            <span>NODE INSTANCE</span>
            <span class="text-neutral-900 dark:text-white font-bold">{{ config?.nodeName }}</span>
          </div>

          <div class="grid grid-cols-2 gap-2 text-neutral-700 dark:text-neutral-300 text-[11px]">
            <div>
              <span class="text-[10px] text-neutral-400 uppercase block">Compute Core</span>
              <span class="font-bold text-neutral-900 dark:text-white">{{ config?.cores }}x {{ config?.cpuModel.split('(')[0] }}</span>
            </div>
            <div>
              <span class="text-[10px] text-neutral-400 uppercase block">DDR5 Memory</span>
              <span class="font-bold text-neutral-900 dark:text-white">{{ config?.ramGB }} GB RAM</span>
            </div>
            <div>
              <span class="text-[10px] text-neutral-400 uppercase block">Storage</span>
              <span class="font-bold text-neutral-900 dark:text-white">{{ config?.storageGB }} GB NVMe</span>
            </div>
            <div>
              <span class="text-[10px] text-neutral-400 uppercase block">Network Bandwidth</span>
              <span class="font-bold text-neutral-900 dark:text-white">{{ config?.bandwidthTB }} TB @ 10Gbps</span>
            </div>
          </div>
        </div>

        <div class="p-3.5 rounded-lg bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div>
            <span class="text-[10px] text-neutral-500 uppercase font-mono block">{{ t.deployModal.estimatedBilling }}</span>
            <span class="text-xl font-bold font-mono text-neutral-900 dark:text-white">
              {{ marketStore.formatPrice(config?.priceMonthlyUSD || 0) }}
            </span>
            <span class="text-[11px] text-neutral-500 font-mono"> / month ({{ marketStore.formatPrice(config?.priceHourlyUSD || 0) }}/hr)</span>
          </div>
          <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            Escrow Protected
          </span>
        </div>

        <div v-if="cartStore.isDeploying" class="space-y-2 p-3 rounded-lg bg-orange-500/10 border border-orange-500/20 text-xs">
          <div class="flex items-center justify-between font-mono text-[#F38020] font-bold">
            <span class="flex items-center gap-1.5">
              <Loader2 class="w-3.5 h-3.5 animate-spin" />
              {{ deploymentStepText }}
            </span>
            <span>{{ deployProgress }}%</span>
          </div>
          <div class="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-full overflow-hidden">
            <div
              class="h-full bg-[#F38020] rounded-full transition-all duration-300"
              :style="{ width: `${deployProgress}%` }"
            ></div>
          </div>
        </div>

        <div class="flex items-center gap-2 pt-1">
          <button
            type="button"
            @click="cartStore.closeDeploy()"
            :disabled="cartStore.isDeploying"
            class="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 transition-colors"
          >
            {{ t.deployModal.cancel }}
          </button>
          <button
            type="button"
            @click="handleStartDeploy"
            :disabled="cartStore.isDeploying"
            class="flex-1 py-2 px-3 rounded-lg text-xs font-semibold text-white bg-[#F38020] hover:bg-[#E56F10] disabled:opacity-50 transition-colors"
          >
            <span v-if="cartStore.isDeploying">Deploying...</span>
            <span v-else>{{ t.deployModal.confirmDeploy }}</span>
          </button>
        </div>
      </div>

      <div v-else class="mt-4 text-center space-y-4 py-4">
        <div class="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto">
          <Check class="w-6 h-6" />
        </div>
        <div>
          <h4 class="text-base font-bold text-neutral-900 dark:text-white">Instance Provisioned</h4>
          <p class="text-xs text-neutral-500 mt-1 max-w-xs mx-auto">
            Your node is active on Anycast route. IP credentials dispatched to your console.
          </p>
        </div>
        <button
          type="button"
          @click="cartStore.closeDeploy()"
          class="w-full py-2 px-4 rounded-lg text-xs font-semibold text-white bg-[#F38020] hover:bg-[#E56F10] transition-colors"
        >
          Open Cloud Console
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { useMarketStore } from '@/stores/market';
import { useCartStore } from '@/stores/cart';
import { useToastStore } from '@/stores/toast';
import { X, Loader2, Check } from 'lucide-vue-next';

const i18nStore = useI18nStore();
const marketStore = useMarketStore();
const cartStore = useCartStore();
const toastStore = useToastStore();

const t = computed(() => i18nStore.t);
const config = computed(() => cartStore.selectedNodeConfig);

const deployProgress = ref(0);
const deploymentStep = ref(1);

const deploymentStepText = computed(() => {
  if (deploymentStep.value === 1) return 'Allocating KVM hypervisor...';
  if (deploymentStep.value === 2) return 'Configuring Anycast BGP routes...';
  return 'Locking Smart Escrow funds...';
});

function handleStartDeploy() {
  cartStore.isDeploying = true;
  deployProgress.value = 15;
  deploymentStep.value = 1;

  setTimeout(() => {
    deployProgress.value = 55;
    deploymentStep.value = 2;
  }, 400);

  setTimeout(() => {
    deployProgress.value = 90;
    deploymentStep.value = 3;
  }, 800);

  setTimeout(() => {
    deployProgress.value = 100;
    cartStore.isDeploying = false;
    cartStore.deploymentSuccess = true;
    toastStore.success('Compute node successfully deployed and connected.');
  }, 1200);
}
</script>
