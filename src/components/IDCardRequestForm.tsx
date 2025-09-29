"use client";
import { useState, useRef } from "react";
import { ArrowRight, Camera, User, Book, IdCard, Briefcase } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";
import Image from "next/image";

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
  const [preview, setPreview] = useState<string | null>(null); // State for local preview
  const [source, setSource] = useState<"upload" | "user" | "environment">("upload"); // State for input source
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
      const response = await fetch("/api/idrequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
      setPreview(null); // Clear preview on successful submission
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

  const validateImage = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const maxSize = 5 * 1024 * 1024; // 5MB
      const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
      const minWidth = 600; // Minimum width for passport photo
      const minHeight = 600; // Minimum height for passport photo

      // Check file type
      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload an image (JPEG, PNG, GIF, or WebP).");
        return resolve(false);
      }

      // Check file size
      if (file.size > maxSize) {
        toast.error("Image size exceeds 5MB.");
        return resolve(false);
      }

      // Check image dimensions
      const img = new window.Image();
      img.src = URL.createObjectURL(file);
      img.onload = () => {
        if (img.width < minWidth || img.height < minHeight) {
          toast.error(`Image must be at least ${ minWidth }x${ minHeight } pixels.`);
          URL.revokeObjectURL(img.src);
          return resolve(false);
        }
        URL.revokeObjectURL(img.src);
        resolve(true);
      };
      img.onerror = () => {
        toast.error("Failed to load image for validation.");
        URL.revokeObjectURL(img.src);
        resolve(false);
      };
    });
  };

  const handleFileUpload = async (file: File) => {
    // Validate file before uploading
    const isValid = await validateImage(file);
    if (!isValid) {
      setPreview(null);
      return;
    }

    setIsUploading(true);

    try {
      // Generate local preview
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);

      // Upload to GCS
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });

      const { uploadUrl, publicUrl } = await res.json();

      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      setFormData((prev) => ({ ...prev, passportPhotoLink: publicUrl }));
      toast.success("Passport photo uploaded successfully!");
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to upload photo.");
      setPreview(null); // Clear preview on failure
    } finally {
      setIsUploading(false);
    }
  };

//   const handleUploadError = () => {
//     setIsUploading(false);
//     setPreview(null); // Clear preview on error
//     toast.error("Failed to upload photo. Please try again.");
//   };

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
                className={`h - 5 w - 5 text - [#036082] dark: text - [#B22222] transition - transform ${ isOpen ? "rotate-90" : "" } `}
              />
            </div>
            {isOpen && (
              <div ref={formRef} onClick={handleFormClick} className="max-h-[80vh] overflow-y-auto pr-2">
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
                    <Input
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange("lastName", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-1 text-foreground">
                      <User className="h-4 w-4" />
                      <span>Middle Name</span>
                    </label>
                    <Input
                      placeholder="Middle (Optional)"
                      value={formData.middleName}
                      onChange={(e) => handleInputChange("middleName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-1 text-foreground">
                      <Book className="h-4 w-4" />
                      <span>Department *</span>
                    </label>
                    <Input
                      placeholder="Computer Science"
                      value={formData.department}
                      onChange={(e) => handleInputChange("department", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-1 text-foreground">
                      <IdCard className="h-4 w-4" />
                      <span>Identifier *</span>
                    </label>
                    <Input
                      placeholder="Staff ID / Matric Number"
                      value={formData.identifier}
                      onChange={(e) => handleInputChange("identifier", e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium flex items-center space-x-1 text-foreground">
                      <Briefcase className="h-4 w-4" />
                      <span>Role *</span>
                    </label>
                    <Select value={formData.role} onValueChange={(value) => handleInputChange("role", value)} required>
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

                    {preview || formData.passportPhotoLink ? (
                      <div className="space-y-2">
                        {/* Image Preview */}
                        <Image
                          src={preview || formData.passportPhotoLink}
                          alt="Passport Photo Preview"
                          width={96}
                          height={96}
                          className="w-24 h-24 object-cover rounded-lg mx-auto"
                        />

                        {/* Upload Button */}
                        <label
                          htmlFor="passport-upload"
                          className="block text-center cursor-pointer px-4 py-2 rounded-2xl font-medium shadow
                   bg-teal-600 text-white hover:bg-teal-700
                   dark:bg-red-700 dark:hover:bg-red-800"
                        >
                          {isUploading ? "Uploading..." : "Upload / Take Photo"}
                        </label>

                        <Input
                          id="passport-upload"
                          type="file"
                          accept="image/*"
                          capture="environment" // opens camera directly on mobile, but user can still pick from gallery
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                          }}
                          className="hidden"
                          disabled={isUploading}
                        />
                      </div>
                    ) : (
                      <div>
                        {/* Upload Button */}
                        <label
                          htmlFor="passport-upload"
                          className="block text-center cursor-pointer px-4 py-2 rounded-2xl font-medium shadow
                   bg-teal-600 text-white hover:bg-teal-700
                   dark:bg-red-700 dark:hover:bg-red-800"
                        >
                          {isUploading ? "Uploading..." : "Upload / Take Photo"}
                        </label>

                        <Input
                          id="passport-upload"
                          type="file"
                          accept="image/*"
                          capture="environment"
                          onChange={(e) => {
                            if (e.target.files?.[0]) handleFileUpload(e.target.files[0]);
                          }}
                          className="hidden"
                          disabled={isUploading}
                        />
                      </div>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#036082] hover:bg-[#024866] text-white dark:bg-[#B22222] dark:hover:bg-[#8B1A1A]"
                    disabled={isSubmitting || isUploading}
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