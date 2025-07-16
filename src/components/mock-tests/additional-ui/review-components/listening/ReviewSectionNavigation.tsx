// components/ElegantStrip.tsx

export default function ReviewSectionNavigation() {
  const parts = ["Part A", "Part B", "Part C", "Part D"]

  return (
    <div className="max-w-[95vw] overflow-x-auto scrollbar-hide max-h-12 mt-5 rounded-3xl px-2 py-1 bg-gradient-to-r from-slate-50 via-white to-slate-50 border-y border-slate-200">
      <div className="h-full flex flex-col md:flex-row">
        {parts.map((part, index) => (
          <div
            key={part}
            className="flex-1 flex items-center justify-center relative group"
          >
            <div className="text-center group-hover:scale-105 transition-transform duration-300">
              <h2 className="text-sm font-light text-slate-700 tracking-wider mb-1">{part}</h2>
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