


import { notFound } from "next/navigation"
import Image from "next/image"
import type { UserData } from "@/lib/userdata.interface"
import { ArrowRight, Briefcase, ExternalLink, GraduationCap, Languages, MapPin, } from "lucide-react"
import { Metadata } from "next"
import { hackerMedium, strawberry } from "@/fonts/font";
import Link from "next/link";


export async function generateMetadata({ params }: { params: Promise<{ username: string }> }): Promise<Metadata> {
    try {
        const resolvedParams = await params;
        const username = resolvedParams.username;
        const userData = await getUserData(username);

        return {
            title: `${userData.firstName} ${userData.lastName} - Professional Portfolio | Zapfolio`,
            description: userData.headline || `View ${userData.firstName} ${userData.lastName}'s professional portfolio. ${userData.industry || 'Professional'} based in ${userData.location?.address || 'the world'}. Built with Zapfolio.`,
            keywords: [
                userData.firstName || '',
                userData.lastName || '',
                userData.industry || '',
                'portfolio',
                'professional',
                'resume',
                'career',
                ...(userData.skills || []),
                'zapfolio'
            ].filter(Boolean),
            openGraph: {
                title: `${userData.firstName} ${userData.lastName} | Professional Portfolio`,
                description: userData.headline || `Professional portfolio of ${userData.firstName} ${userData.lastName}`,
                images: userData.image ? [userData.image] : ['/zapfolio-og.jpg'],
                type: 'profile',
            },
            twitter: {
                card: 'summary_large_image',
                title: `${userData.firstName} ${userData.lastName} | Professional Portfolio`,
                description: userData.headline || `Professional portfolio of ${userData.firstName} ${userData.lastName}`,
                images: userData.image ? [userData.image] : ['/zapfolio-og.jpg'],
            },
            alternates: {
                canonical: `https://zapfolio.in/${username}`,
            },
            robots: {
                index: true,
                follow: true,
            },
        };
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return {
            title: 'Professional Portfolio | Zapfolio',
            description: 'Create your professional portfolio in two clicks with Zapfolio',
        };
    }
}

