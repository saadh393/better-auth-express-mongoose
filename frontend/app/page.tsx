"use client"

import { Navbar } from "@/components/layout/navbar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/card";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import { ArrowRight, Code2, Fingerprint, Github, Shield, Terminal } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { data: session } = authClient.useSession();

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#050505] text-zinc-900 dark:text-zinc-100 selection:bg-indigo-500/30 font-sans">
      <Navbar />

      {/* Hero Section */}
      <main className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[800px] -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(67,56,202,0.08),transparent_50%)]" />

        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-8 py-1.5 px-4 rounded-full bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5" />
              Developer Demonstration
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] text-zinc-900 dark:text-white"
          >
            Better Auth + Express <br /> <span className="text-zinc-500">Implementation Guide</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="max-w-2xl text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-12 leading-relaxed"
          >
            This is a reference project showing how to integrate <b>Better Auth</b> with an <b>Express.js</b> backend and <b>Mongoose/MongoDB</b>.
            Explore the implementation of modern authentication primitives in a real-world stack.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link href={session ? "/dashboard" : "/login"}>
              <Button size="lg" className="h-14 px-10 text-lg rounded-2xl group">
                Try Live Demo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="https://github.com/better-auth/better-auth" target="_blank">
              <Button variant="outline" size="lg" className="h-14 px-10 text-lg rounded-2xl gap-2 font-bold">
                <Github className="w-5 h-5" />
                View Code
              </Button>
            </Link>
          </motion.div>

          {/* Implementation Focus */}
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left"
          >
            <motion.div variants={item}>
              <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 transition-all">
                <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-600 mb-6">
                  <Fingerprint className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">Passkey Flow</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Integration of <code>@better-auth/passkey</code> for biometric and hardware-based passwordless authentication.</p>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 transition-all">
                <div className="w-10 h-10 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">Session Mgmt</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Using <code>multiSession</code> plugin to handle concurrent device logins and session termination via Express middleware.</p>
              </div>
            </motion.div>

            <motion.div variants={item}>
              <div className="p-8 rounded-3xl bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 transition-all">
                <div className="w-10 h-10 bg-teal-500/10 rounded-xl flex items-center justify-center text-teal-600 mb-6">
                  <Code2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold mb-2">Mongoose Adapter</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">Configuring the MongoDB adapter to work with Mongoose schemas and existing database connections.</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>

      {/* Code Snippet Preview (Visual Only) */}
      <section className="py-20 px-6 bg-zinc-50/50 dark:bg-zinc-900/10">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl bg-zinc-900 border border-zinc-800 overflow-hidden shadow-2xl">
            <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800/50 border-b border-zinc-700/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>
              <span className="text-xs text-zinc-500 font-mono ml-4">backend/src/libs/auth.ts</span>
            </div>
            <div className="p-6 font-mono text-sm overflow-x-auto">
              <pre className="text-indigo-300">
                {`export const auth = betterAuth({
    database: mongodbAdapter(db),
    plugins: [
        passkey(),
        multiSession()
    ]
});`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-zinc-200 dark:border-zinc-800 text-center">
        <p className="text-sm text-zinc-500">
          This is an open-source demonstration project. Built with Better Auth.
        </p>
      </footer>
    </div>
  );
}
