<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      @click="$emit('close')"
    ></div>

    <div
      class="relative w-full max-w-xl bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xl z-10 max-h-[80vh] flex flex-col justify-between overflow-hidden"
    >
      <div class="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <h3 class="text-sm font-bold text-neutral-900 dark:text-white">
          {{ legalTitle }}
        </h3>
        <button
          type="button"
          @click="$emit('close')"
          class="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Close Legal Modal"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="my-4 overflow-y-auto pr-2 space-y-3 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed font-sans whitespace-pre-line">
        {{ legalContent }}
      </div>

      <div class="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-1.5 rounded-md text-xs font-semibold text-white bg-[#F38020] hover:bg-[#E56F10] transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { X } from 'lucide-vue-next';

const props = defineProps<{
  isOpen: boolean;
  type: 'privacy' | 'terms';
}>();

defineEmits<{
  (e: 'close'): void;
}>();

const i18nStore = useI18nStore();
const t = computed(() => i18nStore.t);

const legalTitle = computed(() => {
  if (props.type === 'privacy') {
    return t.value.footer.privacyPolicy.title;
  }
  return t.value.footer.termsOfService.title;
});

const legalContent = computed(() => {
  if (props.type === 'privacy') {
    return t.value.footer.privacyPolicy.content;
  }
  return t.value.footer.termsOfService.content;
});
</script>
