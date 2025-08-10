import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { CheckCircle2, Clock, Mail, Server, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type StepStatus = "complete" | "active" | "upcoming"

export type StepItem = {
    title: string
    description: string
    status: StepStatus
    icon: LucideIcon
}

type StepsProps = {
    createdAt?: string | Date | null
    subdomain: string
    email: string
}

export default function Steps({ subdomain, email }: StepsProps) {


    const steps: StepItem[] = [
        { title: "Form submitted", description: "We received your details", status: "complete", icon: CheckCircle2 },
        { title: "Domain reserved", description: `${subdomain}.ieltsgoglobal.com`, status: "complete", icon: ShieldCheck },
        { title: "Provisioning infrastructure", description: "Setting up database and storage", status: "active", icon: Server },
        { title: "Deploying template", description: "Publishing your mini site", status: "upcoming", icon: Clock },
        { title: "Quality check & email", description: "We’ll confirm within one day", status: "upcoming", icon: Mail },
    ]

    return (
        <Card className="order-2 md:order-1">
            <CardHeader>
                <CardTitle>Setup Progress</CardTitle>
                <CardDescription>Track the steps as we provision your mini site</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <div className="mb-2 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">2 of 5 completed</span>
                        <span className="font-medium">{35}%</span>
                    </div>
                    <Progress value={20} className="h-2" />
                </div>

                <ol className="space-y-4">
                    {steps.map((item, idx) => {
                        const Icon = item.icon
                        return (
                            <li key={idx} className="relative">
                                <div className="flex items-start gap-3">
                                    <div
                                        className={cn(
                                            "mt-0.5 grid h-8 w-8 place-items-center rounded-full border",
                                            item.status === "complete" && "border-emerald-200 bg-emerald-50 text-emerald-600",
                                            item.status === "active" && "border-teal-200 bg-teal-50 text-teal-600",
                                            item.status === "upcoming" && "border-muted bg-background text-muted-foreground",
                                        )}
                                        aria-hidden="true"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </div>
                                    <div className="min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="truncate font-medium">{item.title}</p>
                                            <Badge
                                                variant="secondary"
                                                className={cn(
                                                    "hidden sm:inline-flex",
                                                    item.status === "complete" && "border-emerald-200 bg-emerald-50 text-emerald-700",
                                                    item.status === "active" && "border-teal-200 bg-teal-50 text-teal-700",
                                                )}
                                            >
                                                {item.status}
                                            </Badge>
                                        </div>
                                        {item.description ? (
                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                        ) : null}
                                    </div>
                                </div>
                            </li>
                        )
                    })}
                </ol>

                <Alert>
                    <Clock className="h-4 w-4" />
                    <AlertTitle>Estimated time</AlertTitle>
                    <AlertDescription>Under 24 hours. We’ll email {email} once it’s live.</AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    )
}