'use client';
import { ArrowRight, Calendar, CheckCircle, Mail, MessageSquare, Phone, Sparkles } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Textarea } from "./ui/textarea";
import { toast } from "sonner";

export function CallToAction() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        // Log the form data to Vercel's console
        console.log("Form submitted:", formData);

        // Simulate sending the data (replace with actual API call if needed)
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                toast.success("Your message has been sent! We'll contact you soon.");
                setIsSubmitted(true);
                setFormData({ name: '', email: '', phone: '', service: '', message: '' });
                setTimeout(() => setIsSubmitted(false), 5000);
            } else {
                toast.error("Failed to send message. Please try again.");
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleEmailClick = () => {
        window.location.href = "mailto:info@jupiterng.com?subject=Inquiry&body=Hello,%20I'd%20like%20to%20discuss%20a%20project.";
    };

    const handleScheduleClick = () => {
        toast.success("Your free consultation has been scheduled! We'll call you shortly.");
    };

    const benefits = [
        "Free initial consultation and project assessment",
        "Custom solution design tailored to your needs",
        "Competitive pricing with transparent cost breakdown",
        "24/7 support throughout project lifecycle",
        "Performance guarantee and quality assurance"
    ];

    return (
        <section id="contact" className="py-16 sm:py-24 bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900/10 dark:to-zinc-800/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Left Column - CTA Content */}
                    <div className="space-y-8">
                        <div className="space-y-4">
                            <div className="inline-flex items-center space-x-2 bg-zinc-100 dark:bg-zinc-800/30 text-[#036082] dark:text-[#B22222] px-3 py-1 rounded-full">
                                <Sparkles className="h-4 w-4" />
                                <span className="text-sm">Ready to Get Started?</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
                                Transform Your Vision into Reality
                            </h2>
                            <p className="text-lg text-muted-foreground">
                                Join hundreds of satisfied clients who chose Jupiterng for their technology
                                and construction needs. Let’s discuss how we can bring your project to life.
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-3">
                            <h3 className="font-semibold text-foreground">What You Get:</h3>
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <CheckCircle className="h-5 w-5 text-[#036082] dark:text-[#B22222] flex-shrink-0 mt-0.5" />
                                    <span className="text-muted-foreground">{benefit}</span>
                                </div>
                            ))}
                        </div>

                        {/* Quick Contact Options */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Card
                                className="border border-[#036082]/20 dark:border-[#B22222]/20 bg-zinc-50 dark:bg-zinc-800/20 cursor-pointer hover:shadow-md transition-shadow"
                                onClick={() => window.location.href = "tel:+15551234567"}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center justify-center w-10 h-10 bg-zinc-100 dark:bg-zinc-800/30 rounded-lg">
                                            <Phone className="h-5 w-5 text-[#036082] dark:text-[#B22222]" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-foreground">Call Us Now</div>
                                            <div className="text-sm text-[#036082] dark:text-[#B22222]">+234 (802) 222-8423</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                            <Card
                                className="border border-[#036082]/20 dark:border-[#B22222]/20 bg-zinc-50 dark:bg-zinc-800/20 cursor-pointer hover:shadow-md transition-shadow"
                                onClick={handleEmailClick}
                            >
                                <CardContent className="p-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="flex items-center justify-center w-10 h-10 bg-zinc-100 dark:bg-zinc-800/30 rounded-lg">
                                            <Mail className="h-5 w-5 text-[#036082] dark:text-[#B22222]" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-sm text-foreground">Email Us</div>
                                            <div className="text-sm text-[#036082] dark:text-[#B22222]">info@jupiterng.com</div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Schedule Button */}
                        <Button
                            className="w-full sm:w-auto bg-gradient-to-r from-[#036082] to-[#024866] hover:from-[#024866] hover:to-[#013349] text-white text-lg px-8 py-3 dark:from-[#B22222] dark:to-[#8B1A1A] dark:hover:from-[#8B1A1A] dark:hover:to-[#6B1414]"
                            onClick={handleScheduleClick}
                        >
                            <Calendar className="mr-2 h-5 w-5" />
                            Schedule Free Consultation
                        </Button>
                    </div>

                    {/* Right Column - Contact Form */}
                    <Card className="border border-border shadow-xl">
                        <CardContent className="p-6">
                            <div className="space-y-4 mb-6">
                                <div className="flex items-center space-x-2">
                                    <MessageSquare className="h-5 w-5 text-[#036082] dark:text-[#B22222]" />
                                    <h3 className="font-semibold text-foreground">Get Your Free Quote</h3>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Fill out the form below and we’ll get back to you within 24 hours.
                                </p>
                            </div>

                            {isSubmitted ? (
                                <div className="text-center py-8 space-y-4">
                                    <div className="flex items-center justify-center w-16 h-16 bg-zinc-100 dark:bg-zinc-800/30 rounded-full mx-auto">
                                        <CheckCircle className="h-8 w-8 text-[#036082] dark:text-[#B22222]" />
                                    </div>
                                    <h4 className="font-semibold text-foreground">Thank You!</h4>
                                    <p className="text-muted-foreground">
                                        Your message has been sent successfully. We’ll contact you soon.
                                    </p>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Full Name *</label>
                                            <Input
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => handleInputChange('name', e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Email *</label>
                                            <Input
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => handleInputChange('email', e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Phone</label>
                                            <Input
                                                placeholder="+1 (555) 123-4567"
                                                value={formData.phone}
                                                onChange={(e) => handleInputChange('phone', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-medium text-foreground">Service Needed</label>
                                            <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Select a service" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="tech-consulting">Technology Consulting</SelectItem>
                                                    <SelectItem value="network-infrastructure">Network Infrastructure</SelectItem>
                                                    <SelectItem value="construction-design">Construction Design</SelectItem>
                                                    <SelectItem value="construction-management">Construction Management</SelectItem>
                                                    <SelectItem value="integrated-solution">Integrated Solution</SelectItem>
                                                    <SelectItem value="other">Other</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-foreground">Project Details *</label>
                                        <Textarea
                                            placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => handleInputChange('message', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <Button
                                        type="submit"
                                        className="w-full bg-[#036082] hover:bg-[#024866] text-white dark:bg-[#B22222] dark:hover:bg-[#8B1A1A]"
                                    >
                                        Send Message
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                    <p className="text-xs text-center text-muted-foreground">
                                        By submitting this form, you agree to our privacy policy and terms of service.
                                    </p>
                                </form>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>
    );
}
