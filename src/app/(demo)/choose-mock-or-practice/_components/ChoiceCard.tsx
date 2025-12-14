import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface ChoiceCardProps {
    title: string;
    subtitle: string;
    badge: "Paid" | "Free";
    meta?: string;
    cta: string;
    href: string;
}

export function ChoiceCard({
    title,
    subtitle,
    badge,
    meta,
    cta,
    href,
}: ChoiceCardProps) {
    return (
        <Link href={href} className="group flex-1">
            <Card
                className="
          relative overflow-hidden rounded-3xl border border-border
          bg-gradient-to-br from-background via-muted/40 to-background
          shadow-[0_20px_50px_rgba(0,0,0,0.25)]
          transition-all duration-500
          group-hover:scale-[1.02]
          group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.35)]
        "
            >
                {/* Glow accents */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute -top-20 -left-20 w-60 h-60 rounded-full bg-primary/10 blur-3xl" />
                    <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-accent/10 blur-3xl" />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-between p-8 md:p-10">
                    <div>
                        {/* Badge */}
                        <span
                            className={`inline-block mb-4 rounded-full px-4 py-1 text-sm font-semibold ${badge === "Free"
                                ? "bg-muted text-foreground"
                                : "bg-primary text-primary-foreground"
                                }`}
                        >
                            {badge}
                        </span>

                        {/* Title */}
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            {title}
                        </h2>

                        {/* Meta */}
                        {meta && (
                            <p className="mt-2 text-sm font-medium text-muted-foreground">
                                {meta}
                            </p>
                        )}

                        {/* Subtitle */}
                        <p className="mt-4 text-muted-foreground leading-relaxed">
                            {subtitle}
                        </p>
                    </div>

                    {/* CTA */}
                    <Button
                        variant={badge === "Free" ? "outline" : "default"}
                        className="mt-8 w-fit rounded-full"
                    >
                        {cta}
                        <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                </div>
            </Card>
        </Link>
    );
}