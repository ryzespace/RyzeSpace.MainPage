<template>
  <div class="flex items-center gap-2 select-none cursor-pointer" @click="$emit('click')">
    <svg class="w-7 h-7 text-[#F38020]" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
    </svg>
    <span class="text-lg font-bold tracking-tight text-neutral-900 dark:text-white">
      Ryze<span class="text-[#F38020]">Space</span>
    </span>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'click'): void;
}>();
</script>
