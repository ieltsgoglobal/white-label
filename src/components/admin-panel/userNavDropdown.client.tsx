"use client"

import Link from "next/link";
import { GraduationCap, LayoutGrid, LogOut, ShieldCheck, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
    TooltipProvider
} from "@/components/ui/tooltip";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/auth/session/sign-out";
import { useEffect, useState } from "react";
import { getClientSubdomain } from "@/lib/utils/isSubdomain.client";

type UserInfo = {
    id: string
    name: string
    role: string
}

export function SignInOut(user: UserInfo) {
    const handleSignOut = async () => {

        if (user.role !== "guest") {
            const success = await signOut();
            if (success) {
                window.location.href = "/";
            }
        }
    }

    return (
        <>
            {user.role !== "guest" &&
                <div onClick={handleSignOut} className="flex items-center  bg-red w-full h-full px-2 py-1.5">
                    <LogOut className="w-4 h-4 mr-3 text-muted-foreground" />
                    {user.role === "guest" ? "Student Log In" : "Sign out"}
                </div>
            }
        </>

    )
}

export default function UserNavDropdown({ user }: { user: UserInfo }) {
    const [subdomain, setSubdomain] = useState<string | null>(null);

    useEffect(() => {
        setSubdomain(getClientSubdomain());
    }, []);

    return (
        <DropdownMenu>
            <TooltipProvider disableHoverableContent>
                <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="outline"
                                className="relative h-8 w-8 rounded-full"
                            >
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src="#" alt="Avatar" />
                                    <AvatarFallback className="bg-transparent">
                                        {user.name
                                            ?.split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                            .slice(0, 2)
                                            .toUpperCase()
                                        }
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">Profile</TooltipContent>
                </Tooltip>
            </TooltipProvider>

            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                            Type: {user.role}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    {subdomain !== null &&
                        <>
                            <DropdownMenuItem className="hover:cursor-pointer" asChild>
                                <Link href="/" className="flex items-center">
                                    <LayoutGrid className="w-4 h-4 mr-3 text-muted-foreground" />
                                    Dashboards
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="ml-2 hover:cursor-pointer" asChild>
                                <Link href="/admin-dashboard" className="flex items-center">
                                    <ShieldCheck className="w-4 h-4 mr-3 text-muted-foreground" />
                                    Admin Dashbord
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="ml-2 hover:cursor-pointer" asChild>
                                <Link href="/teacher-dashboard" className="flex items-center">
                                    <GraduationCap className="w-4 h-4 mr-3 text-muted-foreground" />
                                    Teacher Dashboard
                                </Link>
                            </DropdownMenuItem>
                        </>
                    }
                    <DropdownMenuItem className="ml-2 hover:cursor-pointer" asChild>
                        <Link href="/login/student" className="flex items-center">
                            <User className="w-4 h-4 mr-3 text-muted-foreground" />
                            Student Login
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem className="hover:cursor-pointer p-0" onClick={() => { }}>
                    {SignInOut(user)}
                </DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}