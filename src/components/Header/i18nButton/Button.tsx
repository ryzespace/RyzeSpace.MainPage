"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "pl", label: "PL" },
  { code: "en", label: "EN" },
  { code: "ru", label: "RU" },
  { code: "de", label: "DE" },
];

export default function LanguageSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative ml-4">
      <button
        onClick={() => setOpen(!open)}
        className="bg-primary text-white rounded-sm px-4 py-2 text-base font-medium shadow-btn hover:shadow-btn-hover hover:bg-primary/90 flex items-center gap-1 transition duration-300"
      >
        🌐 <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-28 rounded-md bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700">
          {languages.map((lang) => (
            <li key={lang.code}>
              <Link
                href={pathname}
                locale={lang.code}
                className="block px-4 py-2 text-sm text-gray-800 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                onClick={() => setOpen(false)}
              >
                {lang.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
