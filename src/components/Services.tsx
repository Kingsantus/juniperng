import { ArrowRight, Building, Cpu, FileText, Hammer, Network, Shield, Users, Wifi } from "lucide-react";
import { ImageWithFallback } from "./imageError/ImageWithFallback";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";

export function Services() {
    const techServices = [
        {
            icon: <Network className="h-6 w-6" />,
            title: "Network Infrastructure",
            description: "Design and implement robust network solutions for optimal connectivity and performance."
        },
        {
            icon: <Cpu className="h-6 w-6" />,
            title: "Hardware Solutions",
            description: "Custom hardware procurement, installation, and maintenance for your business needs."
        },
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Software Integration",
            description: "Seamless software solutions and system integrations to streamline your operations."
        },
        {
            icon: <Wifi className="h-6 w-6" />,
            title: "IT Consulting",
            description: "Strategic technology guidance to drive digital transformation and efficiency."
        }
    ];

    const constructionServices = [
        {
            icon: <FileText className="h-6 w-6" />,
            title: "Design & Planning",
            description: "Comprehensive architectural design and project planning with sustainability focus."
        },
        {
            icon: <Hammer className="h-6 w-6" />,
            title: "Construction Management",
            description: "End-to-end project management ensuring quality, timeline, and budget adherence."
        },
        {
            icon: <Building className="h-6 w-6" />,
            title: "Green Building",
            description: "Eco-friendly construction practices and sustainable building certifications."
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Project Consulting",
            description: "Expert consultation for complex construction projects and regulatory compliance."
        }
    ];

    return (
        <section id="services" className="py-16 sm:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Comprehensive Solutions for Modern Challenges
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        From cutting-edge technology infrastructure to sustainable construction projects,
                        we deliver integrated solutions that drive innovation and growth.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Technology Consulting */}
                    <div className="space-y-8">
                        <div className="relative">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1664526937033-fe2c11f1be25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JrJTIwdGVjaG5vbG9neSUyMGNvbnN1bHRpbmd8ZW58MXx8fHwxNzU3MzM4MTI0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Network technology consulting"
                                width={1080}
                                height={720}
                                className="w-full h-64 object-cover rounded-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent rounded-xl"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-xl font-semibold">Technology Consulting</h3>
                                <p className="text-zinc-100">Hardware • Software • Networks</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {techServices.map((service, index) => (
                                <Card key={index} className="border border-border hover:shadow-md transition-shadow duration-200">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center justify-center w-10 h-10 bg-zinc-100 dark:bg-zinc-800/30 rounded-lg text-[#036082] dark:text-[#B22222]">
                                                {service.icon}
                                            </div>
                                            <CardTitle className="text-base">{service.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <CardDescription>{service.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* <Button
                            variant="outline"
                            className="w-full border-[#036082] text-[#036082] hover:bg-[#036082]/10 dark:border-[#B22222] dark:text-[#B22222] dark:hover:bg-[#B22222]/10"
                        >
                            Learn More About Tech Services
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button> */}
                    </div>

                    {/* Civil Construction */}
                    <div className="space-y-8">
                        <div className="relative">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1630404991412-9504d094e8ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMGdyZWVuJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzU3MzM4MTIzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Sustainable green building"
                                width={1080}
                                height={720}
                                className="w-full h-64 object-cover rounded-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/80 to-transparent rounded-xl"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <h3 className="text-xl font-semibold">Civil Construction</h3>
                                <p className="text-zinc-100">Design • Build • Management</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {constructionServices.map((service, index) => (
                                <Card key={index} className="border border-border hover:shadow-md transition-shadow duration-200">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex items-center justify-center w-10 h-10 bg-zinc-100 dark:bg-zinc-800/30 rounded-lg text-[#036082] dark:text-[#B22222]">
                                                {service.icon}
                                            </div>
                                            <CardTitle className="text-base">{service.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <CardDescription>{service.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* <Button
                            variant="outline"
                            className="w-full border-[#036082] text-[#036082] hover:bg-[#036082]/10 dark:border-[#B22222] dark:text-[#B22222] dark:hover:bg-[#B22222]/10"
                        >
                            Learn More About Construction Services
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
