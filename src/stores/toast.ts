import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { ToastMessage } from '@/types';

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<ToastMessage[]>([]);

  function show(toast: Omit<ToastMessage, 'id'>) {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = {
      id,
      duration: 4000,
      ...toast,
    };
    toasts.value.push(newToast);

    setTimeout(() => {
      remove(id);
    }, newToast.duration);
  }

  function success(title: string, description?: string) {
    show({ title, description, type: 'success' });
  }

  function error(title: string, description?: string) {
    show({ title, description, type: 'error' });
  }

  function info(title: string, description?: string) {
    show({ title, description, type: 'info' });
  }

  function remove(id: string) {
    toasts.value = toasts.value.filter((t) => t.id !== id);
  }

  return {
    toasts,
    show,
    success,
    error,
    info,
    remove,
  };
});
