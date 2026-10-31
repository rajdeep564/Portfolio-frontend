import BlurFade from "@/components/magicui/blur-fade";
import { ProjectCard } from "@/components/project-card";
import { DATA } from "@/data/resume";

const BLUR_FADE_DELAY = 0.04;

export default function ProjectsSection() {
    return (
        <div className="flex min-h-0 flex-col gap-y-6">
            <h2 className="text-xl font-bold border-l-2 border-primary pl-3">Projects</h2>
            <div className="grid grid-cols-1 gap-3">
                {DATA.projects.map((project, id) => (
                    <BlurFade
                        key={project.title}
                        delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                        className="h-full"
                    >
                        <ProjectCard
                            title={project.title}
                            context={project.context}
                            description={project.description}
                            logos={project.technologies}
                            links={project.links}
                        />
                    </BlurFade>
                ))}
            </div>
        </div>
    );
}
