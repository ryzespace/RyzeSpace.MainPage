'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { LanguageSwitcher } from '@/components/language-switcher';
import { AuthDialog } from '@/components/auth-dialog';
import { useLanguage } from '@/contexts/LanguageContext';
import { Server, Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Header() {
  const { t } = useLanguage();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const openAuth = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-background/80 backdrop-blur-lg border-b shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
              <Server className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">RyzeSpace</span>
            </div>

            <nav className="hidden lg:flex items-center space-x-1">
              <Button variant="ghost" onClick={() => scrollToSection('features')}>
                {t.header.features}
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('calculator')}>
                {t.header.pricing}
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('about')}>
                {t.header.about}
              </Button>
              <Button variant="ghost" onClick={() => scrollToSection('contact')}>
                {t.header.contact}
              </Button>
            </nav>

            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex items-center space-x-2">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>

              <div className="hidden md:flex items-center space-x-2 ml-2">
                <Button variant="ghost" onClick={() => openAuth('login')}>
                  {t.header.login}
                </Button>
                <Button onClick={() => openAuth('register')}>
                  {t.header.register}
                </Button>
              </div>

              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px]">
                  <div className="flex flex-col space-y-4 mt-8">
                    <Button variant="ghost" onClick={() => scrollToSection('features')} className="justify-start">
                      {t.header.features}
                    </Button>
                    <Button variant="ghost" onClick={() => scrollToSection('calculator')} className="justify-start">
                      {t.header.pricing}
                    </Button>
                    <Button variant="ghost" onClick={() => scrollToSection('about')} className="justify-start">
                      {t.header.about}
                    </Button>
                    <Button variant="ghost" onClick={() => scrollToSection('contact')} className="justify-start">
                      {t.header.contact}
                    </Button>

                    <div className="flex items-center justify-start space-x-2 pt-4 border-t">
                      <ThemeToggle />
                      <LanguageSwitcher />
                    </div>

                    <div className="flex flex-col space-y-2 pt-4 border-t">
                      <Button variant="outline" onClick={() => openAuth('login')} className="w-full">
                        {t.header.login}
                      </Button>
                      <Button onClick={() => openAuth('register')} className="w-full">
                        {t.header.register}
                      </Button>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>

      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} mode={authMode} />
    </>
  );
}
