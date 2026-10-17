<template>
  <div class="min-h-screen flex flex-col bg-white dark:bg-[#0B0E14] text-neutral-900 dark:text-neutral-100 selection:bg-[#F38020] selection:text-white">
    <Navbar />

    <main class="flex-1">
      <HeroSection />
      <RegionEarthSection />
      <MarketplaceSection ref="marketplaceRef" />
      <ArchitectureRolesSection />
      <GlobalNetworkSection />
      <ContactSection />
    </main>

    <Footer @open-legal="handleOpenLegal" />

    <AuthModal />
    <DeployModal />
    <LegalModal
      :is-open="isLegalModalOpen"
      :type="legalModalType"
      @close="isLegalModalOpen = false"
    />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useThemeStore } from '@/stores/theme';
import Navbar from '@/components/layout/Navbar.vue';
import Footer from '@/components/layout/Footer.vue';
import HeroSection from '@/components/sections/HeroSection.vue';
import RegionEarthSection from '@/components/sections/RegionEarthSection.vue';
import MarketplaceSection from '@/components/sections/MarketplaceSection.vue';
import ArchitectureRolesSection from '@/components/sections/ArchitectureRolesSection.vue';
import GlobalNetworkSection from '@/components/sections/GlobalNetworkSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import AuthModal from '@/components/modals/AuthModal.vue';
import DeployModal from '@/components/modals/DeployModal.vue';
import LegalModal from '@/components/modals/LegalModal.vue';
import ToastContainer from '@/components/common/ToastContainer.vue';

const themeStore = useThemeStore();

const isLegalModalOpen = ref(false);
const legalModalType = ref<'privacy' | 'terms'>('privacy');
const marketplaceRef = ref<any>(null);

function handleOpenLegal(type: 'privacy' | 'terms') {
  legalModalType.value = type;
  isLegalModalOpen.value = true;
}

onMounted(() => {
  themeStore.init();
});
</script>
