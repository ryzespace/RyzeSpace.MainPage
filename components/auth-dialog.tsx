'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Github } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { signIn } from 'next-auth/react';
import { z } from 'zod';

const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

const registerSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

interface AuthDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: 'login' | 'register';
}

export function AuthDialog({ open, onOpenChange, mode: initialMode }: AuthDialogProps) {
    const { t } = useLanguage();
    const [mode, setMode] = useState<'login' | 'register'>(initialMode);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});

        try {
            if (mode === 'login') {
                loginSchema.parse(formData);

                // 🔐 klasyczne logowanie (CredentialsProvider – opcjonalne)
                // await signIn('credentials', {
                //   email: formData.email,
                //   password: formData.password,
                //   callbackUrl: '/',
                // });

                console.log('Login:', formData.email);
            } else {
                registerSchema.parse(formData);
                // 🔐 tu możesz wywołać własne API do rejestracji (np. /api/register)
                console.log('Register:', formData.email);
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: Record<string, string> = {};
                error.errors.forEach((err) => {
                    if (err.path[0]) newErrors[err.path[0].toString()] = err.message;
                });
                setErrors(newErrors);
            }
        }
    };

    const handleOAuthLogin = async (provider: 'google' | 'github') => {
        setLoading(true);
        try {
            await signIn(provider, { callbackUrl: '/' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        {mode === 'login' ? t.auth.login : t.auth.register}
                    </DialogTitle>
                    <DialogDescription>
                        {mode === 'login' ? t.auth.hasAccount : t.auth.noAccount}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">{t.auth.email}</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && <p className="text-sm text-red-500">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="password">{t.auth.password}</Label>
                        <Input
                            id="password"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className={errors.password ? 'border-red-500' : ''}
                        />
                        {errors.password && <p className="text-sm text-red-500">{errors.password}</p>}
                    </div>

                    {mode === 'register' && (
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                className={errors.confirmPassword ? 'border-red-500' : ''}
                            />
                            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword}</p>}
                        </div>
                    )}

                    {mode === 'login' && (
                        <div className="text-right">
                            <Button variant="link" className="px-0 text-sm" type="button">
                                {t.auth.forgotPassword}
                            </Button>
                        </div>
                    )}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {mode === 'login' ? t.auth.login : t.auth.register}
                    </Button>
                </form>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <Separator />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              {t.auth.orContinue}
            </span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => handleOAuthLogin('google')}
                        disabled={loading}
                    >
                        <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                            <path
                                fill="currentColor"
                                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            />
                            <path
                                fill="currentColor"
                                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            />
                            <path
                                fill="currentColor"
                                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            />
                        </svg>
                        Google
                    </Button>
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => handleOAuthLogin('github')}
                        disabled={loading}
                    >
                        <Github className="mr-2 h-4 w-4" />
                        GitHub
                    </Button>
                </div>

                <div className="text-center text-sm">
                    {mode === 'login' ? t.auth.noAccount : t.auth.hasAccount}{' '}
                    <Button
                        variant="link"
                        className="px-0"
                        onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                        type="button"
                    >
                        {mode === 'login' ? t.auth.register : t.auth.login}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
