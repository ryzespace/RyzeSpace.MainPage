import Link from 'next/link';
import type { Dictionary, Locale } from '@/lib/dictionaries';
import { RyzeSpaceLogo } from '../ryze-space-logo';
import { Github, MessageSquare } from 'lucide-react';

type FooterProps = {
  dictionary: Dictionary;
  lang: Locale;
};

export const Footer = ({ dictionary, lang }: FooterProps) => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-transparent py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <RyzeSpaceLogo className="h-7 w-auto" />
            <p className="max-w-xs text-muted-foreground">
              {dictionary.footer.description}
            </p>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">
              {dictionary.footer.navigation}
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {dictionary.footer.links.features}
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  {dictionary.footer.links.roadmap}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-headline text-lg font-semibold">
              {dictionary.footer.community}
            </h3>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <MessageSquare className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {year} RyzeSpace. {dictionary.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
};
