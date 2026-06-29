import { NextResponse } from 'next/server';

// ─── Types ───────────────────────────────────────────────

type ProviderPricing = {
    provider: string;
    cpuPerCore: number;
    ramPerGB: number;
    storagePerGB: number;
    bandwidthPerTB: number;
    region: string;
    currency: string;
    plans: number;
    fetchedAt: string;
};

type CpuModelDef = {
    id: string;
    name: string;
    vendor: string;
    cores: number;
    frequency: string;
    tdp: string;
    multiplier: number;
    category: 'compute' | 'balanced' | 'memory';
};

type MarketPricing = {
    providers: ProviderPricing[];
    averages: {
        cpuPerCore: number;
        ramPerGB: number;
        storagePerGB: number;
        bandwidthPerTB: number;
    };
    cpuModels: {
        id: string;
        name: string;
        vendor: string;
        cores: number;
        frequency: string;
        tdp: string;
        pricePerCore: number;
        category: 'compute' | 'balanced' | 'memory';
    }[];
    metadata: {
        lastUpdated: string;
        nextUpdate: string;
        sources: string[];
        failedSources: string[];
        totalPlans: number;
        currency: string;
    };
};

// ─── Cache ───────────────────────────────────────────────

let cachedData: MarketPricing | null = null;
let lastFetchedAt = 0;
const CACHE_TTL = 30 * 60 * 1000;
const FETCH_TIMEOUT = 10_000;

// ─── CPU Model Definitions ──────────────────────────────

const CPU_MODELS: CpuModelDef[] = [
    // Compute
    { id: 'epyc-9654', name: 'AMD EPYC 9654', vendor: 'AMD', cores: 96, frequency: '2.4 GHz', tdp: '290W', multiplier: 1.18, category: 'compute' },
    { id: 'epyc-9754', name: 'AMD EPYC 9754', vendor: 'AMD', cores: 128, frequency: '2.25 GHz', tdp: '360W', multiplier: 1.22, category: 'compute' },
    { id: 'xeon-8480', name: 'Intel Xeon Platinum 8480+', vendor: 'Intel', cores: 56, frequency: '2.0 GHz', tdp: '350W', multiplier: 1.28, category: 'compute' },
    { id: 'xeon-6780', name: 'Intel Xeon 6780E', vendor: 'Intel', cores: 144, frequency: '2.2 GHz', tdp: '330W', multiplier: 1.24, category: 'compute' },
    // Balanced
    { id: 'ryzen-7950x', name: 'AMD Ryzen 9 7950X', vendor: 'AMD', cores: 16, frequency: '4.5 GHz', tdp: '170W', multiplier: 1.02, category: 'balanced' },
    { id: 'ryzen-9950x', name: 'AMD Ryzen 9 9950X', vendor: 'AMD', cores: 16, frequency: '4.3 GHz', tdp: '170W', multiplier: 1.06, category: 'balanced' },
    { id: 'i9-14900k', name: 'Intel Core i9-14900K', vendor: 'Intel', cores: 24, frequency: '3.2 GHz', tdp: '125W', multiplier: 1.08, category: 'balanced' },
    { id: 'm3-max', name: 'Apple M3 Max', vendor: 'Apple', cores: 16, frequency: '3.4 GHz', tdp: '30W', multiplier: 1.1, category: 'balanced' },
    // Memory
    { id: 'epyc-9534', name: 'AMD EPYC 9534', vendor: 'AMD', cores: 64, frequency: '2.45 GHz', tdp: '280W', multiplier: 1.14, category: 'memory' },
    { id: 'xeon-8468', name: 'Intel Xeon Platinum 8468', vendor: 'Intel', cores: 48, frequency: '2.1 GHz', tdp: '330W', multiplier: 1.25, category: 'memory' },
    { id: 'xeon-8490h', name: 'Intel Xeon Platinum 8490H', vendor: 'Intel', cores: 60, frequency: '1.9 GHz', tdp: '350W', multiplier: 1.32, category: 'memory' },
];

// ─── Helpers ─────────────────────────────────────────────

