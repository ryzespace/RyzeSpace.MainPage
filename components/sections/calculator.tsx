'use client';

import { useState, useMemo } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMarketPricing, type CpuModel } from '@/hooks/use-market-pricing';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Brain,
    Cpu,
    Database,
    Gamepad2,
    Globe,
    HardDrive,
    Info,
    Loader2,
    MemoryStick,
    Network,
    RefreshCw,
    Server,
    TrendingUp,
    type LucideIcon,
} from 'lucide-react';

type WorkloadPreset = {
    id: string;
    name: string;
    icon: LucideIcon;
    description: string;
    specs: {
        cpu: number;
        ram: number;
        storage: number;
        bandwidth: number;
    };
    recommendedCpu: string;
};

const workloadPresets: WorkloadPreset[] = [
    {
        id: 'web',
        name: 'Web Server',
        icon: Globe,
        description: 'Optimized for HTTP traffic and static content',
        specs: { cpu: 4, ram: 8, storage: 100, bandwidth: 10 },
        recommendedCpu: 'ryzen-7950x',
    },
    {
        id: 'database',
        name: 'Database',
        icon: Database,
        description: 'High IOPS and memory for relational databases',
        specs: { cpu: 8, ram: 64, storage: 500, bandwidth: 5 },
        recommendedCpu: 'epyc-9534',
    },
    {
        id: 'ai-ml',
        name: 'AI/ML Training',
        icon: Brain,
        description: 'Compute-intensive for model training and inference',
        specs: { cpu: 32, ram: 128, storage: 1000, bandwidth: 20 },
        recommendedCpu: 'epyc-9654',
    },
    {
        id: 'gaming',
        name: 'Game Server',
        icon: Gamepad2,
        description: 'Low latency, high single-thread performance',
        specs: { cpu: 8, ram: 32, storage: 250, bandwidth: 15 },
        recommendedCpu: 'i9-14900k',
    },
    {
        id: 'enterprise',
        name: 'Enterprise App',
        icon: Server,
        description: 'Balanced resources for business applications',
        specs: { cpu: 16, ram: 48, storage: 500, bandwidth: 8 },
        recommendedCpu: 'xeon-8480',
    },
];

// Fallback values
const FALLBACK_PRICING = {
    cpuPerCore: 6.5,
    ramPerGB: 0.65,
    storagePerGB: 0.08,
    bandwidthPerTB: 8.0,
};

const FALLBACK_CPU_MODELS: CpuModel[] = [
    {
        id: 'ryzen-7950x',
        name: 'AMD Ryzen 9 7950X',
        vendor: 'AMD',
        cores: 16,
        frequency: '4.5 GHz',
        tdp: '170W',
        pricePerCore: 6.5,
        category: 'balanced',
    },
];

