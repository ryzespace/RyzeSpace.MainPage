"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Server, ShieldCheck, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const focusAreas = [
    "AI Systems",
    "Cloud Infrastructure",
    "Product Engineering",
];

const operationalStandards = [
    "Research-driven delivery",
    "Secure-by-design",
    "Production-grade architecture",
];

type LegalDialogProps = {
    title: string;
    content: string;
};

function LegalDialog({ title, content }: LegalDialogProps) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="ghost"
                    className="group h-auto px-0 py-2 text-sm font-medium text-foreground/80 hover:bg-transparent hover:text-primary"
                >
                    {title}
                    <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[80vh] overflow-y-auto border-border/70 sm:max-w-xl">
                <DialogHeader>
                    <DialogTitle className="text-left text-xl">{title}</DialogTitle>
                    <DialogDescription className="sr-only">{title}</DialogDescription>
                </DialogHeader>

                <div className="mt-4 whitespace-pre-line text-sm leading-6 text-muted-foreground">
                    {content}
                </div>
            </DialogContent>
        </Dialog>
    );
}

export function Footer() {
    const { t } = useLanguage();

    return (
        <footer className="relative overflow-hidden border-t border-border/60 bg-background">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 -z-10 h-32 bg-gradient-to-t from-primary/5 to-transparent" />

            <div className="container mx-auto px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
                <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr_0.9fr]">
                    {/* Brand / Identity */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <img
                                src="/logo.png"
                                alt="RyzeSpace"
                                width={80}
                                height={80}
                            />
                            <div>
                                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-lg font-semibold tracking-tight">
                    RyzeSpace
                  </span>
                                </div>

                                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                                    Research · Engineering · Deployment
                                </p>
                            </div>
                        </div>

                        <p className="max-w-xl text-sm leading-6 text-muted-foreground">
                            {t.footer.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {focusAreas.map((area) => (
                                <span
                                    key={area}
                                    className="rounded-full border border-border/80 bg-muted/40 px-3 py-1 text-xs font-medium text-foreground/80"
                                >
                  {area}
                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Operational Standards
                        </h3>

                        <div className="space-y-3">
                            {operationalStandards.map((item) => (
                                <div
                                    key={item}
                                    className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/30 px-4 py-3"
                                >
                                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                                    <span className="text-sm text-foreground/80">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Legal */}
                    <div className="space-y-4">
                        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                            Legal & Compliance
                        </h3>

                        <div className="flex flex-col items-start">
                            <LegalDialog
                                title={t.footer.privacyPolicy.title}
                                content={t.footer.privacyPolicy.content}
                            />
                            <LegalDialog
                                title={t.footer.termsOfService.title}
                                content={t.footer.termsOfService.content}
                            />
                        </div>

                        <div className="rounded-2xl border border-border/60 bg-muted/30 p-4">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                                Studio Note
                            </p>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                Built with a research-first mindset for teams shipping reliable,
                                scalable and modern digital systems.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} RyzeSpace. {t.footer.rights}
                    </p>

                    <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                        Independent Research & Development Studio
                    </p>
                </div>
            </div>
        </footer>
    );
}