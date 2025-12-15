"use client"

import React from "react"
import { Button } from "@/components/ui/button"

interface ResendOtpProps {
    onResend: () => Promise<void> | void
    autoStart?: boolean
    cooldownSeconds?: number
}

interface ResendOtpState {
    cooldown: number
}

const RESEND_TIME_SECONDS = 35

export class ResendOtp extends React.Component<
    ResendOtpProps,
    ResendOtpState
> {
    static defaultProps = {
        autoStart: true,
        cooldownSeconds: RESEND_TIME_SECONDS,
    }

    private intervalId: NodeJS.Timeout | null = null

    constructor(props: ResendOtpProps) {
        super(props)
        this.state = { cooldown: 0 }
    }

    componentDidMount() {
        if (this.props.autoStart) {
            this.startCooldown()
        }
    }

    componentWillUnmount() {
        this.clearTimer()
    }

    startCooldown = () => {
        this.clearTimer()

        this.setState({ cooldown: this.props.cooldownSeconds! })

        this.intervalId = setInterval(() => {
            this.setState((prev) => {
                if (prev.cooldown <= 1) {
                    this.clearTimer()
                    return { cooldown: 0 }
                }
                return { cooldown: prev.cooldown - 1 }
            })
        }, 1000)
    }

    clearTimer() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }

    handleResend = () => {
        if (this.state.cooldown > 0) return

        this.startCooldown()

        Promise.resolve(this.props.onResend()).catch(() => { })
    }

    render() {
        const { cooldown } = this.state
        const canResend = cooldown === 0

        return (
            <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                    Didn’t receive OTP?
                </span>

                <Button
                    type="button"
                    variant="link"
                    className="h-auto p-0"
                    disabled={!canResend}
                    onClick={this.handleResend}
                >
                    {canResend ? "Resend OTP" : `Resend in ${cooldown}s`}
                </Button>
            </div>
        )
    }
}