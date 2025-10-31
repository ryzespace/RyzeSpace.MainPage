'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator as CalcIcon } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function Calculator() {
    const { t } = useLanguage();

    // Lista nowoczesnych modeli CPU z cenami orientacyjnymi (za 1 rdzeń/mies.)
    const cpuModels = [
        { id: 'ryzen9', name: 'AMD Ryzen 9 7950X', pricePerCore: 6.5 },
        { id: 'xeon', name: 'Intel Xeon Platinum 8480+', pricePerCore: 8.0 },
        { id: 'epyc', name: 'AMD EPYC 9654', pricePerCore: 7.5 },
        { id: 'm3max', name: 'Apple M3 Max', pricePerCore: 7.0 },
    ];

    const [cpuModel, setCpuModel] = useState(cpuModels[0].id);
    const [cpu, setCpu] = useState([8]);
    const [ram, setRam] = useState([16]);
    const [storage, setStorage] = useState([250]);
    const [bandwidth, setBandwidth] = useState([2]);
    const [calculatedCost, setCalculatedCost] = useState<string | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);

    const selectedCpu = cpuModels.find((m) => m.id === cpuModel)!;

    const handleCalculate = () => {
        setIsCalculating(true);

        // Symulacja krótkiego opóźnienia obliczeń (dla UX)
        setTimeout(() => {
            const cpuCost = cpu[0] * selectedCpu.pricePerCore;
            const ramCost = ram[0] * 0.6; // 0.6 USD per GB
            const storageCost = storage[0] * 0.08; // NVMe SSD
            const bandwidthCost = bandwidth[0] * 15; // 15 USD per TB
            const total = (cpuCost + ramCost + storageCost + bandwidthCost).toFixed(2);
            setCalculatedCost(total);
            setIsCalculating(false);
        }, 500);
    };

    return (
        <section id="calculator" className="py-24 sm:py-32 bg-accent/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        {t.calculator.title}
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {t.calculator.subtitle}
                    </p>
                </div>

                <Card className="max-w-4xl mx-auto p-8 sm:p-12 border-2">
                    <div className="space-y-8">
                        {/* CPU Model */}
                        <div className="space-y-4">
                            <label className="text-lg font-semibold">{t.calculator.cpuModel ?? 'CPU Model'}</label>
                            <Select value={cpuModel} onValueChange={setCpuModel}>
                                <SelectTrigger className="w-full sm:w-2/3">
                                    <SelectValue placeholder="Select CPU" />
                                </SelectTrigger>
                                <SelectContent>
                                    {cpuModels.map((model) => (
                                        <SelectItem key={model.id} value={model.id}>
                                            {model.name} (${model.pricePerCore}/core)
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* CPU Cores */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-lg font-semibold">{t.calculator.cpu}</label>
                                <span className="text-2xl font-bold text-primary">{cpu[0]}</span>
                            </div>
                            <Slider value={cpu} onValueChange={setCpu} min={2} max={64} step={2} className="cursor-pointer" />
                        </div>

                        {/* RAM */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-lg font-semibold">{t.calculator.ram}</label>
                                <span className="text-2xl font-bold text-primary">{ram[0]} GB</span>
                            </div>
                            <Slider value={ram} onValueChange={setRam} min={4} max={256} step={4} className="cursor-pointer" />
                        </div>

                        {/* Storage */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-lg font-semibold">{t.calculator.storage}</label>
                                <span className="text-2xl font-bold text-primary">{storage[0]} GB</span>
                            </div>
                            <Slider value={storage} onValueChange={setStorage} min={50} max={4000} step={50} className="cursor-pointer" />
                        </div>

                        {/* Bandwidth */}
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-lg font-semibold">{t.calculator.bandwidth}</label>
                                <span className="text-2xl font-bold text-primary">{bandwidth[0]} TB</span>
                            </div>
                            <Slider value={bandwidth} onValueChange={setBandwidth} min={1} max={50} step={1} className="cursor-pointer" />
                        </div>

                        {/* Cost Summary */}
                        <div className="border-t pt-8 mt-8">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                                {calculatedCost ? (
                                    <div className="text-center sm:text-left">
                                        <p className="text-sm text-muted-foreground mb-2">{t.calculator.estimated}</p>
                                        <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                                            ${calculatedCost}
                                        </p>
                                        <p className="text-sm text-muted-foreground mt-1">per month</p>
                                    </div>
                                ) : (
                                    <div className="text-center sm:text-left">
                                        <p className="text-sm text-muted-foreground mb-2">Click calculate to estimate cost</p>
                                        <p className="text-4xl sm:text-5xl font-bold text-muted-foreground opacity-60">—</p>
                                    </div>
                                )}

                                <Button
                                    size="lg"
                                    className="text-lg px-8 h-12 group"
                                    onClick={handleCalculate}
                                    disabled={isCalculating}
                                >
                                    {isCalculating ? (
                                        <span className="animate-pulse">Calculating...</span>
                                    ) : (
                                        <>
                                            <CalcIcon className="mr-2 h-5 w-5" />
                                            {t.calculator.calculate}
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="mt-12 text-center text-sm text-muted-foreground">
                    <p>Prices are based on 2025 average market values for cloud infrastructure (VPS/VDS).</p>
                </div>
            </div>
        </section>
    );
}
