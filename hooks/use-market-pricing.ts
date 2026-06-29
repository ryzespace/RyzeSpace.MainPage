'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

export type CpuModel = {
    id: string;
    name: string;
    vendor: string;
    cores: number;
    frequency: string;
    tdp: string;
    pricePerCore: number;
    category: 'compute' | 'balanced' | 'memory';
};

export type ProviderPricing = {
    provider: string;
    cpuPerCore: number;
    ramPerGB: number;
    storagePerGB: number;
    bandwidthPerTB: number;
    region: string;
    fetchedAt: string;
};

export type MarketPricing = {
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
        nextUpdate: string;
        sources: string[];
        currency: string;
    };
};

const REFRESH_INTERVAL = 5 * 60 * 1000; // 5 min na froncie

export function useMarketPricing() {
    const [data, setData] = useState<MarketPricing | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const fetchPricing = useCallback(async (isInitial = false) => {
        if (isInitial) setLoading(true);

        try {
            const res = await fetch('/api/pricing', {
                next: { revalidate: 1800 },
            });

            if (!res.ok) throw new Error('Failed to fetch pricing');

            const json: MarketPricing = await res.json();
            setData(json);
            setError(null);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Unknown error');
        } finally {
            if (isInitial) setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchPricing(true);

        intervalRef.current = setInterval(() => {
            fetchPricing(false);
        }, REFRESH_INTERVAL);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [fetchPricing]);

    return {
        data,
        loading,
        error,
        refresh: () => fetchPricing(true),
    };
}