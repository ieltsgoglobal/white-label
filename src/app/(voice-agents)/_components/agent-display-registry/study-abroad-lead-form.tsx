"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const CALL_TIMES = ["Morning", "Afternoon", "Evening"] as const;

const pageMotion = { initial: { opacity: 0, x: 16 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -16 }, transition: { duration: 0.22 } };

export function StudyAbroadLeadFormDisplay() {
    const router = useRouter();
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setIsSubmitted(true);
    }

    // redirect after form submit
    useEffect(() => {
        if (!isSubmitted) return;
        const redirectTimer = window.setTimeout(() => { router.push('/practice') }, 4000);
        return () => window.clearTimeout(redirectTimer);
    }, [isSubmitted, router]);

    return (
        <motion.div className="w-full max-w-4xl px-2 sm:px-0" {...pageMotion}>
            <Card className="mx-auto max-h-[calc(100vh-3rem)] w-full overflow-hidden border-border bg-card/95 p-0 shadow-2xl backdrop-blur">
                <div className="grid max-h-[calc(100vh-3rem)] overflow-y-auto md:grid-cols-[0.95fr_1.05fr] md:overflow-hidden">

                    <div className="relative min-h-[220px] sm:min-h-[280px] md:min-h-[560px]">
                        <Image
                            fill
                            src="/university-shortlisting/study-in-usa.png"
                            alt=""
                            sizes="(min-width: 768px) 430px, 100vw"
                            className="object-contain object-center"
                        />
                    </div>

                    <div className="min-h-0">
                        <AnimatePresence mode="wait">
                            {isSubmitted ? (
                                <motion.div key="success" className="flex min-h-[420px] flex-col justify-center p-6 text-center sm:p-8" {...pageMotion}>
                                    <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full border bg-muted text-primary">
                                        <Check className="size-8" />
                                    </div>
                                    <CardTitle className="text-xl">Callback request received.</CardTitle>
                                    <CardDescription className="mx-auto mt-2 max-w-sm leading-6">
                                        Our study abroad team will call you during your preferred window.
                                        Redirecting you to practice now.
                                    </CardDescription>
                                    <div className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-primary">
                                        <Loader2 className="size-4 animate-spin" />
                                        Redirecting to /practice
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.form key="form" className="flex min-h-full flex-col" onSubmit={handleSubmit} {...pageMotion}>
                                    <CardHeader className="pb-4">
                                        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                                            Step 2 of 2
                                        </p>
                                        <CardTitle className="text-2xl leading-tight">
                                            Your counsellor has prepared the next step
                                        </CardTitle>
                                        <CardDescription className="leading-6">
                                            Confirm where our team should call you and when you prefer to speak.
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="study-abroad-name">Full name</Label>
                                            <Input id="study-abroad-name" className="h-12 text-base" placeholder="Enter your name" required />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="study-abroad-phone">Phone number</Label>
                                            <Input id="study-abroad-phone" className="h-12 text-base" placeholder="Enter your phone number" required type="tel" />
                                        </div>
                                        <fieldset className="space-y-3">
                                            <Label className="text-sm font-medium">Preferred call time</Label>
                                            <RadioGroup
                                                defaultValue="morning"
                                                className="grid grid-cols-1 gap-3 sm:grid-cols-3"
                                                name="preferredCallTime"
                                            >
                                                {CALL_TIMES.map((time) => {
                                                    const value = time.toLowerCase();

                                                    return (
                                                        <div key={value} className="flex h-11 items-center gap-2 rounded-md border border-input px-3">
                                                            <RadioGroupItem id={`call-time-${value}`} value={value} />
                                                            <Label className="flex-1 cursor-pointer text-sm font-medium" htmlFor={`call-time-${value}`}>
                                                                {time}
                                                            </Label>
                                                        </div>
                                                    );
                                                })}
                                            </RadioGroup>
                                        </fieldset>
                                    </CardContent>

                                    <CardFooter>
                                        <Button className="h-12 w-full text-base" type="submit">
                                            Request callback
                                            <ArrowRight className="ml-2 size-4" />
                                        </Button>
                                    </CardFooter>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </Card>
        </motion.div>
    );
}
