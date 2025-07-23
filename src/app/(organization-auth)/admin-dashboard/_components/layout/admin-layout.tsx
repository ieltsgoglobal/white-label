"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    BarChart3,
    Users,
    Briefcase,
    Settings,
    Menu,
    LogOut,
    User,
    X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import PurchaseCreditsButton from "./purchase-credits-button"


interface AdminLayoutProps {
    children: React.ReactNode
    activeTab: string
    setActiveTab: (tab: string) => void
}

const navigation = [
    { name: "Dashboard", key: "dashboard", icon: BarChart3 },
    { name: "User Management", key: "users", icon: Users },
    { name: "Transaction Management", key: "jobs", icon: Briefcase },
]

export function AdminLayout({ children, activeTab, setActiveTab }: AdminLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false)

    const renderNav = (isMobile: boolean = false) => (
        <nav className="flex-1 space-y-1 px-2 py-4">
            {navigation.map((item) => (
                <button
                    key={item.key}
                    onClick={() => {
                        setSidebarOpen(false)
                        setActiveTab(item.key)
                    }}
                    className={cn(
                        activeTab === item.key
                            ? "bg-blue-50 border-r-2 border-blue-600 text-blue-700"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
                        "w-full text-left group flex items-center px-2 py-2 text-sm font-medium rounded-md"
                    )}
                >
                    <item.icon
                        className={cn(
                            activeTab === item.key ? "text-blue-500" : "text-gray-400 group-hover:text-gray-500",
                            "mr-3 h-5 w-5 flex-shrink-0"
                        )}
                    />
                    {item.name}
                </button>
            ))}
        </nav>
    )

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setSidebarOpen(false)} />
                    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl">
                        <div className="flex h-full flex-col">
                            <div className="flex h-16 items-center justify-between border-b bg-white px-4">
                                <h1 className="text-xl font-bold text-blue-600">ExtrUp Admin</h1>
                                <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                                    <X className="h-6 w-6" />
                                </Button>
                            </div>
                            {renderNav(true)}
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
                <div className="flex min-h-0 flex-1 flex-col bg-white border-r border-gray-200">
                    <div className="flex h-16 items-center justify-center border-b bg-white px-4">
                        <h1 className="text-xl font-bold text-blue-600">ExtrUp Admin</h1>
                    </div>
                    <div className="flex flex-1 flex-col overflow-y-auto">
                        {renderNav(true)}
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Top navigation */}
                <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white border-b border-gray-200">
                    <Button variant="ghost" size="icon" className="lg:hidden ml-3 mt-3" onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Open sidebar</span>
                    </Button>

                    <div className="flex flex-1 justify-between px-4">
                        <div className="flex flex-1">
                            <div className="flex w-full md:ml-0">
                                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                                    {/* Search can be added here */}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                            <div><PurchaseCreditsButton /></div>
                            <div className="ml-4 flex items-center md:ml-6">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                                                <AvatarFallback>AD</AvatarFallback>
                                            </Avatar>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-56" align="end" forceMount>
                                        <DropdownMenuLabel className="font-normal">
                                            <div className="flex flex-col space-y-1">
                                                <p className="text-sm font-medium leading-none">Admin User</p>
                                                <p className="text-xs leading-none text-muted-foreground">admin@extrup.com</p>
                                            </div>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <User className="mr-2 h-4 w-4" />
                                            <span>Profile</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Settings</span>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <LogOut className="mr-2 h-4 w-4" />
                                            <span>Log out</span>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1">{children}</main>
            </div>
        </div>
    )
}
