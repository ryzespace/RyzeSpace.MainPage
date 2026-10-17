import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
  CpuModel,
  ProviderPricing,
  MarketplaceNode,
  Currency,
  WorkloadPreset,
} from '@/types';

export const CPU_MODELS: CpuModel[] = [
  {
    id: 'epyc-9654',
    name: 'AMD EPYC 9654 (Genoa)',
    vendor: 'AMD',
    cores: 96,
    frequency: '3.70 GHz Turbo',
    tdp: '360W',
    pricePerCore: 4.85,
    category: 'compute',
  },
  {
    id: 'epyc-9754',
    name: 'AMD EPYC 9754 (Bergamo)',
    vendor: 'AMD',
    cores: 128,
    frequency: '3.10 GHz Turbo',
    tdp: '360W',
    pricePerCore: 5.12,
    category: 'compute',
  },
  {
    id: 'ryzen-9950x',
    name: 'AMD Ryzen 9 9950X (Zen 5)',
    vendor: 'AMD',
    cores: 16,
    frequency: '5.70 GHz Boost',
    tdp: '170W',
    pricePerCore: 3.95,
    category: 'balanced',
  },
  {
    id: 'ryzen-7950x',
    name: 'AMD Ryzen 9 7950X (Zen 4)',
    vendor: 'AMD',
    cores: 16,
    frequency: '5.70 GHz Boost',
    tdp: '170W',
    pricePerCore: 3.75,
    category: 'balanced',
  },
  {
    id: 'xeon-8480',
    name: 'Intel Xeon Platinum 8480+',
    vendor: 'Intel',
    cores: 56,
    frequency: '3.80 GHz Turbo',
    tdp: '350W',
    pricePerCore: 5.60,
    category: 'compute',
  },
  {
    id: 'xeon-6780',
    name: 'Intel Xeon 6780E (Sierra Forest)',
    vendor: 'Intel',
    cores: 144,
    frequency: '3.00 GHz Turbo',
    tdp: '330W',
    pricePerCore: 4.65,
    category: 'compute',
  },
  {
    id: 'i9-14900k',
    name: 'Intel Core i9-14900K',
    vendor: 'Intel',
    cores: 24,
    frequency: '6.00 GHz Boost',
    tdp: '253W',
    pricePerCore: 4.20,
    category: 'balanced',
  },
  {
    id: 'epyc-9534',
    name: 'AMD EPYC 9534 (High Memory)',
    vendor: 'AMD',
    cores: 64,
    frequency: '3.70 GHz Turbo',
    tdp: '280W',
    pricePerCore: 4.70,
    category: 'memory',
  },
  {
    id: 'm3-max',
    name: 'Apple Silicon M3 Max',
    vendor: 'Apple',
    cores: 16,
    frequency: '4.05 GHz Boost',
    tdp: '36W',
    pricePerCore: 4.50,
    category: 'balanced',
  },
];

export const PROVIDERS_BENCHMARK: ProviderPricing[] = [
  {
    provider: 'RyzeSpace Network',
    cpuPerCore: 3.85,
    ramPerGB: 0.35,
    storagePerGB: 0.04,
    bandwidthPerTB: 1.20,
    region: 'Global Mesh (335+ Cities)',
    currency: 'USD',
    plans: 1240,
    latencyMs: 12,
  },
  {
    provider: 'Hetzner Cloud',
    cpuPerCore: 4.49,
    ramPerGB: 0.45,
    storagePerGB: 0.052,
    bandwidthPerTB: 1.19,
    region: 'EU (Falkenstein/Nuremberg)',
    currency: 'USD',
    plans: 24,
    latencyMs: 18,
  },
  {
    provider: 'DigitalOcean',
    cpuPerCore: 6.00,
    ramPerGB: 0.75,
    storagePerGB: 0.10,
    bandwidthPerTB: 10.00,
    region: 'US/EU (FRA1, NYC3)',
    currency: 'USD',
    plans: 48,
    latencyMs: 28,
  },
  {
    provider: 'OVHcloud',
    cpuPerCore: 5.20,
    ramPerGB: 0.55,
    storagePerGB: 0.065,
    bandwidthPerTB: 2.50,
    region: 'EU/CA (Gravelines, Beauharnois)',
    currency: 'USD',
    plans: 64,
    latencyMs: 22,
  },
  {
    provider: 'AWS (EC2 c7g/m7i)',
    cpuPerCore: 8.50,
    ramPerGB: 0.90,
    storagePerGB: 0.08,
    bandwidthPerTB: 14.00,
    region: 'Global (us-east-1, eu-central-1)',
    currency: 'USD',
    plans: 380,
    latencyMs: 32,
  },
  {
    provider: 'Google Cloud (N2/C3)',
    cpuPerCore: 7.80,
    ramPerGB: 0.85,
    storagePerGB: 0.085,
    bandwidthPerTB: 12.00,
    region: 'Global (us-central1, europe-west3)',
    currency: 'USD',
    plans: 210,
    latencyMs: 30,
  },
];

