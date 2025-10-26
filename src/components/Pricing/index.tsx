"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";

const ServerCalculator = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const [ram, setRam] = useState(8); // GB
  const [cpu, setCpu] = useState(2); // vCPU
  const [gpu, setGpu] = useState(0); // GPU units
  const [duration, setDuration] = useState(1); // months or years

  // Ceny za jednostkę (przykładowe)
  const pricing = {
    ram: isMonthly ? 5 : 50, // za GB
    cpu: isMonthly ? 15 : 150, // za vCPU
    gpu: isMonthly ? 100 : 1000, // za GPU
  };

  const calculatePrice = () => {
    const ramCost = ram * pricing.ram;
    const cpuCost = cpu * pricing.cpu;
    const gpuCost = gpu * pricing.gpu;
    return (ramCost + cpuCost + gpuCost) * duration;
  };

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title="Kalkulator Zasobów Serwerowych"
          paragraph="Skonfiguruj swój serwer i oblicz koszt wynajmu zasobów obliczeniowych"
          center
          width="665px"
        />

        <div className="w-full">
          <div className="mb-8 flex justify-center md:mb-12 lg:mb-16">
            <span
              onClick={() => setIsMonthly(true)}
              className={`${
                isMonthly
                  ? "pointer-events-none text-primary"
                  : "text-dark dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold`}
            >
              Miesięcznie
            </span>
            <div
              onClick={() => setIsMonthly(!isMonthly)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <div
                  className={`${
                    isMonthly ? "" : "translate-x-full"
                  } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${
                isMonthly
                  ? "text-dark dark:text-white"
                  : "pointer-events-none text-primary"
              } ml-4 cursor-pointer text-base font-semibold`}
            >
              Rocznie
            </span>
          </div>
        </div>

        <div className="mx-auto max-w-[800px]">
          {/* Karta kalkulatora */}
          <div className="rounded-lg bg-white p-8 shadow-lg dark:bg-gray-dark">

            {/* RAM Slider */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-base font-semibold text-dark dark:text-white">
                  RAM (GB)
                </label>
                <span className="text-lg font-bold text-primary">{ram} GB</span>
              </div>
              <input
                type="range"
                min="1"
                max="256"
                value={ram}
                onChange={(e) => setRam(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
              <div className="mt-1 flex justify-between text-xs text-body-color">
                <span>1 GB</span>
                <span>256 GB</span>
              </div>
            </div>

            {/* CPU Slider */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-base font-semibold text-dark dark:text-white">
                  CPU (vCPU)
                </label>
                <span className="text-lg font-bold text-primary">{cpu} vCPU</span>
              </div>
              <input
                type="range"
                min="1"
                max="64"
                value={cpu}
                onChange={(e) => setCpu(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
              <div className="mt-1 flex justify-between text-xs text-body-color">
                <span>1 vCPU</span>
                <span>64 vCPU</span>
              </div>
            </div>

            {/* GPU Slider */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-base font-semibold text-dark dark:text-white">
                  GPU
                </label>
                <span className="text-lg font-bold text-primary">{gpu} GPU</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                value={gpu}
                onChange={(e) => setGpu(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
              <div className="mt-1 flex justify-between text-xs text-body-color">
                <span>0 GPU</span>
                <span>8 GPU</span>
              </div>
            </div>

            {/* Czas */}
            <div className="mb-8">
              <div className="mb-3 flex items-center justify-between">
                <label className="text-base font-semibold text-dark dark:text-white">
                  Okres czasu ({isMonthly ? "miesiące" : "lata"})
                </label>
                <span className="text-lg font-bold text-primary">
                  {duration} {isMonthly ? (duration === 1 ? "miesiąc" : "miesięcy") : (duration === 1 ? "rok" : "lat")}
                </span>
              </div>
              <input
                type="range"
                min="1"
                max={isMonthly ? "12" : "5"}
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary"
              />
              <div className="mt-1 flex justify-between text-xs text-body-color">
                <span>1</span>
                <span>{isMonthly ? "12" : "5"}</span>
              </div>
            </div>

            {/* Podsumowanie kosztów */}
            <div className="border-t border-body-color border-opacity-10 pt-8">
              <div className="mb-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-body-color">RAM ({ram} GB × ${pricing.ram})</span>
                  <span className="font-medium text-dark dark:text-white">
                    ${ram * pricing.ram}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-body-color">CPU ({cpu} vCPU × ${pricing.cpu})</span>
                  <span className="font-medium text-dark dark:text-white">
                    ${cpu * pricing.cpu}
                  </span>
                </div>
                {gpu > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-body-color">GPU ({gpu} GPU × ${pricing.gpu})</span>
                    <span className="font-medium text-dark dark:text-white">
                      ${gpu * pricing.gpu}
                    </span>
                  </div>
                )}
                {duration > 1 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-body-color">
                      Okres ({duration} {isMonthly ? "miesięcy" : "lat"})
                    </span>
                    <span className="font-medium text-dark dark:text-white">×{duration}</span>
                  </div>
                )}
              </div>

              {/* Cena całkowita */}
              <div className="mb-6 flex items-center justify-between border-t border-body-color border-opacity-10 pt-4">
                <span className="text-lg font-semibold text-dark dark:text-white">
                  Suma całkowita
                </span>
                <div className="text-right">
                  <span className="text-3xl font-bold text-primary">
                    ${calculatePrice()}
                  </span>
                  <span className="ml-2 text-base font-medium text-body-color">
                    / {isMonthly ? (duration === 1 ? "miesiąc" : `${duration} miesięcy`) : (duration === 1 ? "rok" : `${duration} lat`)}
                  </span>
                </div>
              </div>

              {/* Przycisk */}
              <button className="w-full rounded-md bg-primary py-3 text-base font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-80 hover:shadow-signUp">
                Rozpocznij teraz
              </button>
            </div>
          </div>

          {/* Dodatkowe informacje */}
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-dark">
              <div className="mb-3 text-2xl font-bold text-primary">24/7</div>
              <div className="text-sm text-body-color">Wsparcie techniczne</div>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-dark">
              <div className="mb-3 text-2xl font-bold text-primary">99.9%</div>
              <div className="text-sm text-body-color">Gwarancja SLA</div>
            </div>
            <div className="rounded-lg bg-white p-6 text-center shadow-md dark:bg-gray-dark">
              <div className="mb-3 text-2xl font-bold text-primary">Instant</div>
              <div className="text-sm text-body-color">Skalowanie zasobów</div>
            </div>
          </div>
        </div>
      </div>

      {/* Zachowane tło SVG */}
      <div className="absolute bottom-0 left-0 z-[-1]">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default ServerCalculator;