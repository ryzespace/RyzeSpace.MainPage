<template>
  <section id="network" class="py-20 bg-white dark:bg-[#0B0E14] border-b border-neutral-200 dark:border-neutral-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-5 space-y-4">
          <div class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F38020]">
            <span>Global Anycast Topology</span>
          </div>

          <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
            335+ Cities.<br />
            Sub-15ms Latency.
          </h2>

          <p class="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
            RyzeSpace nodes interconnect via direct BGP peering with Tier-1 backbones, ensuring packet traversal stays on isolated optical paths with zero middleman routing overhead.
          </p>

          <div class="grid grid-cols-2 gap-3 pt-2">
            <div class="p-3 rounded-lg bg-neutral-50 dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
              <span class="text-xl font-bold font-mono text-neutral-900 dark:text-white">335+</span>
              <p class="text-[11px] text-neutral-500">PoPs &amp; Colocations</p>
            </div>
            <div class="p-3 rounded-lg bg-neutral-50 dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
              <span class="text-xl font-bold font-mono text-neutral-900 dark:text-white">320 Tbps</span>
              <p class="text-[11px] text-neutral-500">Total Mesh Capacity</p>
            </div>
            <div class="p-3 rounded-lg bg-neutral-50 dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
              <span class="text-xl font-bold font-mono text-[#F38020]">&lt; 15 ms</span>
              <p class="text-[11px] text-neutral-500">Global 95th Percentile</p>
            </div>
            <div class="p-3 rounded-lg bg-neutral-50 dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800">
              <span class="text-xl font-bold font-mono text-neutral-900 dark:text-white">100%</span>
              <p class="text-[11px] text-neutral-500">BGP Anycast Routing</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-7">
          <div class="p-6 rounded-xl bg-neutral-50 dark:bg-[#131824] border border-neutral-200 dark:border-neutral-800 space-y-2.5">
            <div class="flex items-center justify-between pb-3 border-b border-neutral-200 dark:border-neutral-800 text-xs">
              <span class="text-neutral-500 font-semibold uppercase tracking-wider">Edge Latency Matrix</span>
              <span class="inline-flex items-center gap-1.5 text-emerald-500 text-[11px] font-medium">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                ICMP Telemetry Live
              </span>
            </div>

            <div class="space-y-2">
              <div
                v-for="city in edgeNodes"
                :key="city.name"
                class="flex items-center justify-between p-2.5 rounded-lg bg-white dark:bg-[#0B0E14] border border-neutral-200 dark:border-neutral-800 text-xs"
              >
                <div class="flex items-center gap-2.5">
                  <span class="px-1.5 py-0.5 rounded text-[10px] font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
                    {{ city.code }}
                  </span>
                  <div>
                    <span class="font-semibold text-neutral-900 dark:text-white block">{{ city.name }}</span>
                    <span class="text-[10px] text-neutral-500">{{ city.dc }}</span>
                  </div>
                </div>

                <div class="flex items-center gap-4">
                  <span class="text-[11px] text-neutral-500 hidden sm:inline">{{ city.capacity }}</span>
                  <div class="text-right font-mono font-bold text-emerald-500">
                    {{ city.ping }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const edgeNodes = [
  { code: 'DE', name: 'Frankfurt (FRA)', dc: 'Equinix FR2 / DE-CIX', capacity: '40 Gbps Uplink', ping: '8.4 ms' },
  { code: 'PL', name: 'Warsaw (WAW)', dc: 'Atman DC-1 / EPIX', capacity: '30 Gbps Uplink', ping: '5.2 ms' },
  { code: 'GB', name: 'London (LON)', dc: 'Telehouse North / LINX', capacity: '50 Gbps Uplink', ping: '12.1 ms' },
  { code: 'US', name: 'Ashburn / NYC (IAD)', dc: 'Equinix DC2 / CoreSite', capacity: '100 Gbps Uplink', ping: '18.7 ms' },
  { code: 'JP', name: 'Tokyo (TYO)', dc: 'NTT Com / JPNAP', capacity: '40 Gbps Uplink', ping: '24.3 ms' },
  { code: 'SG', name: 'Singapore (SIN)', dc: 'Equinix SG1 / SGIX', capacity: '40 Gbps Uplink', ping: '28.5 ms' },
];
</script>
