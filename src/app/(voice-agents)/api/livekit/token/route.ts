import { NextRequest, NextResponse } from "next/server";
import { AccessToken } from "livekit-server-sdk";
import { RoomAgentDispatch, RoomConfiguration } from "@livekit/protocol";
import { type AgentType } from "@/app/(voice-agents)/agent/page";


const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY;
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET;
const LIVEKIT_URL = process.env.LIVEKIT_URL;

export async function POST(req: NextRequest) {

    const { agentType } = await req.json() as { agentType: AgentType };

    const roomName = `room-${Date.now()}`;
    const identity = `user-${Date.now()}`;
    const agentName = `my-agent`;

    const at = new AccessToken(LIVEKIT_API_KEY!, LIVEKIT_API_SECRET!, { identity, name: identity });

    at.metadata = JSON.stringify({ agentType });

    at.addGrant({ room: roomName, roomJoin: true, canPublish: true, canSubscribe: true });

    at.roomConfig = new RoomConfiguration({ agents: [new RoomAgentDispatch({ agentName })] });

    return NextResponse.json({ token: await at.toJwt(), serverUrl: LIVEKIT_URL });
}