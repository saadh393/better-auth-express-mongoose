"use client"

import { AuthForm } from "@/components/auth/auth-form";
import { Navbar } from "@/components/layout/navbar";
import { motion } from "framer-motion";

export default function LoginPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-black font-sans selection:bg-indigo-500/30">
            <Navbar />
            <main className="relative flex min-h-screen w-full items-center justify-center py-20 px-6">
                {/* Decorative elements */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] -z-10" />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <AuthForm />
                </motion.div>
            </main>
        </div>
    );
}
