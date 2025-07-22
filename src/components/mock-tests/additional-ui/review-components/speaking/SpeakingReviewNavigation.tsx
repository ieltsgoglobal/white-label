// components/ReviewSectionNavigation.tsx

interface ReviewSectionNavigationProps {
  onSelect: (index: number) => void
}

export default function SpeakingReviewNavigation({ onSelect }: ReviewSectionNavigationProps) {
  const parts = ["Part A", "Part B", "Part C"]

  return (
    <div className="w-full overflow-x-auto scrollbar-hide max-h-12 mt-5 rounded-3xl px-2 py-1 bg-muted/40 border border-border">
      <div className="h-full flex flex-col md:flex-row">
        {parts.map((part, index) => (
          <div
            key={part}
            className="flex-1 flex items-center justify-center relative group"
            onClick={() => onSelect(index)}
          >
            <div className="text-center group-hover:scale-105 transition-transform duration-300">
              <h2 className="text-sm font-bold text-foreground tracking-wider mb-1">{part}</h2>
              <div className="w-16 h-0.5 bg-slate-300 mx-auto" />
            </div>

            {/* Divider (except last item) */}
            {index < parts.length - 1 && (
              <div className="absolute right-0 top-0 h-full w-px bg-slate-200" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}