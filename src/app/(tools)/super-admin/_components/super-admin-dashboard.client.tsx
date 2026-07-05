"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { SuperAdminDashboardRow } from "../_lib/super-admin-server-functions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CreditCard, Phone } from "lucide-react";

export function SuperAdminDashboardClient({ rows, totalUsers }: { rows: SuperAdminDashboardRow[]; totalUsers: number }) {
    return (
        <Card>
            <CardHeader>
                <div className="w-full flex justify-between">
                    <div>
                        <CardTitle>Users</CardTitle>
                        <CardDescription>
                            Showing practice stats for {totalUsers} users.
                        </CardDescription>
                    </div>
                    <PaginationButtons />
                </div>
            </CardHeader>
            <CardContent>
                <TooltipProvider>
                    <div className="rounded-md border">
                        <Table className="min-w-[900px] table-fixed">
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[120px]">Date Added</TableHead>
                                    <TableHead className="w-[220px]">User</TableHead>
                                    <TableHead className="w-[220px]">Email</TableHead>
                                    <TableHead className="w-[140px]">Phone</TableHead>
                                    <TableHead className="w-[120px]">Subscription</TableHead>
                                    <TableHead className="w-[120px]">Mock Tests</TableHead>
                                    <TableHead className="w-[140px]">Total Practices</TableHead>
                                    <TableHead className="w-[140px]">Last Practiced</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rows.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center text-sm text-muted-foreground">No users found.</TableCell>
                                    </TableRow>
                                ) : rows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="text-sm text-muted-foreground">{formatDate(row.createdAt)}</TableCell>
                                        <CopyableNameCell name={row.name} />
                                        <CopyableTooltipCell value={row.email} muted />
                                        <CopyableTooltipCell value={row.phone} />
                                        <SubscriptionCell row={row} />
                                        <TableCell className="text-sm font-semibold">{row.mockTestsCount}</TableCell>
                                        <PracticeStatsCell row={row} />
                                        <TableCell className="text-sm whitespace-nowrap text-muted-foreground">{formatRelativeDate(row.lastPracticedAt)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </TooltipProvider>
            </CardContent>
        </Card >
    );
}

// MISC CODE

function CopyableNameCell({ name }: { name: string }) {
    return (
        <TableCell onClick={() => copyToClipboard(name)}>
            <div className="text-sm font-medium cursor-copy">{name}</div>
        </TableCell>
    );
}

function CopyableTooltipCell({ value, muted = false }: { value: string; muted?: boolean }) {
    return (
        <TableCell onClick={() => copyToClipboard(value)} className={muted ? "text-sm text-muted-foreground cursor-copy" : "text-sm cursor-copy"}>
            <Tooltip>
                <TooltipTrigger asChild><span className="block truncate">{value}</span></TooltipTrigger>
                <TooltipContent>{value}</TooltipContent>
            </Tooltip>
        </TableCell>
    );
}

function SubscriptionCell({ row }: { row: SuperAdminDashboardRow }) {
    const paymentLabel = row.lastPaymentAmount ? `₹${row.lastPaymentAmount}` : "Never";

    return (
        <TableCell>
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="cursor-help underline decoration-dotted underline-offset-4">{paymentLabel}</span>
                </TooltipTrigger>
                <TooltipContent className="space-y-1 text-xs">
                    <div>Current Member: <strong>{row.isMember ? "Yes" : "No"}</strong></div>
                    <div>Last Payment: <strong>{paymentLabel}</strong></div>
                    <div>Paid On: {formatDate(row.lastPaymentAt)}</div>
                    <div>Expires On: <strong>{formatDate(row.membershipExpiresAt)}</strong></div>
                </TooltipContent>
            </Tooltip>
        </TableCell>
    );
}

function PracticeStatsCell({ row }: { row: SuperAdminDashboardRow }) {
    return (
        <TableCell className="text-sm font-semibold">
            <Tooltip>
                <TooltipTrigger asChild>
                    <span className="cursor-help underline decoration-dotted underline-offset-4">{row.totalPractices}</span>
                </TooltipTrigger>
                <TooltipContent>
                    <div className="space-y-1 text-xs">
                        <div>Listening: {row.listeningCount}</div>
                        <div>Reading: {row.readingCount}</div>
                        <div>Writing: {row.writingCount}</div>
                        <div>Speaking: {row.speakingCount}</div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TableCell>
    );
}

function copyToClipboard(text: string) {
    if (!text) return;
    navigator.clipboard.writeText(text);
}

const formatDate = (value: string | null) => value ? new Date(value).toLocaleString() : "-";

function formatRelativeDate(value: string | null) {
    if (!value) return "-";

    const date = new Date(value);
    const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (Number.isNaN(diffDays)) return "-";
    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Yesterday";

    return `${diffDays} days ago`;
}

export function PaginationButtons() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const offset = Number(searchParams.get("offset") ?? 0) || 0;
    const hasPhoneNumber = searchParams.get("hasPhoneNumber") === "true";
    const isMember = searchParams.get("isMember") === "true";

    function pushParams(updates: Record<string, string | null>) {
        const params = new URLSearchParams(searchParams);
        Object.entries(updates).forEach(([key, value]) => value === null ? params.delete(key) : params.set(key, value));
        router.push(`${pathname}?${params.toString()}`);
    }

    function changeOffset(step: number) {
        pushParams({ offset: String(Math.max(0, offset + step)) });
    }

    return (

        <div className="flex flex-wrap gap-2">
            <Button
                variant={hasPhoneNumber ? "default" : "outline"}
                onClick={() => pushParams({ hasPhoneNumber: hasPhoneNumber ? null : "true", offset: "0" })}
            >
                <Phone className="mr-2 h-4 w-4" /> Has phone
            </Button>

            <Button
                variant={isMember ? "default" : "outline"}
                onClick={() => pushParams({ isMember: isMember ? null : "true", offset: "0" })}
            >
                <CreditCard className="mr-2 h-4 w-4" /> Members
            </Button>

            <Button
                variant="outline"
                onClick={() => changeOffset(-50)}
                disabled={offset === 0}
            >
                <ChevronLeft className="mr-2 h-4 w-4" /> Previous 50
            </Button>

            <Button
                variant="outline"
                onClick={() => changeOffset(50)}
            >
                Next 50 <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
        </div>
    );
}
