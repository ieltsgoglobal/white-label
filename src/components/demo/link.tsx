"use client";

import NextLink from "next/dist/client/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, ElementRef, MouseEvent } from "react";
import { forwardRef } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

const Link = forwardRef<ElementRef<typeof NextLink>, LinkProps>(({ href, onMouseEnter, prefetch = false, ...props }, ref) => {
    const router = useRouter();

    function handleMouseEnter(event: MouseEvent<HTMLAnchorElement>) {

        // run the onMouseEnter logic first if any
        onMouseEnter?.(event);

        // prefetch the web-page on mouse-hover
        if (prefetch === false && typeof href === "string" && href.startsWith("/")) {
            router.prefetch(href)
        }
    }

    return (
        <NextLink
            ref={ref}
            href={href}
            prefetch={prefetch}
            onMouseEnter={handleMouseEnter}
            {...props}
        />
    );
}
);

Link.displayName = "Link";

export type { LinkProps };
export default Link;
