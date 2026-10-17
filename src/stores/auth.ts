import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { UserRole } from '@/types';

export interface UserSession {
  email: string;
  name: string;
  role: UserRole;
  avatarUrl: string;
  balanceUSD: number;
}

export const useAuthStore = defineStore('auth', () => {
  const isAuthModalOpen = ref<boolean>(false);
  const authMode = ref<'login' | 'register'>('login');
  const selectedRole = ref<UserRole>('buyer');
  const isAuthenticated = ref<boolean>(false);

  const currentUser = ref<UserSession | null>({
    email: 'developer@ryzespace.io',
    name: 'Alex Rivera',
    role: 'buyer',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face',
    balanceUSD: 1450.0,
  });

  const userEmail = computed({
    get: () => currentUser.value?.email || '',
    set: (val: string) => {
      if (currentUser.value) {
        currentUser.value.email = val;
      }
    },
  });

  function openAuth(mode: 'login' | 'register' = 'login') {
    authMode.value = mode;
    isAuthModalOpen.value = true;
  }

  function closeAuth() {
    isAuthModalOpen.value = false;
  }

  function login(email: string) {
    isAuthenticated.value = true;
    currentUser.value = {
      email,
      name: email.split('@')[0],
      role: selectedRole.value,
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=128&h=128&fit=crop&crop=face',
      balanceUSD: 2500.0,
    };
    closeAuth();
  }

  function logout() {
    isAuthenticated.value = false;
    currentUser.value = null;
  }

  function setRole(role: UserRole) {
    selectedRole.value = role;
    if (currentUser.value) {
      currentUser.value.role = role;
    }
  }

  return {
    isAuthModalOpen,
    authMode,
    selectedRole,
    isAuthenticated,
    currentUser,
    userEmail,
    openAuth,
    closeAuth,
    login,
    logout,
    setRole,
  };
});
