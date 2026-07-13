"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { COACHING_CLASSES_KC_DATA } from "../_lib/coaching-classes-kc-data";
import Link from "next/link";
import { WHATSAPP_ICON_SVG_CODE } from "@/components/admin-panel/menu";
import { X } from "lucide-react";

export const COACHING_CLASSES_WHATSAPP_MESSAGE_LINK = "https://wa.me/919555488118?text=Hi%2C%0A%0AI%27m%20interested%20in%20joining%20your%20IELTS%20coaching%20classes.%0A%0ACould%20you%20please%20share%3A%0A%E2%80%A2%20Batch%20timings%0A%E2%80%A2%20Fees%0A%E2%80%A2%20Upcoming%20schedule%0A%E2%80%A2%20Mode%20of%20classes%20%28Online%2FOffline%29%0A%0AThank%20you."

const COACHING_CLASS_BADGE_STYLES: Record<string, string> = {
    IELTS: "border-violet-500/40 bg-violet-500/15 text-violet-700 dark:text-violet-200",
    "German (A1)": "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-200",
    "German (A2)": "border-amber-500/40 bg-amber-500/15 text-amber-700 dark:text-amber-200",
    SAT: "border-sky-500/40 bg-sky-500/15 text-sky-700 dark:text-sky-200",
    "French (A1)": "border-blue-500/40 bg-blue-500/15 text-blue-700 dark:text-blue-200",
    "GRE/GMAT": "border-pink-500/40 bg-pink-500/15 text-pink-700 dark:text-pink-200",
    PTE: "border-indigo-500/40 bg-indigo-500/15 text-indigo-700 dark:text-indigo-200",
    TOEFL: "border-slate-500/40 bg-slate-500/15 text-slate-700 dark:text-slate-200",
    DET: "border-yellow-500/40 bg-yellow-500/15 text-yellow-700 dark:text-yellow-200",
}

function getCoachingClassBadgeStyle(title: string) {
    return COACHING_CLASS_BADGE_STYLES[title] ?? "border-muted-foreground/30 bg-muted/50 text-muted-foreground"
}

export function CoachingClassesCalander() {
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const latestMonthIndex = COACHING_CLASSES_KC_DATA.length - 1
    const [activeMonthIndex, setActiveMonthIndex] = useState(latestMonthIndex)
    const activeMonth = COACHING_CLASSES_KC_DATA[activeMonthIndex]

    // handles badgeDate on the top of calander navbar
    // helps user show the currentDate on calander
    const today = new Date()
    const isActiveCurrentMonth = activeMonthIndex === latestMonthIndex
    const activeBadgeDate = activeMonthIndex === latestMonthIndex ? String(today.getDate()) : activeMonth.days.findLast((day) => !day.muted)?.date

    return (
        <div className="relative">
            <Card className="mb-6 overflow-hidden rounded-2xl shadow-2xl">
                <CardHeader className="flex flex-col gap-5 space-y-0 border-b p-5 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-4">
                        <Card className="overflow-hidden rounded-lg text-center shadow-sm">
                            <div className="bg-muted px-5 py-1 text-xs font-bold uppercase tracking-widest text-muted-foreground">
                                {activeMonth.badgeMonth}
                            </div>
                            <div className="px-5 py-2 text-2xl font-bold">
                                {activeBadgeDate}
                            </div>
                        </Card>

                        <div>
                            <CardTitle className="text-2xl font-bold tracking-tight">
                                {activeMonth.title}
                            </CardTitle>
                            <CardDescription className="mt-1 text-sm">
                                {activeMonth.range}
                            </CardDescription>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex overflow-hidden rounded-md border bg-background">
                            <Button
                                variant="ghost"
                                className="h-10 rounded-none px-4"
                                disabled={activeMonthIndex === 0}
                                onClick={() => setActiveMonthIndex((index) => index - 1)}
                            >
                                ←
                            </Button>
                            <Button
                                variant="ghost"
                                className="h-10 rounded-none border-x px-5 text-sm font-semibold"
                                onClick={() => setActiveMonthIndex(latestMonthIndex)}
                            >
                                Today
                            </Button>
                            <Button
                                variant="ghost"
                                className="h-10 rounded-none px-4"
                                disabled={activeMonthIndex === latestMonthIndex}
                                onClick={() => setActiveMonthIndex((index) => index + 1)}
                            >
                                →
                            </Button>
                        </div>
                        <RedirectButton />
                    </div>
                </CardHeader>

                <CardContent className="p-0">
                    <div className="hidden sm:grid grid-cols-7 border-b bg-muted/40">
                        {weekDays.map((day) => (
                            <div key={day} className="border-r py-3 text-center text-sm font-medium text-muted-foreground last:border-r-0">
                                {day}
                            </div>
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7">
                        {activeMonth.days.map((day, index) => (
                            <div
                                key={`${day.date}-${index}`}
                                className={`min-h-[150px] border-r border-t p-3 last:border-r-0 lg:last:border-r ${day.muted ? "bg-muted/30 text-muted-foreground" : "bg-card text-card-foreground"}`}
                            >
                                <div className={`mb-3 flex h-7 w-7 items-center justify-center text-sm font-semibold ${isActiveCurrentMonth && !day.muted && day.date === String(today.getDate()) ? "rounded-full bg-primary text-primary-foreground" : ""}`}>
                                    {day.date}
                                </div>

                                <div className="space-y-2">
                                    {day.events.map((event, eventIndex) => (
                                        <Badge
                                            key={`${event.title}-${eventIndex}`}
                                            variant="outline"
                                            className={`block w-full truncate rounded-md px-2.5 py-1.5 text-sm font-semibold ${getCoachingClassBadgeStyle(event.title)}`}
                                        >
                                            <span>{event.title}</span>
                                            {event.time && <span className="float-right ml-2 font-medium opacity-80">{event.time}</span>}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <BookClassBottomHover />
        </div>
    )
}


function RedirectButton() {
    return (
        <Link href={COACHING_CLASSES_WHATSAPP_MESSAGE_LINK} target="_blank">
            <Button variant="secondary" className="h-10 px-5 text-sm font-semibold">
                Book Demo
            </Button>
        </Link>
    )
}

function BookClassBottomHover() {
    const [isOpen, setIsOpen] = useState(true)

    if (!isOpen) {
        return (
            <Button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-4 right-4 z-50 h-12 w-12 rounded-full bg-[#25D366] p-0 shadow-[0_20px_50px_rgba(37,211,102,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_24px_60px_rgba(37,211,102,0.55)] sm:bottom-5 sm:right-5 sm:h-14 sm:w-14"
            >
                <WHATSAPP_ICON_SVG_CODE />
            </Button>
        )
    }

    return (
        <Card className="fixed bottom-3 left-1/2 z-50 w-[calc(100%-1rem)] max-w-sm -translate-x-1/2 overflow-hidden rounded-2xl border border-white/20 bg-white/70 shadow-[0_20px_80px_rgba(0,0,0,0.18)] backdrop-blur-2xl dark:bg-zinc-900/70 sm:bottom-4 sm:w-[calc(100%-1.5rem)] sm:max-w-xl sm:rounded-3xl lg:max-w-3xl">
            <CardContent className="relative flex flex-col gap-3 p-3 pt-4 sm:flex-row sm:items-center sm:gap-4 sm:p-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="absolute right-2 top-2 h-8 w-8 rounded-full"
                >
                    <X className="h-4 w-4" />
                </Button>

                <div className="flex min-w-0 flex-1 items-start gap-3 pr-8 sm:items-center sm:gap-4 sm:pr-0">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#25D366] shadow-lg sm:h-14 sm:w-14">
                        <WHATSAPP_ICON_SVG_CODE />

                        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-400" />
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-semibold leading-tight">
                                IELTS Go Global
                            </h3>

                            <span className="rounded-full bg-[#25D366]/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#128C4A]">
                                Online
                            </span>
                        </div>

                        <p className="mt-1 text-sm leading-5 text-muted-foreground">
                            Hi! Need help choosing the right IELTS batch?
                        </p>

                        <p className="text-xs text-muted-foreground">
                            Usually replies within a few minutes
                        </p>
                    </div>
                </div>

                <div className="hidden text-right lg:block">
                    <p className="text-xs text-muted-foreground">
                        WhatsApp
                    </p>

                    <p className="font-semibold">
                        +91 95554 88118
                    </p>
                </div>

                <Button
                    asChild
                    className="h-11 w-full rounded-xl bg-[#25D366] px-5 font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#1ebe5d] sm:w-auto sm:shrink-0"
                >
                    <Link
                        href={COACHING_CLASSES_WHATSAPP_MESSAGE_LINK}
                        target="_blank"
                        className="justify-center"
                    >
                        <div className="mr-2 h-4 w-4">
                            <WHATSAPP_ICON_SVG_CODE />
                        </div>

                        Start Chat
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}
