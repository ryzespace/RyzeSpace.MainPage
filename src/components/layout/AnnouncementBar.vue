<template>
  <aside
    aria-label="Platform announcement"
    class="bg-neutral-900 text-neutral-300 text-xs py-2 px-4 border-b border-neutral-800 transition-colors"
  >
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      <div class="flex items-center gap-2 mx-auto sm:mx-0 text-center sm:text-left overflow-hidden">
        <span class="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase bg-orange-500/10 text-[#F38020] border border-orange-500/20 tracking-wider shrink-0">
          {{ t.announcement.tag }}
        </span>
        <p class="truncate text-xs text-neutral-300 font-normal">
          {{ t.announcement.text }}
        </p>
        <button
          type="button"
          @click="scrollToSection('marketplace')"
          class="hidden md:inline-flex items-center gap-1 text-[#F38020] hover:text-orange-400 font-semibold text-xs hover:underline shrink-0"
        >
          <span>{{ t.announcement.cta }}</span>
          <ArrowRight class="w-3.5 h-3.5" />
        </button>
      </div>

      <div class="hidden lg:flex items-center gap-2 shrink-0 text-neutral-400 text-xs">
        <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
        <span class="text-[11px] font-medium">{{ t.nav.systemStatus }}</span>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { ArrowRight } from 'lucide-vue-next';

const i18nStore = useI18nStore();
const t = computed(() => i18nStore.t);

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
}
</script>
