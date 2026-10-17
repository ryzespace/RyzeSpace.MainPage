<template>
  <footer class="bg-white dark:bg-[#0B0E14] border-t border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
        <div class="col-span-2 space-y-3">
          <Logo />
          <p class="text-xs text-neutral-500 max-w-sm leading-relaxed">
            {{ t.footer.description }}
          </p>
        </div>

        <div>
          <h4 class="font-semibold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
            {{ t.footer.productCol }}
          </h4>
          <ul class="space-y-2">
            <li><button type="button" @click="scrollToSection('marketplace')" class="hover:text-neutral-900 dark:hover:text-white">Bare Metal Nodes</button></li>
            <li><button type="button" @click="scrollToSection('region-earth')" class="hover:text-neutral-900 dark:hover:text-white">Region Earth</button></li>
            <li><button type="button" @click="scrollToSection('network')" class="hover:text-neutral-900 dark:hover:text-white">Global Edge Mesh</button></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
            {{ t.footer.companyCol }}
          </h4>
          <ul class="space-y-2">
            <li><button type="button" @click="scrollToSection('roles')" class="hover:text-neutral-900 dark:hover:text-white">Ecosystem Roles</button></li>
            <li><button type="button" @click="scrollToSection('contact')" class="hover:text-neutral-900 dark:hover:text-white">Contact Enterprise</button></li>
            <li><button type="button" @click="scrollToSection('contact')" class="hover:text-neutral-900 dark:hover:text-white">Bug Bounty</button></li>
          </ul>
        </div>

        <div>
          <h4 class="font-semibold text-neutral-900 dark:text-white uppercase tracking-wider text-[11px] mb-3">
            {{ t.footer.legalCol }}
          </h4>
          <ul class="space-y-2">
            <li><button type="button" @click="$emit('open-legal', 'privacy')" class="hover:text-neutral-900 dark:hover:text-white">Privacy Policy</button></li>
            <li><button type="button" @click="$emit('open-legal', 'terms')" class="hover:text-neutral-900 dark:hover:text-white">Terms of Service</button></li>
            <li><button type="button" @click="$emit('open-legal', 'privacy')" class="hover:text-neutral-900 dark:hover:text-white">GDPR &amp; ISO 27001</button></li>
            <li><button type="button" @click="$emit('open-legal', 'terms')" class="hover:text-neutral-900 dark:hover:text-white">Smart Escrow SLA</button></li>
          </ul>
        </div>
      </div>

      <div class="pt-8 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
        <div>
          &copy; {{ new Date().getFullYear() }} RyzeSpace Network Inc. {{ t.footer.rights }}
        </div>
        <div class="flex items-center gap-4">
          <button type="button" @click="$emit('open-legal', 'privacy')" class="hover:underline">Privacy</button>
          <button type="button" @click="$emit('open-legal', 'terms')" class="hover:underline">Terms</button>
          <button type="button" @click="scrollToSection('contact')" class="hover:underline">Security</button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import Logo from '@/components/common/Logo.vue';

defineEmits<{
  (e: 'open-legal', type: 'privacy' | 'terms'): void;
}>();

const i18nStore = useI18nStore();
const t = computed(() => i18nStore.t);

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
