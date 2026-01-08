'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { SpotlightTargetManager } from './_lib/background-overlay/use-spotlight-target'
import SpotlightOverlay from './background-overlay/SpotlightOverlay'
import { useOnboardingTourGate } from './_lib/manage-routes/use-onboarding-tour-gate'
import { SCENE_REGISTRY, TOUR_FLOW_BY_ROUTE, TourSceneId } from './_lib/scene-map/scene-registry'

type TourState = {
    index: number
    rect: DOMRect | null
    targetId: string | null
    ended: boolean
}

export type OverlayMode = 'preview' | 'focus' | 'none'

export type TourSceneProps = {
    next: () => void
    setTarget: (id: string | null) => void
    overlay: OverlayMode
    endTourForRoute: () => void
}

export default function OnboardingTourController() {
    const pathname = usePathname()
    const { ready, allowed } = useOnboardingTourGate(pathname)

    if (!ready || !allowed) return null

    const flow = TOUR_FLOW_BY_ROUTE[pathname]
    if (!flow) return null

    return <TourController key={pathname} flow={flow} />
}

class TourController extends React.PureComponent<
    { flow: TourSceneId[] },
    TourState
> {
    state: TourState = {
        index: 0,
        rect: null,
        targetId: null,
        ended: false,
    }

    private spotlight = new SpotlightTargetManager()

    componentDidUpdate(_: {}, prev: TourState) {
        if (prev.targetId !== this.state.targetId) {
            this.spotlight.restore(prev.targetId)
            this.spotlight.focus(this.state.targetId, rect => {
                this.setState({ rect })
            })
        }
    }

    componentWillUnmount() {
        this.spotlight.restore(this.state.targetId)
    }

    private next = () => {
        this.setState(state => ({
            index: Math.min(state.index + 1, this.props.flow.length - 1),
            rect: null,
        }))
    }

    private setTarget = (id: string | null) => {
        this.setState({ targetId: id })
    }

    private endTourForRoute = () => {
        this.spotlight.restore(this.state.targetId)

        this.setState({
            ended: true,
            rect: null,
            targetId: null,
        })
    }

    render() {
        const { flow } = this.props
        const { index, rect, targetId, ended } = this.state

        if (ended) return null

        const sceneId = flow[index]
        const Scene = SCENE_REGISTRY[sceneId]

        const overlayMode: OverlayMode =
            targetId === null ? 'preview' : 'focus'

        return (
            <>
                {overlayMode === 'preview' && (
                    <SpotlightOverlay mode="preview" />
                )}

                {overlayMode === 'focus' && rect && (
                    <SpotlightOverlay mode="focus" rect={rect} />
                )}

                <div className="fixed inset-0 z-[12] pointer-events-none">
                    <Scene next={this.next} setTarget={this.setTarget} endTourForRoute={this.endTourForRoute} />
                </div>
            </>
        )
    }
}