'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    CheckCircle2,
    Loader2,
    Mail,
    MessageSquare,
    Send,
    User,
    XCircle,
} from 'lucide-react';
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

const EMPTY_CONTACT = {
    name: '',
    surname: '',
    email: '',
    message: '',
};

type StatusMessage = {
    type: 'success' | 'error';
    text: string;
} | null;

function StatusBanner({ status }: { status: StatusMessage }) {
    if (!status) return null;

    const isSuccess = status.type === 'success';

    return (
        <div
            className={cn(
                'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm',
                isSuccess
                    ? 'border-emerald-500/20 bg-emerald-500/5 text-emerald-700 dark:text-emerald-400'
                    : 'border-destructive/20 bg-destructive/5 text-destructive'
            )}
        >
            {isSuccess ? (
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" />
            ) : (
                <XCircle className="mt-0.5 h-4 w-4 shrink-0" />
            )}
            <p>{status.text}</p>
        </div>
    );
}

type FormInputProps = {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    error?: string;
    type?: string;
    placeholder?: string;
    icon?: any;
};

function FormInput({
                       id,
                       label,
                       value,
                       onChange,
                       error,
                       type = 'text',
                       placeholder,
                       icon: Icon,
                   }: FormInputProps) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id} className="text-sm font-medium text-foreground">
                {label}
            </Label>
            <div className="relative">
                {Icon && (
                    <Icon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                )}
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    aria-invalid={!!error}
                    className={cn(
                        'h-11 rounded-xl border-border/70 bg-background shadow-none',
                        Icon && 'pl-10',
                        error && 'border-destructive/60 focus-visible:ring-destructive/20'
                    )}
                />
            </div>
            {error && (
                <p className="text-xs font-medium text-destructive">{error}</p>
            )}
        </div>
    );
}

