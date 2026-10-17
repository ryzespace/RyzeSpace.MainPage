export type Language = 'en' | 'pl' | 'de' | 'ru';

export type Currency = 'USD' | 'EUR' | 'PLN' | 'GBP';

export type UserRole = 'buyer' | 'seller' | 'moderator';

export type WorkloadCategory = 'web' | 'database' | 'ai-ml' | 'gaming' | 'enterprise';

export interface CpuModel {
  id: string;
  name: string;
  vendor: 'AMD' | 'Intel' | 'Apple';
  cores: number;
  frequency: string;
  tdp: string;
  pricePerCore: number;
  category: 'compute' | 'balanced' | 'memory';
}

export interface ProviderPricing {
  provider: string;
  cpuPerCore: number;
  ramPerGB: number;
  storagePerGB: number;
  bandwidthPerTB: number;
  region: string;
  currency: string;
  plans: number;
  latencyMs: number;
}

export interface MarketPricingData {
  providers: ProviderPricing[];
  averages: {
    cpuPerCore: number;
    ramPerGB: number;
    storagePerGB: number;
    bandwidthPerTB: number;
  };
  cpuModels: CpuModel[];
  metadata: {
    lastUpdated: string;
    sourcesCount: number;
    currency: string;
    totalActiveNodes: number;
  };
}

export interface MarketplaceNode {
  id: string;
  name: string;
  provider: string;
  providerVerified: boolean;
  location: string;
  countryCode: string;
  flag: string;
  cpuModel: string;
  cores: number;
  ramGB: number;
  storageGB: number;
  storageType: 'NVMe Gen4' | 'NVMe Gen5' | 'Enterprise SSD';
  bandwidthTB: number;
  networkSpeedGbps: number;
  pricePerHour: number;
  pricePerMonth: number;
  category: 'compute' | 'memory' | 'gpu' | 'storage' | 'balanced';
  uptime: number;
  pingMs: number;
  available: boolean;
  rating: number;
  reviewsCount: number;
  escrowProtected: boolean;
}

export interface WorkloadPreset {
  id: WorkloadCategory;
  name: string;
  description: string;
  specs: {
    cpu: number;
    ram: number;
    storage: number;
    bandwidth: number;
  };
  recommendedCpu: string;
  iconName: string;
}

export interface ContactFormData {
  name: string;
  surname: string;
  email: string;
  topic: string;
  message: string;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}
