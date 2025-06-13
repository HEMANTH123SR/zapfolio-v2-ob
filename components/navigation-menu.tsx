"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, User, Briefcase, GraduationCap, Star, Globe, Folder, FileText, Award, Users, Image as GalleryIcon, CheckCircle, Phone } from "lucide-react";
import { UserData } from "@/lib/userdata.interface";

interface NavigationMenuProps {
    userData: UserData;
}

const navLinks = [
    { id: "about", label: "About", icon: <User className="w-5 h-5 mr-2" /> },
    { id: "experience", label: "Experience", icon: <Briefcase className="w-5 h-5 mr-2" /> },
    { id: "education", label: "Education", icon: <GraduationCap className="w-5 h-5 mr-2" /> },
    { id: "skills", label: "Skills", icon: <Star className="w-5 h-5 mr-2" /> },
    { id: "languages", label: "Languages", icon: <Globe className="w-5 h-5 mr-2" /> },
    { id: "projects", label: "Projects", icon: <Folder className="w-5 h-5 mr-2" /> },
    { id: "research", label: "Research", icon: <FileText className="w-5 h-5 mr-2" /> },
    { id: "services", label: "Services", icon: <CheckCircle className="w-5 h-5 mr-2" /> },
    { id: "clients", label: "Clients", icon: <Users className="w-5 h-5 mr-2" /> },
    { id: "articles", label: "Articles", icon: <FileText className="w-5 h-5 mr-2" /> },
    { id: "gallery", label: "Gallery", icon: <GalleryIcon className="w-5 h-5 mr-2" /> },
    { id: "certifications", label: "Certifications", icon: <CheckCircle className="w-5 h-5 mr-2" /> },
    { id: "awards", label: "Awards", icon: <Award className="w-5 h-5 mr-2" /> },
    { id: "contact", label: "Contact", icon: <Phone className="w-5 h-5 mr-2" /> },
];

const NavigationMenu: React.FC<NavigationMenuProps> = ({ userData }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Trap focus and close on Escape
    useEffect(() => {
        if (!isMenuOpen) return;
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [isMenuOpen]);

    const availableLinks = navLinks.filter(link => {
        switch (link.id) {
            case "about": return true;
            case "experience": return userData.jobExperience && userData.jobExperience.length > 0;
            case "education": return userData.education && userData.education.length > 0;
            case "skills": return userData.skills && userData.skills.length > 0;
            case "languages": return userData.languages && userData.languages.length > 1;
            case "projects": return userData.projects && userData.projects.length > 0;
            case "research": return userData.researchPapers && userData.researchPapers.length > 0;
            case "services": return userData.freelanceServices && userData.freelanceServices.length > 0;
            case "clients": return userData.clients && userData.clients.length > 0;
            case "articles": return userData.articles && userData.articles.length > 0;
            case "gallery": return userData.gallery && userData.gallery.length > 0;
            case "certifications": return userData.certifications && userData.certifications.length > 0;
            case "awards": return userData.awards && userData.awards.length > 0;
            case "contact": return userData.contactInfo && Object.values(userData.contactInfo).some(Boolean);
            default: return false;
        }
    });

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/80 transition-all duration-300">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                <div className="text-3xl font-bold tracking-tighter transition-transform hover:scale-105">
                    {userData.firstName?.charAt(0)}
                    {userData.lastName?.charAt(0)}
                    <span className="text-orange-500">.</span>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href="https://zapfolio.in/"
                        className="bg-orange-500 text-white px-6 py-2 rounded-full hover:bg-orange-600 transition-all duration-200 hover:scale-105 font-semibold shadow-lg"
                    >
                        Build Yours
                    </Link>
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="p-2 hover:bg-zinc-800 rounded-lg transition-colors duration-200"
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                    </button>
                </div>
            </div>
            {/* Hamburger Menu Overlay and Card */}
            {isMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in" onClick={() => setIsMenuOpen(false)} />
                    {/* Menu Card */}
                    <div
                        ref={menuRef}
                        className="fixed left-1/2 top-24 transform -translate-x-1/2 z-50 w-full max-w-xl px-6 sm:px-10 py-8 bg-gradient-to-br from-zinc-900 via-black to-zinc-800/90 rounded-3xl shadow-2xl border border-zinc-700 flex flex-col items-center animate-slide-down"
                        style={{ minWidth: 320 }}
                    >
                        {/* Floating Close Button */}
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800 hover:bg-orange-500 text-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                            aria-label="Close menu"
                        >
                            <X className="w-6 h-6" />
                        </button>
                        <div className="flex flex-wrap justify-center gap-4 mt-2 w-full">
                            {availableLinks.map(link => (
                                <a
                                    key={link.id}
                                    href={`#${link.id}`}
                                    className="flex items-center justify-center px-5 py-3 rounded-full bg-zinc-800/80 text-white font-semibold text-base hover:bg-orange-500 hover:text-white focus:ring-2 focus:ring-orange-400 focus:outline-none transition-all duration-200 shadow-md text-center border border-zinc-700 hover:scale-105 min-w-[120px]"
                                    onClick={() => setIsMenuOpen(false)}
                                    style={{ whiteSpace: 'nowrap', letterSpacing: '0.01em' }}
                                >
                                    {link.icon}
                                    {link.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};

export default NavigationMenu;

// Animations (add to your global CSS or Tailwind config):
// .animate-fade-in { animation: fadeIn 0.2s ease; }
// .animate-slide-down { animation: slideDown 0.25s cubic-bezier(0.4,0,0.2,1); }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
// @keyframes slideDown { from { opacity: 0; transform: translateY(-24px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } } 