import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "./login-form"
import AdminLoginHero from "./admin-login.jpg"
import Image from "next/image"
import Link from "next/link"

export default function PartnerLogin({ onSuccess }: { onSuccess: () => void }) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            <div className="flex flex-col gap-4 p-6 md:p-10">
                <div className="flex justify-center gap-2 md:justify-start">
                    <a href="#" className="flex items-center gap-2 font-medium">
                        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                            <GalleryVerticalEnd className="size-4" />
                        </div>
                        IELTS Go Global
                    </a>

                    <Link
                        href="/"
                        className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                        {"<"} Back
                    </Link>
                </div>
                <div className="flex flex-1 items-center justify-center">
                    <div className="w-full max-w-xs">
                        <LoginForm onSuccess={() => onSuccess()} />
                    </div>
                </div>
            </div>
            <div className="relative hidden bg-muted lg:block">
                <Image
                    src={AdminLoginHero}
                    alt="Image"
                    className="absolute inset-0 h-full w-full object-cover"
                    fill
                />
            </div>
        </div>
    )
}
