"use client"
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from '@/components/ui/dialog';

export function Footer() {
    const { t } = useLanguage();

    const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
    const [isTermsOpen, setIsTermsOpen] = useState(false);

    return (
        <footer className="bg-accent/20 border-t">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
                <div className="flex flex-col items-center space-y-6">
                    <div className="flex items-center space-x-2">
                        <Server className="h-8 w-8 text-primary" />
                        <span className="text-xl font-bold">RyzeSpace</span>
                    </div>
                    <p className="text-sm text-muted-foreground text-center max-w-2xl">
                        {t.footer.description}
                    </p>
                </div>

                <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Dialog open={isPrivacyOpen} onOpenChange={setIsPrivacyOpen}>
                        <DialogTrigger asChild>
                            <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
                                {t.footer.privacyPolicy.title}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{t.footer.privacyPolicy.title}</DialogTitle>
                                <DialogDescription>
                                    {t.footer.privacyPolicy.content}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={isTermsOpen} onOpenChange={setIsTermsOpen}>
                        <DialogTrigger asChild>
                            <Button variant="link" className="text-sm text-muted-foreground hover:text-primary">
                                {t.footer.termsOfService.title}
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                                <DialogTitle>{t.footer.termsOfService.title}</DialogTitle>
                                <DialogDescription>
                                    {t.footer.termsOfService.content}
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="mt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} RyzeSpace. {t.footer.rights}
                    </p>
                </div>
            </div>
        </footer>
    );
}
