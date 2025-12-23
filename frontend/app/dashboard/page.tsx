"use client"

import { DeviceSessionManager } from "@/components/auth/device-session-manager"
import { PasskeyManager } from "@/components/auth/passkey-manager"
import { Navbar } from "@/components/layout/navbar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import { motion } from "framer-motion"
import { LayoutDashboard, LogOut, Mail, Settings, ShieldCheck, UserCircle } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
    const { data: session, isPending } = authClient.useSession()
    const router = useRouter()

    useEffect(() => {
        if (!isPending && !session) {
            router.push("/login")
        }
    }, [session, isPending, router])

    if (isPending) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white dark:bg-black">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-indigo-600"></div>
            </div>
        )
    }

    if (!session) return null

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500/30">
            <Navbar />

            <main className="pt-32 pb-20 px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex flex-col gap-2">
                    <div className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Dashboard</div>
                    <Button variant="ghost" className="justify-start gap-3 bg-indigo-500/10 text-indigo-600 rounded-xl">
                        <LayoutDashboard className="w-4 h-4" />
                        Overview
                    </Button>
                    <Button variant="ghost" className="justify-start gap-3 rounded-xl">
                        <UserCircle className="w-4 h-4" />
                        Profile
                    </Button>
                    <Button variant="ghost" className="justify-start gap-3 rounded-xl">
                        <Settings className="w-4 h-4" />
                        Settings
                    </Button>

                    <div className="mt-auto pt-8">
                        <Button
                            variant="danger"
                            className="w-full justify-start gap-3 rounded-xl"
                            onClick={async () => {
                                await authClient.signOut()
                                router.push("/")
                            }}
                        >
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Button>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1 flex flex-col gap-8">
                    {/* Header Card */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <Card className="p-8 border-none bg-gradient-to-br from-indigo-600 to-purple-700 text-white shadow-2xl shadow-indigo-500/20 relative overflow-hidden">
                            <div className="absolute right-0 bottom-0 opacity-10 -mr-10 -mb-10 w-64 h-64 bg-white rounded-full blur-3xl" />

                            <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center text-4xl font-black border border-white/30 shadow-xl">
                                    {session.user.name?.[0] || session.user.email[0].toUpperCase()}
                                </div>
                                <div className="text-center md:text-left">
                                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                        <h1 className="text-4xl font-black tracking-tight tracking-tighter">
                                            {session.user.name || "Anonymous User"}
                                        </h1>
                                        <ShieldCheck className="w-6 h-6 text-indigo-300" />
                                    </div>
                                    <div className="flex items-center justify-center md:justify-start gap-2 text-indigo-100/80 font-medium">
                                        <Mail className="w-4 h-4" />
                                        {session.user.email}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            <PasskeyManager />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <DeviceSessionManager />
                        </motion.div>
                    </div>
                </div>
            </main>
        </div>
    )
}
