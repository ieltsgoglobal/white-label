'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSession } from '@livekit/components-react';

import { AgentSessionProvider } from '@/components/agents-ui/agent-session-provider';
import DotPulseLoader from '@/components/loaders/mock-tests/speaking/DotPulseLoader';
import { useSearchParams } from 'next/navigation';
import { createAgentTokenSource } from '../_lib/manage-session-token';
import { ClientAgentSession } from '../_components/main-agent-session';
import { useSidebar } from '@/hooks/use-sidebar';

export type AgentType =
    | 'study-abroad-counselor'
    | 'ielts-speaking-partner';

export default function Page() {
    const searchParams = useSearchParams();
    const agentType = searchParams.get('agentType') as AgentType;

    const tokenSource = useMemo(() => createAgentTokenSource(agentType), []);

    const session = useSession(tokenSource);

    // closes the sidebar on load
    useEffect(() => {
        useSidebar.getState().setIsOpen(false);
    }, []);

    useEffect(() => {
        session.start().catch(() => window.location.href = '/agent/unavailable');
        return () => {
            session.end();
        };
    }, []);

    if (!session.isConnected) return <DotPulseLoader />

    return (
        <AgentSessionProvider session={session}>
            <ClientAgentSession onEndSession={async () => { await session.end(); window.location.href = `/${agentType}` }} />
        </AgentSessionProvider>
    );
}
