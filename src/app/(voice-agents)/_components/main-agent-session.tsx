'use client';

import {
    VideoTrack,
    useAgent,
    useSessionContext,
    useSessionMessages,
} from '@livekit/components-react';
import { useTheme } from 'next-themes';

import { AgentAudioVisualizerAura } from '@/components/agents-ui/agent-audio-visualizer-aura';
import { AgentControlBar } from '@/components/agents-ui/agent-control-bar';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { AgentToolDisplayHelper } from './agent-tool-display-helper';

type AgentSessionProps = {
    onEndSession?: () => void;
};

export function ClientAgentSession({ onEndSession }: AgentSessionProps) {
    const { resolvedTheme } = useTheme();
    const { microphoneTrack, state } = useAgent();
    const session = useSessionContext();
    const cameraTrack = session.local.cameraTrack;

    // show Transcript logic
    const { messages } = useSessionMessages();
    const latestMessages = [...messages].reverse();
    const latestTranscript = latestMessages.find((message) => message.type === 'userTranscript' || message.type === 'agentTranscript');
    const transcript = latestTranscript?.message.trim();
    const speaker = latestTranscript?.type === 'userTranscript' ? 'You' : 'Agent';

    return (
        <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--muted))_0%,transparent_48%)] opacity-60" />

            <section className="relative flex min-h-screen flex-col px-4 py-5 sm:px-6 lg:px-8">
                <header className="w-full flex justify-end">
                    <Badge variant="secondary" className="capitalize">
                        {state}
                    </Badge>
                </header>

                <div className="relative flex flex-1 items-center justify-center pb-28 pt-8">
                    <div className="flex w-full max-w-3xl flex-col items-center justify-center">
                        <div className="relative flex min-h-[360px] w-full items-center justify-center sm:min-h-[460px]">
                            <div className="absolute h-64 w-64 rounded-full bg-primary/10 blur-3xl sm:h-80 sm:w-80" />
                            <AgentAudioVisualizerAura
                                audioTrack={microphoneTrack}
                                color={state === 'listening' ? '#2563EB' : '#F8FAFC'} // we use it so user can visually tell its thier turn to speak
                                colorShift={0.04}
                                size="xl"
                                state={state}
                                themeMode={resolvedTheme === 'dark' ? 'dark' : 'light'}
                            />
                        </div>
                    </div>

                    {cameraTrack ? (
                        <Card className="absolute right-0 top-1/2 hidden aspect-video w-36 -translate-y-1/2 overflow-hidden rounded-xl border-border bg-card/80 p-0 shadow-xl backdrop-blur sm:block lg:w-44">
                            <VideoTrack
                                trackRef={cameraTrack}
                                className="h-full w-full object-cover"
                            />
                        </Card>
                    ) : null}
                </div>

                <div className="fixed inset-x-0 bottom-28 px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
                            {speaker}
                        </p>

                        <p className="text-xl sm:text-2xl font-medium leading-relaxed">
                            {transcript || 'Listening...'}
                        </p>
                    </div>
                </div>

                <div className="z-[22] pointer-events-none fixed inset-x-0 bottom-0 px-4 pb-5 sm:px-6 lg:px-8">
                    <div className="pointer-events-auto mx-auto max-w-6xl">
                        <AgentControlBar
                            className={cn(
                                'w-full border-border bg-card/90 shadow-2xl backdrop-blur supports-[backdrop-filter]:bg-card/80',
                                '[&_button]:h-12',
                            )}
                            controls={{
                                camera: true,
                                chat: true,
                                leave: true,
                                microphone: true,
                                screenShare: true,
                            }}
                            isConnected={session.isConnected}
                            onDisconnect={onEndSession}
                            variant="livekit"
                        />
                    </div>
                </div>

                <AgentToolDisplayHelper session={session} />
            </section>
        </main>
    );
}
