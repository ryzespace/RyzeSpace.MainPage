import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { MarketplaceNode } from '@/types';

export interface DeploymentConfig {
  source: 'calculator' | 'marketplace';
  nodeName: string;
  location: string;
  cpuModel: string;
  cores: number;
  ramGB: number;
  storageGB: number;
  bandwidthTB: number;
  priceMonthlyUSD: number;
  priceHourlyUSD: number;
  isEscrowProtected: boolean;
}

export const useCartStore = defineStore('cart', () => {
  const isDeployModalOpen = ref<boolean>(false);
  const activeDeployment = ref<DeploymentConfig | null>(null);
  const isDeploying = ref<boolean>(false);
  const deploymentSuccess = ref<boolean>(false);

  function openDeployFromCalculator(config: DeploymentConfig) {
    activeDeployment.value = config;
    deploymentSuccess.value = false;
    isDeployModalOpen.value = true;
  }

  function openDeployFromNode(node: MarketplaceNode) {
    activeDeployment.value = {
      source: 'marketplace',
      nodeName: node.name,
      location: node.location,
      cpuModel: node.cpuModel,
      cores: node.cores,
      ramGB: node.ramGB,
      storageGB: node.storageGB,
      bandwidthTB: node.bandwidthTB,
      priceMonthlyUSD: node.pricePerMonth,
      priceHourlyUSD: node.pricePerHour,
      isEscrowProtected: node.escrowProtected,
    };
    deploymentSuccess.value = false;
    isDeployModalOpen.value = true;
  }

  function openDeployModal(node: MarketplaceNode) {
    openDeployFromNode(node);
  }

  function closeDeploy() {
    isDeployModalOpen.value = false;
    activeDeployment.value = null;
    isDeploying.value = false;
    deploymentSuccess.value = false;
  }

  return {
    isDeployModalOpen,
    activeDeployment,
    selectedNodeConfig: activeDeployment,
    isDeploying,
    deploymentSuccess,
    openDeployFromCalculator,
    openDeployFromNode,
    openDeployModal,
    closeDeploy,
  };
});
