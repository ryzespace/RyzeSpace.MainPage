"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggler from "./ThemeToggler";
import LanguageSwitcher from "./i18nButton/Button";
import menuData from "./menuData";

export default function Header() {
  const t = useTranslations("Header"); // <--- brakowało importu useTranslations
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const pathname = usePathname();

  // toggle hamburger
  const navbarToggleHandler = () => setNavbarOpen((prev) => !prev);

  // Sticky behavior
  useEffect(() => {
    const handleStickyNavbar = () => {
      setSticky(window.scrollY >= 80);
    };
    window.addEventListener("scroll", handleStickyNavbar);
    return () => window.removeEventListener("scroll", handleStickyNavbar);
  }, []);

  return (
    <header
      className={`header top-0 left-0 z-40 flex w-full items-center ${
        sticky
          ? "fixed z-[9999] bg-white/80 backdrop-blur-sm shadow-sticky dark:bg-gray-dark dark:shadow-sticky-dark transition"
          : "absolute bg-transparent"
      }`}
    >
      <div className="container">
        <div className="relative -mx-4 flex items-center justify-between">
          {/* logo */}
          <div className="w-60 max-w-full px-4 xl:mr-12">
            <Link
              href="/"
              className={`header-logo block w-full ${
                sticky ? "py-5 lg:py-2" : "py-8"
              } `}
            >
              <Image
                src="/images/logo/logo-2.svg"
                alt="logo"
                width={140}
                height={30}
                className="w-full dark:hidden"
              />
              <Image
                src="/images/logo/logo.svg"
                alt="logo"
                width={140}
                height={30}
                className="hidden w-full dark:block"
              />
            </Link>
          </div>

          {/* nav + przyciski */}
          <div className="flex w-full items-center justify-between px-4">
            {/* hamburger */}
            <div>
              <button
                onClick={navbarToggleHandler}
                id="navbarToggler"
                aria-label="Mobile Menu"
                className="ring-primary absolute top-1/2 right-4 block -translate-y-1/2 rounded-lg px-3 py-[6px] focus:ring-2 lg:hidden"
              >
                <span
                  className={`block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "translate-y-[7px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`my-1 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "opacity-0" : ""
                  }`}
                />
                <span
                  className={`block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                    navbarOpen ? "-translate-y-[7px] -rotate-45" : ""
                  }`}
                />
              </button>

              {/* menu */}
              <nav
                id="navbarCollapse"
                className={`navbar absolute right-0 z-30 w-[250px] rounded border border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:bg-transparent lg:p-0 lg:opacity-100 ${
                  navbarOpen
                    ? "visible top-full opacity-100"
                    : "invisible top-[120%] opacity-0"
                }`}
              >
                <ul className="block lg:flex lg:space-x-12">
                  {menuData.map((item, index) => (
                    <li key={index} className="group relative">
                      {item.path ? (
                        <Link
                          href={item.path}
                          className={`flex py-2 text-base lg:inline-flex lg:px-0 lg:py-6 ${
                            pathname === item.path
                              ? "text-primary dark:text-white"
                              : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                          }`}
                        >
                          {item.title}
                        </Link>
                      ) : (
                        <span className="flex cursor-pointer py-2 text-base text-dark hover:text-primary dark:text-white/70 dark:hover:text-white lg:inline-flex lg:px-0 lg:py-6">
                          {item.title}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* prawa sekcja */}
            <div className="flex items-center justify-end pr-16 lg:pr-0">
              <Link
                href="/signin"
                className="hidden px-7 py-3 text-base font-medium text-dark hover:opacity-70 md:block dark:text-white"
              >
                {t("signin")}
              </Link>
              <Link
                href="/signup"
                className="hidden rounded-sm bg-primary px-8 py-3 text-base font-medium text-white transition duration-300 ease-in-out hover:bg-primary/90 hover:shadow-btn-hover md:block md:px-9 lg:px-6 xl:px-9"
              >
                {t("signup")}
              </Link>
              <LanguageSwitcher />
              <ThemeToggler />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}