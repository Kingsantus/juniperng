"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./theme-goggle";
import Link from "next/link";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { label: "Services", href: "#services" },
        { label: "Quality", href: "#quality" },
        { label: "Contact", href: "#contact" },
        { label: "ID Card Request", href: "#idcardrequestform" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white dark:bg-gray-950/95 backdrop-blur border-b border-border">
            <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-2">
                        <Image
                            src="/logo.png"
                            alt="jupiterng logo"
                            width={35}
                            height={35}
                            className="rounded"
                        />
                        <div>
                            <h1 className="font-semibold text-lg text-[#036082] dark:text-[#B22222]">
                                Jupiterng
                            </h1>
                            <p className="text-xs text-muted-foreground">
                                Tech & Construction
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href={item.href}
                                className="text-sm font-medium text-foreground hover:text-[#036082] dark:hover:text-[#B22222] transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    {/* Theme Toggle & CTA */}
                    <div className="hidden md:flex items-center space-x-4">
                        <ThemeToggle />
                        <Link
                            href="#contact"
                            className="inline-flex items-center px-4 py-2 rounded-md bg-[#036082] hover:bg-[#024866] dark:bg-[#B22222] dark:hover:bg-[#8B1A1A] text-white text-sm font-medium transition-colors"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ThemeToggle />
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="w-9 h-9 p-0"
                        >
                            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden border-t border-border bg-white dark:bg-gray-950">
                        <nav className="py-4 space-y-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    className="block px-4 py-2 text-sm font-medium text-foreground hover:text-[#036082] dark:hover:text-[#B22222] transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    {item.label}
                                </a>
                            ))}
                            <div className="px-4 pt-2">
                                <Link
                                    href="#contact"
                                    className="inline-flex items-center px-4 py-2 rounded-md bg-[#036082] hover:bg-[#024866] dark:bg-[#B22222] dark:hover:bg-[#8B1A1A] text-white text-sm font-medium transition-colors"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
}
