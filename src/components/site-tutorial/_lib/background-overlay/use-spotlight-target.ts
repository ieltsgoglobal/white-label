/**
 * Manages temporary DOM focus for spotlight-based overlays.
 *
 * Responsibilities:
 * - Elevate a target element above the overlay
 * - Track its bounding rect across scroll / resize
 * - Smoothly animate rect changes (LERP)
 * - Restore original DOM styles on cleanup
 *
 * This is intentionally NOT a React component.
 * This class owns all imperative + animation logic.
 */
export class SpotlightTargetManager {
    private previousStyle = { zIndex: '', position: '' }

    private targetId: string | null = null
    private onRect: ((r: DOMRect) => void) | null = null

    private currentRect: DOMRect | null = null
    private rafId: number | null = null

    /**
     * Linear interpolation helper
     */
    private lerp(a: number, b: number, t = 0.2) {
        return a + (b - a) * t
    }

    /**
     * Reads DOM + animates rect toward latest layout
     */
    private update = () => {
        if (!this.targetId || !this.onRect) return

        const el = document.getElementById(this.targetId)
        if (!el) return

        const next = el.getBoundingClientRect()

        if (!this.currentRect) {
            this.currentRect = next
            this.onRect(next)
            return
        }

        const smoothRect = {
            ...next,
            left: this.lerp(this.currentRect.left, next.left),
            top: this.lerp(this.currentRect.top, next.top),
            width: this.lerp(this.currentRect.width, next.width),
            height: this.lerp(this.currentRect.height, next.height),
        } as DOMRect

        this.currentRect = smoothRect
        this.onRect(smoothRect)
    }

    /**
     * RAF loop to keep spotlight synced smoothly
     */
    private tick = () => {
        this.update()
        this.rafId = requestAnimationFrame(this.tick)
    }

    /**
     * Focus a DOM element and begin animated tracking
     */
    focus(id: string | null, onRect: (r: DOMRect) => void) {
        if (!id) return

        const el = document.getElementById(id)
        if (!el) return

        this.targetId = id
        this.onRect = onRect
        this.currentRect = null

        // Save existing inline styles
        this.previousStyle = {
            zIndex: el.style.zIndex,
            position: el.style.position,
        }

        // Elevate target above overlay
        el.style.position = 'relative'
        el.style.zIndex = '20'

        // Initial measurement
        this.update()

        // Start animation loop
        this.rafId = requestAnimationFrame(this.tick)

        // Track layout-affecting events
        window.addEventListener('scroll', this.update, true)
        window.addEventListener('resize', this.update)
    }

    /**
     * Restore DOM state and stop tracking
     */
    restore(id: string | null) {
        if (id) {
            const el = document.getElementById(id)
            if (el) {
                el.style.zIndex = this.previousStyle.zIndex
                el.style.position = this.previousStyle.position
            }
        }

        if (this.rafId) {
            cancelAnimationFrame(this.rafId)
            this.rafId = null
        }

        window.removeEventListener('scroll', this.update, true)
        window.removeEventListener('resize', this.update)

        this.targetId = null
        this.onRect = null
        this.currentRect = null
    }
}