<template>
  <div v-if="authStore.isAuthModalOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <div
      class="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
      @click="authStore.closeAuth()"
    ></div>

    <div
      class="relative w-full max-w-sm bg-white dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 rounded-xl p-6 shadow-2xl z-10 overflow-hidden"
    >
      <div class="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800">
        <span class="text-xs font-mono font-bold uppercase tracking-wider text-[#F38020]">
          Identity Auth
        </span>
        <button
          type="button"
          @click="authStore.closeAuth()"
          class="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800"
          aria-label="Close Auth Modal"
        >
          <X class="w-4 h-4" />
        </button>
      </div>

      <div class="flex items-center gap-1 p-1 rounded-lg bg-neutral-100 dark:bg-[#0B0F17] my-4">
        <button
          type="button"
          @click="authStore.authMode = 'login'"
          class="flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors text-center"
          :class="authStore.authMode === 'login' ? 'bg-white dark:bg-[#131824] text-[#F38020] shadow-sm' : 'text-neutral-600 dark:text-neutral-400'"
        >
          {{ t.auth.login }}
        </button>
        <button
          type="button"
          @click="authStore.authMode = 'register'"
          class="flex-1 py-1.5 text-xs font-semibold rounded-md transition-colors text-center"
          :class="authStore.authMode === 'register' ? 'bg-white dark:bg-[#131824] text-[#F38020] shadow-sm' : 'text-neutral-600 dark:text-neutral-400'"
        >
          {{ t.auth.register }}
        </button>
      </div>

      <div v-if="authStore.authMode === 'register'" class="mb-3">
        <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
          {{ t.auth.roleSelect }}
        </label>
        <select
          v-model="authStore.selectedRole"
          class="w-full px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#F38020]"
        >
          <option value="buyer">{{ t.auth.roleBuyer }}</option>
          <option value="seller">{{ t.auth.roleSeller }}</option>
          <option value="moderator">{{ t.auth.roleMod }}</option>
        </select>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-3">
        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
            {{ t.auth.email }}
          </label>
          <input
            v-model="email"
            type="email"
            required
            placeholder="developer@company.com"
            class="w-full px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#F38020]"
          />
        </div>

        <div>
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
            {{ t.auth.password }}
          </label>
          <input
            v-model="password"
            type="password"
            required
            placeholder="••••••••••••"
            class="w-full px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#F38020]"
          />
        </div>

        <div v-if="authStore.authMode === 'register'">
          <label class="block text-xs font-semibold text-neutral-700 dark:text-neutral-300 mb-1">
            {{ t.auth.confirmPassword }}
          </label>
          <input
            v-model="confirmPassword"
            type="password"
            required
            placeholder="••••••••••••"
            class="w-full px-3 py-1.5 rounded-md bg-neutral-50 dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-700 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-[#F38020]"
          />
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full mt-2 py-2 px-4 rounded-md text-xs font-semibold text-white bg-[#F38020] hover:bg-[#E56F10] disabled:opacity-50 transition-colors"
        >
          <span v-if="isSubmitting">Processing...</span>
          <span v-else>{{ authStore.authMode === 'login' ? t.auth.signInCta : t.auth.signUpCta }}</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useI18nStore } from '@/stores/i18n';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import { X } from 'lucide-vue-next';

const i18nStore = useI18nStore();
const authStore = useAuthStore();
const toastStore = useToastStore();
const t = computed(() => i18nStore.t);

const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const isSubmitting = ref(false);

function handleSubmit() {
  if (authStore.authMode === 'register' && password.value !== confirmPassword.value) {
    toastStore.error('Passwords do not match');
    return;
  }

  isSubmitting.value = true;
  setTimeout(() => {
    isSubmitting.value = false;
    authStore.isAuthenticated = true;
    authStore.userEmail = email.value;
    authStore.closeAuth();
    toastStore.success(`Welcome back, ${email.value}`);
  }, 400);
}
</script>
