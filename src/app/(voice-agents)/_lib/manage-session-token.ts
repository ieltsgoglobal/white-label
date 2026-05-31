'use client';

import { TokenSource } from 'livekit-client';
import { AgentType } from '../agent/page';

type TokenResponse = {
    token: string;
    serverUrl: string;
};

export function createAgentTokenSource(agentType: AgentType) {
    const tokenPromiseJson: Promise<TokenResponse> = fetch('/api/livekit/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ agentType }),
    }).then((r) => r.json());

    return TokenSource.custom(async () => {
        const { token, serverUrl } = await tokenPromiseJson;

        return { serverUrl, participantToken: token };
    });
}