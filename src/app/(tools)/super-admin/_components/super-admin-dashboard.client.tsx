"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

type SuperAdminDashboardRow = {
    id: string;
    name: string;
    phone: string;
    email: string;
    createdAt: string | null;
    mockTestsCount: number;
    totalPractices: number;
    listeningCount: number;
    readingCount: number;
    writingCount: number;
    speakingCount: number;
    lastPracticedAt: string | null;
};

export function SuperAdminDashboardClient({
    rows,
    totalUsers,
}: {
    rows: SuperAdminDashboardRow[];
    totalUsers: number;
}) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

    const filteredRows = useMemo(
        () => filterRows(rows, searchQuery, selectedLetter),
        [rows, searchQuery, selectedLetter]
    );

    return (
        <Card>
            <CardHeader>
                <CardTitle>Users</CardTitle>
                <CardDescription>
                    Showing practice stats for {totalUsers} users.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col gap-4 mb-6">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                        <Input
                            placeholder="Search by name, email, phone, or user ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <AlphabetFilter value={selectedLetter} onChange={setSelectedLetter} />
                </div>

                <div className="rounded-md border">
                    <Table className="min-w-[900px] table-fixed">
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[120px]">Date Added</TableHead>
                                <TableHead className="w-[220px]">User</TableHead>
                                <TableHead className="w-[220px]">Email</TableHead>
                                <TableHead className="w-[140px]">Phone</TableHead>
                                <TableHead className="w-[120px]">Mock Tests</TableHead>
                                <TableHead className="w-[140px]">Total Practices</TableHead>
                                <TableHead className="w-[140px]">Last Practiced</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredRows.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="text-center text-sm text-muted-foreground">
                                        No users found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredRows.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {formatDate(row.createdAt)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="text-sm font-medium">{row.name}</div>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <span className="block truncate">{row.email}</span>
                                                    </TooltipTrigger>
                                                    <TooltipContent>{row.email}</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </TableCell>
                                        <TableCell className="text-sm">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <span className="block truncate">{row.phone}</span>
                                                    </TooltipTrigger>
                                                    <TooltipContent>{row.phone}</TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </TableCell>
                                        <TableCell className="text-sm font-semibold">{row.mockTestsCount}</TableCell>
                                        <TableCell className="text-sm font-semibold">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <span className="cursor-help underline decoration-dotted underline-offset-4">
                                                            {row.totalPractices}
                                                        </span>
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
                                            </TooltipProvider>
                                        </TableCell>
                                        <TableCell className="text-sm whitespace-nowrap text-muted-foreground">
                                            {formatRelativeDate(row.lastPracticedAt)}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

function AlphabetFilter({
    value,
    onChange,
}: {
    value: string | null;
    onChange: (letter: string | null) => void;
}) {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

    return (
        <div className="flex flex-wrap gap-2">
            <Button
                size="sm"
                variant={value === null ? "default" : "outline"}
                onClick={() => onChange(null)}
            >
                All
            </Button>
            {letters.map((letter) => (
                <Button
                    key={letter}
                    size="sm"
                    variant={value === letter ? "default" : "outline"}
                    onClick={() => onChange(letter)}
                    aria-pressed={value === letter}
                >
                    {letter}
                </Button>
            ))}
        </div>
    );
}

function filterRows(rows: SuperAdminDashboardRow[], q: string, initial: string | null) {
    if (!q && !initial) return rows;

    const query = q.trim().toLowerCase();

    return rows.filter((row) => {
        const name = row.name.toLowerCase();
        const email = row.email.toLowerCase();
        const phone = row.phone.toLowerCase();
        const id = row.id.toLowerCase();

        if (initial) {
            const i = initial.toLowerCase();
            const startsWithInitial = name.startsWith(i) || email.startsWith(i);

            if (!startsWithInitial) return false;
        }

        if (!query) return true;

        return name.includes(query) || email.includes(query) || phone.includes(query) || id.includes(query);
    });
}

function formatDate(value: string | null) {
    if (!value) return "-";
    return new Date(value).toLocaleDateString("en-GB");
}

function formatRelativeDate(value: string | null) {
    if (!value) return "-";

    const date = new Date(value);
    const diffDays = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (Number.isNaN(diffDays)) return "-";
    if (diffDays <= 0) return "Today";
    if (diffDays === 1) return "Yesterday";

    return `${diffDays} days ago`;
}