export const WORKLOAD_PRESETS: WorkloadPreset[] = [
  {
    id: 'web',
    name: 'Web & API Microservices',
    description: 'High concurrency, lightweight static delivery & fast edge response.',
    specs: { cpu: 4, ram: 8, storage: 120, bandwidth: 10 },
    recommendedCpu: 'ryzen-7950x',
    iconName: 'Globe',
  },
  {
    id: 'database',
    name: 'High-IOPS Database',
    description: 'Sub-millisecond disk access, dedicated RAM buffer pools & replication.',
    specs: { cpu: 8, ram: 64, storage: 500, bandwidth: 5 },
    recommendedCpu: 'epyc-9534',
    iconName: 'Database',
  },
  {
    id: 'ai-ml',
    name: 'AI/ML & LLM Inference',
    description: 'Parallel vector compute, dense memory bandwidth & heavy tensor throughput.',
    specs: { cpu: 32, ram: 128, storage: 1000, bandwidth: 25 },
    recommendedCpu: 'epyc-9654',
    iconName: 'Cpu',
  },
  {
    id: 'gaming',
    name: 'Low-Latency Game Server',
    description: 'Maximum single-core turbo clocks, jitter-free network routing.',
    specs: { cpu: 8, ram: 32, storage: 250, bandwidth: 15 },
    recommendedCpu: 'i9-14900k',
    iconName: 'Gamepad2',
  },
  {
    id: 'enterprise',
    name: 'Enterprise Cloud App',
    description: 'Mission-critical redundancy, isolated vLAN & automated backup snapshots.',
    specs: { cpu: 16, ram: 48, storage: 500, bandwidth: 12 },
    recommendedCpu: 'xeon-8480',
    iconName: 'Server',
  },
];

