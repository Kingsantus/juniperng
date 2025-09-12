"use client"
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowUp, Facebook, Linkedin, Mail, Phone, Twitter } from "lucide-react";
import { Separator } from "./ui/separator";

export function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const quickLinks = [
        { label: 'Technology Consulting', href: '#services' },
        { label: 'Civil Construction', href: '#services' },
        { label: 'Quality Standards', href: '#quality' },
        { label: 'About Us', href: '#about' },
        { label: 'Contact', href: '#contact' }
    ];

    const services = [
        'Network Infrastructure',
        'Hardware Solutions',
        'Software Integration',
        'Construction Design',
        'Project Management',
        'Structural Building'
    ];

    return (
        <footer className="bg-muted/30 border-t border-border">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center justify-center w-10 h-10 bg-zinc-100 dark:bg-zinc-900/30 rounded-lg">
                                <Image
                                    src="/logo.png"
                                    alt="jupiterng logo"
                                    width={25}
                                    height={25}
                                    className="rounded"
                                />
                            </div>
                            <div>
                                <h3 className="font-semibold text-foreground">Jupiterng</h3>
                                <p className="text-xs text-muted-foreground">Tech & Construction</p>
                            </div>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            Leading the future of sustainable technology and construction solutions.
                            Building smarter, greener, and more efficient infrastructure for tomorrow.
                        </p>
                        <div className="flex space-x-3">
                            <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                                <Linkedin className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                                <Twitter className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="w-9 h-9 p-0">
                                <Facebook className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Quick Links</h4>
                        <nav className="space-y-2">
                            {quickLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    className="block text-sm text-muted-foreground hover:text-[#036082] dark:hover:text-[#B22222] transition-colors duration-200"
                                >
                                    {link.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Services */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Our Services</h4>
                        <nav className="space-y-2">
                            {services.map((service, index) => (
                                <div key={index} className="text-sm text-muted-foreground">
                                    {service}
                                </div>
                            ))}
                        </nav>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-4">
                        <h4 className="font-semibold text-foreground">Contact Info</h4>
                        <div className="space-y-3">
                            {/* <div className="flex items-start space-x-3">
                                <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                                <div className="text-sm text-muted-foreground">
                                    <div>123 Innovation Drive</div>
                                    <div>Tech City, TC 12345</div>
                                </div>
                            </div> */}
                            <div className="flex items-center space-x-3">
                                <Phone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">+234 (802) 222-8423</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <Mail className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">info@jupiterng.com</span>
                            </div>
                        </div>
                        <div className="pt-2">
                            <p className="text-xs text-muted-foreground mb-2">Business Hours:</p>
                            <p className="text-xs text-muted-foreground">Mon - Fri: 8:00 AM - 6:00 PM</p>
                            <p className="text-xs text-muted-foreground">Sat: 9:00 AM - 4:00 PM</p>
                        </div>
                    </div>
                </div>

                <Separator className="my-8" />

                {/* Bottom Footer */}
                <div className="py-6 flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-muted-foreground">
                        <p>&copy; 2025 Jupiterng. All rights reserved.</p>
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-[#036082] dark:hover:text-[#B22222] transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-[#036082] dark:hover:text-[#B22222] transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="hover:text-[#036082] dark:hover:text-[#B22222] transition-colors">
                                Cookie Policy
                            </a>
                        </div>
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={scrollToTop}
                        className="flex items-center space-x-2 text-muted-foreground hover:text-[#036082] dark:hover:text-[#B22222]"
                    >
                        <ArrowUp className="h-4 w-4" />
                        <span>Back to Top</span>
                    </Button>
                </div>
            </div>
        </footer>
    );
}
