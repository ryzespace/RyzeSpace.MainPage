'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { Server } from 'lucide-react';

export function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-accent/20 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Server className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">RyzeSpace</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t.footer.description}
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.footer.product}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('features')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.header.features}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('calculator')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.header.pricing}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Documentation
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.footer.company}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.header.about}
                </button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Blog
                </button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Careers
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">{t.footer.support}</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {t.header.contact}
                </button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </button>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Status
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} RyzeSpace. {t.footer.rights}
            </p>
            <div className="flex space-x-6">
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Privacy Policy
              </button>
              <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Terms of Service
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