async function getUserData(username: string): Promise<UserData> {
    try {
        const response = await fetch(`https://zapfolio.in/api/get-user-data/${username}`, {
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user data: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
}



export default async function UserProfilePage({ params }: { params: Promise<{ username: string }> }) {
    try {

        const resolvedParams = await params;
        const username = resolvedParams.username;
        const userData = await getUserData(username);
        const hasJobExperience = userData.jobExperience && userData.jobExperience.length > 0;
        const hasEducation = userData.education && userData.education.length > 0;
        const hasSkills = userData.skills && userData.skills.length > 0;
        const hasLanguages = userData.languages && userData.languages.length > 0;

        return (
            <div className="min-h-screen bg-black text-white"
                style={hackerMedium.style}
            >
                {/* Navigation */}
                <nav className="sticky top-0 z-50 max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center backdrop-blur-md bg-black/80">
                    <div className="text-3xl font-bold tracking-tighter">
                        {userData.firstName?.charAt(0)}
                        {userData.lastName?.charAt(0)}
                        <span className="text-orange-500">.</span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a href="#about" className="hover:text-orange-500 transition-colors">
                            About
                        </a>
                        {hasJobExperience && (
                            <a href="#experience" className="hover:text-orange-500 transition-colors">
                                Experience
                            </a>
                        )}
                        {hasEducation && (
                            <a href="#education" className="hover:text-orange-500 transition-colors">
                                Education
                            </a>
                        )}
                        {(hasSkills || hasLanguages) && (
                            <a href="#skills" className="hover:text-orange-500 transition-colors">
                                Skills
                            </a>
                        )}
                    </div>



                    <Link href="https://zapfolio.in/" className="bg-orange-500 text-white px-6 py-2 rounded-full hidden md:block hover:bg-orange-600 transition-colors">
                        Create Your Own
                    </Link>
                </nav>
                {/* 
                
                 {/* Hero Section */}
                <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold leading-tight"
                            style={strawberry.style}
                        >
                            Hello,
                            <br />
                            {`I'm ${userData.firstName} ${userData.lastName}`}

                            <span className="text-orange-500">.</span>
                        </h1>
                        <p className="text-xl mt-6 text-gray-400">{userData.headline}</p>

                        <div className="flex flex-wrap gap-4 mt-8">
                            {userData.industry && (
                                <div className="bg-orange-500 text-white px-6 py-2 rounded-full">{userData.industry}</div>
                            )}
                            {userData.location?.address && (
                                <div className="bg-zinc-900 text-white px-6 py-2 rounded-full flex items-center">
                                    <MapPin className="w-4 h-4 mr-2" />
                                    {userData.location.address}
                                    {userData.location.countryCode && `, ${userData.location.countryCode}`}
                                </div>
                            )}
                        </div>


                    </div>

                    <div className="relative">
                        <div className="aspect-square rounded-3xl overflow-hidden border-4 border-zinc-800 relative">
                            {userData.image ? (
                                <Image
                                    src={userData.image || "/placeholder.svg"}
                                    alt={`${userData.firstName} ${userData.lastName}`}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full bg-zinc-900 text-gray-500">
                                    <span className="text-8xl font-bold">
                                        {userData.firstName?.charAt(0) || ""}
                                        {userData.lastName?.charAt(0) || ""}
                                    </span>
                                </div>
                            )}
                        </div>

                    </div>
                </section>


                {/* About Section */}
                {userData.summary && (
                    <section id="about" className="bg-zinc-900 py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">About</div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-12">
                                IMPACTFUL WORK,
                                <br />
                                ELEGANTLY EXPRESSED<span className="text-orange-500">.</span>
                            </h2>

                            <div className="text-lg md:text-xl leading-relaxed max-w-3xl">{userData.summary}</div>
                        </div>
                    </section>
                )}

                {/* Experience Section */}
                {hasJobExperience && (
                    <section id="experience" className="py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Career Path</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Experience<span className="text-orange-500">.</span>
                            </h2>

                            <div className="grid gap-6">
                                {userData.jobExperience && userData.jobExperience.map((job, index) => (
                                    <div key={index} className="bg-zinc-900 rounded-3xl overflow-hidden">
                                        <div className="p-8 flex flex-col md:flex-row gap-8">
                                            <div className="md:w-1/4">
                                                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden">
                                                    {job.company?.imageUrl ? (
                                                        <Image
                                                            src={job.company.imageUrl || "/placeholder.svg"}
                                                            alt={job.company.name || ""}
                                                            width={64}
                                                            height={64}
                                                            className="object-contain"
                                                        />
                                                    ) : (
                                                        <Briefcase className="w-8 h-8 text-orange-500" />
                                                    )}
                                                </div>
                                                <h3 className="text-xl font-bold mt-4">{job.company?.name}</h3>
                                                {job.employmentType && <p className="text-gray-400">{job.employmentType}</p>}
                                            </div>
                                            <div className="md:w-3/4">
                                                {job.positions &&
                                                    job.positions.map((position, posIndex) => (
                                                        <div key={posIndex} className={posIndex > 0 ? "mt-8 pt-8 border-t border-zinc-800" : ""}>
                                                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2">
                                                                <h4 className="text-xl font-semibold">{position.function}</h4>
                                                                {position.tenure && (
                                                                    <div className="text-orange-500 font-medium whitespace-nowrap">
                                                                        {position.tenure.start?.month && position.tenure.start?.year
                                                                            ? `${position.tenure.start.month}/${position.tenure.start.year}`
                                                                            : ""}{" "}
                                                                        -
                                                                        {position.tenure.end?.month && position.tenure.end?.year
                                                                            ? ` ${position.tenure.end.month}/${position.tenure.end.year}`
                                                                            : " Present"}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {position.location && (
                                                                <p className="text-gray-400 mt-1 flex items-center">
                                                                    <MapPin className="w-4 h-4 mr-2" />
                                                                    {position.location}
                                                                </p>
                                                            )}
                                                            {position.description && (
                                                                <p className="mt-4 text-gray-300">{position.description}</p>
                                                            )}
                                                            {position.skills && position.skills.length > 0 && (
                                                                <div className="mt-4 flex flex-wrap gap-2">
                                                                    {position.skills.map((skill, skillIndex) => (
                                                                        <span key={skillIndex} className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                                                                            {skill}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Education Section */}
                {hasEducation && (
                    <section id="education" className="py-20 bg-zinc-900">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Academic Background</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Education<span className="text-orange-500">.</span>
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {userData.education && userData.education.map((edu, index) => (
                                    <div key={index} className="bg-black p-8 rounded-3xl">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0">
                                                {edu.company?.imageUrl ? (
                                                    <Image
                                                        src={edu.company.imageUrl || "/placeholder.svg"}
                                                        alt={edu.company.name || ""}
                                                        width={48}
                                                        height={48}
                                                        className="object-contain"
                                                    />
                                                ) : (
                                                    <GraduationCap className="w-6 h-6 text-orange-500" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold">{edu.company?.name}</h3>
                                                {edu.subject && <p className="text-gray-300 mt-1">{edu.subject}</p>}
                                                {edu.tenure && (
                                                    <p className="text-orange-500 mt-2">
                                                        {edu.tenure.start?.year ? edu.tenure.start.year : ""}
                                                        {(edu.tenure.start?.year || edu.tenure.end?.year) && " - "}
                                                        {edu.tenure.end?.year ? edu.tenure.end.year : edu.tenure.start?.year ? "Present" : ""}
                                                    </p>
                                                )}
                                                {edu.courseDescription && <p className="text-gray-400 mt-4">{edu.courseDescription}</p>}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Skills and Languages Section - Only show if data exists */}
                {(hasSkills || hasLanguages) && (
                    <section id="skills" className="py-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="grid md:grid-cols-2 gap-16">
                                {/* Skills */}
                                {hasSkills && (
                                    <div>
                                        <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Expertise</div>
                                        <h2 className="text-4xl font-bold mb-8">
                                            Skills<span className="text-orange-500">.</span>
                                        </h2>

                                        <div className="grid grid-cols-2 gap-4">
                                            {userData.skills && userData.skills.map((skill, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-zinc-900 p-4 rounded-2xl flex items-center justify-between group hover:bg-orange-500 transition-colors"
                                                >
                                                    <span>{skill}</span>
                                                    <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Languages */}
                                {hasLanguages && (
                                    <div>
                                        <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Communication</div>
                                        <h2 className="text-4xl font-bold mb-8">
                                            Languages<span className="text-orange-500">.</span>
                                        </h2>

                                        <div className="space-y-6">
                                            {userData.languages && userData.languages.map((lang, index) => (
                                                <div key={index} className="bg-zinc-900 p-6 rounded-2xl">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <div className="flex items-center">
                                                            <Languages className="w-5 h-5 mr-3 text-orange-500" />
                                                            <span className="text-lg font-medium">{lang.language}</span>
                                                        </div>
                                                        {lang.proficiency && <span className="text-orange-500 font-medium">{lang.proficiency}</span>}
                                                    </div>

                                                    {lang.proficiency && (
                                                        <div className="w-full bg-zinc-800 rounded-full h-2 mt-2">
                                                            <div
                                                                className="bg-orange-500 h-2 rounded-full"
                                                                style={{
                                                                    width:
                                                                        lang.proficiency === "Native"
                                                                            ? "100%"
                                                                            : lang.proficiency === "Fluent"
                                                                                ? "90%"
                                                                                : lang.proficiency === "Professional"
                                                                                    ? "75%"
                                                                                    : lang.proficiency === "Intermediate"
                                                                                        ? "50%"
                                                                                        : "25%",
                                                                }}
                                                            ></div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Zapfolio Promo Card */}
                <section className="py-12 ">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="bg-zinc-900 p-8  rounded-3xl shadow-xl">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                                <div>
                                    <h2 className="text-3xl font-bold mb-4">Create Your Own Portfolio</h2>
                                    <p className="text-gray-300 mb-6">Build your professional portfolio in two clicks with Zapfolio. Just add your LinkedIn URL and choose a theme.</p>
                                    <Link href="https://zapfolio.in/" className="bg-orange-500 text-white px-8 py-3 rounded-full inline-flex items-center hover:bg-orange-600 transition-colors">
                                        Get Started
                                        <ExternalLink className="ml-2 w-4 h-4" />
                                    </Link>
                                </div>
                                <div className="bg-black p-6 rounded-2xl">
                                    <div className="text-xl font-bold mb-2">How it works:</div>
                                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                                        <li>Connect your LinkedIn profile</li>
                                        <li>Choose your favorite theme</li>
                                        <li>Share your professional portfolio</li>
                                    </ol>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-zinc-900 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row justify-between items-center">
                            <div className="flex items-center mb-6 md:mb-0">
                                <div className="text-3xl font-bold tracking-tighter mr-4">
                                    {userData.firstName?.charAt(0)}
                                    {userData.lastName?.charAt(0)}
                                    <span className="text-orange-500">.</span>
                                </div>
                                <span className="text-gray-500">Powered by <Link href="/" className="text-orange-500 hover:underline">Zapfolio</Link></span>
                            </div>

                            <div className="text-center md:text-right">
                                <p className="text-gray-400">
                                    © {new Date().getFullYear()} {userData.firstName} {userData.lastName}. All rights reserved.
                                </p>
                                <p className="text-gray-500 mt-1">
                                    Last updated: {userData.updatedAt ? new Date(userData.updatedAt).toLocaleDateString() : "Recently"}
                                </p>
                            </div>
                        </div>
                    </div>
                </footer>

                {/* Schema.org structured data for SEO */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "ProfilePage",
                            "mainEntity": {
                                "@type": "Person",
                                "name": `${userData.firstName} ${userData.lastName}`,
                                "headline": userData.headline,
                                "image": userData.image,
                                "jobTitle": userData.headline,
                                "worksFor": userData.jobExperience?.[0]?.company?.name,
                                "description": userData.summary,
                                "knowsLanguage": userData.languages?.map(l => l.language),
                                "knowsAbout": userData.skills,
                                "alumniOf": userData.education?.map(e => e.company?.name),
                                "address": {
                                    "@type": "PostalAddress",
                                    "addressLocality": userData.location?.address,
                                    "addressCountry": userData.location?.countryCode
                                }
                            },
                            "provider": {
                                "@type": "Organization",
                                "name": "Zapfolio",
                                "description": "Build your professional portfolio in two clicks"
                            }
                        })
                    }}
                />
            </div>
        )
    } catch (error) {
        console.error("Error rendering user profile:", error)
        notFound()
    }
}