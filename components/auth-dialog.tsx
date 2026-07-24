'use client';

import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
    ArrowRight,
    Check,
    Github,
    Loader2,
    LockKeyhole,
    Mail,
    X,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { signIn } from 'next-auth/react';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z
    .object({
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Password must be at least 6 characters'),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ['confirmPassword'],
    });

type AuthMode = 'login' | 'register';

interface AuthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: AuthMode;
}

const EMPTY_FORM = {
    email: '',
    password: '',
    confirmPassword: '',
};

function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
            <path
                fill="#4285F4"
                d="M21.805 10.023H12v3.955h5.615c-.242 1.272-.967 2.35-2.061 3.075v2.56h3.34c1.955-1.8 3.081-4.454 3.081-7.613 0-.663-.058-1.302-.17-1.977Z"
            />
            <path
                fill="#34A853"
                d="M12 22c2.79 0 5.132-.924 6.842-2.509l-3.34-2.56c-.925.621-2.107.989-3.502.989-2.692 0-4.973-1.817-5.788-4.26H2.76v2.643A10 10 0 0 0 12 22Z"
            />
            <path
                fill="#FBBC05"
                d="M6.212 13.66A5.99 5.99 0 0 1 5.888 12c0-.576.117-1.132.324-1.66V7.697H2.76A10 10 0 0 0 2 12c0 1.61.386 3.135 1.07 4.303l3.142-2.643Z"
            />
            <path
                fill="#EA4335"
                d="M12 6.08c1.517 0 2.88.523 3.952 1.548l2.965-2.964C17.128 2.998 14.786 2 12 2A10 10 0 0 0 2.76 7.697l3.452 2.643C7.027 7.897 9.308 6.08 12 6.08Z"
            />
        </svg>
    );
}