export const INITIAL_MARKET_NODES: MarketplaceNode[] = [
  {
    id: 'node-fra-01',
    name: 'FRA-Edge-9654-Extreme',
    provider: 'Equinix FR2 Data Center',
    providerVerified: true,
    location: 'Frankfurt, Germany',
    countryCode: 'DE',
    flag: 'DE',
    cpuModel: 'AMD EPYC 9654 (96 Cores)',
    cores: 32,
    ramGB: 128,
    storageGB: 1000,
    storageType: 'NVMe Gen5',
    bandwidthTB: 30,
    networkSpeedGbps: 10,
    pricePerHour: 0.32,
    pricePerMonth: 228.0,
    category: 'compute',
    uptime: 99.998,
    pingMs: 11,
    available: true,
    rating: 4.96,
    reviewsCount: 142,
    escrowProtected: true,
  },
  {
    id: 'node-waw-02',
    name: 'WAW-Direct-9950X-Pro',
    provider: 'Atman DC-1 Warsaw',
    providerVerified: true,
    location: 'Warsaw, Poland',
    countryCode: 'PL',
    flag: 'PL',
    cpuModel: 'AMD Ryzen 9 9950X (16 Cores 5.7GHz)',
    cores: 16,
    ramGB: 64,
    storageGB: 500,
    storageType: 'NVMe Gen5',
    bandwidthTB: 20,
    networkSpeedGbps: 10,
    pricePerHour: 0.18,
    pricePerMonth: 128.0,
    category: 'balanced',
    uptime: 99.995,
    pingMs: 8,
    available: true,
    rating: 4.98,
    reviewsCount: 89,
    escrowProtected: true,
  },
  {
    id: 'node-lon-03',
    name: 'LON-Xeon-Platinum-Cluster',
    provider: 'Telehouse Docklands London',
    providerVerified: true,
    location: 'London, United Kingdom',
    countryCode: 'GB',
    flag: 'GB',
    cpuModel: 'Intel Xeon Platinum 8480+ (56 Cores)',
    cores: 28,
    ramGB: 192,
    storageGB: 2000,
    storageType: 'NVMe Gen4',
    bandwidthTB: 40,
    networkSpeedGbps: 20,
    pricePerHour: 0.44,
    pricePerMonth: 312.0,
    category: 'memory',
    uptime: 99.999,
    pingMs: 14,
    available: true,
    rating: 4.93,
    reviewsCount: 205,
    escrowProtected: true,
  },
  {
    id: 'node-iad-04',
    name: 'IAD-Ashburn-Bergamo-128',
    provider: 'CoreSite VA2 Data Hub',
    providerVerified: true,
    location: 'Ashburn, VA, United States',
    countryCode: 'US',
    flag: 'US',
    cpuModel: 'AMD EPYC 9754 (128 Cores Cloud)',
    cores: 64,
    ramGB: 256,
    storageGB: 4000,
    storageType: 'NVMe Gen5',
    bandwidthTB: 100,
    networkSpeedGbps: 40,
    pricePerHour: 0.68,
    pricePerMonth: 485.0,
    category: 'compute',
    uptime: 99.999,
    pingMs: 18,
    available: true,
    rating: 4.99,
    reviewsCount: 310,
    escrowProtected: true,
  },
  {
    id: 'node-tyo-05',
    name: 'TYO-Shinjuku-Ryzen-Titan',
    provider: 'NTT Communications Tokyo',
    providerVerified: true,
    location: 'Tokyo, Japan',
    countryCode: 'JP',
    flag: 'JP',
    cpuModel: 'AMD Ryzen 9 9950X',
    cores: 16,
    ramGB: 128,
    storageGB: 2000,
    storageType: 'NVMe Gen5',
    bandwidthTB: 25,
    networkSpeedGbps: 10,
    pricePerHour: 0.28,
    pricePerMonth: 198.0,
    category: 'balanced',
    uptime: 99.994,
    pingMs: 24,
    available: true,
    rating: 4.94,
    reviewsCount: 95,
    escrowProtected: true,
  },
  {
    id: 'node-sin-06',
    name: 'SIN-Equinix-SG1-Cloud',
    provider: 'Equinix SG1 Singapore',
    providerVerified: true,
    location: 'Singapore',
    countryCode: 'SG',
    flag: 'SG',
    cpuModel: 'Intel Xeon 6780E',
    cores: 48,
    ramGB: 128,
    storageGB: 1500,
    storageType: 'Enterprise SSD',
    bandwidthTB: 35,
    networkSpeedGbps: 10,
    pricePerHour: 0.39,
    pricePerMonth: 275.0,
    category: 'compute',
    uptime: 99.997,
    pingMs: 26,
    available: true,
    rating: 4.91,
    reviewsCount: 67,
    escrowProtected: true,
  },
  {
    id: 'node-ams-07',
    name: 'AMS-Nikhef-Storage-Vault',
    provider: 'Iron Mountain AMS-1',
    providerVerified: true,
    location: 'Amsterdam, Netherlands',
    countryCode: 'NL',
    flag: 'NL',
    cpuModel: 'AMD Ryzen 9 7950X',
    cores: 16,
    ramGB: 64,
    storageGB: 8000,
    storageType: 'Enterprise SSD',
    bandwidthTB: 50,
    networkSpeedGbps: 10,
    pricePerHour: 0.29,
    pricePerMonth: 205.0,
    category: 'storage',
    uptime: 99.996,
    pingMs: 13,
    available: true,
    rating: 4.89,
    reviewsCount: 118,
    escrowProtected: true,
  },
  {
    id: 'node-sjc-08',
    name: 'SJC-Silicon-Valley-Turbo',
    provider: 'Vantage Data Centers SJC2',
    providerVerified: true,
    location: 'San Jose, CA, United States',
    countryCode: 'US',
    flag: 'US',
    cpuModel: 'Intel Core i9-14900K (6.0GHz)',
    cores: 24,
    ramGB: 96,
    storageGB: 1000,
    storageType: 'NVMe Gen5',
    bandwidthTB: 30,
    networkSpeedGbps: 10,
    pricePerHour: 0.26,
    pricePerMonth: 185.0,
    category: 'balanced',
    uptime: 99.998,
    pingMs: 15,
    available: true,
    rating: 4.97,
    reviewsCount: 173,
    escrowProtected: true,
  },
];

