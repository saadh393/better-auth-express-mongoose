"use client"

import { authClient } from "@/lib/auth-client"
import { Fingerprint, Info, Key, Loader2, Plus, Smartphone, Trash2 } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

export function PasskeyManager() {
    const { data: passkeys, refetch, isPending: isLoadingList } = authClient.useListPasskeys()
    const [isAdding, setIsAdding] = useState(false)

    const addPasskey = async () => {
        try {
            setIsAdding(true)
            const { data, error } = await authClient.passkey.addPasskey({
                name: `Device - ${new Date().toLocaleDateString()}`
            })

            if (error) {
                alert(error.message || "Failed to add passkey")
            } else {
                await refetch()
            }
        } catch (err) {
            console.error(err)
        } finally {
            setIsAdding(false)
        }
    }

    const deletePasskey = async (id: string) => {
        const confirmed = window.confirm("Are you sure you want to remove this passkey?")
        if (!confirmed) return

        const { error } = await authClient.passkey.deletePasskey({
            id: id
        })

        if (error) {
            alert(error.message)
        } else {
            await refetch()
        }
    }

    return (
        <Card className="p-6 border-zinc-200 dark:border-zinc-800 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600">
                        <Key className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="font-bold text-zinc-900 dark:text-zinc-100">Passkeys</h3>
                        <p className="text-sm text-zinc-500">Hardware-based authentication</p>
                    </div>
                </div>
                <Button
                    onClick={addPasskey}
                    size="sm"
                    className="gap-2"
                    disabled={isAdding}
                >
                    {isAdding ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                    <span className="hidden sm:inline">Add Passkey</span>
                </Button>
            </div>

            <div className="flex-1 space-y-3">
                {isLoadingList ? (
                    <div className="flex items-center justify-center py-12">
                        <Loader2 className="w-6 h-6 animate-spin text-zinc-300" />
                    </div>
                ) : passkeys?.length === 0 ? (
                    <div className="text-center py-12 rounded-2xl bg-zinc-50 dark:bg-zinc-900/30 border border-dashed border-zinc-200 dark:border-zinc-800">
                        <Fingerprint className="w-10 h-10 mx-auto text-zinc-300 mb-3" />
                        <p className="text-sm text-zinc-500 font-medium">No passkeys registered</p>
                        <p className="text-xs text-zinc-400 mt-1 max-w-[200px] mx-auto">Registration required for passwordless login.</p>
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {passkeys?.map((pk: any) => (
                            <div key={pk.id} className="flex items-center justify-between p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 group hover:border-indigo-500/30 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className="w-9 h-9 rounded-lg bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-zinc-100 dark:border-zinc-700">
                                        <Smartphone className="w-4 h-4 text-zinc-400 group-hover:text-indigo-500 transition-colors" />
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100 truncate max-w-[140px]">
                                            {pk.name || "Unnamed Key"}
                                        </span>
                                        <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">
                                            ID: {pk.id.slice(0, 8)}...
                                        </span>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-9 w-9 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-xl"
                                    onClick={() => deletePasskey(pk.id)}
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/10 flex gap-3">
                <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-zinc-500 leading-relaxed italic">
                    Passkeys utilize public-key cryptography to provide a more secure and convenient alternative to passwords.
                </p>
            </div>
        </Card>
    )
}
