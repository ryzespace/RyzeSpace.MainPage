<template>
  <div class="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
    <transition-group
      enter-active-class="transform ease-out duration-200 transition"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="pointer-events-auto flex items-start gap-2.5 p-3 rounded-lg bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 shadow-lg text-xs"
      >
        <div class="flex-1 min-w-0">
          <div class="font-semibold text-neutral-900 dark:text-white">
            {{ toast.title }}
          </div>
          <div v-if="toast.description" class="mt-0.5 text-neutral-500">
            {{ toast.description }}
          </div>
        </div>
        <button
          type="button"
          @click="toastStore.remove(toast.id)"
          class="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          aria-label="Dismiss toast"
        >
          <X class="w-3.5 h-3.5" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { useToastStore } from '@/stores/toast';
import { X } from 'lucide-vue-next';

const toastStore = useToastStore();
</script>
