// components/LoadingScreen.tsx
"use client";

import Image from "next/image";

export default function LoadingScreen() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden">
            {/* Animated background blobs */}
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${3 + Math.random() * 4}s`,
                        }}
                    />
                ))}
            </div>

            {/* Logo / Brand */}
            <div className="relative z-10 flex flex-col items-center gap-8">
                <div className="relative">
                    {/* Pulsing rings */}
                    <div className="absolute inset-0 rounded-full bg-primary/30 animate-ping" />
                    <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />

                    {/* Logo placeholder - replace with your logo */}
                    <div >
                        <Image
                            src="/assets/dlclogo.png"
                            alt="Logo"
                            width={80}
                            height={80}
                            className="w-full h-full object-contain" />
                    </div>
                </div>

                {/* Spinner */}
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-white/10 border-t-primary rounded-full animate-spin" />

                    {/* Loading text with animation */}
                    <div className="flex items-center gap-1">
                        <span className="text-white text-sm font-medium tracking-widest uppercase">Loading</span>
                        <span className="flex gap-1">
                            <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                            <span className="w-1 h-1 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full animate-progress" />
                    </div>
                </div>

                {/* Tagline */}
                <p className="text-white/60 text-xs tracking-wider animate-pulse">
                    Saintly Intellectuals
                </p>
            </div>
        </div>
    );
}
