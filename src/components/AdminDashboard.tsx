"use client";
import { useState, useEffect, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";
import { Download, LogIn, LogOut, Eye } from "lucide-react";
import * as XLSX from 'xlsx';
import { toast } from "sonner";

interface UserData {
    id?: string;
    firstname?: string;
    firstName?: string;
    lastname?: string;
    lastName?: string;
    middlename?: string;
    middleName?: string;
    department: string;
    identifier: string;
    role: string;
    passportphotolink?: string;
    passportPhotoLink?: string;
    createdat?: string;
    createdAt?: string;
}

export function AdminDashboard() {
    const [user, loading, error] = useAuthState(auth);
    const [data, setData] = useState<UserData[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(50);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isDownloadingCSV, setIsDownloadingCSV] = useState(false);
    const [isDownloadingExcel, setIsDownloadingExcel] = useState(false);
    const [formErrors, setFormErrors] = useState<{ email?: string; password?: string }>({});

    // Form validation
    const validateForm = () => {
        const errors: { email?: string; password?: string } = {};
        if (!email) errors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Invalid email format";
        if (!password) errors.password = "Password is required";
        else if (password.length < 6) errors.password = "Password must be at least 6 characters";
        return errors;
    };

    // Fetch data from Neon DB
    const fetchData = useCallback(async () => {
        if (!user) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/admin/data');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const result = await response.json();
            setData(result.data || []);
        } catch (error) {
            console.error("Error fetching data:", error);
            toast.error("Failed to load data. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }, [user]);

    useEffect(() => {
        if (user) {
            fetchData();
        }
    }, [user, fetchData]);

    // Handle login
    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const errors = validateForm();
        setFormErrors(errors);

        if (Object.keys(errors).length === 0) {
            setIsLoading(true);
            try {
                await signInWithEmailAndPassword(auth, email, password);
                toast.success("Logged in successfully");
                setEmail("");
                setPassword("");
            } catch (error) {
                console.error("Login error:", error);
                toast.error("Invalid credentials");
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Handle logout
    const handleLogout = async () => {
        try {
            await signOut(auth);
            toast.success("Logged out successfully");
            setData([]);
            setCurrentPage(1);
        } catch (error) {
            console.error("Logout error:", error);
            toast.error("Failed to logout");
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Generate pagination items
    const getPaginationItems = () => {
        const pages: number[] = [];
        const maxPagesToShow = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
        const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

        if (endPage - startPage + 1 < maxPagesToShow) {
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        return pages;
    };

    // Download data as CSV
    const downloadCSV = async () => {
        setIsDownloadingCSV(true);
        try {
            const headers = [
                "First Name", "Last Name", "Middle Name", "Department",
                "Identifier", "Role", "Passport Photo", "Created At"
            ];

            const csvContent = [
                headers.join(","),
                ...data.map(item =>
                    [
                        item.firstname || item.firstName || '',
                        item.lastname || item.lastName || '',
                        item.middlename || item.middleName || '',
                        item.department || '',
                        item.identifier || '',
                        item.role || '',
                        item.passportphotolink || item.passportPhotoLink || '',
                        item.createdat || item.createdAt || ''
                    ].map(field => `"${field}"`).join(","))
            ].join("\n");

            const blob = new Blob([csvContent], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `user_data_${new Date().toISOString()}.csv`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            toast.success("CSV downloaded successfully");
        } catch (error) {
            console.error("CSV download error:", error);
            toast.error("Failed to download CSV");
        } finally {
            setIsDownloadingCSV(false);
        }
    };

    // Download data as Excel
    const downloadExcel = async () => {
        setIsDownloadingExcel(true);
        try {
            const worksheet = XLSX.utils.json_to_sheet(data.map(item => ({
                "First Name": item.firstname || item.firstName || '',
                "Last Name": item.lastname || item.lastName || '',
                "Middle Name": item.middlename || item.middleName || '',
                "Department": item.department || '',
                "Identifier": item.identifier || '',
                "Role": item.role || '',
                "Passport Photo": item.passportphotolink || item.passportPhotoLink || '',
                "Created At": item.createdat || item.createdAt || ''
            })));

            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
            XLSX.writeFile(workbook, `user_data_${new Date().toISOString()}.xlsx`);
            toast.success("Excel downloaded successfully");
        } catch (error) {
            console.error("Excel download error:", error);
            toast.error("Failed to download Excel");
        } finally {
            setIsDownloadingExcel(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center py-8 text-[#036082] dark:text-[#B22222] animate-pulse">
                    Loading...
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="max-w-md mx-auto p-6 border-2 border-[#036082] dark:border-[#B22222] rounded-lg shadow-md bg-white dark:bg-zinc-900">
                <h2 className="text-xl font-bold mb-4 text-[#036082] dark:text-[#B22222]">Admin Login</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">Email</label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className={`border-[#036082] dark:border-[#B22222] focus:ring-[#036082] dark:focus:ring-[#B22222] ${formErrors.email ? 'border-red-500' : ''}`}
                        />
                        {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1 text-foreground">Password</label>
                        <Input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className={`border-[#036082] dark:border-[#B22222] focus:ring-[#036082] dark:focus:ring-[#B22222] ${formErrors.password ? 'border-red-500' : ''}`}
                        />
                        {formErrors.password && <p className="text-red-500 text-xs mt-1">{formErrors.password}</p>}
                    </div>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-[#036082] hover:bg-[#024866] dark:bg-[#B22222] dark:hover:bg-[#8B1A1A] disabled:opacity-50"
                    >
                        <LogIn className="mr-2 h-4 w-4" /> {isLoading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                <h1 className="text-2xl font-bold text-[#036082] dark:text-[#B22222]">User Data Dashboard</h1>
                <div className="flex flex-wrap gap-2">
                    <Button
                        onClick={downloadCSV}
                        variant="outline"
                        disabled={isDownloadingCSV || isLoading}
                        className="border-[#036082] dark:border-[#B22222] text-[#036082] dark:text-[#B22222] hover:bg-[#036082]/10 dark:hover:bg-[#B22222]/10 disabled:opacity-50"
                    >
                        <Download className="mr-2 h-4 w-4" /> {isDownloadingCSV ? 'Downloading...' : 'Download CSV'}
                    </Button>
                    <Button
                        onClick={downloadExcel}
                        variant="outline"
                        disabled={isDownloadingExcel || isLoading}
                        className="border-[#036082] dark:border-[#B22222] text-[#036082] dark:text-[#B22222] hover:bg-[#036082]/10 dark:hover:bg-[#B22222]/10 disabled:opacity-50"
                    >
                        <Download className="mr-2 h-4 w-4" /> {isDownloadingExcel ? 'Downloading...' : 'Download Excel'}
                    </Button>
                    <Button
                        onClick={handleLogout}
                        className="bg-[#B22222] hover:bg-[#8B1A1A] text-white dark:bg-[#B22222] dark:hover:bg-[#8B1A1A]"
                    >
                        <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="text-center py-8 text-[#036082] dark:text-[#B22222] animate-pulse">
                    Loading data...
                </div>
            ) : (
                <>
                    <div className="overflow-x-auto mb-6 border border-[#036082] dark:border-[#B22222] rounded-lg shadow-sm">
                        <Table>
                            <TableHeader className="bg-[#036082]/10 dark:bg-[#B22222]/10">
                                <TableRow>
                                    <TableHead className="text-[#036082] dark:text-[#B22222] font-semibold">First Name</TableHead>
                                    <TableHead className="text-[#036082] dark:text-[#B22222] font-semibold">Last Name</TableHead>
                                    <TableHead className="text-[#036082] dark:text-[#B22222] font-semibold">Middle Name</TableHead>
                                    <TableHead className="text-[#036082] dark:text-[#B22222] font-semibold">Department</TableHead>
                                    <TableHead className="text-[#036082] dark:text-[#B22222] font-semibold">Identifier</TableHead>
                                    <TableHead className="text-[#036082] dark:text-[#B22222] font-semibold">Role</TableHead>
                                    <TableHead className="text-[#036082] dark:text-[#B22222] font-semibold">Passport Photo</TableHead>
                                    <TableHead className="text-[#036082] dark:text-[#B22222] font-semibold">Created At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {currentItems.length > 0 ? (
                                    currentItems.map((item, index) => (
                                        <TableRow key={item.id || index} className="hover:bg-[#036082]/5 dark:hover:bg-[#B22222]/5">
                                            <TableCell>{item.firstname || item.firstName || 'N/A'}</TableCell>
                                            <TableCell>{item.lastname || item.lastName || 'N/A'}</TableCell>
                                            <TableCell>{item.middlename || item.middleName || 'N/A'}</TableCell>
                                            <TableCell>{item.department || 'N/A'}</TableCell>
                                            <TableCell>{item.identifier || 'N/A'}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.role === 'staff'
                                                        ? 'bg-[#036082]/20 text-[#036082] dark:bg-[#B22222]/20 dark:text-[#B22222]'
                                                        : 'bg-[#036082]/10 text-[#036082] dark:bg-[#B22222]/10 dark:text-[#B22222]'
                                                    }`}>
                                                    {item.role || 'N/A'}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                {item.passportphotolink || item.passportPhotoLink ? (
                                                    <a
                                                        href={item.passportphotolink || item.passportPhotoLink}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[#036082] dark:text-[#B22222] hover:underline flex items-center"
                                                    >
                                                        <Eye className="mr-1 h-4 w-4" /> View Photo
                                                    </a>
                                                ) : 'N/A'}
                                            </TableCell>
                                            <TableCell>
                                                {item.createdat || item.createdAt
                                                    ? new Date(item.createdat ?? item.createdAt ?? '').toLocaleString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })
                                                    : 'N/A'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={8} className="text-center text-[#036082] dark:text-[#B22222] py-4">
                                            No data available
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {totalPages > 1 && (
                        <Pagination>
                            <PaginationContent>
                                <PaginationItem>
                                    <PaginationPrevious
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(prev => Math.max(prev - 1, 1));
                                        }}
                                        className={`text-[#036082] dark:text-[#B22222] hover:bg-[#036082]/10 dark:hover:bg-[#B22222]/10 ${currentPage === 1 ? "pointer-events-none opacity-50" : ""
                                            }`}
                                    />
                                </PaginationItem>

                                {getPaginationItems().map(pageNumber => (
                                    <PaginationItem key={pageNumber}>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage(pageNumber);
                                            }}
                                            className={`text-[#036082] dark:text-[#B22222] hover:bg-[#036082]/10 dark:hover:bg-[#B22222]/10 ${currentPage === pageNumber ? "bg-[#036082]/20 dark:bg-[#B22222]/20 font-bold" : ""
                                                }`}
                                        >
                                            {pageNumber}
                                        </PaginationLink>
                                    </PaginationItem>
                                ))}

                                {totalPages > 5 && currentPage < totalPages - 2 && (
                                    <PaginationItem>
                                        <span className="px-2 py-1 text-[#036082] dark:text-[#B22222]">...</span>
                                    </PaginationItem>
                                )}

                                {totalPages > 5 && currentPage < totalPages - 1 && (
                                    <PaginationItem>
                                        <PaginationLink
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setCurrentPage(totalPages);
                                            }}
                                            className="text-[#036082] dark:text-[#B22222] hover:bg-[#036082]/10 dark:hover:bg-[#B22222]/10"
                                        >
                                            {totalPages}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationNext
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentPage(prev => Math.min(prev + 1, totalPages));
                                        }}
                                        className={`text-[#036082] dark:text-[#B22222] hover:bg-[#036082]/10 dark:hover:bg-[#B22222]/10 ${currentPage === totalPages ? "pointer-events-none opacity-50" : ""
                                            }`}
                                    />
                                </PaginationItem>
                            </PaginationContent>
                        </Pagination>
                    )}
                </>
            )}
        </div>
    );
}