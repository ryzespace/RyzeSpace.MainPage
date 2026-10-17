<template>
  <span
    :class="[
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider transition-all',
      variantClasses[variant],
    ]"
  >
    <span
      v-if="dot"
      :class="[
        'w-1.5 h-1.5 rounded-full',
        dotClasses[variant],
        pulse ? 'animate-ping' : '',
      ]"
    ></span>
    <slot />
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    variant?: 'orange' | 'green' | 'blue' | 'neutral' | 'dark';
    dot?: boolean;
    pulse?: boolean;
  }>(),
  {
    variant: 'orange',
    dot: false,
    pulse: false,
  }
);

const variantClasses = {
  orange:
    'bg-orange-500/10 text-[#F38020] border border-orange-500/20 shadow-sm shadow-orange-500/5',
  green:
    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-500/5',
  blue:
    'bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/20 shadow-sm shadow-sky-500/5',
  neutral:
    'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border border-neutral-200 dark:border-neutral-700',
  dark:
    'bg-neutral-900 text-neutral-100 border border-neutral-800 shadow-sm',
};

const dotClasses = {
  orange: 'bg-[#F38020]',
  green: 'bg-emerald-500',
  blue: 'bg-sky-500',
  neutral: 'bg-neutral-400',
  dark: 'bg-orange-400',
};
</script>
