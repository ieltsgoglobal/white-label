"use client";

import { useEffect, useState } from "react";
import { Copy } from "lucide-react";

function isInstagramBrowser(): boolean {
    return typeof navigator !== "undefined" && /Instagram/i.test(navigator.userAgent);
}

export default function InstaSwitchProvider() {
    const [url, setUrl] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        if (isInstagramBrowser()) setUrl(window.location.href);
    }, []);

    if (!url) return null;

    async function copyLink() {
        try {
            await navigator.clipboard.writeText(url);
            setStatus("Link copied. Paste it into your browser.");
        } catch {
            setStatus("Press and hold the link below to copy it.");
        }
    }

    return (
        <section
            aria-labelledby="instagram-browser-title"
            className="fixed inset-0 z-[100] overflow-y-auto bg-[#102b49] px-6 pb-10 pt-24 text-white"
        >
            <span aria-hidden="true" className="pointer-events-none absolute right-5 top-4 block h-16 w-20">
                <span className="absolute inset-0 rounded-br-[4rem] border-b-[3px] border-r-[3px] border-white" />
                <span className="absolute -right-[7px] -top-0.5 h-4 w-4 rotate-45 border-l-[3px] border-t-[3px] border-white" />
            </span>

            <div className="mx-auto max-w-[22rem] text-center">
                <h1 id="instagram-browser-title" className="text-xl font-medium leading-relaxed">
                    Tap <span className="rounded-md bg-white/15 px-2 py-1" aria-label="the three-dot menu">⋯</span>{" "}
                    then <strong className="font-semibold">Open in browser</strong>
                </h1>
                <p className="mt-2 text-sm text-slate-200">
                    Choose <strong>Open in Chrome</strong> if you see it instead.
                </p>

                <div className="my-6 flex items-center gap-3 text-sm text-slate-300">
                    <span aria-hidden="true" className="h-px flex-1 bg-white/25" />
                    or
                    <span aria-hidden="true" className="h-px flex-1 bg-white/25" />
                </div>

                <button
                    type="button"
                    onClick={copyLink}
                    className="inline-flex min-h-11 items-center gap-2 rounded-md px-3 text-base focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                    <Copy aria-hidden="true" className="size-4" />
                    Copy link
                </button>
                <input
                    aria-label="Page link"
                    className="mt-2 w-full rounded-md bg-white/10 px-3 py-2 text-base text-slate-200"
                    readOnly
                    value={url}
                    onFocus={(event) => event.currentTarget.select()}
                />
                <p role="status" className="mt-2 text-sm text-slate-200">{status}</p>
                <p className="mt-6 text-sm font-semibold text-white">IELTS Go Global</p>
            </div>
        </section>
    );
}
