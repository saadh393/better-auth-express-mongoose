"use client"

import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"
import { Globe, Loader2, Monitor, Shield, Smartphone } from "lucide-react"
import { Button } from "../ui/button"
import { Badge, Card } from "../ui/card"

export function DeviceSessionManager() {
    const { data: sessions, isPending, refetch } = authClient.multiSession.useListDeviceSessions()

    const terminateSession = async (tokenId: string) => {
        const confirmed = window.confirm("Terminate this session? You will be logged out on that device.")
        if (!confirmed) return

        const { error } = await authClient.multiSession.revokeSession({
            id: tokenId
        })

        if (error) {
            alert(error.message)
        } else {
            await refetch()
        }
    }

    const getDeviceIcon = (ua: string) => {
        if (/mobile|android|iphone/i.test(ua)) return <Smartphone className="w-4 h-4" />
        return <Monitor className="w-4 h-4" />
    }

    if (isPending) return (
        <Card className="p-6 flex items-center justify-center min-h-[300px]">
            <Loader2 className="animate-spin text-indigo-500 w-8 h-8" />
        </Card>
    )

    return (
        <Card className="p-6 border-zinc-200 dark:border-zinc-800 flex flex-col h-full uppercase-titles">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600">
                    <Shield className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Active Sessions</h3>
                    <p className="text-sm text-zinc-500">Multisession tracking enabled</p>
                </div>
            </div>

            <div className="flex-1 space-y-3">
                {sessions?.map((session: any) => (
                    <div
                        key={session.id}
                        className={cn(
                            "group flex items-center justify-between p-4 rounded-2xl transition-all border",
                            session.isCurrent
                                ? "bg-indigo-500/5 border-indigo-500/20 shadow-sm"
                                : "bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        )}
                    >
                        <div className="flex items-center gap-3">
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm border",
                                session.isCurrent
                                    ? "bg-indigo-600 text-white border-indigo-500"
                                    : "bg-white dark:bg-zinc-800 text-zinc-400 border-zinc-100 dark:border-zinc-700"
                            )}>
                                {getDeviceIcon(session.userAgent || "")}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 max-w-[120px] md:max-w-none truncate">
                                        {session.userAgent?.split(' ')[0] || "Unknown Client"}
                                    </span>
                                    {session.isCurrent && (
                                        <Badge className="bg-indigo-600 text-[9px] px-1.5 py-0 border-none font-black text-white">ACTIVE NOW</Badge>
                                    )}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-medium">
                                    <Globe className="w-3 h-3" />
                                    <span>{new Date(session.createdAt).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span className="truncate max-w-[100px]">{session.ipAddress || "Local IP"}</span>
                                </div>
                            </div>
                        </div>

                        {!session.isCurrent && (
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-9 px-3 text-[11px] font-bold text-red-500 hover:text-white hover:bg-red-600 rounded-xl"
                                onClick={() => terminateSession(session.id)}
                            >
                                REVOKE
                            </Button>
                        )}
                    </div>
                ))}
            </div>

            <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 font-medium">
                <p>Tracking {sessions?.length} session{sessions?.length !== 1 ? 's' : ''}</p>
                <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Security Monitored
                </div>
            </div>
        </Card>
    )
}