export function Contact() {
    const { t } = useLanguage();

    // Newsletter
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterError, setNewsletterError] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState<StatusMessage>(null);
    const [newsletterSending, setNewsletterSending] = useState(false);

    // Contact
    const [contactForm, setContactForm] = useState(EMPTY_CONTACT);
    const [contactErrors, setContactErrors] = useState<Record<string, string>>(
        {}
    );
    const [contactStatus, setContactStatus] = useState<StatusMessage>(null);
    const [contactSending, setContactSending] = useState(false);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setNewsletterError('');
        setNewsletterStatus(null);

        const result = newsletterSchema.safeParse({ email: newsletterEmail });

        if (!result.success) {
            setNewsletterError(result.error.issues[0].message);
            return;
        }

        setNewsletterSending(true);

        try {
            // TODO: podłącz prawdziwy endpoint
            await new Promise((resolve) => setTimeout(resolve, 800));

            setNewsletterStatus({
                type: 'success',
                text: 'Successfully subscribed to the newsletter.',
            });
            setNewsletterEmail('');
        } catch {
            setNewsletterStatus({
                type: 'error',
                text: 'Failed to subscribe. Please try again.',
            });
        } finally {
            setNewsletterSending(false);
        }
    };

    const handleContactSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setContactErrors({});
        setContactStatus(null);

        const result = contactSchema.safeParse(contactForm);

        if (!result.success) {
            const nextErrors: Record<string, string> = {};
            result.error.issues.forEach((issue) => {
                const key = issue.path[0]?.toString();
                if (key) nextErrors[key] = issue.message;
            });
            setContactErrors(nextErrors);
            return;
        }

        setContactSending(true);

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(contactForm),
            });

            const data = await res.json();

            if (res.ok) {
                setContactStatus({
                    type: 'success',
                    text: 'Message sent successfully. We\'ll get back to you soon.',
                });
                setContactForm(EMPTY_CONTACT);
            } else {
                setContactStatus({
                    type: 'error',
                    text: data.error || 'Failed to send message.',
                });
            }
        } catch {
            setContactStatus({
                type: 'error',
                text: 'Something went wrong. Please try again.',
            });
        } finally {
            setContactSending(false);
        }
    };

    const updateContact = (field: string, value: string) => {
        setContactForm((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <section
            id="contact"
            className="relative overflow-hidden bg-background py-24 sm:py-28 lg:py-32"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
                    {/* Left Column */}
                    <div className="space-y-8">
                        <div className="space-y-5">
                            <div className="h-px w-16 bg-primary/40" />

                            <div className="space-y-4">
                                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
                                    {t.contact.title}
                                </h2>
                                <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                                    {t.contact.subtitle}
                                </p>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <Card className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-[0_12px_32px_-24px_hsl(var(--foreground)/0.18)]">
                            <div className="pointer-events-none h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

                            <div className="p-6 sm:p-8">
                                <div className="flex items-start gap-4">
                                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-muted/25 text-primary">
                                        <Mail className="h-5 w-5" />
                                    </div>

                                    <div className="min-w-0">
                                        <h3 className="text-lg font-semibold tracking-tight">
                                            {t.contact.newsletter}
                                        </h3>
                                        <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                            {t.contact.newsletterDesc}
                                        </p>
                                    </div>
                                </div>

                                <form
                                    onSubmit={handleNewsletterSubmit}
                                    className="mt-6 space-y-4"
                                >
                                    <div className="flex gap-2">
                                        <div className="relative min-w-0 flex-1">
                                            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                            <Input
                                                type="email"
                                                placeholder={t.contact.emailPlaceholder}
                                                value={newsletterEmail}
                                                onChange={(e) => setNewsletterEmail(e.target.value)}
                                                aria-invalid={!!newsletterError}
                                                className={cn(
                                                    'h-11 rounded-xl border-border/70 bg-background pl-10 shadow-none',
                                                    newsletterError &&
                                                    'border-destructive/60 focus-visible:ring-destructive/20'
                                                )}
                                            />
                                        </div>

                                        <Button
                                            type="submit"
                                            className="h-11 shrink-0 rounded-xl px-5"
                                            disabled={newsletterSending}
                                        >
                                            {newsletterSending ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <>
                                                    {t.contact.subscribe}
                                                    <ArrowRight className="ml-2 h-4 w-4" />
                                                </>
                                            )}
                                        </Button>
                                    </div>

                                    {newsletterError && (
                                        <p className="text-xs font-medium text-destructive">
                                            {newsletterError}
                                        </p>
                                    )}

                                    <StatusBanner status={newsletterStatus} />
                                </form>
                            </div>
                        </Card>

                        {/* Info block */}
                        <div className="rounded-3xl border border-border/70 bg-muted/[0.14] p-6 sm:p-8">
                            <div className="space-y-4 text-sm leading-7 text-muted-foreground">
                                <p>
                                    We typically respond within 24 hours during business days.
                                    For urgent inquiries, please include{' '}
                                    <span className="font-medium text-foreground">
                    [URGENT]
                  </span>{' '}
                                    in your message.
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    {['General Inquiry', 'Technical Support', 'Partnership'].map(
                                        (tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full border border-border/70 bg-background px-3 py-1 text-xs font-medium text-foreground/80"
                                            >
                        {tag}
                      </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column — Contact Form */}
                    <Card className="overflow-hidden rounded-3xl border border-border/70 bg-background shadow-[0_12px_32px_-24px_hsl(var(--foreground)/0.18)]">
                        <div className="pointer-events-none h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

                        <div className="p-6 sm:p-8">
                            <div className="flex items-start gap-4">
                                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-border/70 bg-muted/25 text-primary">
                                    <MessageSquare className="h-5 w-5" />
                                </div>

                                <div className="min-w-0">
                                    <h3 className="text-lg font-semibold tracking-tight">
                                        {t.contact.contactForm}
                                    </h3>
                                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                        Fill in the form below and we'll get back to you.
                                    </p>
                                </div>
                            </div>

                            <form
                                onSubmit={handleContactSubmit}
                                className="mt-8 space-y-5"
                            >
                                <div className="grid gap-5 sm:grid-cols-2">
                                    <FormInput
                                        id="name"
                                        label={t.contact.name}
                                        value={contactForm.name}
                                        onChange={(v) => updateContact('name', v)}
                                        error={contactErrors.name}
                                        placeholder="John"
                                        icon={User}
                                    />

                                    <FormInput
                                        id="surname"
                                        label={t.contact.surname}
                                        value={contactForm.surname}
                                        onChange={(v) => updateContact('surname', v)}
                                        error={contactErrors.surname}
                                        placeholder="Doe"
                                        icon={User}
                                    />
                                </div>

                                <FormInput
                                    id="contact-email"
                                    label={t.contact.email}
                                    value={contactForm.email}
                                    onChange={(v) => updateContact('email', v)}
                                    error={contactErrors.email}
                                    type="email"
                                    placeholder="john@example.com"
                                    icon={Mail}
                                />

                                <div className="space-y-2">
                                    <Label
                                        htmlFor="message"
                                        className="text-sm font-medium text-foreground"
                                    >
                                        {t.contact.message}
                                    </Label>
                                    <div className="relative">
                                        <MessageSquare className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                        <Textarea
                                            id="message"
                                            rows={5}
                                            placeholder="Tell us about your project or question..."
                                            value={contactForm.message}
                                            onChange={(e) =>
                                                updateContact('message', e.target.value)
                                            }
                                            aria-invalid={!!contactErrors.message}
                                            className={cn(
                                                'min-h-[130px] resize-none rounded-xl border-border/70 bg-background pl-10 shadow-none',
                                                contactErrors.message &&
                                                'border-destructive/60 focus-visible:ring-destructive/20'
                                            )}
                                        />
                                    </div>
                                    {contactErrors.message && (
                                        <p className="text-xs font-medium text-destructive">
                                            {contactErrors.message}
                                        </p>
                                    )}

                                    <div className="flex justify-end">
                    <span
                        className={cn(
                            'text-xs',
                            contactForm.message.length >= 10
                                ? 'text-muted-foreground'
                                : 'text-muted-foreground/60'
                        )}
                    >
                      {contactForm.message.length}/10 min
                    </span>
                                    </div>
                                </div>

                                <StatusBanner status={contactStatus} />

                                <Button
                                    type="submit"
                                    className="h-12 w-full rounded-xl"
                                    size="lg"
                                    disabled={contactSending}
                                >
                                    {contactSending ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <Send className="mr-2 h-4 w-4" />
                                            {t.contact.send}
                                        </>
                                    )}
                                </Button>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}