async function fetchWithTimeout(
    url: string,
    options: RequestInit = {},
    timeout = FETCH_TIMEOUT
): Promise<Response> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        return response;
    } finally {
        clearTimeout(id);
    }
}

function safeAvg(values: number[]): number {
    const filtered = values.filter((v) => v > 0 && isFinite(v));
    if (filtered.length === 0) return 0;
    return filtered.reduce((a, b) => a + b, 0) / filtered.length;
}

// ─── Provider Fetchers ───────────────────────────────────

async function fetchHetzner(): Promise<ProviderPricing | null> {
    try {
        const token = process.env.HETZNER_API_TOKEN;
        if (!token) {
            console.warn('[PRICING] HETZNER_API_TOKEN not set');
            return null;
        }

        const res = await fetchWithTimeout(
            'https://api.hetzner.cloud/v1/pricing',
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (!res.ok) throw new Error(`Hetzner API ${res.status}`);

        const data = await res.json();
        const serverTypes = data.pricing?.server_types ?? [];

        const cpuPrices: number[] = [];
        const ramPrices: number[] = [];

        for (const st of serverTypes) {
            const monthly =
                st.prices?.[0]?.price_monthly?.gross ??
                st.prices?.[0]?.price_monthly?.net;

            if (!monthly) continue;

            const price = parseFloat(monthly);
            const cores = st.server_type?.cores ?? st.cores;
            const memory = st.server_type?.memory ?? st.memory;

            if (cores && price > 0) {
                cpuPrices.push(price / cores);
            }
            if (memory && price > 0) {
                ramPrices.push(price / memory);
            }
        }

        const volumePricing = data.pricing?.volume;
        const storagePrice = volumePricing?.price_per_gb_monthly?.gross
            ? parseFloat(volumePricing.price_per_gb_monthly.gross)
            : 0.052;

        const trafficPrice = data.pricing?.traffic?.price_per_tb?.gross
            ? parseFloat(data.pricing.traffic.price_per_tb.gross)
            : 1.19;

        return {
            provider: 'Hetzner Cloud',
            cpuPerCore: safeAvg(cpuPrices) || 4.49,
            ramPerGB: safeAvg(ramPrices) || 0.45,
            storagePerGB: storagePrice,
            bandwidthPerTB: trafficPrice,
            region: 'EU (Falkenstein)',
            currency: 'EUR',
            plans: serverTypes.length,
            fetchedAt: new Date().toISOString(),
        };
    } catch (error) {
        console.error('[PRICING] Hetzner fetch failed:', error);
        return null;
    }
}

async function fetchDigitalOcean(): Promise<ProviderPricing | null> {
    try {
        const token = process.env.DIGITALOCEAN_API_TOKEN;
        if (!token) {
            console.warn('[PRICING] DIGITALOCEAN_API_TOKEN not set');
            return null;
        }

        const res = await fetchWithTimeout(
            'https://api.digitalocean.com/v2/sizes',
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );

        if (!res.ok) throw new Error(`DigitalOcean API ${res.status}`);

        const data = await res.json();
        const sizes = data.sizes ?? [];

        const cpuPrices: number[] = [];
        const ramPrices: number[] = [];
        const storagePrices: number[] = [];

        for (const size of sizes) {
            if (!size.available) continue;

            const monthly = size.price_monthly;
            const vcpus = size.vcpus;
            const memory = size.memory / 1024; // MB → GB
            const disk = size.disk;

            if (monthly > 0 && vcpus > 0) {
                cpuPrices.push(monthly / vcpus);
            }
            if (monthly > 0 && memory > 0) {
                ramPrices.push(monthly / memory);
            }
            if (monthly > 0 && disk > 0) {
                storagePrices.push(monthly / disk);
            }
        }

        return {
            provider: 'DigitalOcean',
            cpuPerCore: safeAvg(cpuPrices) || 6.0,
            ramPerGB: safeAvg(ramPrices) || 0.75,
            storagePerGB: safeAvg(storagePrices) || 0.1,
            bandwidthPerTB: 10.0, // DO: $0.01/GB overage = ~$10/TB
            region: 'US (NYC)',
            currency: 'USD',
            plans: sizes.filter((s: any) => s.available).length,
            fetchedAt: new Date().toISOString(),
        };
    } catch (error) {
        console.error('[PRICING] DigitalOcean fetch failed:', error);
        return null;
    }
}

async function fetchVultr(): Promise<ProviderPricing | null> {
    try {
        const apiKey = process.env.VULTR_API_KEY;
        if (!apiKey) {
            console.warn('[PRICING] VULTR_API_KEY not set');
            return null;
        }

        const res = await fetchWithTimeout('https://api.vultr.com/v2/plans', {
            headers: { Authorization: `Bearer ${apiKey}` },
        });

        if (!res.ok) throw new Error(`Vultr API ${res.status}`);

        const data = await res.json();
        const plans = data.plans ?? [];

        const cpuPrices: number[] = [];
        const ramPrices: number[] = [];
        const storagePrices: number[] = [];

        for (const plan of plans) {
            const monthly = plan.monthly_cost;
            const vcpus = plan.vcpu_count;
            const ram = plan.ram / 1024; // MB → GB
            const disk = plan.disk;

            if (monthly > 0 && vcpus > 0) {
                cpuPrices.push(monthly / vcpus);
            }
            if (monthly > 0 && ram > 0) {
                ramPrices.push(monthly / ram);
            }
            if (monthly > 0 && disk > 0) {
                storagePrices.push(monthly / disk);
            }
        }

        return {
            provider: 'Vultr',
            cpuPerCore: safeAvg(cpuPrices) || 5.5,
            ramPerGB: safeAvg(ramPrices) || 0.65,
            storagePerGB: safeAvg(storagePrices) || 0.08,
            bandwidthPerTB: 8.0,
            region: 'US (Chicago)',
            currency: 'USD',
            plans: plans.length,
            fetchedAt: new Date().toISOString(),
        };
    } catch (error) {
        console.error('[PRICING] Vultr fetch failed:', error);
        return null;
    }
}

async function fetchOVH(): Promise<ProviderPricing | null> {
    try {
        // OVH public catalog — nie wymaga auth
        const res = await fetchWithTimeout(
            'https://api.ovh.com/1.0/cloud/price'
        );

        if (!res.ok) throw new Error(`OVH API ${res.status}`);

        const data = await res.json();
        const instances = data.instances ?? [];

        const cpuPrices: number[] = [];
        const ramPrices: number[] = [];

        for (const instance of instances) {
            const monthly = instance.monthlyPrice?.value;
            const vcpus = instance.vcpus;
            const ram = instance.ram; // GB

            if (monthly > 0 && vcpus > 0) {
                cpuPrices.push(monthly / vcpus);
            }
            if (monthly > 0 && ram > 0) {
                ramPrices.push(monthly / ram);
            }
        }

        const storagePricing = data.volumes ?? data.storage;
        const storagePerGB = storagePricing?.[0]?.monthlyPrice?.value
            ? storagePricing[0].monthlyPrice.value / (storagePricing[0].size ?? 1)
            : 0.06;

        return {
            provider: 'OVHcloud',
            cpuPerCore: safeAvg(cpuPrices) || 5.2,
            ramPerGB: safeAvg(ramPrices) || 0.55,
            storagePerGB,
            bandwidthPerTB: 2.0,
            region: 'EU (Gravelines)',
            currency: 'EUR',
            plans: instances.length,
            fetchedAt: new Date().toISOString(),
        };
    } catch (error) {
        console.error('[PRICING] OVH fetch failed:', error);
        return null;
    }
}

async function fetchAWS(): Promise<ProviderPricing | null> {
    try {
        // AWS publiczny pricing index — EC2 on-demand, us-east-1
        const res = await fetchWithTimeout(
            'https://pricing.us-east-1.amazonaws.com/offers/v1.0/aws/AmazonEC2/current/us-east-1/index.json',
            {},
            15_000 // AWS pricing JSON jest duży, dajemy więcej czasu
        );

        if (!res.ok) throw new Error(`AWS Pricing API ${res.status}`);

        const data = await res.json();
        const products = data.products ?? {};
        const terms = data.terms?.OnDemand ?? {};

        const cpuPrices: number[] = [];
        const ramPrices: number[] = [];
        let sampledCount = 0;

        // Próbkujemy max 500 produktów żeby nie zamulić
        const skus = Object.keys(products).slice(0, 2000);

        for (const sku of skus) {
            const product = products[sku];
            const attrs = product?.attributes;

            if (!attrs) continue;
            if (attrs.tenancy !== 'Shared') continue;
            if (attrs.operatingSystem !== 'Linux') continue;
            if (attrs.capacitystatus !== 'Used') continue;

            const vcpus = parseInt(attrs.vcpu, 10);
            const memory = parseFloat(attrs.memory?.replace(' GiB', '') ?? '0');

            if (!vcpus || !memory) continue;

            const termData = terms[sku];
            if (!termData) continue;

            const termKey = Object.keys(termData)[0];
            const priceDimensions = termData[termKey]?.priceDimensions;
            if (!priceDimensions) continue;

            const priceKey = Object.keys(priceDimensions)[0];
            const hourlyPrice = parseFloat(
                priceDimensions[priceKey]?.pricePerUnit?.USD ?? '0'
            );

            if (hourlyPrice <= 0) continue;

            const monthly = hourlyPrice * 730; // średnio godzin w miesiącu

            cpuPrices.push(monthly / vcpus);
            ramPrices.push(monthly / memory);
            sampledCount++;

            if (sampledCount >= 200) break;
        }

        return {
            provider: 'AWS (EC2)',
            cpuPerCore: safeAvg(cpuPrices) || 8.5,
            ramPerGB: safeAvg(ramPrices) || 0.9,
            storagePerGB: 0.08, // EBS gp3 baseline
            bandwidthPerTB: 14.0, // $0.09/GB after first 100GB
            region: 'US (us-east-1)',
            currency: 'USD',
            plans: sampledCount,
            fetchedAt: new Date().toISOString(),
        };
    } catch (error) {
        console.error('[PRICING] AWS fetch failed:', error);
        return null;
    }
}

async function fetchGCP(): Promise<ProviderPricing | null> {
    try {
        // GCP Cloud Billing Catalog — publiczny endpoint
        const res = await fetchWithTimeout(
            'https://cloudbilling.googleapis.com/v1/services/6F81-5844-456A/skus?key=' +
            (process.env.GCP_API_KEY ?? ''),
            {},
            15_000
        );

        // Jeśli nie mamy klucza albo API nie odpowiada, używamy znanych cen
        if (!res.ok) {
            return {
                provider: 'Google Cloud',
                cpuPerCore: 7.8,
                ramPerGB: 0.85,
                storagePerGB: 0.04, // pd-balanced
                bandwidthPerTB: 12.0,
                region: 'US (us-central1)',
                currency: 'USD',
                plans: 0,
                fetchedAt: new Date().toISOString(),
            };
        }

        const data = await res.json();
        const skus = data.skus ?? [];

        const cpuPrices: number[] = [];
        const ramPrices: number[] = [];

        for (const sku of skus) {
            const desc = (sku.description ?? '').toLowerCase();
            const pricingInfo = sku.pricingInfo?.[0];
            const unitPrice =
                pricingInfo?.pricingExpression?.tieredRates?.[0]?.unitPrice;

            if (!unitPrice) continue;

            const priceUSD =
                parseInt(unitPrice.units ?? '0', 10) +
                (unitPrice.nanos ?? 0) / 1e9;

            if (priceUSD <= 0) continue;

            const monthlyPrice = priceUSD * 730;

            if (
                desc.includes('n2 predefined') &&
                desc.includes('core') &&
                !desc.includes('ram')
            ) {
                cpuPrices.push(monthlyPrice);
            }

            if (
                desc.includes('n2 predefined') &&
                desc.includes('ram') &&
                !desc.includes('core')
            ) {
                ramPrices.push(monthlyPrice);
            }
        }

        return {
            provider: 'Google Cloud',
            cpuPerCore: safeAvg(cpuPrices) || 7.8,
            ramPerGB: safeAvg(ramPrices) || 0.85,
            storagePerGB: 0.04,
            bandwidthPerTB: 12.0,
            region: 'US (us-central1)',
            currency: 'USD',
            plans: skus.length,
            fetchedAt: new Date().toISOString(),
        };
    } catch (error) {
        console.error('[PRICING] GCP fetch failed:', error);
        return null;
    }
}

// ─── Aggregation ─────────────────────────────────────────

async function fetchAllProviders(): Promise<{
    providers: ProviderPricing[];
    failed: string[];
}> {
    const fetchers = [
        { name: 'Hetzner Cloud', fn: fetchHetzner },
        { name: 'DigitalOcean', fn: fetchDigitalOcean },
        { name: 'Vultr', fn: fetchVultr },
        { name: 'OVHcloud', fn: fetchOVH },
        { name: 'AWS (EC2)', fn: fetchAWS },
        { name: 'Google Cloud', fn: fetchGCP },
    ];

    const results = await Promise.allSettled(
        fetchers.map(async (f) => {
            const result = await f.fn();
            return { name: f.name, result };
        })
    );

    const providers: ProviderPricing[] = [];
    const failed: string[] = [];

    for (const r of results) {
        if (r.status === 'fulfilled' && r.value.result) {
            providers.push(r.value.result);
        } else {
            const name =
                r.status === 'fulfilled'
                    ? r.value.name
                    : 'Unknown';
            failed.push(name);
        }
    }

    return { providers, failed };
}

function computeAverages(providers: ProviderPricing[]) {
    if (providers.length === 0) {
        return {
            cpuPerCore: 6.5,
            ramPerGB: 0.65,
            storagePerGB: 0.08,
            bandwidthPerTB: 8.0,
        };
    }

    return {
        cpuPerCore: safeAvg(providers.map((p) => p.cpuPerCore)),
        ramPerGB: safeAvg(providers.map((p) => p.ramPerGB)),
        storagePerGB: safeAvg(providers.map((p) => p.storagePerGB)),
        bandwidthPerTB: safeAvg(providers.map((p) => p.bandwidthPerTB)),
    };
}

function buildCpuModels(avg: MarketPricing['averages']) {
    const base = avg.cpuPerCore;

    return CPU_MODELS.map((model) => ({
        id: model.id,
        name: model.name,
        vendor: model.vendor,
        cores: model.cores,
        frequency: model.frequency,
        tdp: model.tdp,
        pricePerCore: +(base * model.multiplier).toFixed(2),
        category: model.category,
    }));
}

// ─── Main ────────────────────────────────────────────────

async function getMarketPricing(): Promise<MarketPricing> {
    const now = Date.now();

    if (cachedData && now - lastFetchedAt < CACHE_TTL) {
        return cachedData;
    }

    console.log('[PRICING] Fetching fresh market data...');

    const { providers, failed } = await fetchAllProviders();

    console.log(
        `[PRICING] Fetched ${providers.length} providers, ${failed.length} failed`
    );

    const averages = computeAverages(providers);
    const cpuModels = buildCpuModels(averages);
    const totalPlans = providers.reduce((sum, p) => sum + p.plans, 0);
    const nextUpdate = new Date(now + CACHE_TTL).toISOString();

    cachedData = {
        providers,
        averages,
        cpuModels,
        metadata: {
            lastUpdated: new Date().toISOString(),
            nextUpdate,
            sources: providers.map((p) => p.provider),
            failedSources: failed,
            totalPlans,
            currency: 'USD',
        },
    };

    lastFetchedAt = now;

    return cachedData;
}

// ─── Route Handler ───────────────────────────────────────

export async function GET() {
    try {
        const data = await getMarketPricing();

        return NextResponse.json(data, {
            headers: {
                'Cache-Control':
                    'public, s-maxage=1800, stale-while-revalidate=3600',
            },
        });
    } catch (error) {
        console.error('[PRICING_API_ERROR]', error);

        return NextResponse.json(
            { error: 'Failed to fetch pricing data' },
            { status: 500 }
        );
    }
}