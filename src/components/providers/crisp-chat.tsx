"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const CRISP_WEBSITE_ID = "f2a0fb87-3301-4804-a6b3-035b5b218e6e";
const CRISP_SCRIPT_ID = "crisp-chat-script";

declare global {
  interface Window {
    $crisp?: unknown[][];
    CRISP_WEBSITE_ID?: string;
  }
}

export function CrispChat() {
  const pathname = usePathname();
  const isMockTest = pathname.startsWith("/mock-tests/");

  useEffect(() => {
    if (isMockTest) { window.$crisp?.push(["do", "chat:hide"]); return; }

    window.$crisp = window.$crisp || [];
    window.CRISP_WEBSITE_ID = CRISP_WEBSITE_ID;

    const existingScript = document.getElementById(CRISP_SCRIPT_ID);
    if (existingScript) { window.$crisp.push(["do", "chat:show"]); return }

    const script = document.createElement("script");
    script.id = CRISP_SCRIPT_ID;
    script.src = "https://client.crisp.chat/l.js";
    script.async = true;
    document.head.appendChild(script);

  }, [isMockTest]);

  return null;
}
