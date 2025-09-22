"use client";
import { useState, useRef, useEffect } from "react";
import { ArrowRight, Camera, User, Book, IdCard, Briefcase, UserRound } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import { CldUploadWidget, CldImage } from 'next-cloudinary';
import type { CloudinaryUploadWidgetResults } from "next-cloudinary";

const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "";

export function IDCardRequestForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        middleName: "",
        department: "",
        identifier: "",
        role: "",
        passportPhotoLink: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const formRef = useRef<HTMLDivElement>(null);

    // Fix scrolling issue by preventing event propagation only when needed
    const handleFormClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (
            !formData.firstName ||
            !formData.lastName ||
            !formData.department ||
            !formData.identifier ||
            !formData.role ||
            !formData.passportPhotoLink
        ) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await fetch('/api/idrequest', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to request ID Card.");
            }

            toast.success("ID Card request successful! Data saved.");
            document.body.style.overflow = "auto";
            setIsOpen(false);
            setFormData({
                firstName: "",
                lastName: "",
                middleName: "",
                department: "",
                identifier: "",
                role: "",
                passportPhotoLink: "",
            });
        } catch (error) {
            console.error("Error:", error);
            toast.error(error instanceof Error ? error.message : "Failed to request for ID Card.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    // Handle Cloudinary upload success with proper typing
  

    const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
        if (
            result.event === "success" &&
            typeof result.info === "object" &&
            result.info !== null &&
            "secure_url" in result.info
        ) {
            setFormData((prev) => ({
                ...prev,
                passportPhotoLink: (result.info as { secure_url?: string }).secure_url ?? "",
            }));
            toast.success("Passport photo uploaded successfully!");
            setIsUploading(false);
        }
    };

    const handleUploadError = () => {
        setIsUploading(false);
        toast.error("Failed to upload photo. Please try again.");
    };

    return (
        <section id="idcardrequest" className="py-8 sm:py-12 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center space-y-4 mb-6">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
                        ID Card Request
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Fill out the form below to request for your ID Card as a staff or student.
                    </p>
                </div>
                <div className="max-w-md mx-auto">
                    <div
                        className="border-2 border-[#036082] dark:border-[#B22222] rounded-lg p-6 cursor-pointer transition-all duration-300 hover:shadow-lg"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <div className="flex items-center justify-between">
                            <h3 className="font-semibold text-lg text-foreground">
                                {isOpen ? "Close Form" : "Open ID Card request form"}
                            </h3>
                            <ArrowRight
                                className={`h-5 w-5 text-[#036082] dark:text-[#B22222] transition-transform ${isOpen ? "rotate-90" : ""}`}
                            />
                        </div>
                        {isOpen && (
                        <div ref={formRef} onClick={handleFormClick} className="max-h-[80vh] overflow-y-auto pr-2">
                                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                                    {/* Form fields remain the same */}
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center space-x-1 text-foreground">
                                            <User className="h-4 w-4" />
                                            <span>First Name *</span>
                                        </label>
                                        <Input
                                            placeholder="John"
                                            value={formData.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center space-x-1 text-foreground">
                                            <User className="h-4 w-4" />
                                            <span>Last Name *</span>
                                        </label>
                                        <Input placeholder="Doe" value={formData.lastName} onChange={(e) => handleInputChange("lastName", e.target.value)} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center space-x-1 text-foreground">
                                            <User className="h-4 w-4" />
                                            <span>Middle Name</span>
                                        </label>
                                        <Input placeholder="Middle (Optional)" value={formData.middleName} onChange={(e) => handleInputChange("middleName", e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center space-x-1 text-foreground">
                                            <Book className="h-4 w-4" />
                                            <span>Department *</span>
                                        </label>
                                        <Input placeholder="Computer Science" value={formData.department} onChange={(e) => handleInputChange("department", e.target.value)} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center space-x-1 text-foreground">
                                            <IdCard className="h-4 w-4" />
                                            <span>Identifier *</span>
                                        </label>
                                        <Input placeholder="Staff ID / Matric Number" value={formData.identifier} onChange={(e) => handleInputChange("identifier", e.target.value)} required />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center space-x-1 text-foreground">
                                            <Briefcase className="h-4 w-4" />
                                            <span>Role *</span>
                                        </label>
                                        <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)} required >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="staff">Staff</SelectItem>
                                                <SelectItem value="student">Student</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-medium flex items-center space-x-1 text-foreground">
                                            <Camera className="h-4 w-4" />
                                            <span>Passport Photo *</span>
                                        </label>
                                        {formData.passportPhotoLink ? (
                                            <div className="mt-2">
                                                <CldImage
                                                    width="200"
                                                    height="200"
                                                    src={formData.passportPhotoLink}
                                                    alt="Passport Photo"
                                                    className="w-24 h-24 object-cover rounded-lg mx-auto"
                                                />
                                                <CldUploadWidget
                                                    uploadPreset={uploadPreset}
                                                    onSuccess={handleUploadSuccess}
                                                    onError={handleUploadError}
                                                >
                                                    {({ open }) => (
                                                        <Button
                                                            type="button"
                                                            variant="outline"
                                                            className="w-full mt-2 text-[#036082] dark:text-[#B22222] border-[#036082] dark:border-[#B22222]"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setIsUploading(true);
                                                                open();
                                                            }}
                                                            disabled={isUploading}
                                                        >
                                                            {isUploading ? "Uploading..." : "Change Photo"}
                                                        </Button>
                                                    )}
                                                </CldUploadWidget>
                                            </div>
                                        ) : (
                                            <CldUploadWidget
                                                uploadPreset={uploadPreset}
                                                onSuccess={handleUploadSuccess}
                                                onError={handleUploadError}
                                            >
                                                {({ open }) => (
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="w-full text-[#036082] dark:text-[#B22222] border-[#036082] dark:border-[#B22222]"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setIsUploading(true);
                                                            open();
                                                        }}
                                                        disabled={isUploading}
                                                    >
                                                        {isUploading ? "Uploading..." : "Upload Passport Photo"}
                                                    </Button>
                                                )}
                                            </CldUploadWidget>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        className="w-full bg-[#036082] hover:bg-[#024866] text-white dark:bg-[#B22222] dark:hover:bg-[#8B1A1A]"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? "Submitting..." : "Submit ID Card Request"}
                                    </Button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
