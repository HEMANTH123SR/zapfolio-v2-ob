/* eslint-disable @next/next/no-img-element */
import { hackerMedium, strawberry } from "@/fonts/font";
import { UserData } from "@/lib/userdata.interface";
import Link from "next/link";
import { BlurFade } from "@/components/magicui/blur-fade";
import { ArrowRight, Briefcase, GraduationCap, Languages, MapPin } from "lucide-react";
import NavigationMenu from "./navigation-menu";

interface ProfileContentProps {
    userData: UserData;
}
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const ProfileContent: React.FC<ProfileContentProps> = ({ userData }) => {
    const hasJobExperience = userData.jobExperience && userData.jobExperience.length > 0;
    const hasEducation = userData.education && userData.education.length > 0;
    const hasSkills = userData.skills && userData.skills.length > 0;
    const hasLanguages = userData.languages && userData.languages.length > 1;
    const hasProjects = userData.projects && userData.projects.length > 0;
    const hasResearchPapers = userData.researchPapers && userData.researchPapers.length > 0;
    const hasSocialMedia = userData.socialMedia && Object.values(userData.socialMedia).some(Boolean);
    const hasFreelanceServices = userData.freelanceServices && userData.freelanceServices.length > 0;
    const hasClients = userData.clients && userData.clients.length > 0;
    const hasArticles = userData.articles && userData.articles.length > 0;
    const hasGallery = userData.gallery && userData.gallery.length > 0;
    const hasCertifications = userData.certifications && userData.certifications.length > 0;
    const hasAwards = userData.awards && userData.awards.length > 0;
    const hasContactInfo = userData.contactInfo && Object.values(userData.contactInfo).some(Boolean);

    return (
        <div className="min-h-screen bg-black text-white transition-all duration-300 ease-in-out" style={hackerMedium.style}>
            <NavigationMenu userData={userData} />

            {/* Add padding to account for fixed navigation */}
            <div className="pt-24">
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

                {/* Projects Section */}
                {hasProjects && (
                    <section id="projects" className="py-20 bg-zinc-900 transition-opacity duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Portfolio</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Projects<span className="text-orange-500">.</span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {userData.projects?.map((project, index) => (
                                    <div key={index} className="bg-black p-8 rounded-3xl transition-transform duration-300 hover:scale-102">
                                        {project.imageUrl && (
                                            <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                                                <img
                                                    src={`/api/proxy-image?url=${encodeURIComponent(project.imageUrl)}`}
                                                    alt={project.title || ""}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        )}
                                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-gray-400 mb-4">{project.description}</p>
                                        {project.technologies && project.technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.technologies.map((tech, techIndex) => (
                                                    <span key={techIndex} className="bg-zinc-800 px-3 py-1 rounded-full text-sm">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                        {project.url && (
                                            <a
                                                href={project.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-orange-500 hover:text-orange-400"
                                            >
                                                View Project <ArrowRight className="w-4 h-4 ml-2" />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Research Papers Section */}
                {hasResearchPapers && (
                    <section id="research" className="py-20 transition-opacity duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Academic Work</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Research Papers<span className="text-orange-500">.</span>
                            </h2>
                            <div className="grid gap-6">
                                {userData.researchPapers?.map((paper, index) => (
                                    <div key={index} className="bg-zinc-900 p-8 rounded-3xl transition-transform duration-300 hover:scale-102">
                                        <h3 className="text-2xl font-bold mb-2">{paper.title}</h3>
                                        <p className="text-gray-400 mb-4">{paper.abstract}</p>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            {paper.journal && <span>Published in {paper.journal}</span>}
                                            {paper.publicationDate && (
                                                <span>
                                                    {monthNames[Number(paper.publicationDate.month) - 1]} {paper.publicationDate.year}
                                                </span>
                                            )}
                                            {paper.citations && <span>{paper.citations} citations</span>}
                                        </div>
                                        {paper.url && (
                                            <a
                                                href={paper.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-orange-500 hover:text-orange-400 mt-4"
                                            >
                                                Read Paper <ArrowRight className="w-4 h-4 ml-2" />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Social Media Section */}
                {hasSocialMedia && (
                    <section id="social" className="py-20 bg-zinc-900 transition-opacity duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Connect</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Social Media<span className="text-orange-500">.</span>
                            </h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {Object.entries(userData.socialMedia || {}).map(([platform, url]) => {
                                    if (!url) return null;
                                    return (
                                        <a
                                            key={platform}
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="bg-black p-6 rounded-3xl text-center transition-transform duration-300 hover:scale-102"
                                        >
                                            <h3 className="text-xl font-bold capitalize">{platform}</h3>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Freelance Services Section */}
                {hasFreelanceServices && (
                    <section id="services" className="py-20 transition-opacity duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Offerings</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Freelance Services<span className="text-orange-500">.</span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {userData.freelanceServices?.map((service, index) => (
                                    <div key={index} className="bg-zinc-900 p-8 rounded-3xl transition-transform duration-300 hover:scale-102">
                                        <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                                        <p className="text-gray-400 mb-4">{service.description}</p>
                                        {service.category && (
                                            <span className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold mb-2 mr-2">{service.category}</span>
                                        )}
                                        {service.availability && (
                                            <span className="inline-block bg-zinc-800 text-orange-400 px-3 py-1 rounded-full text-xs font-semibold mb-2 mr-2">{service.availability}</span>
                                        )}
                                        {service.pricing && (
                                            <div className="flex items-center gap-2 text-orange-500 mb-4">
                                                <span className="font-bold">
                                                    {service.pricing.amount} {service.pricing.currency}
                                                </span>
                                                <span className="text-gray-400">({service.pricing.model})</span>
                                            </div>
                                        )}
                                        {service.skills && service.skills.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {service.skills.map((skill, skillIndex) => (
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
                    </section>
                )}

                {/* Clients Section */}
                {hasClients && (
                    <section id="clients" className="py-20 bg-zinc-900 transition-opacity duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Collaborations</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Clients<span className="text-orange-500">.</span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {userData.clients?.map((client, index) => {
                                    let status = "";
                                    if (client.ongoing) status = "Ongoing";
                                    else if (client.endDate) status = "Completed";
                                    else status = "Past Client";
                                    return (
                                        <div key={index} className="bg-black p-8 rounded-3xl transition-transform duration-300 hover:scale-102">
                                            <div className="flex items-center gap-4 mb-4">
                                                {client.logoUrl && (
                                                    <img
                                                        src={`/api/proxy-image?url=${encodeURIComponent(client.logoUrl)}`}
                                                        alt={client.name || ""}
                                                        className="w-16 h-16 object-contain rounded-xl"
                                                    />
                                                )}
                                                <div>
                                                    <h3 className="text-2xl font-bold">{client.name}</h3>
                                                    {client.industry && <p className="text-gray-400">{client.industry}</p>}
                                                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mt-1 ${status === "Ongoing" ? "bg-orange-500 text-white" : "bg-zinc-800 text-orange-400"}`}>{status}</span>
                                                </div>
                                            </div>
                                            <p className="text-gray-300 mb-4">{client.workDescription}</p>
                                            {client.testimonial && (
                                                <div className="bg-zinc-900 p-4 rounded-2xl">
                                                    <p className="text-gray-400 italic">&ldquo;{client.testimonial.text}&rdquo;</p>
                                                    <p className="text-orange-500 mt-2">
                                                        {client.testimonial.author}
                                                        {client.testimonial.position && `, ${client.testimonial.position}`}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Articles Section */}
                {hasArticles && (
                    <section id="articles" className="py-20 transition-opacity duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Writing</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Articles<span className="text-orange-500">.</span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {userData.articles?.map((article, index) => (
                                    <div key={index} className="bg-zinc-900 p-8 rounded-3xl transition-transform duration-300 hover:scale-102">
                                        {article.imageUrl && (
                                            <div className="aspect-video rounded-2xl overflow-hidden mb-6">
                                                <img
                                                    src={`/api/proxy-image?url=${encodeURIComponent(article.imageUrl)}`}
                                                    alt={article.title || ""}
                                                    className="object-cover w-full h-full"
                                                />
                                            </div>
                                        )}
                                        <h3 className="text-2xl font-bold mb-2">{article.title}</h3>
                                        <p className="text-gray-400 mb-4">{article.summary}</p>
                                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                                            {article.platform && <span>Published on {article.platform}</span>}
                                            {article.publishDate && (
                                                <span>
                                                    {monthNames[Number(article.publishDate.month) - 1]} {article.publishDate.year}
                                                </span>
                                            )}
                                        </div>
                                        {article.url && (
                                            <a
                                                href={article.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center text-orange-500 hover:text-orange-400 mt-4"
                                            >
                                                Read Article <ArrowRight className="w-4 h-4 ml-2" />
                                            </a>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Gallery Section */}
                {hasGallery && (
                    <section id="gallery" className="py-20 bg-zinc-900 transition-opacity duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Visual Work</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Gallery<span className="text-orange-500">.</span>
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {userData.gallery?.map((item, index) => (
                                    <div key={index} className="group relative aspect-square rounded-3xl overflow-hidden">
                                        <img
                                            src={`/api/proxy-image?url=${encodeURIComponent(item.imageUrl || "")}`}
                                            alt={item.title || ""}
                                            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end">
                                            <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                            <p className="text-gray-300">{item.description}</p>
                                            {item.category && (
                                                <span className="text-orange-500 mt-2">{item.category}</span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Certifications Section */}
                {hasCertifications && (
                    <section id="certifications" className="py-20 transition-opacity duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Credentials</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Certifications<span className="text-orange-500">.</span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {userData.certifications?.map((cert, index) => {
                                    const imageUrl = cert.imageUrl || cert.credentialUrl || undefined;
                                    return (
                                        <div key={index} className="bg-zinc-900 p-8 rounded-3xl transition-transform duration-300 hover:scale-102">
                                            <div className="flex items-start gap-4">
                                                {imageUrl && (
                                                    <img
                                                        src={`/api/proxy-image?url=${encodeURIComponent(imageUrl)}`}
                                                        alt={cert.name || ""}
                                                        className="w-16 h-16 object-contain rounded-xl"
                                                    />
                                                )}
                                                <div>
                                                    <h3 className="text-2xl font-bold">{cert.name}</h3>
                                                    <p className="text-gray-400">{cert.issuer}</p>
                                                    <div className="flex flex-wrap gap-4 text-sm text-gray-500 mt-2">
                                                        {cert.issueDate && (
                                                            <span>
                                                                Issued: {monthNames[Number(cert.issueDate.month) - 1]} {cert.issueDate.year}
                                                            </span>
                                                        )}
                                                        {cert.expiryDate && (
                                                            <span>
                                                                Expires: {monthNames[Number(cert.expiryDate.month) - 1]} {cert.expiryDate.year}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {cert.credentialId && cert.credentialUrl && (
                                                        <a
                                                            href={cert.credentialUrl}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center text-orange-500 hover:text-orange-400 mt-4 underline"
                                                        >
                                                            View Credential
                                                        </a>
                                                    )}
                                                    {cert.credentialId && !cert.credentialUrl && (
                                                        <span className="text-gray-400 mt-4 block">Credential ID: {cert.credentialId}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}

                {/* Awards Section */}
                {hasAwards && (
                    <section id="awards" className="py-20 bg-zinc-900 transition-opacity duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Recognition</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Awards<span className="text-orange-500">.</span>
                            </h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {userData.awards?.map((award, index) => (
                                    <div key={index} className="bg-black p-8 rounded-3xl transition-transform duration-300 hover:scale-102">
                                        <div className="flex flex-col md:flex-row items-start gap-6">
                                            {award.imageUrl && (
                                                <div className="w-full md:w-48 h-48 flex-shrink-0">
                                                    <img
                                                        src={`/api/proxy-image?url=${encodeURIComponent(award.imageUrl)}`}
                                                        alt={award.title || ""}
                                                        className="w-full h-full object-cover rounded-2xl"
                                                    />
                                                </div>
                                            )}
                                            <div className="flex-1">
                                                <h3 className="text-2xl font-bold">{award.title}</h3>
                                                <p className="text-gray-400">{award.issuer}</p>
                                                {award.date && (
                                                    <p className="text-orange-500 mt-2">
                                                        {monthNames[Number(award.date.month) - 1]} {award.date.year}
                                                    </p>
                                                )}
                                                {award.description && (
                                                    <p className="text-gray-300 mt-4">{award.description}</p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Contact Section */}
                {hasContactInfo && (
                    <section id="contact" className="py-20 transition-opacity duration-500">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="text-orange-500 uppercase tracking-widest font-medium mb-4">Get in Touch</div>
                            <h2 className="text-4xl font-bold mb-12">
                                Contact<span className="text-orange-500">.</span>
                            </h2>
                            <div className="bg-zinc-900 p-8 rounded-3xl">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div>
                                        <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
                                        {userData.contactInfo?.email && (
                                            <a
                                                href={`mailto:${userData.contactInfo.email}`}
                                                className="block text-gray-300 hover:text-orange-500 mb-4"
                                            >
                                                {userData.contactInfo.email}
                                            </a>
                                        )}
                                        {userData.contactInfo?.phone && (
                                            <a
                                                href={`tel:${userData.contactInfo.phone}`}
                                                className="block text-gray-300 hover:text-orange-500 mb-4"
                                            >
                                                {userData.contactInfo.phone}
                                            </a>
                                        )}
                                        {userData.contactInfo?.address && (
                                            <p className="text-gray-300 mb-4">{userData.contactInfo.address}</p>
                                        )}
                                        {userData.contactInfo?.availabilityHours && (
                                            <p className="text-gray-400">{userData.contactInfo.availabilityHours}</p>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold mb-4">Preferred Contact Method</h3>
                                        <p className="text-gray-300">
                                            {userData.contactInfo?.preferredContactMethod || "Email"}
                                        </p>
                                    </div>
                                </div>
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
        </div>
    );
};

// CSS for animations


export default ProfileContent;