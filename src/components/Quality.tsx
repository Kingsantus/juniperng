import { Award, Badge, Clock, Leaf, Shield, Target, TrendingUp, Users, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { ImageWithFallback } from "./imageError/ImageWithFallback";

export function Quality() {
    const qualityFeatures = [
        {
            icon: <Shield className="h-6 w-6" />,
            title: "Safety First Approach",
            description: "Zero-accident policy with comprehensive safety protocols and regular training programs.",
            color: "bg-zinc-100 dark:bg-zinc-800/30 text-[#B22222] dark:text-[#FF6B6B]"
        },
        {
            icon: <Leaf className="h-6 w-6" />,
            title: "Eco-Friendly Solutions",
            description: "Sustainable practices and green technologies reducing environmental impact by 40%.",
            color: "bg-zinc-100 dark:bg-zinc-800/30 text-[#036082] dark:text-[#4FC3F7]"
        },
        {
            icon: <Clock className="h-6 w-6" />,
            title: "On-Time Delivery",
            description: "98% project completion rate within scheduled timeframes through precise planning.",
            color: "bg-zinc-100 dark:bg-zinc-800/30 text-[#036082] dark:text-[#B22222]"
        },
        {
            icon: <TrendingUp className="h-6 w-6" />,
            title: "Performance Optimization",
            description: "Continuous improvement processes ensuring maximum efficiency and ROI for clients.",
            color: "bg-zinc-100 dark:bg-zinc-800/30 text-[#036082] dark:text-[#B22222]"
        },
        {
            icon: <Award className="h-6 w-6" />,
            title: "Project Management",
            description: "International quality management standards ensuring consistent excellence in every project.",
            color: "bg-zinc-100 dark:bg-zinc-800/30 text-[#036082] dark:text-[#B22222]"
        },
        {
            icon: <Users className="h-6 w-6" />,
            title: "Expert Team",
            description: "Highly qualified professionals with average 10+ years experience in their fields.",
            color: "bg-zinc-100 dark:bg-zinc-800/30 text-[#036082] dark:text-[#B22222]"
        }
    ];

    const achievements = [
        { label: "Projects Delivered", value: "500+", icon: <Target className="h-5 w-5" /> },
        { label: "Client Retention Rate", value: "95%", icon: <Users className="h-5 w-5" /> },
        { label: "Average Project Savings", value: "25%", icon: <TrendingUp className="h-5 w-5" /> },
        { label: "Response Time", value: "24h", icon: <Zap className="h-5 w-5" /> }
    ];

    return (
        <section id="quality" className="py-16 sm:py-24 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center space-y-4 mb-16">
                    <Badge className="bg-zinc-100 dark:bg-zinc-800/30 text-[#036082] dark:text-[#B22222] border-[#036082]/20 dark:border-[#B22222]/20">
                        Quality Excellence
                    </Badge>
                    <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Why Choose Juniperng?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        With over 15 years of combined expertise in technology and construction,
                        we deliver unmatched quality and innovation that exceeds expectations.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    {/* Main Quality Features */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {qualityFeatures.map((feature, index) => (
                                <Card key={index} className="border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                    <CardHeader className="pb-3">
                                        <div className="flex items-center space-x-3">
                                            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${feature.color}`}>
                                                {feature.icon}
                                            </div>
                                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="pt-0">
                                        <CardDescription className="text-base">{feature.description}</CardDescription>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>

                    {/* Team Image & Achievements */}
                    <div className="space-y-6">
                        <div className="relative">
                            <ImageWithFallback
                                src="https://images.unsplash.com/photo-1622611935038-1c4caa0db5d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25zdHJ1Y3Rpb24lMjBtYW5hZ2VtZW50JTIwdGVhbXxlbnwxfHx8fDE3NTczMzgxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                                alt="Construction management team"
                                width={1080}
                                height={720}
                                className="w-full h-64 object-cover rounded-xl"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl"></div>
                            <div className="absolute bottom-4 left-4 text-white">
                                <p className="text-sm opacity-90">Our Expert Team</p>
                                <h4 className="font-semibold">Delivering Excellence Since 2008</h4>
                            </div>
                        </div>
                        <Card className="border border-border">
                            <CardHeader>
                                <CardTitle className="text-lg flex items-center space-x-2">
                                    <TrendingUp className="h-5 w-5 text-[#036082] dark:text-[#B22222]" />
                                    <span>Key Achievements</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {achievements.map((achievement, index) => (
                                    <div key={index} className="flex items-center justify-between">
                                        <div className="flex items-center space-x-2">
                                            <div className="text-muted-foreground">
                                                {achievement.icon}
                                            </div>
                                            <span className="text-sm text-muted-foreground">{achievement.label}</span>
                                        </div>
                                        <span className="font-semibold text-[#036082] dark:text-[#B22222]">
                                            {achievement.value}
                                        </span>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
