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
      <DialogContent className="rounded-3xl border-2 bg-white p-6 shadow-[3px_6px_0_0_rgba(0,0,0,0.15)] sm:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold">Battle Rules</DialogTitle>
        </DialogHeader>

        <div className="rounded-3xl border-2 bg-[#fff7e6] p-5 shadow-[0_6px_0_0_rgba(0,0,0,0.12)]">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-[5px] border-[#ffad15] bg-[#ff9700] text-white shadow-[0_7px_0_#d87700]">
              <Zap className="h-8 w-8" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#ff8a00]">
                Five-word duel
              </p>
              <p className="mt-1 text-xl font-extrabold">
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
    <div className="flex gap-4 rounded-2xl border-2 bg-white p-4 shadow-[0_5px_0_0_rgba(0,0,0,0.12)]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fff7e6] text-[#ff8a00]">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="font-bold">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground">{text}</p>
      </div>
    </div>
  )
}