export const useMarketStore = defineStore('market', () => {
  const currency = ref<Currency>('USD');
  const currencyRates: Record<Currency, { symbol: string; rate: number }> = {
    USD: { symbol: '$', rate: 1.0 },
    EUR: { symbol: '€', rate: 0.92 },
    PLN: { symbol: 'zł', rate: 4.02 },
    GBP: { symbol: '£', rate: 0.78 },
  };

  const cpuModels = ref<CpuModel[]>(CPU_MODELS);
  const providers = ref<ProviderPricing[]>(PROVIDERS_BENCHMARK);
  const marketplaceNodes = ref<MarketplaceNode[]>(INITIAL_MARKET_NODES);

  const selectedCpuId = ref<string>('ryzen-9950x');
  const cpuCount = ref<number>(8);
  const ramCount = ref<number>(32);
  const storageCount = ref<number>(500);
  const bandwidthCount = ref<number>(10);
  const billingType = ref<'monthly' | 'hourly'>('monthly');
  const annualDiscount = ref<boolean>(true);
  const activePresetId = ref<string | null>(null);

  const marketAverages = computed(() => {
    const list = providers.value;
    const count = list.length;
    if (count === 0) {
      return {
        cpuPerCore: 4.8,
        ramPerGB: 0.55,
        storagePerGB: 0.06,
        bandwidthPerTB: 3.5,
      };
    }

    const cpu = list.reduce((acc, p) => acc + p.cpuPerCore, 0) / count;
    const ram = list.reduce((acc, p) => acc + p.ramPerGB, 0) / count;
    const storage = list.reduce((acc, p) => acc + p.storagePerGB, 0) / count;
    const bw = list.reduce((acc, p) => acc + p.bandwidthPerTB, 0) / count;

    return {
      cpuPerCore: Number(cpu.toFixed(2)),
      ramPerGB: Number(ram.toFixed(2)),
      storagePerGB: Number(storage.toFixed(3)),
      bandwidthPerTB: Number(bw.toFixed(2)),
    };
  });

  const selectedCpu = computed(() => {
    return (
      cpuModels.value.find((m) => m.id === selectedCpuId.value) ||
      cpuModels.value[0]
    );
  });

  const calculatedCostUSD = computed(() => {
    const cpuCost = cpuCount.value * selectedCpu.value.pricePerCore;
    const ramCost = ramCount.value * marketAverages.value.ramPerGB * 0.75;
    const storageCost =
      storageCount.value * marketAverages.value.storagePerGB * 0.7;
    const bwCost =
      bandwidthCount.value * marketAverages.value.bandwidthPerTB * 0.4;

    const baseMonthly = cpuCost + ramCost + storageCost + bwCost;
    const discountedMonthly = annualDiscount.value
      ? baseMonthly * 0.8
      : baseMonthly;
    const hourly = discountedMonthly / 730;

    return {
      cpu: cpuCost,
      ram: ramCost,
      storage: storageCost,
      bandwidth: bwCost,
      baseMonthly,
      monthly: discountedMonthly,
      hourly,
    };
  });

  const awsComparisonUSD = computed(() => {
    const aws = providers.value.find((p) => p.provider.includes('AWS')) || {
      cpuPerCore: 8.5,
      ramPerGB: 0.9,
      storagePerGB: 0.08,
      bandwidthPerTB: 14.0,
    };

    const cpu = cpuCount.value * aws.cpuPerCore;
    const ram = ramCount.value * aws.ramPerGB;
    const storage = storageCount.value * aws.storagePerGB;
    const bw = bandwidthCount.value * aws.bandwidthPerTB;
    const monthly = cpu + ram + storage + bw;

    return {
      monthly,
      savingsPct: Math.round(
        ((monthly - calculatedCostUSD.value.monthly) / monthly) * 100
      ),
      savingsUSD: monthly - calculatedCostUSD.value.monthly,
    };
  });

  function setCurrency(c: Currency) {
    if (currencyRates[c]) {
      currency.value = c;
    }
  }

  function formatPrice(amountUSD: number): string {
    const curr = currencyRates[currency.value] || currencyRates.USD;
    const converted = amountUSD * curr.rate;
    return `${curr.symbol}${converted.toFixed(2)}`;
  }

  function formatPriceInteger(amountUSD: number): string {
    const curr = currencyRates[currency.value] || currencyRates.USD;
    const converted = amountUSD * curr.rate;
    return `${curr.symbol}${Math.round(converted)}`;
  }

  function applyPreset(preset: WorkloadPreset) {
    activePresetId.value = preset.id;
    cpuCount.value = preset.specs.cpu;
    ramCount.value = preset.specs.ram;
    storageCount.value = preset.specs.storage;
    bandwidthCount.value = preset.specs.bandwidth;
    if (preset.recommendedCpu) {
      selectedCpuId.value = preset.recommendedCpu;
    }
  }

  return {
    currency,
    currencyRates,
    cpuModels,
    providers,
    marketplaceNodes,
    selectedCpuId,
    cpuCount,
    ramCount,
    storageCount,
    bandwidthCount,
    billingType,
    annualDiscount,
    activePresetId,
    marketAverages,
    selectedCpu,
    calculatedCostUSD,
    awsComparisonUSD,
    setCurrency,
    formatPrice,
    formatPriceInteger,
    applyPreset,
  };
});
