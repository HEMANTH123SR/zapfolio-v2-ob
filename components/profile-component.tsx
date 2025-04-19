/* eslint-disable @next/next/no-img-element */
import { hackerMedium, strawberry } from "@/fonts/font";
import { UserData } from "@/lib/userdata.interface";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";

import { ArrowRight, Briefcase, GraduationCap, Languages, MapPin } from "lucide-react";
interface ProfileContentProps {
    userData: UserData;
}
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ProfileContent: React.FC<ProfileContentProps> = ({ userData }) => {
    const hasJobExperience = userData.jobExperience && userData.jobExperience.length > 0;
    const hasEducation = userData.education && userData.education.length > 0;
    const hasSkills = userData.skills && userData.skills.length > 0;
    const hasLanguages = userData.languages && userData.languages.length > 1;

    return (
        <div className="min-h-screen bg-black text-white transition-all duration-300 ease-in-out" style={hackerMedium.style}>
            {/* Navigation with subtle hover animation */}
            <nav className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center backdrop-blur-md bg-black/80 transition-all duration-300 hover:bg-black/90">
                <div className="text-3xl font-bold tracking-tighter transition-transform hover:scale-105">
                    {userData.firstName?.charAt(0)}
                    {userData.lastName?.charAt(0)}
                    <span className="text-orange-500">.</span>
                </div>
                <div className="hidden md:flex space-x-8">
                    <a href="#about" className="hover:text-orange-500 transition-colors duration-200">
                        About
                    </a>
                    {hasJobExperience && (
                        <a href="#experience" className="hover:text-orange-500 transition-colors duration-200">
                            Experience
                        </a>
                    )}
                    {hasEducation && (
                        <a href="#education" className="hover:text-orange-500 transition-colors duration-200">
                            Education
                        </a>
                    )}
                    {hasSkills && (
                        <a href="#skills" className="hover:text-orange-500 transition-colors duration-200">
                            Skills
                        </a>
                    )}
                    {hasLanguages && (
                        <a href="#languages" className="hover:text-orange-500 transition-colors duration-200">
                            Languages
                        </a>
                    )}
                </div>
                <Link
                    href="https://zapfolio.in/"
                    className="bg-orange-500 text-white px-6 py-2 rounded-full hidden md:block hover:bg-orange-600 transition-all duration-200 hover:scale-105"
                >
                    Build Yours
                </Link>
            </nav>


            {/* Hero Section */}
            <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight" style={strawberry.style}>
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
                    <BlurFade delay={0.25} inView>
                        <div className="aspect-[4/3] rounded-3xl overflow-hidden border-4 border-zinc-800 relative">
                            {userData.image ? (
                                <img
                                    src={`/api/proxy-image?url=${encodeURIComponent(userData.image || "/placeholder.svg")}`}
                                    alt={`${userData.firstName} ${userData.lastName}`}
                                    className="object-cover w-full h-full"
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
                    </BlurFade>
                </div>
            </section>


            {/* About Section */}
            {userData.summary && (
                <section id="about" className="bg-zinc-900 py-20 transition-opacity duration-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">About</div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-12 transition-transform hover:scale-102">
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
                <section id="experience" className="py-20 transition-opacity duration-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Career Path</div>
                        <h2 className="text-4xl font-bold mb-12">
                            Experience<span className="text-orange-500">.</span>
                        </h2>
                        <div className="grid gap-6">
                            {userData.jobExperience &&
                                userData.jobExperience.map((job, index) => (
                                    <div key={index} className="bg-zinc-900 rounded-3xl overflow-hidden transition-transform duration-300 hover:scale-102">
                                        <div className="p-8 flex flex-col md:flex-row gap-8">
                                            <div className="md:w-1/4">
                                                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center overflow-hidden transition-transform duration-300 hover:scale-110">
                                                    {job.company?.imageUrl ? (
                                                        <img
                                                            src={`/api/proxy-image?url=${encodeURIComponent(job.company.imageUrl || "/placeholder.svg")}`}
                                                            alt={job.company.name || ""}
                                                            className="object-contain w-full h-full"
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
                                                                            ? `${monthNames[Number(position.tenure.start.month) - 1]}/${position.tenure.start.year}`
                                                                            : ""}
                                                                        {" - "}
                                                                        {position.tenure.end?.month && position.tenure.end?.year
                                                                            ? `${monthNames[Number(position.tenure.end.month) - 1]}/${position.tenure.end.year}`
                                                                            : "Present"}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            {position.location && (
                                                                <p className="text-gray-400 mt-1 flex items-center">
                                                                    <MapPin className="w-4 h-4 mr-2" />
                                                                    {position.location}
                                                                </p>
                                                            )}
                                                            {position.description && <p className="mt-4 text-gray-300">{position.description}</p>}
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
                <section id="education" className="py-20 bg-zinc-900 transition-opacity duration-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Academic Background</div>
                        <h2 className="text-4xl font-bold mb-12">
                            Education<span className="text-orange-500">.</span>
                        </h2>
                        <div className="grid md:grid-cols-2 gap-6">
                            {userData.education &&
                                userData.education.map((edu, index) => (
                                    <div key={index} className="bg-black p-8 rounded-3xl transition-transform duration-300 hover:scale-102">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center overflow-hidden flex-shrink-0 transition-transform duration-300 hover:scale-110">
                                                {edu.company?.imageUrl ? (
                                                    <img
                                                        src={`/api/proxy-image?url=${encodeURIComponent(edu.company.imageUrl || "/placeholder.svg")}`}
                                                        alt={edu.company.name || ""}
                                                        className="object-contain w-full h-full"
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

            {/* Skills Section */}
            {hasSkills && (
                <section id="skills" className="py-20 transition-opacity duration-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Expertise</div>
                        <h2 className="text-4xl font-bold mb-8">
                            Skills<span className="text-orange-500">.</span>
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            {userData.skills &&
                                userData.skills.map((skill, index) => (
                                    <div
                                        key={index}
                                        className="bg-zinc-900 p-4 rounded-2xl flex items-center justify-between group hover:bg-orange-500 transition-all duration-200 hover:scale-105"
                                    >
                                        <span>{skill}</span>
                                        <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Languages Section (without progress bars) */}
            {hasLanguages && (
                <section id="languages" className="py-20 bg-zinc-900 transition-opacity duration-500">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Communication</div>
                        <h2 className="text-4xl font-bold mb-8">
                            Languages<span className="text-orange-500">.</span>
                        </h2>
                        <div className="space-y-6">
                            {userData.languages &&
                                userData.languages.map((lang, index) => (
                                    <div key={index} className="bg-[#010100] p-6 rounded-2xl transition-transform duration-300 hover:scale-102">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-center">
                                                <Languages className="w-5 h-5 mr-3 text-orange-500" />
                                                <span className="text-lg font-medium">{lang.language}</span>
                                            </div>
                                            {lang.proficiency && <span className="text-orange-500 font-medium">{lang.proficiency}</span>}
                                        </div>
                                    </div>
                                ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-zinc-900 py-12 transition-opacity duration-500">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-400">© 2025 - Built with <Link href="https://www.zapfolio.in" className="text-orange-500 hover:underline transition-colors duration-200">Zapfolio</Link></p>
                </div>
            </footer>
        </div>
    );
};

// CSS for animations


export default ProfileContent;