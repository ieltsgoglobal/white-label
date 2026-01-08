'use client'

import React from 'react'

type Props =
    | { mode: 'preview' }
    | { mode: 'focus'; rect: DOMRect }

export default function SpotlightOverlay(props: Props) {
    if (props.mode === 'preview') {
        return (
            <>
                <div className="spotlight-preview fixed inset-0 z-[11] pointer-events-none" />
                <style jsx>{`
                    .spotlight-preview {
                        background: rgba(0, 0, 0, 0.6);
                        animation: previewFadeIn 0.3s ease-out forwards;
                    }

                    @keyframes previewFadeIn {
                        from {
                            opacity: 0;
                        }
                        to {
                            opacity: 1;
                        }
                    }
                `}</style>
            </>
        )
    }

    const { rect } = props
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const r = Math.max(rect.width, rect.height) / 2 + 24

    return (
        <>
            <div
                className="spotlight-focus fixed inset-0 z-[11] pointer-events-none"
                style={
                    {
                        '--x': `${x}px`,
                        '--y': `${y}px`,
                        '--r': `${r}px`,
                    } as React.CSSProperties
                }
            />
            <style jsx>{`
                .spotlight-focus {
                    background: radial-gradient(
                        circle at var(--x) var(--y),
                        transparent 0,
                        transparent var(--r),
                        rgba(0, 0, 0, 0.7) calc(var(--r) + 1px)
                    );
                    animation: spotlightClose 0.45s ease-out forwards;
                }

                @keyframes spotlightClose {
                    from {
                        background: radial-gradient(
                            circle at 50% 50%,
                            transparent 0,
                            transparent 80vmax,
                            rgba(0, 0, 0, 0.7) 80vmax
                        );
                    }
                    to {
                        background: radial-gradient(
                            circle at var(--x) var(--y),
                            transparent 0,
                            transparent var(--r),
                            rgba(0, 0, 0, 0.7) calc(var(--r) + 1px)
                        );
                    }
                }
            `}</style>
        </>
    )
}