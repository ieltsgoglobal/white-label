'use client';

import { useEffect, useState } from 'react';
import { UseSessionReturn } from '@livekit/components-react';
import { AnimatePresence, motion } from 'motion/react';
import { StudyAbroadLeadFormDisplay } from "./agent-display-registry/study-abroad-lead-form"

const AGENT_UI_RPC = 'agent_ui_request';

const AGENT_DISPLAY_MAP = {
    study_abroad_counselor_end_call_and_display_lead_form: <StudyAbroadLeadFormDisplay />,
} as const;

type AgentDisplayName = keyof typeof AGENT_DISPLAY_MAP;

export function AgentToolDisplayHelper({ session }: { session: UseSessionReturn }) {
    const [activeDisplay, setActiveDisplay] = useState<AgentDisplayName | null>(null);

    // registers the function-tool-calls as RPC
    // executes code in nextjs-env when nodejs-agent calls the tool in nodejs-env
    useEffect(() => {
        session.room.registerRpcMethod(AGENT_UI_RPC, async ({ payload }) => {
            const { display } = JSON.parse(payload) as { display?: AgentDisplayName };
            if (display && display in AGENT_DISPLAY_MAP) { setActiveDisplay(display) }
            return 'ok';
        });

        return () => { session.room.unregisterRpcMethod(AGENT_UI_RPC) };
    }, [session]);

    if (!activeDisplay) return null;

    return (
        <AnimatePresence>
            <motion.div
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-30 flex items-center justify-center bg-background/75 px-4 backdrop-blur-md"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
            >
                {AGENT_DISPLAY_MAP[activeDisplay]}
            </motion.div>
        </AnimatePresence>
    );
}