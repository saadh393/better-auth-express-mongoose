"use client"

import { authClient } from "@/lib/auth-client"
import { ArrowRightLeft, Fingerprint, Loader2, Lock, Mail, Shield, User } from "lucide-react"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { Input } from "../ui/input"

export function AuthForm() {
    const [isSignUp, setIsSignUp] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [isPending, setIsPending] = useState(false)

    useEffect(() => {
        // Only run if the browser supports it
        if (typeof window !== "undefined" && window.PublicKeyCredential?.isConditionalMediationAvailable?.()) {
            authClient.signIn.passkey({ autoFill: true }).catch((err) => {
                console.log("Conditional mediation not available or cancelled", err);
            });
        }
    }, [])

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsPending(true)

        const options = {
            onSuccess: () => {
                setIsPending(false)
                window.location.href = "/dashboard"
            },
            onError: (ctx: any) => {
                setIsPending(false)
                alert(ctx.error.message)
            }
        }

        try {
            if (isSignUp) {
                await authClient.signUp.email({ email, password, name, callbackURL: "/dashboard" }, options)
            } else {
                await authClient.signIn.email({ email, password, callbackURL: "/dashboard" }, options)
            }
        } catch (err) {
            console.error("Auth Exception:", err);
            setIsPending(false);
        }
    }

    const handlePasskey = async () => {
        setIsPending(true);
        try {
            const { error } = await authClient.signIn.passkey({
                autoFill: false,
            });

            if (error) {
                alert(error.message);
            } else {
                window.location.href = "/dashboard";
            }
        } catch (err) {
            console.error("Passkey exception:", err);
        } finally {
            setIsPending(false);
        }
    }

    return (
        <Card className="w-full max-w-md p-8 shadow-2xl border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl">
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-xs uppercase tracking-widest mb-1">
                        <Shield className="w-3.5 h-3.5" />
                        Implementation Demo
                    </div>
                    <h1 className="text-3xl font-black tracking-tighter text-zinc-900 dark:text-zinc-100">
                        {isSignUp ? "Register Account" : "Welcome Back"}
                    </h1>
                    <p className="text-sm text-zinc-500 font-medium">
                        Using Better Auth Email/Password + Passkeys
                    </p>
                </div>

                <form onSubmit={handleAuth} className="flex flex-col gap-4">
                    {isSignUp && (
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                                <Input
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="pl-10 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-950/50"
                                />
                            </div>
                        </div>
                    )}
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <Input
                                type="email"
                                placeholder="name@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email webauthn"
                                required
                                className="pl-10 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-950/50"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <div className="flex items-center justify-between">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400">Password</label>
                        </div>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                            <Input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password webauthn"
                                required
                                className="pl-10 h-11 rounded-xl bg-zinc-50 dark:bg-zinc-950/50"
                            />
                        </div>
                    </div>

                    <Button type="submit" disabled={isPending} className="mt-2 h-12 rounded-xl text-sm font-bold shadow-lg shadow-indigo-500/10">
                        {isPending ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <span className="flex items-center gap-2">
                                {isSignUp ? "CREATE ACCOUNT" : "SIGN IN"}
                                <ArrowRightLeft className="w-3.5 h-3.5 opacity-50" />
                            </span>
                        )}
                    </Button>
                </form>

                <div className="relative py-2">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                    </div>
                    <div className="relative flex justify-center text-[10px] font-black uppercase tracking-widest">
                        <span className="bg-white dark:bg-zinc-900 px-4 text-zinc-400">Security Options</span>
                    </div>
                </div>

                <Button
                    variant="outline"
                    onClick={handlePasskey}
                    disabled={isPending}
                    className="h-12 flex items-center gap-2 border-indigo-500/20 bg-indigo-500/[0.03] hover:bg-indigo-500/10 rounded-xl text-xs font-bold"
                >
                    <Fingerprint className="w-5 h-5 text-indigo-500" />
                    AUTHENTICATE WITH PASSKEY
                </Button>

                <div className="text-center">
                    <button
                        onClick={() => setIsSignUp(!isSignUp)}
                        className="text-xs font-bold text-zinc-500 hover:text-indigo-500 transition-colors uppercase tracking-widest flex items-center justify-center gap-2 mx-auto"
                    >
                        {isSignUp ? "Already registered?" : "Need an account?"}
                        <span className="text-indigo-500 underline underline-offset-4 decoration-2">
                            {isSignUp ? "SIGN IN" : "SIGN UP"}
                        </span>
                    </button>
                </div>
            </div>
        </Card>
    )
}
