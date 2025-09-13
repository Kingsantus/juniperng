import { ArrowRight, Award, Building, Network } from "lucide-react";
import { ImageWithFallback } from "./imageError/ImageWithFallback";
// import { Button } from "./ui/button";
import Link from "next/link";

export function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900/20 dark:to-zinc-800/20 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12 items-center">
                    {/* Content - Takes up 2 columns */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800/30 text-[#036082] dark:text-[#B22222] px-3 py-1 rounded-full">
                                <Award className="h-4 w-4" />
                                <span className="text-sm">Sustainable Solutions Leader</span>
                            </div>
                            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                                Building the Future with
                                <span className="text-[#036082] dark:text-[#B22222]"> Smart Technology</span>
                            </h1>
                            <p className="text-base lg:text-lg text-muted-foreground">
                                Jupiterng combines cutting-edge technology consulting with innovative civil construction solutions.
                                We deliver sustainable, intelligent infrastructure that transforms communities and businesses.
                            </p>
                        </div>
                        {/* Key Services */}
                        <div className="flex flex-wrap gap-3">
                            <div className="flex items-center space-x-2 bg-white dark:bg-card p-3 rounded-lg shadow-sm border border-border">
                                <Network className="h-4 w-4 text-[#036082] dark:text-[#B22222]" />
                                <span className="text-sm">Tech Consulting</span>
                            </div>
                            <div className="flex items-center space-x-2 bg-white dark:bg-card p-3 rounded-lg shadow-sm border border-border">
                                <Building className="h-4 w-4 text-[#B22222] dark:text-[#FF6B6B]" />
                                <span className="text-sm">Civil Construction</span>
                            </div>
                        </div>
                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="#contact"
                                className="inline-flex items-center bg-[#036082] hover:bg-[#024866] text-white px-6 py-3 dark:bg-[#B22222] dark:hover:bg-[#8B1A1A] rounded-md transition-colors"
                            >
                                Start Your Project
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                            {/* <Button variant="outline" className="px-6 py-3 border-[#036082] text-[#036082] hover:bg-[#036082]/10 dark:border-[#B22222] dark:text-[#B22222] dark:hover:bg-[#B22222]/10">
                                View Our Work
                            </Button> */}
                        </div>
                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
                            <div>
                                <div className="font-bold text-[#036082] dark:text-[#B22222]">500+</div>
                                <div className="text-xs text-muted-foreground">Projects</div>
                            </div>
                            <div>
                                <div className="font-bold text-[#036082] dark:text-[#B22222]">98%</div>
                                <div className="text-xs text-muted-foreground">Satisfaction</div>
                            </div>
                            <div>
                                <div className="font-bold text-[#036082] dark:text-[#B22222]">15+</div>
                                <div className="text-xs text-muted-foreground">Years</div>
                            </div>
                        </div>
                    </div>
                    {/* Images - Takes up 3 columns */}
                    <div className="lg:col-span-3 space-y-4">
                        {/* Main Featured Image */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1686358244601-f6e65f67d4c6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBzaXRlJTIwZHJvbmUlMjBhZXJpYWx8ZW58MXx8fHwxNzU3MzM4NDUwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Aerial view of construction site"
                                width={1080}
                                height={720}  
                                className="w-full h-[300px] lg:h-[350px] object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="font-semibold text-lg">Civil Construction Excellence</h3>
                                <p className="text-sm opacity-90">Sustainable infrastructure development</p>
                            </div>
                        </div>
                        {/* Secondary Images Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="relative rounded-xl overflow-hidden shadow-lg">
                                <ImageWithFallback
                                    src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwc2VydmVycyUyMG5ldHdvcmt8ZW58MXx8fHwxNzU3MzM4NDUzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                    alt="Network technology servers"
                                    width={1080}
                                    height={720}
                                    className="w-full h-[140px] lg:h-[160px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent"></div>
                                <div className="absolute bottom-2 left-2 text-white">
                                    <h4 className="font-medium text-sm">Tech Solutions</h4>
                                    <p className="text-xs opacity-80">Network Infrastructure</p>
                                </div>
                            </div>
                            <div className="relative rounded-xl overflow-hidden shadow-lg">
                                <ImageWithFallback
                                    src="https://images.unsplash.com/photo-1561204652-a501fe30a82e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBjb25zdHJ1Y3Rpb24lMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzMzODEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                    alt="Modern construction technology"
                                    width={1080}
                                    height={720}
                                    className="w-full h-[140px] lg:h-[160px] object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 to-transparent"></div>
                                <div className="absolute bottom-2 left-2 text-white">
                                    <h4 className="font-medium text-sm">Smart Building</h4>
                                    <p className="text-xs opacity-80">Integrated Systems</p>
                                </div>
                            </div>
                        </div>
                        {/* Floating Quality Badge */}
                        {/* <div className="absolute -bottom-4 left-15 bg-white dark:bg-card p-3 rounded-xl shadow-xl border border-border lg:block hidden">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800/30 rounded-lg flex items-center justify-center">
                                    <Award className="h-4 w-4 text-[#036082] dark:text-[#B22222]" />
                                </div>
                                <div>
                                    <div className="font-semibold text-xs text-foreground">ISO Certified</div>
                                    <div className="text-xs text-muted-foreground">Quality Assured</div>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