export function AuthDialog({
                               open,
                               onOpenChange,
                               mode: initialMode,
                           }: AuthDialogProps) {
    const { t } = useLanguage();

    const [mode, setMode] = useState<AuthMode>(initialMode);
    const [formData, setFormData] = useState(EMPTY_FORM);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [oauthProvider, setOauthProvider] = useState<'google' | 'github' | null>(
        null
    );

    const isBusy = submitting || oauthProvider !== null;

    useEffect(() => {
        if (open) {
            setMode(initialMode);
            setErrors({});
        }
    }, [open, initialMode]);

    const handleDialogChange = (nextOpen: boolean) => {
        onOpenChange(nextOpen);

        if (!nextOpen) {
            setErrors({});
            setSubmitting(false);
            setOauthProvider(null);
            setFormData(EMPTY_FORM);
            setMode(initialMode);
        }
    };

    const switchMode = (nextMode: AuthMode) => {
        setMode(nextMode);
        setErrors({});
        setFormData((prev) => ({
            ...prev,
            confirmPassword: '',
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setSubmitting(true);

        const schema = mode === 'login' ? loginSchema : registerSchema;
        const result = schema.safeParse(formData);

        if (!result.success) {
            const nextErrors: Record<string, string> = {};

            result.error.issues.forEach((issue) => {
                const key = issue.path[0]?.toString();
                if (key) nextErrors[key] = issue.message;
            });

            setErrors(nextErrors);
            setSubmitting(false);
            return;
        }

        try {
            if (mode === 'login') {
                // przykład pod credentials:
                // const response = await signIn('credentials', {
                //   email: formData.email,
                //   password: formData.password,
                //   redirect: false,
                // });
                //
                // if (response?.error) {
                //   setErrors({ root: 'Invalid email or password' });
                //   return;
                // }

                console.log('Login:', formData.email);
            } else {
                // tutaj podłącz swoje API rejestracji
                console.log('Register:', formData.email);
            }
        } catch {
            setErrors({
                root: 'Something went wrong. Please try again.',
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleOAuthLogin = async (provider: 'google' | 'github') => {
        setErrors({});
        setOauthProvider(provider);

        try {
            await signIn(provider, { callbackUrl: '/' });
        } catch {
            setErrors({
                root: 'Unable to continue with the selected provider.',
            });
            setOauthProvider(null);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleDialogChange}>
            <DialogContent className="overflow-hidden border-border/70 bg-background p-0 shadow-[0_24px_80px_-28px_hsl(var(--foreground)/0.35)] sm:max-w-[460px] [&>button]:hidden">
                <div className="relative">
                    <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

                    <DialogClose asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute right-4 top-4 z-10 rounded-xl"
                            aria-label="Close dialog"
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </DialogClose>

                    <div className="border-b border-border/60 px-6 py-6">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-border/70 bg-muted/20 text-primary shadow-sm">
                            <LockKeyhole className="h-5 w-5" />
                        </div>

                        <div className="mt-5 inline-flex rounded-2xl border border-border/70 bg-muted/20 p-1">
                            {(['login', 'register'] as const).map((item) => {
                                const active = mode === item;

                                return (
                                    <button
                                        key={item}
                                        type="button"
                                        onClick={() => switchMode(item)}
                                        className={cn(
                                            'rounded-xl px-3.5 py-2 text-sm font-medium transition-all',
                                            active
                                                ? 'bg-background text-foreground shadow-sm'
                                                : 'text-muted-foreground hover:text-foreground'
                                        )}
                                    >
                                        {item === 'login' ? t.auth.login : t.auth.register}
                                    </button>
                                );
                            })}
                        </div>

                        <DialogHeader className="mt-5 space-y-2 text-left">
                            <DialogTitle className="text-2xl font-semibold tracking-tight">
                                {mode === 'login' ? t.auth.login : t.auth.register}
                            </DialogTitle>
                            <DialogDescription className="text-sm leading-6 text-muted-foreground">
                                {mode === 'login' ? t.auth.hasAccount : t.auth.noAccount}
                            </DialogDescription>
                        </DialogHeader>
                    </div>

                    <div className="px-6 py-6">
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Button

                                variant="outline"
                                type="button"
                                onClick={() => handleOAuthLogin('google')}
                                disabled={true} // {isBusy}
                                className="h-11 rounded-xl border-border/70 bg-background hover:bg-muted/30"
                            >
                                {oauthProvider === 'google' ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <GoogleIcon className="mr-2 h-4 w-4" />
                                )}
                                Google
                            </Button>

                            <Button
                                variant="outline"
                                type="button"
                                onClick={() => handleOAuthLogin('github')}
                                disabled={true} //{isBusy}
                                className="h-11 rounded-xl border-border/70 bg-background hover:bg-muted/30"
                            >
                                {oauthProvider === 'github' ? (
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                ) : (
                                    <Github className="mr-2 h-4 w-4" />
                                )}
                                GitHub
                            </Button>
                        </div>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <Separator className="bg-border/70" />
                            </div>
                            <div className="relative flex justify-center">
                <span className="bg-background px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                  {t.auth.orContinue}
                </span>
                            </div>
                        </div>

                        {errors.root && (
                            <div className="mb-4 rounded-xl border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                                {errors.root}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">{t.auth.email}</Label>
                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        disabled={true}
                                        id="email"
                                        type="email"
                                        placeholder="name@example.com"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({ ...formData, email: e.target.value })
                                        }
                                        aria-invalid={!!errors.email}
                                        className={cn(
                                            'h-11 rounded-xl border-border/70 bg-background pl-10 shadow-none',
                                            errors.email &&
                                            'border-destructive/60 focus-visible:ring-destructive/20'
                                        )}
                                    />
                                </div>
                                {errors.email && (
                                    <p className="text-xs font-medium text-destructive">
                                        {errors.email}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">{t.auth.password}</Label>
                                <div className="relative">
                                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        disabled={true}
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        aria-invalid={!!errors.password}
                                        className={cn(
                                            'h-11 rounded-xl border-border/70 bg-background pl-10 shadow-none',
                                            errors.password &&
                                            'border-destructive/60 focus-visible:ring-destructive/20'
                                        )}
                                    />
                                </div>
                                {errors.password && (
                                    <p className="text-xs font-medium text-destructive">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            {mode === 'register' && (
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword">
                                        {t.auth.confirmPassword}
                                    </Label>
                                    <div className="relative">
                                        <Check className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            disabled={true}
                                            id="confirmPassword"
                                            type="password"
                                            placeholder="••••••••"
                                            value={formData.confirmPassword}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    confirmPassword: e.target.value,
                                                })
                                            }
                                            aria-invalid={!!errors.confirmPassword}
                                            className={cn(
                                                'h-11 rounded-xl border-border/70 bg-background pl-10 shadow-none',
                                                errors.confirmPassword &&
                                                'border-destructive/60 focus-visible:ring-destructive/20'
                                            )}
                                        />
                                    </div>
                                    {errors.confirmPassword && (
                                        <p className="text-xs font-medium text-destructive">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>
                            )}

                            {mode === 'login' && (
                                <div className="flex justify-end">
                                    <Button
                                        disabled={true}
                                        variant="link"
                                        className="h-auto px-0 text-sm text-muted-foreground hover:text-foreground"
                                        type="button"
                                    >
                                        {t.auth.forgotPassword}
                                    </Button>
                                </div>
                            )}

                            <Button
                                type="submit"
                                className="h-11 w-full rounded-xl"
                                disabled={true} // {isBusy}
                            >
                                {submitting ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {mode === 'login' ? t.auth.login : t.auth.register}
                                    </>
                                ) : (
                                    <>
                                        {mode === 'login' ? t.auth.login : t.auth.register}
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>
                        </form>

                        <div className="mt-6 border-t border-border/60 pt-4 text-center text-sm text-muted-foreground">
                            {mode === 'login' ? t.auth.noAccount : t.auth.hasAccount}{' '}
                            <Button
                                disabled={true}
                                variant="link"
                                className="h-auto px-0 text-sm"
                                onClick={() =>
                                    switchMode(mode === 'login' ? 'register' : 'login')
                                }
                                type="button"
                            >
                                {mode === 'login' ? t.auth.register : t.auth.login}
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}