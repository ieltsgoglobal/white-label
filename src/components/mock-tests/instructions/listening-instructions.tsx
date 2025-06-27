"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ListeningInstructions({ onNext }: { onNext: () => void }) {
    return (
        <div className="w-full min-h-screen flex items-center justify-center p-6">
            <Card className="w-full max-w-2xl rounded-2xl border shadow-2xl">
                <CardContent className="p-10 space-y-6  text-center">
                    <h1 className="text-4xl font-bold">IELTS Listening Test Instructions</h1>

                    <p className="text-lg leading-relaxed text-slate-900">
                        The Listening section of the IELTS test consists of <strong>four recordings</strong>.
                        These include both <em>conversations</em> and <em>monologues</em> set in a variety of contexts and accents.
                    </p>

                    <p className="text-lg leading-relaxed text-slate-800">
                        You will be asked to answer a total of <strong>40 questions</strong>. Each set of questions relates to the audio you will hear.
                        The audio will <strong>play automatically</strong> and <u>you can listen only once</u>, so it's important to pay close attention.
                    </p>

                    <p className="text-lg leading-relaxed text-slate-700">
                        Before each section begins, you will be given a short amount of time to <strong>read the questions</strong>.
                        Use this time wisely to understand what you're listening for.
                    </p>

                    <p className="text-lg leading-relaxed text-slate-600">
                        The recordings are designed to test your ability to understand main ideas, specific factual information,
                        opinions, and the speaker’s purpose. Stay focused and try to anticipate what you might hear.
                    </p>

                    <Button
                        className="mt-4 rounded-2xl px-8 py-3 text-base font-semibold bg-white text-slate-800 hover:bg-slate-200 transition"
                        onClick={onNext}
                    >
                        Start Listening Test
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}