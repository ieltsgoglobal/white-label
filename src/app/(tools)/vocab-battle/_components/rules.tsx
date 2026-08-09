"use client"

import { BookOpen, Clock, Trophy, Zap } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const rules = [
  { icon: Clock, title: "Answer together", text: "Both players answer before the next word appears." },
  { icon: Trophy, title: "Score points", text: "Each correct answer adds one point to your score." },
  { icon: BookOpen, title: "Finish five words", text: "Final scores appear after question five." },
]

export function RulesDialog({ triggerClassName }: { triggerClassName?: string }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className={triggerClassName}>
          <BookOpen className="mr-2 h-4 w-4" />
          Rules
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[calc(100svh-2rem)] overflow-y-auto rounded-2xl border-2 bg-white p-4 shadow-[3px_6px_0_0_rgba(0,0,0,0.15)] sm:max-w-xl sm:rounded-3xl sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-extrabold sm:text-2xl">Battle Rules</DialogTitle>
        </DialogHeader>

        <div className="rounded-2xl border-2 bg-[#fff7e6] p-4 shadow-[0_5px_0_0_rgba(0,0,0,0.12)] sm:rounded-3xl sm:p-5 sm:shadow-[0_6px_0_0_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-[5px] border-[#ffad15] bg-[#ff9700] text-white shadow-[0_6px_0_#d87700] sm:h-16 sm:w-16 sm:shadow-[0_7px_0_#d87700]">
              <Zap className="h-7 w-7 sm:h-8 sm:w-8" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ff8a00]">
                Five-word duel
              </p>
              <p className="mt-1 text-lg font-extrabold sm:text-xl">
                Fast answers. Simple scoring.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {rules.map((rule) => (
            <RuleItem key={rule.title} {...rule} />
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function RuleItem({
  icon: Icon,
  title,
  text,
}: {
  icon: LucideIcon
  title: string
  text: string
}) {
  return (
    <div className="flex gap-3 rounded-2xl border-2 bg-white p-3 shadow-[0_5px_0_0_rgba(0,0,0,0.12)] sm:gap-4 sm:p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff7e6] text-[#ff8a00]">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}