export function Calculator() {
    const { t } = useLanguage();
    const { data: market, loading, error, refresh } = useMarketPricing();

    const cpuModels = market?.cpuModels ?? FALLBACK_CPU_MODELS;
    const pricing = market?.averages ?? FALLBACK_PRICING;

    const [cpuModelId, setCpuModelId] = useState('ryzen-7950x');
    const [cpu, setCpu] = useState([8]);
    const [ram, setRam] = useState([32]);
    const [storage, setStorage] = useState([500]);
    const [bandwidth, setBandwidth] = useState([10]);
    const [activePreset, setActivePreset] = useState<string | null>(null);
    const [showComparison, setShowComparison] = useState(false);

    const selectedCpu =
        cpuModels.find((m) => m.id === cpuModelId) ?? cpuModels[0];

    const costs = useMemo(() => {
        const cpuCost = cpu[0] * selectedCpu.pricePerCore;
        const ramCost = ram[0] * pricing.ramPerGB;
        const storageCost = storage[0] * pricing.storagePerGB;
        const bandwidthCost = bandwidth[0] * pricing.bandwidthPerTB;
        const total = cpuCost + ramCost + storageCost + bandwidthCost;

        return { cpu: cpuCost, ram: ramCost, storage: storageCost, bandwidth: bandwidthCost, total };
    }, [cpu, ram, storage, bandwidth, selectedCpu, pricing]);

    const applyPreset = (preset: WorkloadPreset) => {
        setActivePreset(preset.id);
        setCpu([preset.specs.cpu]);
        setRam([preset.specs.ram]);
        setStorage([preset.specs.storage]);
        setBandwidth([preset.specs.bandwidth]);

        const exists = cpuModels.find((m) => m.id === preset.recommendedCpu);
        if (exists) setCpuModelId(preset.recommendedCpu);
    };

    const comparisonConfigs = useMemo(() => {
        if (!showComparison) return [];

        return cpuModels
            .filter((m) => m.category === selectedCpu.category)
            .slice(0, 3)
            .map((model) => {
                const cpuCost = cpu[0] * model.pricePerCore;
                const total = cpuCost + costs.ram + costs.storage + costs.bandwidth;

                return { model, cpuCost, total };
            });
    }, [showComparison, selectedCpu, cpu, costs, cpuModels]);

    const timeSinceUpdate = useMemo(() => {
        if (!market?.metadata.lastUpdated) return null;

        const diff = Date.now() - new Date(market.metadata.lastUpdated).getTime();
        const mins = Math.floor(diff / 60_000);

        if (mins < 1) return 'Just now';
        if (mins < 60) return `${mins}m ago`;

        return `${Math.floor(mins / 60)}h ago`;
    }, [market]);

    return (
        <section
            id="calculator"
            className="relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-16 max-w-3xl">
                    <div className="mb-4 h-px w-16 bg-primary/40" />
                    <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                        {t.calculator.title}
                    </h2>
                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        {t.calculator.subtitle}
                    </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
                    <Card className="relative overflow-hidden rounded-3xl border border-border/70 bg-background p-6 shadow-[0_12px_32px_-24px_hsl(var(--foreground)/0.18)] sm:p-8">
                        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

                        {loading ? (
                            <div className="flex min-h-[400px] items-center justify-center">
                                <div className="flex flex-col items-center gap-4">
                                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                                    <p className="text-sm text-muted-foreground">
                                        Loading market data...
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-8">
                                {/* Market Data Status */}
                                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-border/70 bg-muted/[0.12] p-4">
                                    <div className="flex items-center gap-3">
                    <span className="flex h-2 w-2">
                      <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                    </span>
                                        <div>
                                            <p className="text-xs font-medium text-foreground">
                                                Live market data
                                            </p>
                                            <p className="text-[11px] text-muted-foreground">
                                                {market?.metadata.sources.length ?? 0} providers ·
                                                Updated {timeSinceUpdate ?? '—'}
                                            </p>
                                        </div>
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={refresh}
                                        className="h-8 rounded-lg text-xs"
                                    >
                                        <RefreshCw className="mr-1.5 h-3 w-3" />
                                        Refresh
                                    </Button>
                                </div>

                                {/* Workload Presets */}
                                <div className="space-y-4">
                                    <label className="text-sm font-medium text-foreground">
                                        Workload Type
                                    </label>
                                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                                        {workloadPresets.map((preset) => {
                                            const Icon = preset.icon;
                                            const isActive = activePreset === preset.id;

                                            return (
                                                <button
                                                    key={preset.id}
                                                    onClick={() => applyPreset(preset)}
                                                    className={`group relative flex flex-col items-center gap-2 rounded-2xl border p-4 text-center transition-all ${
                                                        isActive
                                                            ? 'border-primary bg-primary/5 shadow-sm'
                                                            : 'border-border/70 bg-muted/20 hover:border-border hover:bg-muted/30'
                                                    }`}
                                                >
                                                    <Icon
                                                        className={`h-5 w-5 transition-colors ${
                                                            isActive
                                                                ? 'text-primary'
                                                                : 'text-muted-foreground group-hover:text-foreground'
                                                        }`}
                                                    />
                                                    <span
                                                        className={`text-xs font-medium ${
                                                            isActive ? 'text-primary' : 'text-foreground'
                                                        }`}
                                                    >
                            {preset.name}
                          </span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* CPU Model */}
                                <div className="space-y-3">
                                    <div className="flex items-center justify-between">
                                        <label className="text-sm font-medium text-foreground">
                                            Processor
                                        </label>
                                        <span className="text-xs text-muted-foreground">
                      {selectedCpu.vendor} · {selectedCpu.frequency} ·{' '}
                                            {selectedCpu.tdp}
                    </span>
                                    </div>
                                    <Select value={cpuModelId} onValueChange={setCpuModelId}>
                                        <SelectTrigger className="h-12 rounded-xl border-border/70 bg-background">
                                            <SelectValue placeholder="Select processor" />
                                        </SelectTrigger>
                                        <SelectContent className="rounded-xl border-border/70">
                                            {cpuModels.map((model) => (
                                                <SelectItem
                                                    key={model.id}
                                                    value={model.id}
                                                    className="cursor-pointer rounded-lg"
                                                >
                                                    <div className="flex items-center justify-between gap-4">
                                                        <span className="font-medium">{model.name}</span>
                                                        <span className="text-xs text-muted-foreground">
                              ${model.pricePerCore}/core
                            </span>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Sliders */}
                                <div className="space-y-6">
                                    <SliderControl
                                        icon={Cpu}
                                        label="CPU Cores"
                                        value={cpu[0]}
                                        onChange={setCpu}
                                        min={2}
                                        max={96}
                                        step={2}
                                        unit="cores"
                                    />
                                    <SliderControl
                                        icon={MemoryStick}
                                        label="Memory"
                                        value={ram[0]}
                                        onChange={setRam}
                                        min={4}
                                        max={512}
                                        step={4}
                                        unit="GB"
                                    />
                                    <SliderControl
                                        icon={HardDrive}
                                        label="Storage"
                                        value={storage[0]}
                                        onChange={setStorage}
                                        min={50}
                                        max={8000}
                                        step={50}
                                        unit="GB NVMe"
                                    />
                                    <SliderControl
                                        icon={Network}
                                        label="Bandwidth"
                                        value={bandwidth[0]}
                                        onChange={setBandwidth}
                                        min={1}
                                        max={100}
                                        step={1}
                                        unit="TB"
                                    />
                                </div>

                                {/* Comparison */}
                                <div className="border-t border-border/60 pt-6">
                                    <button
                                        onClick={() => setShowComparison(!showComparison)}
                                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                    >
                                        <TrendingUp className="h-4 w-4" />
                                        {showComparison ? 'Hide' : 'Show'} CPU comparison
                                    </button>

                                    {showComparison && comparisonConfigs.length > 0 && (
                                        <div className="mt-4 grid gap-3 sm:grid-cols-3">
                                            {comparisonConfigs.map((config) => {
                                                const isSelected = config.model.id === selectedCpu.id;

                                                return (
                                                    <button
                                                        key={config.model.id}
                                                        onClick={() => setCpuModelId(config.model.id)}
                                                        className={`rounded-xl border p-4 text-left transition-all ${
                                                            isSelected
                                                                ? 'border-primary bg-primary/5'
                                                                : 'border-border/70 bg-muted/20 hover:border-border'
                                                        }`}
                                                    >
                                                        <p className="text-xs font-medium text-muted-foreground">
                                                            {config.model.name}
                                                        </p>
                                                        <p className="mt-1 text-2xl font-bold text-foreground">
                                                            ${config.total.toFixed(2)}
                                                        </p>
                                                        <p className="text-xs text-muted-foreground">
                                                            /month
                                                        </p>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    )}
                                </div>

                                {/* Provider Comparison */}
                                {market && (
                                    <div className="border-t border-border/60 pt-6">
                                        <p className="mb-4 text-sm font-medium text-foreground">
                                            Provider market rates
                                        </p>
                                        <div className="overflow-x-auto">
                                            <table className="w-full text-sm">
                                                <thead>
                                                <tr className="border-b border-border/60 text-left text-xs text-muted-foreground">
                                                    <th className="pb-3 pr-4 font-medium">Provider</th>
                                                    <th className="pb-3 pr-4 font-medium">CPU/core</th>
                                                    <th className="pb-3 pr-4 font-medium">RAM/GB</th>
                                                    <th className="pb-3 pr-4 font-medium">
                                                        Storage/GB
                                                    </th>
                                                    <th className="pb-3 font-medium">BW/TB</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {market.providers.map((p) => (
                                                    <tr
                                                        key={p.provider}
                                                        className="border-b border-border/40 last:border-0"
                                                    >
                                                        <td className="py-2.5 pr-4 font-medium text-foreground">
                                                            {p.provider}
                                                        </td>
                                                        <td className="py-2.5 pr-4 text-muted-foreground">
                                                            ${p.cpuPerCore.toFixed(2)}
                                                        </td>
                                                        <td className="py-2.5 pr-4 text-muted-foreground">
                                                            ${p.ramPerGB.toFixed(2)}
                                                        </td>
                                                        <td className="py-2.5 pr-4 text-muted-foreground">
                                                            ${p.storagePerGB.toFixed(3)}
                                                        </td>
                                                        <td className="py-2.5 text-muted-foreground">
                                                            ${p.bandwidthPerTB.toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </Card>

                    {/* Cost Summary Sidebar */}
                    <div className="space-y-4">
                        <Card className="sticky top-28 rounded-3xl border border-border/70 bg-background p-6 shadow-[0_12px_32px_-24px_hsl(var(--foreground)/0.18)]">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">
                                        Estimated monthly cost
                                    </p>
                                    <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-4xl font-bold tracking-tight text-foreground">
                      ${costs.total.toFixed(2)}
                    </span>
                                        <span className="text-sm text-muted-foreground">
                      /month
                    </span>
                                    </div>
                                </div>

                                <div className="space-y-3 border-t border-border/60 pt-6">
                                    <CostBreakdown icon={Cpu} label="Processor" value={costs.cpu} />
                                    <CostBreakdown icon={MemoryStick} label="Memory" value={costs.ram} />
                                    <CostBreakdown icon={HardDrive} label="Storage" value={costs.storage} />
                                    <CostBreakdown icon={Network} label="Bandwidth" value={costs.bandwidth} />
                                </div>

                                {market && (
                                    <div className="space-y-2 border-t border-border/60 pt-6">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>Market avg (CPU/core)</span>
                                            <span className="font-medium text-foreground">
                        ${market.averages.cpuPerCore.toFixed(2)}
                      </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>Market avg (RAM/GB)</span>
                                            <span className="font-medium text-foreground">
                        ${market.averages.ramPerGB.toFixed(2)}
                      </span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>Sources</span>
                                            <span className="font-medium text-foreground">
                        {market.metadata.sources.length} providers
                      </span>
                                        </div>
                                    </div>
                                )}

                                <div className="border-t border-border/60 pt-6">
                                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                                        <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                        <p>
                                            Prices aggregated from {market?.metadata.sources.length ?? 6}{' '}
                                            cloud providers. Updated every 30 minutes. Annual billing
                                            saves 20%.
                                        </p>
                                    </div>
                                </div>

                                <Button className="h-12 w-full rounded-xl" size="lg">
                                    Deploy this configuration
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}

type SliderControlProps = {
    icon: LucideIcon;
    label: string;
    value: number;
    onChange: (value: number[]) => void;
    min: number;
    max: number;
    step: number;
    unit: string;
};

function SliderControl({
                           icon: Icon,
                           label,
                           value,
                           onChange,
                           min,
                           max,
                           step,
                           unit,
                       }: SliderControlProps) {
    return (
        <div className="space-y-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <label className="text-sm font-medium text-foreground">{label}</label>
                </div>
                <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-foreground">{value}</span>
                    <span className="text-xs text-muted-foreground">{unit}</span>
                </div>
            </div>
            <Slider
                value={[value]}
                onValueChange={onChange}
                min={min}
                max={max}
                step={step}
                className="cursor-pointer"
            />
        </div>
    );
}

type CostBreakdownProps = {
    icon: LucideIcon;
    label: string;
    value: number;
};

function CostBreakdown({ icon: Icon, label, value }: CostBreakdownProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
                <Icon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{label}</span>
            </div>
            <span className="text-sm font-medium text-foreground">
        ${value.toFixed(2)}
      </span>
        </div>
    );
}