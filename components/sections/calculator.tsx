'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Calculator as CalcIcon } from 'lucide-react';

export function Calculator() {
  const { t } = useLanguage();
  const [cpu, setCpu] = useState([4]);
  const [ram, setRam] = useState([8]);
  const [storage, setStorage] = useState([100]);
  const [bandwidth, setBandwidth] = useState([1]);

  const calculateCost = () => {
    const cpuCost = cpu[0] * 10;
    const ramCost = ram[0] * 5;
    const storageCost = storage[0] * 0.1;
    const bandwidthCost = bandwidth[0] * 20;
    return (cpuCost + ramCost + storageCost + bandwidthCost).toFixed(2);
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
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-lg font-semibold">{t.calculator.cpu}</label>
                <span className="text-2xl font-bold text-primary">{cpu[0]}</span>
              </div>
              <Slider
                value={cpu}
                onValueChange={setCpu}
                min={1}
                max={32}
                step={1}
                className="cursor-pointer"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-lg font-semibold">{t.calculator.ram}</label>
                <span className="text-2xl font-bold text-primary">{ram[0]} GB</span>
              </div>
              <Slider
                value={ram}
                onValueChange={setRam}
                min={4}
                max={128}
                step={4}
                className="cursor-pointer"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-lg font-semibold">{t.calculator.storage}</label>
                <span className="text-2xl font-bold text-primary">{storage[0]} GB</span>
              </div>
              <Slider
                value={storage}
                onValueChange={setStorage}
                min={50}
                max={2000}
                step={50}
                className="cursor-pointer"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-lg font-semibold">{t.calculator.bandwidth}</label>
                <span className="text-2xl font-bold text-primary">{bandwidth[0]} TB</span>
              </div>
              <Slider
                value={bandwidth}
                onValueChange={setBandwidth}
                min={1}
                max={20}
                step={1}
                className="cursor-pointer"
              />
            </div>

            <div className="border-t pt-8 mt-8">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-sm text-muted-foreground mb-2">{t.calculator.estimated}</p>
                  <p className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent">
                    ${calculateCost()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1">per month</p>
                </div>
                <Button size="lg" className="text-lg px-8 h-12 group">
                  <CalcIcon className="mr-2 h-5 w-5" />
                  {t.calculator.calculate}
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>Prices are estimates and may vary based on region and usage patterns.</p>
        </div>
      </div>
    </section>
  );
}
