'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Send } from 'lucide-react';
import { z } from 'zod';

const newsletterSchema = z.object({
  email: z.string().email('Invalid email address'),
});

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  surname: z.string().min(2, 'Surname must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

export function Contact() {
  const { t } = useLanguage();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterError, setNewsletterError] = useState('');
  const [contactForm, setContactForm] = useState({
    name: '',
    surname: '',
    email: '',
    message: '',
  });
  const [contactErrors, setContactErrors] = useState<Record<string, string>>({});

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterError('');

    try {
      newsletterSchema.parse({ email: newsletterEmail });
      console.log('Newsletter subscription:', newsletterEmail);
      setNewsletterEmail('');
    } catch (error) {
      if (error instanceof z.ZodError) {
        setNewsletterError(error.errors[0].message);
      }
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactErrors({});

    try {
      contactSchema.parse(contactForm);
      console.log('Contact form:', contactForm);
      setContactForm({ name: '', surname: '', email: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0].toString()] = err.message;
          }
        });
        setContactErrors(newErrors);
      }
    }
  };

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 border-2 space-y-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">{t.contact.newsletter}</h3>
                  <p className="text-sm text-muted-foreground">{t.contact.newsletterDesc}</p>
                </div>
              </div>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder={t.contact.emailPlaceholder}
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className={newsletterError ? 'border-red-500' : ''}
                />
                {newsletterError && <p className="text-sm text-red-500">{newsletterError}</p>}
              </div>
              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                {t.contact.subscribe}
              </Button>
            </form>
          </Card>

          <Card className="p-8 border-2 space-y-6">
            <div>
              <h3 className="text-2xl font-bold mb-2">{t.contact.contactForm}</h3>
            </div>

            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">{t.contact.name}</Label>
                  <Input
                    id="name"
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    className={contactErrors.name ? 'border-red-500' : ''}
                  />
                  {contactErrors.name && <p className="text-sm text-red-500">{contactErrors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="surname">{t.contact.surname}</Label>
                  <Input
                    id="surname"
                    value={contactForm.surname}
                    onChange={(e) => setContactForm({ ...contactForm, surname: e.target.value })}
                    className={contactErrors.surname ? 'border-red-500' : ''}
                  />
                  {contactErrors.surname && <p className="text-sm text-red-500">{contactErrors.surname}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">{t.contact.email}</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className={contactErrors.email ? 'border-red-500' : ''}
                />
                {contactErrors.email && <p className="text-sm text-red-500">{contactErrors.email}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">{t.contact.message}</Label>
                <Textarea
                  id="message"
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className={contactErrors.message ? 'border-red-500' : ''}
                />
                {contactErrors.message && <p className="text-sm text-red-500">{contactErrors.message}</p>}
              </div>

              <Button type="submit" className="w-full">
                <Send className="mr-2 h-4 w-4" />
                {t.contact.send}
              </Button>
            </form>
          </Card>
        </div>
      </div>
    </section>
  );
}
