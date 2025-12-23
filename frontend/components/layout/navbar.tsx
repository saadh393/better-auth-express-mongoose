"use client"

import { authClient } from "@/lib/auth-client"
import { Shield } from "lucide-react"
import Link from "next/link"
import { Button } from "../ui/button"

export function Navbar() {
    const { data: session } = authClient.useSession()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-4 bg-white/70 dark:bg-black/70 backdrop-blur-xl border-b border-zinc-200 dark:border-zinc-800">
            <Link href="/" className="flex items-center gap-2 group">
                <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg shadow-indigo-500/20">
                    <Shield className="text-white w-5 h-5" />
                </div>
                <div className="flex flex-col">
                    <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 leading-none">BetterAuth</span>
                    <span className="text-[10px] text-zinc-500 font-medium uppercase tracking-wider">Express Demo</span>
                </div>
            </Link>

            <div className="hidden md:flex items-center gap-1 bg-zinc-100/50 dark:bg-zinc-900/50 p-1 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <Link href="/#features"><Button variant="ghost" size="sm" className="rounded-lg">Features</Button></Link>
                <Link href="/#docs"><Button variant="ghost" size="sm" className="rounded-lg">Docs</Button></Link>
                <Link href="/#community"><Button variant="ghost" size="sm" className="rounded-lg">Community</Button></Link>
            </div>

            <div className="flex items-center gap-3">
                {session ? (
                    <Link href="/dashboard">
                        <Button size="sm" className="rounded-xl">Dashboard</Button>
                    </Link>
                ) : (
                    <>
                        <Link href="/login" className="hidden sm:block">
                            <Button variant="ghost" size="sm">Sign In</Button>
                        </Link>
                        <Link href="/login">
                            <Button size="sm" className="rounded-xl px-6">Get Started</Button>
                        </Link>
                    </>
                )}
            </div>
        </nav>
    )
}
